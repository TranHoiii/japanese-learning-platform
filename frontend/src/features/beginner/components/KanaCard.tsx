import React from "react";
import { cn } from "../../../utils/cn";
import { KanaCharacter } from "../types/kana";
import AudioButton from "./AudioButton";

export interface KanaCardProps {
  kana: KanaCharacter;
  isSelected?: boolean;
  showEquivalent?: boolean;
  /** self-test mode: romaji and example stay hidden until the card is tapped */
  concealed?: boolean;
  onReveal?: (id: string) => void;
  onSelect?: (kana: KanaCharacter) => void;
  className?: string;
}

export const KanaCard: React.FC<KanaCardProps> = ({
  kana,
  isSelected = false,
  showEquivalent = false,
  concealed = false,
  onReveal,
  onSelect,
  className,
}) => {
  const primaryExample = kana.examples && kana.examples.length > 0 ? kana.examples[0] : null;

  const handleClick = () => {
    if (concealed) {
      onReveal?.(kana.id);
      return;
    }
    onSelect?.(kana);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
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
        "relative surface surface-hover !rounded-2xl border p-2 sm:p-3 flex flex-col justify-between text-center cursor-pointer select-none min-h-[105px] sm:min-h-[130px]",
        "active:scale-95",
        "focus-visible:outline-2 focus-visible:outline-[#2F5496]",
        isSelected
          ? "border-[#2F5496] ring-2 ring-[#2F5496]/40 bg-[#EEF3FA]/30 shadow-xs"
          : "border-[#E7E0D2]",
        className,
      )}
    >
      {/* Top Header: Stroke count / Equivalent Kana badge + Safe Audio */}
      <div className="w-full flex items-center justify-between min-h-[20px] sm:min-h-[22px] gap-1">
        {showEquivalent && kana.equivalentKana ? (
          <span
            className="text-[9px] sm:text-[10px] font-bold text-[#213960] bg-[#EEF3FA] px-1 sm:px-1.5 py-0.5 rounded border border-[#BDD0EC] font-japanese"
            title={`Chữ tương đương: ${kana.equivalentKana}`}
          >
            ↔ {kana.equivalentKana}
          </span>
        ) : kana.strokeCount ? (
          <span
            className="text-[9px] sm:text-[10px] font-medium text-[#9A8F7E] bg-[#FAF7F1] px-1 sm:px-1.5 py-0.5 rounded border border-[#E7E0D2]/70"
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
      <div className="my-1 sm:my-1.5 space-y-0.5">
        <span
          className="text-2xl sm:text-4xl font-bold font-japanese text-[#1F1C18] leading-tight block tracking-tight"
          lang="ja"
        >
          {kana.character}
        </span>
        <span className="text-[11px] sm:text-sm font-semibold text-[#213960] tracking-wide block">
          {concealed ? "?" : kana.romaji}
        </span>
      </div>

      {/* Example Word Teaser (Clear, Not Overloaded) */}
      {primaryExample && !concealed ? (
        <div className="pt-1 sm:pt-1.5 border-t border-[#F3EEE5] w-full text-left text-[10px] sm:text-[11px] truncate">
          <span className="font-japanese font-semibold text-[#1F1C18]">
            {primaryExample.word}
          </span>
          <span className="hidden md:inline text-[#766D5E] ml-1 truncate">
            {primaryExample.meaningVi}
          </span>
        </div>
      ) : (
        <div className="min-h-[14px] sm:min-h-[18px]" />
      )}
    </div>
  );
};

export default KanaCard;
