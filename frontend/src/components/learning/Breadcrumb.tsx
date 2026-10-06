import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("w-full overflow-x-auto no-scrollbar py-2 text-xs sm:text-sm", className)}
    >
      <ol className="flex items-center space-x-1.5 whitespace-nowrap text-[#64748B]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;

          return (
            <li key={index} className="inline-flex items-center space-x-1.5">
              {index > 0 && (
                <span className="text-[#CBD5E1] select-none" aria-hidden="true">
                  /
                </span>
              )}

              {isLast ? (
                <span
                  className="font-semibold text-[#0F172A] truncate max-w-[200px] sm:max-w-none"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  to={item.href}
                  className="text-[#64748B] hover:text-[#2684D9] transition-colors truncate max-w-[150px] sm:max-w-none focus-visible:outline-2 focus-visible:outline-[#2684D9] rounded-[4px]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#64748B] truncate max-w-[150px] sm:max-w-none">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
