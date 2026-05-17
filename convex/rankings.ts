import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";

const MAX_RANKINGS = 30;

export const list = query({
  args: { gameKey: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("rankings")
      .withIndex("by_game_key", (q) => q.eq("gameKey", args.gameKey))
      .order("asc")
      .take(MAX_RANKINGS);
  },
});

export const add = mutation({
  args: {
    gameKey: v.string(),
    nickname: v.string(),
    timeMs: v.number(),
  },
  handler: async (ctx, args) => {
    const createdAt = new Date().toISOString();

    const existing = await ctx.db
      .query("rankings")
      .withIndex("by_game_key", (q) => q.eq("gameKey", args.gameKey))
      .order("asc")
      .take(MAX_RANKINGS);

    const newEntry = { ...args, createdAt };
    const combined = [...existing, newEntry].sort((a, b) => a.timeMs - b.timeMs);
    const trimmed = combined.slice(0, MAX_RANKINGS);
    const registered = trimmed.some((r) => r.createdAt === createdAt);

    if (!registered) return false;

    // If existing is already at max and our entry didn't make it, skip
    if (existing.length >= MAX_RANKINGS) {
      const worst = existing[existing.length - 1];
      if (args.timeMs >= worst.timeMs) return false;
      // Remove the worst entry
      await ctx.db.delete(worst._id);
    }

    await ctx.db.insert("rankings", newEntry);
    return true;
  },
});

export const resetAll = internalMutation({
  handler: async (ctx) => {
    const all = await ctx.db.query("rankings").collect();
    for (const entry of all) {
      await ctx.db.delete(entry._id);
    }
  },
});
