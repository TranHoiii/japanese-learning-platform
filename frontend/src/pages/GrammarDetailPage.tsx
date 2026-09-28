import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { grammarApi } from "../services/grammarApi";
import Navbar from "../components/Navbar";

export default function GrammarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const grammarId = id ? parseInt(id, 10) : null;

  const {
    data: grammar,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["grammar", grammarId],
    queryFn: () => grammarApi.getGrammarById(grammarId!),
    enabled: !!grammarId,
  });

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
                    📝 GIẢI THÍCH & QUA TẮC
                  </span>
                  <div className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line">
                    {grammar.explanation}
                  </div>
                </div>
              )}

              {/* Examples */}
              {grammar.examples && grammar.examples.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-4">
                    🌟 VÍ DỤ MINH HỌA ({grammar.examples.length})
                  </span>

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
