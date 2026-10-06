import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { readingApi } from "../services/readingApi";
import { ReadingSubmitResponse } from "../types/reading";
import Navbar from "../components/Navbar";
import FuriganaText from "../components/ui/FuriganaText";
import { cn } from "../utils/cn";
import FavoriteButton from "../components/favorite/FavoriteButton";

export default function ReadingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const readingId = id ? parseInt(id, 10) : 0;

  // Selected option IDs mapped by question ID
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [showFurigana, setShowFurigana] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [result, setResult] = useState<ReadingSubmitResponse | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Audio / Speech State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Timer: 15 minutes (900 seconds) countdown
  const [timeLeft, setTimeLeft] = useState(900);

  useEffect(() => {
    if (result) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [result]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  // 1. Fetch Reading Detail
  const {
    data: reading,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["readingDetail", readingId],
    queryFn: () => readingApi.getReadingById(readingId),
    enabled: !!readingId,
  });

  // 2. Submit Mutation
  const submitMutation = useMutation({
    mutationFn: (answersPayload: { questionId: number; selectedOptionId: number }[]) =>
      readingApi.submitReading(readingId, { answers: answersPayload }),
    onSuccess: (data) => {
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  const questions = reading?.questions || [];
  const currentQuestion = questions[activeQuestionIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  // Option select handler
  const handleSelectOption = (questionId: number, optionId: number) => {
    if (result) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Submit test
  const handleSubmit = () => {
    if (!reading || questions.length === 0) return;

    const answersPayload = questions.map((q) => ({
      questionId: q.id,
      selectedOptionId: selectedAnswers[q.id] || 0,
    }));

    submitMutation.mutate(answersPayload);
  };

  // Reset to retake
  const handleRetry = () => {
    setResult(null);
    setSelectedAnswers({});
    setActiveQuestionIndex(0);
    setTimeLeft(900);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Audio Playback with Web Speech fallback
  const toggleAudioSpeech = () => {
    if (!reading) return;

    if (isPlayingAudio) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
    } else {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        // Remove brackets for cleaner reading speech
        const cleanText = reading.content.replace(/\[.*?\]/g, "");
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = "ja-JP";
        utterance.rate = playbackSpeed;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (isPlayingAudio) {
      // Re-trigger with new speed
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link to="/n5/lessons" className="hover:text-slate-900 transition-colors">
            Bài học N5
          </Link>
          <span>/</span>
          {reading && (
            <Link
              to={`/n5/lessons/${reading.lessonId}/reading`}
              className="hover:text-slate-900 transition-colors"
            >
              Luyện đọc
            </Link>
          )}
          <span>/</span>
          <span className="font-semibold text-slate-900 truncate">
            {reading?.title || "Phòng luyện thi"}
          </span>
        </div>

        {/* Loading & Error States */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang chuẩn bị đề thi đọc hiểu...</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-lg mx-auto shadow-xs">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không thể tải bài đọc</h3>
            <p className="text-sm text-rose-600 mb-4">Vui lòng kiểm tra lại kết nối mạng.</p>
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 bg-rose-600 text-white font-bold rounded-xl text-sm hover:bg-rose-700 transition-colors"
            >
              Quay lại
            </button>
          </div>
        )}

        {!isLoading && !error && reading && (
          <div className="space-y-6">
            {/* Top Examination Control Bar (Mockup 3) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
              {/* Left: Back button & Title */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                  title="Quay lại danh sách"
                >
                  &larr;
                </button>
                <div>
                  <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
                    JLPT N5 • ĐỌC HIỂU
                  </span>
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">
                    {reading.title}
                  </h1>
                </div>
              </div>

              {/* Center: Stepper indices */}
              {totalQuestions > 0 && (
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  {questions.map((q, idx) => {
                    const isCurrent = idx === activeQuestionIndex;
                    const isAns = selectedAnswers[q.id] !== undefined;
                    const qRes = result?.results.find((r) => r.questionId === q.id);

                    return (
                      <button
                        key={q.id}
                        onClick={() => setActiveQuestionIndex(idx)}
                        className={cn(
                          "w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center cursor-pointer",
                          result
                            ? qRes?.isCorrect
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                            : isCurrent
                            ? "bg-indigo-600 text-white ring-2 ring-indigo-300"
                            : isAns
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        )}
                        title={`Câu ${idx + 1}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Right: Live Countdown Timer Badge & Favorite */}
              <div className="flex items-center space-x-2.5">
                <FavoriteButton contentType="READING" contentId={reading.id} size="sm" />
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-mono font-bold shadow-xs">
                  <span>⏱️</span>
                  <span>{formatTimer(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Score Result Banner (When submitted) */}
            {result && (
              <div
                className={cn(
                  "p-6 rounded-3xl border shadow-sm transition-all flex flex-col sm:flex-row items-center justify-between gap-4",
                  result.score >= 80
                    ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                    : result.score >= 50
                    ? "bg-amber-50 border-amber-200 text-amber-950"
                    : "bg-rose-50 border-rose-200 text-rose-950"
                )}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-xs",
                      result.score >= 80 ? "bg-emerald-600" : result.score >= 50 ? "bg-amber-500" : "bg-rose-600"
                    )}
                  >
                    {result.score}%
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">
                      {result.score >= 80
                        ? "Xuất sắc! Bạn đã làm rất tốt 🎉"
                        : result.score >= 50
                        ? "Khá tốt! Hãy ôn lại các câu sai 👍"
                        : "Cần luyện tập thêm nhé 💪"}
                    </h3>
                    <p className="text-xs opacity-80 mt-0.5">
                      Đúng {result.correctCount} / {result.totalQuestions} câu hỏi
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRetry}
                  className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Làm lại bài thi 🔄
                </button>
              </div>
            )}

            {/* Split-Screen Main Exam Workspace (Bản Thiết Kế 3) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Audio Waveform & Reading Passage (Col 1-7) */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-zen space-y-6">
                {/* Audio Waveform Bar */}
                <div className="bg-slate-800 text-white rounded-2xl p-4 flex items-center justify-between gap-3 shadow-inner">
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={toggleAudioSpeech}
                      className="w-10 h-10 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white flex items-center justify-center text-sm shadow-md transition-all active:scale-95"
                      title={isPlayingAudio ? "Tạm dừng" : "Nghe đọc bài"}
                    >
                      {isPlayingAudio ? "⏸️" : "▶️"}
                    </button>

                    {/* Animated Waveform Visual */}
                    <div className="flex items-center space-x-1 h-6">
                      {[40, 70, 30, 90, 60, 45, 80, 100, 75, 50, 65, 85, 30, 95, 40].map((h, i) => (
                        <span
                          key={i}
                          className={cn(
                            "w-1 rounded-full transition-all duration-300",
                            isPlayingAudio ? "bg-indigo-400 animate-pulse" : "bg-slate-600"
                          )}
                          style={{ height: isPlayingAudio ? `${h}%` : "30%" }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Speed switch buttons */}
                  <div className="flex items-center bg-slate-900/80 p-1 rounded-xl space-x-1 border border-slate-700">
                    {[0.8, 1.0, 1.2].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSpeedChange(s)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                          playbackSpeed === s
                            ? "bg-indigo-600 text-white"
                            : "text-slate-400 hover:text-white"
                        )}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Furigana Toggle Switch */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📖</span>
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                      Đoạn văn đọc hiểu (本文)
                    </h2>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-slate-600">Hiện Furigana</span>
                    <button
                      type="button"
                      onClick={() => setShowFurigana(!showFurigana)}
                      className={cn(
                        "w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out",
                        showFurigana ? "bg-indigo-600" : "bg-slate-300"
                      )}
                      aria-label="Bật tắt Furigana"
                    >
                      <div
                        className={cn(
                          "bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out",
                          showFurigana ? "translate-x-5" : "translate-x-0"
                        )}
                      />
                    </button>
                  </div>
                </div>

                {/* Optional Passage Illustration */}
                {reading.imageUrl && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50/50 p-2 text-center">
                    <img
                      src={reading.imageUrl}
                      alt={reading.title}
                      className="max-h-[350px] w-auto mx-auto object-contain rounded-xl cursor-zoom-in"
                      onClick={() => setZoomedImage(reading.imageUrl || null)}
                    />
                  </div>
                )}

                {/* Reading Japanese Passage */}
                <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 text-slate-900 text-base sm:text-lg leading-loose font-medium whitespace-pre-line tracking-wide">
                  <FuriganaText text={reading.content} showFurigana={showFurigana} />
                </div>

                {/* Translation Accordion */}
                {reading.translation && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowTranslation(!showTranslation)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center space-x-1"
                    >
                      <span>{showTranslation ? "Ẩn bản dịch tiếng Việt ▲" : "Xem bản dịch tiếng Việt ▼"}</span>
                    </button>

                    {showTranslation && (
                      <div className="mt-3 p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                        <span className="font-bold text-indigo-900 block mb-1">Dịch nghĩa:</span>
                        {reading.translation}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Question Card & Selectable Options (Col 8-12) */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-zen flex flex-col justify-between space-y-6">
                {currentQuestion ? (
                  <div className="space-y-6">
                    {/* Question Header */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
                          CÂU HỎI {activeQuestionIndex + 1} / {totalQuestions}
                        </span>
                        {result && (
                          <span
                            className={cn(
                              "text-xs font-bold px-2 py-0.5 rounded-full",
                              result.results.find((r) => r.questionId === currentQuestion.id)?.isCorrect
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            )}
                          >
                            {result.results.find((r) => r.questionId === currentQuestion.id)?.isCorrect
                              ? "✓ Đúng"
                              : "✕ Sai"}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {currentQuestion.question}
                      </h3>
                    </div>

                    {/* Question Image if present */}
                    {currentQuestion.imageUrl && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2">
                        <img
                          src={currentQuestion.imageUrl}
                          alt="Minh họa câu hỏi"
                          className="max-h-48 w-auto mx-auto object-contain rounded-lg"
                        />
                      </div>
                    )}

                    {/* Options (A, B, C, D) */}
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, optIdx) => {
                        const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                        const qResult = result?.results.find((r) => r.questionId === currentQuestion.id);
                        const isCorrectOption = qResult?.correctOptionId === option.id;
                        const isUserWrong = qResult && !qResult.isCorrect && qResult.selectedOptionId === option.id;

                        const optionLetters = ["A", "B", "C", "D"];
                        const letter = optionLetters[optIdx] || `${optIdx + 1}`;

                        return (
                          <div
                            key={option.id}
                            onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                            className={cn(
                              "p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-between cursor-pointer",
                              qResult
                                ? isCorrectOption
                                  ? "bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300"
                                  : isUserWrong
                                  ? "bg-rose-50 border-rose-300 text-rose-950 line-through opacity-80"
                                  : "bg-white border-slate-200 text-slate-400 opacity-60"
                                : isSelected
                                ? "bg-indigo-50/70 border-indigo-600 text-indigo-950 ring-2 ring-indigo-200 shadow-xs"
                                : "bg-white border-slate-200/90 text-slate-800 hover:border-indigo-300 hover:bg-slate-50"
                            )}
                          >
                            <div className="flex items-center space-x-3">
                              <span
                                className={cn(
                                  "w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center shrink-0 transition-colors",
                                  isSelected
                                    ? "bg-indigo-600 text-white"
                                    : "bg-slate-100 text-slate-600"
                                )}
                              >
                                {letter}
                              </span>
                              <span>{option.content}</span>
                            </div>

                            {/* Radio Icon */}
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                                isSelected
                                  ? "border-indigo-600 bg-indigo-600"
                                  : "border-slate-300"
                              )}
                            >
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation if submitted */}
                    {result && (() => {
                      const qRes = result.results.find((r) => r.questionId === currentQuestion.id);
                      return qRes?.explanation ? (
                        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
                          <span className="font-bold block mb-1">💡 Giải thích chi tiết:</span>
                          {qRes.explanation}
                        </div>
                      ) : null;
                    })()}
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-400">Không có câu hỏi.</div>
                )}

                {/* Bottom Navigation & Submit Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      disabled={activeQuestionIndex === 0}
                      onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      &larr; Câu trước
                    </button>

                    {activeQuestionIndex < totalQuestions - 1 && (
                      <button
                        type="button"
                        onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                      >
                        Câu tiếp theo &rarr;
                      </button>
                    )}
                  </div>

                  {!result ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitMutation.isPending || totalQuestions === 0}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50"
                    >
                      {submitMutation.isPending ? "Đang chấm..." : "Nộp bài thi"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                    >
                      Làm lại
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs cursor-pointer"
          onClick={() => setZoomedImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh]">
            <img
              src={zoomedImage}
              alt="Zoomed"
              className="max-h-[90vh] w-auto mx-auto object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
