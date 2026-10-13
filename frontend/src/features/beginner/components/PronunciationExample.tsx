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
        "rounded-[10px] bg-[#FAF7F1] border border-[#E7E0D2] p-3.5 flex items-center justify-between gap-3 transition-colors hover:bg-white hover:border-[#D3CABA]",
        className,
      )}
    >
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-base sm:text-lg font-bold font-japanese text-[#1F1C18]"
            lang="ja"
          >
            {example.japanese}
          </span>
          {example.highlightKana && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EEF3FA] text-[#213960] border border-[#BDD0EC]">
              Trọng điểm: {example.highlightKana}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#5A5246]">
          <span className="font-japanese font-medium text-[#213960]">
            {example.reading}
          </span>
          <span className="text-[#9A8F7E]">•</span>
          <span className="italic text-[#766D5E]">{example.romaji}</span>
        </div>

        <p className="text-xs text-[#433D34] leading-relaxed">
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
