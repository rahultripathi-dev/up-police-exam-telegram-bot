// Test the scoring/filtering logic without hitting real HTTP endpoints
import { NewsItem } from '../scraper';

// We test the internal scoring logic by importing the module and checking
// the exported fetchGKToday behaviour with mocked axios + rss-parser

jest.mock('rss-parser', () => {
  return jest.fn().mockImplementation(() => ({
    parseURL: jest.fn().mockResolvedValue({ items: [] }),
  }));
});

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: '' }),
}));

import { fetchGKToday } from '../scraper';

// Helper to build a NewsItem
const makeItem = (title: string, summary = ''): NewsItem => ({
  title,
  link: 'https://example.com',
  pubDate: new Date().toISOString(),
  summary,
});

describe('fetchGKToday (mocked sources — empty feeds)', () => {
  it('returns empty array when all sources return no items', async () => {
    const news = await fetchGKToday(10, 'both');
    expect(Array.isArray(news)).toBe(true);
    expect(news.length).toBe(0);
  });

  it('accepts region "up" without throwing', async () => {
    await expect(fetchGKToday(5, 'up')).resolves.not.toThrow();
  });

  it('accepts region "india" without throwing', async () => {
    await expect(fetchGKToday(5, 'india')).resolves.not.toThrow();
  });

  it('accepts region "both" without throwing', async () => {
    await expect(fetchGKToday(5, 'both')).resolves.not.toThrow();
  });
});

// Test the scoring logic indirectly using a patched version
describe('news filtering logic (unit)', () => {
  // Replicate the EXCLUDE_KEYWORDS and EXAM_KEYWORDS logic inline
  // to test what would pass/fail the filter without mocking internals
  const EXCLUDE_KEYWORDS = ['हत्या', 'मर्डर', 'गिरफ्तार', 'शव', 'रिश्वत', 'Today Live', 'Breaking News Today'];
  const EXAM_KEYWORDS = ['योजना', 'पुरस्कार', 'ISRO', 'बजट', 'संविधान', 'ओलंपिक', 'summit'];

  const shouldExclude = (item: NewsItem): boolean => {
    const text = (item.title + ' ' + item.summary).toLowerCase();
    return EXCLUDE_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
  };

  const scoreItem = (item: NewsItem): number => {
    const text = (item.title + ' ' + item.summary).toLowerCase();
    return EXAM_KEYWORDS.filter(kw => text.includes(kw.toLowerCase())).length;
  };

  it('excludes crime news (हत्या)', () => {
    expect(shouldExclude(makeItem('युवक की हत्या लखनऊ में'))).toBe(true);
  });

  it('excludes murder news', () => {
    expect(shouldExclude(makeItem('मर्डर केस में आरोपी गिरफ्तार'))).toBe(true);
  });

  it('excludes corruption news (रिश्वत)', () => {
    expect(shouldExclude(makeItem('जेई ने रिश्वत माँगी'))).toBe(true);
  });

  it('excludes body/corpse news (शव)', () => {
    expect(shouldExclude(makeItem('पेड़ के नीचे मिला शव'))).toBe(true);
  });

  it('excludes aggregator title "Today Live"', () => {
    expect(shouldExclude(makeItem('UP News Today Live: ताजा खबरें'))).toBe(true);
  });

  it('does not exclude government scheme news', () => {
    expect(shouldExclude(makeItem('PM ने नई योजना का शुभारंभ किया'))).toBe(false);
  });

  it('does not exclude sports news', () => {
    expect(shouldExclude(makeItem('India wins gold at ओलंपिक'))).toBe(false);
  });

  it('does not exclude budget news', () => {
    expect(shouldExclude(makeItem('बजट में किसानों को राहत'))).toBe(false);
  });

  it('gives score 0 to generic news', () => {
    expect(scoreItem(makeItem('आज मौसम साफ रहेगा'))).toBe(0);
  });

  it('gives score 1 to scheme news', () => {
    expect(scoreItem(makeItem('नई सरकारी योजना शुरू'))).toBe(1);
  });

  it('gives score 2 to multi-keyword news', () => {
    expect(scoreItem(makeItem('PM Modi inaugurates ISRO facility, receives पुरस्कार'))).toBe(2);
  });

  it('gives high score to exam-relevant news', () => {
    const item = makeItem('India wins ओलंपिक medal, PM announces बजट allocation at summit');
    expect(scoreItem(item)).toBeGreaterThanOrEqual(3);
  });
});
