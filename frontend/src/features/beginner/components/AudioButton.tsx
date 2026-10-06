import React, { useState, useEffect } from "react";
import { cn } from "../../../utils/cn";
import { hasValidAudioUrl, playSafeAudio, stopActiveAudio } from "../utils/audioHelper";

export interface AudioButtonProps {
  audioUrl?: string | null;
  label?: string;
  size?: "sm" | "default" | "lg";
  variant?: "primary" | "ghost" | "outline";
  showDisabledState?: boolean;
  className?: string;
  onPlay?: () => void;
  onEnded?: () => void;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  audioUrl,
  label,
  size = "default",
  variant = "ghost",
  showDisabledState = true,
  className,
  onPlay,
  onEnded,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isValid = hasValidAudioUrl(audioUrl);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if (isPlaying) {
        stopActiveAudio();
      }
    };
  }, [isPlaying]);

  if (!isValid && !showDisabledState) {
    return null;
  }

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isValid || isPlaying) {
      if (isPlaying) {
        stopActiveAudio();
        setIsPlaying(false);
      }
      return;
    }

    setHasError(false);
    setIsPlaying(true);
    onPlay?.();

    playSafeAudio(audioUrl!, {
      onStart: () => setIsPlaying(true),
      onEnd: () => {
        setIsPlaying(false);
        onEnded?.();
      },
      onError: () => {
        setIsPlaying(false);
        setHasError(true);
      },
    });
  };

  const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    default: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };

  const variantClasses = {
    primary: "bg-[#2684D9] text-white hover:bg-[#1769B0] shadow-xs",
    ghost:
      "bg-transparent text-[#475569] hover:text-[#12558F] hover:bg-[#F0F7FF] active:bg-[#DCEEFF]",
    outline:
      "border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC] hover:text-[#12558F]",
  };

  if (!isValid) {
    return (
      <button
        type="button"
        disabled
        aria-label={label ? `Chưa có bản ghi âm cho ${label}` : "Chưa có bản ghi âm"}
        title="Chưa có tệp âm thanh"
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-colors cursor-not-allowed opacity-40 text-[#94A3B8]",
          sizeClasses[size],
          className,
        )}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      aria-label={
        isPlaying
          ? `Tạm dừng phát âm ${label || ""}`
          : `Nghe phát âm ${label || ""}`
      }
      title={isPlaying ? "Dừng" : "Nghe phát âm"}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all focus-visible:outline-2 focus-visible:outline-[#2684D9]",
        sizeClasses[size],
        variantClasses[variant],
        isPlaying && "ring-2 ring-[#2684D9] ring-offset-1 animate-pulse",
        hasError && "text-[#EF4444]",
        className,
      )}
    >
      {isPlaying ? (
        <svg
          className="w-4 h-4 fill-current animate-pulse"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H3.75A2.25 2.25 0 001.5 9.75v4.5a2.25 2.25 0 002.25 2.25h2.69l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM18.54 5.46a.75.75 0 011.06 0 11.25 11.25 0 010 13.08.75.75 0 11-1.06-1.06 9.75 9.75 0 000-10.96.75.75 0 010-1.06zM15.355 8.645a.75.75 0 011.06 0 6.75 6.75 0 010 6.71.75.75 0 11-1.06-1.06 5.25 5.25 0 000-4.59.75.75 0 010-1.06z" />
        </svg>
      )}
    </button>
  );
};

export default AudioButton;
