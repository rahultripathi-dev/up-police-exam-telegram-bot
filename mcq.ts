import { GoogleGenerativeAI } from '@google/generative-ai';

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

// Only AI feature remaining — per-user, cached 7 days
export async function generateTimetable(examDate: string, daysLeft: number): Promise<string> {
  if (!client) return '';
  const prompt = `UP Police Constable exam on ${examDate} (${daysLeft} days left). Make a concise Hindi study timetable. Subjects: सामान्य हिंदी, GK, करेंट अफेयर्स, रीजनिंग, गणित, UP GK. Weekly plan, max 200 words, specific daily hours.`;
  try {
    const model = client.getGenerativeModel({ model: MODEL });
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error('Timetable generation failed:', err);
    return '';
  }
}
