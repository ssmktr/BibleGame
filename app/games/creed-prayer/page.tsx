import Link from "next/link";

export default function CreedPrayerEntryPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col">
      <header className="flex items-center justify-end px-6 py-4">
        <Link
          href="/select"
          className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
        >
          ← 게임 선택
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-5xl shadow-lg">
            ✝️
          </div>
          <div>
            <h1 className="text-3xl font-black text-indigo-900">사도신경 / 주기도문</h1>
            <p className="text-indigo-600 font-medium mt-1">순서 맞추기</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link
            href="/games/creed-prayer/play/creed"
            className="py-4 bg-blue-600 text-white font-bold text-xl text-center rounded-2xl hover:bg-blue-700 active:scale-95 transition-all shadow-md"
          >
            사도신경 시작
          </Link>
          <Link
            href="/games/creed-prayer/play/prayer"
            className="py-4 bg-indigo-600 text-white font-bold text-xl text-center rounded-2xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md"
          >
            주기도문 시작
          </Link>
          <Link
            href="/games/creed-prayer/ranking"
            className="py-4 bg-white text-indigo-700 font-bold text-xl text-center rounded-2xl hover:bg-indigo-50 active:scale-95 transition-all shadow-md border-2 border-indigo-200"
          >
            🏆 랭킹
          </Link>
        </div>
      </div>
    </main>
  );
}
