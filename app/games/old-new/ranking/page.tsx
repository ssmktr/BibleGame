"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getRankings, type RankingEntry } from "@/lib/ranking";
import { RankingTable } from "@/components/RankingTable";

function RankingContent() {
  const searchParams = useSearchParams();
  const timeParam = searchParams.get("time");
  const highlightTime = timeParam ? Number(timeParam) : undefined;

  const [rankings, setRankings] = useState<RankingEntry[]>([]);

  useEffect(() => {
    setRankings(getRankings("old-new"));
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/50">
        <h1 className="font-black text-teal-900 text-xl">🏆 랭킹</h1>
        <Link
          href="/select"
          className="text-sm text-teal-600 font-semibold hover:text-teal-800 transition-colors"
        >
          게임 선택 →
        </Link>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full p-4 flex flex-col gap-4">
        <div className="bg-white/70 rounded-2xl p-4 shadow-sm">
          <RankingTable rankings={rankings} highlightTime={highlightTime} />
        </div>

        <Link
          href="/games/old-new"
          className="w-full py-4 bg-teal-600 text-white font-bold text-xl text-center rounded-2xl hover:bg-teal-700 active:scale-95 transition-all block shadow-md"
        >
          다시 하기
        </Link>
      </div>
    </main>
  );
}

export default function OldNewRankingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>}>
      <RankingContent />
    </Suspense>
  );
}
