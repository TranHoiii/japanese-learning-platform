import React, { useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answeredMap, setAnsweredMap] = useState<Record<number, string>>({});

  if (!questions || questions.length === 0) {
    return null;
  }

  const currentQ = questions[currentIndex];
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
    if (currentIndex < questions.length - 1) {
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
  };

  const totalAnswered = Object.keys(answeredMap).length;
  const correctCount = Object.entries(answeredMap).reduce((count, [idxStr, optId]) => {
    const idx = parseInt(idxStr, 10);
    const q = questions[idx];
    const opt = q?.options.find((o) => o.id === optId);
    return opt?.isCorrect ? count + 1 : count;
  }, 0);

  return (
    <div
      className={cn(
        "rounded-[16px] bg-white border border-[#CBD5E1] p-5 sm:p-6 space-y-5 shadow-xs",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            🎯
          </span>
          <div>
            <h4 className="text-base font-bold text-[#0F172A]">
              Luyện Tập Phản Xạ Số Đếm & Lượng Từ
            </h4>
            <p className="text-xs text-[#64748B]">
              Trắc nghiệm nhận diện số, lượng từ và các biến âm bất quy tắc
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#475569]">
            Câu {currentIndex + 1} / {questions.length}
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
        <h5 className="text-sm sm:text-base font-semibold text-[#1E293B] leading-relaxed">
          {currentQ.prompt}
        </h5>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {currentQ.options.map((option) => {
            const isThisSelected = answeredForCurrent === option.id;
            let optionStyle =
              "bg-white border-[#E2E8F0] text-[#334155] hover:bg-[#F8FAFC] hover:border-[#94A3B8]";

            if (isAnswered) {
              if (option.isCorrect) {
                optionStyle =
                  "bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-semibold";
              } else if (isThisSelected && !option.isCorrect) {
                optionStyle =
                  "bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]";
              } else {
                optionStyle = "bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8] opacity-60";
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
                  <span className="text-[11px] text-[#64748B]">
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
      <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="text-xs text-[#64748B] hover:text-[#0F172A] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-medium"
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
