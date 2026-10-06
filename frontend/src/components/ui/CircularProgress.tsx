import React from "react";
import { cn } from "../../utils/cn";

export interface CircularProgressProps {
  value: number; // 0 to 100
  size?: number; // size in px, default 48
  strokeWidth?: number; // default 4
  color?: string; // stroke color class
  trackColor?: string; // track color class
  showText?: boolean;
  textClassName?: string;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 48,
  strokeWidth = 4,
  color = "text-indigo-600",
  trackColor = "text-slate-200",
  showText = true,
  textClassName,
  className,
}) => {
  const percentage = Math.min(Math.max(0, Math.round(value)), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center select-none", className)}
      style={{ width: size, height: size }}
    >
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className={trackColor}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className={cn("transition-all duration-500 ease-out", color)}
        />
      </svg>
      {showText && (
        <span
          className={cn(
            "absolute text-xs font-bold text-slate-800 tabular-nums",
            textClassName
          )}
        >
          {percentage}
        </span>
      )}
    </div>
  );
};

export default CircularProgress;
