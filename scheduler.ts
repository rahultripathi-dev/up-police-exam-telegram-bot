import cron from 'node-cron';
import { Telegraf } from 'telegraf';
import { getAllActiveUsers, UserPrefs } from './storage';
import { fetchGKToday, NewsItem } from './scraper';
import { generateMCQs, MCQ } from './mcq';
import { formatNewsMessage, formatMCQMessage } from './formatter';

// Cache today's MCQs per user so /a<n> answer commands work
const mcqCache = new Map<number, MCQ[]>();

export function getMCQCache(): Map<number, MCQ[]> {
  return mcqCache;
}

export function initScheduler(bot: Telegraf): void {
  // Run every minute, dispatch to users whose schedule matches current IST time
  cron.schedule('* * * * *', async () => {
    try {
      const users = await getAllActiveUsers();
      if (users.length === 0) return;

      const ist = new Date(
        new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      );
      const hh = String(ist.getHours()).padStart(2, '0');
      const mm = String(ist.getMinutes()).padStart(2, '0');
      const currentTime = `${hh}:${mm}`;

      const due = users.filter((u) => u.schedule === currentTime);
      if (due.length === 0) return;

      console.log(`📤 Dispatching to ${due.length} user(s) at ${currentTime} IST`);

      // Group by region and fetch once per group
      const groups = new Map<string, typeof due>();
      for (const u of due) {
        const r = u.region ?? 'both';
        if (!groups.has(r)) groups.set(r, []);
        groups.get(r)!.push(u);
      }

      for (const [region, users] of groups) {
        const maxNews = Math.max(...users.map((u) => u.newsCount));
        const news = await fetchGKToday(maxNews, region as 'up' | 'india' | 'both');
        for (const user of users) {
          await sendDailyDigest(bot, user, news);
        }
      }
    } catch (err) {
      console.error('Scheduler tick error:', err);
    }
  });

  console.log('⏰ Scheduler started (checks every minute)');
}

export async function sendDailyDigest(
  bot: Telegraf,
  user: UserPrefs,
  prefetchedNews?: NewsItem[]
): Promise<void> {
  try {
    const allNews = prefetchedNews || (await fetchGKToday(user.newsCount, user.region ?? 'both'));
    const userNews = allNews.slice(0, user.newsCount);

    if (userNews.length === 0) {
      await bot.telegram.sendMessage(
        user.chatId,
        '⚠️ आज करेंट अफेयर्स नहीं मिले। थोड़ी देर बाद /today try करें।'
      );
      return;
    }

    // Send news digest
    await bot.telegram.sendMessage(user.chatId, formatNewsMessage(userNews), {
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: true },
    });

    // Generate and send MCQs
    if (user.mcqCount > 0) {
      const mcqs = await generateMCQs(userNews, user.mcqCount);
      if (mcqs.length > 0) {
        mcqCache.set(user.chatId, mcqs);
        const msgs = formatMCQMessage(mcqs);
        for (const m of msgs) {
          await bot.telegram.sendMessage(user.chatId, m, { parse_mode: 'HTML' });
          await sleep(400);
        }
      }
    }
  } catch (err) {
    console.error(`Digest failed for ${user.chatId}:`, err);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
