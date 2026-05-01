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
    if (item.summary) {
      msg += `${escape(item.summary)}\n`;
    }
    if (item.link) {
      msg += `<a href="${escape(item.link)}">🔗 पूरी खबर पढ़ें</a>\n`;
    }
    msg += `\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━\n`;
  msg += `💪 <i>UP Police 2026 — तैयारी जारी रखो!</i>`;

  return msg;
}

export function formatMCQMessage(mcqs: MCQ[]): string[] {
  return mcqs.map((m, i) => {
    let msg = `🧠 <b>प्रश्न ${i + 1} / ${mcqs.length}</b>\n\n`;
    msg += `${escape(m.question)}\n\n`;
    m.options.forEach((opt) => {
      msg += `${escape(opt)}\n`;
    });
    msg += `\n💡 <i>उत्तर के लिए /a${i + 1} भेजें</i>`;
    return msg;
  });
}

export function formatMCQAnswer(mcq: MCQ, qNum: number): string {
  const correct = mcq.options[mcq.correctIndex];
  return (
    `✅ <b>प्रश्न ${qNum} — सही उत्तर</b>\n\n` +
    `<b>${escape(correct)}</b>\n\n` +
    `📖 ${escape(mcq.explanation)}`
  );
}
