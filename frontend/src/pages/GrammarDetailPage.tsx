import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { grammarApi } from "../services/grammarApi";
import { progressApi } from "../services/progressApi";
import Navbar from "../components/Navbar";
import FavoriteButton from "../components/favorite/FavoriteButton";

export default function GrammarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const grammarId = id ? parseInt(id, 10) : null;
  const queryClient = useQueryClient();

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 flex items-center space-x-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link to="/n5/lessons" className="hover:text-slate-900 transition-colors">
            Bài học N5
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Chi tiết ngữ pháp #{id}</span>
        </div>

        {isLoading && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Đang tải chi tiết mẫu ngữ pháp...</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center shadow-xs">
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
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-10 relative">
              <div className="absolute top-6 right-6 flex items-center space-x-3">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    isCompleted
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  }`}
                >
                  {isCompleted
                    ? "✓ Hoàn thành (100%)"
                    : `${currentProgress?.progressPercent || 67}% Đang học`}
                </span>
                <FavoriteButton contentType="GRAMMAR" contentId={grammar.id} size="sm" />
              </div>
              <div className="text-xs uppercase tracking-wider text-indigo-300 font-bold mb-2">
                Mẫu Ngữ Pháp #{grammar.id} • Bài học #{grammar.lessonId}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold jp-font tracking-wide mb-2">
                {grammar.pattern}
              </h1>
              {grammar.meaning && (
                <p className="text-lg text-slate-300 font-medium leading-relaxed">
                  {grammar.meaning}
                </p>
              )}

              {/* Progress 3-step checklist */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-3 text-xs">
                <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                  <span>✓</span>
                  <span>1. Đã mở mẫu câu</span>
                </span>
                <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                  <span>✓</span>
                  <span>2. Đã đọc cấu trúc & ý nghĩa</span>
                </span>
                <span
                  className={`flex items-center space-x-1.5 font-semibold ${
                    currentProgress?.examplesViewed ? "text-emerald-400" : "text-slate-400"
                  }`}
                >
                  <span>{currentProgress?.examplesViewed ? "✓" : "○"}</span>
                  <span>3. Xem ví dụ minh họa</span>
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Structure / Formula */}
              {grammar.usage && (
                <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100">
                  <span className="text-xs font-extrabold text-indigo-700 uppercase tracking-wider block mb-2">
                    📌 CẤU TRÚC
                  </span>
                  <div className="text-xl font-bold text-slate-900 jp-font leading-relaxed whitespace-pre-line">
                    {grammar.usage}
                  </div>
                </div>
              )}

              {/* Meaning */}
              {grammar.meaning && (
                <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-100">
                  <span className="text-xs font-extrabold text-rose-700 uppercase tracking-wider block mb-1">
                    💡 Ý NGHĨA
                  </span>
                  <p className="text-slate-900 font-semibold text-base leading-relaxed">
                    {grammar.meaning}
                  </p>
                </div>
              )}

              {/* Explanation */}
              {grammar.explanation && (
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-2">
                    📝 GIẢI THÍCH & QUY TẮC
                  </span>
                  <div className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line">
                    {grammar.explanation}
                  </div>
                </div>
              )}

              {/* Examples */}
              {grammar.examples && grammar.examples.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                      🌟 VÍ DỤ MINH HỌA ({grammar.examples.length})
                    </span>
                    {!currentProgress?.examplesViewed && (
                      <button
                        onClick={handleMarkExamplesViewed}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-xs flex items-center space-x-1.5"
                      >
                        <span>✓</span>
                        <span>Đã xem & hiểu ví dụ</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {grammar.examples.map((ex, exIdx) => (
                      <div
                        key={ex.id || exIdx}
                        className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {exIdx + 1}
                          </span>
                          <div className="flex-1">
                            <div className="text-lg font-bold text-slate-900 jp-font mb-1">
                              {ex.japanese}
                            </div>
                            {ex.furigana && (
                              <div className="text-xs font-medium text-indigo-600 jp-font mb-1">
                                {ex.furigana}
                              </div>
                            )}
                            <div className="text-sm font-medium text-slate-600 italic">
                              {ex.translation}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mark complete action button */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleMarkExamplesViewed}
                      disabled={currentProgress?.examplesViewed}
                      className={`px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center space-x-2 ${
                        currentProgress?.examplesViewed
                          ? "bg-emerald-100 text-emerald-800 cursor-default"
                          : "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                      }`}
                    >
                      <span>{currentProgress?.examplesViewed ? "✓" : "✨"}</span>
                      <span>
                        {currentProgress?.examplesViewed
                          ? "Đã hoàn thành mẫu ngữ pháp này"
                          : "Xác nhận đã học xong ví dụ (Hoàn thành 100%)"}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Back button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Link
                  to={`/n5/lessons/${grammar.lessonId}/grammar`}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  ← Quay lại ngữ pháp bài học
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
