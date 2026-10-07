import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { vocabularyApi } from "../services/vocabularyApi";
import { readingApi } from "../services/readingApi";
import Navbar from "../components/Navbar";

export default function ReadingPage() {
  const { lessonId } = useParams<{ lessonId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const isN4 = location.pathname.startsWith("/n4");
  const levelCode = isN4 ? "N4" : "N5";

  // 1. Get Level (N4 or N5 based on route)
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

  const activeLessonId = lessonId
    ? parseInt(lessonId, 10)
    : lessons && lessons.length > 0
    ? lessons[0].id
    : null;

  const currentLesson = lessons?.find((l) => l.id === activeLessonId);

  // 3. Get Readings for active lesson
  const {
    data: readings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["readings", activeLessonId],
    queryFn: () => readingApi.getReadingsByLesson(activeLessonId!),
    enabled: !!activeLessonId,
  });

  const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetId = e.target.value;
    if (targetId) {
      navigate(`/${isN4 ? "n4" : "n5"}/lessons/${targetId}/reading`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            {currentLesson ? `${currentLesson.title} - Luyện đọc` : `Bài học ${activeLessonId || ""}`}
          </span>
        </div>

        {/* Page Header & Control Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8">
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
                  {currentLesson ? currentLesson.title : `Bài học ${activeLessonId || ""}`}
                </span>
                {readings && (
                  <span className="text-xs text-slate-500 font-medium">
                    ({readings.length} bài đọc)
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentLesson ? `Đọc Hiểu ${levelCode} - ${currentLesson.title}` : `Đọc Hiểu ${levelCode}`}
              </h1>
            </div>

            {/* Lesson Selector */}
            {lessons && (
              <div className="flex items-center space-x-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Chọn bài học:
                </label>
                <select
                  value={activeLessonId || ""}
                  onChange={handleLessonChange}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold rounded-xl focus:ring-2 focus:ring-indigo-500 p-2.5 shadow-xs cursor-pointer min-w-[140px]"
                >
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
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
            <Link
              to={`/${isN4 ? "n4" : "n5"}/lessons/${activeLessonId}/vocabulary`}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-2"
            >
              <span>📚</span>
              <span>Từ Vựng {levelCode}</span>
            </Link>

            <Link
              to={`/${isN4 ? "n4" : "n5"}/lessons/${activeLessonId}/grammar`}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-2"
            >
              <span>⛩️</span>
              <span>Ngữ Pháp {levelCode}</span>
            </Link>

            <Link
              to={`/${isN4 ? "n4" : "n5"}/lessons/${activeLessonId}/kanji`}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-2"
            >
              <span>🈸</span>
              <span>Kanji {levelCode}</span>
            </Link>

            <Link
              to={`/${isN4 ? "n4" : "n5"}/lessons/${activeLessonId}/listening`}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-2"
            >
              <span>🎧</span>
              <span>Nghe Hiểu {levelCode}</span>
            </Link>

            <Link
              to={`/${isN4 ? "n4" : "n5"}/lessons/${activeLessonId}/reading`}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center space-x-2"
            >
              <span>📖</span>
              <span>Đọc Hiểu {levelCode}</span>
            </Link>

            {!isN4 && (
              <Link
                to={`/n5/lessons/${activeLessonId}/exercise`}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-2"
              >
                <span>✏️</span>
                <span>Bài Tập N5</span>
              </Link>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang tải danh sách bài đọc...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-lg mx-auto shadow-xs">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không thể tải danh sách bài đọc</h3>
            <p className="text-sm text-rose-600">
              Đã xảy ra lỗi khi kết nối với server. Vui lòng thử lại sau.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && (!readings || readings.length === 0) && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-xl mx-auto">
            <div className="text-5xl mb-4">📖</div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Chưa có bài đọc nào</h3>
            <p className="text-sm text-slate-500">
              Nội dung bài đọc cho bài học này đang được chuẩn bị.
            </p>
          </div>
        )}

        {/* Readings Grid */}
        {!isLoading && !error && readings && readings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readings.map((reading) => (
              <div
                key={reading.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image thumbnail if present */}
                  {reading.imageUrl && (
                    <div className="w-full h-44 bg-slate-100 overflow-hidden border-b border-slate-100 relative">
                      <img
                        src={reading.imageUrl}
                        alt={reading.title}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-xs font-semibold px-2.5 py-1 rounded-full text-slate-700 shadow-xs border border-slate-200">
                        Hình ảnh đính kèm
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                        Phần {reading.sortOrder}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {reading.questions?.length || 0} câu hỏi
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {reading.title}
                    </h3>

                    {/* Excerpt text */}
                    <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                      {reading.content}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => navigate(`/readings/${reading.id}`)}
                    className="w-full mt-4 py-2.5 px-4 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-indigo-600 transition-colors flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                  >
                    <span>Luyện đọc ngay</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
