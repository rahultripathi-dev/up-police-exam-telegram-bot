import fs from 'fs/promises';
import path from 'path';

const DB_PATH = process.env.DB_PATH || './data/users.json';

export interface UserPrefs {
  chatId: number;
  username?: string;
  schedule: string; // "HH:MM" 24h IST
  newsCount: number; // 5-15
  mcqCount: number; // 0-10
  paused: boolean;
  createdAt: string;
}

interface DB {
  users: Record<string, UserPrefs>;
}

let db: DB = { users: {} };

const DEFAULTS: Omit<UserPrefs, 'chatId' | 'createdAt'> = {
  schedule: '07:00',
  newsCount: 10,
  mcqCount: 5,
  paused: false,
};

export async function initStorage(): Promise<void> {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  try {
    const raw = await fs.readFile(DB_PATH, 'utf-8');
    db = JSON.parse(raw);
    console.log(`📂 Loaded ${Object.keys(db.users).length} users from ${DB_PATH}`);
  } catch {
    db = { users: {} };
    await save();
    console.log(`📂 Created new DB at ${DB_PATH}`);
  }
}

async function save(): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}

export async function getUser(chatId: number): Promise<UserPrefs | null> {
  return db.users[String(chatId)] || null;
}

export async function upsertUser(
  chatId: number,
  updates: Partial<UserPrefs>
): Promise<UserPrefs> {
  const key = String(chatId);
  const existing = db.users[key];
  const user: UserPrefs = {
    ...DEFAULTS,
    ...existing,
    ...updates,
    chatId,
    createdAt: existing?.createdAt || new Date().toISOString(),
  };
  db.users[key] = user;
  await save();
  return user;
}

export async function getAllActiveUsers(): Promise<UserPrefs[]> {
  return Object.values(db.users).filter((u) => !u.paused);
}
