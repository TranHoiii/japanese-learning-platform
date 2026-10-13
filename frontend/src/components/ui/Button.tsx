import React from "react";
import { cn } from "../../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "sakura" | "success";
export type ButtonSize = "default" | "large" | "sm";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  /** Chunky 3D bottom edge — use for the single main call to action on a screen. */
  tactile?: boolean;
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
      tactile = false,
      disabled = false,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-[12px] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E69B3] disabled:opacity-50 disabled:pointer-events-none select-none text-center cursor-pointer active:scale-[0.98]";

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-[#2F5496] text-white hover:bg-[#264378] active:bg-[#213960] shadow-[0_2px_8px_-2px_rgba(47,84,150,0.5)]",
      secondary:
        "bg-[#EEF3FA] text-[#213960] border border-[#BDD0EC] hover:bg-[#DCE7F5] active:bg-[#BDD0EC]",
      outline:
        "bg-white text-[#433D34] border border-[#D3CABA] hover:bg-[#FAF7F1] hover:border-[#9A8F7E] hover:text-[#1F1C18] active:bg-[#F3EEE5]",
      ghost:
        "bg-transparent text-[#5A5246] hover:text-[#1F1C18] hover:bg-[#F3EEE5] active:bg-[#E7E0D2]",
      danger:
        "bg-[#DC4A4A] text-white hover:bg-[#B42323] active:bg-[#991B1B] shadow-xs",
      sakura:
        "bg-[#E8527C] text-white hover:bg-[#CF3565] active:bg-[#AB2751] shadow-[0_2px_8px_-2px_rgba(232,82,124,0.5)]",
      success:
        "bg-[#6C9644] text-white hover:bg-[#567B34] active:bg-[#446129] shadow-[0_2px_8px_-2px_rgba(108,150,68,0.5)]",
    };

    const tactileEdge: Record<ButtonVariant, string> = {
      primary: "[--press-edge:#1D3050]",
      sakura: "[--press-edge:#8A2043]",
      success: "[--press-edge:#374E23]",
      secondary: "[--press-edge:#92B2DD]",
      outline: "[--press-edge:#D3CABA]",
      ghost: "[--press-edge:#D3CABA]",
      danger: "[--press-edge:#8A1A1A]",
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: "h-9 px-3.5 text-xs sm:text-sm gap-1.5 min-h-[36px]",
      default: "h-11 px-5 text-sm gap-2 min-h-[44px]",
      large: "h-12 px-6 text-base gap-2.5 min-h-[48px]",
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
          tactile && "btn-press active:scale-100",
          tactile && tactileEdge[variant],
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
