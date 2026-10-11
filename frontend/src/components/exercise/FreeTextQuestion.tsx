import React from 'react';
import { SubQuestionItem } from '../../utils/questionParser';

interface FreeTextQuestionProps {
  subQuestions: SubQuestionItem[];
  values: Record<string, string>;
  disabled?: boolean;
  onChangeValue: (blankId: string, value: string) => void;
}

export const FreeTextQuestion: React.FC<FreeTextQuestionProps> = ({
  subQuestions,
  values,
  disabled = false,
  onChangeValue,
}) => {
  return (
    <div className="space-y-4">
      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs sm:text-sm flex items-center gap-2">
        <span className="text-base">📝</span>
        <span>
          <strong>Lưu ý luyện tập tự do:</strong> Đây là dạng bài viết tự luận / câu trả lời cá nhân. Sau khi nộp bài, bạn có thể đối chiếu câu trả lời với lời giải mẫu tham khảo.
        </span>
      </div>

      {subQuestions.map((sq) => {
        const val = values[sq.id] || '';
        return (
          <div
            key={sq.id}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2"
          >
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {sq.id}
              </span>
              <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed whitespace-pre-wrap">
                {sq.rawText}
              </p>
            </div>

            <div className="pl-9">
              <textarea
                rows={2}
                disabled={disabled}
                value={val}
                onChange={(e) => onChangeValue(sq.id, e.target.value)}
                placeholder="Nhập câu trả lời của bạn..."
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50/30 text-slate-900 text-sm sm:text-base focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
