"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RankingTable } from "@/components/RankingTable";
import { useConvexAvailable } from "@/components/ConvexClientProvider";
import type { RankingEntry } from "@/lib/ranking";

type TabType = "old" | "new";

interface RankingUIProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  oldRankings: RankingEntry[];
  newRankings: RankingEntry[];
  typeParam: TabType;
  highlightTime: number | undefined;
}

function RankingUI({ activeTab, setActiveTab, oldRankings, newRankings, typeParam, highlightTime }: RankingUIProps) {
  const currentRankings = activeTab === "old" ? oldRankings : newRankings;
  const currentHighlight = typeParam === activeTab ? highlightTime : undefined;

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
        <div className="flex rounded-xl overflow-hidden border-2 border-teal-200">
          <button
            onClick={() => setActiveTab("old")}
            className={`flex-1 py-3 font-bold text-sm transition-colors ${
              activeTab === "old"
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-700 hover:bg-teal-50"
            }`}
          >
            구약 (39권)
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`flex-1 py-3 font-bold text-sm transition-colors ${
              activeTab === "new"
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-700 hover:bg-teal-50"
            }`}
          >
            신약 (27권)
          </button>
        </div>

        <div className="bg-white/70 rounded-2xl p-4 shadow-sm">
          <RankingTable rankings={currentRankings} highlightTime={currentHighlight} />
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

function ConvexRankingContent({ activeTab, setActiveTab, typeParam, highlightTime }: Omit<RankingUIProps, "oldRankings" | "newRankings">) {
  const oldRankings = (useQuery(api.rankings.list, { gameKey: "old-new:old" }) ?? []) as RankingEntry[];
  const newRankings = (useQuery(api.rankings.list, { gameKey: "old-new:new" }) ?? []) as RankingEntry[];
  return (
    <RankingUI
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      oldRankings={oldRankings}
      newRankings={newRankings}
      typeParam={typeParam}
      highlightTime={highlightTime}
    />
  );
}

function RankingContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") as TabType | null;
  const timeParam = searchParams.get("time");
  const highlightTime = timeParam ? Number(timeParam) : undefined;
  const [activeTab, setActiveTab] = useState<TabType>(typeParam === "new" ? "new" : "old");
  const convexAvailable = useConvexAvailable();

  if (!convexAvailable) {
    return (
      <RankingUI
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        oldRankings={[]}
        newRankings={[]}
        typeParam={typeParam === "new" ? "new" : "old"}
        highlightTime={highlightTime}
      />
    );
  }

  return (
    <ConvexRankingContent
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      typeParam={typeParam === "new" ? "new" : "old"}
      highlightTime={highlightTime}
    />
  );
}

export default function OldNewRankingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>}>
      <RankingContent />
    </Suspense>
  );
}
