import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 배경 그라데이션 — public/images/start-bg.webp 준비 후 Image 컴포넌트로 교체 */}
      <div className="absolute inset-0 bg-linear-to-br from-amber-300 via-orange-300 to-yellow-200" />

      {/* 배경 장식 원 */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10" />
      <div className="absolute -bottom-32 -right-16 w-md h-112 rounded-full bg-white/10" />
      <div className="absolute top-1/3 right-10 w-48 h-48 rounded-full bg-white/10" />

      {/* 어두운 오버레이 — 텍스트 가독성 확보 */}
      <div className="absolute inset-0 bg-black/25" />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6">
        <div className="flex flex-col items-center gap-3">
          <span className="text-5xl">⛪</span>
          <h1 className="text-6xl font-black text-white drop-shadow-lg tracking-tight">
            성경 게임
          </h1>
          <p className="text-white/85 text-xl font-medium">
            말씀을 게임으로 배워요!
          </p>
        </div>

        <Link
          href="/select"
          className="mt-2 px-14 py-5 bg-white text-amber-600 font-black text-2xl rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 min-w-48 text-center"
        >
          게임 시작
        </Link>
      </div>
    </main>
  );
}
