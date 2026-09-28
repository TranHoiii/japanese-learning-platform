import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { vocabularyApi } from "../services/vocabularyApi";
import { Vocabulary } from "../types/vocabulary";
import Navbar from "../components/Navbar";
import VocabularyDetailModal from "../components/VocabularyDetailModal";

export default function VocabularyPage() {
  const { lessonId } = useParams<{ lessonId?: string }>();
  const navigate = useNavigate();

  const [selectedVocab, setSelectedVocab] = useState<Vocabulary | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
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
    : null;

  // 3. Get Lesson info
  const currentLesson = lessons?.find((l) => l.id === activeLessonId);

  // 4. Get Vocabularies by Lesson
  const {
    data: vocabularies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vocabularies", activeLessonId],
    queryFn: () => vocabularyApi.getVocabulariesByLesson(activeLessonId!),
    enabled: !!activeLessonId,
  });

  // Client filter if user types in search box
  const filteredVocabularies = useMemo(() => {
    if (!vocabularies) return [];
    if (!searchQuery.trim()) return vocabularies;

    const q = searchQuery.toLowerCase().trim();
    return vocabularies.filter(
      (v) =>
        v.hiragana.toLowerCase().includes(q) ||
        (v.kanji && v.kanji.toLowerCase().includes(q)) ||
        (v.hanViet && v.hanViet.toLowerCase().includes(q)) ||
        v.meaning.toLowerCase().includes(q)
    );
  }, [vocabularies, searchQuery]);

  const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetId = e.target.value;
    if (targetId) {
      navigate(`/n5/lessons/${targetId}/vocabulary`);
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
            {currentLesson ? currentLesson.title : `Bài học ${activeLessonId || ""}`}
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
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  {currentLesson ? currentLesson.title : `Bài học ${activeLessonId || ""}`}
                </span>
                {vocabularies && (
                  <span className="text-xs text-slate-500 font-medium">
                    ({vocabularies.length} từ vựng)
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentLesson ? `Từ vựng N5 - ${currentLesson.title}` : "Từ vựng N5"}
              </h1>
            </div>

            {/* Lesson Selector Dropdown */}
            {lessons && (
              <div className="flex items-center space-x-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  Chọn bài học:
                </label>
                <select
                  value={activeLessonId || ""}
                  onChange={handleLessonChange}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2.5 shadow-xs cursor-pointer min-w-[140px]"
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

          {/* Module Switcher Tabs (Vocabulary vs Grammar) */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center space-x-2">
            <Link
              to={`/n5/lessons/${activeLessonId}/vocabulary`}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center space-x-2"
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
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-2"
            >
              <span>🈁</span>
              <span>Kanji N5</span>
            </Link>
          </div>

          {/* Search Box & View Mode Toggle */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm từ vựng (Hiragana, Kanji, Hán Việt, Ý nghĩa)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
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

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 self-end sm:self-auto">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  viewMode === "table"
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>📊</span>
                <span>Dạng Bảng</span>
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  viewMode === "card"
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>🎴</span>
                <span>Dạng Thẻ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang tải từ vựng...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-lg mx-auto shadow-xs">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không thể tải dữ liệu từ vựng</h3>
            <p className="text-sm text-rose-600">
              Đã xảy ra lỗi khi tải từ vựng của bài học này. Vui lòng thử lại sau.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredVocabularies.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              {searchQuery ? "Không tìm thấy từ vựng khớp với từ khóa" : "Chưa có từ vựng cho bài học này"}
            </h3>
            <p className="text-sm text-slate-500">
              {searchQuery ? "Thử tìm với từ khóa khác như Hiragana, Kanji hoặc Tiếng Việt." : "Vui lòng chọn bài học khác."}
            </p>
          </div>
        )}

        {/* Content Display */}
        {!isLoading && !error && filteredVocabularies.length > 0 && (
          <>
            {/* TABLE VIEW */}
            {viewMode === "table" && (
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[640px]">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-4 px-6 w-16 text-center">#</th>
                        <th className="py-4 px-6">Hiragana</th>
                        <th className="py-4 px-6">Kanji</th>
                        <th className="py-4 px-6">Hán Việt</th>
                        <th className="py-4 px-6">Ý Nghĩa</th>
                        <th className="py-4 px-6 text-center w-24">Âm Thanh</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800 text-sm font-medium">
                      {filteredVocabularies.map((vocab, index) => (
                        <tr
                          key={vocab.id}
                          onClick={() => setSelectedVocab(vocab)}
                          className="hover:bg-indigo-50/40 transition-colors cursor-pointer group"
                        >
                          <td className="py-4 px-6 text-center text-xs font-semibold text-slate-400 group-hover:text-indigo-600">
                            {index + 1}
                          </td>
                          <td className="py-4 px-6 font-bold text-slate-900 jp-font text-base group-hover:text-indigo-600 transition-colors">
                            {vocab.hiragana}
                          </td>
                          <td className="py-4 px-6 text-slate-800 kanji-text text-base">
                            {vocab.kanji ? (
                              <span className="font-semibold text-slate-900">{vocab.kanji}</span>
                            ) : (
                              <span className="text-slate-300 font-normal italic">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            {vocab.hanViet ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                {vocab.hanViet}
                              </span>
                            ) : (
                              <span className="text-slate-300 font-normal italic">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-slate-700 leading-relaxed font-normal">
                            {vocab.meaning}
                          </td>
                          <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                            <button
                              disabled
                              className="w-8 h-8 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center text-xs cursor-not-allowed mx-auto hover:bg-slate-100"
                              title="Chưa có file âm thanh"
                            >
                              🔊
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CARD VIEW */}
            {viewMode === "card" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVocabularies.map((vocab, index) => (
                  <div
                    key={vocab.id}
                    onClick={() => setSelectedVocab(vocab)}
                    className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                          #{index + 1}
                        </span>
                        {vocab.hanViet && (
                          <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                            {vocab.hanViet}
                          </span>
                        )}
                      </div>

                      <div className="mb-4">
                        <h3 className="text-2xl font-extrabold text-slate-900 jp-font group-hover:text-indigo-600 transition-colors">
                          {vocab.hiragana}
                        </h3>
                        {vocab.kanji && (
                          <div className="text-lg font-medium text-slate-600 kanji-text mt-0.5">
                            {vocab.kanji}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-sm font-medium text-slate-700 leading-relaxed mb-3">
                        {vocab.meaning}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-indigo-600 font-semibold group-hover:underline">
                          Xem chi tiết →
                        </span>
                        <button
                          disabled
                          className="text-xs text-slate-300 p-1.5 rounded-md cursor-not-allowed"
                          title="Chưa có file âm thanh"
                          onClick={(e) => e.stopPropagation()}
                        >
                          🔊
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Vocabulary Detail Modal */}
      <VocabularyDetailModal
        vocabulary={selectedVocab}
        onClose={() => setSelectedVocab(null)}
      />
    </div>
  );
}
