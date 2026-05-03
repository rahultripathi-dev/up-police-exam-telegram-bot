import { MCQ } from './mcq';
import { GKQuestion } from './gk-bank-scraper';
import { buildHindiQuiz, getHindiBankSize } from './hindi-bank';
import { buildGSQuiz, getGSBankSize } from './gs-bank';

let gkBank: GKQuestion[] = [];

export function setGKBank(questions: GKQuestion[]): void {
  gkBank = questions;
  console.log(`🎯 Quiz engine loaded: ${questions.length} GK questions`);
}

export function getGKBankSize(): number {
  return gkBank.length;
}

export function getTotalBankSize(): number {
  return gkBank.length + getHindiBankSize() + getGSBankSize();
}

function sample<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

// GK bank from IndiaBix — still used for IndiaBix scraped questions
const GK_CATEGORY_WEIGHTS: Record<string, number> = {
  'Indian History':          2,
  'Indian Politics':         2,
  'Indian Geography':        2,
  'Indian Economy':          2,
  'General Science':         1,
  'Famous Personalities':    1,
  'Sports':                  1,
  'Honours and Awards':      1,
  'Basic General Knowledge': 1,
};

function buildFromGKBank(total: number): MCQ[] {
  if (gkBank.length === 0) return [];

  const byCategory = new Map<string, GKQuestion[]>();
  for (const q of gkBank) {
    const cat = q.category || 'Basic General Knowledge';
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(q);
  }

  const totalWeight = Object.values(GK_CATEGORY_WEIGHTS).reduce((a, b) => a + b, 0);
  const picked: GKQuestion[] = [];

  for (const [cat, weight] of Object.entries(GK_CATEGORY_WEIGHTS)) {
    const catQuestions = byCategory.get(cat) || [];
    if (catQuestions.length === 0) continue;
    const count = Math.round((weight / totalWeight) * total);
    picked.push(...sample(catQuestions, Math.min(count, catQuestions.length)));
  }

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

// Pure GS quiz (UP Special + Constitution + History + Economy + Science)
// Uses static gs-bank.ts — no IndiaBix dependency
export function buildDailyQuiz(total: number): MCQ[] {
  const gsQuestions = buildGSQuiz(total);
  if (gsQuestions.length >= total) return gsQuestions;

  // Pad with IndiaBix GK if static bank short
  const needed = total - gsQuestions.length;
  const gkQuestions = buildFromGKBank(needed);
  return [...gsQuestions, ...gkQuestions].sort(() => Math.random() - 0.5).slice(0, total);
}

// Mixed quiz: ~50% Hindi + ~50% GS (mirrors actual exam proportion)
export function buildMixedQuiz(total: number): MCQ[] {
  const hindiCount = Math.round(total * 0.45);
  const gsCount = total - hindiCount;

  const hindi = buildHindiQuiz(hindiCount);
  const gs = buildGSQuiz(gsCount);

  return [...hindi, ...gs].sort(() => Math.random() - 0.5);
}

// Dedicated Hindi-only quiz
export function buildHindiOnlyQuiz(total: number, topic?: string): MCQ[] {
  return buildHindiQuiz(total, topic);
}

// Dedicated GS-only quiz
export function buildGSOnlyQuiz(total: number, topic?: string): MCQ[] {
  return buildGSQuiz(total, topic);
}
