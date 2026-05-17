"use client";

interface ExitConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ExitConfirmDialog({ onConfirm, onCancel }: ExitConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl flex flex-col gap-6">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">정말 나가시겠습니까?</p>
          <p className="text-sm text-gray-500 mt-2">현재 진행 중인 게임이 종료됩니다.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            아니오
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
          >
            예
          </button>
        </div>
      </div>
    </div>
  );
}
