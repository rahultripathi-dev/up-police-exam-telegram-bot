jest.mock('fs/promises', () => ({
  mkdir: jest.fn().mockResolvedValue(undefined),
  readFile: jest.fn().mockRejectedValue(new Error('ENOENT')),
  writeFile: jest.fn().mockResolvedValue(undefined),
}));

let storage: typeof import('../storage');

beforeEach(async () => {
  jest.resetModules();
  storage = await import('../storage');
  await storage.initStorage();
});

describe('getUser', () => {
  it('returns null for non-existent user', async () => {
    const user = await storage.getUser(99999);
    expect(user).toBeNull();
  });
});

describe('upsertUser', () => {
  it('creates a new user with defaults', async () => {
    const user = await storage.upsertUser(1001, {});
    expect(user.chatId).toBe(1001);
    expect(user.schedule).toBe('07:00');
    expect(user.newsCount).toBe(10);
    expect(user.mcqCount).toBe(5);
    expect(user.paused).toBe(false);
    expect(user.region).toBe('both');
    expect(user.createdAt).toBeDefined();
  });

  it('getUser returns user after upsert', async () => {
    await storage.upsertUser(1002, {});
    const user = await storage.getUser(1002);
    expect(user).not.toBeNull();
    expect(user!.chatId).toBe(1002);
  });

  it('updates existing user without resetting defaults', async () => {
    await storage.upsertUser(1003, { schedule: '06:00', newsCount: 8 });
    await storage.upsertUser(1003, { newsCount: 12 });
    const user = await storage.getUser(1003);
    expect(user!.schedule).toBe('06:00'); // preserved
    expect(user!.newsCount).toBe(12);     // updated
  });

  it('stores username when provided', async () => {
    const user = await storage.upsertUser(1004, { username: 'testuser' });
    expect(user.username).toBe('testuser');
  });

  it('createdAt does not change on subsequent upserts', async () => {
    const first = await storage.upsertUser(1005, {});
    const second = await storage.upsertUser(1005, { newsCount: 7 });
    expect(second.createdAt).toBe(first.createdAt);
  });

  it('region can be set to up', async () => {
    const user = await storage.upsertUser(1006, { region: 'up' });
    expect(user.region).toBe('up');
  });

  it('region can be set to india', async () => {
    const user = await storage.upsertUser(1007, { region: 'india' });
    expect(user.region).toBe('india');
  });

  it('examDate is stored when provided', async () => {
    const user = await storage.upsertUser(1008, { examDate: '08-06-2026' });
    expect(user.examDate).toBe('08-06-2026');
  });

  it('pause state can be toggled', async () => {
    await storage.upsertUser(1009, {});
    await storage.upsertUser(1009, { paused: true });
    const paused = await storage.getUser(1009);
    expect(paused!.paused).toBe(true);

    await storage.upsertUser(1009, { paused: false });
    const resumed = await storage.getUser(1009);
    expect(resumed!.paused).toBe(false);
  });

  it('schedule validation: accepts valid times', async () => {
    const user = await storage.upsertUser(1010, { schedule: '23:59' });
    expect(user.schedule).toBe('23:59');
  });
});

describe('getAllActiveUsers', () => {
  it('returns empty array when no users', async () => {
    const users = await storage.getAllActiveUsers();
    expect(users).toHaveLength(0);
  });

  it('returns only non-paused users', async () => {
    await storage.upsertUser(2001, { paused: false });
    await storage.upsertUser(2002, { paused: true });
    await storage.upsertUser(2003, { paused: false });

    const active = await storage.getAllActiveUsers();
    expect(active).toHaveLength(2);
    active.forEach(u => expect(u.paused).toBe(false));
  });

  it('returns all users when none are paused', async () => {
    await storage.upsertUser(3001, {});
    await storage.upsertUser(3002, {});
    const active = await storage.getAllActiveUsers();
    expect(active).toHaveLength(2);
  });

  it('returns empty when all users are paused', async () => {
    await storage.upsertUser(4001, { paused: true });
    await storage.upsertUser(4002, { paused: true });
    const active = await storage.getAllActiveUsers();
    expect(active).toHaveLength(0);
  });

  it('returned users have valid structure', async () => {
    await storage.upsertUser(5001, { schedule: '08:00', newsCount: 7 });
    const users = await storage.getAllActiveUsers();
    const user = users.find(u => u.chatId === 5001)!;
    expect(user.schedule).toBe('08:00');
    expect(user.newsCount).toBe(7);
    expect(user.region).toBe('both');
  });
});
