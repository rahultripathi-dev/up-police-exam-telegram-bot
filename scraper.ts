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

// Keywords to exclude — crime, accidents, politics noise
const EXCLUDE_KEYWORDS = [
  // Crime
  'हत्या', 'मर्डर', 'चोरी', 'डकैती', 'लूट', 'बलात्कार', 'दुष्कर्म', 'छेड़छाड़',
  'गिरफ्तार', 'गिरफ्तारी', 'फरार', 'जेल', 'मुठभेड़', 'एनकाउंटर', 'हमला',
  'अपहरण', 'फिरौती', 'तस्करी', 'ड्रग्स', 'नशा', 'गैंगस्टर', 'माफिया',
  // Accidents & disasters
  'दुर्घटना', 'हादसा', 'सड़क हादसा', 'रेल हादसा', 'आग लगी', 'आगजनी',
  'बाढ़', 'भूकंप', 'तूफान', 'मौसम', 'बारिश', 'ओलावृष्टि',
  // Political noise
  'विवाद', 'आरोप', 'प्रदर्शन', 'धरना', 'झगड़ा', 'मारपीट', 'बवाल',
  'जनसभा', 'रैली', 'चुनाव प्रचार',
  // English equivalents
  'murder', 'rape', 'robbery', 'arrested', 'encounter', 'accident', 'fire broke',
  'riot', 'protest', 'gang',
];

function isExamRelevant(item: NewsItem): boolean {
  const text = (item.title + ' ' + item.summary).toLowerCase();
  return !EXCLUDE_KEYWORDS.some((kw) => text.includes(kw.toLowerCase()));
}

export async function fetchGKToday(limit = 10): Promise<NewsItem[]> {
  // Fetch extra to compensate for filtered items
  const fetchLimit = limit * 3;
  const upNews = await fetchFromSource(RSS_SOURCES[0], Math.ceil(fetchLimit * 0.6));
  const nationalNews = await fetchFromSource(RSS_SOURCES[1], Math.floor(fetchLimit * 0.4));

  const filtered = [...upNews, ...nationalNews].filter(isExamRelevant).slice(0, limit);
  console.log(`After filtering: ${filtered.length}/${upNews.length + nationalNews.length} exam-relevant items`);
  if (filtered.length > 0) return filtered;

  // Fallback: try remaining sources
  for (const source of RSS_SOURCES.slice(2)) {
    const items = await fetchFromSource(source, fetchLimit);
    const fallbackFiltered = items.filter(isExamRelevant).slice(0, limit);
    if (fallbackFiltered.length > 0) return fallbackFiltered;
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
