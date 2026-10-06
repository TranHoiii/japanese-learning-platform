import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../utils/cn";
import Badge, { BadgeVariant } from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";

export interface BeginnerSectionProps {
  id?: string;
  icon?: string | React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  badgeVariant?: BadgeVariant;
  actionLink?: string;
  actionText?: string;
  children: React.ReactNode;
  className?: string;
}

export const BeginnerSection: React.FC<BeginnerSectionProps> = ({
  id,
  icon,
  title,
  subtitle,
  description,
  badge,
  badgeVariant = "primary",
  actionLink,
  actionText,
  children,
  className,
}) => {
  return (
    <section
      id={id}
      className={cn(
        "rounded-[16px] bg-white border border-[#E2E8F0] p-5 sm:p-7 shadow-[0_1px_3px_rgba(15,23,42,0.06)] space-y-6 transition-all",
        className,
      )}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
        <div className="flex items-start gap-3.5">
          {icon && (
            <div className="w-11 h-11 rounded-[10px] bg-[#F0F7FF] text-[#12558F] border border-[#BBDDFF] flex items-center justify-center text-xl shrink-0 font-japanese font-bold select-none shadow-xs">
              {icon}
            </div>
          )}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2
                id={id ? `${id}-heading` : undefined}
                className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight"
              >
                {title}
              </h2>
              {badge && (
                <Badge variant={badgeVariant} size="sm">
                  {badge}
                </Badge>
              )}
            </div>
            {subtitle && (
              <p className="text-xs font-semibold uppercase tracking-wider text-[#12558F]">
                {subtitle}
              </p>
            )}
            {description && (
              <p className="text-sm text-[#64748B] leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </div>

        {actionLink && actionText && (
          <div className="shrink-0 self-start sm:self-center">
            <Link to={actionLink}>
              <Button variant="secondary" size="sm">
                <span>{actionText}</span>
                <span aria-hidden="true">&rarr;</span>
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="w-full">{children}</div>
    </section>
  );
};

export default BeginnerSection;
