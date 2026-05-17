import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rankings: defineTable({
    gameKey: v.string(),
    nickname: v.string(),
    timeMs: v.number(),
    createdAt: v.string(),
  })
    .index("by_game_key", ["gameKey", "timeMs"])
    .index("by_game_key_only", ["gameKey"]),
});
