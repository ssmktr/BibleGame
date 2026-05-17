"use client";
import { Component, createContext, useContext, type ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexRankingProvider } from "./ConvexRankingProvider";
import { RankingContext } from "@/lib/rankingContext";

const ConvexAvailableContext = createContext(false);
export const useConvexAvailable = () => useContext(ConvexAvailableContext);

const noopRanking = async () => null;

function makeClient(url: string): ConvexReactClient | null {
  try {
    return new ConvexReactClient(url);
  } catch {
    return null;
  }
}

const url = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = url ? makeClient(url) : null;

class ConvexErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const NoConvexTree = ({ children }: { children: ReactNode }) => (
  <RankingContext.Provider value={noopRanking}>{children}</RankingContext.Provider>
);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    return <NoConvexTree>{children}</NoConvexTree>;
  }
  return (
    <ConvexErrorBoundary fallback={<NoConvexTree>{children}</NoConvexTree>}>
      <ConvexProvider client={convex}>
        <ConvexAvailableContext.Provider value={true}>
          <ConvexRankingProvider>{children}</ConvexRankingProvider>
        </ConvexAvailableContext.Provider>
      </ConvexProvider>
    </ConvexErrorBoundary>
  );
}
