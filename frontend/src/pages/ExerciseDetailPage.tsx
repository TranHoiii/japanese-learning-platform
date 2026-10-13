import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { exerciseApi } from "../services/exerciseApi";
import { progressApi } from "../services/progressApi";
import { gamification } from "../lib/gamification";
import { ExerciseSubmitResponse } from "../types/exercise";
import Navbar from "../components/Navbar";
import { FavoriteButton } from "../components/favorite/FavoriteButton";
import {
  QuestionRenderer,
  IllustrationInfo,
} from "../components/exercise/QuestionRenderer";
import { ExerciseSubmitBar } from "../components/exercise/ExerciseSubmitBar";
import { ExerciseResultSummary } from "../components/exercise/ExerciseResultSummary";



export default function ExerciseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const exerciseId = id ? parseInt(id, 10) : 0;

  // Selected option IDs mapped by question ID (for multiple choice)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});

  // Blank values mapped by questionId -> { blankId: string }
  const [blankValues, setBlankValues] = useState<Record<number, Record<string, string>>>({});

  // Result state after submit
  const [result, setResult] = useState<ExerciseSubmitResponse | null>(null);

  // Zoom modal image state
  const [modalImage, setModalImage] = useState<IllustrationInfo | null>(null);

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
    mutationFn: (answersPayload: {
      questionId: number;
      selectedOptionId?: number | null;
      answerText?: string | null;
      responses?: { blankId: string; value: string }[];
    }[]) => exerciseApi.submitExercise(exerciseId, { answers: answersPayload }),
    onSuccess: (data) => {
      setResult(data);
      {
        const pct = Math.round(
          data.totalQuestions > 0 ? (data.correctCount / data.totalQuestions) * 100 : 0
        );
        gamification.award(Math.max(5, Math.round(pct / 5)), "Bài tập");
        if (pct >= 80) {
          gamification.celebrate(
            pct === 100 ? "Hoàn hảo! 🎉" : "Làm tốt lắm! 🌸",
            `Bạn đúng ${data.correctCount}/${data.totalQuestions} câu`
          );
        }
      }
      progressApi
        .updateContentProgress({
          contentType: "EXERCISE",
          contentId: exerciseId,
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

  // Handle option select
  const handleSelectOption = (questionId: number, optionId: number) => {
    if (result) return;
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Handle blank value change
  const handleChangeBlank = (questionId: number, blankId: string, value: string) => {
    if (result) return;
    setBlankValues((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [blankId]: value,
      },
    }));
  };

  // Submit exercise
  const handleSubmit = () => {
    if (!exercise || !exercise.questions || exercise.questions.length === 0) return;

    const answersPayload = exercise.questions.map((q) => {
      const qBlanks = blankValues[q.id] || {};
      const responses = Object.entries(qBlanks)
        .filter(([_, val]) => val.trim().length > 0)
        .map(([blankId, value]) => ({
          blankId,
          value: value.trim(),
        }));

      return {
        questionId: q.id,
        selectedOptionId: selectedOptions[q.id] || null,
        answerText: responses.length > 0 ? responses.map((r) => r.value).join(", ") : null,
        responses: responses.length > 0 ? responses : undefined,
      };
    });

    submitMutation.mutate(answersPayload);
  };

  // Reset to retake
  const handleRetry = () => {
    setResult(null);
    setSelectedOptions({});
    setBlankValues({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isQuestionAnswered = (questionId: number) => {
    if (selectedOptions[questionId] !== undefined) return true;
    const qBlanks = blankValues[questionId];
    if (qBlanks && Object.values(qBlanks).some((v) => v.trim().length > 0)) return true;
    return false;
  };

  const answeredCount = (exercise?.questions || []).filter((q) => isQuestionAnswered(q.id)).length;
  const totalQuestions = exercise?.questions?.length || 0;
  const isReview = exercise?.exerciseType === "REVIEW";
  const isN4 = Boolean(exercise && (exercise.sortOrder >= 29 || (exercise.lessonId && exercise.lessonId >= 26)));
  const levelCode = isN4 ? "N4" : "N5";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-40 lg:pb-28">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link to={`/${isN4 ? "n4" : "n5"}/lessons`} className="hover:text-slate-900 transition-colors">
            Bài học {levelCode}
          </Link>
          <span>/</span>
          <Link to={`/${isN4 ? "n4" : "n5"}/exercises`} className="hover:text-slate-900 transition-colors">
            Bài tập {levelCode}
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 truncate">
            {exercise?.title || "Chi tiết bài tập"}
          </span>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4" aria-busy="true">
            <div className="skeleton-shimmer h-40 rounded-3xl" />
            <div className="skeleton-shimmer h-56 rounded-3xl" />
            <div className="skeleton-shimmer h-56 rounded-3xl" />
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
            <div className="hero-ink pattern-seigaiha relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white animate-fade-up">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white border border-white/20">
                    JLPT {levelCode}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      isReview
                        ? "bg-amber-400/90 text-amber-950 border-amber-300"
                        : "bg-white/10 text-white/90 border-white/20"
                    }`}
                  >
                    Thứ tự #{exercise.sortOrder} ({isReview ? "★ TỔNG HỢP REVIEW" : "BÀI HỌC"})
                  </span>
                  <span className="text-xs text-white/70 font-medium">
                    {exercise.questions?.length || 0} bài tập phần
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FavoriteButton contentType="EXERCISE" contentId={exerciseId} size="md" />
                  <Link
                    to={`/${isN4 ? "n4" : "n5"}/exercises`}
                    className="text-sm font-semibold text-white/80 hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <span>← Danh sách bài tập</span>
                  </Link>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                {exercise.title}
              </h1>
              {exercise.description && (
                <p className="text-sm text-white/75 leading-relaxed mt-2">
                  {exercise.description}
                </p>
              )}
              {totalQuestions > 0 && (
                <div className="mt-5">
                  <div className="flex justify-between text-xs font-semibold text-white/80 mb-1.5">
                    <span>Đã trả lời</span>
                    <span>
                      {result ? totalQuestions : answeredCount}/{totalQuestions}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/15 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500 transition-all duration-500"
                      style={{
                        width: `${((result ? totalQuestions : answeredCount) / totalQuestions) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Score & Result Banner (Show upon submit) */}
            {result && (
              <ExerciseResultSummary result={result} onRetry={handleRetry} />
            )}

            {/* Questions Section */}
            {exercise.questions && exercise.questions.length > 0 && (
              <div className="space-y-6">
                {exercise.questions.map((question, qIdx) => {
                  const qResult = result?.results.find((r) => r.questionId === question.id);
                  const illustration: IllustrationInfo | null = question.imageUrl
                    ? {
                        src: question.imageUrl,
                        alt: `Hình minh họa câu ${question.sortOrder}`,
                        caption: `Minh họa ${exercise.title} - Câu ${question.sortOrder}`,
                      }
                    : null;

                  return (
                    <QuestionRenderer
                      key={question.id}
                      question={question}
                      index={qIdx}
                      illustration={illustration}
                      selectedOptionId={selectedOptions[question.id]}
                      blankValues={blankValues[question.id] || {}}
                      result={qResult}
                      disabled={!!result}
                      onSelectOption={(optionId) => handleSelectOption(question.id, optionId)}
                      onChangeBlank={(blankId, val) =>
                        handleChangeBlank(question.id, blankId, val)
                      }
                      onOpenImageModal={(info) => setModalImage(info)}
                    />
                  );
                })}
              </div>
            )}

            {/* Sticky Submit Bar before submitting */}
            {!result && (
              <ExerciseSubmitBar
                totalQuestions={totalQuestions}
                answeredQuestions={answeredCount}
                isPending={submitMutation.isPending}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        )}

        {/* Fullscreen Image Zoom Modal */}
        {modalImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setModalImage(null)}
          >
            <div
              className="relative max-w-4xl w-full animate-pop bg-white rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="text-base font-bold text-slate-800">🖼️ Hình minh họa chi tiết</span>
                  <span className="text-xs text-slate-400 font-medium">(Chuẩn Minna no Nihongo)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setModalImage(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition-colors cursor-pointer"
                  title="Đóng"
                >
                  ✕
                </button>
              </div>

              <div className="w-full flex items-center justify-center bg-slate-50 rounded-2xl p-2 sm:p-4 border border-slate-100">
                <img
                  src={modalImage.src}
                  alt={modalImage.alt}
                  className="max-h-[70vh] w-auto object-contain rounded-xl shadow-xs"
                />
              </div>

              <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <p className="font-semibold text-slate-700">{modalImage.caption}</p>
                <button
                  type="button"
                  onClick={() => setModalImage(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
