import React from "react";
import { Link } from "react-router-dom";
import { ArticleRelatedLink, HandbookCategoryType } from "../types";
import { getCategoryMeta } from "../data/categories";

interface RelatedArticlesListProps {
  relatedArticles: ArticleRelatedLink[];
  className?: string;
}

export const RelatedArticlesList: React.FC<RelatedArticlesListProps> = ({
  relatedArticles,
  className = "",
}) => {
  if (!relatedArticles || relatedArticles.length === 0) return null;

  // Group related links by category to foster cross-category discovery
  const categoryOrder: HandbookCategoryType[] = [
    "grammar",
    "vocabulary",
    "kanji",
    "conversation",
    "notes",
  ];

  const grouped = categoryOrder.reduce<Record<string, ArticleRelatedLink[]>>(
    (acc, catId) => {
      const items = relatedArticles.filter((item) => item.category === catId);
      if (items.length > 0) {
        acc[catId] = items;
      }
      return acc;
    },
    {}
  );

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
        <h3 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2">
          <span>🔗</span>
          <span>Mạng lưới liên kết kiến thức (Knowledge Path)</span>
        </h3>
        <span className="text-xs text-[#64748B] font-medium hidden sm:inline">
          {relatedArticles.length} bài viết bổ trợ
        </span>
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([catId, items]) => {
          const catMeta = getCategoryMeta(catId as HandbookCategoryType);

          return (
            <div key={catId} className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#475569] uppercase tracking-wider">
                <span>{catMeta?.icon || "📌"}</span>
                <span>{catMeta?.name || catId} liên quan:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((rel, idx) => (
                  <Link
                    key={idx}
                    to={`/handbook/${rel.category}/${rel.slug}`}
                    className="group p-3.5 sm:p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-[#2563EB] font-semibold">
                        <span className="text-sm">{catMeta?.icon || "📖"}</span>
                        <span>{catMeta?.name || rel.category}</span>
                      </div>

                      <h4 className="text-sm font-bold text-[#1E293B] group-hover:text-[#2563EB] transition-colors leading-snug">
                        {rel.title}
                      </h4>
                    </div>

                    {rel.reason && (
                      <p className="text-xs text-[#64748B] mt-2 pt-2 border-t border-[#F1F5F9] leading-relaxed">
                        👉 {rel.reason}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
