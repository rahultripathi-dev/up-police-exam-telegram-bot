import 'dotenv/config';
import http from 'http';
import { startBot } from './bot';
import { initScheduler } from './scheduler';
import { initStorage } from './storage';
import { initCache } from './cache';

async function main() {
  console.log('🚀 Starting UP Police 2026 Bot...');
  await initStorage();
  await initCache();
  const bot = await startBot();
  initScheduler(bot);

  // Health check server — required by Render to keep service alive
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
