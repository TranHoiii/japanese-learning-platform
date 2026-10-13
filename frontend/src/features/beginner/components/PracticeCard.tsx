import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../../utils/cn";
import {
  PracticeQuestion,
  PracticeTimerMode,
  WrongQuestionRecord,
} from "../types/practice";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import AudioButton from "./AudioButton";
import { playSound } from "../../../lib/sound";
import { gamification } from "../../../lib/gamification";

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
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const keyHandlerRef = useRef<((e: KeyboardEvent) => void) | null>(null);

  // Keyboard shortcuts: A-D / 1-4 pick an option, Enter / Space goes on
  useEffect(() => {
    const listener = (e: KeyboardEvent) => keyHandlerRef.current?.(e);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  // Timer state
  const [timerMode, setTimerMode] = useState<PracticeTimerMode>("unlimited");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isTimeout, setIsTimeout] = useState(false);

  // Sync when initialQuestions prop changes
  useEffect(() => {
    setActiveQuestions(initialQuestions);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setScore({ correct: 0, incorrect: 0 }); setCombo(0); setBestCombo(0);
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
      <div className="surface p-8 text-center text-[#766D5E]">
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
      playSound("success");
      setCombo((c) => {
        const next = c + 1;
        setBestCombo((b) => Math.max(b, next));
        return next;
      });
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setCombo(0);
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
      {
        const pct = Math.round((score.correct / activeQuestions.length) * 100);
        if (pct >= 80) gamification.celebrate(pct === 100 ? "Hoàn hảo! 🎉" : "Làm tốt lắm! 🌸", `Đúng ${score.correct}/${activeQuestions.length} câu`);
      }
    }
  };

  // Restart entire session
  const handleRestartFull = () => {
    setActiveQuestions(initialQuestions);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setScore({ correct: 0, incorrect: 0 }); setCombo(0); setBestCombo(0);
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
    setScore({ correct: 0, incorrect: 0 }); setCombo(0); setBestCombo(0);
    setWrongRecords([]);
    setIsCompleted(false);
    setIsTimeout(false);
    setTimeLeft(60);
  };

  keyHandlerRef.current = (e: KeyboardEvent) => {
    if (isCompleted || !currentQuestion) return;
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
    if (!isAnswered) {
      const idx = "abcd".indexOf(e.key.toLowerCase());
      const num = parseInt(e.key, 10);
      const pick = idx >= 0 ? idx : num >= 1 && num <= 4 ? num - 1 : -1;
      if (pick >= 0 && currentQuestion.options[pick]) handleSelectOption(currentQuestion.options[pick].id);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNext();
    }
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
          "surface p-6 sm:p-8 space-y-6 max-w-2xl mx-auto animate-pop",
          className,
        )}
      >
        {/* Banner */}
        <div className="text-center space-y-2">
          <div
            className="w-20 h-20 rounded-full bg-amber-50 border border-amber-200 text-4xl flex items-center justify-center mx-auto animate-pop"
            aria-hidden="true"
          >
            {percentage >= 80 ? "🏆" : percentage >= 50 ? "🎉" : "💪"}
          </div>

          <Badge variant={percentage >= 70 ? "success" : "neutral"} size="sm">
            {isTimeout ? "Hết thời gian 60s" : "Hoàn thành phiên luyện tập"}
          </Badge>

          <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#1F1C18]">
            Kết Quả Phiên: {categoryTitle}
          </h3>

          <div className="text-3xl font-extrabold text-[#213960] font-mono">
            {score.correct} / {total}{" "}
            <span className="text-base font-normal text-[#766D5E]">
              ({percentage}%)
            </span>
          </div>

          {bestCombo >= 3 && (
            <p className="text-sm font-bold text-amber-700">🔥 Chuỗi đúng dài nhất: {bestCombo} câu</p>
          )}
          <p className="text-xs sm:text-sm text-[#5A5246]">
            {percentage === 100
              ? "Xuất sắc! Bạn đã trả lời đúng toàn bộ câu hỏi trong phiên này."
              : percentage >= 70
                ? "Rất tốt! Bạn đã nắm vững phần lớn kiến thức phản xạ."
                : "Đừng nản lòng! Hãy xem lại các câu chưa chính xác bên dưới và bấm 'Làm lại câu sai' nhé."}
          </p>
        </div>

        {/* List of Wrong Questions if any */}
        {wrongRecords.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-[#F3EEE5]">
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
                  <p className="font-semibold text-[#1F1C18] leading-relaxed">
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

                  <p className="text-[#5A5246] bg-white p-2 rounded-[6px] border border-[#E7E0D2] leading-relaxed">
                    💡 {item.question.explanationVi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-4 border-t border-[#F3EEE5]">
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
        "surface p-5 sm:p-7 space-y-6 max-w-2xl mx-auto",
        className,
      )}
    >
      {/* Session Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs pb-3 border-b border-[#F3EEE5]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#213960]">{categoryTitle}</span>
          <span className="text-[#D3CABA]">•</span>
          <span className="font-semibold px-2 py-0.5 rounded-full bg-[#F3EEE5] text-[#5A5246]">
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
                  : "bg-[#EFF6FF] text-[#213960] border-[#93C5FD]",
              )}
            >
              ⏱️ {timeLeft}s
            </span>
          ) : (
            <button
              type="button"
              onClick={() => handleToggleTimer("60s")}
              className="text-[11px] text-[#766D5E] hover:text-[#2F5496] cursor-pointer flex items-center gap-1 border border-[#E7E0D2] px-2 py-0.5 rounded-full hover:bg-[#FAF7F1]"
              title="Bật thử thách giới hạn 60 giây"
            >
              ⏱️ Bật hẹn giờ 60s
            </button>
          )}

          <div className="flex items-center gap-1.5 font-medium">
            {combo >= 2 && <span className="text-amber-600 font-bold animate-pop">🔥 {combo}</span>}
            <span className="text-[#15803D]">✓ {score.correct}</span>
            <span className="text-[#D3CABA]">/</span>
            <span className="text-[#B91C1C]">✗ {score.incorrect}</span>
          </div>
        </div>
      </div>

      <div className="h-2 rounded-full bg-slate-100 overflow-hidden -mt-3" role="progressbar" aria-valuemin={0} aria-valuemax={activeQuestions.length} aria-valuenow={currentIndex + (isAnswered ? 1 : 0)}>
        <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-500" style={{ width: `${Math.round(((currentIndex + (isAnswered ? 1 : 0)) / activeQuestions.length) * 100)}%` }} />
      </div>

      {/* Question Prompt */}
      <div className="text-center space-y-3 py-4 rounded-2xl bg-[#FAF7F1]">
        <p className="text-base sm:text-lg font-semibold text-[#1F1C18] leading-relaxed">
          {currentQuestion.prompt}
        </p>

        {currentQuestion.promptKana && (
          <div className="flex items-center justify-center gap-3">
            <span
              className="text-4xl sm:text-5xl font-bold font-japanese text-[#213960]"
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
          <div className="text-xl sm:text-2xl font-bold text-[#213960] tracking-wide">
            {currentQuestion.promptRomaji}
          </div>
        )}

        {currentQuestion.promptHint && (
          <p className="text-xs text-[#766D5E]">
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
            "bg-white border-[#E7E0D2] text-[#433D34] hover:border-[#2F5496] hover:bg-[#EEF3FA]/50";

          if (isAnswered) {
            if (option.isCorrect) {
              optionStyle =
                "bg-[#F0FDF4] border-[#22C55E] text-[#15803D] font-semibold";
            } else if (isSelected && !option.isCorrect) {
              optionStyle =
                "bg-[#FEF2F2] border-[#EF4444] text-[#B91C1C]";
            } else {
              optionStyle = "bg-[#FAF7F1] border-[#E7E0D2] text-[#9A8F7E] opacity-60";
            }
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectOption(option.id)}
              className={cn(
                "p-3.5 rounded-2xl border-2 text-left flex items-start gap-3 transition-all focus-visible:outline-2 focus-visible:outline-[#2F5496] cursor-pointer disabled:cursor-default",
                isAnswered && option.isCorrect && "animate-pop",
                isAnswered && isSelected && !option.isCorrect && "animate-shake",
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
                      : "bg-[#F3EEE5] text-[#766D5E]",
                )}
              >
                {letter}
              </span>
              <div className="min-w-0">
                <span className="text-sm font-medium block leading-snug">
                  {option.label}
                </span>
                {option.sublabel && (
                  <span className="text-xs text-[#766D5E] block mt-0.5">
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
        <div className="pt-4 border-t border-[#F3EEE5] space-y-4 animate-fade-in">
          <div className="rounded-[10px] bg-[#FAF7F1] border border-[#E7E0D2] p-4 text-xs sm:text-sm text-[#433D34] leading-relaxed">
            <span className="font-bold text-[#213960] block mb-1">
              💡 Giải thích chi tiết:
            </span>
            {currentQuestion.explanationVi}
          </div>

          <div className="flex justify-end">
            <Button variant="primary" size="default" tactile onClick={handleNext}>
              {currentIndex < activeQuestions.length - 1 ? "Câu tiếp theo →" : "Xem kết quả →"} <span className="hidden sm:inline text-[10px] opacity-70 ml-1">(Enter)</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeCard;
