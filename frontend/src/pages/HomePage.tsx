import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { vocabularyApi } from "../services/vocabularyApi";
import { reviewApi } from "../services/reviewApi";
import { progressApi } from "../services/progressApi";
import { getLessonDisplayInfo } from "../constants/lessonTopics";
import { SKILLS } from "../constants/skills";
import { useGamification } from "../lib/gamification";
import AppShell from "../components/layout/AppShell";
import LessonCard from "../components/learning/LessonCard";
import { DailyGoalRing, StreakFlame, WeekStrip } from "../components/gamification/GamificationWidgets";
import { ProgressBar } from "../components/ui/ProgressBar";
import { cn } from "../utils/cn";
import type { Lesson } from "../types/vocabulary";
import type { LessonProgressResponse } from "../types/progress";

type LevelTab = "N5" | "N4";

function greeting(): { jp: string; vi: string } {
  const h = new Date().getHours();
  if (h < 11) return { jp: "おはよう", vi: "Chào buổi sáng" };
  if (h < 18) return { jp: "こんにちは", vi: "Chào buổi chiều" };
  return { jp: "こんばんは", vi: "Chào buổi tối" };
}

const FEATURES = [
  { emoji: "📚", title: "Từ vựng theo bài", desc: "Flashcard lật thẻ, nghe phát âm, ghi nhớ bằng âm Hán Việt.", tone: "bg-indigo-50 text-indigo-800" },
  { emoji: "⛩️", title: "Ngữ pháp dễ hiểu", desc: "Mẫu câu kèm ví dụ, giải thích bằng tiếng Việt.", tone: "bg-sky-50 text-sky-800" },
  { emoji: "🈁", title: "Hán tự & nét viết", desc: "Xem thứ tự nét viết động, luyện nhớ chữ Kanji.", tone: "bg-amber-50 text-amber-800" },
  { emoji: "🎧", title: "Nghe & Đọc hiểu", desc: "Luyện tai với audio bản xứ và bài đọc theo giáo trình.", tone: "bg-purple-50 text-purple-800" },
  { emoji: "🔄", title: "Ôn tập thông minh", desc: "Hệ thống lặp lại ngắt quãng nhắc bạn đúng lúc sắp quên.", tone: "bg-rose-50 text-rose-800" },
  { emoji: "🔥", title: "Chuỗi ngày & XP", desc: "Đặt mục tiêu mỗi ngày, giữ chuỗi và lên cấp khi học.", tone: "bg-emerald-50 text-emerald-800" },
];

