import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { vocabularyApi } from "../services/vocabularyApi";
import { grammarApi } from "../services/grammarApi";
import { Grammar } from "../types/grammar";
import Navbar from "../components/Navbar";

export default function GrammarPage() {
  const { lessonId } = useParams<{ lessonId?: string }>();
  const navigate = useNavigate();

  const [expandedId, setExpandedId] = useState<number | null>(null);

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

  const currentLesson = lessons?.find((l) => l.id === activeLessonId);

  // 3. Get Grammars for active lesson
  const {
    data: grammars,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["grammars", activeLessonId],
    queryFn: () => grammarApi.getGrammarsByLesson(activeLessonId!),
    enabled: !!activeLessonId,
  });

  const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetId = e.target.value;
    if (targetId) {
      navigate(`/n5/lessons/${targetId}/grammar`);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
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
            {currentLesson ? `${currentLesson.title} - Ngữ pháp` : `Bài học ${activeLessonId || ""}`}
          </span>
        </div>

        {/* Page Header & Control Card */}
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
                {grammars && (
                  <span className="text-xs text-slate-500 font-medium">
                    ({grammars.length} mẫu ngữ pháp)
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentLesson ? `Ngữ Pháp N5 - ${currentLesson.title}` : "Ngữ Pháp N5"}
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

          {/* Module Switcher Tabs (Vocabulary vs Grammar) */}
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
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center space-x-2"
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
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Đang tải dữ liệu ngữ pháp...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-lg mx-auto shadow-xs">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không thể tải dữ liệu ngữ pháp</h3>
            <p className="text-sm text-rose-600">
              Đã xảy ra lỗi khi kết nối với server. Vui lòng thử lại sau.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && grammars && grammars.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
            <div className="text-5xl mb-4">⛩️</div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              Chưa có ngữ pháp cho bài học này
            </h3>
            <p className="text-sm text-slate-500">
              Vui lòng chọn bài học khác từ danh sách.
            </p>
          </div>
        )}

        {/* Grammar List */}
        {!isLoading && !error && grammars && grammars.length > 0 && (
          <div className="space-y-6">
            {grammars.map((grammar, index) => (
              <GrammarCard
                key={grammar.id}
                grammar={grammar}
                index={index + 1}
                isExpanded={expandedId === grammar.id || expandedId === null}
                onToggle={() => toggleExpand(grammar.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

interface GrammarCardProps {
  grammar: Grammar;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function GrammarCard({ grammar, index, isExpanded, onToggle }: GrammarCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden">
      {/* Header Bar */}
      <div
        onClick={onToggle}
        className="p-6 cursor-pointer flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white select-none"
      >
        <div className="flex items-center space-x-4">
          <span className="w-9 h-9 rounded-xl bg-white/10 text-white font-extrabold text-sm flex items-center justify-center border border-white/20">
            {index}
          </span>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold jp-font tracking-wide">
              {grammar.pattern}
            </h3>
            {grammar.meaning && (
              <p className="text-slate-300 text-sm font-medium mt-0.5">
                {grammar.meaning}
              </p>
            )}
          </div>
        </div>

        <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm transition-transform">
          {isExpanded ? "▲" : "▼"}
        </button>
      </div>

      {/* Card Content Body */}
      {isExpanded && (
        <div className="p-6 sm:p-8 space-y-6">
          {/* CẤU TRÚC / USAGE */}
          {grammar.usage && (
            <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100">
              <span className="text-xs font-extrabold text-indigo-700 uppercase tracking-wider block mb-2">
                📌 CẤU TRÚC
              </span>
              <div className="text-lg font-bold text-slate-900 jp-font leading-relaxed whitespace-pre-line">
                {grammar.usage}
              </div>
            </div>
          )}

          {/* Ý NGHĨA / MEANING */}
          {grammar.meaning && (
            <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-100">
              <span className="text-xs font-extrabold text-rose-700 uppercase tracking-wider block mb-1">
                💡 Ý NGHĨA
              </span>
              <p className="text-base font-semibold text-slate-900 leading-relaxed">
                {grammar.meaning}
              </p>
            </div>
          )}

          {/* GIẢI THÍCH / EXPLANATION */}
          {grammar.explanation && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-2">
                📝 GIẢI THÍCH & NGUYÊN TẮC
              </span>
              <div className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line space-y-1">
                {grammar.explanation}
              </div>
            </div>
          )}

          {/* VÍ DỤ / EXAMPLES */}
          {grammar.examples && grammar.examples.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-4">
                🌟 VÍ DỤ (EXAMPLES)
              </span>

              <div className="space-y-4">
                {grammar.examples.map((ex, exIdx) => (
                  <div
                    key={ex.id || exIdx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-start space-x-3 mb-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {exIdx + 1}
                      </span>
                      <div className="flex-1">
                        {/* Japanese Example Text */}
                        <div className="text-lg font-bold text-slate-900 jp-font leading-normal mb-1">
                          {ex.japanese}
                        </div>

                        {/* Furigana line if available */}
                        {ex.furigana && (
                          <div className="text-xs font-medium text-indigo-600 jp-font mb-1">
                            {ex.furigana}
                          </div>
                        )}

                        {/* Vietnamese Translation */}
                        <div className="text-sm font-medium text-slate-600 italic">
                          {ex.translation}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
