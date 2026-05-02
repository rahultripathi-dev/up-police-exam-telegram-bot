import { MCQ } from './mcq';
import { NewsItem } from './scraper';
import { GKQuestion } from './gk-bank-scraper';

let gkBank: GKQuestion[] = [];

export function setGKBank(questions: GKQuestion[]): void {
  gkBank = questions;
}

export function getGKBankSize(): number {
  return gkBank.length;
}

// Random subset without mutation
function sample<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

// Static GK questions from scraped bank
function staticGKQuestions(count: number): MCQ[] {
  return sample(gkBank, count).map(q => ({
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation || 'उत्तर विकल्प देखें।',
  }));
}

// Current affairs MCQs — no AI needed
// Format: "हाल ही में निम्नलिखित में से कौन सी घटना सही है?"
// Correct option = real news title, distractors = other news titles
function currentAffairsMCQs(news: NewsItem[], count: number): MCQ[] {
  if (news.length < 4) return [];
  const mcqs: MCQ[] = [];
  const pool = sample(news, Math.min(news.length, count + 6));

  for (let i = 0; i < pool.length && mcqs.length < count; i++) {
    const correct = pool[i];
    const distractors = pool.filter((_, j) => j !== i).slice(0, 3);
    if (distractors.length < 3) continue;

    const all = [correct.title, ...distractors.map(d => d.title)].sort(
      () => Math.random() - 0.5
    );
    const correctIndex = all.indexOf(correct.title);

    mcqs.push({
      question: 'हाल ही में निम्नलिखित में से कौन सी घटना/खबर सही है?',
      options: all.map((o, idx) => `${['A', 'B', 'C', 'D'][idx]}) ${o}`),
      correctIndex,
      explanation: correct.summary?.slice(0, 150) || correct.title,
    });
  }
  return mcqs;
}

// Build daily quiz: 60% static GK + 40% current affairs
export function buildDailyQuiz(news: NewsItem[], total: number): MCQ[] {
  const hasBank = gkBank.length >= 10;
  const caCount = news.length >= 4 ? Math.ceil(total * 0.4) : 0;
  const gkCount = total - caCount;

  const caMCQs = currentAffairsMCQs(news, caCount);
  const gkMCQs = hasBank ? staticGKQuestions(gkCount) : [];

  const all = [...caMCQs, ...gkMCQs].sort(() => Math.random() - 0.5);

  // If bank not yet populated, return what we have
  return all.slice(0, total);
}
