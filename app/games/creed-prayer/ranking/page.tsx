"use client";
import { Component, Suspense, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RankingTable } from "@/components/RankingTable";
import { GAME_LABELS, type GameType } from "@/data/creedPrayer";
import { useConvexAvailable } from "@/components/ConvexClientProvider";
import type { RankingEntry } from "@/lib/ranking";

class QueryErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

interface RankingUIProps {
  activeTab: GameType;
  setActiveTab: (tab: GameType) => void;
  creedRankings: RankingEntry[];
  prayerRankings: RankingEntry[];
  typeParam: GameType;
  highlightTime: number | undefined;
}

function RankingUI({ activeTab, setActiveTab, creedRankings, prayerRankings, typeParam, highlightTime }: RankingUIProps) {
  const currentRankings = activeTab === "creed" ? creedRankings : prayerRankings;
  const currentHighlight = activeTab === typeParam ? highlightTime : undefined;

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/50">
        <h1 className="font-black text-indigo-900 text-xl">🏆 랭킹</h1>
        <Link href="/select" className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
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
                activeTab === tab ? "bg-indigo-600 text-white shadow-sm" : "text-gray-600 hover:bg-white/50"
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

function ConvexRankingContent(props: Omit<RankingUIProps, "creedRankings" | "prayerRankings">) {
  const creedRankings = (useQuery(api.rankings.list, { gameKey: "creed-prayer:creed" }) ?? []) as RankingEntry[];
  const prayerRankings = (useQuery(api.rankings.list, { gameKey: "creed-prayer:prayer" }) ?? []) as RankingEntry[];
  return <RankingUI {...props} creedRankings={creedRankings} prayerRankings={prayerRankings} />;
}

function RankingContent() {
  const searchParams = useSearchParams();
  const typeParam = (searchParams.get("type") ?? "creed") as GameType;
  const highlightTime = searchParams.get("time") ? Number(searchParams.get("time")) : undefined;
  const [activeTab, setActiveTab] = useState<GameType>(typeParam);
  const convexAvailable = useConvexAvailable();

  const uiProps = { activeTab, setActiveTab, typeParam, highlightTime };
  const emptyFallback = <RankingUI {...uiProps} creedRankings={[]} prayerRankings={[]} />;

  if (!convexAvailable) return emptyFallback;

  return (
    <QueryErrorBoundary fallback={emptyFallback}>
      <ConvexRankingContent {...uiProps} />
    </QueryErrorBoundary>
  );
}

export default function CreedPrayerRankingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>}>
      <RankingContent />
    </Suspense>
  );
}
