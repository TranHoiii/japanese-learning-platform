import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listeningApi } from "../services/listeningApi";
import { progressApi } from "../services/progressApi";
import { ListeningSubmitResponse } from "../types/listening";
import Navbar from "../components/Navbar";
import { FavoriteButton } from "../components/favorite/FavoriteButton";
import { cn } from "../utils/cn";

export default function ListeningDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const listeningId = id ? parseInt(id, 10) : 0;

  // Selected option IDs mapped by question ID
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // Audio state & ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);

  // Transcript visibility state
  const [showTranscript, setShowTranscript] = useState(false);

  // Result state after submit
  const [result, setResult] = useState<ListeningSubmitResponse | null>(null);

  // Timer countdown: 15 minutes (900 seconds)
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

  // 1. Fetch Listening Detail
  const {
    data: listening,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["listeningDetail", listeningId],
    queryFn: () => listeningApi.getListeningById(listeningId),
    enabled: !!listeningId,
  });

  // 2. Submit Mutation
  const submitMutation = useMutation({
    mutationFn: (answersPayload: { questionId: number; selectedOptionId: number }[]) =>
      listeningApi.submitListening(listeningId, { answers: answersPayload }),
    onSuccess: (data) => {
      setResult(data);
      progressApi
        .updateContentProgress({
          contentType: "LISTENING",
          contentId: listeningId,
          progressPercent: 100,
        })
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["progress-summary"] });
          queryClient.invalidateQueries({ queryKey: ["progress-lessons"] });
          queryClient.invalidateQueries({ queryKey: ["progress-content"] });
        })
        .catch(() => {});
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  // Audio Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [listening?.audioUrl]);

  // Audio Control Handlers
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const handleSelectOption = (questionId: number, optionId: number) => {
    if (result) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!listening || !listening.questions || listening.questions.length === 0) return;

    const answersPayload = listening.questions
      .filter((q) => selectedAnswers[q.id] !== undefined)
      .map((q) => ({
        questionId: q.id,
        selectedOptionId: selectedAnswers[q.id],
      }));

    submitMutation.mutate(answersPayload);
  };

  const handleRetry = () => {
    setResult(null);
    setSelectedAnswers({});
    setActiveQuestionIndex(0);
    setTimeLeft(900);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatAudioTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const questions = listening?.questions || [];
  const currentQuestion = questions[activeQuestionIndex];
  const totalQuestions = questions.length;

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
          {listening ? (
            <Link
              to={`/n5/lessons/${listening.lessonId}/listening`}
              className="hover:text-slate-900 transition-colors"
            >
              Nghe hiểu Bài {listening.lessonId}
            </Link>
          ) : (
            <span className="text-slate-500">Nghe hiểu</span>
          )}
          <span>/</span>
          <span className="font-semibold text-slate-900 line-clamp-1">
            {listening ? listening.title : "Chi tiết bài nghe"}
          </span>
        </div>

        {/* Loading & Error States */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang chuẩn bị đề thi nghe hiểu...</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-lg mx-auto shadow-xs">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không thể tải nội dung bài nghe</h3>
            <p className="text-sm text-rose-600 mb-4">Đã xảy ra lỗi khi tải dữ liệu bài nghe.</p>
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 bg-rose-600 text-white font-bold rounded-xl text-sm hover:bg-rose-700"
            >
              Quay lại
            </button>
          </div>
        )}

        {!isLoading && !error && listening && (
          <div className="space-y-6">
            {/* Top Examination Control Bar (Mockup 3) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                  title="Quay lại danh sách"
                >
                  &larr;
                </button>
                <div>
                  <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block">
                    JLPT N5 • LUYỆN NGHE
                  </span>
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">
                    {listening.title}
                  </h1>
                </div>
              </div>

              {/* Center: Stepper navigation */}
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

              {/* Right: Countdown timer & Favorite */}
              <div className="flex items-center space-x-3">
                <FavoriteButton contentType="LISTENING" contentId={listeningId} size="md" />
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-mono font-bold shadow-xs">
                  <span>⏱️</span>
                  <span>{formatTimer(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Submission Result Banner */}
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
                        ? "Xuất sắc! Khả năng nghe rất chuẩn 🎉"
                        : result.score >= 50
                        ? "Khá tốt! Hãy nghe lại các đoạn chưa rõ 👍"
                        : "Cần luyện nghe nhiều hơn nhé 💪"}
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
              {/* Left Column: Audio Waveform Player & Transcript (Col 1-7) */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-zen space-y-6">
                <audio ref={audioRef} src={listening.audioUrl} preload="metadata" />

                {/* Modern Dark Audio Player */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xl">
                        🎧
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-100">Bản Thu Âm Bài Nghe</h4>
                        <p className="text-xs text-slate-400 font-mono">
                          {formatAudioTime(currentTime)} / {formatAudioTime(duration)}
                        </p>
                      </div>
                    </div>

                    {/* Speed selector */}
                    <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
                      {[0.8, 1.0, 1.2].map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => handleSpeedChange(rate)}
                          className={cn(
                            "px-2.5 py-1 text-xs font-bold rounded-lg transition-colors",
                            playbackRate === rate
                              ? "bg-indigo-600 text-white"
                              : "text-slate-400 hover:text-white"
                          )}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scrubber Progress Bar */}
                  <div className="space-y-1.5">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                      <span>{formatAudioTime(currentTime)}</span>
                      <span>{formatAudioTime(duration)}</span>
                    </div>
                  </div>

                  {/* Play & Volume controls */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={togglePlayPause}
                        className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl hover:bg-indigo-500 transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        {isPlaying ? "⏸" : "▶"}
                      </button>

                      <button
                        type="button"
                        onClick={handleReplay}
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center space-x-1 transition-colors cursor-pointer"
                      >
                        <span>🔄</span>
                        <span>Phát lại</span>
                      </button>
                    </div>

                    {/* Volume */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400">🔊</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 sm:w-28 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Description info */}
                {listening.description && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900 block mb-1">Ghi chú đề thi:</span>
                    {listening.description}
                  </div>
                )}

                {/* Transcript Accordion */}
                {listening.transcript && (
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <span>📜</span>
                      <span>{showTranscript ? "Ẩn bài đọc (Transcript) ▲" : "Xem bài đọc (Transcript) ▼"}</span>
                    </button>

                    {showTranscript && (
                      <div className="mt-3 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 text-xs sm:text-sm font-japanese leading-loose whitespace-pre-line animate-in fade-in">
                        <span className="font-bold text-indigo-900 block mb-2 font-sans">
                          Kịch bản lời thoại bản xứ:
                        </span>
                        {listening.transcript}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Question Card & Options (Col 8-12) */}
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

                    {/* Explanation */}
                    {result && currentQuestion.explanation && (
                      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
                        <span className="font-bold block mb-1">💡 Giải thích chi tiết:</span>
                        {currentQuestion.explanation}
                      </div>
                    )}
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
    </div>
  );
}
