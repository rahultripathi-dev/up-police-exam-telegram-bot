import { GoogleGenerativeAI } from '@google/generative-ai';
import { NewsItem } from './scraper';

const client = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Filter news to only exam-relevant items using Gemini
export async function filterExamRelevantNews(news: NewsItem[], keep: number): Promise<NewsItem[]> {
  if (!client || news.length === 0) return news.slice(0, keep);

  const list = news.map((n, i) => `[${i}] ${n.title}`).join('\n');

  const prompt = `नीचे दी गई खबरों में से UP Police Constable 2026 परीक्षा के लिए सबसे उपयोगी ${keep} खबरें चुनें।

शामिल करें: सरकारी योजनाएं, नियुक्तियां, पुरस्कार, खेल, विज्ञान-तकनीक, अर्थव्यवस्था, अंतर्राष्ट्रीय संबंध, UP/केंद्र सरकार के निर्णय, शिक्षा, पर्यावरण।

बाहर करें: हत्या, चोरी, डकैती, दुर्घटना, आग, बलात्कार, झगड़ा, गिरफ्तारी (योजना/अभियान नहीं), मौसम।

खबरें:
${list}

केवल चुनी हुई खबरों के index numbers की JSON array लौटाएं। जैसे: [0,2,5,7,9]`;

  try {
    const model = client.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const match = text.match(/\[[\d,\s]+\]/);
    if (!match) return news.slice(0, keep);
    const indices: number[] = JSON.parse(match[0]);
    const filtered = indices
      .filter((i) => i >= 0 && i < news.length)
      .map((i) => news[i])
      .slice(0, keep);
    console.log(`Filtered ${news.length} → ${filtered.length} exam-relevant news items`);
    return filtered.length > 0 ? filtered : news.slice(0, keep);
  } catch {
    return news.slice(0, keep);
  }
}

export async function generateMCQs(news: NewsItem[], count: number): Promise<MCQ[]> {
  if (!client) {
    console.warn('GEMINI_API_KEY missing, skipping MCQ generation');
    return [];
  }
  if (count === 0 || news.length === 0) return [];

  const newsText = news
    .slice(0, 8)
    .map((n, i) => `[${i + 1}] ${n.title}\n${n.summary}`)
    .join('\n\n');

  const prompt = `आप UP Police Constable 2026 परीक्षा के विशेषज्ञ हैं। नीचे दिए गए करेंट अफेयर्स के आधार पर ठीक ${count} MCQ बनाएं।

MCQ इन विषयों पर बनाएं:
- सरकारी योजनाएं और नीतियां (UP व केंद्र)
- नियुक्तियां, पुरस्कार, रैंकिंग
- खेल, विज्ञान, तकनीक
- अर्थव्यवस्था, बैंकिंग, बजट
- अंतर्राष्ट्रीय संबंध, संधियां
- UP के जिले, इतिहास, भूगोल

प्रश्न हिंदी में, UP Police परीक्षा स्तर (मध्यम कठिनाई)।

करेंट अफेयर्स:
${newsText}

केवल valid JSON array लौटाएं, कोई markdown या commentary नहीं:
[
  {
    "question": "हिंदी में प्रश्न?",
    "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "correctIndex": 0-3,
    "explanation": "एक लाइन में कारण (हिंदी में)"
  }
]`;

  try {
    const model = client.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('No JSON array found in MCQ response');
      return [];
    }

    const parsed = JSON.parse(jsonMatch[0]) as MCQ[];
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
