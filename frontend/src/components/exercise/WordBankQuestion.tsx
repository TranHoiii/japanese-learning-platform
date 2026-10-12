import React, { useState } from 'react';
import { SubQuestionItem } from '../../utils/questionParser';
import { BlankResult } from '../../types/exercise';
import { InlineBlankQuestion } from './InlineBlankQuestion';

interface WordBankQuestionProps {
  wordBank: string[];
  subQuestions: SubQuestionItem[];
  values: Record<string, string>;
  blankResults?: BlankResult[];
  disabled?: boolean;
  onChangeValue: (blankId: string, value: string) => void;
}

export const WordBankQuestion: React.FC<WordBankQuestionProps> = ({
  wordBank,
  subQuestions,
  values,
  blankResults,
  disabled = false,
  onChangeValue,
}) => {
  const [activeBlankId, setActiveBlankId] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Calculate usage count of each word in user's answers
  const usedWordCounts: Record<string, number> = {};
  Object.values(values).forEach((val) => {
    const trimmed = val.trim();
    if (trimmed) {
      usedWordCounts[trimmed] = (usedWordCounts[trimmed] || 0) + 1;
    }
  });

  const handleWordClick = (word: string) => {
    if (disabled) return;
    if (activeBlankId) {
      onChangeValue(activeBlankId, word);
      setSelectedWord(null);
    } else {
      setSelectedWord(selectedWord === word ? null : word);
    }
  };

  const handleBlankFocus = (blankId: string) => {
    setActiveBlankId(blankId);
    if (selectedWord) {
      onChangeValue(blankId, selectedWord);
      setSelectedWord(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Word Bank Container */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-indigo-50/40 border border-indigo-200/90 shadow-2xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">📦</span>
            <h4 className="text-xs sm:text-sm font-bold text-indigo-950 uppercase tracking-wider">
              Khung từ vựng cho sẵn (Word Bank)
            </h4>
          </div>
          <span className="text-[11px] text-indigo-700/80 font-medium hidden sm:inline">
            {selectedWord
              ? `Đang chọn "${selectedWord}" - bấm vào ô trống để điền`
              : 'Bấm từ để chọn hoặc điền vào ô trống đang trỏ'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {wordBank.map((word, idx) => {
            const isSelected = selectedWord === word;
            const useCount = usedWordCounts[word] || 0;
            const isUsed = useCount > 0;

            let chipClasses =
              'px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-1.5 cursor-pointer select-none ';

            if (disabled) {
              chipClasses += 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed';
            } else if (isSelected) {
              chipClasses +=
                'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-500/30 scale-105 shadow-sm';
            } else if (isUsed) {
              chipClasses +=
                'bg-slate-100/90 text-slate-600 border-slate-300 hover:border-indigo-400 hover:bg-white';
            } else {
              chipClasses +=
                'bg-white text-indigo-950 border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50/60 shadow-2xs';
            }

            return (
              <button
                key={`${word}_${idx}`}
                type="button"
                disabled={disabled}
                onClick={() => handleWordClick(word)}
                className={chipClasses}
              >
                <span>{word}</span>
                {isUsed && (
                  <span className="w-4 h-4 rounded-full bg-slate-300 text-slate-700 text-[10px] flex items-center justify-center font-bold">
                    {useCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Questions rendered with InlineBlankQuestion */}
      <InlineBlankQuestion
        subQuestions={subQuestions}
        values={values}
        blankResults={blankResults}
        disabled={disabled}
        activeBlankId={activeBlankId}
        onFocusBlank={handleBlankFocus}
        onChangeValue={onChangeValue}
      />
    </div>
  );
};
