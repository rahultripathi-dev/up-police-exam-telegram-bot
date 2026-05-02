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

// UP-specific sources (used for 'up' and 'both' regions)
const UP_SOURCES = [
  { url: 'https://www.amarujala.com/rss/uttar-pradesh.xml', label: 'Amar Ujala UP' },
  { url: 'https://www.amarujala.com/rss/lucknow.xml', label: 'Amar Ujala Lucknow' },
];

// National/international sources
const INDIA_SOURCES = [
  { url: 'https://feeds.bbci.co.uk/hindi/rss.xml', label: 'BBC Hindi' },
  { url: 'https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3', label: 'PIB India' },
  { url: 'https://www.thehindu.com/news/national/feeder/default.rss', label: 'The Hindu National' },
  { url: 'https://www.thehindu.com/sci-tech/feeder/default.rss', label: 'The Hindu SciTech' },
  { url: 'https://www.amarujala.com/rss/india-news.xml', label: 'Amar Ujala National' },
  { url: 'https://www.amarujala.com/rss/education.xml', label: 'Amar Ujala Education' },
  { url: 'https://www.amarujala.com/rss/sports.xml', label: 'Amar Ujala Sports' },
];

// Hard excludes — noise that will NEVER appear in UP Police exam
const EXCLUDE_KEYWORDS = [
  // Crime & violence
  'हत्या', 'मर्डर', 'चोरी', 'डकैती', 'लूट', 'बलात्कार', 'दुष्कर्म', 'छेड़छाड़',
  'गिरफ्तार', 'गिरफ्तारी', 'फरार', 'मुठभेड़', 'एनकाउंटर', 'हमला',
  'अपहरण', 'फिरौती', 'तस्करी', 'ड्रग्स', 'नशा', 'गैंगस्टर', 'माफिया',
  'शव', 'लाश', 'आत्महत्या', 'जहर खाया', 'फांसी लगाई',
  // Corruption (local)
  'रिश्वत', 'घूस', 'रिश्वतखोरी',
  // Accidents & local disasters
  'दुर्घटना', 'हादसा', 'सड़क हादसा', 'रेल हादसा', 'आग लगी', 'आगजनी',
  'बाढ़', 'भूकंप', 'तूफान',
  // Political noise / agitation
  'विवाद', 'प्रदर्शन', 'धरना', 'झगड़ा', 'मारपीट', 'बवाल',
  'जनसभा', 'रैली', 'चुनाव प्रचार', 'चक्का जाम', 'आंदोलन',
  // Cultural/local events (not exam relevant)
  'कवि सम्मेलन', 'मेला', 'उत्सव', 'शादी', 'विवाह',
  // Aggregator/live blog titles
  'Today Live', 'ताजा खबरें', 'लाइव अपडेट', 'Breaking News Today',
  // English crime/noise
  'murder', 'rape', 'robbery', 'arrested', 'encounter', 'accident',
  'fire broke', 'riot', 'gang',
];

// Exam-relevant positive keywords — score 1 point each
// Items with higher score are more likely to appear in UP Police exam
const EXAM_KEYWORDS: string[] = [
  // Government schemes & policy
  'योजना', 'स्कीम', 'अभियान', 'मिशन', 'नीति', 'scheme', 'mission', 'portal', 'पोर्टल',
  // Appointments & records
  'नियुक्त', 'नियुक्ति', 'निर्वाचित', 'पहली बार', 'रिकॉर्ड', 'appointed', 'elected', 'record',
  // Awards & honours
  'पुरस्कार', 'सम्मान', 'अवॉर्ड', 'award', 'honour', 'prize', 'पदक', 'medal',
  // Economy & budget
  'बजट', 'जीडीपी', 'GDP', 'budget', 'निवेश', 'व्यापार', 'महंगाई', 'inflation',
  // Defence (national level)
  'सेना', 'नौसेना', 'वायुसेना', 'रक्षा मंत्री', 'army', 'navy', 'airforce', 'CRPF', 'BSF',
  // Space & science
  'ISRO', 'इसरो', 'उपग्रह', 'satellite', 'रॉकेट', 'rocket', 'अंतरिक्ष', 'space',
  'परमाणु', 'nuclear',
  // Sports (national/international)
  'ओलंपिक', 'olympic', 'championship', 'विश्व कप', 'World Cup',
  'Commonwealth', 'Asian Games', 'एशियाई खेल',
  // International affairs
  'summit', 'शिखर सम्मेलन', 'G20', 'G7', 'United Nations', 'संयुक्त राष्ट्र',
  'समझौता', 'agreement', 'treaty',
  // National government
  'प्रधानमंत्री', 'राष्ट्रपति', 'केंद्र सरकार', 'भारत सरकार', 'parliament', 'संसद',
  // UP government schemes/development
  'मुख्यमंत्री योगी', 'yogi', 'यूपी सरकार', 'उत्तर प्रदेश सरकार',
  'UP government', 'up govt',
  // Education (national)
  'शिक्षा नीति', 'NEP', 'विश्वविद्यालय', 'education policy', 'university',
  // Courts & constitution (major rulings)
  'संविधान', 'सुप्रीम कोर्ट', 'Supreme Court', 'High Court',
  // Health (national policies)
  'वैक्सीन', 'vaccine', 'स्वास्थ्य नीति', 'health policy',
  // Environment
  'जलवायु', 'climate', 'COP', 'पर्यावरण',
  // Infrastructure & development
  'एक्सप्रेसवे', 'expressway', 'हवाई अड्डा', 'airport', 'रेलवे', 'railway',
  'विकास परियोजना', 'development project',
];

function scoreItem(item: NewsItem): { pass: boolean; score: number } {
  const text = (item.title + ' ' + item.summary).toLowerCase();

  if (EXCLUDE_KEYWORDS.some((kw) => text.includes(kw.toLowerCase()))) {
    return { pass: false, score: 0 };
  }

  const score = EXAM_KEYWORDS.filter((kw) => text.includes(kw.toLowerCase())).length;
  return { pass: true, score };
}

export async function fetchGKToday(limit = 10, region: 'up' | 'india' | 'both' = 'both'): Promise<NewsItem[]> {
  const sources =
    region === 'up' ? UP_SOURCES :
    region === 'india' ? INDIA_SOURCES :
    [...UP_SOURCES, ...INDIA_SOURCES];

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

  // Score every item
  const scored = unique
    .map((item) => ({ item, ...scoreItem(item) }))
    .filter((x) => x.pass)
    .sort((a, b) => b.score - a.score);

  console.log(`Sources: ${all.length} raw → ${unique.length} unique → ${scored.length} after filter`);
  if (scored.length > 0) {
    console.log(`Top: ${scored.slice(0, 3).map(x => `[${x.score}] ${x.item.title.slice(0, 40)}`).join(' | ')}`);
  }

  // Return highest-scoring items first; fallback to any passing items if not enough scored ones
  const highValue = scored.filter((x) => x.score > 0).map((x) => x.item);
  if (highValue.length >= Math.ceil(limit * 0.6)) {
    return highValue.slice(0, limit);
  }

  // Not enough high-value items — include zero-score passing items too
  console.warn(`Only ${highValue.length} high-value items, padding with lower-scored items`);
  return scored.slice(0, limit).map((x) => x.item);
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
