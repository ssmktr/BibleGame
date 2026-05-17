import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// 매일 자정 KST = UTC 15:00 (전날)
crons.daily(
  "reset rankings at midnight KST",
  { hourUTC: 15, minuteUTC: 0 },
  internal.rankings.resetAll
);

export default crons;