export default function HomePage() {
  const { currentUser } = useAuth();
  const stats = useGamification();
  const [levelTab, setLevelTab] = useState<LevelTab>("N5");

  const { data: levels } = useQuery({ queryKey: ["levels"], queryFn: vocabularyApi.getLevels });
  const n5Level = levels?.find((l) => l.code === "N5") || levels?.[0];
  const n4Level = levels?.find((l) => l.code === "N4");

  const { data: n5Lessons, isLoading: n5Loading } = useQuery({
    queryKey: ["lessons", n5Level?.id],
    queryFn: () => vocabularyApi.getLessonsByLevel(n5Level!.id),
    enabled: !!n5Level,
  });
  const { data: n4Lessons, isLoading: n4Loading } = useQuery({
    queryKey: ["lessons", n4Level?.id],
    queryFn: () => vocabularyApi.getLessonsByLevel(n4Level!.id),
    enabled: !!n4Level,
  });

  const { data: dueItems = [] } = useQuery({
    queryKey: ["review-items-due"],
    queryFn: () => reviewApi.getDueReviewItems(),
    enabled: !!currentUser,
  });

  const { data: lessonProgresses = [] } = useQuery({
    queryKey: ["progress-lessons"],
    queryFn: progressApi.getLessonProgresses,
    enabled: !!currentUser,
  });

  const { data: summary } = useQuery({
    queryKey: ["progress-summary"],
    queryFn: progressApi.getProgressSummary,
    enabled: !!currentUser,
  });

  const progressMap = useMemo(() => {
    const map = new Map<number, LessonProgressResponse>();
    lessonProgresses.forEach((p) => map.set(p.lessonId, p));
    return map;
  }, [lessonProgresses]);

  const pct = (lesson: Lesson) => progressMap.get(lesson.id)?.progressPercent ?? 0;

  /** Lesson to resume: most recently touched unfinished lesson, otherwise the first unfinished one. */
  const current = useMemo(() => {
    const all = [
      ...(n5Lessons ?? []).map((lesson) => ({ lesson, prefix: "n5" })),
      ...(n4Lessons ?? []).map((lesson) => ({ lesson, prefix: "n4" })),
    ];
    if (all.length === 0) return null;
    const touched = all
      .filter(({ lesson }) => pct(lesson) > 0 && pct(lesson) < 100)
      .sort((a, b) => {
        const ta = progressMap.get(a.lesson.id)?.lastAccessedAt ?? "";
        const tb = progressMap.get(b.lesson.id)?.lastAccessedAt ?? "";
        return tb.localeCompare(ta);
      });
    return touched[0] ?? all.find(({ lesson }) => pct(lesson) < 100) ?? all[0];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n5Lessons, n4Lessons, progressMap]);

  const tabLessons = levelTab === "N4" ? n4Lessons : n5Lessons;
  const tabLoading = levelTab === "N4" ? n4Loading : n5Loading;
  const tabPrefix = levelTab.toLowerCase();

  const upcoming = useMemo(() => {
    if (!tabLessons) return [];
    const firstOpen = tabLessons.findIndex((l) => pct(l) < 100);
    const start = firstOpen === -1 ? 0 : firstOpen;
    return tabLessons.slice(start, start + 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabLessons, progressMap]);

  const userName = currentUser?.fullName?.split(" ").pop() || "bạn";
  const dueCount = dueItems.length;
  const hello = greeting();
  const currentTopic = current
    ? getLessonDisplayInfo(current.lesson.lessonNumber, current.lesson.title, current.lesson.description)
    : null;
  const remaining = Math.max(0, stats.dailyGoal - stats.xpToday);

  const motivation = stats.goalReached
    ? "Tuyệt vời! Bạn đã đạt mục tiêu hôm nay — học thêm để lên cấp nhanh hơn."
    : stats.streakAtRisk
      ? `Chuỗi ${stats.streak} ngày đang chờ bạn. Học một thẻ thôi cũng giữ được lửa!`
      : stats.xpToday > 0
        ? `Còn ${remaining} XP nữa là hoàn thành mục tiêu hôm nay.`
        : "Mỗi ngày một chút — bắt đầu bằng 5 phút học nhé.";

  const resumeHref = current ? `/${current.prefix}/lessons/${current.lesson.id}/vocabulary` : "/n5/lessons";

  return (
    <AppShell>
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8 max-w-[1280px] mx-auto">
        {/* ───────── Hero ───────── */}
        {currentUser ? (
          <section className="hero-ink pattern-seigaiha relative overflow-hidden rounded-[28px] p-6 sm:p-9 shadow-zen animate-fade-up">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute -right-4 -bottom-16 font-mincho font-extrabold text-[260px] leading-none text-white/[0.06]"
            >
              学
            </span>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-bold text-rose-200 backdrop-blur">
                  <span className="font-japanese">{hello.jp}</span>
                  <span className="w-1 h-1 rounded-full bg-rose-200/60" />
                  <span className="font-medium text-white/80">{hello.vi}</span>
                </span>

                <h1 className="font-display text-3xl sm:text-[40px] font-extrabold leading-[1.15] tracking-tight">
                  {userName} ơi, hôm nay mình học{" "}
                  <span className="text-gradient-sakura">
                    {current ? `Bài ${current.lesson.lessonNumber}` : "gì"} nhé?
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">{motivation}</p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    to={resumeHref}
                    className="btn-press inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-[15px] font-extrabold text-indigo-900 [--press-edge:#B9C7DD] hover:bg-indigo-50 transition-colors"
                  >
                    {current && pct(current.lesson) > 0 ? "Tiếp tục học" : "Bắt đầu học"}
                    {currentTopic && (
                      <span className="hidden sm:inline font-medium text-indigo-700/80 truncate max-w-[200px]">
                        · {currentTopic.title}
                      </span>
                    )}
                    <span aria-hidden="true">→</span>
                  </Link>

                  <Link
                    to="/review"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 px-5 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors"
                  >
                    🔄 Ôn tập
                    {dueCount > 0 && (
                      <span className="rounded-full bg-rose-500 px-2 py-0.5 text-xs font-extrabold leading-none">
                        {dueCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>

              {/* Daily goal */}
              <div className="shrink-0 self-start lg:self-center rounded-3xl bg-white p-5 shadow-zen text-slate-900 flex items-center gap-4">
                <DailyGoalRing value={stats.xpToday} goal={stats.dailyGoal} size={104} strokeWidth={10} />
                <div className="pr-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Mục tiêu hôm nay</p>
                  <p className="font-display font-extrabold text-lg leading-tight mt-0.5">
                    {stats.goalReached ? "Hoàn thành 🎉" : `${stats.goalPercent}%`}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-amber-700">
                    <StreakFlame active={stats.streak > 0} className="text-lg" />
                    {stats.streak} ngày
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="hero-ink pattern-seigaiha relative overflow-hidden rounded-[28px] p-7 sm:p-12 shadow-zen animate-fade-up">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute -right-6 -bottom-20 font-mincho font-extrabold text-[320px] leading-none text-white/[0.07]"
            >
              桜
            </span>
            <div className="relative z-10 max-w-2xl space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-bold text-rose-200">
                🌸 Giáo trình Minna no Nihongo · N5 – N4
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight">
                Học tiếng Nhật <span className="text-gradient-sakura">vui hơn mỗi ngày</span>
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Từ bảng chữ cái đến N4: từ vựng, ngữ pháp, Hán tự, nghe, đọc — kèm ôn tập thông minh,
                chuỗi ngày học và XP để bạn không bỏ cuộc giữa chừng.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to="/register"
                  className="btn-press inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-extrabold text-indigo-900 [--press-edge:#B9C7DD] hover:bg-indigo-50 transition-colors"
                >
                  Bắt đầu miễn phí →
                </Link>
                <Link
                  to="/beginner"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 px-6 py-4 text-sm font-bold backdrop-blur transition-colors"
                >
                  あ Học bảng chữ cái
                </Link>
                <Link to="/login" className="px-3 py-4 text-sm font-semibold text-white/80 hover:text-white underline-offset-4 hover:underline">
                  Tôi đã có tài khoản
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ───────── Stat tiles (signed in) ───────── */}
        {currentUser && (
          <section aria-label="Thống kê nhanh" className="stagger grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="surface p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <StreakFlame active={stats.streak > 0} className="text-base" /> Chuỗi ngày
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold text-slate-900 tabular-nums">
                {stats.streak}
                <span className="ml-1 text-sm font-semibold text-slate-400">ngày</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">Kỷ lục {stats.bestStreak} ngày</p>
            </div>

            <div className="surface p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span aria-hidden="true">⚡</span> Cấp {stats.level}
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold text-slate-900 tabular-nums">
                {stats.totalXp}
                <span className="ml-1 text-sm font-semibold text-slate-400">XP</span>
              </p>
              <ProgressBar value={stats.levelPercent} variant="sakura" size="sm" className="mt-2" />
              <p className="text-[11px] text-slate-500 mt-1.5 truncate">{stats.levelTitle}</p>
            </div>

            <Link
              to="/review"
              className={cn(
                "surface surface-hover p-4 sm:p-5 block",
                dueCount > 0 && "border-rose-200 bg-gradient-to-br from-white to-rose-50",
              )}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span aria-hidden="true">🔄</span> Cần ôn
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold text-slate-900 tabular-nums">
                {dueCount}
                <span className="ml-1 text-sm font-semibold text-slate-400">mục</span>
              </p>
              <p className={cn("text-xs mt-1 font-semibold", dueCount > 0 ? "text-rose-600" : "text-emerald-700")}>
                {dueCount > 0 ? "Ôn ngay để không quên →" : "Bạn đã ôn xong hôm nay ✓"}
              </p>
            </Link>

            <div className="surface p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span aria-hidden="true">🎓</span> Bài hoàn thành
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold text-slate-900 tabular-nums">
                {summary?.completedLessons ?? 0}
                <span className="ml-1 text-sm font-semibold text-slate-400">/ {summary?.totalLessons ?? 25}</span>
              </p>
              <ProgressBar
                value={summary?.completedLessons ?? 0}
                max={summary?.totalLessons || 25}
                variant="success"
                size="sm"
                className="mt-2"
              />
            </div>
          </section>
        )}

        {/* ───────── Roadmap + side panels ───────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          <section className="xl:col-span-2 space-y-5" aria-labelledby="roadmap-title">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 id="roadmap-title" className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentUser ? "Lộ trình của bạn" : "Lộ trình học"}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Mỗi bài gồm 6 kỹ năng — hoàn thành lần lượt để mở rộng vốn tiếng Nhật.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {n4Level && (
                  <div className="inline-flex rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Chọn cấp độ">
                    {(["N5", "N4"] as LevelTab[]).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={levelTab === tab}
                        onClick={() => setLevelTab(tab)}
                        className={cn(
                          "px-4 py-1.5 rounded-lg text-sm font-bold transition-all cursor-pointer",
                          levelTab === tab ? "bg-white text-indigo-800 shadow-sm" : "text-slate-500 hover:text-slate-800",
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                )}
                <Link to={`/${tabPrefix}/lessons`} className="text-sm font-bold text-indigo-700 hover:text-indigo-900 whitespace-nowrap">
                  Xem tất cả →
                </Link>
              </div>
            </div>

            {tabLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="surface h-[300px] skeleton-shimmer" />
                ))}
              </div>
            ) : upcoming.length === 0 ? (
              <div className="surface p-10 text-center">
                <p className="text-4xl mb-2">🌱</p>
                <p className="font-bold text-slate-800">Chưa có bài học nào</p>
                <p className="text-sm text-slate-500 mt-1">Hãy kiểm tra kết nối backend hoặc thử lại sau.</p>
              </div>
            ) : (
              <div className="stagger grid grid-cols-1 sm:grid-cols-2 gap-4">
                {upcoming.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    levelPrefix={tabPrefix}
                    progress={progressMap.get(lesson.id)}
                    current={!!currentUser && current?.lesson.id === lesson.id}
                  />
                ))}
              </div>
            )}
          </section>

          <aside className="space-y-5">
            {currentUser && (
              <div className="surface p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-extrabold text-slate-900">Tuần này</h3>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                    <StreakFlame active={stats.streak > 0} className="text-xs" /> {stats.streak} ngày
                  </span>
                </div>
                <WeekStrip week={stats.week} />
              </div>
            )}

            {currentUser ? (
              <div className="surface p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-extrabold text-slate-900">Thành thạo theo kỹ năng</h3>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                    {summary?.overallProgress ?? 0}%
                  </span>
                </div>
                <div className="space-y-3.5">
                  {SKILLS.filter((s) => s.masteryField).map((skill) => {
                    const value = summary?.[skill.masteryField!] ?? 0;
                    return (
                      <div key={skill.key}>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                          <span>
                            {skill.emoji} {skill.label}
                          </span>
                          <span className={skill.text}>{value}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={cn("h-full rounded-full transition-all duration-700", skill.bar)}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Link
                  to="/progress"
                  className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 hover:text-indigo-700"
                >
                  <span>Xem báo cáo chi tiết</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            ) : (
              <div className="surface p-5">
                <h3 className="font-display font-extrabold text-slate-900 mb-3">Bạn sẽ nhận được</h3>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  {["Lưu tiến độ trên mọi thiết bị", "Chuỗi ngày học & mục tiêu XP", "Ôn tập đúng lúc sắp quên", "Đánh dấu từ yêu thích"].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-600" aria-hidden="true">✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3">
              <Link to="/beginner" className="surface surface-hover p-4 flex items-center gap-4 group">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-200 text-rose-700 font-japanese font-extrabold text-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                  あ
                </span>
                <div className="min-w-0">
                  <p className="font-display font-bold text-slate-900 text-sm">Bảng chữ cái &amp; phát âm</p>
                  <p className="text-xs text-slate-500 mt-0.5">Hiragana, Katakana, đếm số</p>
                </div>
              </Link>
              <Link to="/handbook" className="surface surface-hover p-4 flex items-center gap-4 group">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 text-2xl flex items-center justify-center group-hover:-rotate-6 transition-transform">
                  📝
                </span>
                <div className="min-w-0">
                  <p className="font-display font-bold text-slate-900 text-sm">Sổ tay tra cứu</p>
                  <p className="text-xs text-slate-500 mt-0.5">Ngữ pháp, từ vựng, hội thoại</p>
                </div>
              </Link>
            </div>
          </aside>
        </div>

        {/* ───────── Features (guests) ───────── */}
        {!currentUser && (
          <section aria-labelledby="features-title" className="space-y-5">
            <h2 id="features-title" className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
              Mọi thứ bạn cần để tiến bộ
            </h2>
            <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="surface surface-hover p-5">
                  <span className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-2xl", f.tone)}>
                    {f.emoji}
                  </span>
                  <h3 className="font-display font-bold text-slate-900 mt-4">{f.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
