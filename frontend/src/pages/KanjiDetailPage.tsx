import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { kanjiApi } from "../services/kanjiApi";
import { progressApi } from "../services/progressApi";
import AppShell from "../components/layout/AppShell";
import PageContainer from "../components/layout/PageContainer";
import FavoriteButton from "../components/favorite/FavoriteButton";
import StrokeOrderAnimator from "../components/kanji/StrokeOrderAnimator";
import { cn } from "../utils/cn";

export default function KanjiDetailPage() {
  const { id } = useParams<{ id: string }>();
  const kanjiId = id ? parseInt(id, 10) : null;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const [copied, setCopied] = useState(false);

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

  // Keyboard navigation for smooth browsing
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

  // Track kanji completion progress
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

  const handleCopyKanji = () => {
    if (!kanji?.kanji) return;
    navigator.clipboard.writeText(kanji.kanji);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayKanjiNumber = kanji?.kanjiNumber ?? kanji?.id ?? id;

  return (
    <AppShell>
      <PageContainer className="py-6 sm:py-8 pb-28 lg:pb-14 space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link
            to={isN4 ? "/n4/lessons" : "/n5/lessons"}
            className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            {isN4 ? "Bài học N4" : "Bài học N5"}
          </Link>
          <span>/</span>
          {currentLessonId && (
            <>
              <Link to={lessonPath} className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                Bài {kanji?.lessonNumber || currentLessonId} (Hán tự)
              </Link>
              <span>/</span>
            </>
          )}
          <span className="font-bold text-slate-900 dark:text-slate-100">
            Hán tự #{displayKanjiNumber} {kanji?.kanji ? `( ${kanji.kanji} )` : ""}
          </span>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="surface rounded-3xl p-16 text-center border border-[#E7E0D2] shadow-zen space-y-3">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
              Đang mở thư tịch Hán tự Kanji #{id}...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="surface rounded-3xl p-10 text-center border border-rose-300 bg-rose-50/50 dark:bg-rose-950/20 space-y-4">
            <div className="text-4xl">⚠️</div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-rose-900 dark:text-rose-200">
                Không tìm thấy Hán tự
              </h3>
              <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-400 max-w-md mx-auto">
                Hán tự Kanji với mã #{id} không tồn tại hoặc đã được cập nhật đường dẫn.
              </p>
            </div>
            <Link
              to={isN4 ? "/n4/lessons" : "/n5/lessons"}
              className="inline-flex items-center px-5 py-2.5 bg-amber-600 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md hover:bg-amber-500 transition-all"
            >
              Quay lại danh sách bài học
            </Link>
          </div>
        )}

        {/* Loaded Kanji Details */}
        {!isLoading && !error && kanji && (
          <div className="space-y-6">
            {/* Masterpiece Calligraphy Hero Banner */}
            <div className="hero-ink pattern-seigaiha rounded-3xl p-6 sm:p-10 text-white shadow-zen relative overflow-hidden">
              {/* Background Watermark Character */}
              <div
                aria-hidden="true"
                className="absolute -right-8 -bottom-10 text-[180px] font-mincho font-black text-white/5 select-none pointer-events-none"
              >
                {kanji.kanji}
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Left: Kanji Character & Meta */}
                <div className="space-y-4 text-center lg:text-left flex-1">
                  {/* Badges Bar */}
                  <div className="flex items-center justify-center lg:justify-start gap-2.5 flex-wrap">
                    <span className="text-xs uppercase tracking-widest font-black text-amber-300 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30">
                      Kanji {levelCode} #{displayKanjiNumber}
                    </span>

                    {kanji.strokeCount && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/20">
                        ✍️ {kanji.strokeCount} nét bút
                      </span>
                    )}

                    <FavoriteButton contentType="KANJI" contentId={kanji.id} size="sm" />

                    <button
                      type="button"
                      onClick={handleCopyKanji}
                      className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 text-xs font-medium transition-all cursor-pointer flex items-center gap-1"
                      title="Sao chép chữ Hán"
                    >
                      <span>{copied ? "✓ Đã chép" : "📋 Chép"}</span>
                    </button>
                  </div>

                  {/* Character and Hán-Việt Headline */}
                  <div className="flex items-baseline justify-center lg:justify-start gap-4 flex-wrap">
                    <span className="text-6xl sm:text-8xl font-black font-mincho text-amber-400 tracking-wide drop-shadow-md select-all">
                      {kanji.kanji}
                    </span>
                    {kanji.hanViet && (
                      <span className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white font-mincho">
                        {kanji.hanViet}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => speakJapanese(kanji.onyomi || kanji.kunyomi || kanji.kanji)}
                      className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-amber-300 border border-white/20 transition-all cursor-pointer active:scale-95"
                      title="Nghe phát âm chuẩn"
                    >
                      🔊 Phát âm
                    </button>
                  </div>

                  {/* Meaning Description */}
                  {kanji.meaning && (
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 max-w-xl">
                      <span className="text-[11px] font-bold text-amber-300/80 uppercase tracking-wider block mb-0.5">
                        Ý nghĩa cốt lõi:
                      </span>
                      <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
                        {kanji.meaning}
                      </p>
                    </div>
                  )}

                  {/* Keyboard Shortcuts Prompt */}
                  <div className="hidden sm:flex items-center gap-2 text-xs text-white/60">
                    <span>Phím tắt điều hướng:</span>
                    <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/20 font-mono text-[11px]">
                      ← Trước
                    </kbd>
                    <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/20 font-mono text-[11px]">
                      Tiếp →
                    </kbd>
                  </div>
                </div>

                {/* Right: Stroke Order Animator Studio */}
                <div className="shrink-0 bg-slate-900/60 p-4 sm:p-5 rounded-3xl border border-white/20 backdrop-blur-md text-center shadow-xl">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[11px] font-black text-amber-300 uppercase tracking-widest flex items-center gap-1">
                      <span>筆順</span>
                      <span>• Thứ tự nét vẽ</span>
                    </span>
                    <span className="text-[10px] text-white/60 font-mono">
                      {kanji.strokeCount ? `${kanji.strokeCount} nét` : "Tự động"}
                    </span>
                  </div>

                  <StrokeOrderAnimator
                    character={kanji.kanji}
                    strokeOrderUrl={kanji.strokeOrderUrl}
                    theme="dark"
                    size={140}
                  />

                  <p className="text-[10px] text-white/50 mt-2 font-medium">
                    Nhấp vào khung để tạm dừng / vẽ lại
                  </p>
                </div>
              </div>
            </div>

            {/* 2-Column Analytical Studio Content Deck */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (5/12): Pronunciations & Anatomy */}
              <div className="lg:col-span-5 space-y-4">
                {/* Onyomi Card */}
                <div className="surface rounded-3xl p-5 border border-amber-200/80 dark:border-amber-900/50 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center justify-center font-mincho">
                        音
                      </span>
                      <span className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                        Âm Onyomi (Âm Hán)
                      </span>
                    </div>
                    {kanji.onyomi && (
                      <button
                        type="button"
                        onClick={() => speakJapanese(kanji.onyomi)}
                        className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/40 dark:hover:bg-amber-800/60 text-amber-900 dark:text-amber-200 text-xs font-bold transition-all cursor-pointer"
                        title="Nghe phát âm Onyomi"
                      >
                        🔊 Nghe
                      </button>
                    )}
                  </div>

                  <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mincho tracking-wide">
                    {kanji.onyomi || <span className="text-slate-400 text-base font-normal italic">Không có âm On</span>}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-slate-800 pt-2">
                    Thường dùng khi ghép 2 hoặc nhiều Hán tự lại với nhau tạo thành từ vựng (Từ Hán Nhật - 熟語).
                  </p>
                </div>

                {/* Kunyomi Card */}
                <div className="surface rounded-3xl p-5 border border-indigo-200/80 dark:border-indigo-900/50 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center font-mincho">
                        訓
                      </span>
                      <span className="text-xs font-black text-indigo-800 dark:text-indigo-300 uppercase tracking-wider">
                        Âm Kunyomi (Âm Thuần Nhật)
                      </span>
                    </div>
                    {kanji.kunyomi && (
                      <button
                        type="button"
                        onClick={() => speakJapanese(kanji.kunyomi)}
                        className="px-2.5 py-1 rounded-xl bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:hover:bg-indigo-800/60 text-indigo-900 dark:text-indigo-200 text-xs font-bold transition-all cursor-pointer"
                        title="Nghe phát âm Kunyomi"
                      >
                        🔊 Nghe
                      </button>
                    )}
                  </div>

                  <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mincho tracking-wide">
                    {kanji.kunyomi || <span className="text-slate-400 text-base font-normal italic">Không có âm Kun</span>}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-slate-800 pt-2">
                    Thường dùng khi Hán tự đứng độc lập hoặc đi kèm với các đuôi Okurigana Hiragana.
                  </p>
                </div>

                {/* Mnemonic / Memory Aid Card */}
                {kanji.mnemonic && (
                  <div className="surface rounded-3xl p-5 border border-emerald-200/80 dark:border-emerald-900/50 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                        💡
                      </span>
                      <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                        Mẹo nhớ tượng hình
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line pt-1">
                      {kanji.mnemonic}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column (7/12): Compounds & Context */}
              <div className="lg:col-span-7 space-y-4">
                <div className="surface rounded-3xl p-5 sm:p-6 border border-[#E7E0D2] shadow-zen space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-sm flex items-center justify-center font-mincho">
                        熟
                      </span>
                      <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        Từ ghép thông dụng & Mẫu câu
                      </h2>
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full tabular-nums">
                      {kanji.compounds?.length || 0} mục
                    </span>
                  </div>

                  {/* Compounds List */}
                  {kanji.compounds && kanji.compounds.length > 0 ? (
                    <div className="space-y-3">
                      {kanji.compounds.map((cmp, idx) => (
                        <div
                          key={cmp.id || idx}
                          className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition-all shadow-2xs group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start space-x-3 flex-1 min-w-0">
                              <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>

                              <div className="flex-1 min-w-0">
                                {/* Word & Reading */}
                                <div className="flex items-baseline space-x-3 mb-1 flex-wrap">
                                  <span className="text-xl sm:text-2xl font-black font-mincho text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                    {cmp.word}
                                  </span>
                                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 font-mincho">
                                    【{cmp.reading}】
                                  </span>
                                </div>

                                {/* Meaning */}
                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                  {cmp.meaning}
                                </p>

                                {/* Sample sentence */}
                                {cmp.exampleSentence && (
                                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/80 text-xs font-medium space-y-1">
                                    <div className="flex items-center justify-between text-slate-400">
                                      <span className="font-bold text-[11px] uppercase tracking-wider">Ví dụ ứng dụng:</span>
                                      <button
                                        type="button"
                                        onClick={() => speakJapanese(cmp.exampleSentence || "")}
                                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold text-[11px] cursor-pointer"
                                      >
                                        🔊 Nghe câu
                                      </button>
                                    </div>
                                    <p className="font-mincho font-bold text-slate-900 dark:text-slate-100 text-sm">
                                      {cmp.exampleSentence}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* TTS button for compound */}
                            <button
                              type="button"
                              onClick={() => speakJapanese(cmp.word)}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer shrink-0"
                              title="Nghe từ ghép"
                            >
                              🔊
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-center space-y-2">
                      <span className="text-3xl block">📖</span>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Chưa có danh sách từ ghép riêng biệt cho Hán tự này.
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        Hãy luyện tập kết hợp âm On và âm Kun để ghi nhớ từ vựng liên quan trong bài học.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Navigation Control Deck */}
            <div className="surface rounded-3xl p-5 border border-[#E7E0D2] shadow-zen flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all cursor-pointer group"
              >
                <span className="text-base group-hover:-translate-x-1 transition-transform">←</span>
                <span>Quay lại</span>
                {prevKanji && (
                  <span className="text-xs text-amber-300 font-mincho ml-1 font-bold">
                    ({prevKanji.kanji} • {prevKanji.hanViet})
                  </span>
                )}
              </button>

              {lessonKanjis && lessonKanjis.length > 0 && (
                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                    Hán tự {currentIndex >= 0 ? currentIndex + 1 : 1} / {lessonKanjis.length}
                  </span>
                  <Link
                    to={lessonPath}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-bold mt-0.5"
                  >
                    Xem toàn bộ bài học &rarr;
                  </Link>
                </div>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-amber-600/25 active:scale-95 transition-all cursor-pointer group"
              >
                <span>Tiếp theo</span>
                {nextKanji ? (
                  <>
                    <span className="text-xs text-amber-100 font-mincho mr-1 font-bold">
                      ({nextKanji.kanji} • {nextKanji.hanViet})
                    </span>
                    <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                  </>
                ) : (
                  <span className="text-base">✓</span>
                )}
              </button>
            </div>
          </div>
        )}
      </PageContainer>
    </AppShell>
  );
}
