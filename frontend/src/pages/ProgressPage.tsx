import React from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { progressApi } from "../services/progressApi";
import AppShell from "../components/layout/AppShell";
import PageContainer from "../components/layout/PageContainer";
import ProgressSummaryCard from "../components/progress/ProgressSummaryCard";
import LessonProgressCard from "../components/progress/LessonProgressCard";
import { useGamification } from "../lib/gamification";
import { DailyGoalRing, StreakFlame, WeekStrip } from "../components/gamification/GamificationWidgets";
import LeaderboardView from "../components/gamification/LeaderboardView";
import BadgesGrid from "../components/gamification/BadgesGrid";
import { cn } from "../utils/cn";

/** Real, locally & remotely tracked learning habit: streak, daily goal, level and last 7 days. */
function LearningHabitCard() {
  const g = useGamification();
  return (
    <section className="surface rounded-3xl p-5 sm:p-6 shadow-zen border border-[#E7E0D2] animate-fade-up" aria-label="Thói quen học tập">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <DailyGoalRing value={g.xpToday} goal={g.dailyGoal} size={104} strokeWidth={10}>
          <span className="font-display text-xl font-extrabold text-slate-900 dark:text-slate-100">{g.xpToday}</span>
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">/ {g.dailyGoal} XP</span>
        </DailyGoalRing>

        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <StreakFlame active={g.activeToday} className="w-7 h-7" />
              <div>
                <div className="font-display text-lg font-extrabold text-slate-900 dark:text-slate-100 leading-none">{g.streak} ngày</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Kỷ lục {g.bestStreak} ngày</div>
              </div>
            </div>
            <div>
              <div className="font-display text-lg font-extrabold text-slate-900 dark:text-slate-100 leading-none">
                Lv.{g.level} · {g.levelTitle}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{g.totalXp} XP tích lũy</div>
            </div>
          </div>
          <div>
            <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500 transition-all duration-700"
                style={{ width: `${g.levelPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
              {g.levelXp}/{g.levelSpan} XP để lên cấp {g.level + 1}
            </div>
          </div>
        </div>

        <WeekStrip week={g.week} className="md:self-center" />
      </div>
    </section>
  );
}

export default function ProgressPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser, loading: authLoading } = useAuth();

  const activeTab = searchParams.get("tab") || "overview";

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    if (tab === "overview") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    setSearchParams(params);
  };

  // 1. Auth check
  if (authLoading) {
    return (
      <AppShell>
        <PageContainer className="py-20 text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Đang kiểm tra thông tin đăng nhập...</p>
        </PageContainer>
      </AppShell>
    );
  }

  // 2. Data fetching (only when logged in and on overview)
  const {
    data: summary,
    isLoading: isLoadingSummary,
    error: errorSummary,
    refetch: refetchSummary,
  } = useQuery({
    queryKey: ["progress-summary"],
    queryFn: progressApi.getProgressSummary,
    enabled: !!currentUser && activeTab === "overview",
  });

  const {
    data: lessonProgresses,
    isLoading: isLoadingLessons,
    error: errorLessons,
    refetch: refetchLessons,
  } = useQuery({
    queryKey: ["progress-lessons"],
    queryFn: progressApi.getLessonProgresses,
    enabled: !!currentUser && activeTab === "overview",
  });

  const isLoading = !!currentUser && (isLoadingSummary || isLoadingLessons);
  const hasError = !!currentUser && (errorSummary || errorLessons);

  const handleRetry = () => {
    refetchSummary();
    refetchLessons();
  };

  return (
    <AppShell>
      <PageContainer className="py-6 sm:py-8 pb-28 lg:pb-12 space-y-6">
        {/* Banner Section */}
        <div className="hero-ink pattern-seigaiha rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-zen animate-fade-up">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl relative z-10 space-y-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
              Dashboard cá nhân • 進捗
            </span>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              {currentUser
                ? `Tiến Độ Học Tập Của ${currentUser.fullName || currentUser.email}`
                : "Trung Tâm Thành Tích & Tiến Độ Học Tập"}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Theo dõi chi tiết mức độ hoàn thành bài học, bảng xếp hạng vinh danh và bộ sưu tập huy hiệu đạt được!
            </p>
          </div>
        </div>

        {/* Learning Habit & Daily Goal Ring */}
        <LearningHabitCard />

        {/* Tab Navigation Controls (Overview, Leaderboard, Badges) */}
        <div className="surface rounded-3xl p-2.5 sm:p-3 border border-[#E7E0D2] shadow-zen flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => handleTabChange("overview")}
            className={cn(
              "px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap",
              activeTab === "overview"
                ? "bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
            )}
          >
            <span>📊</span>
            <span>Tiến độ bài học & Kỹ năng</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("leaderboard")}
            className={cn(
              "px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap",
              activeTab === "leaderboard"
                ? "bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
            )}
          >
            <span>🏆</span>
            <span>Bảng xếp hạng (Leaderboard)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("badges")}
            className={cn(
              "px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap",
              activeTab === "badges"
                ? "bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
            )}
          >
            <span>🎖️</span>
            <span>Bộ sưu tập Huy hiệu (Badges)</span>
          </button>
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* Loading State */}
            {isLoading && (
              <div className="surface rounded-3xl p-16 text-center border border-[#E7E0D2] shadow-zen space-y-2">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Đang tải dữ liệu tiến độ học tập...</p>
              </div>
            )}

            {/* Error State */}
            {!isLoading && hasError && (
              <div className="surface rounded-3xl p-8 border border-rose-300 bg-rose-50/50 dark:bg-rose-950/20 text-center max-w-md mx-auto my-6 space-y-3">
                <div className="text-3xl">⚠️</div>
                <h3 className="font-bold text-base text-rose-900 dark:text-rose-200">Không thể tải dữ liệu tiến độ</h3>
                <p className="text-xs text-rose-700 dark:text-rose-400">
                  Đã xảy ra lỗi khi kết nối với máy chủ. Vui lòng thử lại.
                </p>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Thử lại
                </button>
              </div>
            )}

            {/* Guest Invitation State */}
            {!currentUser && (
              <div className="surface rounded-3xl p-6 sm:p-8 border border-indigo-200 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/70 via-white to-amber-50/40 dark:from-indigo-950/20 dark:via-slate-900 dark:to-amber-950/20 shadow-zen text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl font-bold">
                  🔐
                </div>
                <div className="max-w-md mx-auto space-y-1">
                  <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    Đăng nhập để theo dõi bài học & đồng bộ đám mây
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Bạn hiện đang tích lũy XP và chuỗi ngày học trên trình duyệt này. Hãy đăng nhập để lưu trữ vĩnh viễn trên máy chủ, vinh danh trên Bảng xếp hạng và mở khóa huy hiệu chính thức.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    to="/login"
                    state={{ from: location }}
                    className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    Đăng nhập ngay
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 transition-all"
                  >
                    Đăng ký tài khoản
                  </Link>
                </div>
              </div>
            )}

            {/* Content Display */}
            {currentUser && !isLoading && !hasError && (
              <div className="space-y-6">
                {summary && <ProgressSummaryCard summary={summary} />}
                {lessonProgresses && lessonProgresses.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                      Tiến độ bài học ({lessonProgresses.length} bài)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {lessonProgresses.map((l) => (
                        <LessonProgressCard key={l.lessonId} lesson={l} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: LEADERBOARD */}
        {activeTab === "leaderboard" && (
          <div className="animate-fade-in">
            <LeaderboardView />
          </div>
        )}

        {/* Tab 3: BADGES */}
        {activeTab === "badges" && (
          <div className="animate-fade-in">
            <BadgesGrid />
          </div>
        )}
      </PageContainer>
    </AppShell>
  );
}
