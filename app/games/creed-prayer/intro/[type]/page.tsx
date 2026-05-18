import Link from "next/link";
import Image from "next/image";
import instructionImage from "@/app/Images/사도신경_주기도문_설명_001.png";

type Props = {
  params: Promise<{ type: string }>;
};

export default async function CreedPrayerIntroPage({ params }: Props) {
  const { type } = await params;
  const gameType = type === "prayer" ? "prayer" : "creed";
  const gameLabel = gameType === "prayer" ? "주기도문" : "사도신경";

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/games/creed-prayer"
          className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
        >
          ← 뒤로
        </Link>
        <span className="text-sm font-bold text-indigo-700">{gameLabel} 순서 맞추기</span>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 pb-8">
        <h2 className="text-xl font-black text-indigo-900">게임 방법</h2>

        <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-100">
          <Image
            src={instructionImage}
            alt="게임 설명"
            className="w-full h-auto"
            priority
          />
        </div>

        <Link
          href={`/games/creed-prayer/play/${gameType}`}
          className="w-full max-w-md py-5 bg-blue-600 text-white font-black text-2xl text-center rounded-2xl hover:bg-blue-700 active:scale-95 transition-all shadow-md"
        >
          게임 시작
        </Link>
      </div>
    </main>
  );
}
