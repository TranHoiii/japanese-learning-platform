import React from "react";
import { cn } from "../../utils/cn";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
  ...props
}) => {
  const defaultIcon = (
    <svg
      className="w-10 h-10 text-[#94A3B8]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  );

  return (
    <div
      className={cn(
        "rounded-[12px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC]/60 p-8 sm:p-12 text-center max-w-md mx-auto my-6 flex flex-col items-center justify-center space-y-3",
        className,
      )}
      {...props}
    >
      <div className="w-14 h-14 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B] shrink-0 mb-1">
        {icon || defaultIcon}
      </div>

      <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-[#64748B] max-w-sm leading-relaxed">
          {description}
        </p>
      )}

      {action && <div className="pt-2 flex items-center justify-center">{action}</div>}
    </div>
  );
};

export default EmptyState;
