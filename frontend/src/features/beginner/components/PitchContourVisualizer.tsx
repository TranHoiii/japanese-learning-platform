import React from "react";
import { cn } from "../../../utils/cn";
import { PitchPatternItem } from "../types/pronunciation";

export interface PitchContourVisualizerProps {
  patterns: PitchPatternItem[];
  titleVi?: string;
  descriptionVi?: string;
  className?: string;
}

export const PitchContourVisualizer: React.FC<PitchContourVisualizerProps> = ({
  patterns,
  titleVi = "Sơ đồ cao độ chuẩn Tokyo (Pitch Contour)",
  descriptionVi = "Tiếng Nhật Tokyo chỉ có 2 nốt cao độ: Cao (H) và Thấp (L). Hãy chú ý nốt của trợ từ đi kèm để phân biệt mô hình Heiban và Odaka.",
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
            📈
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
        {patterns.map((item) => (
          <div
            key={item.id}
            className="rounded-[12px] bg-white border border-[#E2E8F0] p-4 space-y-3.5 shadow-xs hover:border-[#94A3B8] transition-colors"
          >
            {/* Header */}
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
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border",
                    item.patternType === "atamadaka" &&
                      "bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]",
                    item.patternType === "heiban" &&
                      "bg-[#DCFCE7] text-[#166534] border-[#86EFAC]",
                    item.patternType === "nakadaka" &&
                      "bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]",
                    item.patternType === "odaka" &&
                      "bg-[#EDE9FE] text-[#5B21B6] border-[#C4B5FD]",
                  )}
                >
                  {item.patternNameVi}
                </span>
                <p className="text-xs text-[#334155] font-medium mt-0.5">
                  {item.meaningVi}
                </p>
              </div>
            </div>

            {/* Visual Pitch Ladder */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                Đường đi cao độ từng phách:
              </span>

              {/* Step Graphic */}
              <div
                className="flex items-end gap-2 pt-4 pb-2 px-3 rounded-[10px] bg-[#F1F5F9]/60 border border-[#E2E8F0] min-h-[90px]"
                role="group"
                aria-label={`Mô hình cao độ của ${item.word}: ${item.pitchContour.join(", ")}`}
              >
                {item.moras.map((mora, idx) => {
                  const isHigh = item.pitchContour[idx] === "high";
                  const isDropPoint = item.dropIndex === idx;

                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center justify-end"
                    >
                      {/* Drop nucleus indicator */}
                      <div className="h-4 flex items-center justify-center">
                        {isDropPoint && (
                          <span
                            className="text-xs font-bold text-[#DC2626] animate-bounce"
                            title="Hạt nhân trọng âm (điểm rơi)"
                            aria-label="Điểm rơi cao độ"
                          >
                            🔻
                          </span>
                        )}
                      </div>

                      {/* Visual Pitch Block */}
                      <div
                        className={cn(
                          "w-full rounded-[6px] py-1.5 px-1 text-center font-bold font-japanese border transition-all text-xs sm:text-sm",
                          isHigh
                            ? "bg-[#2563EB] text-white border-[#1D4ED8] translate-y-[-12px] shadow-xs"
                            : "bg-[#E2E8F0] text-[#334155] border-[#CBD5E1] translate-y-0",
                        )}
                      >
                        {mora}
                      </div>

                      {/* Pitch Label */}
                      <span className="text-[10px] font-semibold text-[#64748B] mt-1">
                        {isHigh ? "Cao [H]" : "Thấp [L]"}
                      </span>
                    </div>
                  );
                })}

                {/* Particle addition if provided */}
                {item.particleExample && (
                  <div className="flex-1 flex flex-col items-center justify-end border-l border-dashed border-[#CBD5E1] pl-2">
                    <div className="h-4" />
                    <div
                      className={cn(
                        "w-full rounded-[6px] py-1.5 px-1 text-center font-bold font-japanese border transition-all text-xs sm:text-sm",
                        item.particleExample.particlePitch === "high"
                          ? "bg-[#10B981] text-white border-[#059669] translate-y-[-12px] shadow-xs"
                          : "bg-[#FCA5A5] text-[#7F1D1D] border-[#F87171] translate-y-0",
                      )}
                    >
                      {item.particleExample.particle}
                    </div>
                    <span className="text-[10px] font-bold text-[#475569] mt-1">
                      {item.particleExample.particlePitch === "high"
                        ? "+ Trợ từ (Cao)"
                        : "+ Trợ từ (Thấp)"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Particle Note */}
            {item.particleExample && (
              <p className="text-xs text-[#1E293B] bg-[#F8FAFC] p-2.5 rounded-[8px] border border-[#E2E8F0] leading-relaxed">
                🔍{" "}
                <span className="font-semibold text-[#0F172A]">
                  Khi đi với trợ từ:
                </span>{" "}
                {item.particleExample.explanationVi}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PitchContourVisualizer;
