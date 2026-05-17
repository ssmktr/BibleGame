"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexRankingProvider } from "./ConvexRankingProvider";
import { RankingContext } from "@/lib/rankingContext";

const url = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = url ? new ConvexReactClient(url) : null;

export function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  if (!convex) {
    return (
      <RankingContext.Provider value={async () => null}>
        {children}
      </RankingContext.Provider>
    );
  }
  return (
    <ConvexProvider client={convex}>
      <ConvexRankingProvider>{children}</ConvexRankingProvider>
    </ConvexProvider>
  );
}
