import React, { useRef } from 'react';
import { SubQuestionItem, SubItemPart } from '../../utils/questionParser';
import { BlankResult } from '../../types/exercise';

interface InlineBlankQuestionProps {
  subQuestions: SubQuestionItem[];
  values: Record<string, string>;
  blankResults?: BlankResult[];
  disabled?: boolean;
  activeBlankId?: string | null;
  onFocusBlank?: (blankId: string) => void;
  onChangeValue: (blankId: string, value: string) => void;
}

export const InlineBlankQuestion: React.FC<InlineBlankQuestionProps> = ({
  subQuestions,
  values,
  blankResults,
  disabled = false,
  activeBlankId,
  onFocusBlank,
  onChangeValue,
}) => {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const getResult = (blankId: string): BlankResult | undefined => {
    if (!blankResults) return undefined;
    // Direct match
    let res = blankResults.find((r) => r.blankId.toLowerCase() === blankId.toLowerCase());
    if (res) return res;
    // Suffix or prefix match (e.g. "1" matches "1_0")
    res = blankResults.find(
      (r) =>
        r.blankId.toLowerCase().startsWith(blankId.toLowerCase() + '_') ||
        blankId.toLowerCase().startsWith(r.blankId.toLowerCase() + '_')
    );
    return res;
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number,
    allIds: string[]
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextId = allIds[currentIndex + 1];
      if (nextId && inputRefs.current[nextId]) {
        inputRefs.current[nextId]?.focus();
      }
    }
  };

  // Flatten all blank IDs across subQuestions for tab/enter navigation
  const allBlankIds: string[] = [];
  subQuestions.forEach((sq) => {
    sq.parts.forEach((p) => {
      if (p.type === 'blank') allBlankIds.push(p.blankId);
    });
  });

  const renderPart = (part: SubItemPart, _sqId: string) => {
    if (part.type === 'text') {
      return (
        <span key={Math.random()} className="whitespace-pre-wrap leading-relaxed text-slate-800">
          {part.text}
        </span>
      );
    }

    if (part.type === 'choice') {
      const selectedValue = values[part.blankId] || '';
      const bResult = getResult(part.blankId);

      return (
        <span key={part.blankId} className="inline-flex items-center gap-1.5 mx-1.5 align-middle">
          <span className="inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200">
            {part.choices.map((choice) => {
              const isSelected = selectedValue.trim() === choice.trim();
              const isCorrect = bResult?.correctAnswer?.includes(choice);
              const isWrongChoice = bResult && !bResult.isCorrect && isSelected;

              let btnClasses =
                'px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ';

              if (bResult) {
                if (isCorrect) {
                  btnClasses += 'bg-emerald-500 text-white shadow-xs font-bold';
                } else if (isWrongChoice) {
                  btnClasses += 'bg-rose-500 text-white line-through opacity-80';
                } else {
                  btnClasses += 'text-slate-400 opacity-60';
                }
              } else {
                if (isSelected) {
                  btnClasses += 'bg-indigo-600 text-white shadow-xs';
                } else {
                  btnClasses += 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60';
                }
              }

              return (
                <button
                  key={choice}
                  type="button"
                  disabled={disabled}
                  onClick={() => onChangeValue(part.blankId, choice)}
                  className={btnClasses}
                >
                  {choice}
                </button>
              );
            })}
          </span>
          {bResult && !bResult.isCorrect && bResult.correctAnswer && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
              Đáp án: {bResult.correctAnswer}
            </span>
          )}
        </span>
      );
    }

    if (part.type === 'blank') {
      const blankId = part.blankId;
      const val = values[blankId] || '';
      const bResult = getResult(blankId);
      const isFocused = activeBlankId === blankId;
      const blankIndex = allBlankIds.indexOf(blankId);

      let inputBorder = 'border-slate-300 bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20';

      if (bResult) {
        if (bResult.isCorrect) {
          inputBorder = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
        } else {
          inputBorder = 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400';
        }
      } else if (isFocused) {
        inputBorder = 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-500/30';
      }

      return (
        <span key={blankId} className="inline-flex flex-col items-center mx-1 align-baseline relative">
          <input
            ref={(el) => {
              inputRefs.current[blankId] = el;
            }}
            type="text"
            disabled={disabled}
            value={val}
            onFocus={() => onFocusBlank && onFocusBlank(blankId)}
            onChange={(e) => onChangeValue(blankId, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, blankIndex, allBlankIds)}
            placeholder={part.placeholder || '……'}
            className={`min-w-[4.5rem] max-w-[13rem] sm:max-w-[16rem] px-2.5 py-1 text-sm sm:text-base text-center rounded-xl border shadow-2xs transition-all font-sans ${inputBorder}`}
            style={{ width: `${Math.max(5, (val.length || 3) * 1.5 + 2)}ch` }}
          />
          {/* Post-submit indicator */}
          {bResult && (
            <span className="text-[11px] font-semibold mt-1">
              {bResult.isCorrect ? (
                <span className="text-emerald-700 flex items-center gap-0.5">
                  <span>✓</span> <span>Chính xác</span>
                </span>
              ) : (
                <span className="text-rose-700 flex flex-col items-center">
                  <span>✕ Chưa đúng</span>
                  {bResult.correctAnswer && (
                    <span className="text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded text-[11px] font-bold mt-0.5">
                      Đ/A: {bResult.correctAnswer}
                    </span>
                  )}
                </span>
              )}
            </span>
          )}
        </span>
      );
    }

    return null;
  };

  return (
    <div className="space-y-4">
      {subQuestions.map((sq, idx) => (
        <div
          key={sq.id || idx}
          className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all"
        >
          {sq.dialogueLines ? (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-md bg-indigo-100 flex items-center justify-center text-xs">
                  {sq.id}
                </span>
                <span>Hội thoại câu hỏi:</span>
              </div>
              {sq.dialogueLines.map((dLine, dIdx) => (
                <div key={dIdx} className="flex items-baseline gap-2.5 text-base sm:text-lg leading-loose">
                  {dLine.speaker && (
                    <span className="font-bold text-slate-900 shrink-0 min-w-[2.2rem]">
                      {dLine.speaker}:
                    </span>
                  )}
                  <div className="flex-1 flex flex-wrap items-center gap-y-2">
                    {dLine.parts.map((part) => renderPart(part, sq.id))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-start gap-3 text-base sm:text-lg leading-loose">
              <span className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                {sq.id}
              </span>
              <div className="flex-1 flex flex-wrap items-center gap-y-2">
                {sq.parts.map((part) => renderPart(part, sq.id))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
