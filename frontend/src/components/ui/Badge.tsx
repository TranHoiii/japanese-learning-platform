import React from "react";
import { cn } from "../../utils/cn";

export type BadgeVariant = "primary" | "neutral" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      children,
      ...props
    },
    ref,
  ) => {
    const variantStyles: Record<BadgeVariant, string> = {
      primary: "bg-[#F0F7FF] text-[#12558F] border border-[#BBDDFF]",
      neutral: "bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]",
      success: "bg-[#F0FDF4] text-[#15803D] border border-[#22C55E]/30",
      warning: "bg-[#FFFBEB] text-[#B45309] border border-[#F59E0B]/30",
      error: "bg-[#FEF2F2] text-[#B91C1C] border border-[#EF4444]/30",
      info: "bg-[#EFF6FF] text-[#1D4ED8] border border-[#3B82F6]/30",
    };

    const sizeStyles: Record<BadgeSize, string> = {
      sm: "px-2 py-0.5 text-[11px] leading-tight font-medium gap-1",
      md: "px-2.5 py-1 text-xs leading-tight font-semibold gap-1.5",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-sans tracking-wide transition-colors select-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {icon && (
          <span className="shrink-0 inline-flex items-center justify-center text-current" aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </span>
    );
  },
);

Badge.displayName = "Badge";

export default Badge;
