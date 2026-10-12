import React, { useState, useMemo } from "react";
import { cn } from "../../../utils/cn";
import { NumberPracticeQuestion } from "../types/numbers";
import Button from "../../../components/ui/Button";

export interface NumbersPracticeProps {
  questions: NumberPracticeQuestion[];
  className?: string;
}

export const NumbersPractice: React.FC<NumbersPracticeProps> = ({
  questions,
  className,
}) => {
  const [sessionKey, setSessionKey] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answeredMap, setAnsweredMap] = useState<Record<number, string>>({});

  const activeQuestions = useMemo(() => {
    return questions.map((q) => {
      const opts = [...q.options];
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      return { ...q, options: opts };
    });
  }, [questions, sessionKey]);

  if (!activeQuestions || activeQuestions.length === 0) {
    return null;
  }

  const currentQ = activeQuestions[currentIndex];
  const answeredForCurrent = answeredMap[currentIndex] ?? null;
  const isAnswered = answeredForCurrent !== null;
  const selectedOpt = currentQ.options.find((o) => o.id === answeredForCurrent);
  const isCurrentCorrect = selectedOpt?.isCorrect ?? false;

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    setAnsweredMap((prev) => ({ ...prev, [currentIndex]: optionId }));
    setSelectedOptionId(optionId);
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(answeredMap[currentIndex + 1] ?? null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOptionId(answeredMap[currentIndex - 1] ?? null);
    }
  };

  const handleReset = () => {
    setAnsweredMap({});
    setSelectedOptionId(null);
    setCurrentIndex(0);
    setSessionKey((prev) => prev + 1);
  };

  const totalAnswered = Object.keys(answeredMap).length;
  const correctCount = Object.entries(answeredMap).reduce((count, [idxStr, optId]) => {
    const idx = parseInt(idxStr, 10);
    const q = activeQuestions[idx];
    const opt = q?.options.find((o) => o.id === optId);
    return opt?.isCorrect ? count + 1 : count;
  }, 0);

  return (
    <div
      className={cn(
        "rounded-[16px] bg-white border border-[#D3CABA] p-5 sm:p-6 space-y-5 shadow-xs",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#F3EEE5]">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            🎯
          </span>
          <div>
            <h4 className="text-base font-bold text-[#1F1C18]">
              Luyện Tập Phản Xạ Số Đếm & Lượng Từ
            </h4>
            <p className="text-xs text-[#766D5E]">
              Trắc nghiệm nhận diện số, lượng từ và các biến âm bất quy tắc
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F3EEE5] text-[#5A5246]">
            Câu {currentIndex + 1} / {activeQuestions.length}
          </span>
          {totalAnswered > 0 && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
              Đúng {correctCount}/{totalAnswered}
            </span>
          )}
        </div>
      </div>

      {/* Question Prompt */}
      <div className="space-y-4">
        <h5 className="text-sm sm:text-base font-semibold text-[#2E2A25] leading-relaxed">
          {currentQ.prompt}
        </h5>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {currentQ.options.map((option) => {
            const isThisSelected = answeredForCurrent === option.id;
            let optionStyle =
              "bg-white border-[#E7E0D2] text-[#433D34] hover:bg-[#FAF7F1] hover:border-[#9A8F7E]";

            if (isAnswered) {
              if (option.isCorrect) {
                optionStyle =
                  "bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-semibold";
              } else if (isThisSelected && !option.isCorrect) {
                optionStyle =
                  "bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]";
              } else {
                optionStyle = "bg-[#FAF7F1] border-[#E7E0D2] text-[#9A8F7E] opacity-60";
              }
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(option.id)}
                disabled={isAnswered}
                className={cn(
                  "p-3.5 rounded-[12px] border text-left transition-all cursor-pointer flex flex-col justify-center space-y-0.5",
                  optionStyle,
                  isAnswered && "cursor-default",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm">{option.label}</span>
                  {isAnswered && option.isCorrect && (
                    <span className="text-xs font-bold text-[#10B981]">✓ Đúng</span>
                  )}
                  {isAnswered && isThisSelected && !option.isCorrect && (
                    <span className="text-xs font-bold text-[#EF4444]">✗ Chưa đúng</span>
                  )}
                </div>
                {option.sublabel && (
                  <span className="text-[11px] text-[#766D5E]">
                    {option.sublabel}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card upon answering */}
        {isAnswered && (
          <div
            className={cn(
              "p-3.5 rounded-[10px] text-xs sm:text-sm border leading-relaxed space-y-1",
              isCurrentCorrect
                ? "bg-[#F0FDF4] border-[#86EFAC] text-[#166534]"
                : "bg-[#FEF2F2] border-[#FCA5A5] text-[#991B1B]",
            )}
            role="alert"
          >
            <div className="font-bold flex items-center gap-1.5">
              <span>{isCurrentCorrect ? "🎉 Chính xác!" : "💡 Giải thích:"}</span>
            </div>
            <p>{currentQ.explanationVi}</p>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-[#F3EEE5]">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="text-xs text-[#766D5E] hover:text-[#1F1C18] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-medium"
        >
          &larr; Câu trước
        </button>

        <div className="flex items-center gap-2">
          {totalAnswered === questions.length ? (
            <Button variant="outline" size="sm" onClick={handleReset}>
              🔄 Làm lại bài luyện tập
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1 || !isAnswered}
            >
              Câu tiếp theo &rarr;
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumbersPractice;
