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
                  ? "border-[#2F5496] ring-2 ring-[#2F5496]/20 shadow-xs"
                  : "border-[#E7E0D2] hover:border-[#D3CABA]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl p-2.5 rounded-xl bg-[#FAF7F1] border border-[#F3EEE5] group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F3EEE5] text-[#5A5246]">
                  {count} bài viết
                </span>
              </div>
              <h3 className="text-base font-bold text-[#1F1C18] group-hover:text-[#2F5496] transition-colors flex items-center justify-between">
                <span>{cat.name}</span>
                <span className="text-xs font-normal text-[#9A8F7E] font-japanese" lang="ja">
                  {cat.japaneseName}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-[#766D5E] mt-2 line-clamp-2 leading-relaxed">
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
      className={`flex items-center gap-2 overflow-x-auto pb-3 custom-scrollbar-x ${className}`}
    >
      <Link
        to="/handbook"
        onClick={() => onSelectCategory?.("all")}
        className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
          !currentCategory || currentCategory === "all" || location.pathname === "/handbook"
            ? "bg-[#2F5496] text-white shadow-xs"
            : "bg-white text-[#5A5246] border border-[#E7E0D2] hover:bg-[#FAF7F1]"
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
                ? "bg-[#2F5496] text-white shadow-xs"
                : "bg-white text-[#5A5246] border border-[#E7E0D2] hover:bg-[#FAF7F1]"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                isCurrent ? "bg-white/20 text-white" : "bg-[#F3EEE5] text-[#766D5E]"
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
