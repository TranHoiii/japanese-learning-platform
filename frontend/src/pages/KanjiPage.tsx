import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { kanjiApi } from "../services/kanjiApi";
import { vocabularyApi } from "../services/vocabularyApi";
import Navbar from "../components/Navbar";

export default function KanjiPage() {
  const { lessonId } = useParams<{ lessonId?: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Get Level N5
  const { data: levels } = useQuery({
    queryKey: ["levels"],
    queryFn: vocabularyApi.getLevels,
  });

  const n5Level = levels?.find((l) => l.code === "N5") || levels?.[0];

  // 2. Get Lessons list for selector
  const { data: lessons } = useQuery({
    queryKey: ["lessons", n5Level?.id],
    queryFn: () => vocabularyApi.getLessonsByLevel(n5Level!.id),
    enabled: !!n5Level,
  });

  const activeLessonId = lessonId
    ? parseInt(lessonId, 10)
    : lessons && lessons.length > 0
    ? lessons[0].id
    : 1;

  const currentLesson = lessons?.find((l) => l.id === activeLessonId);

  // 3. Get Kanjis by Lesson
  const {
    data: kanjis,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["kanjis", activeLessonId],
    queryFn: () => kanjiApi.getKanjisByLessonId(activeLessonId),
    enabled: !!activeLessonId,
  });

  const filteredKanjis = kanjis?.filter((k) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      k.kanji.includes(q) ||
      (k.hanViet && k.hanViet.toLowerCase().includes(q)) ||
      (k.onyomi && k.onyomi.toLowerCase().includes(q)) ||
      (k.kunyomi && k.kunyomi.toLowerCase().includes(q)) ||
      (k.meaning && k.meaning.toLowerCase().includes(q))
    );
  });

  const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetId = e.target.value;
    if (targetId) {
      navigate(`/n5/lessons/${targetId}/kanji`);
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
          <Link to="/n5/lessons" className="hover:text-slate-900 transition-colors">
            Bài học N5
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">
            {currentLesson ? currentLesson.title : `Bài học ${activeLessonId}`}
          </span>
        </div>

        {/* Page Header & Lesson Controls */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
                  JLPT N5
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                  {currentLesson ? currentLesson.title : `Bài học ${activeLessonId}`}
                </span>
                {kanjis && (
                  <span className="text-xs text-slate-500 font-medium">
                    ({kanjis.length} Hán tự Kanji)
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentLesson ? `Kanji N5 - ${currentLesson.title}` : "Hán tự Kanji N5"}
              </h1>
            </div>

            {/* Lesson Selector Dropdown */}
            {lessons && (
              <div className="flex items-center space-x-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Chọn bài học:
                </label>
                <select
                  value={activeLessonId}
                  onChange={handleLessonChange}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 p-2.5 shadow-xs cursor-pointer min-w-[140px]"
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
          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center space-x-2">
            <Link
              to={`/n5/lessons/${activeLessonId}/vocabulary`}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-2"
            >
              <span>📚</span>
              <span>Từ Vựng N5</span>
            </Link>

            <Link
              to={`/n5/lessons/${activeLessonId}/grammar`}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-2"
            >
              <span>⛩️</span>
              <span>Ngữ Pháp N5</span>
            </Link>

            <Link
              to={`/n5/lessons/${activeLessonId}/kanji`}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-500 text-white shadow-md shadow-amber-500/20 transition-all flex items-center space-x-2"
            >
              <span>🈁</span>
              <span>Kanji N5</span>
            </Link>

            <Link
              to={`/n5/lessons/${activeLessonId}/listening`}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-2"
            >
              <span>🎧</span>
              <span>Nghe Hiểu N5</span>
            </Link>

            <Link
              to={`/n5/lessons/${activeLessonId}/reading`}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-2"
            >
              <span>📖</span>
              <span>Đọc Hiểu N5</span>
            </Link>
          </div>

          {/* Search Box */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm Kanji (Chữ, Hán Việt, âm đọc, ý nghĩa)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕ Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang tải danh sách Hán tự Kanji...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-lg mx-auto shadow-xs">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không thể tải dữ liệu Kanji</h3>
            <p className="text-sm text-rose-600">
              Đã xảy ra lỗi khi tải Hán tự Kanji của bài học này. Vui lòng thử lại sau.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredKanjis?.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
            <div className="text-5xl mb-4">🈁</div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              {searchQuery ? "Không tìm thấy Kanji phù hợp" : "Bài học này chưa có dữ liệu Kanji"}
            </h3>
            <p className="text-sm text-slate-500">
              {searchQuery ? "Thử tìm kiếm với chữ Hán, âm Hán Việt hoặc nghĩa khác." : "Vui lòng chọn bài học khác."}
            </p>
          </div>
        )}

        {/* Kanji Cards Grid */}
        {!isLoading && !error && filteredKanjis && filteredKanjis.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredKanjis.map((k, idx) => (
              <Link
                key={k.id}
                to={`/kanjis/${k.id}`}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between group transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 font-extrabold text-xs flex items-center justify-center border border-amber-200/60">
                      {idx + 1}
                    </span>
                    {k.strokeCount && (
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                        {k.strokeCount} nét
                      </span>
                    )}
                  </div>

                  <div className="text-center py-3 my-2 bg-gradient-to-br from-amber-50/50 to-orange-50/30 rounded-2xl border border-amber-100/60">
                    <div className="text-5xl font-black text-slate-900 jp-font group-hover:scale-110 group-hover:text-amber-600 transition-all duration-300">
                      {k.kanji}
                    </div>
                    {k.hanViet && (
                      <div className="mt-2 inline-block px-3 py-1 bg-amber-500 text-white font-extrabold text-xs rounded-full uppercase tracking-wider shadow-xs">
                        {k.hanViet}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    {k.meaning && (
                      <div className="text-slate-800 font-bold text-sm text-center">
                        {k.meaning}
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      {k.onyomi && (
                        <div className="flex items-start text-slate-600">
                          <span className="font-bold text-amber-700 mr-2 shrink-0">On:</span>
                          <span className="jp-font font-semibold text-slate-800">{k.onyomi}</span>
                        </div>
                      )}

                      {k.kunyomi && (
                        <div className="flex items-start text-slate-600">
                          <span className="font-bold text-indigo-600 mr-2 shrink-0">Kun:</span>
                          <span className="jp-font font-semibold text-slate-800">{k.kunyomi}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-600 font-bold group-hover:underline">
                  <span>Chi tiết & Từ ghép</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
