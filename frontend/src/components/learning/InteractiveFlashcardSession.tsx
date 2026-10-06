import React, { useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Vocabulary } from "../../types/vocabulary";
import { useAuth } from "../../contexts/AuthContext";
import { reviewApi } from "../../services/reviewApi";
import { progressApi } from "../../services/progressApi";
import { ReviewResult } from "../../types/review";
import { cn } from "../../utils/cn";
import FavoriteButton from "../favorite/FavoriteButton";

export interface InteractiveFlashcardSessionProps {
  vocabularies: Vocabulary[];
  onClose?: () => void;
  className?: string;
}

export const InteractiveFlashcardSession: React.FC<InteractiveFlashcardSessionProps> = ({
  vocabularies,
  onClose,
  className,
}) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [toastText, setToastText] = useState<string | null>(null);

  const total = vocabularies.length;
  const currentVocab = vocabularies[currentIndex];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
  };

  // Play audio
  const handlePlayAudio = useCallback(
    (textToSpeak: string, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (isSoundMuted) return;

      if (currentVocab?.audioUrl) {
        const audio = new Audio(currentVocab.audioUrl);
        audio.play().catch(() => playSpeechFallback(textToSpeak));
      } else {
        playSpeechFallback(textToSpeak);
      }
    },
    [currentVocab, isSoundMuted]
  );

  const playSpeechFallback = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Automatically play audio when flipping to new card
  useEffect(() => {
    if (currentVocab && !isSoundMuted) {
      const text = currentVocab.hiragana || currentVocab.kanji || "";
      playSpeechFallback(text);
    }
  }, [currentIndex, isSoundMuted]);

  // Navigate cards
  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  // Submit Review to Backend SRS
  const handleReviewAnswer = useCallback(
    async (rating: "forgot" | "medium" | "mastered") => {
      if (currentVocab && currentUser) {
        try {
          const ratingMap: Record<string, ReviewResult> = {
            forgot: "AGAIN",
            medium: "HARD",
            mastered: "GOOD",
          };
          const result = ratingMap[rating] || "GOOD";

          // 1. Tạo mục ôn tập SRS (nếu chưa có)
          const item = await reviewApi.createReviewItem({
            contentType: "VOCABULARY",
            contentId: currentVocab.id,
          });

          // 2. Ghi nhận kết quả đánh giá (AGAIN, HARD, GOOD)
          await reviewApi.updateReviewItem(item.id, { result });

          // 3. Cập nhật tiến độ học từ vựng cho user
          const prog = rating === "forgot" ? 30 : rating === "medium" ? 70 : 100;
          try {
            await progressApi.updateContentProgress({
              contentType: "VOCABULARY",
              contentId: currentVocab.id,
              progressPercent: prog,
            });
          } catch {
            // progress tracking is optional
          }

          // 4. Đồng bộ lại dữ liệu ôn tập & tiến độ học
          queryClient.invalidateQueries({ queryKey: ["review-items"] });
          queryClient.invalidateQueries({ queryKey: ["review-items-due"] });
          queryClient.invalidateQueries({ queryKey: ["progress-summary"] });
          queryClient.invalidateQueries({ queryKey: ["progress-lessons"] });
          queryClient.invalidateQueries({ queryKey: ["progress-content"] });

          const labelMap = {
            forgot: "Đã lưu [Quên] → Đã chuyển sang trang Ôn tập 🔄",
            medium: "Đã lưu [Nhớ sơ sơ] → Đã cập nhật vào Ôn tập 📅",
            mastered: "Đã lưu [Thuộc làu] → Đã ghi nhận tiến độ ✨",
          };
          setToastText(labelMap[rating]);
          setTimeout(() => setToastText(null), 2500);
        } catch (err) {
          console.error("Lỗi lưu kết quả ôn tập:", err);
        }
      }
      handleNext();
    },
    [currentVocab, currentUser, queryClient, handleNext]
  );

  // Keyboard hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === "1") {
        e.preventDefault();
        handleReviewAnswer("forgot");
      } else if (e.key === "2") {
        e.preventDefault();
        handleReviewAnswer("medium");
      } else if (e.key === "3") {
        e.preventDefault();
        handleReviewAnswer("mastered");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, handleReviewAnswer]);

  if (!currentVocab) return null;

  return (
    <div className={cn("w-full max-w-5xl mx-auto space-y-6 select-none relative", className)}>
      {/* Toast Notification */}
      {toastText && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-xs sm:text-sm font-semibold border border-slate-700 animate-in fade-in slide-in-from-bottom-4 flex items-center space-x-2">
          <span>{toastText}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-3">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
              title="Quay lại danh sách"
            >
              &larr;
            </button>
          )}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-extrabold text-slate-800">
              Từ {currentIndex + 1} / {total}
            </span>
            <div className="hidden sm:block w-32 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setIsSoundMuted((prev) => !prev)}
            className={cn(
              "p-2 rounded-xl border text-sm font-semibold transition-all shadow-2xs flex items-center space-x-1.5 cursor-pointer",
              isSoundMuted
                ? "bg-slate-100 border-slate-200 text-slate-400"
                : "bg-white border-slate-200 text-indigo-600 hover:bg-indigo-50"
            )}
            title={isSoundMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            <span>{isSoundMuted ? "🔇" : "🔊"}</span>
            <span className="text-xs hidden sm:inline">Phát âm</span>
          </button>

          <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-600 shadow-2xs">
            ⏱️ {formatTimer(timerSeconds)}
          </div>
        </div>
      </div>

      {/* Main Flashcard Room Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        {/* Flashcard Area (Col 1-3) */}
        <div className="lg:col-span-3 flex flex-col items-center">
          {/* 3D Flip Card Container */}
          <div
            className="w-full h-[360px] sm:h-[400px] perspective-1000 cursor-pointer"
            onClick={() => setIsFlipped((prev) => !prev)}
          >
            <div
              className={cn(
                "relative w-full h-full duration-500 transform-style-3d transition-transform rounded-3xl",
                isFlipped && "rotate-y-180"
              )}
            >
              {/* FRONT FACE */}
              <div className="absolute inset-0 backface-hidden bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-zen flex flex-col justify-between items-center text-center">
                {/* Top Badge & Favorite Button */}
                <div className="w-full flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold uppercase tracking-wider">
                    {currentVocab.partOfSpeech || "TỪ VỰNG N5"}
                  </span>
                  <div className="flex items-center space-x-2">
                    <FavoriteButton
                      contentType="VOCABULARY"
                      contentId={currentVocab.id}
                      size="sm"
                    />
                    <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                      Nhấp để lật [Space]
                    </span>
                  </div>
                </div>

                {/* Central Japanese Word */}
                <div className="space-y-4 my-auto">
                  <div className="flex items-center justify-center space-x-3">
                    <h2 className="text-5xl sm:text-6xl font-black text-slate-900 font-japanese tracking-wide">
                      {currentVocab.kanji || currentVocab.hiragana}
                    </h2>

                    <button
                      type="button"
                      onClick={(e) =>
                        handlePlayAudio(
                          currentVocab.hiragana || currentVocab.kanji || "",
                          e
                        )
                      }
                      className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center text-lg shadow-sm cursor-pointer"
                      title="Nghe phát âm chuẩn"
                    >
                      🔊
                    </button>
                  </div>

                  {currentVocab.kanji && (
                    <p className="text-xl sm:text-2xl font-bold text-slate-500 font-japanese">
                      {currentVocab.hiragana}
                    </p>
                  )}

                  {currentVocab.hanViet && (
                    <span className="inline-block text-xs font-bold px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200/80 rounded-full tracking-wider uppercase">
                      Hán Việt: {currentVocab.hanViet}
                    </span>
                  )}
                </div>

                {/* Bottom hint */}
                <div className="text-xs text-slate-400 font-medium">
                  Nhấp vào thẻ hoặc bấm phím cách để xem nghĩa tiếng Việt &rarr;
                </div>
              </div>

              {/* BACK FACE */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-zen flex flex-col justify-between items-center text-center">
                {/* Top Badge & Favorite Button */}
                <div className="w-full flex items-center justify-between text-xs text-slate-400">
                  {currentVocab.hanViet ? (
                    <span className="font-extrabold text-amber-600 tracking-wider text-sm">
                      {currentVocab.hanViet}
                    </span>
                  ) : (
                    <span className="font-semibold uppercase tracking-wider text-slate-400">
                      Ý NGHĨA
                    </span>
                  )}
                  <div className="flex items-center space-x-2">
                    <FavoriteButton
                      contentType="VOCABULARY"
                      contentId={currentVocab.id}
                      size="sm"
                    />
                    <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                      Nhấp để lật lại [Space]
                    </span>
                  </div>
                </div>

                {/* Central Meaning & Example */}
                <div className="space-y-4 my-auto max-w-lg">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                    {currentVocab.meaning}
                  </h3>

                  {/* Japanese Word reminder */}
                  <div className="flex items-center justify-center space-x-2 text-indigo-700 font-bold font-japanese text-lg">
                    <span>{currentVocab.hiragana}</span>
                    {currentVocab.kanji && (
                      <span className="text-slate-400">【{currentVocab.kanji}】</span>
                    )}
                  </div>

                  {/* Context sentence sample */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Ví dụ minh họa:
                    </span>
                    <p className="text-sm font-semibold text-slate-800 font-japanese leading-relaxed">
                      {currentVocab.notes || `わたしは ${currentVocab.hiragana} を べんきょうします。`}
                    </p>
                  </div>
                </div>

                {/* Bottom controls reminder */}
                <div className="text-xs text-slate-400 font-medium">
                  Đánh giá độ nhớ bên dưới để tự động lên lịch vào trang Ôn tập SRS
                </div>
              </div>
            </div>
          </div>

          {/* 3 SRS Review Rating Action Buttons */}
          <div className="w-full mt-6 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
            <button
              type="button"
              onClick={() => handleReviewAnswer("forgot")}
              className="py-3 px-3 sm:px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500 hover:text-white border border-rose-300 text-rose-700 font-bold text-sm shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer"
            >
              <span>Quên</span>
              <span className="text-xs opacity-75 font-mono">(Phím 1)</span>
            </button>

            <button
              type="button"
              onClick={() => handleReviewAnswer("medium")}
              className="py-3 px-3 sm:px-4 rounded-2xl bg-amber-500/15 hover:bg-amber-500 hover:text-white border border-amber-300 text-amber-800 font-bold text-sm shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer"
            >
              <span>Nhớ sơ sơ</span>
              <span className="text-xs opacity-75 font-mono">(Phím 2)</span>
            </button>

            <button
              type="button"
              onClick={() => handleReviewAnswer("mastered")}
              className="py-3 px-3 sm:px-4 rounded-2xl bg-emerald-500/15 hover:bg-emerald-600 hover:text-white border border-emerald-300 text-emerald-800 font-bold text-sm shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer"
            >
              <span>Thuộc làu</span>
              <span className="text-xs opacity-75 font-mono">(Phím 3)</span>
            </button>
          </div>
        </div>

        {/* Right Side Panel: Kanji breakdown & Stroke order hint */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-zen flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Chi Tiết Hán Tự
              </span>
              <span className="text-lg">🈁</span>
            </div>

            {currentVocab.kanji ? (
              <div className="space-y-4">
                {/* Kanji stroke representation */}
                <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                  <div className="text-6xl font-black text-slate-900 font-japanese py-2">
                    {currentVocab.kanji.charAt(0)}
                  </div>
                  <span className="text-[11px] font-bold text-amber-600 block mt-1">
                    Thứ tự nét viết
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Âm Hán Việt:</span>
                    <span className="font-bold text-slate-800 uppercase">
                      {currentVocab.hanViet || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Cách đọc Kana:</span>
                    <span className="font-bold text-slate-800 font-japanese">
                      {currentVocab.hiragana}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Cấp độ:</span>
                    <span className="font-bold text-indigo-600">JLPT N5</span>
                  </div>
                </div>

                <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 text-xs">
                  <p className="font-bold text-amber-900 mb-1">💡 Mẹo nhớ từ:</p>
                  <p className="text-amber-800 leading-relaxed">
                    Liên kết âm Hán Việt "{currentVocab.hanViet}" với nghĩa tiếng Việt để ghi nhớ mặt chữ lâu hơn.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-2">
                <span className="text-3xl">🌱</span>
                <p className="text-xs font-semibold text-slate-700">Từ thuần Nhật (Kana)</p>
                <p className="text-[11px] text-slate-400">
                  Từ vựng này không có chữ Hán tương ứng, chỉ viết bằng Hiragana hoặc Katakana.
                </p>
              </div>
            )}
          </div>

          {/* Stepper buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={handlePrev}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors cursor-pointer"
            >
              &larr; Từ trước
            </button>
            <button
              onClick={handleNext}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors cursor-pointer"
            >
              Từ sau &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveFlashcardSession;
