"use client";
import Link from "next/link";

export default function RankingError() {
  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-gray-600">랭킹을 불러올 수 없습니다.</p>
      <Link href="/select" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold">
        게임 선택으로
      </Link>
    </main>
  );
}
