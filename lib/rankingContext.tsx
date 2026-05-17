"use client";
import { createContext, useContext } from "react";

type RankingFn = (args: { gameKey: string; nickname: string; timeMs: number }) => Promise<unknown>;

export const RankingContext = createContext<RankingFn>(async () => null);

export function useRanking() {
  return useContext(RankingContext);
}
