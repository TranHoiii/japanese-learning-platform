import React from 'react';
import { ExerciseSubmitResponse } from '../../types/exercise';

interface ExerciseResultSummaryProps {
  result: ExerciseSubmitResponse;
  onRetry: () => void;
}

export const ExerciseResultSummary: React.FC<ExerciseResultSummaryProps> = ({
  result,
  onRetry,
}) => {
  const isHigh = result.score >= 80;
  const isMedium = result.score >= 50 && result.score < 80;

  return (
    <div
      className={`p-6 sm:p-8 rounded-3xl border shadow-xs transition-all animate-pop ${
        isHigh
          ? 'bg-gradient-to-r from-emerald-50 via-emerald-100/40 to-white border-emerald-300 text-emerald-950'
          : isMedium
          ? 'bg-gradient-to-r from-amber-50 via-amber-100/40 to-white border-amber-300 text-amber-950'
          : 'bg-gradient-to-r from-rose-50 via-rose-100/40 to-white border-rose-300 text-rose-950'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div
            className={`w-20 h-20 rounded-3xl animate-pop flex items-center justify-center text-3xl font-black shadow-sm ${
              isHigh
                ? 'bg-emerald-600 text-white'
                : isMedium
                ? 'bg-amber-500 text-white'
                : 'bg-rose-500 text-white'
            }`}
          >
            {result.score}%
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">
                {isHigh ? '🎉' : isMedium ? '👍' : '💪'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                {isHigh
                  ? 'Xuất sắc! Bạn làm bài rất tuyệt vời'
                  : isMedium
                  ? 'Khá tốt! Hãy đối chiếu kỹ với đáp án chi tiết nhé'
                  : 'Cố lên! Bạn hãy xem lại ngữ pháp và làm lại nhé'}
              </h2>
            </div>
            <p className="text-sm opacity-85 font-medium">
              Chính xác:{' '}
              <strong className="font-bold underline">{result.correctCount}</strong> /{' '}
              {result.correctCount + result.wrongCount > 0 && result.correctCount + result.wrongCount < result.totalQuestions ? (
                <>
                  {result.correctCount + result.wrongCount} câu chấm tự động{' '}
                  <span className="text-xs font-normal opacity-90">
                    ({result.totalQuestions - (result.correctCount + result.wrongCount)} câu tự luyện tập)
                  </span>
                </>
              ) : (
                <>{result.totalQuestions} câu hỏi (Chưa đúng: {result.wrongCount} câu)</>
              )}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRetry}
          className="px-6 py-3 rounded-2xl bg-white font-bold text-sm shadow-xs hover:bg-slate-50 transition-all border border-slate-200/90 text-slate-800 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>🔄</span>
          <span>Làm lại bài tập</span>
        </button>
      </div>
    </div>
  );
};
