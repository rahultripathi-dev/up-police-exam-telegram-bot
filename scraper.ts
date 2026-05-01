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

const UP_SOURCES = [
  { url: 'https://www.amarujala.com/rss/uttar-pradesh.xml', label: 'Amar Ujala UP' },
];

const INDIA_SOURCES = [
  { url: 'https://www.amarujala.com/rss/india-news.xml', label: 'Amar Ujala National' },
  { url: 'https://www.jagran.com/rss/national.xml', label: 'Jagran National' },
  { url: 'https://navbharattimes.indiatimes.com/rss/national.xml', label: 'NBT National' },
  { url: 'https://feeds.bbci.co.uk/hindi/rss.xml', label: 'BBC Hindi' },
  { url: 'https://www.amarujala.com/rss/education.xml', label: 'Amar Ujala Education' },
  { url: 'https://www.jagran.com/rss/education.xml', label: 'Jagran Education' },
  { url: 'https://www.amarujala.com/rss/business.xml', label: 'Amar Ujala Business' },
  { url: 'https://www.amarujala.com/rss/technology.xml', label: 'Amar Ujala Tech' },
  { url: 'https://www.amarujala.com/rss/sports.xml', label: 'Amar Ujala Sports' },
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

export async function fetchGKToday(limit = 10, region: 'up' | 'india' | 'both' = 'both'): Promise<NewsItem[]> {
  const sources =
    region === 'up' ? UP_SOURCES :
    region === 'india' ? INDIA_SOURCES :
    [...UP_SOURCES, ...INDIA_SOURCES];

  // Fetch from selected sources in parallel, 15 items each
  const results = await Promise.allSettled(
    sources.map((src) => fetchFromSource(src, 15))
  );

  const all: NewsItem[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') all.push(...r.value);
  }

  // Deduplicate by normalised title
  const seen = new Set<string>();
  const unique = all.filter((item) => {
    const key = item.title.replace(/\s+/g, ' ').toLowerCase().slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const filtered = unique.filter(isExamRelevant).slice(0, limit);
  console.log(`Sources: ${all.length} raw → ${unique.length} unique → ${filtered.length} exam-relevant`);

  if (filtered.length > 0) return filtered;

  // Last resort: return unfiltered unique items
  console.warn('Filter too aggressive, returning unfiltered items');
  return unique.slice(0, limit);
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
