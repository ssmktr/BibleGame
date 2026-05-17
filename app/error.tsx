"use client";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-gray-600">페이지를 불러오는 중 오류가 발생했습니다.</p>
        <p className="text-xs text-gray-400 font-mono break-all">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
        >
          다시 시도
        </button>
      </body>
    </html>
  );
}
