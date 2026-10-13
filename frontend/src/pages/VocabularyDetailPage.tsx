import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { vocabularyApi } from "../services/vocabularyApi";
import { progressApi } from "../services/progressApi";
import AppShell from "../components/layout/AppShell";
import PageContainer from "../components/layout/PageContainer";
import FavoriteButton from "../components/favorite/FavoriteButton";
import { cn } from "../utils/cn";

export default function VocabularyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const vocabId = id ? parseInt(id, 10) : null;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [copied, setCopied] = useState(false);
  const [showMeaningQuiz, setShowMeaningQuiz] = useState(false);

  const {
    data: vocabulary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vocabulary", vocabId],
    queryFn: () => vocabularyApi.getVocabularyById(vocabId!),
    enabled: !!vocabId,
  });

  const lessonId = vocabulary?.lessonId ?? null;

  // Fetch all vocabularies in the same lesson for smooth next/prev browsing
  const { data: lessonVocabs } = useQuery({
    queryKey: ["vocabularies", lessonId],
    queryFn: () => vocabularyApi.getVocabulariesByLesson(lessonId!),
    enabled: !!lessonId,
  });

  const currentIndex = lessonVocabs && vocabId
    ? lessonVocabs.findIndex((v) => v.id === vocabId)
    : -1;
  const prevVocab = currentIndex > 0 && lessonVocabs ? lessonVocabs[currentIndex - 1] : null;
  const nextVocab =
    currentIndex >= 0 && lessonVocabs && currentIndex < lessonVocabs.length - 1
      ? lessonVocabs[currentIndex + 1]
      : null;

  const isN4 = vocabulary && vocabulary.lessonId >= 26;
  const levelCode = isN4 ? "N4" : "N5";
  const lessonPath = lessonId
    ? `/${isN4 ? "n4" : "n5"}/lessons/${lessonId}/vocabulary`
    : isN4 ? "/n4/lessons" : "/n5/lessons";

  const handlePrev = () => {
    if (prevVocab) {
      navigate(`/vocabulary/${prevVocab.id}`);
    } else {
      navigate(lessonPath);
    }
  };

  const handleNext = () => {
    if (nextVocab) {
      navigate(`/vocabulary/${nextVocab.id}`);
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
  }, [prevVocab?.id, nextVocab?.id, lessonId, lessonPath]);

  // Track progress
  useEffect(() => {
    if (vocabId && vocabulary) {
      progressApi
        .updateContentProgress({
          contentType: "VOCABULARY",
          contentId: vocabId,
          progressPercent: 100,
        })
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["progress-summary"] });
          queryClient.invalidateQueries({ queryKey: ["progress-lessons"] });
          queryClient.invalidateQueries({ queryKey: ["progress-content"] });
        })
        .catch(() => {});
    }
  }, [vocabId, vocabulary?.id]);

  const speakJapanese = (text: string) => {
    if (vocabulary?.audioUrl) {
      const audio = new Audio(vocabulary.audioUrl);
      audio.play().catch(() => playSpeech(text));
    } else {
      playSpeech(text);
    }
  };

  const playSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = () => {
    if (!vocabulary) return;
    const copyText = vocabulary.kanji
      ? `${vocabulary.kanji} (${vocabulary.hiragana}) - ${vocabulary.meaning}`
      : `${vocabulary.hiragana} - ${vocabulary.meaning}`;
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sample sentences generated based on the word if not in db
  const defaultSentence = {
    japanese: vocabulary?.kanji
      ? `これは ${vocabulary.kanji} です。`
      : `これは ${vocabulary?.hiragana} です。`,
    reading: `Kore wa ${vocabulary?.hiragana} desu.`,
    vietnamese: `Đây là ${vocabulary?.meaning.toLowerCase()}.`,
  };

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
          {lessonId && (
            <>
              <Link to={lessonPath} className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                Bài {lessonId} (Từ vựng)
              </Link>
              <span>/</span>
            </>
          )}
          <span className="font-bold text-slate-900 dark:text-slate-100">
            Từ vựng #{id} {vocabulary ? `( ${vocabulary.hiragana} )` : ""}
          </span>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="surface rounded-3xl p-16 text-center border border-[#E7E0D2] shadow-zen space-y-3">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
              Đang mở hồ sơ từ vựng #{id}...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="surface rounded-3xl p-10 text-center border border-rose-300 bg-rose-50/50 dark:bg-rose-950/20 space-y-4">
            <div className="text-4xl">⚠️</div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-rose-900 dark:text-rose-200">
                Không tìm thấy từ vựng
              </h3>
              <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-400 max-w-md mx-auto">
                Từ vựng với mã #{id} không tồn tại hoặc đã được di dời sang bài học khác.
              </p>
            </div>
            <Link
              to={isN4 ? "/n4/lessons" : "/n5/lessons"}
              className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md hover:bg-indigo-500 transition-all"
            >
              Quay lại danh sách bài học
            </Link>
          </div>
        )}

        {/* Loaded Vocabulary Details */}
        {!isLoading && !error && vocabulary && (
          <div className="space-y-6">
            {/* Masterpiece Word Hero Banner */}
            <div className="hero-ink pattern-seigaiha rounded-3xl p-6 sm:p-10 text-white shadow-zen relative overflow-hidden">
              {/* Background Kanji Watermark */}
              {vocabulary.kanji && (
                <div
                  aria-hidden="true"
                  className="absolute -right-6 -bottom-8 text-9xl font-mincho font-black text-white/5 select-none pointer-events-none"
                >
                  {vocabulary.kanji}
                </div>
              )}

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  {/* Metadata Chips Bar */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs uppercase tracking-widest font-black text-indigo-300 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30">
                      {levelCode} • Bài {vocabulary.lessonId}
                    </span>

                    {vocabulary.partOfSpeech && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/20">
                        🏷️ {vocabulary.partOfSpeech}
                      </span>
                    )}

                    <FavoriteButton contentType="VOCABULARY" contentId={vocabulary.id} size="sm" />

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 text-xs font-medium transition-all cursor-pointer flex items-center gap-1"
                      title="Sao chép từ vựng"
                    >
                      <span>{copied ? "✓ Đã chép" : "📋 Chép"}</span>
                    </button>
                  </div>

                  {/* Large Word Display */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-4 flex-wrap">
                      <h1 className="font-display text-4xl sm:text-6xl font-black font-mincho text-white tracking-wide select-all">
                        {vocabulary.hiragana}
                      </h1>
                      {vocabulary.kanji && (
                        <span className="text-3xl sm:text-4xl font-black font-mincho text-amber-300">
                          【{vocabulary.kanji}】
                        </span>
                      )}
                    </div>

                    {vocabulary.hanViet && (
                      <div className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-indigo-200 font-mincho">
                        Hán Việt: {vocabulary.hanViet}
                      </div>
                    )}
                  </div>

                  {/* Primary Meaning Headline */}
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 max-w-xl">
                    <span className="text-[11px] font-bold text-amber-300/90 uppercase tracking-wider block mb-0.5">
                      Ý nghĩa tiếng Việt:
                    </span>
                    <p className="text-lg sm:text-xl text-white font-extrabold leading-relaxed">
                      {vocabulary.meaning}
                    </p>
                  </div>
                </div>

                {/* Right Action Box: Native Pronunciation Studio */}
                <div className="shrink-0 bg-slate-900/60 p-5 rounded-3xl border border-white/20 backdrop-blur-md text-center space-y-3 self-center md:self-auto min-w-[200px]">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 flex items-center justify-center text-2xl mx-auto shadow-inner">
                    🔊
                  </div>
                  <div>
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
                      Phát Âm Tiếng Nhật
                    </span>
                    <span className="text-[11px] text-white/70">
                      Chuẩn giọng Tokyo
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => speakJapanese(vocabulary.kanji || vocabulary.hiragana)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>Nghe giọng đọc</span>
                    <span>▶</span>
                  </button>

                  <div className="hidden sm:block text-[10px] text-white/50 pt-1 border-t border-white/10">
                    Phím tắt: <kbd className="px-1 py-0.5 rounded bg-white/10">←</kbd> <kbd className="px-1 py-0.5 rounded bg-white/10">→</kbd>
                  </div>
                </div>
              </div>
            </div>

            {/* 2-Column Analytical Studio Content Deck */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (5/12): Definition & Phonetic Nuance */}
              <div className="lg:col-span-5 space-y-4">
                {/* Detailed Analysis Card */}
                <div className="surface rounded-3xl p-5 border border-[#E7E0D2] shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80 dark:border-slate-800">
                    <span className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center font-mincho">
                      解
                    </span>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Phân tích ngữ nghĩa & Ngữ pháp
                    </h2>
                  </div>

                  {/* Hiragana & Kanji Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                      <span className="text-slate-400 font-bold block mb-1">HIRAGANA</span>
                      <span className="text-base font-black font-mincho text-slate-900 dark:text-slate-100">
                        {vocabulary.hiragana}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                      <span className="text-slate-400 font-bold block mb-1">HÁN TỰ KANJI</span>
                      <span className="text-base font-black font-mincho text-slate-900 dark:text-slate-100">
                        {vocabulary.kanji || <span className="text-slate-400 font-normal italic">Không có</span>}
                      </span>
                    </div>
                  </div>

                  {/* Han-Viet connection */}
                  {vocabulary.hanViet && (
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-300/40 dark:border-amber-700/40 text-xs">
                      <span className="font-black text-amber-800 dark:text-amber-300 block mb-0.5">
                        💡 Nguồn gốc Hán Việt:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        Âm Hán Việt là <strong className="font-bold text-amber-700 dark:text-amber-300">{vocabulary.hanViet}</strong>. Giúp người học Việt Nam ghi nhớ nhanh qua các từ tương đương trong tiếng Việt.
                      </p>
                    </div>
                  )}

                  {/* Notes / Special Rules */}
                  {vocabulary.notes && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs space-y-1">
                      <span className="font-bold text-slate-500 dark:text-slate-400 block">
                        Ghi chú sử dụng:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {vocabulary.notes}
                      </p>
                    </div>
                  )}

                  {/* Pitch Accent Visual Concept */}
                  <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-indigo-900 dark:text-indigo-200">
                        🎵 Cao độ âm điệu (Pitch Accent)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 font-bold">
                        Tokyo Chuẩn
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      Khi phát âm tiếng Nhật, chú ý duy trì độ dài đều đặn của từng phách (Mora) và ngữ điệu phẳng, tránh nhấn trọng âm mạnh như tiếng Anh.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column (7/12): Examples & Interactive Memory Test */}
              <div className="lg:col-span-7 space-y-4">
                {/* Example Sentences Card */}
                <div className="surface rounded-3xl p-5 sm:p-6 border border-[#E7E0D2] shadow-zen space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-sm flex items-center justify-center font-mincho">
                        例
                      </span>
                      <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        Mẫu câu ví dụ & Ngữ cảnh
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakJapanese(defaultSentence.japanese)}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>🔊 Nghe câu mẫu</span>
                    </button>
                  </div>

                  {/* Example Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        Ví dụ căn bản:
                      </span>
                      <button
                        type="button"
                        onClick={() => speakJapanese(defaultSentence.japanese)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors text-xs cursor-pointer"
                        title="Nghe phát âm"
                      >
                        🔊
                      </button>
                    </div>

                    <div className="text-xl sm:text-2xl font-black font-mincho text-slate-900 dark:text-slate-100">
                      {defaultSentence.japanese}
                    </div>

                    <div className="text-xs text-slate-400 font-mono">
                      {defaultSentence.reading}
                    </div>

                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {defaultSentence.vietnamese}
                    </p>
                  </div>

                  {/* Interactive Self-Test Flashcard Module */}
                  <div className="pt-2">
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200/80 dark:border-indigo-800/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🎯</span>
                          <span className="text-xs font-black text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
                            Thử thách phản xạ nhanh
                          </span>
                        </div>
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
                          Flashcard tự kiểm tra
                        </span>
                      </div>

                      <div className="text-center py-4 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-indigo-100 dark:border-indigo-900 shadow-3xs">
                        <span className="text-xs text-slate-400 block mb-1">Từ cần nhớ:</span>
                        <span className="text-2xl font-black font-mincho text-indigo-700 dark:text-indigo-300">
                          {vocabulary.kanji ? `${vocabulary.kanji} (${vocabulary.hiragana})` : vocabulary.hiragana}
                        </span>

                        <div className="mt-3">
                          {showMeaningQuiz ? (
                            <div className="animate-pop text-sm font-bold text-emerald-600 dark:text-emerald-400 px-4">
                              👉 {vocabulary.meaning}
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setShowMeaningQuiz(true)}
                              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                            >
                              Bấm để hiện nghĩa tiếng Việt
                            </button>
                          )}
                        </div>
                      </div>

                      {showMeaningQuiz && (
                        <div className="text-center">
                          <button
                            type="button"
                            onClick={() => setShowMeaningQuiz(false)}
                            className="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium underline cursor-pointer"
                          >
                            Ẩn lại để luyện lần sau
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
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
                <span>Từ trước</span>
                {prevVocab && (
                  <span className="text-xs text-indigo-300 font-mincho ml-1 font-bold">
                    ({prevVocab.hiragana})
                  </span>
                )}
              </button>

              {lessonVocabs && lessonVocabs.length > 0 && (
                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                    Từ vựng {currentIndex >= 0 ? currentIndex + 1 : 1} / {lessonVocabs.length}
                  </span>
                  <Link
                    to={lessonPath}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold mt-0.5"
                  >
                    Xem tất cả từ vựng bài {lessonId} &rarr;
                  </Link>
                </div>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/25 active:scale-95 transition-all cursor-pointer group"
              >
                <span>Từ tiếp theo</span>
                {nextVocab ? (
                  <>
                    <span className="text-xs text-indigo-100 font-mincho mr-1 font-bold">
                      ({nextVocab.hiragana})
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
