import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { vocabularyApi } from "../services/vocabularyApi";
import { progressApi } from "../services/progressApi";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import LessonCard from "../components/learning/LessonCard";
import { ProgressBar } from "../components/ui/ProgressBar";
import { cn } from "../utils/cn";
import type { LessonProgressResponse } from "../types/progress";

type Filter = "ALL" | "TODO" | "IN_PROGRESS" | "COMPLETED";

export default function LessonsPage() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const isN4 = location.pathname.startsWith("/n4") || location.pathname.includes("n4");
  const levelPrefix = isN4 ? "n4" : "n5";

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<Filter>("ALL");

  const { data: levels, isLoading: isLoadingLevels, error: errorLevels } = useQuery({
    queryKey: ["levels"],
    queryFn: vocabularyApi.getLevels,
  });

  const targetLevel =
    levels?.find((l) => l.code === (isN4 ? "N4" : "N5")) || (isN4 ? undefined : levels?.[0]);

  const {
    data: lessons,
    isLoading: isLoadingLessons,
    error: errorLessons,
  } = useQuery({
    queryKey: ["lessons", targetLevel?.id],
    queryFn: () => vocabularyApi.getLessonsByLevel(targetLevel!.id),
    enabled: !!targetLevel,
  });

  const { data: lessonProgresses = [] } = useQuery({
    queryKey: ["progress-lessons"],
    queryFn: progressApi.getLessonProgresses,
    enabled: !!currentUser,
  });

  const progressMap = useMemo(() => {
    const map = new Map<number, LessonProgressResponse>();
    lessonProgresses.forEach((p) => map.set(p.lessonId, p));
    return map;
  }, [lessonProgresses]);

  const pct = (id: number) => progressMap.get(id)?.progressPercent ?? 0;

  const counts = useMemo(() => {
    const all = lessons ?? [];
    const completed = all.filter((l) => pct(l.id) >= 100).length;
    const inProgress = all.filter((l) => pct(l.id) > 0 && pct(l.id) < 100).length;
    return { all: all.length, completed, inProgress, todo: all.length - completed - inProgress };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessons, progressMap]);

  /** The lesson to highlight as "next": most recent unfinished, else first unfinished. */
  const currentLessonId = useMemo(() => {
    if (!currentUser || !lessons?.length) return null;
    const touched = lessons
      .filter((l) => pct(l.id) > 0 && pct(l.id) < 100)
      .sort((a, b) =>
        (progressMap.get(b.id)?.lastAccessedAt ?? "").localeCompare(progressMap.get(a.id)?.lastAccessedAt ?? ""),
      );
    return (touched[0] ?? lessons.find((l) => pct(l.id) < 100))?.id ?? null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessons, progressMap, currentUser]);

  const filteredLessons = useMemo(() => {
    if (!lessons) return [];
    const q = searchQuery.toLowerCase().trim();
    return lessons.filter((l) => {
      const matchQuery =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.lessonNumber.toString().includes(q) ||
        (l.description && l.description.toLowerCase().includes(q));
      const p = pct(l.id);
      if (filterStatus === "COMPLETED") return matchQuery && p >= 100;
      if (filterStatus === "IN_PROGRESS") return matchQuery && p > 0 && p < 100;
      if (filterStatus === "TODO") return matchQuery && p === 0;
      return matchQuery;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessons, searchQuery, filterStatus, progressMap]);

  const isLoading = isLoadingLevels || isLoadingLessons;
  const error = errorLevels || errorLessons;
  const overallPercent = counts.all ? Math.round((counts.completed / counts.all) * 100) : 0;

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "ALL", label: "Tất cả", count: counts.all },
    { key: "IN_PROGRESS", label: "Đang học", count: counts.inProgress },
    { key: "TODO", label: "Chưa học", count: counts.todo },
    { key: "COMPLETED", label: "Hoàn thành", count: counts.completed },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-12 space-y-8">
        {/* Hero */}
        <section className="hero-ink pattern-seigaiha relative overflow-hidden rounded-[28px] p-6 sm:p-10 shadow-zen animate-fade-up">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-2 -bottom-14 font-mincho font-extrabold text-[240px] leading-none text-white/[0.07]"
          >
            {isN4 ? "四" : "五"}
          </span>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex rounded-xl bg-white/10 border border-white/20 p-1 backdrop-blur" role="tablist" aria-label="Chọn cấp độ">
                <Link
                  to="/n5/lessons"
                  role="tab"
                  aria-selected={!isN4}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-sm font-bold transition-all",
                    !isN4 ? "bg-white text-indigo-900 shadow" : "text-white/80 hover:text-white",
                  )}
                >
                  🌸 N5
                </Link>
                <Link
                  to="/n4/lessons"
                  role="tab"
                  aria-selected={isN4}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-sm font-bold transition-all",
                    isN4 ? "bg-white text-indigo-900 shadow" : "text-white/80 hover:text-white",
                  )}
                >
                  🍃 N4
                </Link>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight">
                {isN4 ? "Sơ trung cấp N4 · Bài 26 – 50" : "Nền tảng N5 · Bài 1 – 25"}
              </h1>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {isN4
                  ? "Mở rộng với hơn 1.100 từ vựng, 91 mẫu ngữ pháp, 192 chữ Hán, luyện nghe, đọc hiểu và bài tập chuẩn Minna no Nihongo."
                  : "Mỗi bài gồm Từ vựng, Ngữ pháp, Hán tự, Luyện nghe, Đọc hiểu và Bài tập củng cố theo giáo trình Minna no Nihongo."}
              </p>
            </div>

            {currentUser && counts.all > 0 && (
              <div className="w-full lg:w-72 shrink-0 rounded-2xl bg-white/10 border border-white/20 backdrop-blur p-4">
                <div className="flex items-end justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/70">Tiến độ cấp độ</span>
                  <span className="font-display text-3xl font-extrabold tabular-nums leading-none">{overallPercent}%</span>
                </div>
                <div className="mt-3 h-2.5 rounded-full bg-white/15 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-300 to-amber-300 transition-all duration-1000"
                    style={{ width: `${overallPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-white/75">
                  {counts.completed}/{counts.all} bài hoàn thành · {counts.inProgress} đang học
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Filters */}
        <div className="surface p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400" aria-hidden="true">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm bài học (Bài 1, chào hỏi, địa điểm)…"
              aria-label="Tìm bài học"
              className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {currentUser && (
            <div className="flex items-center bg-slate-100 p-1 rounded-xl overflow-x-auto custom-scrollbar-x" role="tablist" aria-label="Lọc theo trạng thái">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={filterStatus === f.key}
                  onClick={() => setFilterStatus(f.key)}
                  className={cn(
                    "px-3.5 py-2 rounded-lg text-xs sm:text-[13px] font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer",
                    filterStatus === f.key ? "bg-white text-indigo-800 shadow-sm" : "text-slate-500 hover:text-slate-900",
                  )}
                >
                  {f.label} <span className="ml-0.5 opacity-60 tabular-nums">{f.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {!currentUser && (
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-900 flex flex-wrap items-center justify-between gap-2">
            <span>Đăng nhập để lưu tiến độ từng bài, nhận XP và giữ chuỗi ngày học.</span>
            <Link to="/login" className="font-bold underline underline-offset-4 hover:text-indigo-700">
              Đăng nhập ngay →
            </Link>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" aria-busy="true" aria-live="polite">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="surface h-[320px] skeleton-shimmer" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-3xl text-center max-w-lg mx-auto" role="alert">
            <div className="text-3xl mb-2">⚠️</div>
            <h3 className="font-bold text-lg mb-1">Không thể tải dữ liệu bài học</h3>
            <p className="text-sm text-rose-600">Vui lòng kiểm tra kết nối với Backend API Spring Boot.</p>
          </div>
        )}

        {/* Empty after filtering */}
        {!isLoading && !error && lessons && filteredLessons.length === 0 && (
          <div className="surface p-12 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-display font-bold text-slate-900">Không tìm thấy bài học phù hợp</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("ALL");
              }}
              className="mt-4 text-sm font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Lessons grid */}
        {!isLoading && !error && filteredLessons.length > 0 && (
          <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                levelPrefix={levelPrefix}
                progress={progressMap.get(lesson.id)}
                current={lesson.id === currentLessonId}
              />
            ))}
          </div>
        )}

        {currentUser && counts.all > 0 && (
          <ProgressBar
            className="sr-only"
            value={counts.completed}
            max={counts.all}
            label={`Đã hoàn thành ${counts.completed} trên ${counts.all} bài`}
          />
        )}
      </main>
    </div>
  );
}
