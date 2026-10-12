import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Vocabulary } from "../../types/vocabulary";
import { useAuth } from "../../contexts/AuthContext";
import { reviewApi } from "../../services/reviewApi";
import { progressApi } from "../../services/progressApi";
import { ReviewResult } from "../../types/review";
import { gamification, XP_REWARDS } from "../../lib/gamification";
import { cn } from "../../utils/cn";
import FavoriteButton from "../favorite/FavoriteButton";

export interface InteractiveFlashcardSessionProps {
  vocabularies: Vocabulary[];
  onClose?: () => void;
  className?: string;
}

type Rating = "forgot" | "medium" | "mastered";

const RATING_META: Record<
  Rating,
  { label: string; hint: string; key: string; xp: number; result: ReviewResult; progress: number; btn: string; edge: string }
> = {
  forgot: {
    label: "Quên",
    hint: "Ôn lại sớm",
    key: "1",
    xp: XP_REWARDS.flashcardForgot,
    result: "AGAIN",
    progress: 30,
    btn: "bg-rose-500 text-white hover:bg-rose-600",
    edge: "[--press-edge:#8A2043]",
  },
  medium: {
    label: "Nhớ sơ sơ",
    hint: "Ôn sau vài ngày",
    key: "2",
    xp: XP_REWARDS.flashcardMedium,
    result: "HARD",
    progress: 70,
    btn: "bg-amber-400 text-amber-950 hover:bg-amber-500",
    edge: "[--press-edge:#A25C0A]",
  },
  mastered: {
    label: "Thuộc làu",
    hint: "Ôn thưa dần",
    key: "3",
    xp: XP_REWARDS.flashcardMastered,
    result: "GOOD",
    progress: 100,
    btn: "bg-emerald-600 text-white hover:bg-emerald-700",
    edge: "[--press-edge:#374E23]",
  },
};

const speak = (text: string) => {
  if ("speechSynthesis" in window && text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }
};

const formatTimer = (secs: number) => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
};

