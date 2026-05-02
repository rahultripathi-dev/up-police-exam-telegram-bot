import { NewsItem } from './scraper';
import { MCQ } from './mcq';

function escape(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function formatNewsMessage(news: NewsItem[]): string {
  const date = new Date().toLocaleDateString('hi-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

  let msg = `🌅 <b>सुप्रभात! आज के करेंट अफेयर्स</b>\n`;
  msg += `📅 <i>${date}</i>\n`;
  msg += `━━━━━━━━━━━━━━━━━\n\n`;

  news.forEach((item, i) => {
    msg += `<b>${i + 1}. ${escape(item.title)}</b>\n`;
    if (item.summary) msg += `${escape(item.summary)}\n`;
    if (item.link) msg += `<a href="${escape(item.link)}">🔗 पूरी खबर पढ़ें</a>\n`;
    msg += `\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━\n`;
  msg += `💪 <i>UP Police 2026 — तैयारी जारी रखो!</i>`;
  return msg;
}

// Format one MCQ question with inline A/B/C/D buttons
export function formatMCQWithKeyboard(
  mcq: MCQ,
  qIdx: number,
  total: number
): { text: string; reply_markup: object } {
  let text = `🧠 <b>प्रश्न ${qIdx + 1} / ${total}</b>\n\n`;
  text += `${escape(mcq.question)}\n\n`;
  mcq.options.forEach(opt => { text += `${escape(opt)}\n`; });

  const reply_markup = {
    inline_keyboard: [[
      { text: 'A', callback_data: `q:${qIdx}:0` },
      { text: 'B', callback_data: `q:${qIdx}:1` },
      { text: 'C', callback_data: `q:${qIdx}:2` },
      { text: 'D', callback_data: `q:${qIdx}:3` },
    ]],
  };

  return { text, reply_markup };
}

// Edit message after user answers — show tick/cross on chosen option
export function formatMCQResult(
  mcq: MCQ,
  qIdx: number,
  _total: number,
  chosenIdx: number
): string {
  const correct = chosenIdx === mcq.correctIndex;
  let text = correct
    ? `✅ <b>प्रश्न ${qIdx + 1} — सही!</b>\n\n`
    : `❌ <b>प्रश्न ${qIdx + 1} — गलत!</b>\n\n`;

  text += `${escape(mcq.question)}\n\n`;

  mcq.options.forEach((opt, i) => {
    if (i === mcq.correctIndex) {
      text += `✅ <b>${escape(opt)}</b>\n`;
    } else if (i === chosenIdx && !correct) {
      text += `❌ ${escape(opt)}\n`;
    } else {
      text += `▫️ ${escape(opt)}\n`;
    }
  });

  text += `\n📖 <i>${escape(mcq.explanation)}</i>`;
  return text;
}

// Legacy plain text format (used in daily digest)
export function formatMCQMessage(mcqs: MCQ[]): string[] {
  return mcqs.map((m, i) => {
    let msg = `🧠 <b>प्रश्न ${i + 1} / ${mcqs.length}</b>\n\n`;
    msg += `${escape(m.question)}\n\n`;
    m.options.forEach(opt => { msg += `${escape(opt)}\n`; });
    msg += `\n💡 <i>उत्तर के लिए /a${i + 1} भेजें</i>`;
    return msg;
  });
}

export function formatMCQAnswer(mcq: MCQ, qNum: number): string {
  return (
    `✅ <b>प्रश्न ${qNum} — सही उत्तर</b>\n\n` +
    `<b>${escape(mcq.options[mcq.correctIndex])}</b>\n\n` +
    `📖 ${escape(mcq.explanation)}`
  );
}
