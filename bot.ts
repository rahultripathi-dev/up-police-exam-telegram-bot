import { Telegraf } from 'telegraf';
import { getUser, upsertUser } from './storage';
import { fetchGKToday } from './scraper';
import { generateMCQs } from './mcq';
import { formatMCQMessage, formatMCQAnswer } from './formatter';
import { sendDailyDigest, getMCQCache } from './scheduler';

export async function startBot(): Promise<Telegraf> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error('TELEGRAM_BOT_TOKEN env var not set');

  const bot = new Telegraf(token);

  // /start — onboarding
  bot.start(async (ctx) => {
    const chatId = ctx.chat.id;
    const user = await upsertUser(chatId, { username: ctx.from?.username });

    await ctx.reply(
      `🎯 <b>UP Police 2026 Daily Affairs Bot</b>\n\n` +
        `नमस्ते! मैं हर सुबह <b>${user.schedule} IST</b> पर भेजूंगा:\n` +
        `📰 ${user.newsCount} करेंट अफेयर्स (UP Police focused)\n` +
        `🧠 ${user.mcqCount} प्रैक्टिस MCQ\n\n` +
        `<b>Commands:</b>\n` +
        `/today — अभी करेंट अफेयर्स देखें\n` +
        `/quiz — MCQ प्रैक्टिस करें\n` +
        `/setregion — क्षेत्र चुनें: up / india / both\n` +
        `/settime HH:MM — समय बदलें (जैसे <code>/settime 06:30</code>)\n` +
        `/setcount N — खबरों की संख्या, 5–15\n` +
        `/setmcqs N — MCQ की संख्या, 0–10\n` +
        `/pause — डेली मैसेज रोकें\n` +
        `/resume — फिर से शुरू करें\n` +
        `/status — सेटिंग देखें\n` +
        `/help — यह मैसेज दोबारा\n\n` +
        `🚀 शुरू करें! अभी /today टाइप करें।`,
      { parse_mode: 'HTML' }
    );
  });

  // /today — fetch and send immediately
  bot.command('today', async (ctx) => {
    await ctx.reply('📡 करेंट अफेयर्स लाए जा रहे हैं...');
    const user = await upsertUser(ctx.chat.id, {});
    await sendDailyDigest(bot, user);
  });

  // /quiz — instant 5-question quiz
  bot.command('quiz', async (ctx) => {
    await ctx.reply('🧠 Quiz तैयार की जा रही है...');
    const news = await fetchGKToday(8);
    if (news.length === 0) {
      await ctx.reply('⚠️ करेंट अफेयर्स नहीं मिले। /today try करें।');
      return;
    }
    const mcqs = await generateMCQs(news, 5);
    if (mcqs.length === 0) {
      await ctx.reply('⚠️ Quiz नहीं बन सकी। GEMINI_API_KEY चेक करें।');
      return;
    }
    getMCQCache().set(ctx.chat.id, mcqs);
    for (const m of formatMCQMessage(mcqs)) {
      await ctx.reply(m, { parse_mode: 'HTML' });
      await sleep(400);
    }
  });

  // /a1, /a2... — MCQ answer reveal
  bot.hears(/^\/a(\d+)$/, async (ctx) => {
    const num = parseInt((ctx.match as RegExpMatchArray)[1], 10);
    const mcqs = getMCQCache().get(ctx.chat.id);
    if (!mcqs || !mcqs[num - 1]) {
      await ctx.reply('Quiz expire हो गई। /quiz से नई शुरू करें।');
      return;
    }
    await ctx.reply(formatMCQAnswer(mcqs[num - 1], num), { parse_mode: 'HTML' });
  });

  // /settime HH:MM
  bot.command('settime', async (ctx) => {
    const arg = ctx.message.text.split(/\s+/)[1];
    if (!arg || !/^\d{1,2}:\d{2}$/.test(arg)) {
      await ctx.reply('उपयोग: <code>/settime 06:30</code>', { parse_mode: 'HTML' });
      return;
    }
    const [hh, mm] = arg.split(':').map(Number);
    if (hh < 0 || hh > 23 || mm < 0 || mm > 59) {
      await ctx.reply('गलत समय। 24h format: <code>/settime 06:30</code>', {
        parse_mode: 'HTML',
      });
      return;
    }
    const time = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
    await upsertUser(ctx.chat.id, { schedule: time });
    await ctx.reply(`✅ डेली समय <b>${time} IST</b> सेट हो गया`, { parse_mode: 'HTML' });
  });

  // /setregion up | india | both
  bot.command('setregion', async (ctx) => {
    const arg = ctx.message.text.split(/\s+/)[1]?.toLowerCase();
    if (!arg || !['up', 'india', 'both'].includes(arg)) {
      await ctx.reply(
        '📍 <b>क्षेत्र चुनें:</b>\n\n' +
        '/setregion up — सिर्फ उत्तर प्रदेश की खबरें\n' +
        '/setregion india — पूरे भारत की खबरें\n' +
        '/setregion both — UP + भारत दोनों (default)',
        { parse_mode: 'HTML' }
      );
      return;
    }
    await upsertUser(ctx.chat.id, { region: arg as 'up' | 'india' | 'both' });
    const labels: Record<string, string> = {
      up: '🗺 सिर्फ उत्तर प्रदेश',
      india: '🇮🇳 पूरा भारत',
      both: '🗺+🇮🇳 UP + भारत',
    };
    await ctx.reply(`✅ क्षेत्र सेट: <b>${labels[arg]}</b>`, { parse_mode: 'HTML' });
  });

  // /setcount N
  bot.command('setcount', async (ctx) => {
    const n = parseInt(ctx.message.text.split(/\s+/)[1], 10);
    if (isNaN(n) || n < 5 || n > 15) {
      await ctx.reply('उपयोग: <code>/setcount 10</code> (5–15 के बीच)', {
        parse_mode: 'HTML',
      });
      return;
    }
    await upsertUser(ctx.chat.id, { newsCount: n });
    await ctx.reply(`✅ खबरों की संख्या: <b>${n}</b>`, { parse_mode: 'HTML' });
  });

  // /setmcqs N
  bot.command('setmcqs', async (ctx) => {
    const n = parseInt(ctx.message.text.split(/\s+/)[1], 10);
    if (isNaN(n) || n < 0 || n > 10) {
      await ctx.reply('उपयोग: <code>/setmcqs 5</code> (0–10 के बीच)', {
        parse_mode: 'HTML',
      });
      return;
    }
    await upsertUser(ctx.chat.id, { mcqCount: n });
    await ctx.reply(`✅ MCQ की संख्या: <b>${n}</b>`, { parse_mode: 'HTML' });
  });

  // /pause
  bot.command('pause', async (ctx) => {
    await upsertUser(ctx.chat.id, { paused: true });
    await ctx.reply('⏸ डेली मैसेज रोक दिए गए। /resume से शुरू करें।');
  });

  // /resume
  bot.command('resume', async (ctx) => {
    await upsertUser(ctx.chat.id, { paused: false });
    await ctx.reply('▶️ डेली मैसेज फिर से शुरू हो गए!');
  });

  // /status
  bot.command('status', async (ctx) => {
    const user = await getUser(ctx.chat.id);
    if (!user) {
      await ctx.reply('पहले /start करें।');
      return;
    }
    await ctx.reply(
      `<b>📋 आपकी सेटिंग</b>\n\n` +
        `⏰ समय: <b>${user.schedule} IST</b>\n` +
        `📰 खबरें: <b>${user.newsCount}</b>\n` +
        `🧠 MCQ: <b>${user.mcqCount}</b>\n` +
        `🗺 क्षेत्र: <b>${{ up: 'सिर्फ UP', india: 'पूरा भारत', both: 'UP + भारत' }[user.region ?? 'both']}</b>\n` +
        `📡 स्थिति: ${user.paused ? '⏸ <b>रुका हुआ</b>' : '✅ <b>सक्रिय</b>'}`,
      { parse_mode: 'HTML' }
    );
  });

  // /help
  bot.command('help', async (ctx) => {
    await ctx.reply(
      `<b>UP Police 2026 Bot — Commands</b>\n\n` +
        `/today — अभी करेंट अफेयर्स\n` +
        `/quiz — MCQ प्रैक्टिस\n` +
        `/setregion up|india|both — क्षेत्र चुनें\n` +
        `/settime HH:MM — डेली समय बदलें\n` +
        `/setcount N — खबरों की संख्या (5–15)\n` +
        `/setmcqs N — MCQ की संख्या (0–10)\n` +
        `/pause — डेली मैसेज रोकें\n` +
        `/resume — फिर से शुरू करें\n` +
        `/status — सेटिंग देखें`,
      { parse_mode: 'HTML' }
    );
  });

  // Error handler
  bot.catch((err, ctx) => {
    console.error(`Bot error for ${ctx.updateType}:`, err);
  });

  bot.launch().catch((err) => {
    console.error('Bot launch error:', err);
    process.exit(1);
  });
  console.log('✅ Telegram bot launched');

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  return bot;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
