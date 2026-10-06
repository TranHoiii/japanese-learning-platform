import React from "react";
import { cn } from "../../../utils/cn";
import { MoraComparisonItem } from "../types/pronunciation";

export interface MoraVisualizerProps {
  comparisons: MoraComparisonItem[];
  titleVi?: string;
  descriptionVi?: string;
  className?: string;
}

export const MoraVisualizer: React.FC<MoraVisualizerProps> = ({
  comparisons,
  titleVi = "So sánh độ dài phách (Mora Timing)",
  descriptionVi = "Trong tiếng Nhật, mỗi ô bên dưới đại diện cho đúng 1 phách (mora). Hãy vỗ tay đều nhịp để cảm nhận sự khác biệt.",
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-[14px] bg-[#F8FAFC] border border-[#CBD5E1] p-4 sm:p-5 space-y-4 shadow-xs",
        className,
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            ⏱️
          </span>
          <h4 className="text-base font-bold text-[#0F172A]">{titleVi}</h4>
        </div>
        {descriptionVi && (
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            {descriptionVi}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {comparisons.map((item) => (
          <div
            key={item.id}
            className="rounded-[12px] bg-white border border-[#E2E8F0] p-4 space-y-3 shadow-xs hover:border-[#94A3B8] transition-colors"
          >
            {/* Word Header */}
            <div className="flex items-start justify-between gap-2 border-b border-[#F1F5F9] pb-2.5">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-lg font-bold font-japanese text-[#0F172A]"
                    lang="ja"
                  >
                    {item.word}
                  </span>
                  {item.kanji && item.kanji !== item.word && (
                    <span className="text-xs text-[#64748B] font-japanese">
                      ({item.kanji})
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#64748B]">
                  <span className="font-japanese text-[#2684D9] font-medium">
                    {item.reading}
                  </span>{" "}
                  • <span className="italic">{item.romaji}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-[#EBF5FF] text-[#1E40AF] border border-[#BFDBFE]">
                  {item.moraCount} phách (mora)
                </span>
                <p className="text-xs text-[#334155] font-medium mt-0.5">
                  {item.meaningVi}
                </p>
              </div>
            </div>

            {/* Mora Blocks Row */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                Phân tích nhịp phách:
              </span>
              <div
                className="flex items-center gap-1.5 flex-wrap"
                role="list"
                aria-label={`Phân tích ${item.moraCount} phách của từ ${item.word}`}
              >
                {item.moraBlocks.map((mora, idx) => {
                  const isSpecial =
                    mora.type === "yoon" ||
                    mora.type === "chouon" ||
                    mora.type === "sokuon" ||
                    mora.type === "hatsuon";

                  return (
                    <div
                      key={idx}
                      role="listitem"
                      className={cn(
                        "flex flex-col items-center justify-center min-w-[50px] px-2.5 py-2 rounded-[8px] border text-center transition-all",
                        mora.type === "yoon" &&
                          "bg-[#EFF6FF] border-[#93C5FD] text-[#1D4ED8]",
                        mora.type === "chouon" &&
                          "bg-[#FDF2F8] border-[#F472B6] text-[#BE185D]",
                        mora.type === "sokuon" &&
                          "bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]",
                        mora.type === "hatsuon" &&
                          "bg-[#FEFCE8] border-[#FDE047] text-[#A16207]",
                        (!mora.type || mora.type === "normal") &&
                          "bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]",
                      )}
                    >
                      <span className="text-[10px] text-[#94A3B8] font-bold">
                        #{idx + 1}
                      </span>
                      <span
                        className="text-base font-bold font-japanese leading-tight"
                        lang="ja"
                      >
                        {mora.text}
                      </span>
                      {mora.subtext && (
                        <span className="text-[10px] font-medium leading-none mt-0.5 opacity-90">
                          {mora.subtext}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Note / Guidance */}
            {item.highlightNoteVi && (
              <p className="text-xs text-[#0369A1] bg-[#F0F9FF] p-2 rounded-[8px] border border-[#BAE6FD] leading-relaxed">
                💡 {item.highlightNoteVi}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoraVisualizer;
