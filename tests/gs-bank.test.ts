import { gsBank, buildGSQuiz, getGSBankSize, GSQuestion } from '../gs-bank';

describe('gsBank data integrity', () => {
  it('bank is non-empty', () => {
    expect(gsBank.length).toBeGreaterThan(0);
  });

  it('has at least 100 questions', () => {
    expect(gsBank.length).toBeGreaterThanOrEqual(100);
  });

  it('every question has non-empty question text', () => {
    gsBank.forEach((q) => {
      expect(q.question.trim().length).toBeGreaterThan(0);
    });
  });

  it('every question has exactly 4 options', () => {
    gsBank.forEach((q) => {
      expect(q.options).toHaveLength(4);
    });
  });

  it('every option is non-empty', () => {
    gsBank.forEach((q) => {
      q.options.forEach((opt) => {
        expect(opt.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('correctIndex is always 0–3', () => {
    gsBank.forEach((q) => {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThanOrEqual(3);
    });
  });

  it('every question has a non-empty explanation', () => {
    gsBank.forEach((q) => {
      expect(q.explanation.trim().length).toBeGreaterThan(0);
    });
  });

  it('every question has a topic', () => {
    gsBank.forEach((q: GSQuestion) => {
      expect(q.topic.trim().length).toBeGreaterThan(0);
    });
  });

  it('contains all required syllabus topics', () => {
    const topics = new Set(gsBank.map((q: GSQuestion) => q.topic));
    const required = ['up-special', 'constitution', 'history', 'economy', 'science', 'security'];
    required.forEach((t) => {
      expect(topics.has(t)).toBe(true);
    });
  });

  it('UP Special has at least 40 questions (8–10 in exam)', () => {
    const count = gsBank.filter(q => q.topic === 'up-special').length;
    expect(count).toBeGreaterThanOrEqual(40);
  });

  it('constitution has at least 15 questions', () => {
    const count = gsBank.filter(q => q.topic === 'constitution').length;
    expect(count).toBeGreaterThanOrEqual(15);
  });

  it('history has at least 15 questions', () => {
    const count = gsBank.filter(q => q.topic === 'history').length;
    expect(count).toBeGreaterThanOrEqual(15);
  });

  it('economy has at least 8 questions', () => {
    const count = gsBank.filter(q => q.topic === 'economy').length;
    expect(count).toBeGreaterThanOrEqual(8);
  });

  it('no duplicate question texts', () => {
    const questions = gsBank.map(q => q.question.trim().toLowerCase());
    const unique = new Set(questions);
    expect(unique.size).toBe(questions.length);
  });

  // Spot-check critical facts
  it('UP capital question has correct answer Lucknow', () => {
    const q = gsBank.find(q => q.question.includes('उत्तर प्रदेश की राजधानी'));
    expect(q).toBeDefined();
    expect(q!.options[q!.correctIndex]).toContain('लखनऊ');
  });

  it('GST launch year question is correct (2017)', () => {
    const q = gsBank.find(q => q.question.includes('GST') && q.question.includes('कब'));
    expect(q).toBeDefined();
    expect(q!.options[q!.correctIndex]).toContain('2017');
  });

  it('Indian constitution came into effect on 26 Jan 1950', () => {
    const q = gsBank.find(q => q.question.includes('संविधान') && q.question.includes('लागू'));
    expect(q).toBeDefined();
    expect(q!.options[q!.correctIndex]).toContain('1950');
  });
});

describe('getGSBankSize', () => {
  it('returns the bank length', () => {
    expect(getGSBankSize()).toBe(gsBank.length);
  });

  it('returns a positive number', () => {
    expect(getGSBankSize()).toBeGreaterThan(0);
  });
});

describe('buildGSQuiz', () => {
  it('returns exactly N questions', () => {
    const quiz = buildGSQuiz(5);
    expect(quiz).toHaveLength(5);
  });

  it('returns 10 questions when asked for 10', () => {
    const quiz = buildGSQuiz(10);
    expect(quiz).toHaveLength(10);
  });

  it('all returned questions have valid structure', () => {
    const quiz = buildGSQuiz(10);
    quiz.forEach((q) => {
      expect(q.question.length).toBeGreaterThan(0);
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThanOrEqual(3);
      expect(q.explanation.length).toBeGreaterThan(0);
    });
  });

  it('topic filter works for up-special', () => {
    const quiz = buildGSQuiz(10, 'up-special');
    quiz.forEach((q: GSQuestion) => {
      expect(q.topic).toBe('up-special');
    });
  });

  it('topic filter works for history', () => {
    const quiz = buildGSQuiz(10, 'history');
    quiz.forEach((q: GSQuestion) => {
      expect(q.topic).toBe('history');
    });
  });

  it('mixed quiz covers multiple topics', () => {
    const quiz = buildGSQuiz(20);
    const topics = new Set(quiz.map((q: GSQuestion) => q.topic));
    expect(topics.size).toBeGreaterThan(1);
  });

  it('UP Special questions are well represented in mixed quiz', () => {
    const quiz = buildGSQuiz(20);
    const upCount = quiz.filter(q => (q as GSQuestion).topic === 'up-special').length;
    // Weight is 3/12 = 25%, so ~5 out of 20
    expect(upCount).toBeGreaterThanOrEqual(2);
  });

  it('does not return duplicates in one quiz', () => {
    const quiz = buildGSQuiz(30);
    const questions = quiz.map(q => q.question);
    const unique = new Set(questions);
    expect(unique.size).toBe(questions.length);
  });

  it('returns empty array for unknown topic', () => {
    const quiz = buildGSQuiz(5, 'nonexistent-topic');
    expect(quiz).toHaveLength(0);
  });
});
