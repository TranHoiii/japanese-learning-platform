import React from "react";
import { cn } from "../../../utils/cn";
import { KanaCharacter } from "../types/kana";
import AudioButton from "./AudioButton";

export interface KanaCardProps {
  kana: KanaCharacter;
  isSelected?: boolean;
  showEquivalent?: boolean;
  onSelect?: (kana: KanaCharacter) => void;
  className?: string;
}

export const KanaCard: React.FC<KanaCardProps> = ({
  kana,
  isSelected = false,
  showEquivalent = false,
  onSelect,
  className,
}) => {
  const primaryExample = kana.examples && kana.examples.length > 0 ? kana.examples[0] : null;

  const handleClick = () => {
    onSelect?.(kana);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(kana);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Ký tự ${kana.character}, phát âm ${kana.romaji}`}
      className={cn(
        "relative rounded-[14px] bg-white border p-3 flex flex-col justify-between text-center transition-all cursor-pointer select-none",
        "hover:border-[#2684D9] hover:shadow-[0_4px_14px_rgba(38,132,217,0.12)] hover:-translate-y-0.5",
        "focus-visible:outline-2 focus-visible:outline-[#2684D9]",
        isSelected
          ? "border-[#2684D9] ring-2 ring-[#2684D9]/40 bg-[#F0F7FF]/30 shadow-xs"
          : "border-[#E2E8F0]",
        className,
      )}
    >
      {/* Top Header: Stroke count / Equivalent Kana badge + Safe Audio */}
      <div className="w-full flex items-center justify-between min-h-[22px] gap-1">
        {showEquivalent && kana.equivalentKana ? (
          <span
            className="text-[10px] font-bold text-[#12558F] bg-[#F0F7FF] px-1.5 py-0.5 rounded border border-[#BBDDFF] font-japanese"
            title={`Chữ tương đương: ${kana.equivalentKana}`}
          >
            ↔ {kana.equivalentKana}
          </span>
        ) : kana.strokeCount ? (
          <span
            className="text-[10px] font-medium text-[#94A3B8] bg-[#F8FAFC] px-1.5 py-0.5 rounded border border-[#E2E8F0]/70"
            title={`${kana.strokeCount} nét`}
          >
            {kana.strokeCount}n
          </span>
        ) : (
          <span />
        )}

        <div onClick={(e) => e.stopPropagation()}>
          <AudioButton
            audioUrl={kana.audioUrl}
            label={kana.romaji}
            size="sm"
            variant="ghost"
            showDisabledState={false}
          />
        </div>
      </div>

      {/* Main Learning Target: Giant Character & Romaji */}
      <div className="my-1.5 space-y-0.5">
        <span
          className="text-3xl sm:text-4xl font-bold font-japanese text-[#0F172A] leading-tight block tracking-tight"
          lang="ja"
        >
          {kana.character}
        </span>
        <span className="text-xs sm:text-sm font-semibold text-[#12558F] tracking-wide block">
          {kana.romaji}
        </span>
      </div>

      {/* Example Word Teaser (Clear, Not Overloaded) */}
      {primaryExample ? (
        <div className="pt-1.5 border-t border-[#F1F5F9] w-full text-left text-[11px] truncate">
          <span className="font-japanese font-semibold text-[#0F172A]">
            {primaryExample.word}
          </span>
          <span className="text-[#64748B] ml-1 truncate">
            {primaryExample.meaningVi}
          </span>
        </div>
      ) : (
        <div className="min-h-[18px]" />
      )}
    </div>
  );
};

export default KanaCard;
