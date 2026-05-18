import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// 매주 월요일 자정 KST = UTC 기준 일요일 15:00
crons.weekly(
  "reset rankings weekly at midnight KST Monday",
  { dayOfWeek: "sunday", hourUTC: 15, minuteUTC: 0 },
  internal.rankings.resetAll
);

export default crons;
