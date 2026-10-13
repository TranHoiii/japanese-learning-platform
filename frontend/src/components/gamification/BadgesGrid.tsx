import React from "react";
import { BadgeItem } from "../../types/gamification";
import { useGamification, getSystemBadges } from "../../lib/gamification";
import { cn } from "../../utils/cn";

interface BadgesGridProps {
  customBadges?: BadgeItem[];
}

const TIER_CONFIG = {
  BRONZE: {
    label: "Đồng (Cu)",
    borderClass: "border-amber-700/30 dark:border-amber-800",
    badgeClass: "bg-amber-800/10 text-amber-800 dark:text-amber-300",
  },
  SILVER: {
    label: "Bạc (Ag)",
    borderClass: "border-slate-300 dark:border-slate-600",
    badgeClass: "bg-slate-200/80 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
  },
  GOLD: {
    label: "Vàng (Au)",
    borderClass: "border-amber-400 dark:border-amber-500",
    badgeClass: "bg-amber-400/20 text-amber-800 dark:text-amber-300",
  },
  DIAMOND: {
    label: "Kim Cương",
    borderClass: "border-indigo-400 dark:border-indigo-500 shadow-md",
    badgeClass: "bg-indigo-500/20 text-indigo-800 dark:text-indigo-300",
  },
};

export const BadgesGrid: React.FC<BadgesGridProps> = ({ customBadges }) => {
  const snapshot = useGamification();
  const badges = customBadges && customBadges.length > 0 ? customBadges : getSystemBadges(snapshot);
  const unlockedCount = badges.filter((b) => b.isUnlocked).length;

  return (
    <div className="space-y-6">
      {/* Header bar with counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-sm flex items-center justify-center font-mincho">
              章
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-display">
              Bộ Sưu Tập Huy Hiệu (Badges & Trophies)
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mỗi huy hiệu đánh dấu một cột mốc quan trọng trên con đường làm chủ tiếng Nhật.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 self-start sm:self-auto text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Đã mở:</span>
          <span className="text-rose-600 dark:text-rose-400 font-black">
            {unlockedCount} / {badges.length}
          </span>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => {
          const tier = TIER_CONFIG[badge.tier] || TIER_CONFIG.BRONZE;

          return (
            <div
              key={badge.id}
              className={cn(
                "surface rounded-3xl p-5 border shadow-2xs transition-all relative overflow-hidden flex flex-col justify-between group",
                tier.borderClass,
                badge.isUnlocked
                  ? "hover:shadow-zen hover:-translate-y-0.5"
                  : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100",
              )}
            >
              {/* Unlocked stamp watermark */}
              {badge.isUnlocked && (
                <div
                  aria-hidden="true"
                  className="absolute -right-3 -bottom-3 text-6xl font-mincho font-black text-rose-500/5 select-none pointer-events-none"
                >
                  済
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {badge.icon}
                  </div>

                  <span
                    className={cn(
                      "text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider",
                      tier.badgeClass,
                    )}
                  >
                    {tier.label}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex items-baseline gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {badge.title}
                    </h4>
                    <span className="text-[11px] font-mincho text-slate-400 font-bold">
                      {badge.japaneseTitle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Progress track */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className={badge.isUnlocked ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}>
                    {badge.isUnlocked ? "✓ Đã mở khóa" : "Đang thực hiện"}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 tabular-nums">
                    {badge.current} / {badge.target}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      badge.isUnlocked ? "bg-emerald-500" : "bg-amber-500",
                    )}
                    style={{ width: `${badge.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgesGrid;
