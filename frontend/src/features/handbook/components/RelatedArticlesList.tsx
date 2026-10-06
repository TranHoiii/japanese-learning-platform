import React from "react";
import { Link } from "react-router-dom";
import { ArticleRelatedLink } from "../types";
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

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2">
        <span>🔗</span>
        <span>Bài viết liên quan</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {relatedArticles.map((rel, idx) => {
          const catMeta = getCategoryMeta(rel.category);

          return (
            <Link
              key={idx}
              to={`/handbook/${rel.category}/${rel.slug}`}
              className="group p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-[#2563EB] font-semibold">
                  <span>{catMeta?.icon || "📖"}</span>
                  <span>{catMeta?.name || rel.category}</span>
                </div>

                <h4 className="text-sm font-bold text-[#1E293B] group-hover:text-[#2563EB] transition-colors leading-snug">
                  {rel.title}
                </h4>
              </div>

              {rel.reason && (
                <p className="text-xs text-[#64748B] mt-2 pt-2 border-t border-[#F1F5F9]">
                  💡 {rel.reason}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
