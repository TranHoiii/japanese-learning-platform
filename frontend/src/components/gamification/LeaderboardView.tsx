import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gamificationApi } from "../../services/gamificationApi";
import { LeaderboardUser } from "../../types/gamification";
import { cn } from "../../utils/cn";

export const LeaderboardView: React.FC = () => {
  const [period, setPeriod] = useState<"weekly" | "all_time">("all_time");

  const { data: users = [], isLoading } = useQuery<LeaderboardUser[]>({
    queryKey: ["leaderboard", period],
    queryFn: () => gamificationApi.getLeaderboard(period),
  });

  const top3 = users.slice(0, 3);
  const remainingUsers = users.slice(3);

  return (
    <div className="space-y-6">
      {/* Header bar with period switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-sm flex items-center justify-center font-mincho">
              番
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-display">
              Bảng Vàng Danh Dự (Leaderboard)
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Vinh danh những học viên kiên trì và tích cực nhất trên hệ thống học tiếng Nhật.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setPeriod("all_time")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
              period === "all_time"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
            )}
          >
            🏆 Toàn thời gian
          </button>
          <button
            type="button"
            onClick={() => setPeriod("weekly")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
              period === "weekly"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
            )}
          >
            ⚡ Tuần này
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="surface rounded-3xl p-12 text-center border border-[#E7E0D2] shadow-zen space-y-2">
          <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Đang cập nhật thứ hạng học viên...</p>
        </div>
      )}

      {!isLoading && users.length > 0 && (
        <div className="space-y-6">
          {/* Top 3 Podium (1st, 2nd, 3rd) */}
          {top3.length >= 3 && (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-4 sm:pt-6 pb-2 items-end max-w-xl mx-auto">
              {/* Rank 2 (Silver) */}
              <div className="surface rounded-3xl p-3 sm:p-4 border-2 border-slate-300 dark:border-slate-600 text-center shadow-zen flex flex-col items-center relative overflow-hidden order-1">
                <div className="absolute top-2 left-2 text-xs font-black px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                  #2
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-slate-300 dark:border-slate-600 overflow-hidden mb-2 shadow-sm">
                  <img
                    src={top3[1].avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"}
                    alt={top3[1].fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                  {top3[1].fullName}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  Lv.{top3[1].level}
                </span>
                <div className="mt-2 text-xs sm:text-sm font-black text-slate-700 dark:text-slate-300 tabular-nums">
                  {top3[1].totalXp} XP
                </div>
              </div>

              {/* Rank 1 (Gold) */}
              <div className="surface rounded-3xl p-4 sm:p-5 border-2 border-amber-400 dark:border-amber-500 text-center shadow-xl flex flex-col items-center relative overflow-hidden bg-gradient-to-b from-amber-500/10 to-transparent order-2 -translate-y-2 sm:-translate-y-4">
                <div className="absolute top-2 left-2 text-xs font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-xs">
                  👑 #1
                </div>
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-3 border-amber-400 dark:border-amber-300 overflow-hidden mb-2 shadow-md">
                  <img
                    src={top3[0].avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                    alt={top3[0].fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 line-clamp-1">
                  {top3[0].fullName}
                </div>
                <span className="text-[11px] text-amber-700 dark:text-amber-400 font-bold line-clamp-1 mt-0.5">
                  {top3[0].levelTitle}
                </span>
                <div className="mt-2 text-sm sm:text-base font-black text-amber-600 dark:text-amber-400 tabular-nums">
                  {top3[0].totalXp} XP
                </div>
              </div>

              {/* Rank 3 (Bronze) */}
              <div className="surface rounded-3xl p-3 sm:p-4 border-2 border-amber-700/40 dark:border-amber-800 text-center shadow-zen flex flex-col items-center relative overflow-hidden order-3">
                <div className="absolute top-2 left-2 text-xs font-black px-2 py-0.5 rounded-full bg-amber-800/20 text-amber-800 dark:text-amber-300">
                  #3
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-amber-700/50 overflow-hidden mb-2 shadow-sm">
                  <img
                    src={top3[2].avatarUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"}
                    alt={top3[2].fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                  {top3[2].fullName}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  Lv.{top3[2].level}
                </span>
                <div className="mt-2 text-xs sm:text-sm font-black text-amber-800 dark:text-amber-300 tabular-nums">
                  {top3[2].totalXp} XP
                </div>
              </div>
            </div>
          )}

          {/* Ranks 4 to 50 List */}
          <div className="surface rounded-3xl p-2 sm:p-4 border border-[#E7E0D2] shadow-zen divide-y divide-slate-100 dark:divide-slate-800">
            {remainingUsers.map((u) => (
              <div
                key={u.userId}
                className={cn(
                  "p-3 sm:p-4 rounded-2xl flex items-center justify-between gap-3 transition-colors",
                  u.isCurrentUser
                    ? "bg-amber-500/10 border border-amber-300 dark:border-amber-700"
                    : "hover:bg-slate-50 dark:hover:bg-slate-850",
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 font-mono font-bold text-xs sm:text-sm text-slate-400 text-center shrink-0">
                    {u.rank}
                  </span>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0">
                    <img
                      src={u.avatarUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"}
                      alt={u.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">
                        {u.fullName}
                      </span>
                      {u.isCurrentUser && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-rose-500 text-white shrink-0">
                          Bạn
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                      Lv.{u.level} • {u.levelTitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-right">
                  {u.streak > 0 && (
                    <span className="hidden sm:inline-flex items-center gap-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                      🔥 {u.streak} ngày
                    </span>
                  )}
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 tabular-nums">
                    {u.totalXp} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardView;
