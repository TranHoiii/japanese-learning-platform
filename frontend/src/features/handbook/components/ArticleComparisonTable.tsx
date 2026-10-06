import React from "react";
import { ArticleComparison } from "../types";

interface ArticleComparisonTableProps {
  comparison: ArticleComparison;
  className?: string;
}

export const ArticleComparisonTable: React.FC<ArticleComparisonTableProps> = ({
  comparison,
  className = "",
}) => {
  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#CBD5E1] space-y-4 ${className}`}
    >
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2">
          <span>⚖️</span>
          <span>{comparison.title}</span>
        </h3>
        {comparison.description && (
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            {comparison.description}
          </p>
        )}
      </div>

      {/* Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparison.items.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
                <h4 className="text-sm sm:text-base font-bold text-[#1E293B]">
                  {item.subject}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {item.nuance}
              </p>

              {item.formula && (
                <div className="px-3 py-1.5 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] text-xs font-mono font-semibold text-[#1E40AF]">
                  {item.formula}
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-[#F8FAFC]">
              <div className="space-y-0.5">
                <p lang="ja" className="text-xs sm:text-sm font-bold text-[#0F172A] font-japanese">
                  {item.example}
                </p>
                <p className="text-xs text-[#64748B]">
                  👉 {item.exampleTranslation}
                </p>
              </div>

              {item.caution && (
                <p className="text-[11px] text-[#B45309] bg-[#FEF3C7]/60 p-2 rounded-md leading-relaxed border border-[#FDE68A]">
                  ⚠️ {item.caution}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Note */}
      {comparison.summary && (
        <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-xs sm:text-sm text-[#1E40AF] font-medium flex items-start gap-2">
          <span className="shrink-0 text-base">📌</span>
          <p className="leading-relaxed">{comparison.summary}</p>
        </div>
      )}
    </div>
  );
};
