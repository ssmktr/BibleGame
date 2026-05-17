"use client";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import type { GameType } from "@/data/creedPrayer";

const CreedPrayerPlayGame = dynamic(() => import("./game"), {
  ssr: false,
  loading: () => (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="h-14 rounded-xl border-2 border-gray-200 bg-white animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  ),
});

export default function CreedPrayerPlayPage() {
  const { type } = useParams<{ type: string }>();
  const gameType: GameType = type === "prayer" ? "prayer" : "creed";
  return <CreedPrayerPlayGame gameType={gameType} />;
}
