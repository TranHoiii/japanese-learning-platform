import React from "react";
import { cn } from "../../utils/cn";

export type BadgeVariant = "primary" | "neutral" | "success" | "warning" | "error" | "info" | "sakura" | "gold";
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
      primary: "bg-[#EEF3FA] text-[#213960] border border-[#BDD0EC]",
      neutral: "bg-[#F3EEE5] text-[#5A5246] border border-[#E7E0D2]",
      success: "bg-[#F3F8EC] text-[#446129] border border-[#6C9644]/30",
      warning: "bg-[#FFFAEB] text-[#A25C0A] border border-[#E99A0C]/30",
      error: "bg-[#FEF2F2] text-[#B42323] border border-[#DC4A4A]/30",
      info: "bg-[#EEF3FA] text-[#264378] border border-[#3E69B3]/30",
      sakura: "bg-[#FFF1F4] text-[#AB2751] border border-[#E8527C]/30",
      gold: "bg-[#FFFAEB] text-[#84490F] border border-[#F6B722]/50",
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
