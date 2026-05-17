"use client";
import { useState } from "react";
import { formatTime } from "@/lib/ranking";

interface NicknameDialogProps {
  timeMs: number;
  onSubmit: (nickname: string) => void;
}

const PROFANITY_LIST = [
  "씨발", "시발", "ㅅㅂ", "쌍놈", "개새끼", "개쌍놈",
  "병신", "ㅂㅅ", "개병신", "지랄", "ㅈㄹ",
  "ㅄ", "보지", "자지", "섹스", "섹쓰",
  "새끼", "년놈", "미친놈", "미친년", "미친새끼",
  "꺼져", "닥쳐", "죽어",
];

function containsProfanity(text: string): boolean {
  return PROFANITY_LIST.some((word) => text.includes(word));
}

export function NicknameDialog({ timeMs, onSubmit }: NicknameDialogProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const trimmed = value.trim();

  function handleSubmit() {
    if (!trimmed) return;
    if (containsProfanity(trimmed)) {
      setError("사용할 수 없는 닉네임입니다. 다시 입력해주세요.");
      return;
    }
    setError("");
    onSubmit(trimmed);
  }

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
            onChange={(e) => { setValue(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            maxLength={10}
            placeholder="닉네임을 입력하세요"
            autoFocus
            className="px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 focus:border-amber-400 focus:outline-none"
          />
          <div className="flex items-center justify-between">
            {error ? (
              <p className="text-xs text-red-500">{error}</p>
            ) : (
              <span />
            )}
            <p className="text-xs text-gray-400">{trimmed.length}/10</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!trimmed}
          className="w-full py-3 bg-amber-500 text-white font-bold text-lg rounded-xl hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          완료
        </button>
      </div>
    </div>
  );
}
