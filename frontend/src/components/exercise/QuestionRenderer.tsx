import React, { useMemo } from 'react';
import { ExerciseQuestion, ExerciseQuestionResult } from '../../types/exercise';
import { parseQuestion } from '../../utils/questionParser';
import { InlineBlankQuestion } from './InlineBlankQuestion';
import { WordBankQuestion } from './WordBankQuestion';
import { ChoiceQuestion } from './ChoiceQuestion';
import { TableQuestion } from './TableQuestion';
import { FreeTextQuestion } from './FreeTextQuestion';
import { QuestionResult } from './QuestionResult';

export interface IllustrationInfo {
  src: string;
  alt: string;
  caption: string;
}

interface QuestionRendererProps {
  question: ExerciseQuestion;
  index: number;
  illustration?: IllustrationInfo | null;
  selectedOptionId?: number | null;
  blankValues?: Record<string, string>;
  result?: ExerciseQuestionResult;
  disabled?: boolean;
  onSelectOption: (optionId: number) => void;
  onChangeBlank: (blankId: string, value: string) => void;
  onOpenImageModal: (info: IllustrationInfo) => void;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  index,
  illustration,
  selectedOptionId,
  blankValues = {},
  result,
  disabled = false,
  onSelectOption,
  onChangeBlank,
  onOpenImageModal,
}) => {
  const parsed = useMemo(() => parseQuestion(question), [question]);

  return (
    <div
      className={`p-5 sm:p-7 rounded-3xl border transition-all ${
        result
          ? result.autoGraded === false
            ? 'bg-amber-50/20 border-amber-200/90 shadow-2xs'
            : result.isCorrect
            ? 'bg-emerald-50/30 border-emerald-200/90 shadow-2xs'
            : 'bg-rose-50/30 border-rose-200/90 shadow-2xs'
          : 'bg-white border-slate-200/80 shadow-xs'
      }`}
    >
      {/* Question Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            {index + 1}
          </span>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                {parsed.questionType === 'MULTIPLE_CHOICE'
                  ? 'TRẮC NGHIỆM'
                  : parsed.questionType === 'WORD_BANK'
                  ? 'WORD BANK'
                  : parsed.questionType === 'TABLE'
                  ? 'BẢNG CHIA THỂ'
                  : 'ĐIỀN CHỖ TRỐNG'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {parsed.instruction}
            </h3>
          </div>
        </div>

        {/* Result Status Badge */}
        {result && (
          result.autoGraded === false ? (
            <span className="shrink-0 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-200">
              <span>📝</span>
              <span>Tự luyện tập</span>
            </span>
          ) : (
            <span
              className={`shrink-0 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                result.isCorrect
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              <span>{result.isCorrect ? '✓' : '✕'}</span>
              <span>{result.isCorrect ? 'Đúng' : 'Chưa đúng'}</span>
            </span>
          )
        )}
      </div>

      {/* Example Box (if any) */}
      {parsed.example && (
        <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
          <span className="text-base shrink-0 mt-0.5">📌</span>
          <div className="flex-1">
            <span className="font-bold text-slate-900 block mb-1">Ví dụ mẫu:</span>
            <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">
              {parsed.example}
            </pre>
          </div>
        </div>
      )}

      {/* Illustration Image (if applicable) */}
      {illustration && (
        <div className="mb-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col items-center">
          <div className="relative group overflow-hidden rounded-xl bg-white border border-slate-200 shadow-2xs">
            <img
              src={illustration.src}
              alt={illustration.alt}
              onClick={() => onOpenImageModal(illustration)}
              className="max-h-72 sm:max-h-84 w-auto object-contain cursor-zoom-in group-hover:scale-[1.02] transition-transform duration-200 p-2"
            />
            <button
              type="button"
              onClick={() => onOpenImageModal(illustration)}
              className="absolute top-2.5 right-2.5 px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <span>🔍</span>
              <span>Phóng to</span>
            </button>
          </div>
          <p className="text-center text-xs text-slate-500 font-medium mt-2 flex items-center gap-1">
            <span>📖</span>
            <span>{illustration.caption}</span>
          </p>
        </div>
      )}

      {/* Render Component according to question type */}
      {parsed.questionType === 'MULTIPLE_CHOICE' && question.options && (
        <ChoiceQuestion
          options={question.options}
          selectedOptionId={selectedOptionId}
          result={result}
          disabled={disabled}
          onSelectOption={onSelectOption}
        />
      )}

      {parsed.questionType === 'WORD_BANK' && parsed.wordBank && (
        <WordBankQuestion
          wordBank={parsed.wordBank}
          subQuestions={parsed.subQuestions}
          values={blankValues}
          blankResults={result?.blankResults}
          disabled={disabled}
          onChangeValue={onChangeBlank}
        />
      )}

      {parsed.questionType === 'TABLE' && parsed.tableData && (
        <TableQuestion
          tableData={parsed.tableData}
          values={blankValues}
          blankResults={result?.blankResults}
          disabled={disabled}
          onChangeValue={onChangeBlank}
        />
      )}

      {parsed.questionType === 'INLINE_BLANK' && (
        <InlineBlankQuestion
          subQuestions={parsed.subQuestions}
          values={blankValues}
          blankResults={result?.blankResults}
          disabled={disabled}
          onChangeValue={onChangeBlank}
        />
      )}

      {parsed.questionType === 'FREE_TEXT' && (
        <FreeTextQuestion
          subQuestions={parsed.subQuestions}
          values={blankValues}
          disabled={disabled}
          onChangeValue={onChangeBlank}
        />
      )}

      {/* Post-submit official explanation */}
      {result && <QuestionResult result={result} />}
    </div>
  );
};
