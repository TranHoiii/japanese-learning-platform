import React, { useState } from "react";
import { cn } from "../../../utils/cn";
import { ConfusedKanaPair } from "../types/kana";
import Badge from "../../../components/ui/Badge";
import AudioButton from "./AudioButton";

export interface ConfusedKanaSectionProps {
  pairs: ConfusedKanaPair[];
  title?: string;
  className?: string;
}

export const ConfusedKanaSection: React.FC<ConfusedKanaSectionProps> = ({
  pairs,
  title = "Các cặp chữ dễ gây nhầm lẫn nhất",
  className,
}) => {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [quizState, setQuizState] = useState<{
    testedChar: string;
    correctRomaji: string;
    userAnswer: string | null;
    isCorrect: boolean | null;
  } | null>(null);

  if (!pairs || pairs.length === 0) return null;

  const currentPair = pairs[selectedPairIndex];

  // Start mini quick quiz for this pair
  const startQuiz = () => {
    const isA = Math.random() > 0.5;
    const char = isA ? currentPair.charA : currentPair.charB;
    const romaji = isA ? currentPair.romajiA : currentPair.romajiB;
    setQuizState({
      testedChar: char,
      correctRomaji: romaji,
      userAnswer: null,
      isCorrect: null,
    });
  };

  const handleAnswer = (chosenRomaji: string) => {
    if (!quizState || quizState.userAnswer !== null) return;
    const isCorrect = chosenRomaji === quizState.correctRomaji;
    setQuizState({
      ...quizState,
      userAnswer: chosenRomaji,
      isCorrect,
    });
  };

  return (
    <div
      className={cn(
        "rounded-[16px] bg-white border border-[#E2E8F0] p-5 sm:p-7 space-y-6 shadow-xs",
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            🔍
          </span>
          <h3 className="text-lg font-bold text-[#0F172A]">{title}</h3>
        </div>
        <span className="text-xs text-[#64748B]">
          {pairs.length} cặp chữ kinh điển
        </span>
      </div>

      {/* Selector pills for confused pairs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {pairs.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setSelectedPairIndex(idx);
              setQuizState(null);
            }}
            className={cn(
              "px-3.5 py-1.5 rounded-full font-bold font-japanese shrink-0 transition-all cursor-pointer",
              selectedPairIndex === idx
                ? "bg-[#2684D9] text-white shadow-xs"
                : "bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:bg-[#F1F5F9]",
            )}
          >
            {p.charA} vs {p.charB} ({p.romajiA} / {p.romajiB})
          </button>
        ))}
      </div>

      {/* Main Comparison Area */}
      <div className="space-y-6">
        {/* Side by side cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card A */}
          <div className="rounded-[14px] bg-[#F0F7FF] border border-[#BBDDFF] p-5 flex flex-col items-center text-center space-y-3">
            <Badge variant="primary" size="sm">
              Ký tự: {currentPair.romajiA}
            </Badge>
            <span
              className="text-6xl sm:text-7xl font-bold font-japanese text-[#0F172A] leading-none"
              lang="ja"
            >
              {currentPair.charA}
            </span>
            <div className="pt-2 border-t border-[#BBDDFF]/70 w-full text-xs text-[#12558F] space-y-1">
              <p className="font-semibold">Ví dụ tiêu biểu:</p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-japanese font-bold text-sm">
                  {currentPair.exampleA.word}
                </span>
                <span>({currentPair.exampleA.reading})</span>
              </div>
              <p className="text-[#475569]">{currentPair.exampleA.meaningVi}</p>
            </div>
          </div>

          {/* Card B */}
          <div className="rounded-[14px] bg-[#FFFBEB] border border-[#FDE68A] p-5 flex flex-col items-center text-center space-y-3">
            <Badge variant="warning" size="sm">
              Ký tự: {currentPair.romajiB}
            </Badge>
            <span
              className="text-6xl sm:text-7xl font-bold font-japanese text-[#0F172A] leading-none"
              lang="ja"
            >
              {currentPair.charB}
            </span>
            <div className="pt-2 border-t border-[#FDE68A]/70 w-full text-xs text-[#B45309] space-y-1">
              <p className="font-semibold">Ví dụ tiêu biểu:</p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-japanese font-bold text-sm">
                  {currentPair.exampleB.word}
                </span>
                <span>({currentPair.exampleB.reading})</span>
              </div>
              <p className="text-[#475569]">{currentPair.exampleB.meaningVi}</p>
            </div>
          </div>
        </div>

        {/* Detailed linguistic distinction and memory tip */}
        <div className="space-y-3 text-xs sm:text-sm text-[#334155] leading-relaxed">
          <div className="rounded-[12px] bg-[#F8FAFC] border border-[#CBD5E1] p-4 space-y-1.5">
            <p className="font-bold text-[#0F172A] flex items-center gap-1.5">
              <span>🎯</span>
              <span>Điểm khác biệt trực quan cốt lõi:</span>
            </p>
            <p>{currentPair.distinctionVi}</p>
          </div>

          <div className="rounded-[12px] bg-[#F8FAFC] border border-[#CBD5E1] p-4 space-y-1.5">
            <p className="font-bold text-[#0F172A] flex items-center gap-1.5">
              <span>✍️</span>
              <span>Hướng nét bút khi viết tay:</span>
            </p>
            <p>{currentPair.strokeDirectionVi}</p>
          </div>

          <div className="rounded-[12px] bg-[#F0FDF4] border border-[#22C55E]/30 p-4 space-y-1.5 text-[#15803D]">
            <p className="font-bold flex items-center gap-1.5">
              <span>💡</span>
              <span>Mẹo ghi nhớ bản xứ:</span>
            </p>
            <p>{currentPair.memoryTipVi}</p>
          </div>
        </div>

        {/* Mini Flash Quiz for this pair */}
        <div className="rounded-[14px] bg-[#F8FAFC] border border-[#E2E8F0] p-4 sm:p-5 text-center space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#12558F]">
              ⚡ Thử thách phản xạ nhanh
            </span>
            {!quizState && (
              <button
                type="button"
                onClick={startQuiz}
                className="text-xs font-semibold text-[#2684D9] hover:underline cursor-pointer"
              >
                Kiểm tra mắt nhìn ngay &rarr;
              </button>
            )}
          </div>

          {quizState ? (
            <div className="space-y-4 py-2">
              <p className="text-xs text-[#64748B]">Ký tự này đọc là gì?</p>
              <div
                className="text-5xl font-bold font-japanese text-[#0F172A]"
                lang="ja"
              >
                {quizState.testedChar}
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={quizState.userAnswer !== null}
                  onClick={() => handleAnswer(currentPair.romajiA)}
                  className={cn(
                    "px-4 py-2 rounded-[8px] border font-bold text-sm transition-all cursor-pointer",
                    quizState.userAnswer === null
                      ? "bg-white border-[#CBD5E1] hover:border-[#2684D9]"
                      : quizState.correctRomaji === currentPair.romajiA
                        ? "bg-[#22C55E] text-white border-[#22C55E]"
                        : quizState.userAnswer === currentPair.romajiA
                          ? "bg-[#EF4444] text-white border-[#EF4444]"
                          : "bg-[#F1F5F9] text-[#94A3B8]",
                  )}
                >
                  {currentPair.romajiA}
                </button>

                <button
                  type="button"
                  disabled={quizState.userAnswer !== null}
                  onClick={() => handleAnswer(currentPair.romajiB)}
                  className={cn(
                    "px-4 py-2 rounded-[8px] border font-bold text-sm transition-all cursor-pointer",
                    quizState.userAnswer === null
                      ? "bg-white border-[#CBD5E1] hover:border-[#2684D9]"
                      : quizState.correctRomaji === currentPair.romajiB
                        ? "bg-[#22C55E] text-white border-[#22C55E]"
                        : quizState.userAnswer === currentPair.romajiB
                          ? "bg-[#EF4444] text-white border-[#EF4444]"
                          : "bg-[#F1F5F9] text-[#94A3B8]",
                  )}
                >
                  {currentPair.romajiB}
                </button>
              </div>

              {quizState.userAnswer !== null && (
                <div className="space-y-2 pt-2 animate-in fade-in duration-150">
                  <p
                    className={cn(
                      "text-xs font-bold",
                      quizState.isCorrect ? "text-[#15803D]" : "text-[#B91C1C]",
                    )}
                  >
                    {quizState.isCorrect
                      ? `✓ Chính xác! Ký tự ${quizState.testedChar} đọc là ${quizState.correctRomaji}.`
                      : `✗ Chưa đúng rồi! Ký tự ${quizState.testedChar} đọc là ${quizState.correctRomaji}.`}
                  </p>
                  <button
                    type="button"
                    onClick={startQuiz}
                    className="text-xs font-semibold text-[#2684D9] hover:underline cursor-pointer"
                  >
                    Làm thêm câu khác &rarr;
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-[#64748B]">
              Nhấn &quot;Kiểm tra mắt nhìn ngay&quot; để thử thách độ tinh mắt của bạn với hai chữ này.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfusedKanaSection;
