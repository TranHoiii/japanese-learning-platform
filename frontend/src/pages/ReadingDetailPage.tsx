import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { readingApi } from "../services/readingApi";
import { ReadingSubmitResponse } from "../types/reading";
import Navbar from "../components/Navbar";

export default function ReadingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const readingId = id ? parseInt(id, 10) : 0;

  // Selected option IDs mapped by question ID
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
  // Translation visibility toggle
  const [showTranslation, setShowTranslation] = useState(false);

  // Result state after submit
  const [result, setResult] = useState<ReadingSubmitResponse | null>(null);

  // Image modal zoom state
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

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

  // Option select handler
  const handleSelectOption = (questionId: number, optionId: number) => {
    if (result) return; // Disable changing after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Submit test
  const handleSubmit = () => {
    if (!reading || !reading.questions || reading.questions.length === 0) return;

    const answersPayload = reading.questions.map((q) => ({
      questionId: q.id,
      selectedOptionId: selectedAnswers[q.id] || 0,
    }));

    submitMutation.mutate(answersPayload);
  };

  // Reset to retake
  const handleRetry = () => {
    setResult(null);
    setSelectedAnswers({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = reading?.questions?.length || 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
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
              Danh sách bài đọc
            </Link>
          )}
          <span>/</span>
          <span className="font-semibold text-slate-900 truncate">
            {reading?.title || "Chi tiết bài đọc"}
          </span>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang tải bài đọc...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-lg mx-auto shadow-xs">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không thể tải bài đọc</h3>
            <p className="text-sm text-rose-600 mb-4">
              Đã xảy ra lỗi khi kết nối với server hoặc bài đọc không tồn tại.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-rose-600 text-white font-medium rounded-xl text-sm hover:bg-rose-700 transition-colors cursor-pointer"
            >
              Quay lại
            </button>
          </div>
        )}

        {!isLoading && !error && reading && (
          <div className="space-y-8">
            {/* Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
                    JLPT N5
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Bài đọc {reading.sortOrder}
                  </span>
                </div>
                <Link
                  to={`/n5/lessons/${reading.lessonId}/reading`}
                  className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors flex items-center space-x-1"
                >
                  <span>← Danh sách bài đọc</span>
                </Link>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                {reading.title}
              </h1>
            </div>

            {/* Score & Result Banner (Show upon submit) */}
            {result && (
              <div
                className={`p-6 sm:p-8 rounded-3xl border shadow-xs transition-all ${
                  result.score >= 80
                    ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                    : result.score >= 50
                    ? "bg-amber-50/80 border-amber-200 text-amber-950"
                    : "bg-rose-50/80 border-rose-200 text-rose-950"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black ${
                        result.score >= 80
                          ? "bg-emerald-500 text-white"
                          : result.score >= 50
                          ? "bg-amber-500 text-white"
                          : "bg-rose-500 text-white"
                      }`}
                    >
                      {result.score}%
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">
                        {result.score >= 80
                          ? "Xuất sắc! Bạn đã làm rất tốt 🎉"
                          : result.score >= 50
                          ? "Khá tốt! Hãy xem lại các câu sai nhé 👍"
                          : "Cố lên! Bạn cần luyện tập thêm nhé 💪"}
                      </h2>
                      <p className="text-sm opacity-80 mt-1">
                        Đúng {result.correctCount} / {result.totalQuestions} câu
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleRetry}
                    className="px-6 py-2.5 rounded-xl bg-white font-bold text-sm shadow-xs hover:bg-slate-50 transition-all border border-slate-200 cursor-pointer"
                  >
                    Làm lại bài này 🔄
                  </button>
                </div>
              </div>
            )}

            {/* Reading Passage & Visual Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">📖</span>
                  <h2 className="text-lg font-bold text-slate-900">Nội dung bài đọc (本文)</h2>
                </div>

                {reading.translation && (
                  <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    {showTranslation ? "Ẩn bản dịch" : "Xem bản dịch"}
                  </button>
                )}
              </div>

              {/* Visual material image if present */}
              {reading.imageUrl && (
                <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50/50 p-2 sm:p-4 text-center">
                  <img
                    src={reading.imageUrl}
                    alt={reading.title}
                    className="max-h-[500px] w-auto mx-auto object-contain rounded-xl cursor-zoom-in hover:opacity-95 transition-opacity"
                    onClick={() => setZoomedImage(reading.imageUrl || null)}
                    title="Bấm để xem ảnh phóng to"
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    💡 Bấm vào hình để phóng to xem chi tiết
                  </p>
                </div>
              )}

              {/* Japanese Text */}
              <div className="bg-slate-50/60 rounded-2xl p-6 border border-slate-100 text-slate-900 text-lg leading-loose font-medium whitespace-pre-line font-sans tracking-wide">
                {reading.content}
              </div>

              {/* Vietnamese Translation if toggled */}
              {showTranslation && reading.translation && (
                <div className="mt-4 p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-slate-700 text-sm leading-relaxed whitespace-pre-line animate-in fade-in duration-200">
                  <div className="font-bold text-indigo-900 text-xs mb-1 uppercase tracking-wider">
                    Bản dịch tiếng Việt:
                  </div>
                  {reading.translation}
                </div>
              )}
            </div>

            {/* Questions Section */}
            {reading.questions && reading.questions.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">✍️</span>
                    <h2 className="text-lg font-bold text-slate-900">
                      Câu hỏi kiểm tra ({reading.questions.length} câu)
                    </h2>
                  </div>
                  {!result && (
                    <span className="text-xs font-semibold text-slate-500">
                      Đã chọn: {answeredCount} / {totalQuestions}
                    </span>
                  )}
                </div>

                <div className="space-y-8">
                  {reading.questions.map((question, qIdx) => {
                    const qResult = result?.results.find((r) => r.questionId === question.id);
                    const isAnswered = selectedAnswers[question.id] !== undefined;

                    return (
                      <div
                        key={question.id}
                        className={`p-6 rounded-2xl border transition-all ${
                          qResult
                            ? qResult.isCorrect
                              ? "bg-emerald-50/40 border-emerald-200"
                              : "bg-rose-50/40 border-rose-200"
                            : "bg-slate-50/50 border-slate-200/70"
                        }`}
                      >
                        {/* Question Header */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-start space-x-3">
                            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                              {qIdx + 1}
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug whitespace-pre-line">
                              {question.question}
                            </h3>
                          </div>

                          {/* Result status icon */}
                          {qResult && (
                            <span
                              className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
                                qResult.isCorrect
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {qResult.isCorrect ? "✓ Đúng" : "✕ Sai"}
                            </span>
                          )}
                        </div>

                        {/* Question Image if present */}
                        {question.imageUrl && (
                          <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 bg-white p-2">
                            <img
                              src={question.imageUrl}
                              alt={`Câu hỏi ${qIdx + 1}`}
                              className="max-h-60 w-auto mx-auto object-contain rounded-lg cursor-zoom-in"
                              onClick={() => setZoomedImage(question.imageUrl || null)}
                            />
                          </div>
                        )}

                        {/* Options List */}
                        <div className="grid grid-cols-1 gap-2.5 mt-3">
                          {question.options.map((option) => {
                            const isSelected = selectedAnswers[question.id] === option.id;
                            const isCorrectOption = qResult?.correctOptionId === option.id;
                            const isUserWrongChoice =
                              qResult && !qResult.isCorrect && qResult.selectedOptionId === option.id;

                            let optionClasses =
                              "p-3.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-between cursor-pointer ";

                            if (qResult) {
                              // After submit
                              if (isCorrectOption) {
                                optionClasses +=
                                  "bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold shadow-xs";
                              } else if (isUserWrongChoice) {
                                optionClasses +=
                                  "bg-rose-100/80 border-rose-400 text-rose-950 line-through opacity-80";
                              } else {
                                optionClasses += "bg-white/60 border-slate-200 text-slate-400 opacity-60";
                              }
                            } else {
                              // Before submit
                              if (isSelected) {
                                optionClasses +=
                                  "bg-indigo-50 border-indigo-500 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs";
                              } else {
                                optionClasses +=
                                  "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50";
                              }
                            }

                            return (
                              <button
                                key={option.id}
                                type="button"
                                disabled={!!result}
                                onClick={() => handleSelectOption(question.id, option.id)}
                                className={optionClasses}
                              >
                                <span className="flex items-center space-x-3 text-left">
                                  <span
                                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                                      isSelected
                                        ? "border-indigo-600 bg-indigo-600 text-white"
                                        : "border-slate-300 bg-white"
                                    }`}
                                  >
                                    {isSelected && "●"}
                                  </span>
                                  <span>{option.content}</span>
                                </span>

                                {qResult && isCorrectOption && (
                                  <span className="text-xs font-bold text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded-md">
                                    Đáp án đúng
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation reveal (ONLY after submission) */}
                        {qResult?.explanation && (
                          <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs leading-relaxed animate-in fade-in duration-200">
                            <span className="font-bold block mb-1">💡 Giải thích:</span>
                            {qResult.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit Action */}
                {!result && (
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Hãy hoàn thành tất cả các câu hỏi trước khi nộp bài để đạt kết quả tốt nhất.
                    </p>

                    <button
                      onClick={handleSubmit}
                      disabled={submitMutation.isPending || answeredCount === 0}
                      className={`px-8 py-3.5 rounded-2xl font-bold text-sm text-white shadow-md transition-all cursor-pointer ${
                        submitMutation.isPending || answeredCount === 0
                          ? "bg-slate-300 cursor-not-allowed shadow-none"
                          : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25 active:scale-98"
                      }`}
                    >
                      {submitMutation.isPending ? "Đang chấm điểm..." : "Nộp bài và xem kết quả →"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Zoom Image Modal */}
        {zoomedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setZoomedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-2 overflow-auto shadow-2xl">
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold shadow-md hover:bg-slate-700 cursor-pointer"
              >
                ✕
              </button>
              <img
                src={zoomedImage}
                alt="Phóng to"
                className="max-h-[85vh] w-auto mx-auto rounded-xl object-contain"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
