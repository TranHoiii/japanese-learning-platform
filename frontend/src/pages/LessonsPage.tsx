import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { vocabularyApi } from "../services/vocabularyApi";
import Navbar from "../components/Navbar";

export default function LessonsPage() {
  const { data: levels, isLoading: isLoadingLevels, error: errorLevels } = useQuery({
    queryKey: ["levels"],
    queryFn: vocabularyApi.getLevels,
  });

  const n5Level = levels?.find((l) => l.code === "N5") || levels?.[0];

  const {
    data: lessons,
    isLoading: isLoadingLessons,
    error: errorLessons,
  } = useQuery({
    queryKey: ["lessons", n5Level?.id],
    queryFn: () => vocabularyApi.getLessonsByLevel(n5Level!.id),
    enabled: !!n5Level,
  });

  const isLoading = isLoadingLevels || isLoadingLessons;
  const error = errorLevels || errorLessons;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-4">
              JLPT N5 • 25 Bài học chuẩn
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Danh Sách Bài Học Từ Vựng N5
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Tổng hợp đầy đủ từ vựng N5 phân theo 25 bài học Minnano Nihongo. Học từ vựng chuẩn Hiragana, Kanji, Hán Việt và Ý nghĩa tiếng Việt.
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang tải danh sách bài học N5...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-2xl text-center max-w-lg mx-auto">
            <div className="text-3xl mb-2">⚠️</div>
            <h3 className="font-bold text-lg mb-1">Không thể tải dữ liệu bài học</h3>
            <p className="text-sm text-rose-600">
              Vui lòng kiểm tra kết nối với Backend API Spring Boot.
            </p>
          </div>
        )}

        {/* Lessons Grid */}
        {!isLoading && !error && lessons && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 font-extrabold text-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-xs">
                      {lesson.lessonNumber < 10 ? `0${lesson.lessonNumber}` : lesson.lessonNumber}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                      Bài {lesson.lessonNumber}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                    {lesson.title}
                  </h2>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {lesson.description || `Từ vựng tiếng Nhật N5 - Bài ${lesson.lessonNumber}`}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Từ vựng N5</span>
                  <Link
                    to={`/n5/lessons/${lesson.id}/vocabulary`}
                    className="inline-flex items-center space-x-1 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <span>Xem từ vựng</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
