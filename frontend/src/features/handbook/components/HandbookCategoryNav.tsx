import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HANDBOOK_CATEGORIES } from "../data/categories";
import { getArticleCountByCategory } from "../data/articles";
import { HandbookCategoryType } from "../types";

interface HandbookCategoryNavProps {
  currentCategory?: HandbookCategoryType | "all";
  onSelectCategory?: (category: HandbookCategoryType | "all") => void;
  className?: string;
  variant?: "pills" | "cards";
}

export const HandbookCategoryNav: React.FC<HandbookCategoryNavProps> = ({
  currentCategory,
  onSelectCategory,
  className = "",
  variant = "pills",
}) => {
  const location = useLocation();

  if (variant === "cards") {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {HANDBOOK_CATEGORIES.map((cat) => {
          const count = getArticleCountByCategory(cat.id);
          const isCurrent = currentCategory === cat.id;

          return (
            <Link
              key={cat.id}
              to={`/handbook/${cat.id}`}
              className={`group flex flex-col p-5 rounded-2xl border transition-all duration-200 bg-white hover:shadow-md hover:-translate-y-0.5 ${
                isCurrent
                  ? "border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-xs"
                  : "border-[#E2E8F0] hover:border-[#CBD5E1]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl p-2.5 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#475569]">
                  {count} bài viết
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors flex items-center justify-between">
                <span>{cat.name}</span>
                <span className="text-xs font-normal text-[#94A3B8] font-japanese" lang="ja">
                  {cat.japaneseName}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-2 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </Link>
          );
        })}
      </div>
    );
  }

  // Variant "pills" for category bar
  return (
    <nav
      aria-label="Danh mục sổ tay"
      className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none ${className}`}
    >
      <Link
        to="/handbook"
        onClick={() => onSelectCategory?.("all")}
        className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
          !currentCategory || currentCategory === "all" || location.pathname === "/handbook"
            ? "bg-[#2563EB] text-white shadow-xs"
            : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
        }`}
      >
        <span>🌟</span>
        <span>Tất cả</span>
      </Link>

      {HANDBOOK_CATEGORIES.map((cat) => {
        const isCurrent = currentCategory === cat.id;
        const count = getArticleCountByCategory(cat.id);

        return (
          <Link
            key={cat.id}
            to={`/handbook/${cat.id}`}
            onClick={() => onSelectCategory?.(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              isCurrent
                ? "bg-[#2563EB] text-white shadow-xs"
                : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                isCurrent ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"
              }`}
            >
              {count}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
