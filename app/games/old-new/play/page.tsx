"use client";
import dynamic from "next/dynamic";

const OldNewPlayGame = dynamic(() => import("./game"), {
  ssr: false,
  loading: () => (
    <main className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex flex-col">
      <div className="flex-1 p-4">
        <div className="grid grid-cols-3 gap-2 max-w-3xl mx-auto">
          {Array.from({ length: 66 }, (_, i) => (
            <div key={i} className="h-16 rounded-xl border-2 border-gray-200 bg-white animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  ),
});

export default function OldNewPlayPage() {
  return <OldNewPlayGame />;
}
