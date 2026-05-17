"use client";
import { useState } from "react";
import { formatTime } from "@/lib/ranking";

interface NicknameDialogProps {
  timeMs: number;
  onSubmit: (nickname: string) => void;
}

export function NicknameDialog({ timeMs, onSubmit }: NicknameDialogProps) {
  const [value, setValue] = useState("");
  const trimmed = value.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl flex flex-col gap-6">
        <div className="text-center">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-xl font-bold text-gray-800">모두 정답입니다!</p>
          <p className="text-3xl font-mono font-bold text-amber-600 mt-2">
            {formatTime(timeMs)}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">닉네임 (1~10자)</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && trimmed && onSubmit(trimmed)}
            maxLength={10}
            placeholder="닉네임을 입력하세요"
            autoFocus
            className="px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 focus:border-amber-400 focus:outline-none"
          />
          <p className="text-xs text-gray-400 text-right">{trimmed.length}/10</p>
        </div>

        <button
          onClick={() => trimmed && onSubmit(trimmed)}
          disabled={!trimmed}
          className="w-full py-3 bg-amber-500 text-white font-bold text-lg rounded-xl hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          완료
        </button>
      </div>
    </div>
  );
}
