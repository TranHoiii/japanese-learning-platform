import React from "react";
import { cn } from "../../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "default" | "large" | "sm";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      isLoading = false,
      loadingText,
      icon,
      iconPosition = "left",
      fullWidth = false,
      disabled = false,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-[8px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2684D9] disabled:opacity-50 disabled:pointer-events-none select-none text-center cursor-pointer";

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-[#2684D9] text-white hover:bg-[#1769B0] active:bg-[#12558F] shadow-xs",
      secondary:
        "bg-[#F0F7FF] text-[#12558F] border border-[#BBDDFF] hover:bg-[#DCEEFF] active:bg-[#BBDDFF]",
      outline:
        "bg-white text-[#334155] border border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#0F172A] active:bg-[#F1F5F9]",
      ghost:
        "bg-transparent text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] active:bg-[#E2E8F0]",
      danger:
        "bg-[#EF4444] text-white hover:bg-[#B91C1C] active:bg-[#991B1B] shadow-xs",
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: "h-9 px-3 text-xs sm:text-sm gap-1.5 min-h-[36px]",
      default: "h-10 px-4 text-sm gap-2 min-h-[40px] sm:min-h-[40px]",
      large: "h-11 px-5 text-base gap-2.5 min-h-[44px]",
    };

    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyle,
          className,
        )}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{loadingText || children || "Đang xử lý..."}</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
                {icon}
              </span>
            )}
            {children && <span>{children}</span>}
            {icon && iconPosition === "right" && (
              <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
                {icon}
              </span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
