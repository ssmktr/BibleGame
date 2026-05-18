import Link from "next/link";
import Image from "next/image";
import instructionImage from "@/app/Images/구약_신약_설명_001.png";

type Props = {
  searchParams: Promise<{ type?: string }>;
};

export default async function OldNewIntroPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const gameType: "old" | "new" = type === "new" ? "new" : "old";
  const gameLabel = gameType === "new" ? "신약 (27권)" : "구약 (39권)";

  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/games/old-new"
          className="text-sm text-teal-600 font-semibold hover:text-teal-800 transition-colors"
        >
          ← 뒤로
        </Link>
        <span className="text-sm font-bold text-teal-700">{gameLabel} 순서 맞추기</span>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 pb-8">
        <h2 className="text-xl font-black text-teal-900">게임 방법</h2>

        <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg border-2 border-teal-100">
          <Image
            src={instructionImage}
            alt="게임 설명"
            className="w-full h-auto"
            priority
          />
        </div>

        <Link
          href={`/games/old-new/play?type=${gameType}`}
          className="w-full max-w-md py-5 bg-teal-600 text-white font-black text-2xl text-center rounded-2xl hover:bg-teal-700 active:scale-95 transition-all shadow-md"
        >
          게임 시작
        </Link>
      </div>
    </main>
  );
}
