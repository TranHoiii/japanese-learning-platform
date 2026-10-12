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
      className={`p-4 sm:p-5 rounded-2xl bg-[#FAF7F1] border border-[#E7E0D2] space-y-2.5 transition-all hover:border-[#D3CABA] ${className}`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#E7E0D2] text-[#5A5246]">
          Ví dụ {index + 1}
        </span>
        {example.context && (
          <span className="text-xs font-medium text-[#766D5E] bg-white px-2.5 py-0.5 rounded-full border border-[#E7E0D2]">
            Ngữ cảnh: {example.context}
          </span>
        )}
      </div>

      {/* Japanese Sentence */}
      <div className="space-y-1">
        <p
          lang="ja"
          className="text-base sm:text-lg font-bold text-[#1F1C18] font-japanese tracking-wide whitespace-pre-line"
        >
          {example.japanese}
        </p>

        {example.reading && example.reading !== example.japanese && (
          <p
            lang="ja"
            className="text-xs sm:text-sm text-[#5A5246] font-japanese whitespace-pre-line"
          >
            {example.reading}
          </p>
        )}

        {example.romaji && (
          <p className="text-xs text-[#9A8F7E] italic font-mono">
            {example.romaji}
          </p>
        )}
      </div>

      {/* Vietnamese Translation */}
      <div className="pt-2 border-t border-[#E7E0D2]/60">
        <p className="text-sm sm:text-base font-semibold text-[#2E2A25]">
          👉 {example.vietnamese}
        </p>
        {example.explanation && (
          <p className="text-xs sm:text-sm text-[#766D5E] mt-1 leading-relaxed">
            💡 {example.explanation}
          </p>
        )}
      </div>
    </div>
  );
};
