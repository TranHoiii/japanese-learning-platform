import React from "react";
import { cn } from "../../utils/cn";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to max
  max?: number;
  label?: string;
  showValueText?: boolean;
  size?: "sm" | "default" | "lg";
  variant?: "primary" | "success" | "warning" | "error" | "gold" | "sakura";
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValueText = false,
  size = "default",
  variant = "primary",
  className,
  ...props
}) => {
  const percentage = Math.min(Math.max(0, Math.round((value / max) * 100)), 100);

  const heightClasses = {
    sm: "h-1.5",
    default: "h-2",
    lg: "h-3",
  };

  const fillColors = {
    primary: "bg-gradient-to-r from-[#3E69B3] to-[#2F5496]",
    success: "bg-gradient-to-r from-[#88AF5A] to-[#6C9644]",
    warning: "bg-gradient-to-r from-[#F6B722] to-[#E99A0C]",
    error: "bg-gradient-to-r from-[#F77A99] to-[#DC4A4A]",
    gold: "bg-gradient-to-r from-[#FBCB4A] to-[#E99A0C]",
    sakura: "bg-gradient-to-r from-[#FFA3B7] to-[#E8527C]",
  };

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {(label || showValueText) && (
        <div className="flex justify-between items-center text-xs font-medium text-[#5A5246]">
          {label && <span>{label}</span>}
          {showValueText && <span className="tabular-nums font-semibold text-[#1F1C18]">{percentage}%</span>}
        </div>
      )}

      <div
        className={cn(
          "w-full bg-[#F3EEE5] rounded-full overflow-hidden transition-all",
          heightClasses[size],
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `${percentage}% hoàn thành`}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", fillColors[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
