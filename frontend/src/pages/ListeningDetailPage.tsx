import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { listeningApi } from "../services/listeningApi";
import { ListeningSubmitResponse } from "../types/listening";
import Navbar from "../components/Navbar";

export default function ListeningDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const listeningId = id ? parseInt(id, 10) : 0;

  // Selected option IDs mapped by question ID
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
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
      // Scroll to top of results
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
      audioRef.current.play();
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
      audioRef.current.play();
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

  // Option select handler
  const handleSelectOption = (questionId: number, optionId: number) => {
    if (result) return; // Disable changing after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listening || !listening.questions) return;

    const answersPayload = listening.questions
      .filter((q) => selectedAnswers[q.id] !== undefined)
      .map((q) => ({
        questionId: q.id,
        selectedOptionId: selectedAnswers[q.id],
      }));

    submitMutation.mutate(answersPayload);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang tải bài nghe...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-lg mx-auto shadow-xs">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không thể tải nội dung bài nghe</h3>
            <p className="text-sm text-rose-600 mb-4">
              Đã xảy ra lỗi khi tải dữ liệu bài nghe.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-rose-600 text-white font-semibold rounded-xl text-sm hover:bg-rose-700"
            >
              Quay lại
            </button>
          </div>
        )}

        {!isLoading && !error && listening && (
          <div className="space-y-6">
            {/* Header & Title Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  Bài nghe N5
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {listening.questions.length} câu hỏi
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                {listening.title}
              </h1>

              {listening.description && (
                <p className="text-slate-600 text-sm">{listening.description}</p>
              )}
            </div>

            {/* Custom HTML5 Audio Player Component */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-lg space-y-4">
              <audio ref={audioRef} src={listening.audioUrl} preload="metadata" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎧</span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100">Audio Bài Nghe</h4>
                    <p className="text-xs text-slate-400">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </p>
                  </div>
                </div>

                {/* Speed selector */}
                <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-xl">
                  {[0.75, 1, 1.25, 1.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleSpeedChange(rate)}
                      className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors ${
                        playbackRate === rate
                          ? "bg-emerald-500 text-slate-950"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Scrubber */}
              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-400 font-mono">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="text-xs text-slate-400 font-mono">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Controls bar */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlayPause}
                    className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xl hover:bg-emerald-400 transition-colors shadow-md"
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>

                  <button
                    onClick={handleReplay}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center space-x-1 transition-colors"
                  >
                    <span>🔄</span>
                    <span>Phát lại từ đầu</span>
                  </button>
                </div>

                {/* Volume slider */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-400">🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 sm:w-28 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Submission Summary Card (If submitted) */}
            {result && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      Kết quả bài làm
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                      {result.score >= 80 ? "🎉 Xuất sắc!" : result.score >= 50 ? "👍 Khá tốt!" : "💪 Hãy cố gắng thêm!"}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-center bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">
                      <div className="text-xs font-bold text-slate-400 uppercase">Điểm số</div>
                      <div className="text-2xl font-black text-emerald-600">{result.score}%</div>
                    </div>

                    <div className="text-center bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">
                      <div className="text-xs font-bold text-slate-400 uppercase">Đúng / Tổng</div>
                      <div className="text-2xl font-black text-slate-900">
                        {result.correctCount} / {result.totalQuestions}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional Transcript button */}
                {listening.transcript && (
                  <div className="mt-4">
                    <button
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                    >
                      <span>📜</span>
                      <span>{showTranscript ? "Ẩn bài đọc (Transcript)" : "Xem bài đọc (Transcript)"}</span>
                    </button>

                    {showTranscript && (
                      <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-sm text-slate-800 whitespace-pre-line font-mono leading-relaxed">
                        {listening.transcript}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Questions List & Options Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {listening.questions.map((q, qIndex) => {
                const qResult = result?.results.find((r) => r.questionId === q.id);

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-3xl p-6 border transition-all ${
                      qResult
                        ? qResult.isCorrect
                          ? "border-emerald-300 bg-emerald-50/20"
                          : "border-rose-300 bg-rose-50/20"
                        : "border-slate-200/80 shadow-xs"
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-sm">
                          {qIndex + 1}
                        </span>
                        <h3 className="font-bold text-base text-slate-900">
                          {q.question}
                        </h3>
                      </div>

                      {qResult && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center space-x-1 ${
                            qResult.isCorrect
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-rose-100 text-rose-800 border border-rose-300"
                          }`}
                        >
                          <span>{qResult.isCorrect ? "✓ Đúng" : "✗ Sai"}</span>
                        </span>
                      )}
                    </div>

                    {/* Options List */}
                    <div className="space-y-3 pl-11">
                      {q.options.map((opt) => {
                        const isSelected = selectedAnswers[q.id] === opt.id;
                        let optionStyle = "border-slate-200 hover:border-slate-300 bg-white text-slate-700";

                        if (qResult) {
                          const isUserChoice = qResult.selectedOptionId === opt.id;
                          const isCorrectChoice = qResult.correctOptionId === opt.id;

                          if (isCorrectChoice) {
                            optionStyle = "border-emerald-500 bg-emerald-100/60 text-emerald-900 font-bold";
                          } else if (isUserChoice && !qResult.isCorrect) {
                            optionStyle = "border-rose-500 bg-rose-100/60 text-rose-900 font-bold";
                          } else {
                            optionStyle = "border-slate-200 bg-slate-50 text-slate-400";
                          }
                        } else if (isSelected) {
                          optionStyle = "border-emerald-600 bg-emerald-50/80 text-emerald-900 font-semibold ring-2 ring-emerald-500/20";
                        }

                        const matchImg = opt.content.match(/(\/media\/[^\s]+\.(png|jpg|jpeg|webp))/i);
                        const imageUrl = matchImg ? matchImg[0] : null;
                        const textLabel = imageUrl
                          ? opt.content.replace(imageUrl, "").replace(/-\s*$/, "").trim()
                          : opt.content;

                        return (
                          <label
                            key={opt.id}
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            className={`flex items-start sm:items-center space-x-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${optionStyle}`}
                          >
                            <input
                              type="radio"
                              name={`question-${q.id}`}
                              checked={isSelected}
                              onChange={() => handleSelectOption(q.id, opt.id)}
                              disabled={!!result}
                              className="mt-1 sm:mt-0 w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                            />
                            {imageUrl ? (
                              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <span className="text-sm font-semibold">{textLabel}</span>
                                <img
                                  src={imageUrl}
                                  alt={textLabel || "Lựa chọn hình ảnh"}
                                  className="h-24 sm:h-28 object-contain rounded-xl border border-slate-200/90 bg-white p-1 shadow-xs"
                                />
                              </div>
                            ) : (
                              <span className="text-sm leading-snug">{opt.content}</span>
                            )}
                          </label>
                        );
                      })}
                    </div>

                    {/* Explanation Box (Post-submission) */}
                    {qResult && qResult.explanation && (
                      <div className="mt-4 ml-11 p-4 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-xs sm:text-sm text-amber-900">
                        <div className="font-bold mb-1 text-amber-950 flex items-center space-x-1">
                          <span>💡</span>
                          <span>Giải thích đáp án:</span>
                        </div>
                        <p className="whitespace-pre-line leading-relaxed">{qResult.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4">
                <Link
                  to={`/n5/lessons/${listening.lessonId}/listening`}
                  className="px-5 py-3 rounded-2xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-colors"
                >
                  ← Quay lại danh sách
                </Link>

                {!result ? (
                  <button
                    type="submit"
                    disabled={submitMutation.isPending || Object.keys(selectedAnswers).length === 0}
                    className="px-8 py-3.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm hover:bg-emerald-700 shadow-md shadow-emerald-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {submitMutation.isPending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Đang chấm điểm...</span>
                      </>
                    ) : (
                      <>
                        <span>Nộp Bài Nghe</span>
                        <span>✓</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setResult(null);
                      setSelectedAnswers({});
                    }}
                    className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all"
                  >
                    🔄 Làm lại bài này
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
