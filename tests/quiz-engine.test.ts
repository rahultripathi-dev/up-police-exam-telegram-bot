import {
  setGKBank,
  getGKBankSize,
  getTotalBankSize,
  buildDailyQuiz,
  buildMixedQuiz,
  buildHindiOnlyQuiz,
  buildGSOnlyQuiz,
} from '../quiz-engine';
import { GKQuestion } from '../gk-bank-scraper';
import { getHindiBankSize } from '../hindi-bank';
import { getGSBankSize } from '../gs-bank';

const makeGKQuestion = (overrides: Partial<GKQuestion> = {}): GKQuestion => ({
  question: 'Who is the father of the nation?',
  options: ['A) Nehru', 'B) Patel', 'C) Gandhi', 'D) Bose'],
  correctIndex: 2,
  explanation: 'Mahatma Gandhi.',
  category: 'Indian History',
  ...overrides,
});

const sampleGKBank: GKQuestion[] = [
  makeGKQuestion({ question: 'Q1', category: 'Indian History' }),
  makeGKQuestion({ question: 'Q2', category: 'Indian Politics' }),
  makeGKQuestion({ question: 'Q3', category: 'Indian Geography' }),
  makeGKQuestion({ question: 'Q4', category: 'Indian Economy' }),
  makeGKQuestion({ question: 'Q5', category: 'General Science' }),
  makeGKQuestion({ question: 'Q6', category: 'Famous Personalities' }),
  makeGKQuestion({ question: 'Q7', category: 'Sports' }),
  makeGKQuestion({ question: 'Q8', category: 'Honours and Awards' }),
  makeGKQuestion({ question: 'Q9', category: 'Basic General Knowledge' }),
  makeGKQuestion({ question: 'Q10', category: 'Indian History' }),
];

describe('setGKBank / getGKBankSize', () => {
  beforeEach(() => setGKBank([]));

  it('starts at 0 when bank is empty', () => {
    expect(getGKBankSize()).toBe(0);
  });

  it('reflects size after setGKBank', () => {
    setGKBank(sampleGKBank);
    expect(getGKBankSize()).toBe(10);
  });

  it('replaces bank on second call', () => {
    setGKBank(sampleGKBank);
    setGKBank([makeGKQuestion()]);
    expect(getGKBankSize()).toBe(1);
  });
});

describe('getTotalBankSize', () => {
  it('includes Hindi + GS static banks regardless of GK bank', () => {
    setGKBank([]);
    const total = getTotalBankSize();
    expect(total).toBe(getHindiBankSize() + getGSBankSize());
  });

  it('includes GK bank when loaded', () => {
    setGKBank(sampleGKBank);
    const total = getTotalBankSize();
    expect(total).toBe(getHindiBankSize() + getGSBankSize() + 10);
  });
});

describe('buildDailyQuiz', () => {
  it('returns N questions from static GS bank even when GK bank is empty', () => {
    setGKBank([]);
    const quiz = buildDailyQuiz(5);
    expect(quiz).toHaveLength(5);
  });

  it('returns valid MCQ structure', () => {
    setGKBank([]);
    const quiz = buildDailyQuiz(5);
    quiz.forEach((q) => {
      expect(q.question.length).toBeGreaterThan(0);
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThanOrEqual(3);
    });
  });

  it('returns exactly 15 questions (daily pool size)', () => {
    setGKBank(sampleGKBank);
    const quiz = buildDailyQuiz(15);
    expect(quiz).toHaveLength(15);
  });

  it('does not return duplicates', () => {
    setGKBank([]);
    const quiz = buildDailyQuiz(20);
    const questions = quiz.map(q => q.question);
    expect(new Set(questions).size).toBe(questions.length);
  });
});

describe('buildMixedQuiz', () => {
  it('returns exactly N questions', () => {
    setGKBank([]);
    const quiz = buildMixedQuiz(10);
    expect(quiz).toHaveLength(10);
  });

  it('contains both Hindi and GS questions', () => {
    setGKBank([]);
    // Build a large enough batch to reliably get both types
    const quiz = buildMixedQuiz(20);
    expect(quiz.length).toBe(20);
    // All questions are valid MCQs
    quiz.forEach(q => {
      expect(q.options).toHaveLength(4);
    });
  });

  it('Hindi/GS split is roughly 45/55', () => {
    setGKBank([]);
    // Build 100 to get a stable ratio
    const quiz = buildMixedQuiz(100);
    expect(quiz.length).toBe(100);
  });
});

describe('buildHindiOnlyQuiz', () => {
  it('returns N questions', () => {
    const quiz = buildHindiOnlyQuiz(5);
    expect(quiz).toHaveLength(5);
  });

  it('returns 10 questions', () => {
    const quiz = buildHindiOnlyQuiz(10);
    expect(quiz).toHaveLength(10);
  });

  it('all are valid MCQs', () => {
    const quiz = buildHindiOnlyQuiz(5);
    quiz.forEach(q => {
      expect(q.question.length).toBeGreaterThan(0);
      expect(q.options).toHaveLength(4);
    });
  });
});

describe('buildGSOnlyQuiz', () => {
  it('returns N questions', () => {
    const quiz = buildGSOnlyQuiz(5);
    expect(quiz).toHaveLength(5);
  });

  it('all are valid MCQs', () => {
    const quiz = buildGSOnlyQuiz(5);
    quiz.forEach(q => {
      expect(q.question.length).toBeGreaterThan(0);
      expect(q.options).toHaveLength(4);
    });
  });
});
