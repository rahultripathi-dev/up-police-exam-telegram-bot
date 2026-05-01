import cron from 'node-cron';
import { Telegraf } from 'telegraf';
import { getAllActiveUsers, UserPrefs } from './storage';
import { fetchGKToday, NewsItem } from './scraper';
import { generateMCQs, MCQ } from './mcq';

import { formatNewsMessage, formatMCQMessage } from './formatter';
import { getDailyMCQs, setDailyMCQs, getCachedNews, setCachedNews } from './cache';

// Per-user MCQ session cache so /a<n> answer commands work
const mcqCache = new Map<number, MCQ[]>();

export function getMCQCache(): Map<number, MCQ[]> {
  return mcqCache;
}

// Fetch news with 60-min cache per region
export async function getNews(region: string, limit: number): Promise<NewsItem[]> {
  const cached = getCachedNews(region);
  if (cached) {
    console.log(`📦 News cache hit [${region}]`);
    return cached.slice(0, limit);
  }
  const fresh = await fetchGKToday(limit, region as 'up' | 'india' | 'both');
  if (fresh.length > 0) await setCachedNews(region, fresh);
  return fresh;
}

// Generate daily MCQ pool once — 1 AI call/day, cached for all users
export async function warmDailyMCQs(): Promise<void> {
  if (getDailyMCQs()) return;
  console.log('🤖 Generating daily MCQ pool via AI...');
  const news = await getNews('both', 15);
  if (news.length === 0) return;
  const mcqs = await generateMCQs(news, 15);
  if (mcqs.length > 0) await setDailyMCQs(mcqs);
}

export function initScheduler(bot: Telegraf): void {
  // Pre-generate MCQs at 00:05 IST (18:35 UTC) — 1 AI call/day for all users
  cron.schedule('35 18 * * *', async () => {
    console.log('🌙 Midnight cron: warming daily MCQ pool');
    await warmDailyMCQs();
  });

  // Every minute: send digest to users whose schedule matches current IST time
  cron.schedule('* * * * *', async () => {
    try {
      const users = await getAllActiveUsers();
      if (users.length === 0) return;

      const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const currentTime = `${String(ist.getHours()).padStart(2, '0')}:${String(ist.getMinutes()).padStart(2, '0')}`;

      const due = users.filter((u) => u.schedule === currentTime);
      if (due.length === 0) return;

      console.log(`📤 Dispatching to ${due.length} user(s) at ${currentTime} IST`);
      await warmDailyMCQs();

      // Group by region — fetch news once per group, not per user
      const groups = new Map<string, typeof due>();
      for (const u of due) {
        const r = u.region ?? 'both';
        if (!groups.has(r)) groups.set(r, []);
        groups.get(r)!.push(u);
      }

      for (const [region, groupUsers] of groups) {
        const maxNews = Math.max(...groupUsers.map((u) => u.newsCount));
        const news = await getNews(region, maxNews);
        for (const user of groupUsers) {
          await sendDailyDigest(bot, user, news);
        }
      }
    } catch (err) {
      console.error('Scheduler tick error:', err);
    }
  });

  console.log('⏰ Scheduler started');
}

export async function sendDailyDigest(
  bot: Telegraf,
  user: UserPrefs,
  prefetchedNews?: NewsItem[]
): Promise<void> {
  try {
    const allNews = prefetchedNews ?? (await getNews(user.region ?? 'both', user.newsCount));
    const userNews = allNews.slice(0, user.newsCount);

    if (userNews.length === 0) {
      await bot.telegram.sendMessage(
        user.chatId,
        '⚠️ आज करेंट अफेयर्स नहीं मिले। थोड़ी देर बाद /today try करें।'
      );
      return;
    }

    await bot.telegram.sendMessage(user.chatId, formatNewsMessage(userNews), {
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: true },
    });

    if (user.mcqCount > 0) {
      const daily = getDailyMCQs();
      if (daily && daily.length >= user.mcqCount) {
        const mcqs = shuffle(daily).slice(0, user.mcqCount);
        mcqCache.set(user.chatId, mcqs);
        for (const m of formatMCQMessage(mcqs)) {
          await bot.telegram.sendMessage(user.chatId, m, { parse_mode: 'HTML' });
          await sleep(400);
        }
      }
    }
  } catch (err) {
    console.error(`Digest failed for ${user.chatId}:`, err);
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
