import Link from "next/link";

export default function OldNewEntryPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex flex-col">
      <header className="flex items-center justify-end px-6 py-4">
        <Link
          href="/select"
          className="text-sm text-teal-600 font-semibold hover:text-teal-800 transition-colors"
        >
          ← 게임 선택
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-5xl shadow-lg">
            📖
          </div>
          <div>
            <h1 className="text-3xl font-black text-teal-900">구약 / 신약</h1>
            <p className="text-teal-600 font-medium mt-1">순서 맞추기 (66권)</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link
            href="/games/old-new/play"
            className="py-4 bg-teal-600 text-white font-bold text-xl text-center rounded-2xl hover:bg-teal-700 active:scale-95 transition-all shadow-md"
          >
            게임 시작
          </Link>
          <Link
            href="/games/old-new/ranking"
            className="py-4 bg-white text-teal-700 font-bold text-xl text-center rounded-2xl hover:bg-teal-50 active:scale-95 transition-all shadow-md border-2 border-teal-200"
          >
            🏆 랭킹
          </Link>
        </div>
      </div>
    </main>
  );
}
