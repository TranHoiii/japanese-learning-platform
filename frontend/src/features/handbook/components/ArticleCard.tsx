import React from "react";
import { Link } from "react-router-dom";
import { HandbookArticle } from "../types";
import { getCategoryMeta } from "../data/categories";

interface ArticleCardProps {
  article: HandbookArticle;
  className?: string;
  onTagClick?: (tag: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  className = "",
  onTagClick,
}) => {
  const categoryMeta = getCategoryMeta(article.categoryId);

  return (
    <article
      className={`group flex flex-col justify-between p-5 sm:p-6 bg-white rounded-2xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="space-y-3">
        {/* Badges: Category & Level */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Link
              to={`/handbook/${article.categoryId}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F0F7FF] text-[#1D4ED8] hover:bg-[#DBEAFE] transition-colors"
            >
              <span>{categoryMeta?.icon || "📖"}</span>
              <span>{categoryMeta?.name || article.categoryId}</span>
            </Link>

            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
              {article.level}
            </span>
          </div>

          <div className="text-xs text-[#94A3B8] flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{article.readTimeMinutes} phút đọc</span>
          </div>
        </div>

        {/* Title & Japanese Title */}
        <div>
          <Link
            to={`/handbook/${article.categoryId}/${article.slug}`}
            className="block group-hover:text-[#2563EB] transition-colors"
          >
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
              {article.title}
            </h2>
          </Link>
          {article.japaneseTitle && (
            <p
              lang="ja"
              className="text-xs sm:text-sm text-[#64748B] font-japanese mt-1"
            >
              {article.japaneseTitle}
            </p>
          )}
        </div>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3">
          {article.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {article.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onTagClick?.(tag);
              }}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F8FAFC] text-[#64748B] border border-[#F1F5F9] hover:bg-[#E2E8F0] hover:text-[#0F172A] transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 mt-4 border-t border-[#F1F5F9] flex items-center justify-between">
        <span className="text-xs text-[#94A3B8]">Cập nhật: {article.updatedAt}</span>
        <Link
          to={`/handbook/${article.categoryId}/${article.slug}`}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
        >
          <span>Đọc cẩm nang</span>
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};
