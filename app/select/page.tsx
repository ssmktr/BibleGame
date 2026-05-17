import Link from "next/link";

const games = [
  {
    href: "/games/creed-prayer",
    icon: "✝️",
    title: "사도신경 / 주기도문",
    subtitle: "순서 맞추기",
    description: "사도신경과 주기도문의\n문장 순서를 맞춰보세요",
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
    textColor: "text-indigo-700",
  },
  {
    href: "/games/old-new",
    icon: "📖",
    title: "구약 / 신약",
    subtitle: "순서 맞추기",
    description: "성경 66권의\n순서를 맞춰보세요",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
    textColor: "text-teal-700",
  },
];

export default function SelectPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-amber-50 to-orange-100 flex flex-col">
      {/* 헤더 */}
      <header className="flex items-center px-6 py-4">
        <Link
          href="/"
          className="text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 transition-colors"
        >
          ← 처음으로
        </Link>
      </header>

      {/* 본문 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 gap-10">
        <div className="text-center">
          <h1 className="text-4xl font-black text-amber-900">
            게임을 골라보세요
          </h1>
          <p className="mt-2 text-amber-700 font-medium">
            원하는 게임을 선택하세요
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          {games.map((game) => (
            <Link
              key={game.href}
              href={game.href}
              className="group flex flex-col items-center gap-5 p-8 bg-white rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-200"
            >
              <div
                className={`w-20 h-20 rounded-2xl bg-linear-to-br ${game.gradientFrom} ${game.gradientTo} flex items-center justify-center text-4xl shadow-md`}
              >
                {game.icon}
              </div>
              <div className="text-center">
                <p className={`text-sm font-semibold ${game.textColor} uppercase tracking-wide`}>
                  {game.subtitle}
                </p>
                <h2 className="text-xl font-black text-gray-800 mt-1">
                  {game.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2 whitespace-pre-line leading-relaxed">
                  {game.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
