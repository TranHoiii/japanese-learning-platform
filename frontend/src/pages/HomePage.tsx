import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { vocabularyApi } from "../services/vocabularyApi";
import { reviewApi } from "../services/reviewApi";
import { progressApi } from "../services/progressApi";
import { getLessonDisplayInfo } from "../constants/lessonTopics";
import AppShell from "../components/layout/AppShell";
import CircularProgress from "../components/ui/CircularProgress";

export default function HomePage() {
  const { currentUser } = useAuth();

  // 1. Fetch Lessons
  const { data: levels } = useQuery({
    queryKey: ["levels"],
    queryFn: vocabularyApi.getLevels,
  });

  const n5Level = levels?.find((l) => l.code === "N5") || levels?.[0];

  const { data: lessons } = useQuery({
    queryKey: ["lessons", n5Level?.id],
    queryFn: () => vocabularyApi.getLessonsByLevel(n5Level!.id),
    enabled: !!n5Level,
  });

  // 2a. Fetch Review Due Items count
  const { data: dueItems = [] } = useQuery({
    queryKey: ["review-items-due"],
    queryFn: () => reviewApi.getDueReviewItems(),
    enabled: !!currentUser,
  });

  // 2b. Fetch Total Review Items count (all tracked items in SRS)
  const { data: allReviewItems = [] } = useQuery({
    queryKey: ["review-items-all"],
    queryFn: () => reviewApi.getReviewItems(),
    enabled: !!currentUser,
  });

  // 3. Fetch Lesson Progresses
  const { data: lessonProgresses = [] } = useQuery({
    queryKey: ["progress-lessons"],
    queryFn: progressApi.getLessonProgresses,
    enabled: !!currentUser,
  });

  // 4. Fetch Progress Summary (for overall completion & N5 category mastery)
  const { data: progressSummary } = useQuery({
    queryKey: ["progress-summary"],
    queryFn: progressApi.getProgressSummary,
    enabled: !!currentUser,
  });

  // Map progress % by lessonId
  const progressMap = useMemo(() => {
    const map = new Map<number, number>();
    lessonProgresses.forEach((p) => {
      map.set(p.lessonId, p.progressPercent || 0);
    });
    return map;
  }, [lessonProgresses]);

  // Fallback demo lessons if backend not seeded or empty
  const displayLessons = useMemo(() => {
    if (lessons && lessons.length > 0) return lessons;
    // Default 8 sample cards if not loaded yet
    return [
      { id: 1, lessonNumber: 1, title: "Bài 01", description: "" },
      { id: 2, lessonNumber: 2, title: "Bài 02", description: "" },
      { id: 3, lessonNumber: 3, title: "Bài 03", description: "" },
      { id: 4, lessonNumber: 4, title: "Bài 04", description: "" },
      { id: 5, lessonNumber: 5, title: "Bài 05", description: "" },
      { id: 6, lessonNumber: 6, title: "Bài 06", description: "" },
      { id: 7, lessonNumber: 7, title: "Bài 07", description: "" },
      { id: 8, lessonNumber: 8, title: "Bài 08", description: "" },
    ];
  }, [lessons]);

  // Determine current active lesson for user
  const currentLesson = useMemo(() => {
    if (!displayLessons || displayLessons.length === 0) return null;
    return displayLessons.find((l) => (progressMap.get(l.id) || 0) < 100) || displayLessons[0];
  }, [displayLessons, progressMap]);

  // Calculate JLPT N5 Mastery Stats across ALL N5 content (not tied to current lesson)
  const masteryStats = useMemo(() => {
    const overall = progressSummary?.overallProgress ?? 0;
    return {
      overall,
      vocabulary: progressSummary?.vocabularyMastery ?? 0,
      kanji: progressSummary?.kanjiMastery ?? 0,
      grammar: progressSummary?.grammarMastery ?? 0,
      listening: progressSummary?.listeningMastery ?? 0,
      reading: progressSummary?.readingMastery ?? 0,
    };
  }, [progressSummary]);

  const userName = currentUser?.fullName?.split(" ").pop() || "bạn";
  const dueCount = dueItems.length;
  const totalReviewCount = allReviewItems.length;

  const currentLessonNum = currentLesson?.lessonNumber || 1;
  const currentLessonPad = currentLessonNum < 10 ? `0${currentLessonNum}` : currentLessonNum;
  const currentLessonTopic = getLessonDisplayInfo(currentLessonNum, currentLesson?.title, currentLesson?.description);

  return (
    <AppShell>
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1300px] mx-auto">
        {/* 1. Hero Greeting Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-zen">
          {/* Ambient Glow & Sakura Petal Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center space-x-2.5">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  🌸 Lộ trình N5 Minnano Nihongo
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  Mục tiêu JLPT Tháng 7 & 12
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-snug">
                Chào {userName}, hôm nay hãy hoàn thành{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-300">
                  Bài {currentLessonPad}
                </span>
                !
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {currentLessonTopic.desc || "Duy trì chuỗi ngày học để ghi nhớ sâu 25 bài học từ vựng, ngữ pháp và Hán tự căn bản."}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={currentLesson ? `/n5/lessons/${currentLesson.id}/vocabulary` : "/n5/lessons"}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Tiếp tục học ngay &rarr;
                </Link>

                <Link
                  to="/review"
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold backdrop-blur-md border border-white/20 transition-all"
                >
                  Ôn tập Flashcard ({dueCount})
                </Link>

                <Link
                  to="/beginner"
                  className="px-4 py-2.5 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  🌱 Xem bảng chữ cái
                </Link>
              </div>
            </div>

            {/* Right Graphic Banner Illustration */}
            <div className="hidden lg:flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-center shrink-0 w-64 shadow-inner">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center text-3xl mb-3 shadow-glow-sakura">
                桜
              </div>
              <p className="text-sm font-bold text-white">Trọng tâm: Bài {currentLessonPad}</p>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">{currentLessonTopic.title}</p>
            </div>
          </div>
        </div>

        {/* 2. Top Stats & SRS Callout Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Study Goal */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🎯</span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Mục tiêu học hôm nay (Daily Goal)</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  {masteryStats.overall > 0 ? `${masteryStats.overall * 5} / 500 XP` : "0 / 500 XP"}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 mb-4">
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(
                        masteryStats.overall > 0 ? 5 : 0,
                        Math.min(100, Math.round(((masteryStats.overall * 5) / 500) * 100))
                      )}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>🔥 Học đều đặn mỗi ngày</span>
                  <span>{progressSummary?.completedLessons || 0}/{progressSummary?.totalLessons || 25} bài đã xong</span>
                </div>
              </div>

              {/* Tips & Quick Link */}
              <div className="bg-rose-50/60 border border-rose-200/60 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🌸</span>
                  <div className="text-xs">
                    <p className="font-bold text-rose-900">Mẹo ghi nhớ hôm nay</p>
                    <p className="text-rose-700">Học từ vựng kết hợp âm Hán Việt giúp nhớ lâu hơn 300%!</p>
                  </div>
                </div>
                <Link
                  to={currentLesson ? `/n5/lessons/${currentLesson.id}/kanji` : "/n5/lessons"}
                  className="text-xs font-bold text-rose-600 hover:text-rose-800 shrink-0 ml-2"
                >
                  Xem Hán tự &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* SRS Flashcard Review Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🔄</span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">SRS Flashcard Review</h3>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    dueCount > 0
                      ? "bg-rose-50 text-rose-600 border border-rose-200"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  }`}
                >
                  {dueCount > 0 ? "Đến hạn" : "Hoàn tất"}
                </span>
              </div>

              <div className="my-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 flex items-baseline space-x-2">
                  <span>{dueCount}</span>
                  <span className="text-sm font-medium text-slate-500">
                    từ vựng đến hạn hôm nay
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {totalReviewCount > 0
                    ? `Bạn có ${totalReviewCount} mục đang được theo dõi trong SRS.`
                    : "Chưa có mục nào đang được theo dõi trong SRS."}
                </p>
              </div>
            </div>

            <Link
              to="/review"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl text-center shadow-xs transition-colors block"
            >
              {dueCount > 0 ? "Bắt đầu ôn ngay" : "Xem danh sách ôn tập"}
            </Link>
          </div>
        </div>

        {/* 3. Main Roadmap & JLPT Mastery Radar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          {/* Visual Lesson Roadmap of Minnano Nihongo (2 Columns in xl) */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Lộ Trình 25 Bài Học Minnano Nihongo
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chọn bài học để luyện tập toàn diện Từ vựng, Ngữ pháp, Hán tự, Luyện nghe và Đọc hiểu.
                </p>
              </div>

              <Link
                to="/n5/lessons"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Xem tất cả 25 bài &rarr;
              </Link>
            </div>

            {/* Lesson Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayLessons.map((lesson) => {
                const prog = progressMap.get(lesson.id) || 0;
                const isComplete = prog >= 100;
                const inProgress = prog > 0 && prog < 100;
                const lessonPad = lesson.lessonNumber < 10 ? `0${lesson.lessonNumber}` : lesson.lessonNumber;
                const topicInfo = getLessonDisplayInfo(lesson.lessonNumber, lesson.title, lesson.description);

                return (
                  <div
                    key={lesson.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header: Circular Progress & Status */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <CircularProgress
                            value={prog}
                            size={44}
                            strokeWidth={4}
                            color={isComplete ? "text-emerald-500" : inProgress ? "text-indigo-600" : "text-slate-300"}
                          />
                          <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                              BÀI {lessonPad}
                            </span>
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                              {topicInfo.title}
                            </h3>
                          </div>
                        </div>

                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            isComplete
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : inProgress
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-slate-100 text-slate-500 border border-slate-200"
                          }`}
                        >
                          {isComplete ? "Hoàn thành" : inProgress ? `${prog}% hoàn thành` : "Chưa học"}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                        {topicInfo.desc}
                      </p>
                    </div>

                    {/* Skill Pills for Fast Access */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1.5 text-slate-600">
                        <Link
                          to={`/n5/lessons/${lesson.id}/vocabulary`}
                          className="px-2 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 transition-colors font-medium"
                          title="Từ vựng"
                        >
                          Từ vựng
                        </Link>
                        <Link
                          to={`/n5/lessons/${lesson.id}/grammar`}
                          className="px-2 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 transition-colors font-medium"
                          title="Ngữ pháp"
                        >
                          Ngữ pháp
                        </Link>
                        <Link
                          to={`/n5/lessons/${lesson.id}/kanji`}
                          className="px-2 py-1 rounded-md bg-slate-100 hover:bg-amber-50 hover:text-amber-700 transition-colors font-medium"
                          title="Hán tự"
                        >
                          Hán tự
                        </Link>
                      </div>

                      <Link
                        to={`/n5/lessons/${lesson.id}/vocabulary`}
                        className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors shrink-0 ml-1"
                        aria-label={`Vào bài học ${lesson.lessonNumber}`}
                      >
                        Vào học &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: JLPT N5 Mastery Stats Breakdown */}
          <div className="space-y-6">
            {/* JLPT Skill Mastery Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📊</span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">JLPT N5 Mastery Stats</h3>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Tiến độ tích lũy toàn khóa N5 (25 bài học)
                  </p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  N5 Đạt {masteryStats.overall}%
                </span>
              </div>

              {/* Skills Bar Breakdown with Real Progress */}
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>📖 Từ vựng (Vocabulary)</span>
                    <span className="text-indigo-600">{masteryStats.vocabulary}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${masteryStats.vocabulary}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>✍️ Hán tự (Kanji)</span>
                    <span className="text-amber-600">{masteryStats.kanji}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${masteryStats.kanji}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>🧩 Ngữ pháp (Grammar)</span>
                    <span className="text-sky-600">{masteryStats.grammar}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-sky-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${masteryStats.grammar}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>🎧 Luyện nghe (Listening)</span>
                    <span className="text-purple-600">{masteryStats.listening}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${masteryStats.listening}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>📰 Luyện đọc (Reading)</span>
                    <span className="text-rose-600">{masteryStats.reading}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-rose-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${masteryStats.reading}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  to="/progress"
                  className="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center justify-between"
                >
                  <span>Xem báo cáo phân tích chi tiết</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Quick Sơ cấp / Nền tảng Banner */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-5">
              <div className="flex items-start space-x-3">
                <span className="w-10 h-10 rounded-xl bg-white text-indigo-700 font-extrabold text-xl flex items-center justify-center shrink-0 shadow-xs">
                  あ
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Chưa vững bảng chữ cái?</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Khám phá khu vực Sơ cấp với 46 ký tự Hiragana, Katakana và quy tắc đếm số tiếng Nhật căn bản.
                  </p>
                  <Link
                    to="/beginner"
                    className="inline-block mt-3 text-xs font-bold text-indigo-700 hover:text-indigo-900"
                  >
                    Vào học bảng chữ cái &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
