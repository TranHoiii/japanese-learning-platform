import React from "react";
import { ArticleExample } from "../types";

interface ArticleExampleCardProps {
  example: ArticleExample;
  index: number;
  className?: string;
}

export const ArticleExampleCard: React.FC<ArticleExampleCardProps> = ({
  example,
  index,
  className = "",
}) => {
  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5 transition-all hover:border-[#CBD5E1] ${className}`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#E2E8F0] text-[#475569]">
          Ví dụ {index + 1}
        </span>
        {example.context && (
          <span className="text-xs font-medium text-[#64748B] bg-white px-2.5 py-0.5 rounded-full border border-[#E2E8F0]">
            Ngữ cảnh: {example.context}
          </span>
        )}
      </div>

      {/* Japanese Sentence */}
      <div className="space-y-1">
        <p
          lang="ja"
          className="text-base sm:text-lg font-bold text-[#0F172A] font-japanese tracking-wide whitespace-pre-line"
        >
          {example.japanese}
        </p>

        {example.reading && example.reading !== example.japanese && (
          <p
            lang="ja"
            className="text-xs sm:text-sm text-[#475569] font-japanese whitespace-pre-line"
          >
            {example.reading}
          </p>
        )}

        {example.romaji && (
          <p className="text-xs text-[#94A3B8] italic font-mono">
            {example.romaji}
          </p>
        )}
      </div>

      {/* Vietnamese Translation */}
      <div className="pt-2 border-t border-[#E2E8F0]/60">
        <p className="text-sm sm:text-base font-semibold text-[#1E293B]">
          👉 {example.vietnamese}
        </p>
        {example.explanation && (
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 leading-relaxed">
            💡 {example.explanation}
          </p>
        )}
      </div>
    </div>
  );
};
