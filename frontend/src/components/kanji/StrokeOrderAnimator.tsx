import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchKanjiSvg, KanjiSvgData } from "../../utils/kanjiSvg";
import { cn } from "../../utils/cn";

export interface StrokeOrderAnimatorProps {
  /** The Japanese character: Kanji, Hiragana, or Katakana */
  character: string;
  /** Optional stroke order SVG url */
  strokeOrderUrl?: string | null;
  /** Size in pixels (square width/height) */
  size?: number;
  /** Visual style: 'dark' (for dark banners) or 'light' (for modals and pages) */
  theme?: "dark" | "light";
  /** Auto start animating when loaded (default: true) */
  autoPlay?: boolean;
  /** Allow clicking canvas to play/pause */
  interactive?: boolean;
  /** Show subtle control bar (Replay, Play/Pause, Speed, Numbers) */
  showControls?: boolean;
  className?: string;
}

export const StrokeOrderAnimator: React.FC<StrokeOrderAnimatorProps> = ({
  character,
  strokeOrderUrl,
  size = 140,
  theme = "light",
  autoPlay = true,
  interactive = true,
  showControls = true,
  className,
}) => {
  const [svgData, setSvgData] = useState<KanjiSvgData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Animation states
  const [currentStroke, setCurrentStroke] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [speed, setSpeed] = useState<number>(1); // 0.75x, 1x, 1.5x
  const [showNumbers, setShowNumbers] = useState<boolean>(true);

  // Measuring stroke lengths
  const [pathLengths, setPathLengths] = useState<number[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load SVG data
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(false);
    setCurrentStroke(0);

    fetchKanjiSvg(character, strokeOrderUrl)
      .then((data) => {
        if (!isCancelled) {
          if (data && data.paths.length > 0) {
            setSvgData(data);
            setLoading(false);
            if (autoPlay) {
              setIsPlaying(true);
            }
          } else {
            setError(true);
            setLoading(false);
          }
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [character, strokeOrderUrl, autoPlay]);

  // Measure path lengths on data load
  useEffect(() => {
    if (!svgData) return;
    const lengths = pathRefs.current.map((ref) => (ref ? ref.getTotalLength() : 100));
    setPathLengths(lengths);
  }, [svgData]);

  // Animate sequential strokes
  useEffect(() => {
    if (!isPlaying || !svgData || loading || error) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (currentStroke >= svgData.paths.length) {
      // Finished all strokes
      setIsPlaying(false);
      return;
    }

    // Dynamic duration based on length and speed
    const strokeLen = pathLengths[currentStroke] || 80;
    // Base time between 350ms and 750ms depending on stroke length, adjusted by speed
    const baseDuration = Math.max(350, Math.min(750, strokeLen * 5));
    const duration = baseDuration / speed;

    timerRef.current = setTimeout(() => {
      setCurrentStroke((prev) => prev + 1);
    }, duration + 80 / speed); // small pause between strokes

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStroke, svgData, loading, error, pathLengths, speed]);

  const handleReplay = useCallback(() => {
    setCurrentStroke(0);
    setIsPlaying(true);
  }, []);

  const handleTogglePlay = useCallback(() => {
    if (!svgData) return;
    if (currentStroke >= svgData.paths.length) {
      // If finished, replay from beginning
      handleReplay();
    } else {
      setIsPlaying((prev) => !prev);
    }
  }, [svgData, currentStroke, handleReplay]);

  const handleCycleSpeed = useCallback(() => {
    setSpeed((prev) => {
      if (prev === 0.75) return 1;
      if (prev === 1) return 1.5;
      return 0.75;
    });
  }, []);

  const handleToggleNumbers = useCallback(() => {
    setShowNumbers((prev) => !prev);
  }, []);

  const isDark = theme === "dark";

  // Color tokens
  const bgBoxClass = isDark
    ? "bg-slate-900/80 border-slate-700/80 shadow-inner"
    : "bg-white border-slate-200 shadow-2xs";

  const gridLineColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(203, 213, 225, 0.7)";
  const ghostStrokeColor = isDark ? "rgba(255, 255, 255, 0.18)" : "rgba(15, 23, 42, 0.10)";
  const finishedStrokeColor = isDark ? "#FBBF24" : "#0F172A"; // Warm Amber in dark, Deep Ink in light
  const activeStrokeColor = isDark ? "#F59E0B" : "#2563EB"; // Vibrant Amber / Royal Blue
  const numberColor = isDark ? "rgba(252, 211, 77, 0.85)" : "#64748B";

  const totalStrokes = svgData?.paths.length || 0;
  const isFinished = currentStroke >= totalStrokes;

  return (
    <div className={cn("inline-flex flex-col items-center select-none", className)}>
      {/* Canvas Box */}
      <div
        onClick={interactive ? handleTogglePlay : undefined}
        title={interactive ? (isPlaying ? "Bấm để tạm dừng" : "Bấm để phát") : undefined}
        style={{ width: size, height: size }}
        className={cn(
          "relative rounded-2xl border flex items-center justify-center overflow-hidden transition-all duration-200",
          interactive && "cursor-pointer hover:border-amber-400/80 active:scale-[0.99]",
          bgBoxClass
        )}
      >
        {/* Loading spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center p-3 text-center">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-1.5" />
            <span className="text-[10px] text-slate-400 font-medium">Đang tải nét...</span>
          </div>
        )}

        {/* Fallback when SVG could not be loaded */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center text-center p-2">
            <span
              className={cn(
                "text-5xl font-bold font-japanese",
                isDark ? "text-amber-400" : "text-slate-900"
              )}
            >
              {character}
            </span>
            <span className="text-[9px] text-slate-400 mt-1">Chữ mẫu</span>
          </div>
        )}

        {/* SVG Drawing Canvas */}
        {!loading && !error && svgData && (
          <svg
            viewBox={svgData.viewBox}
            className="w-full h-full p-1"
            style={{ shapeRendering: "geometricPrecision" }}
          >
            {/* 1. Genkouyoushi Calligraphy Grid Guidelines (田字格) */}
            <g style={{ stroke: gridLineColor, strokeWidth: 0.6, strokeDasharray: "2,2" }}>
              {/* Horizontal center */}
              <line x1="0" y1="54.5" x2="109" y2="54.5" />
              {/* Vertical center */}
              <line x1="54.5" y1="0" x2="54.5" y2="109" />
              {/* Diagonal lines for quadrant alignment */}
              <line x1="0" y1="0" x2="109" y2="109" style={{ strokeWidth: 0.4, opacity: 0.5 }} />
              <line x1="109" y1="0" x2="0" y2="109" style={{ strokeWidth: 0.4, opacity: 0.5 }} />
            </g>

            {/* 2. Ghost Outline Layer (All strokes in faint color) */}
            <g
              style={{
                fill: "none",
                stroke: ghostStrokeColor,
                strokeWidth: 4.5,
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }}
            >
              {svgData.paths.map((d, idx) => (
                <path key={`ghost-${idx}`} d={d} />
              ))}
            </g>

            {/* 3. Rendered & Animated Strokes Layer */}
            <g
              style={{
                fill: "none",
                strokeWidth: 4.5,
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }}
            >
              {svgData.paths.map((d, idx) => {
                const len = pathLengths[idx] || 100;
                const isDrawn = idx < currentStroke;
                const isCurrent = idx === currentStroke && isPlaying;
                const isPending = idx > currentStroke || (idx === currentStroke && !isPlaying);

                // Compute stroke duration for the active stroke
                const strokeDuration = Math.max(0.3, Math.min(0.7, len / 180)) / speed;

                return (
                  <path
                    key={`stroke-${idx}`}
                    ref={(el) => {
                      pathRefs.current[idx] = el;
                    }}
                    d={d}
                    style={{
                      stroke: isCurrent ? activeStrokeColor : finishedStrokeColor,
                      strokeDasharray: len,
                      strokeDashoffset: isDrawn ? 0 : isCurrent ? 0 : len,
                      transition: isCurrent
                        ? `stroke-dashoffset ${strokeDuration}s cubic-bezier(0.35, 0, 0.25, 1)`
                        : undefined,
                      visibility: isPending ? "hidden" : "visible",
                    }}
                  />
                );
              })}
            </g>

            {/* 4. Stroke Order Numbers Layer */}
            {showNumbers && (
              <g style={{ fontSize: 7, fontWeight: 700, fill: numberColor }}>
                {svgData.numbers.map((num, idx) => {
                  const isVisible = idx <= currentStroke;
                  return (
                    <text
                      key={`num-${idx}`}
                      x={num.x}
                      y={num.y}
                      style={{
                        opacity: isVisible ? 1 : 0.2,
                        transition: "opacity 0.2s ease-in-out",
                      }}
                    >
                      {num.text}
                    </text>
                  );
                })}
              </g>
            )}
          </svg>
        )}

        {/* Status indicator on top right */}
        {!loading && !error && svgData && (
          <span
            className={cn(
              "absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold tracking-tight",
              isDark
                ? "bg-slate-800/90 text-amber-300 border border-slate-700/60"
                : "bg-slate-100/90 text-slate-700 border border-slate-200"
            )}
          >
            {isFinished
              ? `${totalStrokes}/${totalStrokes}`
              : `${Math.min(currentStroke + 1, totalStrokes)}/${totalStrokes}`}
          </span>
        )}
      </div>

      {/* Minimal Action Controls Bar */}
      {showControls && !loading && !error && svgData && (
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {/* Replay Button */}
          <button
            type="button"
            onClick={handleReplay}
            title="Vẽ lại từ đầu"
            className={cn(
              "p-1.5 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer active:scale-90",
              isDark
                ? "bg-white/10 hover:bg-white/20 text-amber-300"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            )}
          >
            🔄
          </button>

          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            title={isPlaying ? "Tạm dừng" : "Tiếp tục vẽ"}
            className={cn(
              "px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer active:scale-95",
              isPlaying
                ? isDark
                  ? "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                  : "bg-amber-100 text-amber-800 border border-amber-300"
                : isDark
                ? "bg-white/10 text-slate-200 hover:bg-white/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            <span>{isPlaying ? "⏸ Tạm dừng" : isFinished ? "▶ Vẽ lại" : "▶ Tiếp tục"}</span>
          </button>

          {/* Speed Toggle (0.75x, 1x, 1.5x) */}
          <button
            type="button"
            onClick={handleCycleSpeed}
            title="Tốc độ vẽ"
            className={cn(
              "px-1.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer active:scale-95",
              isDark
                ? "bg-white/10 hover:bg-white/20 text-slate-300"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            )}
          >
            {speed}x
          </button>

          {/* Toggle Numbers (123) */}
          <button
            type="button"
            onClick={handleToggleNumbers}
            title="Bật/Tắt số thứ tự nét"
            className={cn(
              "px-1.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer active:scale-95",
              showNumbers
                ? isDark
                  ? "bg-amber-500/30 text-amber-200"
                  : "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                : isDark
                ? "bg-white/5 text-slate-500 line-through"
                : "bg-slate-50 text-slate-400 line-through"
            )}
          >
            ①②
          </button>
        </div>
      )}
    </div>
  );
};

export default StrokeOrderAnimator;
