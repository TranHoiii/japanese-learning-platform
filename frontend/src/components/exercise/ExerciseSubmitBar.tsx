import React, { useState } from 'react';

interface ExerciseSubmitBarProps {
  totalQuestions: number;
  answeredQuestions: number;
  isPending: boolean;
  onSubmit: () => void;
}

export const ExerciseSubmitBar: React.FC<ExerciseSubmitBarProps> = ({
  totalQuestions,
  answeredQuestions,
  isPending,
  onSubmit,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const remaining = totalQuestions - answeredQuestions;

  const handleInitialClick = () => {
    if (remaining > 0) {
      setShowConfirmModal(true);
    } else {
      onSubmit();
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    onSubmit();
  };

  return (
    <>
      <div className="sticky bottom-4 z-30 mt-8 p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
            📊
          </div>
          <div>
            <div className="font-bold text-slate-900">
              Tiến độ làm bài: {answeredQuestions} / {totalQuestions} câu
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {remaining > 0
                ? `Còn ${remaining} câu chưa trả lời. Bạn có thể kiểm tra lại trước khi nộp.`
                : 'Bạn đã hoàn thành tất cả câu hỏi! Sẵn sàng nộp bài.'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleInitialClick}
          disabled={isPending || answeredQuestions === 0}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
            isPending || answeredQuestions === 0
              ? 'bg-slate-300 cursor-not-allowed shadow-none'
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25 active:scale-98'
          }`}
        >
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Đang chấm điểm...</span>
            </>
          ) : (
            <>
              <span>Nộp bài và chấm điểm</span>
              <span>→</span>
            </>
          )}
        </button>
      </div>

      {/* Confirmation Modal when submitting incomplete exercise */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl mx-auto">
              ⚠️
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">
                Bạn vẫn còn {remaining} câu chưa hoàn thành
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Các câu chưa làm sẽ được tính là chưa đúng. Bạn có chắc chắn muốn nộp bài ngay bây giờ?
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-300 font-bold text-sm text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-sm text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                Vẫn nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
