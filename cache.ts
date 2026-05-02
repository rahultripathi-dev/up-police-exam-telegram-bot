import fs from 'fs/promises';
import path from 'path';
import { MCQ } from './mcq';
import { NewsItem } from './scraper';

const _dbPath = process.env.DB_PATH?.startsWith('/data')
  ? './data/users.json'
  : process.env.DB_PATH || './data/users.json';
const CACHE_PATH = path.join(path.dirname(_dbPath), 'cache.json');

interface NewsEntry {
  fetchedAt: string;
  items: NewsItem[];
}

interface DailyMCQEntry {
  date: string; // YYYY-MM-DD IST
  mcqs: MCQ[];
}

interface TimetableEntry {
  plan: string;
  examDate: string;
  generatedAt: string;
}

interface CacheData {
  dailyMCQs: DailyMCQEntry | null;
  news: Record<string, NewsEntry>; // region → entry
  timetables: Record<string, TimetableEntry>; // chatId → entry
}

let mem: CacheData = { dailyMCQs: null, news: {}, timetables: {} };

export async function initCache(): Promise<void> {
  try {
    await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
    const raw = await fs.readFile(CACHE_PATH, 'utf-8');
    mem = { dailyMCQs: null, news: {}, timetables: {}, ...JSON.parse(raw) };
    console.log('📦 Cache loaded');
  } catch {
    await persist();
    console.log('📦 Fresh cache created');
  }
}

async function persist(): Promise<void> {
  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await fs.writeFile(CACHE_PATH, JSON.stringify(mem));
}

function todayIST(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

// --- Daily MCQs: generated once at midnight, shared for ALL users ---
export function getDailyMCQs(): MCQ[] | null {
  if (!mem.dailyMCQs) return null;
  if (mem.dailyMCQs.date !== todayIST()) return null;
  return mem.dailyMCQs.mcqs;
}

export async function setDailyMCQs(mcqs: MCQ[]): Promise<void> {
  mem.dailyMCQs = { date: todayIST(), mcqs };
  await persist();
  console.log(`📦 Cached ${mcqs.length} daily MCQs for ${todayIST()}`);
}

// --- News: 60 min TTL per region ---
const NEWS_TTL_MS = 60 * 60 * 1000;

export function getCachedNews(region: string): NewsItem[] | null {
  const entry = mem.news[region];
  if (!entry) return null;
  if (Date.now() - new Date(entry.fetchedAt).getTime() > NEWS_TTL_MS) return null;
  return entry.items;
}

export async function setCachedNews(region: string, items: NewsItem[]): Promise<void> {
  mem.news[region] = { fetchedAt: new Date().toISOString(), items };
  await persist();
}

// --- Per-user timetable: 7 day TTL, invalidated if exam date changes ---
const TIMETABLE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function getUserTimetable(chatId: number, examDate: string): string | null {
  const entry = mem.timetables[String(chatId)];
  if (!entry) return null;
  if (entry.examDate !== examDate) return null;
  if (Date.now() - new Date(entry.generatedAt).getTime() > TIMETABLE_TTL_MS) return null;
  return entry.plan;
}

export async function setUserTimetable(chatId: number, examDate: string, plan: string): Promise<void> {
  mem.timetables[String(chatId)] = { plan, examDate, generatedAt: new Date().toISOString() };
  await persist();
}
