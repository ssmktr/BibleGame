export interface RankingEntry {
  nickname: string;
  timeMs: number;
  createdAt: string;
}

const MAX_RANKINGS = 30;

export function getRankings(key: string): RankingEntry[] {
  if (typeof window === "undefined") return [];
  try {
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
