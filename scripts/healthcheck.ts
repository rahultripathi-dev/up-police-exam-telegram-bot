/**
 * UP Police Bot — Health Check Script
 * Run: npx ts-node scripts/healthcheck.ts
 * Checks all critical systems and prints a pass/fail report.
 */
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import https from 'https';

// ── Colours ──────────────────────────────────────────
const GREEN  = '\x1b[32m';
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN   = '\x1b[36m';
const RESET  = '\x1b[0m';
const BOLD   = '\x1b[1m';

const PASS = `${GREEN}✅ PASS${RESET}`;
const FAIL = `${RED}❌ FAIL${RESET}`;
const WARN = `${YELLOW}⚠️  WARN${RESET}`;

let passed = 0;
let failed = 0;
let warned = 0;

function check(label: string, result: boolean, detail = '') {
  if (result) {
    console.log(`${PASS}  ${label}${detail ? `  ${CYAN}(${detail})${RESET}` : ''}`);
    passed++;
  } else {
    console.log(`${FAIL}  ${label}${detail ? `  ${RED}(${detail})${RESET}` : ''}`);
    failed++;
  }
}

function warn(label: string, detail = '') {
  console.log(`${WARN}  ${label}${detail ? `  ${YELLOW}(${detail})${RESET}` : ''}`);
  warned++;
}

function section(title: string) {
  console.log(`\n${BOLD}${CYAN}── ${title} ──${RESET}`);
}

// ── 1. Environment Variables ──────────────────────────
section('Environment Variables');
check('TELEGRAM_BOT_TOKEN is set', !!process.env.TELEGRAM_BOT_TOKEN, process.env.TELEGRAM_BOT_TOKEN ? 'token found' : 'missing!');
if (!process.env.GEMINI_API_KEY) {
  warn('GEMINI_API_KEY not set', '/timetable command will not work');
} else {
  check('GEMINI_API_KEY is set', true);
}
if (!process.env.ADMIN_CHAT_ID) {
  warn('ADMIN_CHAT_ID not set', '/scrape is unprotected');
} else {
  check('ADMIN_CHAT_ID is set', true);
}

// ── 2. Data Directory ─────────────────────────────────
section('File System');
const DATA_DIR = path.resolve('./data');
try {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const testFile = path.join(DATA_DIR, '.write-test');
  await fs.writeFile(testFile, 'ok');
  await fs.unlink(testFile);
  check('data/ directory is writable', true, DATA_DIR);
} catch (err) {
  check('data/ directory is writable', false, (err as Error).message);
}

const GK_BANK_PATH = path.join(DATA_DIR, 'gk-bank.json');
try {
  await fs.access(GK_BANK_PATH);
  const raw = await fs.readFile(GK_BANK_PATH, 'utf-8');
  const bank = JSON.parse(raw);
  check('gk-bank.json exists and is valid JSON', true, `${bank.length} questions`);
  check('GK bank has enough questions (>500)', bank.length > 500, `${bank.length} found`);
} catch {
  warn('gk-bank.json not found', 'run /scrape after deploy to populate it');
}

// ── 3. Hindi Bank ─────────────────────────────────────
section('Hindi MCQ Bank');
const { hindiBank, getHindiBankSize, buildHindiQuiz } = await import('../hindi-bank');
check('Hindi bank loaded', hindiBank.length > 0, `${hindiBank.length} questions`);
check('Hindi bank ≥ 200 questions', hindiBank.length >= 200);

const allTopics = new Set(hindiBank.map((q: any) => q.topic));
const requiredTopics = ['paryayvachi', 'vilom', 'tatsam-tadbhav', 'muhavare', 'grammar', 'authors'];
requiredTopics.forEach(t => check(`Topic "${t}" exists`, allTopics.has(t)));

const badHindi = hindiBank.filter((q: any) =>
  !q.question || q.options.length !== 4 || q.correctIndex < 0 || q.correctIndex > 3 || !q.explanation
);
check('All Hindi questions have valid structure', badHindi.length === 0, `${badHindi.length} malformed`);

const quiz5 = buildHindiQuiz(5);
check('buildHindiQuiz(5) returns 5 questions', quiz5.length === 5);

