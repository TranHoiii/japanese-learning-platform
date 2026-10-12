import React from "react";
import { gamification, DAILY_GOAL_OPTIONS, GamificationSnapshot } from "../../lib/gamification";
import { DailyGoalRing, GoalPicker, StreakFlame, WeekStrip } from "./GamificationWidgets";
import { ProgressBar } from "../ui/ProgressBar";

/** Panel opened from the header chips: today's goal, week streak, level, goal picker. */
export const StatsPopover: React.FC<{ stats: GamificationSnapshot; className?: string }> = ({
  stats,
  className,
}) => {
  const remaining = Math.max(0, stats.dailyGoal - stats.xpToday);

  return (
    <div
      className={className}
      role="dialog"
      aria-label="Thống kê học tập hôm nay"
    >
      <div className="flex items-center gap-4">
        <DailyGoalRing value={stats.xpToday} goal={stats.dailyGoal} size={92} strokeWidth={9} />
        <div className="min-w-0">
          <p className="font-display font-extrabold text-slate-900 text-base leading-tight">
            {stats.goalReached ? "Đã đạt mục tiêu! 🎉" : "Mục tiêu hôm nay"}
          </p>
          <p className="text-xs text-slate-500 mt-1 leading-snug">
            {stats.goalReached
              ? "Học thêm để tăng XP và lên cấp nhanh hơn."
              : stats.xpToday === 0
                ? `Hoàn thành một thẻ hoặc bài học để nhận XP đầu tiên.`
                : `Còn ${remaining} XP nữa là đạt mục tiêu.`}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200/70 p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StreakFlame active={stats.streak > 0} className="text-xl" />
            <div>
              <p className="text-sm font-bold text-slate-900 leading-none">
                {stats.streak} ngày liên tiếp
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Kỷ lục: {stats.bestStreak} ngày</p>
            </div>
          </div>
          {stats.streakAtRisk && (
            <span className="text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-200 rounded-full px-2 py-0.5">
              Học hôm nay để giữ chuỗi!
            </span>
          )}
        </div>
        <WeekStrip week={stats.week} />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-bold text-slate-800">
            Cấp {stats.level} · <span className="font-medium text-slate-500">{stats.levelTitle}</span>
          </span>
          <span className="tabular-nums text-slate-500">
            {stats.levelXp}/{stats.levelSpan} XP
          </span>
        </div>
        <ProgressBar value={stats.levelPercent} variant="sakura" size="default" />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Mục tiêu mỗi ngày
        </p>
        <GoalPicker
          value={stats.dailyGoal}
          options={DAILY_GOAL_OPTIONS}
          onChange={(goal) => gamification.setDailyGoal(goal)}
        />
      </div>
    </div>
  );
};

export default StatsPopover;
