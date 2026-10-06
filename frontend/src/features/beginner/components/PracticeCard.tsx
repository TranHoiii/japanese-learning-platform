import React, { useState, useEffect } from "react";
import { cn } from "../../../utils/cn";
import {
  PracticeQuestion,
  PracticeTimerMode,
  WrongQuestionRecord,
} from "../types/practice";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import AudioButton from "./AudioButton";

export interface PracticeCardProps {
  questions: PracticeQuestion[];
  categoryTitle: string;
  onResetSession?: () => void;
  onChangeMode?: () => void;
  className?: string;
}

export const PracticeCard: React.FC<PracticeCardProps> = ({
  questions: initialQuestions,
  categoryTitle,
  onResetSession,
  onChangeMode,
  className,
}) => {
  // Session Question list (may be initial questions or retry wrong questions)
  const [activeQuestions, setActiveQuestions] = useState<PracticeQuestion[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [wrongRecords, setWrongRecords] = useState<WrongQuestionRecord[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer state
  const [timerMode, setTimerMode] = useState<PracticeTimerMode>("unlimited");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isTimeout, setIsTimeout] = useState(false);

  // Sync when initialQuestions prop changes
  useEffect(() => {
    setActiveQuestions(initialQuestions);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setScore({ correct: 0, incorrect: 0 });
    setWrongRecords([]);
    setIsCompleted(false);
    setIsTimeout(false);
    setTimeLeft(60);
  }, [initialQuestions]);

  // Countdown timer effect
  useEffect(() => {
    if (timerMode !== "60s" || isCompleted) return;

    if (timeLeft <= 0) {
      setIsTimeout(true);
      setIsCompleted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerMode, timeLeft, isCompleted]);

  if (!activeQuestions || activeQuestions.length === 0) {
    return (
      <div className="rounded-[14px] bg-white border border-[#E2E8F0] p-8 text-center text-[#64748B]">
        Chưa có câu hỏi luyện tập cho danh mục này.
      </div>
    );
  }

  const currentQuestion = activeQuestions[currentIndex];
  const isAnswered = selectedOptionId !== null;

  const handleSelectOption = (optionId: string) => {
    if (isAnswered || isCompleted) return;
    setSelectedOptionId(optionId);

    const selectedOption = currentQuestion.options.find((o) => o.id === optionId);
    const correctOption = currentQuestion.options.find((o) => o.isCorrect);

    if (selectedOption?.isCorrect) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
      setWrongRecords((prev) => [
        ...prev,
        {
          question: currentQuestion,
          selectedOptionId: optionId,
          selectedOptionLabel: selectedOption?.label || "",
          correctOptionLabel: correctOption?.label || "",
        },
      ]);
    }
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
    } else {
      setIsCompleted(true);
    }
  };

  // Restart entire session
  const handleRestartFull = () => {
    setActiveQuestions(initialQuestions);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setScore({ correct: 0, incorrect: 0 });
    setWrongRecords([]);
    setIsCompleted(false);
    setIsTimeout(false);
    setTimeLeft(60);
    onResetSession?.();
  };

  // Retry only wrong questions
  const handleRetryWrongOnly = () => {
    if (wrongRecords.length === 0) return;
    const wrongQs = wrongRecords.map((r) => r.question);
    setActiveQuestions(wrongQs);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setScore({ correct: 0, incorrect: 0 });
    setWrongRecords([]);
    setIsCompleted(false);
    setIsTimeout(false);
    setTimeLeft(60);
  };

  // Switch timer mode
  const handleToggleTimer = (mode: PracticeTimerMode) => {
    setTimerMode(mode);
    setTimeLeft(60);
  };

  // ==========================================
  // RESULT SCREEN (100% In-Memory State)
  // ==========================================
  if (isCompleted) {
    const total = activeQuestions.length;
    const percentage = Math.round((score.correct / total) * 100);

    return (
      <div
        className={cn(
          "rounded-[16px] bg-white border border-[#CBD5E1] p-6 sm:p-8 space-y-6 shadow-sm max-w-2xl mx-auto",
          className,
        )}
      >
        {/* Banner */}
        <div className="text-center space-y-2">
          <div
            className="w-16 h-16 rounded-full bg-[#F0FDF4] border border-[#22C55E]/30 text-3xl flex items-center justify-center mx-auto"
            aria-hidden="true"
          >
            {percentage >= 80 ? "🏆" : percentage >= 50 ? "🎉" : "💪"}
          </div>

          <Badge variant={percentage >= 70 ? "success" : "neutral"} size="sm">
            {isTimeout ? "Hết thời gian 60s" : "Hoàn thành phiên luyện tập"}
          </Badge>

          <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
            Kết Quả Phiên: {categoryTitle}
          </h3>

          <div className="text-3xl font-extrabold text-[#12558F] font-mono">
            {score.correct} / {total}{" "}
            <span className="text-base font-normal text-[#64748B]">
              ({percentage}%)
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#475569]">
            {percentage === 100
              ? "Xuất sắc! Bạn đã trả lời đúng toàn bộ câu hỏi trong phiên này."
              : percentage >= 70
                ? "Rất tốt! Bạn đã nắm vững phần lớn kiến thức phản xạ."
                : "Đừng nản lòng! Hãy xem lại các câu chưa chính xác bên dưới và bấm 'Làm lại câu sai' nhé."}
          </p>
        </div>

        {/* List of Wrong Questions if any */}
        {wrongRecords.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-[#F1F5F9]">
            <h4 className="text-sm font-bold text-[#B91C1C] flex items-center gap-1.5">
              <span>⚠️</span>
              <span>Các câu cần xem lại ({wrongRecords.length} câu):</span>
            </h4>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {wrongRecords.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-[12px] bg-[#FEF2F2]/60 border border-[#FCA5A5]/60 text-xs space-y-1.5"
                >
                  <p className="font-semibold text-[#0F172A] leading-relaxed">
                    {idx + 1}. {item.question.prompt}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 text-[11px]">
                    <span className="text-[#DC2626]">
                      ✗ Bạn chọn: <strong>{item.selectedOptionLabel}</strong>
                    </span>
                    <span className="text-[#16A34A]">
                      ✓ Đáp án đúng: <strong>{item.correctOptionLabel}</strong>
                    </span>
                  </div>

                  <p className="text-[#475569] bg-white p-2 rounded-[6px] border border-[#E2E8F0] leading-relaxed">
                    💡 {item.question.explanationVi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-4 border-t border-[#F1F5F9]">
          <Button variant="primary" size="default" fullWidth onClick={handleRestartFull}>
            🔄 Luyện tập lại từ đầu
          </Button>

          {wrongRecords.length > 0 && (
            <Button
              variant="outline"
              size="default"
              fullWidth
              onClick={handleRetryWrongOnly}
              className="border-[#EF4444] text-[#B91C1C] hover:bg-[#FEF2F2]"
            >
              🎯 Làm lại {wrongRecords.length} câu sai
            </Button>
          )}

          {onChangeMode && (
            <Button variant="secondary" size="default" fullWidth onClick={onChangeMode}>
              📋 Chọn chế độ khác
            </Button>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // ACTIVE QUESTION SCREEN
  // ==========================================
  return (
    <div
      className={cn(
        "rounded-[16px] bg-white border border-[#CBD5E1] p-5 sm:p-7 space-y-6 shadow-sm max-w-2xl mx-auto",
        className,
      )}
    >
      {/* Session Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs pb-3 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#12558F]">{categoryTitle}</span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="font-semibold px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569]">
            Câu {currentIndex + 1} / {activeQuestions.length}
          </span>
        </div>

        {/* Timer & Score Controls */}
        <div className="flex items-center gap-3">
          {/* Timer Toggle & Countdown */}
          {timerMode === "60s" ? (
            <span
              className={cn(
                "px-2.5 py-1 rounded-full font-bold font-mono text-xs border animate-pulse",
                timeLeft <= 10
                  ? "bg-[#FEF2F2] text-[#DC2626] border-[#FCA5A5]"
                  : "bg-[#EFF6FF] text-[#1D4ED8] border-[#93C5FD]",
              )}
            >
              ⏱️ {timeLeft}s
            </span>
          ) : (
            <button
              type="button"
              onClick={() => handleToggleTimer("60s")}
              className="text-[11px] text-[#64748B] hover:text-[#2684D9] cursor-pointer flex items-center gap-1 border border-[#E2E8F0] px-2 py-0.5 rounded-full hover:bg-[#F8FAFC]"
              title="Bật thử thách giới hạn 60 giây"
            >
              ⏱️ Bật hẹn giờ 60s
            </button>
          )}

          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-[#15803D]">✓ {score.correct}</span>
            <span className="text-[#CBD5E1]">/</span>
            <span className="text-[#B91C1C]">✗ {score.incorrect}</span>
          </div>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="text-center space-y-3 py-2">
        <p className="text-base sm:text-lg font-semibold text-[#0F172A] leading-relaxed">
          {currentQuestion.prompt}
        </p>

        {currentQuestion.promptKana && (
          <div className="flex items-center justify-center gap-3">
            <span
              className="text-4xl sm:text-5xl font-bold font-japanese text-[#12558F]"
              lang="ja"
            >
              {currentQuestion.promptKana}
            </span>
            <AudioButton
              audioUrl={currentQuestion.audioUrl}
              label={currentQuestion.promptKana}
              size="default"
              variant="outline"
              showDisabledState={false}
            />
          </div>
        )}

        {currentQuestion.promptRomaji && (
          <div className="text-xl sm:text-2xl font-bold text-[#12558F] tracking-wide">
            {currentQuestion.promptRomaji}
          </div>
        )}

        {currentQuestion.promptHint && (
          <p className="text-xs text-[#64748B]">
            💡 Gợi ý: {currentQuestion.promptHint}
          </p>
        )}
      </div>

      {/* Options List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const letter = String.fromCharCode(65 + idx);

          let optionStyle =
            "bg-white border-[#E2E8F0] text-[#334155] hover:border-[#2684D9] hover:bg-[#F0F7FF]/50";

          if (isAnswered) {
            if (option.isCorrect) {
              optionStyle =
                "bg-[#F0FDF4] border-[#22C55E] text-[#15803D] font-semibold";
            } else if (isSelected && !option.isCorrect) {
              optionStyle =
                "bg-[#FEF2F2] border-[#EF4444] text-[#B91C1C]";
            } else {
              optionStyle = "bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8] opacity-60";
            }
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectOption(option.id)}
              className={cn(
                "p-3.5 rounded-[12px] border text-left flex items-start gap-3 transition-all focus-visible:outline-2 focus-visible:outline-[#2684D9] cursor-pointer disabled:cursor-default",
                optionStyle,
              )}
              role="radio"
              aria-checked={isSelected}
            >
              <span
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5",
                  isAnswered && option.isCorrect
                    ? "bg-[#22C55E] text-white"
                    : isAnswered && isSelected && !option.isCorrect
                      ? "bg-[#EF4444] text-white"
                      : "bg-[#F1F5F9] text-[#64748B]",
                )}
              >
                {letter}
              </span>
              <div className="min-w-0">
                <span className="text-sm font-medium block leading-snug">
                  {option.label}
                </span>
                {option.sublabel && (
                  <span className="text-xs text-[#64748B] block mt-0.5">
                    {option.sublabel}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation and Next Button */}
      {isAnswered && (
        <div className="pt-4 border-t border-[#F1F5F9] space-y-4 animate-in fade-in duration-200">
          <div className="rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0] p-4 text-xs sm:text-sm text-[#334155] leading-relaxed">
            <span className="font-bold text-[#12558F] block mb-1">
              💡 Giải thích chi tiết:
            </span>
            {currentQuestion.explanationVi}
          </div>

          <div className="flex justify-end">
            <Button variant="primary" size="default" onClick={handleNext}>
              {currentIndex < activeQuestions.length - 1 ? "Câu tiếp theo →" : "Xem kết quả →"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeCard;
