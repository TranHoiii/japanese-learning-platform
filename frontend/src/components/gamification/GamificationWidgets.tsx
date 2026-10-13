import React from "react";
import { WeekDay } from "../../lib/gamification";
import { cn } from "../../utils/cn";

/* ───────────────────────── Streak flame ───────────────────────── */

export const StreakFlame: React.FC<{ active: boolean; className?: string }> = ({ active, className }) => (
  <span
    aria-hidden="true"
    className={cn(
      "inline-block leading-none select-none",
      active ? "animate-flame" : "grayscale opacity-50",
      className,
    )}
  >
    🔥
  </span>
);

/* ───────────────────────── Daily goal ring ───────────────────────── */

export interface DailyGoalRingProps {
  value: number; // xp earned today
  goal: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

export const DailyGoalRing: React.FC<DailyGoalRingProps> = ({
  value,
  goal,
  size = 120,
  strokeWidth = 11,
  className,
  children,
}) => {
  const percent = Math.min(100, Math.round((value / goal) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const reached = value >= goal;
  const gradientId = React.useId();

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center shrink-0 rounded-full",
        reached && "goal-ring-glow",
        className,
      )}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Mục tiêu hôm nay: ${value} trên ${goal} XP, ${percent}%`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            {reached ? (
              <>
                <stop offset="0%" stopColor="#FBCB4A" />
                <stop offset="100%" stopColor="#E99A0C" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#5F8ACB" />
                <stop offset="100%" stopColor="#2F5496" />
              </>
            )}
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F3EEE5"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percent / 100) * circumference}
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children ?? (
          <>
            <span className="font-display text-2xl font-extrabold text-slate-900 tabular-nums leading-none">
              {value}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 mt-1">/ {goal} XP</span>
          </>
        )}
      </div>
    </div>
  );
};

/* ───────────────────────── Week streak strip ───────────────────────── */

export const WeekStrip: React.FC<{ week: WeekDay[]; className?: string }> = ({ week, className }) => (
  <ol className={cn("grid grid-cols-7 gap-1.5", className)} aria-label="Hoạt động học trong tuần">
    {week.map((d) => (
      <li key={d.date} className="flex flex-col items-center gap-1.5">
        <span
          className={cn(
            "text-[11px] font-bold uppercase tracking-wide",
            d.isToday ? "text-indigo-700" : "text-slate-400",
          )}
        >
          {d.label}
        </span>
        <span
          title={d.active ? `${d.xp} XP` : d.isFuture ? "Sắp tới" : "Chưa học"}
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all",
            d.active
              ? "bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950 shadow-[0_2px_6px_-1px_rgba(233,154,12,0.6)]"
              : d.isToday
                ? "bg-white border-2 border-dashed border-indigo-300 text-indigo-400"
                : d.isFuture
                  ? "bg-slate-50 text-slate-300"
                  : "bg-slate-100 text-slate-300",
          )}
        >
          {d.active ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
          )}
        </span>
      </li>
    ))}
  </ol>
);

/* ───────────────────────── Daily goal picker ───────────────────────── */

export const GoalPicker: React.FC<{
  value: number;
  options: readonly number[];
  onChange: (goal: number) => void;
}> = ({ value, options, onChange }) => {
  const labels: Record<number, string> = { 20: "Nhẹ nhàng", 50: "Đều đặn", 100: "Nghiêm túc" };
  return (
    <div role="radiogroup" aria-label="Mục tiêu XP mỗi ngày" className="grid grid-cols-3 gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-xl border px-2 py-2 text-center transition-all cursor-pointer",
            value === opt
              ? "border-indigo-500 bg-indigo-50 text-indigo-800 shadow-sm"
              : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300",
          )}
        >
          <span className="block text-sm font-extrabold tabular-nums">{opt} XP</span>
          <span className="block text-[10px] font-medium opacity-80">{labels[opt] ?? ""}</span>
        </button>
      ))}
    </div>
  );
};
