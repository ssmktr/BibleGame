"use client";
import { useState } from "react";
import { RankingEntry, formatTime } from "@/lib/ranking";

const PAGE_SIZE = 10;

interface RankingTableProps {
  rankings: RankingEntry[];
  highlightTime?: number;
}

export function RankingTable({ rankings, highlightTime }: RankingTableProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.min(3, Math.ceil(rankings.length / PAGE_SIZE));
  const pageData = rankings.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  if (rankings.length === 0) {
    return <p className="text-center text-gray-400 py-10">아직 기록이 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="py-2 text-left w-10 text-gray-500 font-semibold">순위</th>
            <th className="py-2 text-left text-gray-500 font-semibold">닉네임</th>
            <th className="py-2 text-right text-gray-500 font-semibold">플레이 시간</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((entry, i) => {
            const rank = page * PAGE_SIZE + i + 1;
            const isNew =
              highlightTime !== undefined && entry.timeMs === highlightTime;
            return (
              <tr
                key={`${entry.nickname}-${entry.createdAt}`}
                className={`border-b border-gray-100 ${isNew ? "bg-amber-50" : ""}`}
              >
                <td className="py-3 font-bold text-gray-500">{rank}</td>
                <td className="py-3 font-semibold text-gray-800">
                  {entry.nickname}
                  {isNew && (
                    <span className="ml-2 text-xs font-bold text-amber-500">NEW</span>
                  )}
                </td>
                <td className="py-3 text-right font-mono text-gray-700">
                  {formatTime(entry.timeMs)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-9 h-9 rounded-full font-bold text-sm transition-colors ${
                page === i
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
