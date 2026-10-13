import React from "react";
import { Outlet } from "react-router-dom";
import AppShell from "../layout/AppShell";
import PageContainer from "../layout/PageContainer";
import Breadcrumb, { BreadcrumbItem } from "./Breadcrumb";
import { cn } from "../../utils/cn";

export interface LearningLayoutProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  subtitle?: string;
  description?: string;
  actions?: React.ReactNode;
  narrow?: boolean;
  withShell?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const LearningLayout: React.FC<LearningLayoutProps> = ({
  breadcrumbs,
  title,
  subtitle,
  description,
  actions,
  narrow = false,
  withShell = true,
  children,
  className,
}) => {
  const content = (
    <PageContainer narrow={narrow} className={cn("py-6 sm:py-8 pb-28 lg:pb-12 space-y-6", className)}>
      {/* Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} className="mb-2" />
      )}

      {/* Header section (Title, Description, Actions) */}
      {(title || description || actions || subtitle) && (
        <div className="hero-ink pattern-seigaiha relative overflow-hidden rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-white animate-fade-up">
          <div className="space-y-1">
            {subtitle && (
              <span className="inline-block text-xs font-bold text-amber-300 uppercase tracking-wider">
                {subtitle}
              </span>
            )}
            {title && (
              <h1 className="text-[26px] sm:text-[32px] font-extrabold text-white leading-tight font-display">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Main Body Content */}
      <div className="w-full">
        {children || <Outlet />}
      </div>
    </PageContainer>
  );

  if (withShell) {
    return <AppShell>{content}</AppShell>;
  }

  return content;
};

export default LearningLayout;
