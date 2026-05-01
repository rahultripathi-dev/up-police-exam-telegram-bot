import { GoogleGenerativeAI } from '@google/generative-ai';
import { NewsItem } from './scraper';

const client = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

const MODEL = 'gemini-2.0-flash-lite';

export interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Titles only — saves ~80% input tokens vs sending full summaries
export async function generateMCQs(news: NewsItem[], count: number): Promise<MCQ[]> {
  if (!client) {
    console.warn('GEMINI_API_KEY missing, skipping MCQ generation');
    return [];
  }
  if (count === 0 || news.length === 0) return [];

  const titles = news.slice(0, 12).map((n, i) => `${i + 1}. ${n.title}`).join('\n');

  const prompt = `UP Police 2026 exam. Make exactly ${count} Hindi MCQs from these news titles. Return ONLY a JSON array, no markdown:
[{"question":"हिंदी में प्रश्न?","options":["A)...","B)...","C)...","D)..."],"correctIndex":0,"explanation":"एक लाइन हिंदी में"}]

News:
${titles}`;

  try {
    const model = client.getGenerativeModel({ model: MODEL });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) {
      console.error('No JSON array in MCQ response');
      return [];
    }
    const parsed = JSON.parse(match[0]) as MCQ[];
    return parsed.filter(
      (m) =>
        m.question &&
        Array.isArray(m.options) &&
        m.options.length === 4 &&
        typeof m.correctIndex === 'number' &&
        m.correctIndex >= 0 &&
        m.correctIndex < 4
    );
  } catch (err) {
    console.error('MCQ generation failed:', err);
    return [];
  }
}

// Per-user timetable — only called on /timetable, cached 7 days
export async function generateTimetable(examDate: string, daysLeft: number): Promise<string> {
  if (!client) return '';

  const prompt = `UP Police Constable exam: ${examDate} (${daysLeft} days left). Concise Hindi study timetable. Subjects: सामान्य हिंदी, GK, करेंट अफेयर्स, रीजनिंग, गणित, UP GK. Weekly plan, max 200 words, specific daily hours.`;

  try {
    const model = client.getGenerativeModel({ model: MODEL });
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error('Timetable generation failed:', err);
    return '';
  }
}
