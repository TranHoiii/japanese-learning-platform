import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { exerciseApi } from "../services/exerciseApi";
import { ExerciseSubmitResponse } from "../types/exercise";
import Navbar from "../components/Navbar";
import { FavoriteButton } from "../components/favorite/FavoriteButton";

export default function ExerciseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const exerciseId = id ? parseInt(id, 10) : 0;

  // Selected option IDs mapped by question ID
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});

  // Text answers for fill-in-the-blank questions
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});

  // Result state after submit
  const [result, setResult] = useState<ExerciseSubmitResponse | null>(null);

  // 1. Fetch Exercise Detail
  const {
    data: exercise,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exerciseDetail", exerciseId],
    queryFn: () => exerciseApi.getExerciseById(exerciseId),
    enabled: !!exerciseId,
  });

  // 2. Submit Mutation
  const submitMutation = useMutation({
    mutationFn: (answersPayload: { questionId: number; selectedOptionId?: number | null; answerText?: string | null }[]) =>
      exerciseApi.submitExercise(exerciseId, { answers: answersPayload }),
    onSuccess: (data) => {
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  // Handle option select
  const handleSelectOption = (questionId: number, optionId: number) => {
    if (result) return;
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Handle text input change
  const handleTextChange = (questionId: number, text: string) => {
    if (result) return;
    setTextAnswers((prev) => ({
      ...prev,
      [questionId]: text,
    }));
  };

  // Submit exercise
  const handleSubmit = () => {
    if (!exercise || !exercise.questions || exercise.questions.length === 0) return;

    const answersPayload = exercise.questions.map((q) => ({
      questionId: q.id,
      selectedOptionId: selectedOptions[q.id] || null,
      answerText: textAnswers[q.id] || null,
    }));

    submitMutation.mutate(answersPayload);
  };

  // Reset to retake
  const handleRetry = () => {
    setResult(null);
    setSelectedOptions({});
    setTextAnswers({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const answeredCount =
    (exercise?.questions || []).filter(
      (q) => selectedOptions[q.id] !== undefined || (textAnswers[q.id] && textAnswers[q.id].trim().length > 0)
    ).length;

  const totalQuestions = exercise?.questions?.length || 0;
  const isReview = exercise?.exerciseType === "REVIEW";

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
          <Link to="/n5/exercises" className="hover:text-slate-900 transition-colors">
            Bài tập N5
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 truncate">
            {exercise?.title || "Chi tiết bài tập"}
          </span>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang tải nội dung bài tập...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-lg mx-auto shadow-xs">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không thể tải bài tập</h3>
            <p className="text-sm text-rose-600 mb-4">
              Đã xảy ra lỗi khi kết nối với server hoặc bài tập không tồn tại.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-rose-600 text-white font-medium rounded-xl text-sm hover:bg-rose-700 transition-colors cursor-pointer"
            >
              Quay lại
            </button>
          </div>
        )}

        {!isLoading && !error && exercise && (
          <div className="space-y-8">
            {/* Header Card */}
            <div
              className={`rounded-3xl p-6 sm:p-8 border shadow-xs ${
                isReview
                  ? "bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-white border-amber-200"
                  : "bg-white border-slate-200/80"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
                    JLPT N5
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isReview
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                    }`}
                  >
                    Thứ tự #{exercise.sortOrder} ({isReview ? "★ TỔNG HỢP REVIEW" : "BÀI HỌC"})
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {exercise.questions?.length || 0} câu hỏi
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FavoriteButton contentType="EXERCISE" contentId={exerciseId} size="md" />
                  <Link
                    to="/n5/exercises"
                    className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors flex items-center space-x-1"
                  >
                    <span>← Danh sách bài tập</span>
                  </Link>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                {exercise.title}
              </h1>
              {exercise.description && (
                <p className="text-sm text-slate-600 leading-relaxed mt-2">
                  {exercise.description}
                </p>
              )}
            </div>

            {/* Score & Result Banner (Show upon submit) */}
            {result && (
              <div
                className={`p-6 sm:p-8 rounded-3xl border shadow-xs transition-all ${
                  result.score >= 80
                    ? "bg-emerald-50/90 border-emerald-300 text-emerald-950"
                    : result.score >= 50
                    ? "bg-amber-50/90 border-amber-300 text-amber-950"
                    : "bg-rose-50/90 border-rose-300 text-rose-950"
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
                          ? "Khá tốt! Hãy đối chiếu kỹ với đáp án chi tiết nhé 👍"
                          : "Cố lên! Bạn hãy xem lại ngữ pháp và luyện tập thêm nhé 💪"}
                      </h2>
                      <p className="text-sm opacity-80 mt-1">
                        Chính xác: {result.correctCount} / {result.totalQuestions} câu (Sai: {result.wrongCount} câu)
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

            {/* Questions Section */}
            {exercise.questions && exercise.questions.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">✏️</span>
                    <h2 className="text-lg font-bold text-slate-900">
                      Danh sách bài tập ({exercise.questions.length} phần)
                    </h2>
                  </div>
                  {!result && (
                    <span className="text-xs font-semibold text-slate-500">
                      Đã làm: {answeredCount} / {totalQuestions}
                    </span>
                  )}
                </div>

                <div className="space-y-8">
                  {exercise.questions.map((question, qIdx) => {
                    const qResult = result?.results.find((r) => r.questionId === question.id);
                    const hasOptions = question.options && question.options.length > 0;
                    const hasImageRequired = question.questionText.includes("[IMAGE_REQUIRED]");

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
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                                  {question.questionType}
                                </span>
                              </div>
                              <h3 className="text-base sm:text-lg font-medium text-slate-900 leading-loose whitespace-pre-line font-sans tracking-wide">
                                {question.questionText}
                              </h3>
                            </div>
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
                              {qResult.isCorrect ? "✓ Đúng" : "✕ Chưa đúng"}
                            </span>
                          )}
                        </div>

                        {/* Image required banner */}
                        {hasImageRequired && (
                          <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-800 text-xs flex items-center space-x-2">
                            <span>📷</span>
                            <span>
                              <strong>Lưu ý:</strong> Câu hỏi có hình ảnh minh họa trong sách gốc Minna no Nihongo (vị trí đã được đánh dấu [IMAGE_REQUIRED]).
                            </span>
                          </div>
                        )}

                        {/* Interactive Options list (if options exist) */}
                        {hasOptions && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                            {question.options.map((option) => {
                              const isSelected = selectedOptions[question.id] === option.id;
                              const isCorrectOption = qResult?.correctOptionId === option.id;
                              const isUserWrongChoice =
                                qResult && !qResult.isCorrect && qResult.selectedOptionId === option.id;

                              let optionClasses =
                                "p-3.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-between cursor-pointer ";

                              if (qResult) {
                                if (isCorrectOption) {
                                  optionClasses +=
                                    "bg-emerald-100/90 border-emerald-400 text-emerald-950 font-bold shadow-xs";
                                } else if (isUserWrongChoice) {
                                  optionClasses +=
                                    "bg-rose-100/80 border-rose-400 text-rose-950 line-through opacity-80";
                                } else {
                                  optionClasses += "bg-white/60 border-slate-200 text-slate-400 opacity-60";
                                }
                              } else {
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
                                    <span>{option.optionText}</span>
                                  </span>

                                  {qResult && isCorrectOption && (
                                    <span className="text-xs font-bold text-emerald-700 bg-emerald-200/70 px-2 py-0.5 rounded-md">
                                      Đáp án đúng
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Interactive Text input for FILL_BLANK questions without fixed options */}
                        {!hasOptions && (
                          <div className="mt-4">
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                              Nhập câu trả lời của bạn:
                            </label>
                            <textarea
                              rows={3}
                              disabled={!!result}
                              value={textAnswers[question.id] || ""}
                              onChange={(e) => handleTextChange(question.id, e.target.value)}
                              placeholder="Nhập câu trả lời hoặc các đáp án bạn điền (ví dụ: 1) は 2) も ...)"
                              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs font-mono"
                            />
                          </div>
                        )}

                        {/* Official explanation / solution revealed AFTER submit */}
                        {qResult && (
                          <div className="mt-4 p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-sm leading-relaxed animate-in fade-in duration-200">
                            <div className="flex items-center space-x-1.5 font-bold mb-1 text-amber-900">
                              <span>💡</span>
                              <span>Đáp án chính thức (Minna no Nihongo 解答):</span>
                            </div>
                            <pre className="whitespace-pre-line font-sans text-slate-800 text-sm bg-white/70 p-3 rounded-lg border border-amber-200/60">
                              {qResult.explanation || qResult.correctAnswerText || "Xem giải thích trong sách."}
                            </pre>
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
                      Hãy hoàn thành các câu hỏi trước khi nộp bài để xem đáp án chi tiết.
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
                      {submitMutation.isPending ? "Đang chấm điểm..." : "Nộp bài và xem đáp án →"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
