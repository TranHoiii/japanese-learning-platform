import React from 'react';
import { QuestionOption, ExerciseQuestionResult } from '../../types/exercise';

interface ChoiceQuestionProps {
  options: QuestionOption[];
  selectedOptionId?: number | null;
  result?: ExerciseQuestionResult;
  disabled?: boolean;
  onSelectOption: (optionId: number) => void;
}

export const ChoiceQuestion: React.FC<ChoiceQuestionProps> = ({
  options,
  selectedOptionId,
  result,
  disabled = false,
  onSelectOption,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
      {options.map((option) => {
        const isSelected = selectedOptionId === option.id;
        const isCorrectOption = result?.correctOptionId === option.id;
        const isUserWrongChoice = result && !result.isCorrect && result.selectedOptionId === option.id;

        let cardClasses =
          'p-4 rounded-2xl border text-sm sm:text-base font-medium transition-all flex items-center justify-between cursor-pointer select-none ';

        if (result) {
          if (isCorrectOption) {
            cardClasses += 'bg-emerald-100/90 border-emerald-400 text-emerald-950 font-bold shadow-xs';
          } else if (isUserWrongChoice) {
            cardClasses += 'bg-rose-100/80 border-rose-400 text-rose-950 line-through opacity-80';
          } else {
            cardClasses += 'bg-white/60 border-slate-200 text-slate-400 opacity-60';
          }
        } else {
          if (isSelected) {
            cardClasses +=
              'bg-indigo-50 border-indigo-500 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs';
          } else {
            cardClasses +=
              'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50';
          }
        }

        return (
          <button
            key={option.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectOption(option.id)}
            className={cardClasses}
          >
            <div className="flex items-center gap-3 text-left">
              <span
                className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0 transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-2xs'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {isSelected ? '✓' : ''}
              </span>
              <span className="leading-relaxed">{option.optionText}</span>
            </div>

            {result && isCorrectOption && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-200/80 px-2.5 py-1 rounded-lg shrink-0">
                Đáp án đúng ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
