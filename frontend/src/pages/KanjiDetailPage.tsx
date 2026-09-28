import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { kanjiApi } from "../services/kanjiApi";
import Navbar from "../components/Navbar";

export default function KanjiDetailPage() {
  const { id } = useParams<{ id: string }>();
  const kanjiId = id ? parseInt(id, 10) : null;

  const {
    data: kanji,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["kanji", kanjiId],
    queryFn: () => kanjiApi.getKanjiById(kanjiId!),
    enabled: !!kanjiId,
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
          <span className="font-semibold text-slate-900">Chi tiết Hán tự Kanji #{id}</span>
        </div>

        {isLoading && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Đang tải chi tiết Hán tự Kanji...</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center shadow-xs">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không tìm thấy Kanji</h3>
            <p className="text-sm text-rose-600 mb-6">
              Hán tự Kanji với ID #{id} không tồn tại hoặc đã bị xóa.
            </p>
            <Link
              to="/n5/lessons"
              className="inline-flex items-center px-4 py-2 bg-amber-600 text-white font-semibold rounded-xl text-sm"
            >
              Quay lại danh sách bài học
            </Link>
          </div>
        )}

        {!isLoading && !error && kanji && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white p-8 sm:p-10 relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                    Kanji N5 #{kanji.id}
                  </span>
                  {kanji.strokeCount && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/40">
                      {kanji.strokeCount} nét vẽ
                    </span>
                  )}
                </div>

                <div className="flex items-baseline space-x-4">
                  <h1 className="text-6xl font-black jp-font tracking-wide text-amber-400">
                    {kanji.kanji}
                  </h1>
                  {kanji.hanViet && (
                    <span className="text-2xl font-extrabold text-white uppercase tracking-wider">
                      {kanji.hanViet}
                    </span>
                  )}
                </div>

                {kanji.meaning && (
                  <p className="text-lg text-slate-300 font-medium leading-relaxed mt-2">
                    Nghĩa: {kanji.meaning}
                  </p>
                )}
              </div>

              {/* Stroke Order SVG */}
              {kanji.strokeOrderUrl && (
                <div className="bg-white/10 p-3 rounded-2xl border border-white/20 backdrop-blur-xs text-center shrink-0 self-center">
                  <img
                    src={kanji.strokeOrderUrl}
                    alt={`Thứ tự nét của ${kanji.kanji}`}
                    className="w-24 h-24 filter invert brightness-200"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <span className="text-[10px] font-bold text-amber-300 block mt-1">THỨ TỰ NÉT VẼ</span>
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Readings Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kanji.onyomi && (
                  <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/60">
                    <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block mb-1">
                      🔊 ÂM ONYOMI (Âm Hán Nhật)
                    </span>
                    <div className="text-xl font-bold text-slate-900 jp-font">
                      {kanji.onyomi}
                    </div>
                  </div>
                )}

                {kanji.kunyomi && (
                  <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-200/60">
                    <span className="text-xs font-extrabold text-indigo-800 uppercase tracking-wider block mb-1">
                      🗣️ ÂM KUNYOMI (Âm thuần Nhật)
                    </span>
                    <div className="text-xl font-bold text-slate-900 jp-font">
                      {kanji.kunyomi}
                    </div>
                  </div>
                )}
              </div>

              {/* Mnemonic / Memory Hint */}
              {kanji.mnemonic && (
                <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/60">
                  <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block mb-2">
                    💡 MẸO NHỚ GHI NHỚ HÁN TỰ
                  </span>
                  <div className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line">
                    {kanji.mnemonic}
                  </div>
                </div>
              )}

              {/* Compounds List */}
              {kanji.compounds && kanji.compounds.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-4">
                    🌟 TỪ GHÉP & VÍ DỤ MINH HỌA ({kanji.compounds.length})
                  </span>

                  <div className="space-y-4">
                    {kanji.compounds.map((cmp, idx) => (
                      <div
                        key={cmp.id || idx}
                        className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-amber-300 transition-all"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-baseline space-x-3 mb-1">
                              <span className="text-xl font-extrabold text-slate-900 jp-font">
                                {cmp.word}
                              </span>
                              <span className="text-sm font-bold text-indigo-600 jp-font">
                                【{cmp.reading}】
                              </span>
                            </div>

                            <p className="text-sm font-semibold text-slate-800 mb-2">
                              {cmp.meaning}
                            </p>

                            {cmp.exampleSentence && (
                              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-medium text-slate-600">
                                <span className="font-bold text-slate-400 mr-1">Ví dụ:</span>
                                <span className="jp-font font-semibold text-slate-800">{cmp.exampleSentence}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Back Button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => window.history.back()}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  ← Quay lại
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
