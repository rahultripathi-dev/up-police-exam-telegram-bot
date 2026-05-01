import axios from 'axios';
import * as cheerio from 'cheerio';
import { MCQ } from './mcq';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
};

const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];

function dateUrl(daysAgo = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const dd = String(d.getDate()).padStart(2, '0');
  const month = MONTHS[d.getMonth()];
  const yyyy = d.getFullYear();
  return `https://affairscloud.com/current-affairs-quiz${dd}-${month}-${yyyy}/`;
}

// --- AffairsCloud ---
// Structure: <ol><li><strong>question</strong><br>1) opt<br>2) opt...<button class="collapsible">
//            <div class="content">Answer- <strong>2) text</strong>...Explanation:...</div>
async function scrapeAffairsCloud(): Promise<MCQ[]> {
  // Try today, then yesterday (quiz may not be up yet at midnight)
  for (const daysAgo of [0, 1]) {
    const url = dateUrl(daysAgo);
    try {
      const res = await axios.get(url, { headers: HEADERS, timeout: 15000 });
      const $ = cheerio.load(res.data);
      const mcqs: MCQ[] = [];

      $('.td-post-content ol li').each((_, el) => {
        try {
          const question = $(el).find('strong').first().text().trim();
          if (!question) return;

          // Extract options from text node lines before the button
          const beforeBtn = ($(el).html() || '').split('<button')[0];
          const plainText = cheerio.load(beforeBtn).text();
          const rawOpts = plainText
            .split('\n')
            .map(l => l.trim())
            .filter(l => /^\d+\)/.test(l));

          if (rawOpts.length < 4) return;

          // Map 1),2),3),4) → A),B),C),D)
          const options = rawOpts.slice(0, 4).map((opt, i) => {
            const text = opt.replace(/^\d+\)\s*/, '').trim();
            return `${['A', 'B', 'C', 'D'][i]}) ${text}`;
          });

          // Correct answer index from "Answer- <strong>N)</strong>"
          const contentText = $(el).find('.content').text();
          const answerMatch = contentText.match(/Answer\s*[-–]?\s*(\d+)\)/i);
          if (!answerMatch) return;
          const correctIndex = parseInt(answerMatch[1], 10) - 1;
          if (correctIndex < 0 || correctIndex > 3) return;

          const explanation = contentText
            .replace(/Answer[^\n]*/i, '')
            .replace(/Explanation:?\s*/i, '')
            .trim()
            .slice(0, 200);

          mcqs.push({ question, options, correctIndex, explanation });
        } catch {}
      });

      if (mcqs.length >= 5) {
        console.log(`✅ AffairsCloud: ${mcqs.length} MCQs (${daysAgo === 0 ? 'today' : 'yesterday'})`);
        return mcqs;
      }
    } catch (err) {
      console.warn(`AffairsCloud (${daysAgo}d ago) failed:`, (err as Error).message);
    }
  }
  return [];
}

// --- GKToday ---
// Structure: .quiz-question-box > .quiz-question + .quiz-option (with .correct class)
async function scrapeGKToday(): Promise<MCQ[]> {
  try {
    const listRes = await axios.get('https://www.gktoday.in/quiz/', { headers: HEADERS, timeout: 15000 });
    const $list = cheerio.load(listRes.data);

    let quizUrl = '';
    $list('h2.entry-title a, article h2 a, .entry-title a').each((_, el) => {
      if (!quizUrl) quizUrl = $list(el).attr('href') || '';
    });
    if (!quizUrl) return [];

    const quizRes = await axios.get(quizUrl, { headers: HEADERS, timeout: 15000 });
    const $ = cheerio.load(quizRes.data);
    const mcqs: MCQ[] = [];

    $('.quiz-question-box').each((_, el) => {
      try {
        const question = $(el).find('.quiz-question').text().trim().replace(/^\d+[\.\)]\s*/, '');
        if (!question) return;

        const optEls = $(el).find('.quiz-option');
        if (optEls.length < 4) return;

        const options: string[] = [];
        let correctIndex = 0;

        optEls.each((i, opt) => {
          if (i >= 4) return;
          const text = $(opt).text().trim().replace(/^[A-D][\.\)]\s*/, '');
          options.push(`${['A', 'B', 'C', 'D'][i]}) ${text}`);
          if ($(opt).hasClass('correct')) correctIndex = i;
        });

        const explanation = $(el)
          .find('.quiz-explanation, .explanation')
          .text().trim().slice(0, 200);

        mcqs.push({ question, options, correctIndex, explanation });
      } catch {}
    });

    if (mcqs.length >= 5) {
      console.log(`✅ GKToday: ${mcqs.length} MCQs`);
      return mcqs;
    }
    return [];
  } catch (err) {
    console.warn('GKToday scrape failed:', (err as Error).message);
    return [];
  }
}

// Primary: AffairsCloud → Fallback: GKToday
export async function scrapeQuizzes(): Promise<MCQ[]> {
  let mcqs = await scrapeAffairsCloud();
  if (mcqs.length >= 5) return mcqs;

  mcqs = await scrapeGKToday();
  if (mcqs.length >= 5) return mcqs;

  console.warn('⚠️ All quiz scrapers returned < 5 MCQs');
  return [];
}
