"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRanking } from "@/lib/rankingContext";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arraySwap,
} from "@dnd-kit/sortable";
import { getSentences, GAME_LABELS, type GameType } from "@/data/creedPrayer";
import { useTimer } from "@/lib/useTimer";
import { SentenceCard, type CardStatus } from "@/components/SentenceCard";
import { ExitConfirmDialog } from "@/components/ExitConfirmDialog";
import { NicknameDialog } from "@/components/NicknameDialog";

interface CardItem {
  id: string;
  text: string;
  correctIndex: number;
}

function shuffleCards(arr: CardItem[]): CardItem[] {
  let result: CardItem[];
  let attempts = 0;
  do {
    result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    attempts++;
  } while (result.every((c, i) => c.correctIndex === i) && attempts < 10);
  return result;
}

export default function CreedPrayerPlayGame({ gameType }: { gameType: GameType }) {
  const router = useRouter();
  const addRanking = useRanking();

  // Eagerly initialized — safe because this component is never SSR'd (ssr: false in parent)
  const [cards, setCards] = useState<CardItem[]>(() => {
    const initial = getSentences(gameType).map((text, i) => ({
      id: `card-${i}`,
      text,
      correctIndex: i,
    }));
    return shuffleCards(initial);
  });
  const [cardStates, setCardStates] = useState<CardStatus[]>(() =>
    Array(getSentences(gameType).length).fill("neutral") as CardStatus[]
  );
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showNicknameDialog, setShowNicknameDialog] = useState(false);
  const [finalTimeMs, setFinalTimeMs] = useState(0);

  const { displayMs, start, stop, getElapsed } = useTimer();

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setCards((prev) => {
      const ai = prev.findIndex((c) => c.id === active.id);
      const oi = prev.findIndex((c) => c.id === over.id);
      return arraySwap(prev, ai, oi);
    });
    setCardStates((prev) => prev.map(() => "neutral"));
  }

  function handleSubmit() {
    const newStates = cards.map((card, i): CardStatus =>
      card.correctIndex === i ? "correct" : "incorrect"
    );
    setCardStates(newStates);
    if (newStates.every((s) => s === "correct")) {
      const elapsed = getElapsed();
      stop();
      setFinalTimeMs(elapsed);
      setShowNicknameDialog(true);
    }
  }

  async function handleNicknameSubmit(nickname: string) {
    try {
      await addRanking({ gameKey: `creed-prayer:${gameType}`, nickname, timeMs: finalTimeMs });
    } catch {
      // Convex not configured — skip ranking
    }
    router.push(`/games/creed-prayer/ranking?type=${gameType}&time=${finalTimeMs}`);
  }

  function handleExit() {
    stop();
    router.push("/select");
  }

  const mins = Math.floor(displayMs / 60000);
  const secs = Math.floor((displayMs % 60000) / 1000);
  const cs = Math.floor((displayMs % 1000) / 10);
  const timeDisplay = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-white/50 shadow-sm">
        <h2 className="font-bold text-indigo-800 text-lg">
          {GAME_LABELS[gameType]} 순서 맞추기
        </h2>
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-xl text-indigo-700">
            {timeDisplay}
          </span>
          <button
            onClick={() => setShowExitDialog(true)}
            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            나가기
          </button>
        </div>
      </header>

      <div className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={cards.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-2">
              {cards.map((card, i) => (
                <SentenceCard
                  key={card.id}
                  id={card.id}
                  text={card.text}
                  index={i}
                  status={cardStates[i] ?? "neutral"}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div className="sticky bottom-0 p-4 bg-white/80 backdrop-blur-sm border-t border-white/50">
        <button
          onClick={handleSubmit}
          className="w-full max-w-2xl mx-auto block py-4 bg-indigo-600 text-white font-black text-xl rounded-2xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md"
        >
          제출하기
        </button>
      </div>

      {showExitDialog && (
        <ExitConfirmDialog
          onConfirm={handleExit}
          onCancel={() => setShowExitDialog(false)}
        />
      )}
      {showNicknameDialog && (
        <NicknameDialog timeMs={finalTimeMs} onSubmit={handleNicknameSubmit} />
      )}
    </main>
  );
}
