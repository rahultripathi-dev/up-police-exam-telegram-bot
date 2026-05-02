import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

export interface GKQuestion {
  question: string;
  options: string[]; // ["A) ...", "B) ...", "C) ...", "D) ..."]
  correctIndex: number;
  explanation: string;
  category: string;
}

const BANK_PATH = path.join(
  path.dirname(process.env.DB_PATH?.startsWith('/data') ? './data/users.json' : process.env.DB_PATH || './data/users.json'),
  'gk-bank.json'
);

// UP Police exam relevant categories only
const CATEGORIES = [
  { name: 'Indian History',           slug: 'indian-history',           pages: 10 },
  { name: 'Indian Politics',          slug: 'indian-politics',          pages: 10 },
  { name: 'Indian Geography',         slug: 'indian-geography',         pages: 8  },
  { name: 'Indian Economy',           slug: 'indian-economy',           pages: 8  },
  { name: 'General Science',          slug: 'general-science',          pages: 8  },
  { name: 'Famous Personalities',     slug: 'famous-personalities',     pages: 8  },
  { name: 'Sports',                   slug: 'sports',                   pages: 8  },
  { name: 'Honours and Awards',       slug: 'honours-and-awards',       pages: 6  },
  { name: 'Basic General Knowledge',  slug: 'basic-general-knowledge',  pages: 10 },
];

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
};

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

async function scrapePage(url: string, category: string): Promise<GKQuestion[]> {
  try {
    const res = await axios.get(url, { headers: HEADERS, timeout: 15000 });
    const $ = cheerio.load(res.data);
    const questions: GKQuestion[] = [];

    $('.bix-div-container').each((_, el) => {
      try {
        const question = $(el).find('.bix-td-qtxt').text().trim();
        if (!question) return;

        const options: string[] = [];
        $(el).find('.bix-opt-row').each((i, optEl) => {
          if (i >= 4) return;
          const text = $(optEl).find('.bix-td-option-val .flex-wrap').text().trim();
          if (text) options.push(`${['A', 'B', 'C', 'D'][i]}) ${text}`);
        });
        if (options.length !== 4) return;

        const correctLetter = $(el).find('input.jq-hdnakq').attr('value') || 'A';
        const correctIndex = ['A', 'B', 'C', 'D'].indexOf(correctLetter.toUpperCase());
        if (correctIndex === -1) return;

        const explanation = $(el).find('.bix-ans-description').text().trim().slice(0, 200);
        questions.push({ question, options, correctIndex, explanation, category });
      } catch {}
    });

    return questions;
  } catch (err) {
    console.warn(`Scrape failed [${url}]:`, (err as Error).message);
    return [];
  }
}

export async function scrapeGKBank(
  onProgress?: (msg: string) => Promise<void>
): Promise<number> {
  await fs.mkdir(path.dirname(BANK_PATH), { recursive: true });
  const all: GKQuestion[] = [];

  for (const cat of CATEGORIES) {
    await onProgress?.(`📚 Scraping: ${cat.name}...`);
    const base = `https://www.indiabix.com/general-knowledge/${cat.slug}/`;

    // Page 1
    all.push(...await scrapePage(base, cat.name));
    await sleep(1200);

    // Pages 2..N
    for (let p = 2; p <= cat.pages; p++) {
      const url = `${base}005${String(p).padStart(3, '0')}`;
      all.push(...await scrapePage(url, cat.name));
      await sleep(1200);
    }

    await onProgress?.(`✅ ${cat.name} done — total: ${all.length} questions`);
  }

  await fs.writeFile(BANK_PATH, JSON.stringify(all));
  console.log(`✅ GK Bank saved: ${all.length} questions → ${BANK_PATH}`);
  return all.length;
}

export async function loadGKBank(): Promise<GKQuestion[]> {
  try {
    const raw = await fs.readFile(BANK_PATH, 'utf-8');
    const data = JSON.parse(raw) as GKQuestion[];
    console.log(`📚 GK Bank loaded: ${data.length} questions`);
    return data;
  } catch {
    return [];
  }
}

export function getBankPath(): string {
  return BANK_PATH;
}
