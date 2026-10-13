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
        "surface p-5 sm:p-7 space-y-6 shadow-xs",
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F3EEE5]">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            🔍
          </span>
          <h3 className="text-lg font-bold text-[#1F1C18]">{title}</h3>
        </div>
        <span className="text-xs text-[#766D5E]">
          {pairs.length} cặp chữ kinh điển
        </span>
      </div>

      {/* Selector pills for confused pairs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2.5 custom-scrollbar-x text-xs">
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
                ? "bg-[#2F5496] text-white shadow-xs"
                : "bg-[#FAF7F1] text-[#5A5246] border border-[#E7E0D2] hover:bg-[#F3EEE5]",
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
          <div className="rounded-[14px] bg-[#EEF3FA] border border-[#BDD0EC] p-5 flex flex-col items-center text-center space-y-3">
            <Badge variant="primary" size="sm">
              Ký tự: {currentPair.romajiA}
            </Badge>
            <span
              className="text-6xl sm:text-7xl font-bold font-japanese text-[#1F1C18] leading-none"
              lang="ja"
            >
              {currentPair.charA}
            </span>
            <div className="pt-2 border-t border-[#BDD0EC]/70 w-full text-xs text-[#213960] space-y-1">
              <p className="font-semibold">Ví dụ tiêu biểu:</p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-japanese font-bold text-sm">
                  {currentPair.exampleA.word}
                </span>
                <span>({currentPair.exampleA.reading})</span>
              </div>
              <p className="text-[#5A5246]">{currentPair.exampleA.meaningVi}</p>
            </div>
          </div>

          {/* Card B */}
          <div className="rounded-[14px] bg-[#FFFBEB] border border-[#FDE68A] p-5 flex flex-col items-center text-center space-y-3">
            <Badge variant="warning" size="sm">
              Ký tự: {currentPair.romajiB}
            </Badge>
            <span
              className="text-6xl sm:text-7xl font-bold font-japanese text-[#1F1C18] leading-none"
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
              <p className="text-[#5A5246]">{currentPair.exampleB.meaningVi}</p>
            </div>
          </div>
        </div>

        {/* Detailed linguistic distinction and memory tip */}
        <div className="space-y-3 text-xs sm:text-sm text-[#433D34] leading-relaxed">
          <div className="rounded-[12px] bg-[#FAF7F1] border border-[#D3CABA] p-4 space-y-1.5">
            <p className="font-bold text-[#1F1C18] flex items-center gap-1.5">
              <span>🎯</span>
              <span>Điểm khác biệt trực quan cốt lõi:</span>
            </p>
            <p>{currentPair.distinctionVi}</p>
          </div>

          <div className="rounded-[12px] bg-[#FAF7F1] border border-[#D3CABA] p-4 space-y-1.5">
            <p className="font-bold text-[#1F1C18] flex items-center gap-1.5">
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
        <div className="rounded-[14px] bg-[#FAF7F1] border border-[#E7E0D2] p-4 sm:p-5 text-center space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#213960]">
              ⚡ Thử thách phản xạ nhanh
            </span>
            {!quizState && (
              <button
                type="button"
                onClick={startQuiz}
                className="text-xs font-semibold text-[#2F5496] hover:underline cursor-pointer"
              >
                Kiểm tra mắt nhìn ngay &rarr;
              </button>
            )}
          </div>

          {quizState ? (
            <div className="space-y-4 py-2">
              <p className="text-xs text-[#766D5E]">Ký tự này đọc là gì?</p>
              <div
                className="text-5xl font-bold font-japanese text-[#1F1C18]"
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
                      ? "bg-white border-[#D3CABA] hover:border-[#2F5496]"
                      : quizState.correctRomaji === currentPair.romajiA
                        ? "bg-[#22C55E] text-white border-[#22C55E]"
                        : quizState.userAnswer === currentPair.romajiA
                          ? "bg-[#EF4444] text-white border-[#EF4444]"
                          : "bg-[#F3EEE5] text-[#9A8F7E]",
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
                      ? "bg-white border-[#D3CABA] hover:border-[#2F5496]"
                      : quizState.correctRomaji === currentPair.romajiB
                        ? "bg-[#22C55E] text-white border-[#22C55E]"
                        : quizState.userAnswer === currentPair.romajiB
                          ? "bg-[#EF4444] text-white border-[#EF4444]"
                          : "bg-[#F3EEE5] text-[#9A8F7E]",
                  )}
                >
                  {currentPair.romajiB}
                </button>
              </div>

              {quizState.userAnswer !== null && (
                <div className="space-y-2 pt-2 animate-fade-in">
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
                    className="text-xs font-semibold text-[#2F5496] hover:underline cursor-pointer"
                  >
                    Làm thêm câu khác &rarr;
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-[#766D5E]">
              Nhấn &quot;Kiểm tra mắt nhìn ngay&quot; để thử thách độ tinh mắt của bạn với hai chữ này.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfusedKanaSection;
