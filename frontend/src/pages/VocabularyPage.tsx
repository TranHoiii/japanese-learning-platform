import { useState, useMemo } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { vocabularyApi } from "../services/vocabularyApi";
import { Vocabulary } from "../types/vocabulary";
import Navbar from "../components/Navbar";
import VocabularyDetailModal from "../components/VocabularyDetailModal";
import InteractiveFlashcardSession from "../components/learning/InteractiveFlashcardSession";
import FavoriteButton from "../components/favorite/FavoriteButton";
import { SKILLS } from "../constants/skills";

export default function VocabularyPage() {
  const { lessonId } = useParams<{ lessonId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const isN4 = location.pathname.startsWith("/n4") || location.pathname.includes("n4");
  const levelCode = isN4 ? "N4" : "N5";

  const [selectedVocab, setSelectedVocab] = useState<Vocabulary | null>(null);
  const [viewMode, setViewMode] = useState<"flashcard" | "table" | "grid">("flashcard");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Get Level
  const { data: levels } = useQuery({
    queryKey: ["levels"],
    queryFn: vocabularyApi.getLevels,
  });

  const targetLevel = levels?.find((l) => l.code === levelCode) || (isN4 ? levels?.find(l => l.code === "N4") : levels?.[0]);

  // 2. Get Lessons list for selector
  const { data: lessons } = useQuery({
    queryKey: ["lessons", targetLevel?.id],
    queryFn: () => vocabularyApi.getLessonsByLevel(targetLevel!.id),
    enabled: !!targetLevel,
  });

  const activeLessonId = lessonId
    ? parseInt(lessonId, 10)
    : lessons && lessons.length > 0
    ? lessons[0].id
    : isN4 ? 26 : 1;

  // 3. Get Lesson info
  const currentLesson = lessons?.find((l) => l.id === activeLessonId);

  // 4. Get Vocabularies by Lesson
  const {
    data: vocabularies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vocabularies", activeLessonId],
    queryFn: () => vocabularyApi.getVocabulariesByLesson(activeLessonId!),
    enabled: !!activeLessonId,
  });

  // Client filter if user types in search box
  const filteredVocabularies = useMemo(() => {
    if (!vocabularies) return [];
    if (!searchQuery.trim()) return vocabularies;

    const q = searchQuery.toLowerCase().trim();
    return vocabularies.filter(
      (v) =>
        v.hiragana.toLowerCase().includes(q) ||
        (v.kanji && v.kanji.toLowerCase().includes(q)) ||
        (v.hanViet && v.hanViet.toLowerCase().includes(q)) ||
        v.meaning.toLowerCase().includes(q)
    );
  }, [vocabularies, searchQuery]);

  const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetId = e.target.value;
    if (targetId) {
      navigate(`/${isN4 ? "n4" : "n5"}/lessons/${targetId}/vocabulary`);
    }
  };

  const playWordAudio = (word: string, audioUrl?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(() => playSpeech(word));
    } else {
      playSpeech(word);
    }
  };

  const playSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const levelPrefix = isN4 ? "n4" : "n5";
  const lessonIndex = lessons ? lessons.findIndex((l) => l.id === activeLessonId) : -1;
  const prevLesson = lessons && lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson = lessons && lessonIndex >= 0 && lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;
  const viewModes = [
    { key: "flashcard" as const, icon: "🎴", label: "Thẻ học" },
    { key: "table" as const, icon: "📊", label: "Bảng" },
    { key: "grid" as const, icon: "🗂️", label: "Lưới" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500 mb-5">
          <Link to="/" className="hover:text-slate-900 transition-colors">Trang chủ</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/${levelPrefix}/lessons`} className="hover:text-slate-900 transition-colors">
            Bài học {levelCode}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-slate-900 truncate">
            {currentLesson ? currentLesson.title : `Bài học ${activeLessonId || ""}`}
          </span>
        </nav>

        {/* Lesson header */}
        <section className="hero-ink pattern-seigaiha relative overflow-hidden rounded-[28px] p-6 sm:p-8 shadow-zen mb-6 animate-fade-up">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-2 -bottom-12 font-mincho font-extrabold text-[200px] leading-none text-white/[0.07]"
          >
            語
          </span>
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-full bg-white/15 border border-white/25 px-3 py-1 text-xs font-bold">
                  JLPT {levelCode}
                </span>
                {currentLesson && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                    Bài {currentLesson.lessonNumber}
                  </span>
                )}
                {vocabularies && (
                  <span className="rounded-full bg-rose-400/25 border border-rose-300/30 px-3 py-1 text-xs font-bold text-rose-100">
                    {vocabularies.length} từ vựng
                  </span>
                )}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                {currentLesson ? `Từ vựng · ${currentLesson.title}` : `Từ vựng ${levelCode}`}
              </h1>
            </div>

            {lessons && (
              <div className="flex items-center gap-2">
                <Link
                  to={prevLesson ? `/${levelPrefix}/lessons/${prevLesson.id}/vocabulary` : "#"}
                  aria-disabled={!prevLesson}
                  aria-label="Bài trước"
                  className={`w-11 h-11 rounded-xl border border-white/25 bg-white/10 flex items-center justify-center transition-colors ${prevLesson ? "hover:bg-white/20" : "opacity-40 pointer-events-none"}`}
                >
                  ←
                </Link>
                <select
                  value={activeLessonId || ""}
                  onChange={handleLessonChange}
                  aria-label="Chọn bài học"
                  className="h-11 bg-white text-slate-900 text-sm font-semibold rounded-xl px-3 cursor-pointer min-w-[170px] focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  {lessons.map((l) => (
                    <option key={l.id} value={l.id}>
                      Bài {l.lessonNumber} · {l.title}
                    </option>
                  ))}
                </select>
                <Link
                  to={nextLesson ? `/${levelPrefix}/lessons/${nextLesson.id}/vocabulary` : "#"}
                  aria-disabled={!nextLesson}
                  aria-label="Bài sau"
                  className={`w-11 h-11 rounded-xl border border-white/25 bg-white/10 flex items-center justify-center transition-colors ${nextLesson ? "hover:bg-white/20" : "opacity-40 pointer-events-none"}`}
                >
                  →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Skill tabs + search + view toggle */}
        <div className="surface p-3 sm:p-4 mb-8 space-y-3">
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar-x pb-1" role="tablist" aria-label="Kỹ năng trong bài">
            {SKILLS.map((skill) => {
              const active = skill.key === "vocabulary";
              const classes = `px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shrink-0 whitespace-nowrap transition-all ${
                active ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`;
              const content = (
                <>
                  <span aria-hidden="true">{skill.emoji}</span>
                  <span>{skill.label}</span>
                </>
              );
              return active ? (
                <span key={skill.key} role="tab" aria-selected="true" className={classes}>{content}</span>
              ) : (
                <Link key={skill.key} role="tab" aria-selected="false" to={`/${levelPrefix}/lessons/${activeLessonId}/${skill.path}`} className={classes}>
                  {content}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-96">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400" aria-hidden="true">🔍</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm từ vựng (Hiragana, Kanji, Hán Việt, nghĩa)…"
                aria-label="Tìm từ vựng"
                className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl self-end sm:self-auto" role="tablist" aria-label="Chế độ hiển thị">
              {viewModes.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  role="tab"
                  aria-selected={viewMode === m.key}
                  onClick={() => setViewMode(m.key)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === m.key ? "bg-white text-indigo-800 shadow-sm" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span aria-hidden="true">{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="surface h-[460px] skeleton-shimmer" aria-busy="true" aria-live="polite" />
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-8 rounded-3xl text-center max-w-lg mx-auto" role="alert">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-bold text-lg mb-2">Không thể tải dữ liệu từ vựng</h3>
            <p className="text-sm text-rose-600">Đã xảy ra lỗi khi tải từ vựng của bài học này. Vui lòng thử lại sau.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredVocabularies.length === 0 && (
          <div className="surface p-12 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="font-display text-lg font-bold text-slate-800 mb-1">
              {searchQuery ? "Không tìm thấy từ vựng khớp với từ khóa" : "Chưa có từ vựng cho bài học này"}
            </h3>
            <p className="text-sm text-slate-500">
              {searchQuery ? "Thử tìm với Hiragana, Kanji hoặc tiếng Việt." : "Vui lòng chọn bài học khác."}
            </p>
          </div>
        )}

        {/* Content Display */}
        {!isLoading && !error && filteredVocabularies.length > 0 && (
          <>
            {/* 1. FLASHCARD 3D INTERACTIVE SESSION (Mockup 2) */}
            {viewMode === "flashcard" && (
              <InteractiveFlashcardSession
                vocabularies={filteredVocabularies}
                onClose={() => setViewMode("table")}
              />
            )}

            {/* 2. TABLE VIEW */}
            {viewMode === "table" && (
              <div className="surface overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[640px]">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-4 px-6 w-16 text-center">#</th>
                        <th className="py-4 px-6">Hiragana</th>
                        <th className="py-4 px-6">Kanji</th>
                        <th className="py-4 px-6">Hán Việt</th>
                        <th className="py-4 px-6">Ý Nghĩa</th>
                        <th className="py-4 px-6 text-center w-20">Yêu Thích</th>
                        <th className="py-4 px-6 text-center w-24">Âm Thanh</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800 text-sm font-medium">
                      {filteredVocabularies.map((vocab, index) => (
                        <tr
                          key={vocab.id}
                          onClick={() => setSelectedVocab(vocab)}
                          className="hover:bg-indigo-50/40 transition-colors cursor-pointer group"
                        >
                          <td className="py-4 px-6 text-center text-xs font-semibold text-slate-400 group-hover:text-indigo-600">
                            {index + 1}
                          </td>
                          <td className="py-4 px-6 font-bold text-slate-900 jp-font text-base group-hover:text-indigo-600 transition-colors">
                            {vocab.hiragana}
                          </td>
                          <td className="py-4 px-6 text-slate-800 kanji-text text-base">
                            {vocab.kanji ? (
                              <span className="font-semibold text-slate-900">{vocab.kanji}</span>
                            ) : (
                              <span className="text-slate-300 font-normal italic">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            {vocab.hanViet ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200/80">
                                {vocab.hanViet}
                              </span>
                            ) : (
                              <span className="text-slate-300 font-normal italic">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-slate-700 leading-relaxed font-normal">
                            {vocab.meaning}
                          </td>
                          <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-center">
                              <FavoriteButton contentType="VOCABULARY" contentId={vocab.id} size="sm" />
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={(e) =>
                                playWordAudio(vocab.hiragana || vocab.kanji || "", vocab.audioUrl || undefined, e)
                              }
                              className="w-8 h-8 rounded-full bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-600 flex items-center justify-center text-xs transition-colors mx-auto shadow-2xs cursor-pointer"
                              title="Nghe phát âm chuẩn"
                            >
                              🔊
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. CARD GRID VIEW */}
            {viewMode === "grid" && (
              <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVocabularies.map((vocab, index) => (
                  <div
                    key={vocab.id}
                    onClick={() => setSelectedVocab(vocab)}
                    className="surface surface-hover p-6 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                            #{index + 1}
                          </span>
                          {vocab.hanViet && (
                            <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-md border border-amber-200/80 uppercase">
                              {vocab.hanViet}
                            </span>
                          )}
                        </div>

                        <div onClick={(e) => e.stopPropagation()}>
                          <FavoriteButton contentType="VOCABULARY" contentId={vocab.id} size="sm" />
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-3xl font-mincho font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {vocab.hiragana}
                        </h3>
                        {vocab.kanji && (
                          <div className="text-lg font-medium text-slate-600 kanji-text mt-0.5">
                            {vocab.kanji}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-sm font-medium text-slate-700 leading-relaxed mb-3">
                        {vocab.meaning}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-indigo-600 font-semibold group-hover:underline">
                          Xem chi tiết →
                        </span>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
                          title="Nghe phát âm"
                          onClick={(e) =>
                            playWordAudio(vocab.hiragana || vocab.kanji || "", vocab.audioUrl || undefined, e)
                          }
                        >
                          🔊
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Vocabulary Detail Modal */}
      <VocabularyDetailModal
        vocabulary={selectedVocab}
        onClose={() => setSelectedVocab(null)}
      />
    </div>
  );
}
