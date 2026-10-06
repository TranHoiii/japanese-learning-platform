import React from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rectangular" | "circular" | "text";
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "rectangular",
  width,
  height,
  style,
  ...props
}) => {
  const variantStyles = {
    rectangular: "rounded-[8px]",
    circular: "rounded-full",
    text: "rounded-[4px] h-4 w-full",
  };

  const dynamicStyle: React.CSSProperties = {
    ...style,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-[#E2E8F0]/80 shrink-0",
        variantStyles[variant],
        className,
      )}
      style={dynamicStyle}
      aria-hidden="true"
      {...props}
    />
  );
};

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className,
}) => {
  return (
    <div className={cn("space-y-2.5 w-full", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          className={cn(
            "h-3.5",
            index === lines - 1 ? "w-2/3" : "w-full",
          )}
        />
      ))}
    </div>
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-[12px] border border-[#E2E8F0] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] space-y-4",
        className,
      )}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex items-center justify-between">
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={60} height={22} className="rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" className="h-5 w-3/4" />
        <Skeleton variant="text" className="h-4 w-1/2" />
      </div>
      <div className="pt-2 border-t border-[#F1F5F9] flex justify-between items-center">
        <Skeleton variant="text" className="h-3 w-1/4" />
        <Skeleton variant="rectangular" width={70} height={28} />
      </div>
    </div>
  );
};

export const PageLoading: React.FC<{ message?: string; className?: string }> = ({
  message = "Đang tải dữ liệu...",
  className,
}) => {
  return (
    <div
      className={cn("flex flex-col items-center justify-center py-16 px-4", className)}
      role="status"
      aria-live="polite"
    >
      <div className="relative w-10 h-10 mb-3">
        <div className="w-10 h-10 rounded-full border-3 border-[#DCEEFF] border-t-[#2684D9] animate-spin" />
      </div>
      <p className="text-sm font-medium text-[#475569]">{message}</p>
    </div>
  );
};

export default Skeleton;
