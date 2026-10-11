import React from 'react';
import { ExerciseQuestionResult } from '../../types/exercise';

interface QuestionResultProps {
  result: ExerciseQuestionResult;
}

export const QuestionResult: React.FC<QuestionResultProps> = ({ result }) => {
  return (
    <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50/90 via-amber-50/50 to-white border border-amber-200 text-amber-950 shadow-2xs animate-in fade-in duration-200 space-y-3">
      <div className="flex items-center justify-between gap-2 border-b border-amber-200/60 pb-2.5">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm sm:text-base">
          <span className="text-lg">💡</span>
          <span>Giải thích & Đáp án Minna no Nihongo:</span>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            result.autoGraded === false
              ? 'bg-amber-100 text-amber-900 border border-amber-200'
              : result.isCorrect
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-rose-100 text-rose-800'
          }`}
        >
          {result.autoGraded === false
            ? '📝 Đối chiếu câu trả lời cá nhân'
            : result.isCorrect
            ? '✓ Hoàn thành chính xác'
            : '✕ Cần ôn tập lại'}
        </span>
      </div>

      {result.explanation ? (
        <pre className="whitespace-pre-line font-sans text-xs sm:text-sm text-slate-800 bg-white/80 p-3 sm:p-4 rounded-xl border border-amber-200/70 leading-relaxed shadow-2xs">
          {result.explanation}
        </pre>
      ) : result.correctAnswerText ? (
        <div className="bg-white/80 p-3 sm:p-4 rounded-xl border border-amber-200/70 text-xs sm:text-sm text-slate-800 font-medium">
          Đáp án: <strong className="text-emerald-700">{result.correctAnswerText}</strong>
        </div>
      ) : (
        <p className="text-xs text-slate-500 italic">Xem thêm giải thích trong giáo trình Minna no Nihongo.</p>
      )}
    </div>
  );
};
