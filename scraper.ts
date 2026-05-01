import Parser from 'rss-parser';

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  summary: string;
  category?: string;
}

const parser = new Parser({
  customFields: { item: ['content:encoded', 'description'] },
});

// UP-focused sources in priority order
const RSS_SOURCES = [
  { url: 'https://www.amarujala.com/rss/uttar-pradesh.xml', label: 'Amar Ujala UP' },
  { url: 'https://www.amarujala.com/rss/india-news.xml', label: 'Amar Ujala National' },
  { url: 'https://www.amarujala.com/rss/education.xml', label: 'Amar Ujala Education' },
  { url: 'https://feeds.bbci.co.uk/hindi/rss.xml', label: 'BBC Hindi' },
];

export async function fetchGKToday(limit = 10): Promise<NewsItem[]> {
  // Fetch from UP source + national source and merge
  const upNews = await fetchFromSource(RSS_SOURCES[0], Math.ceil(limit * 0.6));
  const nationalNews = await fetchFromSource(RSS_SOURCES[1], Math.floor(limit * 0.4));

  const merged = [...upNews, ...nationalNews].slice(0, limit);
  if (merged.length > 0) return merged;

  // Fallback: try remaining sources
  for (const source of RSS_SOURCES.slice(2)) {
    const items = await fetchFromSource(source, limit);
    if (items.length > 0) return items;
  }

  console.error('All RSS sources failed');
  return [];
}

async function fetchFromSource(
  source: { url: string; label: string },
  limit: number
): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(source.url);
    const items: NewsItem[] = feed.items.slice(0, limit).map((item) => ({
      title: (item.title || '').trim(),
      link: item.link || '',
      pubDate: item.pubDate || new Date().toISOString(),
      summary: cleanText(
        // @ts-ignore
        item['content:encoded'] || item.contentSnippet || item.content || item.description || ''
      ),
      category: item.categories?.[0],
    }));
    if (items.length > 0) console.log(`Fetched ${items.length} items from ${source.label}`);
    return items;
  } catch (err) {
    console.warn(`RSS failed for ${source.label}:`, (err as Error).message);
    return [];
  }
}

function cleanText(text: string): string {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 350);
}
