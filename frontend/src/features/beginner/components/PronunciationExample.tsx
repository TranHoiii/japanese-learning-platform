import React from "react";
import { cn } from "../../../utils/cn";
import { PronunciationExampleItem } from "../types/pronunciation";
import AudioButton from "./AudioButton";

export interface PronunciationExampleProps {
  example: PronunciationExampleItem;
  className?: string;
}

export const PronunciationExample: React.FC<PronunciationExampleProps> = ({
  example,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 flex items-center justify-between gap-3 transition-colors hover:bg-white hover:border-[#CBD5E1]",
        className,
      )}
    >
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-base sm:text-lg font-bold font-japanese text-[#0F172A]"
            lang="ja"
          >
            {example.japanese}
          </span>
          {example.highlightKana && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F0F7FF] text-[#12558F] border border-[#BBDDFF]">
              Trọng điểm: {example.highlightKana}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569]">
          <span className="font-japanese font-medium text-[#12558F]">
            {example.reading}
          </span>
          <span className="text-[#94A3B8]">•</span>
          <span className="italic text-[#64748B]">{example.romaji}</span>
        </div>

        <p className="text-xs text-[#334155] leading-relaxed">
          {example.meaningVi}
        </p>

        {example.noteVi && (
          <p className="text-[11px] text-[#B45309] bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#FDE68A] mt-1">
            📌 {example.noteVi}
          </p>
        )}
      </div>

      <div className="shrink-0">
        <AudioButton
          audioUrl={example.audioUrl}
          label={example.reading}
          size="sm"
          variant="outline"
          showDisabledState={false}
        />
      </div>
    </div>
  );
};

export default PronunciationExample;
