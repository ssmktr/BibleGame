"use client";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RankingContext } from "@/lib/rankingContext";

export function ConvexRankingProvider({ children }: { children: React.ReactNode }) {
  const add = useMutation(api.rankings.add);
  return <RankingContext.Provider value={add}>{children}</RankingContext.Provider>;
}
