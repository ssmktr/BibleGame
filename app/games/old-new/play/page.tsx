"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const OldNewPlayGame = dynamic(() => import("./game"), {
  ssr: false,
  loading: () => (
    <main className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex flex-col">
      <div className="flex-1 p-4">
        <div className="grid grid-cols-3 gap-2 max-w-3xl mx-auto">
          {Array.from({ length: 39 }, (_, i) => (
            <div key={i} className="h-16 rounded-xl border-2 border-gray-200 bg-white animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  ),
});

function PlayPageContent() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("type");
  const type: "old" | "new" = raw === "new" ? "new" : "old";
  return <OldNewPlayGame type={type} />;
}

export default function OldNewPlayPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex flex-col">
          <div className="flex-1 p-4">
            <div className="grid grid-cols-3 gap-2 max-w-3xl mx-auto">
              {Array.from({ length: 39 }, (_, i) => (
                <div key={i} className="h-16 rounded-xl border-2 border-gray-200 bg-white animate-pulse" />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <PlayPageContent />
    </Suspense>
  );
}
