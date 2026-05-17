export interface RankingEntry {
  nickname: string;
  timeMs: number;
  createdAt: string;
}

const MAX_RANKINGS = 30;

// Returns the timestamp (ms) of today's midnight in local time
function currentDayStart(): number {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

// Clears rankings for a key if midnight has passed since last write
function purgeIfStale(key: string): void {
  const dayKey = `ranking:${key}:day`;
  const stored = localStorage.getItem(dayKey);
  const current = currentDayStart();
  if (stored === null || Number(stored) < current) {
    localStorage.removeItem(`ranking:${key}`);
    localStorage.setItem(dayKey, String(current));
  }
}

export function getRankings(key: string): RankingEntry[] {
  if (typeof window === "undefined") return [];
  try {
    purgeIfStale(key);
    const data = localStorage.getItem(`ranking:${key}`);
    if (!data) return [];
    return JSON.parse(data) as RankingEntry[];
  } catch {
    return [];
  }
}

export function addRanking(
  key: string,
  entry: Omit<RankingEntry, "createdAt">
): boolean {
  const existing = getRankings(key);
  const newEntry: RankingEntry = { ...entry, createdAt: new Date().toISOString() };
  const combined = [...existing, newEntry].sort((a, b) => a.timeMs - b.timeMs);
  const trimmed = combined.slice(0, MAX_RANKINGS);
  const registered = trimmed.some((r) => r.createdAt === newEntry.createdAt);
  try {
    localStorage.setItem(`ranking:${key}`, JSON.stringify(trimmed));
  } catch {
    return false;
  }
  return registered;
}

export function formatTime(ms: number): string {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}
