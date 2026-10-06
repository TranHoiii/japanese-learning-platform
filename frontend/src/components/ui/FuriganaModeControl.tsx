import React from "react";
import { useFurigana, FuriganaMode } from "../../contexts/FuriganaContext";
import { cn } from "../../utils/cn";

export interface FuriganaModeControlProps {
  className?: string;
  size?: "sm" | "md";
}

export const FuriganaModeControl: React.FC<FuriganaModeControlProps> = ({
  className,
  size = "sm",
}) => {
  const { mode, setMode } = useFurigana();

  const options: { id: FuriganaMode; label: string; icon: string; title: string }[] = [
    {
      id: "hover",
      label: "Rê chuột",
      icon: "👁️",
      title: "Hiện Furigana trên đầu khi rê chuột vào chữ Kanji (Mặc định)",
    },
    {
      id: "always",
      label: "Luôn hiện",
      icon: "📖",
      title: "Luôn hiển thị Furigana trên đầu mọi chữ Kanji",
    },
    {
      id: "off",
      label: "Ẩn",
      icon: "🚫",
      title: "Tắt Furigana (chỉ hiện khi click/hover vào từ điển)",
    },
  ];

  const sizeClasses =
    size === "sm"
      ? "text-xs px-2.5 py-1"
      : "text-sm px-3.5 py-1.5";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl bg-slate-100/90 p-1 border border-slate-200/80 shadow-2xs select-none",
        className
      )}
      role="group"
      aria-label="Tùy chọn hiển thị Furigana"
    >
      <span className="text-[11px] font-bold text-slate-500 uppercase px-2 hidden sm:inline-block">
        Furigana:
      </span>
      {options.map((opt) => {
        const isActive = mode === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setMode(opt.id)}
            title={opt.title}
            className={cn(
              "flex items-center space-x-1.5 rounded-lg font-semibold transition-all cursor-pointer",
              sizeClasses,
              isActive
                ? "bg-white text-indigo-700 shadow-xs border border-slate-200/60 font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            )}
          >
            <span>{opt.icon}</span>
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FuriganaModeControl;
