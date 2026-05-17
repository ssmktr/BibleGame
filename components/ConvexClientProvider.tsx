"use client";
import { Component, type ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexRankingProvider } from "./ConvexRankingProvider";
import { RankingContext } from "@/lib/rankingContext";

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
        <ConvexRankingProvider>{children}</ConvexRankingProvider>
      </ConvexProvider>
    </ConvexErrorBoundary>
  );
}
