import { hindiBank, buildHindiQuiz, getHindiBankSize, HindiMCQ } from '../hindi-bank';

describe('hindiBank data integrity', () => {
  it('bank is non-empty', () => {
    expect(hindiBank.length).toBeGreaterThan(0);
  });

  it('has at least 150 questions', () => {
    expect(hindiBank.length).toBeGreaterThanOrEqual(150);
  });

  it('every question has non-empty question text', () => {
    hindiBank.forEach((q, i) => {
      expect(q.question.trim().length).toBeGreaterThan(0);
    });
  });

  it('every question has exactly 4 options', () => {
    hindiBank.forEach((q, i) => {
      expect(q.options).toHaveLength(4);
    });
  });

  it('every option is non-empty', () => {
    hindiBank.forEach((q) => {
      q.options.forEach((opt) => {
        expect(opt.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('correctIndex is always 0–3', () => {
    hindiBank.forEach((q) => {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThanOrEqual(3);
    });
  });

  it('every question has a non-empty explanation', () => {
    hindiBank.forEach((q) => {
      expect(q.explanation.trim().length).toBeGreaterThan(0);
    });
  });

  it('every question has a topic', () => {
    hindiBank.forEach((q: HindiMCQ) => {
      expect(q.topic.trim().length).toBeGreaterThan(0);
    });
  });

  it('contains all required topic categories', () => {
    const topics = new Set(hindiBank.map((q: HindiMCQ) => q.topic));
    const required = ['paryayvachi', 'vilom', 'tatsam-tadbhav', 'muhavare', 'grammar', 'authors'];
    required.forEach((t) => {
      expect(topics.has(t)).toBe(true);
    });
  });

  it('paryayvachi has at least 25 questions', () => {
    const count = hindiBank.filter(q => q.topic === 'paryayvachi').length;
    expect(count).toBeGreaterThanOrEqual(25);
  });

  it('vilom has at least 25 questions', () => {
    const count = hindiBank.filter(q => q.topic === 'vilom').length;
    expect(count).toBeGreaterThanOrEqual(25);
  });

  it('muhavare has at least 20 questions', () => {
    const count = hindiBank.filter(q => q.topic === 'muhavare').length;
    expect(count).toBeGreaterThanOrEqual(20);
  });

  it('no duplicate question texts', () => {
    const questions = hindiBank.map(q => q.question.trim().toLowerCase());
    const unique = new Set(questions);
    expect(unique.size).toBe(questions.length);
  });
});

describe('getHindiBankSize', () => {
  it('returns the bank length', () => {
    expect(getHindiBankSize()).toBe(hindiBank.length);
  });

  it('returns a positive number', () => {
    expect(getHindiBankSize()).toBeGreaterThan(0);
  });
});

describe('buildHindiQuiz', () => {
  it('returns exactly N questions when N <= bank size', () => {
    const quiz = buildHindiQuiz(5);
    expect(quiz).toHaveLength(5);
  });

  it('returns 10 questions when asked for 10', () => {
    const quiz = buildHindiQuiz(10);
    expect(quiz).toHaveLength(10);
  });

  it('all returned questions are valid MCQs', () => {
    const quiz = buildHindiQuiz(10);
    quiz.forEach((q) => {
      expect(q.question.length).toBeGreaterThan(0);
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThanOrEqual(3);
      expect(q.explanation.length).toBeGreaterThan(0);
    });
  });

  it('topic filter returns only matching questions', () => {
    const quiz = buildHindiQuiz(10, 'paryayvachi');
    quiz.forEach((q: HindiMCQ) => {
      expect(q.topic).toBe('paryayvachi');
    });
  });

  it('topic filter returns only vilom questions', () => {
    const quiz = buildHindiQuiz(10, 'vilom');
    quiz.forEach((q: HindiMCQ) => {
      expect(q.topic).toBe('vilom');
    });
  });

  it('returns empty array for unknown topic', () => {
    const quiz = buildHindiQuiz(5, 'nonexistent-topic');
    expect(quiz).toHaveLength(0);
  });

  it('mixed quiz covers multiple topics', () => {
    const quiz = buildHindiQuiz(20);
    const topics = new Set(quiz.map((q: HindiMCQ) => q.topic));
    expect(topics.size).toBeGreaterThan(1);
  });

  it('results are randomised (two calls differ)', () => {
    const q1 = buildHindiQuiz(20).map(q => q.question);
    const q2 = buildHindiQuiz(20).map(q => q.question);
    // With 275+ questions, two runs of 20 should differ at least sometimes
    // This test has a tiny chance of flaking; acceptable for randomness check
    const same = q1.every((q, i) => q === q2[i]);
    expect(same).toBe(false);
  });

  it('does not return duplicate questions in one quiz', () => {
    const quiz = buildHindiQuiz(30);
    const questions = quiz.map(q => q.question);
    const unique = new Set(questions);
    expect(unique.size).toBe(questions.length);
  });
});
