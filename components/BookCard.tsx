"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CardStatus } from "./SentenceCard";

interface BookCardProps {
  id: string;
  name: string;
  abbr: string;
  status: CardStatus;
}

const borderColor: Record<CardStatus, string> = {
  neutral: "border-gray-200 bg-white text-gray-800",
  correct: "border-green-400 bg-green-50 text-green-900",
  incorrect: "border-red-400 bg-red-50 text-red-900",
};

export function BookCard({ id, name, abbr, status }: BookCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className={`flex flex-col items-center justify-center gap-0.5 p-2 h-16 rounded-xl border-2 cursor-grab active:cursor-grabbing select-none touch-none text-center transition-colors ${borderColor[status]}`}
      {...attributes}
      {...listeners}
    >
      <span className="text-sm font-bold leading-tight">{name}</span>
      <span className="text-xs text-gray-400">({abbr})</span>
      {status === "correct" && <span className="text-green-500 text-xs font-bold leading-none">✓</span>}
      {status === "incorrect" && <span className="text-red-500 text-xs font-bold leading-none">✗</span>}
    </div>
  );
}
