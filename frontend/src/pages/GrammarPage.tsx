import React, { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vocabularyApi } from "../services/vocabularyApi";
import { grammarApi } from "../services/grammarApi";
import { progressApi } from "../services/progressApi";
import { Grammar } from "../types/grammar";
import { ContentProgressResponse } from "../types/progress";
import Navbar from "../components/Navbar";
import { FuriganaText, FuriganaModeControl } from "../components/ui";

export default function GrammarPage() {
  const { lessonId } = useParams<{ lessonId?: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  // 4. Get Grammar Progresses
  const { data: grammarProgressList = [], refetch: refetchProgress } = useQuery({
    queryKey: ["progress-content-grammar"],
    queryFn: () => progressApi.getContentProgresses("GRAMMAR"),
  });

  const progressMap = useMemo(() => {
    const map = new Map<number, ContentProgressResponse>();
    grammarProgressList.forEach((p) => {
      map.set(p.contentId, p);
    });
    return map;
  }, [grammarProgressList]);

  // Mutation to update grammar progress
  const updateProgressMutation = useMutation({
    mutationFn: (data: {
      contentId: number;
      patternOpened?: boolean;
      contentViewed?: boolean;
      examplesViewed?: boolean;
    }) =>
      progressApi.updateContentProgress({
        contentType: "GRAMMAR",
        contentId: data.contentId,
        patternOpened: data.patternOpened,
        contentViewed: data.contentViewed,
        examplesViewed: data.examplesViewed,
      }),
    onSuccess: () => {
      refetchProgress();
      queryClient.invalidateQueries({ queryKey: ["progress-content-grammar"] });
      queryClient.invalidateQueries({ queryKey: ["progress-summary"] });
      queryClient.invalidateQueries({ queryKey: ["progress-lessons"] });
      queryClient.invalidateQueries({ queryKey: ["progress-content"] });
    },
  });

  const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetId = e.target.value;
    if (targetId) {
      navigate(`/n5/lessons/${targetId}/grammar`);
    }
  };

  const toggleExpand = (id: number) => {
    const isExpanding = expandedId !== id;
    setExpandedId((prev) => (prev === id ? null : id));
    if (isExpanding) {
      // Mark patternOpened = true
      updateProgressMutation.mutate({
        contentId: id,
        patternOpened: true,
      });
    }
  };

  const handleMarkContent = (contentId: number) => {
    updateProgressMutation.mutate({
      contentId,
      patternOpened: true,
      contentViewed: true,
    });
  };

  const handleMarkExamples = (contentId: number) => {
    updateProgressMutation.mutate({
      contentId,
      patternOpened: true,
      examplesViewed: true,
    });
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

            {/* Controls: Furigana Mode + Lesson Selector */}
            <div className="flex flex-wrap items-center gap-3">
              <FuriganaModeControl />

              {lessons && (
                <div className="flex items-center space-x-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap hidden sm:inline">
                    Bài học:
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

            <Link
              to={`/n5/lessons/${activeLessonId}/exercise`}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-2"
            >
              <span>✏️</span>
              <span>Bài Tập N5</span>
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
            {grammars.map((grammar, index) => {
              const progress = progressMap.get(grammar.id);
              return (
                <GrammarCard
                  key={grammar.id}
                  grammar={grammar}
                  index={index + 1}
                  progress={progress}
                  isExpanded={expandedId === grammar.id}
                  onToggle={() => toggleExpand(grammar.id)}
                  onMarkContent={() => handleMarkContent(grammar.id)}
                  onMarkExamples={() => handleMarkExamples(grammar.id)}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

interface GrammarCardProps {
  grammar: Grammar;
  index: number;
  progress?: ContentProgressResponse;
  isExpanded: boolean;
  onToggle: () => void;
  onMarkContent: () => void;
  onMarkExamples: () => void;
}

function GrammarCard({
  grammar,
  index,
  progress,
  isExpanded,
  onToggle,
  onMarkContent,
  onMarkExamples,
}: GrammarCardProps) {
  const isCompleted =
    progress?.status === "COMPLETED" ||
    (progress?.patternOpened && progress?.contentViewed && progress?.examplesViewed);

  const progPercent = progress?.progressPercent || 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
      {/* Header Bar */}
      <div
        onClick={onToggle}
        className={`p-6 cursor-pointer flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white select-none rounded-t-3xl ${
          !isExpanded ? "rounded-b-3xl" : ""
        }`}
      >
        <div className="flex items-center space-x-4">
          <span className="w-9 h-9 rounded-xl bg-white/10 text-white font-extrabold text-sm flex items-center justify-center border border-white/20">
            {index}
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl sm:text-2xl font-bold jp-font tracking-wide">
                <FuriganaText text={grammar.pattern} />
              </h3>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isCompleted
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : progPercent > 0
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-white/10 text-slate-300 border border-white/15"
                }`}
              >
                {isCompleted ? "✓ Hoàn thành" : progPercent > 0 ? `${progPercent}%` : "Chưa học"}
              </span>
            </div>
            {grammar.meaning && (
              <p className="text-slate-300 text-sm font-medium mt-0.5">
                {grammar.meaning}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to={`/grammar/${grammar.id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
          >
            Chi tiết &rarr;
          </Link>
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm transition-transform">
            {isExpanded ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      {isExpanded && (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Progress 3-step checklist indicator */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="flex items-center space-x-1.5 text-emerald-600 font-semibold">
              <span>✓</span>
              <span>1. Đã mở mẫu câu</span>
            </span>

            <span
              className={`flex items-center space-x-1.5 font-semibold ${
                progress?.contentViewed ? "text-emerald-600" : "text-slate-500"
              }`}
            >
              <span>{progress?.contentViewed ? "✓" : "○"}</span>
              <span>2. Lý thuyết cấu trúc</span>
            </span>

            <span
              className={`flex items-center space-x-1.5 font-semibold ${
                progress?.examplesViewed ? "text-emerald-600" : "text-slate-500"
              }`}
            >
              <span>{progress?.examplesViewed ? "✓" : "○"}</span>
              <span>3. Ví dụ minh họa</span>
            </span>

            <div className="flex items-center space-x-2 ml-auto">
              {!progress?.contentViewed && (
                <button
                  onClick={onMarkContent}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
                >
                  ✓ Đã đọc lý thuyết
                </button>
              )}
              {!progress?.examplesViewed && (
                <button
                  onClick={onMarkExamples}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
                >
                  ✓ Đã xem ví dụ
                </button>
              )}
            </div>
          </div>

          {/* CẤU TRÚC / USAGE */}
          {grammar.usage && (
            <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100">
              <span className="text-xs font-extrabold text-indigo-700 uppercase tracking-wider block mb-2">
                📌 CẤU TRÚC
              </span>
              <div className="text-lg font-bold text-slate-900 jp-font leading-relaxed whitespace-pre-line">
                <FuriganaText text={grammar.usage} />
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
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  🌟 VÍ DỤ (EXAMPLES)
                </span>
                {!progress?.examplesViewed && (
                  <button
                    onClick={onMarkExamples}
                    className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                  >
                    ✓ Đã học xong ví dụ
                  </button>
                )}
              </div>

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
                          <FuriganaText text={ex.japanese} />
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