// ── 4. GS Bank ────────────────────────────────────────
section('GS (General Studies) Bank');
const { gsBank, getGSBankSize, buildGSQuiz } = await import('../gs-bank');
check('GS bank loaded', gsBank.length > 0, `${gsBank.length} questions`);
check('GS bank ≥ 300 questions', gsBank.length >= 300);

const gsTopics = new Set(gsBank.map((q: any) => q.topic));
const requiredGS = ['up-special', 'constitution', 'history', 'economy', 'science', 'security'];
requiredGS.forEach(t => check(`GS topic "${t}" exists`, gsTopics.has(t)));

const badGS = gsBank.filter((q: any) =>
  !q.question || q.options.length !== 4 || q.correctIndex < 0 || q.correctIndex > 3 || !q.explanation
);
check('All GS questions have valid structure', badGS.length === 0, `${badGS.length} malformed`);

const gsQuiz5 = buildGSQuiz(5);
check('buildGSQuiz(5) returns 5 questions', gsQuiz5.length === 5);

// ── 5. Quiz Engine ────────────────────────────────────
section('Quiz Engine');
const { buildDailyQuiz, buildMixedQuiz, getTotalBankSize, setGKBank } = await import('../quiz-engine');
setGKBank([]);
check('buildDailyQuiz(5) works without GK bank', buildDailyQuiz(5).length === 5);
check('buildMixedQuiz(10) returns 10 questions', buildMixedQuiz(10).length === 10);
const total = getTotalBankSize();
check('Total bank size > 600', total > 600, `${total} questions across all banks`);

// ── 6. Formatter ──────────────────────────────────────
section('Formatter');
const { formatMCQWithKeyboard, formatMCQResult, formatNewsMessage } = await import('../formatter');
const testMCQ = { question: 'Test?', options: ['A', 'B', 'C', 'D'], correctIndex: 0, explanation: 'ok' };
const kbResult = formatMCQWithKeyboard(testMCQ, 0, 5);
check('formatMCQWithKeyboard returns text + reply_markup', !!(kbResult.text && kbResult.reply_markup));
check('inline_keyboard has 4 buttons', (kbResult.reply_markup as any).inline_keyboard[0].length === 4);

const resultText = formatMCQResult(testMCQ, 0, 5, 0);
check('formatMCQResult (correct) contains ✅', resultText.includes('✅'));

const wrongText = formatMCQResult(testMCQ, 0, 5, 1);
check('formatMCQResult (wrong) contains ❌', wrongText.includes('❌'));

const newsMsg = formatNewsMessage([{ title: 'Test News', link: 'https://x.com', pubDate: '', summary: '' }]);
check('formatNewsMessage returns non-empty string', newsMsg.length > 0);

// ── 7. Telegram Token Validation ──────────────────────
section('Telegram Bot API');
const token = process.env.TELEGRAM_BOT_TOKEN;
if (token) {
  await new Promise<void>((resolve) => {
    const req = https.get(
      `https://api.telegram.org/bot${token}/getMe`,
      (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.ok) {
              check(`Bot token valid — @${json.result.username}`, true);
            } else {
              check('Bot token valid', false, json.description);
            }
          } catch {
            check('Bot token valid', false, 'invalid JSON response');
          }
          resolve();
        });
      }
    );
    req.on('error', (err) => {
      check('Bot token valid', false, err.message);
      resolve();
    });
    req.setTimeout(8000, () => {
      warn('Telegram API check timed out', 'no internet or rate limited');
      req.destroy();
      resolve();
    });
  });
} else {
  warn('Skipping Telegram API check', 'TELEGRAM_BOT_TOKEN not set');
}

// ── 8. Summary ────────────────────────────────────────
console.log(`\n${BOLD}─────────────────────────────────────${RESET}`);
console.log(`${BOLD}Results:  ${GREEN}${passed} passed${RESET}  ${RED}${failed} failed${RESET}  ${YELLOW}${warned} warnings${RESET}`);
console.log(`${BOLD}─────────────────────────────────────${RESET}\n`);

if (failed > 0) {
  console.log(`${RED}${BOLD}🚨 Health check FAILED — fix the issues above before deploying.${RESET}\n`);
  process.exit(1);
} else if (warned > 0) {
  console.log(`${YELLOW}${BOLD}⚠️  Health check passed with warnings — review them above.${RESET}\n`);
} else {
  console.log(`${GREEN}${BOLD}🎉 All checks passed — bot is healthy and ready!${RESET}\n`);
}