export const InteractiveFlashcardSession: React.FC<InteractiveFlashcardSessionProps> = ({
  vocabularies,
  onClose,
  className,
}) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const [deck, setDeck] = useState<Vocabulary[]>(vocabularies);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [results, setResults] = useState<Record<number, Rating>>({});
  const [combo, setCombo] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const finishedRef = useRef(false);

  const total = deck.length;
  const currentVocab = deck[currentIndex];
  const ratedCount = Object.keys(results).length;

  const resetSession = useCallback((nextDeck: Vocabulary[]) => {
    setDeck(nextDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setResults({});
    setCombo(0);
    setSessionXp(0);
    setTimerSeconds(0);
    setFinished(false);
    finishedRef.current = false;
  }, []);

  // New lesson / new word list → fresh session
  useEffect(() => {
    resetSession(vocabularies);
  }, [vocabularies, resetSession]);

  // Timer (stops once the session is finished)
  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => setTimerSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [finished]);

  const playAudio = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!currentVocab) return;
      const text = currentVocab.hiragana || currentVocab.kanji || "";
      if (currentVocab.audioUrl) {
        new Audio(currentVocab.audioUrl).play().catch(() => speak(text));
      } else {
        speak(text);
      }
    },
    [currentVocab],
  );

  // Speak automatically when a new card appears
  useEffect(() => {
    if (currentVocab && !isSoundMuted && !finished) {
      speak(currentVocab.hiragana || currentVocab.kanji || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, deck, isSoundMuted, finished]);

  const goTo = useCallback((index: number) => {
    setIsFlipped(false);
    setCurrentIndex(index);
  }, []);

  const handleNext = useCallback(() => goTo(currentIndex < total - 1 ? currentIndex + 1 : 0), [currentIndex, total, goTo]);
  const handlePrev = useCallback(() => goTo(currentIndex > 0 ? currentIndex - 1 : total - 1), [currentIndex, total, goTo]);

  const finishSession = useCallback(
    (finalResults: Record<number, Rating>) => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setFinished(true);
      const mastered = Object.values(finalResults).filter((r) => r === "mastered").length;
      const totalCards = Object.keys(finalResults).length;
      if (currentUser) {
        gamification.award(XP_REWARDS.sessionBonus, "Hoàn thành phiên học");
        setSessionXp((x) => x + XP_REWARDS.sessionBonus);
      }
      gamification.celebrate(
        "Hoàn thành phiên học!",
        `Bạn đã thuộc ${mastered}/${totalCards} từ. Tiếp tục phát huy nhé!`,
      );
    },
    [currentUser],
  );

  const handleRate = useCallback(
    (rating: Rating) => {
      if (!currentVocab || finished) return;
      const meta = RATING_META[rating];
      const vocab = currentVocab;

      const nextResults = { ...results, [vocab.id]: rating };
      setResults(nextResults);

      // Combo & XP feedback
      if (rating === "mastered") setCombo((c) => c + 1);
      else {
        setCombo(0);
        if (rating === "forgot") setShakeKey((k) => k + 1);
      }
      if (currentUser) {
        gamification.award(meta.xp);
        setSessionXp((x) => x + meta.xp);
      }

      // Persist to the SRS backend in the background so the UI stays snappy
      if (currentUser) {
        (async () => {
          try {
            const item = await reviewApi.createReviewItem({ contentType: "VOCABULARY", contentId: vocab.id });
            await reviewApi.updateReviewItem(item.id, { result: meta.result });
            try {
              await progressApi.updateContentProgress({
                contentType: "VOCABULARY",
                contentId: vocab.id,
                progressPercent: meta.progress,
              });
            } catch {
              // progress tracking is optional
            }
            queryClient.invalidateQueries({ queryKey: ["review-items"] });
            queryClient.invalidateQueries({ queryKey: ["review-items-due"] });
            queryClient.invalidateQueries({ queryKey: ["progress-summary"] });
            queryClient.invalidateQueries({ queryKey: ["progress-lessons"] });
            queryClient.invalidateQueries({ queryKey: ["progress-content"] });
          } catch (err) {
            console.error("Lỗi lưu kết quả ôn tập:", err);
          }
        })();
      }

      // Move to the next card that has not been rated yet
      const nextIdx = deck.findIndex((v, i) => i > currentIndex && !nextResults[v.id]);
      const wrapIdx = nextIdx === -1 ? deck.findIndex((v) => !nextResults[v.id]) : nextIdx;
      if (wrapIdx === -1) {
        finishSession(nextResults);
      } else {
        goTo(wrapIdx);
      }
    },
    [currentVocab, finished, results, currentUser, deck, currentIndex, queryClient, goTo, finishSession],
  );

  // Keyboard hotkeys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) return;
      if (finished) return;
      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (isFlipped && e.key === "1") handleRate("forgot");
      else if (isFlipped && e.key === "2") handleRate("medium");
      else if (isFlipped && e.key === "3") handleRate("mastered");
      else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finished, isFlipped, handleRate, handleNext, handlePrev]);

  const summary = useMemo(() => {
    const values = Object.values(results);
    const mastered = values.filter((r) => r === "mastered").length;
    const medium = values.filter((r) => r === "medium").length;
    const forgot = values.filter((r) => r === "forgot").length;
    return { mastered, medium, forgot, percent: values.length ? Math.round((mastered / values.length) * 100) : 0 };
  }, [results]);

  if (!currentVocab && !finished) return null;

  /* ───────────────────────── Summary screen ───────────────────────── */
  if (finished) {
    const weak = deck.filter((v) => results[v.id] && results[v.id] !== "mastered");
    const ringR = 54;
    const circ = 2 * Math.PI * ringR;
    return (
      <div className={cn("w-full max-w-3xl mx-auto animate-pop", className)}>
        <div className="surface overflow-hidden text-center">
          <div className="hero-ink pattern-seigaiha px-6 pt-10 pb-14 relative">
            <p className="text-5xl mb-3" aria-hidden="true">
              {summary.percent >= 80 ? "🎉" : summary.percent >= 50 ? "👏" : "💪"}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold">Hoàn thành phiên học!</h2>
            <p className="text-white/80 text-sm mt-1.5">
              {summary.percent >= 80
                ? "Xuất sắc! Bạn nắm rất chắc bài này."
                : summary.percent >= 50
                  ? "Tốt lắm! Ôn thêm các từ còn yếu là xong."
                  : "Đừng nản — lặp lại chính là chìa khóa của trí nhớ."}
            </p>
          </div>

          <div className="-mt-10 px-6 pb-8">
            <div className="mx-auto w-32 h-32 rounded-full bg-white shadow-zen flex items-center justify-center relative">
              <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90 absolute inset-0">
                <circle cx="64" cy="64" r={ringR} fill="none" stroke="#F3EEE5" strokeWidth="10" />
                <circle
                  cx="64"
                  cy="64"
                  r={ringR}
                  fill="none"
                  stroke="#6C9644"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={circ - (summary.percent / 100) * circ}
                  style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)" }}
                />
              </svg>
              <div>
                <p className="font-display text-3xl font-extrabold text-slate-900 tabular-nums leading-none">
                  {summary.percent}%
                </p>
                <p className="text-[11px] font-semibold text-slate-500 mt-1">thuộc làu</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 max-w-md mx-auto">
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3">
                <p className="font-display text-2xl font-extrabold text-emerald-700 tabular-nums">{summary.mastered}</p>
                <p className="text-[11px] font-bold text-emerald-800">Thuộc làu</p>
              </div>
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3">
                <p className="font-display text-2xl font-extrabold text-amber-700 tabular-nums">{summary.medium}</p>
                <p className="text-[11px] font-bold text-amber-800">Nhớ sơ sơ</p>
              </div>
              <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3">
                <p className="font-display text-2xl font-extrabold text-rose-700 tabular-nums">{summary.forgot}</p>
                <p className="text-[11px] font-bold text-rose-800">Quên</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="rounded-full bg-slate-100 px-3 py-1.5 font-semibold text-slate-700">
                ⏱️ {formatTimer(timerSeconds)}
              </span>
              {currentUser ? (
                <span className="rounded-full bg-amber-100 px-3 py-1.5 font-bold text-amber-800">⚡ +{sessionXp} XP</span>
              ) : (
                <span className="rounded-full bg-indigo-50 px-3 py-1.5 font-semibold text-indigo-800">
                  Đăng nhập để nhận XP &amp; lưu tiến độ
                </span>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch justify-center gap-3">
              {weak.length > 0 && (
                <button
                  type="button"
                  onClick={() => resetSession(weak)}
                  className="btn-press rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-extrabold text-white [--press-edge:#1D3050] cursor-pointer"
                >
                  🔁 Học lại {weak.length} từ chưa thuộc
                </button>
              )}
              <button
                type="button"
                onClick={() => resetSession(vocabularies)}
                className={cn(
                  "rounded-2xl px-6 py-3.5 text-sm font-bold transition-colors cursor-pointer",
                  weak.length > 0
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    : "btn-press bg-indigo-600 text-white [--press-edge:#1D3050]",
                )}
              >
                Học lại từ đầu
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl px-6 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Quay lại danh sách
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ───────────────────────── Study screen ───────────────────────── */
  const progressPercent = total ? (ratedCount / total) * 100 : 0;
  const wordText = currentVocab.kanji || currentVocab.hiragana;
  const wordSize = wordText.length > 6 ? "text-5xl sm:text-6xl" : wordText.length > 3 ? "text-6xl sm:text-7xl" : "text-7xl sm:text-8xl";

  return (
    <div className={cn("w-full max-w-5xl mx-auto space-y-5 select-none relative", className)}>
      {/* Top bar */}
      <div className="flex items-center gap-3">
        {onClose && (
          <button
            onClick={onClose}
            className="w-10 h-10 shrink-0 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer"
            title="Quay lại danh sách"
            aria-label="Quay lại danh sách"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="flex-1 min-w-0">
          <div
            className="h-3.5 rounded-full bg-slate-200/80 overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={ratedCount}
            aria-label="Tiến độ phiên học"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500 relative"
              style={{ width: `${Math.max(progressPercent, ratedCount > 0 ? 4 : 0)}%` }}
            >
              <span className="absolute inset-x-2 top-[3px] h-[3px] rounded-full bg-white/40" />
            </div>
          </div>
        </div>

        <span className="shrink-0 text-sm font-extrabold text-slate-700 tabular-nums">
          {Math.min(currentIndex + 1, total)}/{total}
        </span>

        {combo >= 2 && (
          <span key={combo} className="shrink-0 animate-pop rounded-full bg-amber-100 border border-amber-300 px-2.5 py-1 text-xs font-extrabold text-amber-800">
            🔥 x{combo}
          </span>
        )}

        <button
          onClick={() => setIsSoundMuted((prev) => !prev)}
          className={cn(
            "hidden sm:flex w-10 h-10 shrink-0 rounded-xl border items-center justify-center transition-all cursor-pointer",
            isSoundMuted ? "bg-slate-100 border-slate-200 text-slate-400" : "bg-white border-slate-200 text-indigo-600 hover:bg-indigo-50",
          )}
          title={isSoundMuted ? "Bật tự động phát âm" : "Tắt tự động phát âm"}
          aria-label={isSoundMuted ? "Bật tự động phát âm" : "Tắt tự động phát âm"}
          aria-pressed={!isSoundMuted}
        >
          {isSoundMuted ? "🔇" : "🔊"}
        </button>
        <span className="hidden sm:inline-flex shrink-0 rounded-xl bg-white border border-slate-200 px-3 h-10 items-center text-xs font-mono font-bold text-slate-600">
          ⏱ {formatTimer(timerSeconds)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5 items-start">
        {/* Card + controls */}
        <div className="flex flex-col items-center">
          <div
            key={shakeKey}
            className={cn("w-full h-[380px] sm:h-[420px] perspective-1000 cursor-pointer", shakeKey > 0 && "animate-shake")}
            onClick={() => setIsFlipped((prev) => !prev)}
            role="button"
            tabIndex={0}
            aria-label={isFlipped ? "Thẻ đang hiện nghĩa, nhấn để lật lại" : "Nhấn để lật thẻ xem nghĩa"}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsFlipped((prev) => !prev);
            }}
          >
            <div
              className={cn(
                "relative w-full h-full duration-500 transform-style-3d transition-transform rounded-[28px]",
                isFlipped && "rotate-y-180",
              )}
            >
              {/* FRONT */}
              <div className="absolute inset-0 backface-hidden bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 shadow-zen flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-400 via-rose-300 to-amber-300" />
                <div className="w-full flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold uppercase tracking-wider">{currentVocab.partOfSpeech || "Từ vựng"}</span>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <FavoriteButton contentType="VOCABULARY" contentId={currentVocab.id} size="sm" />
                  </div>
                </div>

                <div className="my-auto space-y-4">
                  <h2 className={cn("font-mincho font-extrabold text-slate-900 leading-tight", wordSize)}>{wordText}</h2>
                  {currentVocab.kanji && (
                    <p className="text-xl sm:text-2xl font-bold text-slate-500 font-japanese">{currentVocab.hiragana}</p>
                  )}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={playAudio}
                      className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:scale-110 transition-all flex items-center justify-center text-lg shadow-sm cursor-pointer"
                      title="Nghe phát âm"
                      aria-label="Nghe phát âm"
                    >
                      🔊
                    </button>
                    {currentVocab.hanViet && (
                      <span className="text-xs font-bold px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-full tracking-wider uppercase">
                        Hán Việt: {currentVocab.hanViet}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-medium">
                  Nhấn thẻ hoặc phím <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px]">Space</kbd> để xem nghĩa
                </p>
              </div>

              {/* BACK */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-50 via-white to-rose-50 border border-indigo-200 rounded-[28px] p-6 sm:p-8 shadow-zen flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-sky-300 to-indigo-400" />
                <div className="w-full flex items-center justify-between text-xs">
                  <span className="font-extrabold text-amber-700 tracking-wider text-sm">
                    {currentVocab.hanViet || "Ý NGHĨA"}
                  </span>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <FavoriteButton contentType="VOCABULARY" contentId={currentVocab.id} size="sm" />
                  </div>
                </div>

                <div className="my-auto space-y-4 max-w-lg w-full">
                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-snug">
                    {currentVocab.meaning}
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-indigo-800 font-bold font-japanese text-lg">
                    <span>{currentVocab.hiragana}</span>
                    {currentVocab.kanji && <span className="text-slate-400">【{currentVocab.kanji}】</span>}
                  </div>

                  <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-4 text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Ví dụ minh họa
                    </span>
                    <p className="text-sm font-semibold text-slate-800 font-japanese leading-relaxed">
                      {currentVocab.notes || `わたしは ${currentVocab.hiragana} を べんきょうします。`}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-medium">Bạn nhớ từ này đến đâu?</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full mt-5 min-h-[76px]">
            {!isFlipped ? (
              <button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="btn-press w-full h-14 rounded-2xl bg-indigo-600 text-white font-extrabold text-base [--press-edge:#1D3050] cursor-pointer"
              >
                Lật thẻ xem nghĩa
              </button>
            ) : (
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 animate-fade-up">
                {(Object.keys(RATING_META) as Rating[]).map((r) => {
                  const m = RATING_META[r];
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => handleRate(r)}
                      className={cn(
                        "btn-press rounded-2xl py-2.5 px-2 flex flex-col items-center justify-center gap-0.5 cursor-pointer",
                        m.btn,
                        m.edge,
                      )}
                    >
                      <span className="font-extrabold text-sm sm:text-base leading-tight">{m.label}</span>
                      <span className="text-[11px] opacity-80 font-semibold leading-tight">{m.hint}</span>
                      <kbd className="hidden sm:block mt-0.5 text-[10px] font-mono font-bold opacity-70">Phím {m.key} · +{m.xp} XP</kbd>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="w-full mt-3 flex items-center justify-between text-xs">
            <button
              onClick={handlePrev}
              className="px-3 py-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-white font-semibold transition-colors cursor-pointer"
            >
              ← Từ trước
            </button>
            <span className="hidden sm:inline text-slate-400">← → để chuyển thẻ</span>
            <button
              onClick={handleNext}
              className="px-3 py-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-white font-semibold transition-colors cursor-pointer"
            >
              Từ sau →
            </button>
          </div>
        </div>

        {/* Side panel */}
        <aside className="surface p-5 hidden lg:block">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chi tiết Hán tự</span>
            <span className="text-lg" aria-hidden="true">🈁</span>
          </div>

          {currentVocab.kanji ? (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                <div className="text-6xl font-mincho font-extrabold text-slate-900 py-2">{currentVocab.kanji.charAt(0)}</div>
                <span className="text-[11px] font-bold text-amber-700 block mt-1">Chữ đầu tiên</span>
              </div>

              <dl className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <dt className="text-slate-400">Âm Hán Việt</dt>
                  <dd className="font-bold text-slate-800 uppercase">{currentVocab.hanViet || "-"}</dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <dt className="text-slate-400">Cách đọc</dt>
                  <dd className="font-bold text-slate-800 font-japanese">{currentVocab.hiragana}</dd>
                </div>
              </dl>

              {currentVocab.hanViet && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs">
                  <p className="font-bold text-amber-900 mb-1">💡 Mẹo nhớ</p>
                  <p className="text-amber-800 leading-relaxed">
                    Liên kết âm Hán Việt “{currentVocab.hanViet}” với nghĩa tiếng Việt để nhớ mặt chữ lâu hơn.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 space-y-2">
              <span className="text-3xl">🌱</span>
              <p className="text-xs font-semibold text-slate-700">Từ thuần Nhật (Kana)</p>
              <p className="text-[11px] text-slate-400">Từ này không có chữ Hán, chỉ viết bằng Hiragana hoặc Katakana.</p>
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="font-display font-extrabold text-emerald-700 tabular-nums">{summary.mastered}</p>
              <p className="text-[10px] text-slate-400 font-semibold">Thuộc</p>
            </div>
            <div>
              <p className="font-display font-extrabold text-amber-600 tabular-nums">{summary.medium}</p>
              <p className="text-[10px] text-slate-400 font-semibold">Sơ sơ</p>
            </div>
            <div>
              <p className="font-display font-extrabold text-rose-600 tabular-nums">{summary.forgot}</p>
              <p className="text-[10px] text-slate-400 font-semibold">Quên</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default InteractiveFlashcardSession;
