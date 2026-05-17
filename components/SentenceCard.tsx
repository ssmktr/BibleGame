"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type CardStatus = "neutral" | "correct" | "incorrect";

interface SentenceCardProps {
  id: string;
  text: string;
  index: number;
  status: CardStatus;
}

const borderColor: Record<CardStatus, string> = {
  neutral: "border-gray-200 bg-white text-gray-800",
  correct: "border-green-400 bg-green-50 text-green-900",
  incorrect: "border-red-400 bg-red-50 text-red-900",
};

export function SentenceCard({ id, text, index, status }: SentenceCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 cursor-grab active:cursor-grabbing select-none touch-none transition-colors ${borderColor[status]}`}
      {...attributes}
      {...listeners}
    >
      <span className="shrink-0 w-6 text-center text-sm font-bold text-gray-400">
        {index + 1}
      </span>
      <span className="flex-1 text-base leading-snug">{text}</span>
      {status === "correct" && <span className="shrink-0 text-green-500 font-bold text-lg">✓</span>}
      {status === "incorrect" && <span className="shrink-0 text-red-500 font-bold text-lg">✗</span>}
    </div>
  );
}
