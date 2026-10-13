import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { grammarApi } from "../services/grammarApi";
import { progressApi } from "../services/progressApi";
import Navbar from "../components/Navbar";
import FavoriteButton from "../components/favorite/FavoriteButton";
import { FuriganaText, FuriganaModeControl } from "../components/ui";
import { gamification } from "../lib/gamification";

export default function GrammarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const grammarId = id ? parseInt(id, 10) : null;
  const queryClient = useQueryClient();
  const [hideTranslations, setHideTranslations] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const {
    data: grammar,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["grammar", grammarId],
    queryFn: () => grammarApi.getGrammarById(grammarId!),
    enabled: !!grammarId,
  });

  // Fetch progress for this grammar
  const { data: progressList = [] } = useQuery({
    queryKey: ["progress-content-grammar"],
    queryFn: () => progressApi.getContentProgresses("GRAMMAR"),
  });

  const currentProgress = grammarId
    ? progressList.find((p) => p.contentId === grammarId)
    : undefined;

  // Mutation to update grammar progress
  const updateProgressMutation = useMutation({
    mutationFn: (data: {
      patternOpened?: boolean;
      contentViewed?: boolean;
      examplesViewed?: boolean;
    }) =>
      progressApi.updateContentProgress({
        contentType: "GRAMMAR",
        contentId: grammarId!,
        ...data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress-content-grammar"] });
      queryClient.invalidateQueries({ queryKey: ["progress-summary"] });
      queryClient.invalidateQueries({ queryKey: ["progress-lessons"] });
      queryClient.invalidateQueries({ queryKey: ["progress-content"] });
    },
  });

  // When opening grammar detail page, emit patternOpened and contentViewed
  useEffect(() => {
    if (grammarId && grammar) {
      updateProgressMutation.mutate({
        patternOpened: true,
        contentViewed: true,
      });
    }
  }, [grammarId, grammar?.id]);

  const handleMarkExamplesViewed = () => {
    if (!grammarId) return;
    updateProgressMutation.mutate({
      patternOpened: true,
      contentViewed: true,
      examplesViewed: true,
    });
  };

  const isCompleted =
    currentProgress?.status === "COMPLETED" ||
    (currentProgress?.patternOpened &&
      currentProgress?.contentViewed &&
      currentProgress?.examplesViewed);

  const isN4 = (grammar?.lessonId && grammar.lessonId >= 26) || false;
  const levelPrefix = isN4 ? "n4" : "n5";
  const examplesDone = !!currentProgress?.examplesViewed;
  const stepsDone = 2 + (examplesDone ? 1 : 0);
  const percent = isCompleted ? 100 : Math.round((stepsDone / 3) * 100);
  const steps = [
    { label: "Mở mẫu câu", done: true },
    { label: "Đọc cấu trúc & ý nghĩa", done: true },
    { label: "Xem ví dụ", done: examplesDone },
  ];

  const handleConfirmExamples = () => {
    if (examplesDone) return;
    handleMarkExamplesViewed();
    gamification.celebrate("Hoàn thành mẫu ngữ pháp! 🌸", "Bạn đã nắm xong một mẫu câu mới");
  };

  const toggleReveal = (key: number | string) =>
    setRevealed((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 pb-28 lg:pb-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-900 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link to={`/${levelPrefix}/lessons`} className="hover:text-slate-900 transition-colors">
              {isN4 ? "Bài học N4" : "Bài học N5"}
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">Chi tiết ngữ pháp #{id}</span>
          </div>

          <FuriganaModeControl />
        </div>

        {isLoading && (
          <div className="space-y-4" aria-busy="true">
            <div className="skeleton-shimmer h-56 rounded-3xl" />
            <div className="skeleton-shimmer h-32 rounded-3xl" />
            <div className="skeleton-shimmer h-48 rounded-3xl" />
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center shadow-xs" role="alert">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không tìm thấy mẫu ngữ pháp</h3>
            <p className="text-sm text-rose-600 mb-6">
              Mẫu ngữ pháp với ID #{id} không tồn tại hoặc đã bị xóa.
            </p>
            <Link
              to="/n5/lessons"
              className="inline-flex items-center px-4 py-2 bg-rose-600 text-white font-semibold rounded-xl text-sm"
            >
              Quay lại danh sách bài học
            </Link>
          </div>
        )}

        {!isLoading && !error && grammar && (
          <div className="space-y-6">
            {/* Hero: pattern + meaning + step tracker */}
            <header className="hero-ink pattern-seigaiha relative overflow-hidden rounded-3xl p-6 sm:p-10 text-white animate-fade-up">
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="text-[11px] uppercase tracking-wider text-amber-300 font-bold">
                  Mẫu ngữ pháp #{grammar.id} • Bài {grammar.lessonId}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      isCompleted
                        ? "bg-emerald-400/20 text-emerald-200 border-emerald-300/40"
                        : "bg-amber-400/20 text-amber-200 border-amber-300/40"
                    }`}
                  >
                    {isCompleted ? "✓ Hoàn thành" : `${percent}% đang học`}
                  </span>
                  <FavoriteButton contentType="GRAMMAR" contentId={grammar.id} size="sm" />
                </div>
              </div>

              <h1 className="font-japanese text-3xl sm:text-5xl font-extrabold tracking-wide leading-tight">
                <FuriganaText text={grammar.pattern} />
              </h1>
              {grammar.meaning && (
                <p className="mt-3 text-lg sm:text-xl text-white/85 font-medium leading-relaxed">{grammar.meaning}</p>
              )}

              <ol className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-2.5" aria-label="Các bước học">
                {steps.map((s, i) => (
                  <li
                    key={s.label}
                    className={`flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-xs font-semibold border transition-colors ${
                      s.done
                        ? "bg-emerald-400/15 border-emerald-300/30 text-emerald-100"
                        : "bg-white/5 border-white/15 text-white/60"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 ${
                        s.done ? "bg-emerald-400 text-emerald-950" : "bg-white/15 text-white/70"
                      }`}
                    >
                      {s.done ? "✓" : i + 1}
                    </span>
                    {s.label}
                  </li>
                ))}
              </ol>
            </header>

            {/* Structure */}
            {grammar.usage && (
              <section className="surface p-6 sm:p-7 border-l-4 border-l-indigo-500 animate-fade-up" aria-labelledby="g-structure">
                <h2 id="g-structure" className="text-xs font-extrabold text-indigo-700 uppercase tracking-wider mb-3">
                  📌 Cấu trúc
                </h2>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 font-japanese leading-relaxed whitespace-pre-line">
                  <FuriganaText text={grammar.usage} />
                </div>
              </section>
            )}

            {/* Explanation */}
            {grammar.explanation && (
              <section className="surface p-6 sm:p-7 animate-fade-up" aria-labelledby="g-explain">
                <h2 id="g-explain" className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
                  📝 Giải thích & quy tắc
                </h2>
                <div className="text-[15px] font-medium text-slate-800 leading-[1.8] whitespace-pre-line">
                  {grammar.explanation}
                </div>
              </section>
            )}

            {/* Examples: translation can be hidden to practise recall */}
            {grammar.examples && grammar.examples.length > 0 && (
              <section aria-labelledby="g-examples" className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 id="g-examples" className="font-display text-lg font-extrabold text-slate-900">
                    🌟 Ví dụ minh họa ({grammar.examples.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => setHideTranslations((v) => !v)}
                    aria-pressed={hideTranslations}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                      hideTranslations
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    {hideTranslations ? "🙈 Đang ẩn nghĩa — bấm câu để xem" : "👀 Ẩn nghĩa để tự kiểm tra"}
                  </button>
                </div>

                <ul className="space-y-3 stagger">
                  {grammar.examples.map((ex, exIdx) => {
                    const key = ex.id || exIdx;
                    const shown = !hideTranslations || !!revealed[key];
                    return (
                      <li key={key} className="surface p-5 flex items-start gap-3.5">
                        <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {exIdx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-lg sm:text-xl font-bold text-slate-900 font-japanese leading-normal">
                            <FuriganaText text={ex.japanese} />
                          </div>
                          {ex.furigana && (
                            <div className="text-xs font-medium text-indigo-600 font-japanese mt-1">{ex.furigana}</div>
                          )}
                          {shown ? (
                            <div className="text-sm font-medium text-slate-600 italic mt-2 animate-fade-in">
                              {ex.translation}
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => toggleReveal(key)}
                              className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                            >
                              Hiện nghĩa tiếng Việt
                            </button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {/* Completion + navigation */}
            <div className="surface p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleConfirmExamples}
                disabled={examplesDone}
                className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  examplesDone
                    ? "bg-emerald-100 text-emerald-800 cursor-default"
                    : "btn-press bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer [--press-edge:#047857]"
                }`}
              >
                <span aria-hidden="true">{examplesDone ? "✓" : "✨"}</span>
                {examplesDone ? "Đã hoàn thành mẫu ngữ pháp này" : "Tôi đã hiểu các ví dụ"}
              </button>

              <Link
                to={`/${levelPrefix}/lessons/${grammar.lessonId}/grammar`}
                className="w-full sm:w-auto text-center px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-sm font-semibold transition-colors"
              >
                ← Quay lại ngữ pháp bài học
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
