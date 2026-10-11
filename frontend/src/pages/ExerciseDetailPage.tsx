import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { exerciseApi } from "../services/exerciseApi";
import { progressApi } from "../services/progressApi";
import { ExerciseSubmitResponse } from "../types/exercise";
import Navbar from "../components/Navbar";
import { FavoriteButton } from "../components/favorite/FavoriteButton";
import {
  QuestionRenderer,
  IllustrationInfo,
} from "../components/exercise/QuestionRenderer";
import { ExerciseSubmitBar } from "../components/exercise/ExerciseSubmitBar";
import { ExerciseResultSummary } from "../components/exercise/ExerciseResultSummary";

const getQuestionIllustration = (
  sortOrder?: number,
  lessonId?: number,
  qSortOrder?: number
): IllustrationInfo | null => {
  if (!qSortOrder) return null;

  // N4 Lesson 30 Question 2
  if ((sortOrder === 33 || sortOrder === 32 || lessonId === 30) && qSortOrder === 2) {
    return {
      src: "/media/exercise/exercise_n4_l30_q02.png",
      alt: "Hình minh họa bài tập Bài 30 câu 2 (N4)",
      caption: "Minh họa Bài 30 - Câu 2: Trạng thái đồ vật Vてあります (Minna no Nihongo N4)",
    };
  }

  // N5 Illustrations
  if (sortOrder === 1 && qSortOrder === 1) {
    return {
      src: "/media/exercise/exercise_n5_l01_q01.png",
      alt: "Hình minh họa Bài 1-2 Câu 1",
      caption: "Minh họa Bài 01–02 - Câu 1: Nhận diện đồ vật 1〜10 (Minna no Nihongo N5)",
    };
  }
  if (sortOrder === 1 && qSortOrder === 3) {
    return {
      src: "/media/exercise/exercise_n5_l01_q03.png",
      alt: "Hình minh họa Bài 1-2 Câu 3",
      caption: "Minh họa Bài 01–02 - Câu 3: Đại từ chỉ định これ, それ, あれ (Minna no Nihongo N5)",
    };
  }
  if (sortOrder === 2 && qSortOrder === 1) {
    return {
      src: "/media/exercise/exercise_n5_l03_q01.png",
      alt: "Hình minh họa Bài 3 Câu 1",
      caption: "Minh họa Bài 03 - Câu 1: Đồ vật kèm giá tiền Yên ¥ (Minna no Nihongo N5)",
    };
  }
  if (sortOrder === 3 && qSortOrder === 2) {
    return {
      src: "/media/exercise/exercise_n5_l04_q02.png",
      alt: "Hình minh họa Bài 4 Câu 2",
      caption: "Minh họa Bài 04 - Câu 2: Lịch tháng 3 & các thứ trong tuần (Minna no Nihongo N5)",
    };
  }
  if (sortOrder === 3 && qSortOrder === 4) {
    return {
      src: "/media/exercise/exercise_n5_l04_q04.png",
      alt: "Hình minh họa Bài 4 Câu 4",
      caption: "Minh họa Bài 04 - Câu 4: Bảng thời gian làm việc ngân hàng, thư viện, bưu điện (Minna no Nihongo N5)",
    };
  }
  if (sortOrder === 5 && qSortOrder === 4) {
    return {
      src: "/media/exercise/exercise_n5_l06_q04.png",
      alt: "Hình minh họa Bài 6 Câu 4",
      caption: "Minh họa Bài 06 - Câu 4: Tranh 6 hoạt động sinh hoạt trong ngày (Minna no Nihongo N5)",
    };
  }
  if (sortOrder === 10 && qSortOrder === 3) {
    return {
      src: "/media/exercise/exercise_n5_l10_q03.png",
      alt: "Hình minh họa Bài 10 Câu 3",
      caption: "Minh họa Bài 10 - Câu 3: Tranh phòng ngủ và vị trí đồ vật (Minna no Nihongo N5)",
    };
  }
  if (sortOrder === 13 && qSortOrder === 2) {
    return {
      src: "/media/exercise/exercise_n5_l13_q02.png",
      alt: "Hình minh họa Bài 13 Câu 2",
      caption: "Minh họa Bài 13 - Câu 2: Đồ vật mong muốn sở hữu (〜が欲しいです) (Minna no Nihongo N5)",
    };
  }
  if (sortOrder === 13 && qSortOrder === 3) {
    return {
      src: "/media/exercise/exercise_n5_l13_q03.png",
      alt: "Hình minh họa Bài 13 Câu 3",
      caption: "Minh họa Bài 13 - Câu 3: Hành động mong muốn thực hiện (〜たいです) (Minna no Nihongo N5)",
    };
  }
  if (sortOrder === 14 && qSortOrder === 4) {
    return {
      src: "/media/exercise/exercise_n5_l14_q04.png",
      alt: "Hình minh họa Bài 14 Câu 4",
      caption: "Minh họa Bài 14 - Câu 4: Các hành động đang tiếp diễn thể 〜ています (Minna no Nihongo N5)",
    };
  }
  if (sortOrder === 23 && qSortOrder === 1) {
    return {
      src: "/media/exercise/exercise_n5_l22_q01.png",
      alt: "Hình minh họa Bài 22 Câu 1",
      caption: "Minh họa Bài 22 - Câu 1: Đồ vật và mệnh đề định ngữ bổ nghĩa (Minna no Nihongo N5)",
    };
  }
  if (sortOrder === 23 && qSortOrder === 4) {
    return {
      src: "/media/exercise/exercise_n5_l22_q04.png",
      alt: "Hình minh họa Bài 22 Câu 4",
      caption: "Minh họa Bài 22 - Câu 4: Tranh toàn cảnh công viên xác định nhân vật (Minna no Nihongo N5)",
    };
  }
  if (sortOrder === 24 && qSortOrder === 5) {
    return {
      src: "/media/exercise/exercise_n5_l23_q05.png",
      alt: "Hình minh họa Bài 23 Câu 5",
      caption: "Minh họa Bài 23 - Câu 5: Bản đồ chỉ đường và phương hướng tòa nhà (Minna no Nihongo N5)",
    };
  }
  if (sortOrder === 25 && qSortOrder === 2) {
    return {
      src: "/media/exercise/exercise_n5_l24_q02.png",
      alt: "Hình minh họa Bài 24 Câu 2",
      caption: "Minh họa Bài 24 - Câu 2: Hành động cho nhận 〜てもらいました / 〜てくれました (Minna no Nihongo N5)",
    };
  }

  return null;
};

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
  const isN4 = Boolean(exercise && (exercise.sortOrder >= 28 || (exercise.lessonId && exercise.lessonId >= 26)));
  const levelCode = isN4 ? "N4" : "N5";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isN4
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        : "bg-rose-50 text-rose-700 border border-rose-200/60"
                    }`}
                  >
                    JLPT {levelCode}
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
                    {exercise.questions?.length || 0} bài tập phần
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FavoriteButton contentType="EXERCISE" contentId={exerciseId} size="md" />
                  <Link
                    to={`/${isN4 ? "n4" : "n5"}/exercises`}
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
              <ExerciseResultSummary result={result} onRetry={handleRetry} />
            )}

            {/* Questions Section */}
            {exercise.questions && exercise.questions.length > 0 && (
              <div className="space-y-6">
                {exercise.questions.map((question, qIdx) => {
                  const qResult = result?.results.find((r) => r.questionId === question.id);
                  const illustration = getQuestionIllustration(
                    exercise.sortOrder,
                    exercise.lessonId,
                    question.sortOrder
                  );

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setModalImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center max-h-[90vh] overflow-y-auto"
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
