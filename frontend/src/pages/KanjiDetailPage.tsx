import { useEffect } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { kanjiApi } from "../services/kanjiApi";
import { progressApi } from "../services/progressApi";
import Navbar from "../components/Navbar";
import FavoriteButton from "../components/favorite/FavoriteButton";
import StrokeOrderAnimator from "../components/kanji/StrokeOrderAnimator";

export default function KanjiDetailPage() {
  const { id } = useParams<{ id: string }>();
  const kanjiId = id ? parseInt(id, 10) : null;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const {
    data: kanji,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["kanji", kanjiId],
    queryFn: () => kanjiApi.getKanjiById(kanjiId!),
    enabled: !!kanjiId,
  });

  const queryLessonId = searchParams.get("lessonId") ? parseInt(searchParams.get("lessonId")!, 10) : null;
  const currentLessonId = queryLessonId || kanji?.lessonId || null;

  const { data: lessonKanjis } = useQuery({
    queryKey: ["kanjis", currentLessonId],
    queryFn: () => kanjiApi.getKanjisByLessonId(currentLessonId!),
    enabled: !!currentLessonId,
  });

  const currentIndex = lessonKanjis && kanjiId
    ? lessonKanjis.findIndex((k) => k.id === kanjiId)
    : -1;
  const prevKanji = currentIndex > 0 && lessonKanjis ? lessonKanjis[currentIndex - 1] : null;
  const nextKanji =
    currentIndex >= 0 && lessonKanjis && currentIndex < lessonKanjis.length - 1
      ? lessonKanjis[currentIndex + 1]
      : null;

  const isN4 = kanji?.levelCode === "N4" || (kanji?.lessonNumber ? kanji.lessonNumber >= 26 : false);
  const levelCode = isN4 ? "N4" : "N5";
  const lessonPath = currentLessonId
    ? `/${isN4 ? "n4" : "n5"}/lessons/${currentLessonId}/kanji`
    : isN4 ? "/n4/lessons" : "/n5/lessons";

  const handlePrev = () => {
    if (prevKanji) {
      navigate(`/kanjis/${prevKanji.id}${currentLessonId ? `?lessonId=${currentLessonId}` : ""}`);
    } else {
      navigate(lessonPath);
    }
  };

  const handleNext = () => {
    if (nextKanji) {
      navigate(`/kanjis/${nextKanji.id}${currentLessonId ? `?lessonId=${currentLessonId}` : ""}`);
    } else {
      navigate(lessonPath);
    }
  };

  // Keyboard navigation for smooth flashcard browsing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevKanji?.id, nextKanji?.id, currentLessonId, lessonPath]);

  // Track kanji item completion when user views/reaches this kanji
  useEffect(() => {
    if (kanjiId && kanji) {
      progressApi
        .updateContentProgress({
          contentType: "KANJI",
          contentId: kanjiId,
          progressPercent: 100,
        })
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["progress-summary"] });
          queryClient.invalidateQueries({ queryKey: ["progress-lessons"] });
          queryClient.invalidateQueries({ queryKey: ["progress-content"] });
        })
        .catch(() => {});
    }
  }, [kanjiId, kanji?.id]);

  const speakJapanese = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const displayKanjiNumber = kanji?.kanjiNumber ?? kanji?.id ?? id;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 flex items-center space-x-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link to={isN4 ? "/n4/lessons" : "/n5/lessons"} className="hover:text-slate-900 transition-colors">
            {isN4 ? "Bài học N4" : "Bài học N5"}
          </Link>
          <span>/</span>
          {currentLessonId && (
            <>
              <Link to={lessonPath} className="hover:text-slate-900 transition-colors">
                Bài {kanji?.lessonNumber || currentLessonId}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="font-semibold text-slate-900">Chi tiết Hán tự Kanji #{displayKanjiNumber}</span>
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
              to={isN4 ? "/n4/lessons" : "/n5/lessons"}
              className="inline-flex items-center px-4 py-2 bg-amber-600 text-white font-semibold rounded-xl text-sm"
            >
              Quay lại danh sách bài học
            </Link>
          </div>
        )}

        {!isLoading && !error && kanji && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-zen overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white p-8 sm:p-10 relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                    Kanji {levelCode} #{displayKanjiNumber}
                  </span>
                  {kanji.strokeCount && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/40">
                      {kanji.strokeCount} nét vẽ
                    </span>
                  )}
                  <FavoriteButton contentType="KANJI" contentId={kanji.id} size="sm" />
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
                  <button
                    type="button"
                    onClick={() => speakJapanese(kanji.onyomi || kanji.kunyomi || kanji.kanji)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 transition-colors"
                    title="Nghe phát âm"
                  >
                    🔊
                  </button>
                </div>

                {kanji.meaning && (
                  <p className="text-lg text-slate-300 font-medium leading-relaxed mt-2">
                    Nghĩa: {kanji.meaning}
                  </p>
                )}
              </div>

              {/* Stroke Order Visual Animator */}
              <div className="bg-white/10 p-3 sm:p-4 rounded-3xl border border-white/20 backdrop-blur-md text-center shrink-0 self-center">
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block mb-2">
                  ✍️ Thứ tự nét vẽ
                </span>
                <StrokeOrderAnimator
                  character={kanji.kanji}
                  strokeOrderUrl={kanji.strokeOrderUrl}
                  theme="dark"
                  size={120}
                />
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Readings Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kanji.onyomi && (
                  <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/60 flex items-start justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block mb-1">
                        🔊 ÂM ONYOMI (Âm Hán Nhật)
                      </span>
                      <div className="text-xl font-bold text-slate-900 jp-font">
                        {kanji.onyomi}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakJapanese(kanji.onyomi || "")}
                      className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
                      title="Nghe phát âm Onyomi"
                    >
                      🔊
                    </button>
                  </div>
                )}

                {kanji.kunyomi && (
                  <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-200/60 flex items-start justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-indigo-800 uppercase tracking-wider block mb-1">
                        🗣️ ÂM KUNYOMI (Âm thuần Nhật)
                      </span>
                      <div className="text-xl font-bold text-slate-900 jp-font">
                        {kanji.kunyomi}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakJapanese(kanji.kunyomi || "")}
                      className="p-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-900 transition-colors"
                      title="Nghe phát âm Kunyomi"
                    >
                      🔊
                    </button>
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

              {/* Bottom Navigation Buttons: Quay lại & Tiếp theo */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white rounded-2xl text-sm font-bold shadow-sm active:scale-95 transition-all cursor-pointer group"
                >
                  <span className="text-base group-hover:-translate-x-1 transition-transform">←</span>
                  <span>Quay lại</span>
                  {prevKanji && (
                    <span className="text-xs text-slate-300 font-normal ml-1">
                      ({prevKanji.kanji} - {prevKanji.hanViet})
                    </span>
                  )}
                </button>

                {lessonKanjis && lessonKanjis.length > 0 && (
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Kanji {currentIndex >= 0 ? currentIndex + 1 : 1} / {lessonKanjis.length}
                    </span>
                    <Link
                      to={lessonPath}
                      className="text-xs text-amber-600 hover:text-amber-700 font-semibold hover:underline mt-1"
                    >
                      Danh sách Kanji bài học
                    </Link>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white rounded-2xl text-sm font-bold shadow-md shadow-amber-600/25 active:scale-95 transition-all cursor-pointer group"
                >
                  <span>Tiếp theo</span>
                  {nextKanji ? (
                    <>
                      <span className="text-xs text-amber-100 font-normal mr-1">
                        ({nextKanji.kanji} - {nextKanji.hanViet})
                      </span>
                      <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  ) : (
                    <span className="text-base">✓</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
