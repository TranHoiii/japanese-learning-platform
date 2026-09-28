import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { vocabularyApi } from "../services/vocabularyApi";
import Navbar from "../components/Navbar";

export default function VocabularyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const vocabId = id ? parseInt(id, 10) : null;

  const {
    data: vocabulary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vocabulary", vocabId],
    queryFn: () => vocabularyApi.getVocabularyById(vocabId!),
    enabled: !!vocabId,
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 flex items-center space-x-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link to="/n5/lessons" className="hover:text-slate-900 transition-colors">
            Bài học N5
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Chi tiết từ vựng #{id}</span>
        </div>

        {isLoading && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Đang tải thông tin từ vựng...</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center shadow-xs">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không tìm thấy từ vựng</h3>
            <p className="text-sm text-rose-600 mb-6">
              Từ vựng với ID #{id} không tồn tại hoặc đã bị xóa.
            </p>
            <Link
              to="/n5/lessons"
              className="inline-flex items-center px-4 py-2 bg-rose-600 text-white font-semibold rounded-xl text-sm"
            >
              Quay lại danh sách bài học
            </Link>
          </div>
        )}

        {!isLoading && !error && vocabulary && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-10 relative">
              <div className="text-xs uppercase tracking-wider text-indigo-300 font-bold mb-2">
                Từ vựng #{vocabulary.id} • Bài học #{vocabulary.lessonId}
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold jp-font mb-2">
                {vocabulary.hiragana}
              </h1>
              {vocabulary.kanji && (
                <div className="text-2xl text-slate-300 kanji-text font-medium">
                  {vocabulary.kanji}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Hiragana */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  HIRAGANA
                </span>
                <span className="text-2xl font-bold text-slate-900 jp-font">
                  {vocabulary.hiragana}
                </span>
              </div>

              {/* Kanji & Han Viet Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    KANJI
                  </span>
                  <span className="text-xl font-bold text-slate-800 kanji-text">
                    {vocabulary.kanji || <span className="text-slate-400 font-normal italic">[Trống]</span>}
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    HÁN VIỆT
                  </span>
                  <span className="text-xl font-bold text-indigo-600">
                    {vocabulary.hanViet || <span className="text-slate-400 font-normal italic">[Trống]</span>}
                  </span>
                </div>
              </div>

              {/* Meaning */}
              <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/50">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
                  Ý NGHĨA
                </span>
                <p className="text-slate-900 font-semibold text-lg leading-relaxed">
                  {vocabulary.meaning}
                </p>
              </div>

              {/* Audio & Extra */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-400 font-medium text-xs flex items-center space-x-2 cursor-not-allowed border border-slate-200/60"
                  title="Chưa có file âm thanh"
                >
                  <span>🔊</span>
                  <span>Âm thanh (Chưa có)</span>
                </button>

                <Link
                  to={`/n5/lessons/${vocabulary.lessonId}/vocabulary`}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  ← Quay lại bài học
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
