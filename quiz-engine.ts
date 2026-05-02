import { MCQ } from './mcq';
import { GKQuestion } from './gk-bank-scraper';

let gkBank: GKQuestion[] = [];

export function setGKBank(questions: GKQuestion[]): void {
  gkBank = questions;
  console.log(`🎯 Quiz engine loaded: ${questions.length} questions`);
}

export function getGKBankSize(): number {
  return gkBank.length;
}

function sample<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

// 100% real exam questions from IndiaBix GK bank
// Categorised so each quiz has variety across subjects
const CATEGORY_WEIGHTS: Record<string, number> = {
  'Indian History':          2,
  'Indian Politics':         2,
  'Indian Geography':        2,
  'Indian Economy':          1,
  'General Science':         1,
  'Famous Personalities':    1,
  'Sports':                  1,
  'Honours and Awards':      1,
  'Basic General Knowledge': 2,
};

export function buildDailyQuiz(total: number): MCQ[] {
  if (gkBank.length === 0) return [];

  // Group by category
  const byCategory = new Map<string, GKQuestion[]>();
  for (const q of gkBank) {
    const cat = q.category || 'Basic General Knowledge';
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(q);
  }

  // Total weight
  const totalWeight = Object.values(CATEGORY_WEIGHTS).reduce((a, b) => a + b, 0);
  const picked: GKQuestion[] = [];

  for (const [cat, weight] of Object.entries(CATEGORY_WEIGHTS)) {
    const catQuestions = byCategory.get(cat) || [];
    if (catQuestions.length === 0) continue;
    const count = Math.round((weight / totalWeight) * total);
    picked.push(...sample(catQuestions, Math.min(count, catQuestions.length)));
  }

  // Fill up to total if rounding left gaps
  if (picked.length < total) {
    const remaining = gkBank.filter(q => !picked.includes(q));
    picked.push(...sample(remaining, total - picked.length));
  }

  return sample(picked, total).map(q => ({
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation || 'See the correct option.',
  }));
}
