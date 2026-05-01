import 'dotenv/config';
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
  console.log('✅ Bot running. Press Ctrl+C to stop.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
