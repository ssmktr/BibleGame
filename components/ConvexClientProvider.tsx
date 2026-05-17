"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Fallback keeps ConvexProvider in the tree so useMutation never throws;
// mutations simply fail at network level when no real URL is set.
const url = process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://noop.convex.cloud";
const convex = new ConvexReactClient(url);

export function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
