"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getRankings, type RankingEntry } from "@/lib/ranking";
import { RankingTable } from "@/components/RankingTable";
import { GAME_LABELS, type GameType } from "@/data/creedPrayer";

function RankingContent() {
  const searchParams = useSearchParams();
  const typeParam = (searchParams.get("type") ?? "creed") as GameType;
  const timeParam = searchParams.get("time");
  const highlightTime = timeParam ? Number(timeParam) : undefined;

  const [activeTab, setActiveTab] = useState<GameType>(typeParam);
  const [creedRankings, setCreedRankings] = useState<RankingEntry[]>([]);
  const [prayerRankings, setPrayerRankings] = useState<RankingEntry[]>([]);

  useEffect(() => {
    setCreedRankings(getRankings("creed-prayer:creed"));
    setPrayerRankings(getRankings("creed-prayer:prayer"));
  }, []);

  const currentRankings = activeTab === "creed" ? creedRankings : prayerRankings;
  const currentHighlight = activeTab === typeParam ? highlightTime : undefined;

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/50">
        <h1 className="font-black text-indigo-900 text-xl">🏆 랭킹</h1>
        <Link
          href="/select"
          className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
        >
          게임 선택 →
        </Link>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full p-4 flex flex-col gap-4">
        <div className="flex gap-2 bg-white/50 p-1 rounded-xl">
          {(["creed", "prayer"] as GameType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-colors ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-white/50"
              }`}
            >
              {GAME_LABELS[tab]}
            </button>
          ))}
        </div>

        <div className="bg-white/70 rounded-2xl p-4 shadow-sm">
          <RankingTable rankings={currentRankings} highlightTime={currentHighlight} />
        </div>

        <Link
          href="/games/creed-prayer"
          className="w-full py-4 bg-indigo-600 text-white font-bold text-xl text-center rounded-2xl hover:bg-indigo-700 active:scale-95 transition-all block shadow-md"
        >
          다시 하기
        </Link>
      </div>
    </main>
  );
}

export default function CreedPrayerRankingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>}>
      <RankingContent />
    </Suspense>
  );
}
