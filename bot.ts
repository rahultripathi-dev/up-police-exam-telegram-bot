import { Telegraf } from 'telegraf';
import { getUser, upsertUser } from './storage';
import { generateTimetable } from './mcq';
import { formatMCQMessage, formatMCQAnswer } from './formatter';
import { sendDailyDigest, getMCQCache, warmDailyMCQs } from './scheduler';
import { getDailyMCQs, getUserTimetable, setUserTimetable } from './cache';

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
        `📰 ${user.newsCount} करेंट अफेयर्स\n` +
        `🧠 ${user.mcqCount} MCQ\n\n` +
        `<b>Commands:</b>\n` +
        `/today — अभी करेंट अफेयर्स\n` +
        `/quiz — MCQ प्रैक्टिस\n` +
        `/timetable DD-MM-YYYY — स्टडी टाइमटेबल\n` +
        `/setregion up|india|both — क्षेत्र चुनें\n` +
        `/settime HH:MM — समय बदलें\n` +
        `/setcount N — खबरों की संख्या (5–15)\n` +
        `/setmcqs N — MCQ की संख्या (0–10)\n` +
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

  // /quiz — scrape MCQs (AI fallback), cache for the day
  bot.command('quiz', async (ctx) => {
    if (!getDailyMCQs()) {
      await ctx.reply('🧠 Quiz तैयार की जा रही है...');
      await warmDailyMCQs();
    }

    const daily = getDailyMCQs();
    if (!daily || daily.length === 0) {
      await ctx.reply('⚠️ Quiz नहीं बन सकी। थोड़ी देर बाद try करें।');
      return;
    }

    const selected = shuffle(daily).slice(0, 5);
    getMCQCache().set(ctx.chat.id, selected);
    for (const m of formatMCQMessage(selected)) {
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

  // /timetable DD-MM-YYYY — AI study plan, cached 7 days per user
  bot.command('timetable', async (ctx) => {
    const arg = ctx.message.text.split(/\s+/)[1];
    if (!arg || !/^\d{2}-\d{2}-\d{4}$/.test(arg)) {
      await ctx.reply(
        '📅 उपयोग: <code>/timetable DD-MM-YYYY</code>\nजैसे: <code>/timetable 15-08-2026</code>',
        { parse_mode: 'HTML' }
      );
      return;
    }

    const [dd, mm, yyyy] = arg.split('-').map(Number);
    const examMs = new Date(yyyy, mm - 1, dd).getTime();
    const daysLeft = Math.ceil((examMs - Date.now()) / 86400000);
    if (daysLeft <= 0) {
      await ctx.reply('⚠️ परीक्षा की तारीख भूतकाल में है। सही तारीख डालें।');
      return;
    }

    // Save exam date to user prefs
    await upsertUser(ctx.chat.id, { examDate: arg });

    // Check cache first
    const cached = getUserTimetable(ctx.chat.id, arg);
    if (cached) {
      await ctx.reply(`📅 <b>आपका स्टडी टाइमटेबल</b> (${daysLeft} दिन बाकी)\n\n${cached}`, {
        parse_mode: 'HTML',
      });
      return;
    }

    await ctx.reply('📅 टाइमटेबल बन रही है...');
    const plan = await generateTimetable(arg, daysLeft);
    if (!plan) {
      await ctx.reply('⚠️ टाइमटेबल नहीं बन सकी। थोड़ी देर बाद try करें।');
      return;
    }

    await setUserTimetable(ctx.chat.id, arg, plan);
    await ctx.reply(`📅 <b>आपका स्टडी टाइमटेबल</b> (${daysLeft} दिन बाकी)\n\n${plan}`, {
      parse_mode: 'HTML',
    });
  });

  // /setregion up | india | both
  bot.command('setregion', async (ctx) => {
    const arg = ctx.message.text.split(/\s+/)[1]?.toLowerCase();
    if (!arg || !['up', 'india', 'both'].includes(arg)) {
      await ctx.reply(
        '📍 <b>क्षेत्र चुनें:</b>\n\n' +
          '/setregion up — सिर्फ उत्तर प्रदेश\n' +
          '/setregion india — पूरा भारत\n' +
          '/setregion both — UP + भारत (default)',
        { parse_mode: 'HTML' }
      );
      return;
    }
    await upsertUser(ctx.chat.id, { region: arg as 'up' | 'india' | 'both' });
    const labels: Record<string, string> = {
      up: '🗺 सिर्फ UP',
      india: '🇮🇳 पूरा भारत',
      both: '🗺+🇮🇳 UP + भारत',
    };
    await ctx.reply(`✅ क्षेत्र सेट: <b>${labels[arg]}</b>`, { parse_mode: 'HTML' });
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
      await ctx.reply('गलत समय। 24h format: <code>/settime 06:30</code>', { parse_mode: 'HTML' });
      return;
    }
    const time = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
    await upsertUser(ctx.chat.id, { schedule: time });
    await ctx.reply(`✅ डेली समय <b>${time} IST</b> सेट हो गया`, { parse_mode: 'HTML' });
  });

  // /setcount N
  bot.command('setcount', async (ctx) => {
    const n = parseInt(ctx.message.text.split(/\s+/)[1], 10);
    if (isNaN(n) || n < 5 || n > 15) {
      await ctx.reply('उपयोग: <code>/setcount 10</code> (5–15 के बीच)', { parse_mode: 'HTML' });
      return;
    }
    await upsertUser(ctx.chat.id, { newsCount: n });
    await ctx.reply(`✅ खबरों की संख्या: <b>${n}</b>`, { parse_mode: 'HTML' });
  });

  // /setmcqs N
  bot.command('setmcqs', async (ctx) => {
    const n = parseInt(ctx.message.text.split(/\s+/)[1], 10);
    if (isNaN(n) || n < 0 || n > 10) {
      await ctx.reply('उपयोग: <code>/setmcqs 5</code> (0–10 के बीच)', { parse_mode: 'HTML' });
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
    const regionLabel: Record<string, string> = {
      up: 'सिर्फ UP',
      india: 'पूरा भारत',
      both: 'UP + भारत',
    };
    await ctx.reply(
      `<b>📋 आपकी सेटिंग</b>\n\n` +
        `⏰ समय: <b>${user.schedule} IST</b>\n` +
        `📰 खबरें: <b>${user.newsCount}</b>\n` +
        `🧠 MCQ: <b>${user.mcqCount}</b>\n` +
        `🗺 क्षेत्र: <b>${regionLabel[user.region ?? 'both']}</b>\n` +
        `📅 परीक्षा तारीख: <b>${user.examDate ?? 'सेट नहीं (/timetable से सेट करें)'}</b>\n` +
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
        `/timetable DD-MM-YYYY — स्टडी टाइमटेबल\n` +
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
