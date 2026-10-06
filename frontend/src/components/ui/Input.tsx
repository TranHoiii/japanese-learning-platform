import React from "react";
import { cn } from "../../utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  sizeVariant?: "default" | "large";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = false,
      sizeVariant = "default",
      disabled = false,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const heightClass = sizeVariant === "large" ? "h-11 text-base" : "h-10 text-sm";

    return (
      <div className={cn("flex flex-col space-y-1.5 text-left", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs sm:text-sm font-semibold text-[#334155] select-none"
          >
            {label}
            {props.required && <span className="text-[#EF4444] ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#94A3B8]" aria-hidden="true">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "w-full rounded-[8px] bg-white border px-3.5 py-2 text-[#0F172A] placeholder:text-[#94A3B8] transition-colors focus:outline-none disabled:bg-[#F1F5F9] disabled:text-[#94A3B8] disabled:cursor-not-allowed",
              heightClass,
              leftIcon ? "pl-10" : "pl-3.5",
              rightIcon ? "pr-10" : "pr-3.5",
              error
                ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#FEF2F2]"
                : "border-[#CBD5E1] hover:border-[#94A3B8] focus:border-[#2684D9] focus:ring-2 focus:ring-[#DCEEFF]",
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-[#94A3B8]" aria-hidden="true">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-[#EF4444] font-medium leading-none mt-1">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-xs text-[#64748B] leading-none mt-1">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
