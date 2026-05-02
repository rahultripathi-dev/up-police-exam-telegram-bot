import 'dotenv/config';
import http from 'http';
import { startBot } from './bot';
import { initScheduler } from './scheduler';
import { initStorage } from './storage';
import { initCache } from './cache';
import { loadGKBank } from './gk-bank-scraper';
import { setGKBank } from './quiz-engine';

async function main() {
  console.log('🚀 Starting UP Police 2026 Bot...');
  await initStorage();
  await initCache();

  // Load GK bank into quiz engine (non-blocking — bot starts even if bank is empty)
  const bank = await loadGKBank();
  setGKBank(bank);
  if (bank.length === 0) {
    console.warn('⚠️ GK Bank empty — send /scrape to populate it');
  }

  const bot = await startBot();
  initScheduler(bot);

  const port = process.env.PORT || 3000;
  http.createServer((_, res) => {
    res.writeHead(200);
    res.end('OK');
  }).listen(port, () => console.log(`Health check on port ${port}`));

  console.log('✅ Bot running. Press Ctrl+C to stop.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
