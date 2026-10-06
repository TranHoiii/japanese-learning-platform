import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { FuriganaMode } from "../../contexts/FuriganaContext";

export interface KanjiHoverWordProps {
  word: string;
  reading?: string;
  hanViet?: string | null;
  meaning?: string | null;
  mode?: FuriganaMode;
  className?: string;
  rubyClassName?: string;
}

interface Coords {
  top: number;
  left: number;
  placement: "top" | "bottom";
  arrowLeft: number;
}

export const KanjiHoverWord: React.FC<KanjiHoverWordProps> = ({
  word,
  reading,
  hanViet,
  meaning,
  mode = "hover",
  className,
  rubyClassName,
}) => {
  const [isHoveredWord, setIsHoveredWord] = useState(false);
  const [isHoveredTooltip, setIsHoveredTooltip] = useState(false);
  const [isOpenTouch, setIsOpenTouch] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);

  const containerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isVisible = isHoveredWord || isHoveredTooltip || isOpenTouch;

  // Calculate and clamp tooltip coordinates relative to viewport
  const updatePosition = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // If target is off screen vertically, don't show
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      setCoords(null);
      return;
    }

    const tooltipWidth = 264; // width in px
    const targetCenterX = rect.left + rect.width / 2;

    // Clamp horizontal position so tooltip never clips outside left (min 12px) or right (window - 12px)
    const left = Math.max(
      12,
      Math.min(window.innerWidth - tooltipWidth - 12, targetCenterX - tooltipWidth / 2)
    );

    // Arrow pointer relative to tooltip box, centered on target
    const arrowLeft = Math.max(16, Math.min(tooltipWidth - 16, targetCenterX - left));

    // Vertical placement: if near top edge (< 160px), flip to bottom
    const isNearTop = rect.top < 160;
    const placement: "top" | "bottom" = isNearTop ? "bottom" : "top";
    const top = isNearTop ? rect.bottom + 8 : rect.top - 8;

    setCoords({ top, left, placement, arrowLeft });
  }, []);

  // Update position when tooltip becomes visible and on scroll/resize
  useEffect(() => {
    if (!isVisible) {
      setCoords(null);
      return;
    }

    updatePosition();

    const handleScrollOrResize = () => {
      updatePosition();
    };

    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isVisible, updatePosition]);

  // Click outside listener for touch devices
  useEffect(() => {
    if (!isOpenTouch) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(target)
      ) {
        setIsOpenTouch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpenTouch]);

  // Hover handlers with slight delay to allow moving mouse into tooltip smoothly
  const handleMouseEnterWord = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setIsHoveredWord(true);
  };

  const handleMouseLeaveWord = () => {
    leaveTimerRef.current = setTimeout(() => {
      setIsHoveredWord(false);
    }, 120);
  };

  const handleMouseEnterTooltip = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setIsHoveredTooltip(true);
  };

  const handleMouseLeaveTooltip = () => {
    leaveTimerRef.current = setTimeout(() => {
      setIsHoveredTooltip(false);
    }, 120);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;

    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleToggleTouch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpenTouch((prev) => !prev);
  };

  const hasExtraInfo = Boolean(reading || hanViet || meaning);

  return (
    <>
      <span
        ref={containerRef}
        className={cn("relative inline-block group", className)}
        onMouseEnter={handleMouseEnterWord}
        onMouseLeave={handleMouseLeaveWord}
        onClick={handleToggleTouch}
      >
        <ruby
          className={cn(
            "ruby-interactive cursor-pointer select-text px-0.5 transition-colors rounded",
            // Dotted underline to signal hoverable Kanji
            "border-b border-dashed border-indigo-400/80 hover:border-indigo-600 hover:bg-indigo-50/50",
            rubyClassName
          )}
        >
          <span className="font-japanese font-semibold text-inherit">{word}</span>
          {reading && (
            <rt
              className={cn(
                "text-[0.62em] font-semibold text-indigo-600 transition-all duration-200 select-none",
                // Hover mode: hidden until hovered
                mode === "hover" &&
                  (isVisible
                    ? "opacity-100 -translate-y-0 text-indigo-700 font-bold"
                    : "opacity-0 translate-y-1 pointer-events-none"),
                // Always mode: always visible
                mode === "always" && "opacity-100",
                // Off mode: hidden
                mode === "off" && "opacity-0 pointer-events-none"
              )}
            >
              {reading}
            </rt>
          )}
        </ruby>
      </span>

      {/* Floating Popover Tooltip Card rendered in React Portal to escape overflow-hidden */}
      {hasExtraInfo &&
        isVisible &&
        coords &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            onMouseEnter={handleMouseEnterTooltip}
            onMouseLeave={handleMouseLeaveTooltip}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: "264px",
              transform:
                coords.placement === "top"
                  ? "translateY(-100%)"
                  : "translateY(0)",
              zIndex: 99999,
            }}
            className="p-3.5 rounded-2xl bg-white shadow-2xl border border-slate-200/90 text-left pointer-events-auto select-text animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Arrow Pointer positioned accurately above/below target */}
            <div
              style={{ left: `${coords.arrowLeft}px` }}
              className={cn(
                "absolute w-2.5 h-2.5 bg-white border-slate-200/90 rotate-45 -translate-x-1/2 pointer-events-none",
                coords.placement === "top"
                  ? "-bottom-1.5 border-b border-r"
                  : "-top-1.5 border-t border-l"
              )}
            />

            {/* Top row: Word + Reading + Audio Button */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold font-japanese text-slate-900 tracking-wide">
                  {word}
                </span>
                {reading && (
                  <span className="text-sm font-semibold font-japanese text-indigo-600">
                    【{reading}】
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleSpeak}
                title="Phát âm tiếng Nhật"
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer",
                  isSpeaking
                    ? "bg-indigo-600 text-white animate-pulse"
                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800"
                )}
              >
                <span className="text-xs">🔊</span>
              </button>
            </div>

            {/* Hán Việt row */}
            {hanViet && (
              <div className="mt-2 flex items-center space-x-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Hán Việt:
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/70">
                  {hanViet}
                </span>
              </div>
            )}

            {/* Meaning row */}
            {meaning && (
              <div className="mt-2 text-xs leading-relaxed text-slate-700">
                <span className="font-semibold text-slate-900">Nghĩa: </span>
                <span>{meaning}</span>
              </div>
            )}

            {/* Bottom hint */}
            <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>💡 Rê chuột để xem cách đọc</span>
              <span className="text-indigo-500 font-medium">JLPT N5</span>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default KanjiHoverWord;
