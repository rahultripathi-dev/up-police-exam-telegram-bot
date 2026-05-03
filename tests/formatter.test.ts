import { formatNewsMessage, formatMCQWithKeyboard, formatMCQResult, formatMCQMessage, formatMCQAnswer } from '../formatter';
import { NewsItem } from '../scraper';
import { MCQ } from '../mcq';

const sampleNews: NewsItem[] = [
  { title: 'GST revenue rises in April', link: 'https://example.com/1', pubDate: new Date().toISOString(), summary: 'GST collections hit record high.' },
  { title: 'UP Police launches new scheme', link: 'https://example.com/2', pubDate: new Date().toISOString(), summary: 'New scheme for constables.' },
];

const sampleMCQ: MCQ = {
  question: 'भारत की राजधानी क्या है?',
  options: ['A) मुंबई', 'B) नई दिल्ली', 'C) चेन्नई', 'D) कोलकाता'],
  correctIndex: 1,
  explanation: 'नई दिल्ली भारत की राजधानी है।',
};

describe('formatNewsMessage', () => {
  it('returns a string', () => {
    const msg = formatNewsMessage(sampleNews);
    expect(typeof msg).toBe('string');
  });

  it('contains each news title', () => {
    const msg = formatNewsMessage(sampleNews);
    expect(msg).toContain('GST revenue rises in April');
    expect(msg).toContain('UP Police launches new scheme');
  });

  it('contains article links', () => {
    const msg = formatNewsMessage(sampleNews);
    expect(msg).toContain('https://example.com/1');
  });

  it('contains HTML bold tags', () => {
    const msg = formatNewsMessage(sampleNews);
    expect(msg).toContain('<b>');
    expect(msg).toContain('</b>');
  });

  it('escapes < > & in titles', () => {
    const newsWithSpecialChars: NewsItem[] = [{
      title: 'Tax < 10% & GST > 5%',
      link: '', pubDate: '', summary: '',
    }];
    const msg = formatNewsMessage(newsWithSpecialChars);
    expect(msg).not.toContain('<10%');
    expect(msg).toContain('&lt;');
    expect(msg).toContain('&amp;');
  });

  it('handles empty news array without throwing', () => {
    expect(() => formatNewsMessage([])).not.toThrow();
  });

  it('omits link line when link is empty', () => {
    const news: NewsItem[] = [{ title: 'Test', link: '', pubDate: '', summary: 'Summary' }];
    const msg = formatNewsMessage(news);
    expect(msg).not.toContain('पूरी खबर पढ़ें');
  });
});

describe('formatMCQWithKeyboard', () => {
  it('returns text and reply_markup', () => {
    const result = formatMCQWithKeyboard(sampleMCQ, 0, 5);
    expect(result).toHaveProperty('text');
    expect(result).toHaveProperty('reply_markup');
  });

  it('text contains question number', () => {
    const { text } = formatMCQWithKeyboard(sampleMCQ, 2, 5);
    expect(text).toContain('3 / 5');
  });

  it('text contains the question', () => {
    const { text } = formatMCQWithKeyboard(sampleMCQ, 0, 5);
    expect(text).toContain('भारत की राजधानी क्या है?');
  });

  it('reply_markup has 4 inline buttons', () => {
    const { reply_markup } = formatMCQWithKeyboard(sampleMCQ, 0, 5) as any;
    expect(reply_markup.inline_keyboard[0]).toHaveLength(4);
  });

  it('buttons have correct callback_data', () => {
    const { reply_markup } = formatMCQWithKeyboard(sampleMCQ, 1, 5) as any;
    const buttons = reply_markup.inline_keyboard[0];
    expect(buttons[0].callback_data).toBe('q:1:0');
    expect(buttons[3].callback_data).toBe('q:1:3');
  });

  it('buttons are labeled A B C D', () => {
    const { reply_markup } = formatMCQWithKeyboard(sampleMCQ, 0, 5) as any;
    const buttons = reply_markup.inline_keyboard[0];
    expect(buttons.map((b: any) => b.text)).toEqual(['A', 'B', 'C', 'D']);
  });
});

describe('formatMCQResult', () => {
  it('shows ✅ when correct', () => {
    const text = formatMCQResult(sampleMCQ, 0, 5, 1); // correctIndex = 1
    expect(text).toContain('✅');
    expect(text).toContain('सही');
  });

  it('shows ❌ when wrong', () => {
    const text = formatMCQResult(sampleMCQ, 0, 5, 0); // wrong answer
    expect(text).toContain('❌');
    expect(text).toContain('गलत');
  });

  it('shows explanation', () => {
    const text = formatMCQResult(sampleMCQ, 0, 5, 1);
    expect(text).toContain('नई दिल्ली भारत की राजधानी है');
  });

  it('marks correct option with ✅ even when wrong answer chosen', () => {
    const text = formatMCQResult(sampleMCQ, 0, 5, 0); // chose 0, correct is 1
    expect(text).toContain('✅');  // correct option still marked
    expect(text).toContain('❌');  // wrong choice marked
  });

  it('shows question number in result', () => {
    const text = formatMCQResult(sampleMCQ, 2, 5, 1);
    expect(text).toContain('प्रश्न 3');
  });
});

describe('formatMCQMessage (legacy)', () => {
  it('returns array of strings', () => {
    const msgs = formatMCQMessage([sampleMCQ]);
    expect(Array.isArray(msgs)).toBe(true);
    expect(msgs).toHaveLength(1);
  });

  it('contains question text', () => {
    const msgs = formatMCQMessage([sampleMCQ, sampleMCQ]);
    expect(msgs[0]).toContain('भारत की राजधानी');
    expect(msgs[1]).toContain('प्रश्न 2');
  });
});

describe('formatMCQAnswer', () => {
  it('contains correct answer text', () => {
    const text = formatMCQAnswer(sampleMCQ, 1);
    expect(text).toContain('नई दिल्ली');
  });

  it('contains explanation', () => {
    const text = formatMCQAnswer(sampleMCQ, 1);
    expect(text).toContain('नई दिल्ली भारत की राजधानी है');
  });
});
