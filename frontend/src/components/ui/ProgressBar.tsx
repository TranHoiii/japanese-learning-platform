import React from "react";
import { cn } from "../../utils/cn";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to max
  max?: number;
  label?: string;
  showValueText?: boolean;
  size?: "sm" | "default" | "lg";
  variant?: "primary" | "success" | "warning" | "error";
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
    primary: "bg-[#2684D9]",
    success: "bg-[#22C55E]",
    warning: "bg-[#F59E0B]",
    error: "bg-[#EF4444]",
  };

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {(label || showValueText) && (
        <div className="flex justify-between items-center text-xs font-medium text-[#475569]">
          {label && <span>{label}</span>}
          {showValueText && <span className="tabular-nums font-semibold text-[#0F172A]">{percentage}%</span>}
        </div>
      )}

      <div
        className={cn(
          "w-full bg-[#E2E8F0] rounded-full overflow-hidden transition-all",
          heightClasses[size],
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `${percentage}% hoàn thành`}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-300 ease-out", fillColors[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
