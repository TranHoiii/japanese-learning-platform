import { useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { vocabularyApi } from "../services/vocabularyApi";
import { exerciseApi } from "../services/exerciseApi";
import Navbar from "../components/Navbar";
import { SkillTabs } from "../components/learning/SkillTabs";
import { Exercise } from "../types/exercise";

export default function ExercisePage() {
  const { lessonId } = useParams<{ lessonId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [filterType, setFilterType] = useState<"ALL" | "LESSON" | "REVIEW">("ALL");

  const isN4 = location.pathname.startsWith("/n4");
  const levelCode = isN4 ? "N4" : "N5";

  // 1. Get Level
  const { data: levels } = useQuery({
    queryKey: ["levels"],
    queryFn: vocabularyApi.getLevels,
  });

  const currentLevel = levels?.find((l) => l.code === levelCode) || levels?.[0];

  // 2. Get Lessons list for selector
  const { data: lessons } = useQuery({
    queryKey: ["lessons", currentLevel?.id],
    queryFn: () => vocabularyApi.getLessonsByLevel(currentLevel!.id),
    enabled: !!currentLevel,
  });

  const activeLessonId = lessonId ? parseInt(lessonId, 10) : undefined;
  const currentLesson = lessons?.find((l) => l.id === activeLessonId);

  // 3. Get Exercises list (strictly sorted by sort_order ASC from API)
  // Note: Minna no Nihongo merges Lesson 1 & 2 into "Bài 01–02" (lesson_id=1).
  const effectiveQueryLessonId = activeLessonId === 2 ? 1 : activeLessonId;

  const {
    data: allExercises,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exercises", effectiveQueryLessonId],
    queryFn: () =>
      effectiveQueryLessonId
        ? exerciseApi.getExercisesByLesson(effectiveQueryLessonId)
        : exerciseApi.getAllExercises(),
  });

  // Filter exercises according to level when viewing all (N5: lessonId <= 25, N4: lessonId >= 26)
  const exercises = activeLessonId
    ? allExercises
    : allExercises?.filter((ex) => {
        if (isN4) return ex.lessonId >= 26;
        return ex.lessonId <= 25;
      });

  const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetId = e.target.value;
    if (targetId === "all") {
      navigate(`/${isN4 ? "n4" : "n5"}/exercises`);
    } else if (targetId) {
      navigate(`/${isN4 ? "n4" : "n5"}/lessons/${targetId}/exercise`);
    }
  };

  // Filter exercises (strictly preserving sort_order)
  const filteredExercises = exercises?.filter((ex) => {
    if (filterType === "LESSON") return ex.exerciseType === "LESSON";
    if (filterType === "REVIEW") return ex.exerciseType === "REVIEW";
    return true;
  });

  const defaultLessonId = activeLessonId || (lessons && lessons.length > 0 ? lessons[0].id : isN4 ? 26 : 1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-12">
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
          <span className="font-semibold text-slate-900">
            {currentLesson
              ? `${currentLesson.title} - Bài tập`
              : `Danh sách bài tập ${levelCode} theo lộ trình`}
          </span>
        </div>

        {/* Page Header & Control Card */}
        <div className="surface p-6 sm:p-8 mb-8 animate-fade-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isN4
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                    : "bg-rose-50 text-rose-700 border border-rose-200/60"
                }`}>
                  JLPT {levelCode}
                </span>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  {currentLesson ? currentLesson.title : isN4 ? "Lộ trình chính thức (29 bài)" : "Lộ trình chính thức (28 bài)"}
                </span>
                {exercises && (
                  <span className="text-xs text-slate-500 font-medium">
                    ({exercises.length} bài tập)
                  </span>
                )}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentLesson
                  ? `Bài Tập ${levelCode} - ${currentLesson.title}`
                  : `Bài Tập Chuẩn ${levelCode} (Minna no Nihongo)`}
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                {isN4
                  ? "Sắp xếp chuẩn xác theo đúng lộ trình học thực tế: Bài 26–50 cùng các bài Ôn tập tổng hợp định kỳ từ Minna no Nihongo Chuẩn bài tập N4."
                  : "Sắp xếp chuẩn xác theo đúng lộ trình học thực tế: Bài 01–02 gộp chung, sau Bài 08 có Tổng hợp 01–08, sau Bài 17 có Tổng hợp 09–17, sau Bài 25 có Tổng hợp 18–25, và Bài Tổng ôn tập cuối sách 01–25."}
              </p>
            </div>

            {/* Lesson Selector */}
            {lessons && (
              <div className="flex items-center space-x-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Lọc bài học:
                </label>
                <select
                  value={activeLessonId || "all"}
                  onChange={handleLessonChange}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold rounded-xl focus:ring-2 focus:ring-indigo-500 p-2.5 shadow-xs cursor-pointer min-w-[170px]"
                >
                  <option value="all">Tất cả bài tập {isN4 ? "(29 bài)" : "(28 bài)"}</option>
                  {lessons.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.title} (Bài {l.lessonNumber})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Module Switcher Tabs */}
          <SkillTabs active="exercise" levelPrefix={isN4 ? "n4" : "n5"} lessonId={activeLessonId} className="mt-6 pt-6 border-t border-slate-100" />

          {/* Quick Filter: ALL / LESSON / REVIEW */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center space-x-2 overflow-x-auto custom-scrollbar-x pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0 whitespace-nowrap">
              Phân loại:
            </span>
            <button
              onClick={() => setFilterType("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                filterType === "ALL"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Tất cả ({exercises?.length || 0})
            </button>
            <button
              onClick={() => setFilterType("LESSON")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                filterType === "LESSON"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Bài học từng bài ({exercises?.filter((e) => e.exerciseType === "LESSON").length || 0})
            </button>
            <button
              onClick={() => setFilterType("REVIEW")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                filterType === "REVIEW"
                  ? "bg-amber-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Bài Tổng hợp Review ({exercises?.filter((e) => e.exerciseType === "REVIEW").length || 0})
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang tải danh sách bài tập...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-lg mx-auto shadow-xs">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không thể tải danh sách bài tập</h3>
            <p className="text-sm text-rose-600">
              Đã xảy ra lỗi khi kết nối với server. Vui lòng kiểm tra lại.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && (!filteredExercises || filteredExercises.length === 0) && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-xl mx-auto">
            <div className="text-5xl mb-4">✏️</div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Chưa có bài tập nào</h3>
            <p className="text-sm text-slate-500">
              Không tìm thấy bài tập nào phù hợp với bộ lọc hiện tại.
            </p>
          </div>
        )}

        {/* Lesson 2 Notification Banner */}
        {activeLessonId === 2 && (
          <div className="mb-6 p-4 rounded-2xl bg-indigo-50/90 border border-indigo-200/80 text-indigo-950 flex items-start space-x-3 shadow-2xs">
            <span className="text-xl shrink-0 mt-0.5">💡</span>
            <div className="text-sm">
              <p className="font-bold text-indigo-900">Lưu ý giáo trình chuẩn Minna no Nihongo:</p>
              <p className="text-xs text-indigo-700/90 mt-1 leading-relaxed">
                Trong sách bài tập tiêu chuẩn Minna no Nihongo Tập 1, bài tập của Bài 1 và Bài 2 được tích hợp chung thành bài <strong>"Bài 01–02"</strong>. Dưới đây là bài tập dùng chung phục vụ cho cả Bài 1 và Bài 2 để bạn ôn tập trọn vẹn ngữ pháp.
              </p>
            </div>
          </div>
        )}

        {/* Exercises Grid */}
        {!isLoading && !error && filteredExercises && filteredExercises.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise: Exercise) => {
              const isReview = exercise.exerciseType === "REVIEW";

              return (
                <div
                  key={exercise.id}
                  className={`rounded-3xl border shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group ${
                    isReview
                      ? "bg-gradient-to-b from-amber-50/60 to-white border-amber-200/90 hover:border-amber-300"
                      : "bg-white border-slate-200/80 hover:border-indigo-300"
                  }`}
                >
                  <div className="p-6">
                    {/* Header tags */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                            isReview
                              ? "bg-amber-600 text-white"
                              : "bg-indigo-600 text-white"
                          }`}
                        >
                          {exercise.sortOrder}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            isReview
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                          }`}
                        >
                          {isReview ? "★ TỔNG HỢP REVIEW" : "BÀI HỌC"}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-400">
                        {exercise.questionCount} câu hỏi
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-lg font-bold mb-2 transition-colors ${
                        isReview
                          ? "text-amber-950 group-hover:text-amber-700"
                          : "text-slate-900 group-hover:text-indigo-600"
                      }`}
                    >
                      {exercise.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                      {exercise.description || `Luyện tập bài tập tiêu chuẩn theo Minna no Nihongo ${levelCode}.`}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="p-6 pt-0 mt-2 border-t border-slate-100/80">
                    <button
                      onClick={() => navigate(`/exercises/${exercise.id}`)}
                      className={`w-full mt-4 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer ${
                        isReview
                          ? "bg-amber-600 text-white hover:bg-amber-700 shadow-amber-600/20"
                          : "bg-slate-900 text-white hover:bg-indigo-600 shadow-slate-900/10"
                      }`}
                    >
                      <span>Làm bài tập ngay</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
