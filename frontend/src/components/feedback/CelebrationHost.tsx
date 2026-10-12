import React, { useCallback, useEffect, useRef, useState } from "react";
import { gamification, GamificationEvent } from "../../lib/gamification";
import { playSound } from "../../lib/sound";

interface Banner {
  id: number;
  emoji: string;
  title: string;
  subtitle?: string;
  tone: "gold" | "sakura" | "indigo";
}

interface XpPop {
  id: number;
  amount: number;
  label?: string;
}

interface Piece {
  id: number;
  style: React.CSSProperties;
  shape: "rect" | "dot" | "petal";
  color: string;
}

const COLORS = ["#E8527C", "#FFA3B7", "#F6B722", "#5F8ACB", "#92B2DD", "#88AF5A", "#FFFFFF"];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function makePieces(count: number, seed: number): Piece[] {
  return Array.from({ length: count }, (_, i) => {
    const shapeRoll = Math.random();
    const size = 6 + Math.random() * 8;
    return {
      id: seed * 1000 + i,
      shape: shapeRoll > 0.66 ? "petal" : shapeRoll > 0.33 ? "rect" : "dot",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      style: {
        left: `${Math.random() * 100}%`,
        width: size,
        height: size * (shapeRoll > 0.66 ? 1.4 : 0.7 + Math.random() * 0.8),
        ["--dx" as string]: `${(Math.random() - 0.5) * 240}px`,
        ["--rot" as string]: `${360 + Math.random() * 720}deg`,
        ["--dur" as string]: `${2.4 + Math.random() * 1.6}s`,
        ["--delay" as string]: `${Math.random() * 0.5}s`,
      } as React.CSSProperties,
    };
  });
}

/**
 * Global overlay that reacts to gamification events:
 * floating "+XP" pops, goal/streak/level banners and confetti.
 * Mounted once by <GamificationProvider />.
 */
export const CelebrationHost: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [pops, setPops] = useState<XpPop[]>([]);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const counter = useRef(0);
  const confettiTimer = useRef<number | null>(null);

  const confetti = useCallback((count = 90) => {
    if (prefersReducedMotion()) return;
    counter.current += 1;
    setPieces(makePieces(count, counter.current));
    if (confettiTimer.current) window.clearTimeout(confettiTimer.current);
    confettiTimer.current = window.setTimeout(() => setPieces([]), 4600);
  }, []);

  const pushBanner = useCallback((banner: Omit<Banner, "id">) => {
    const id = ++counter.current;
    setBanners((prev) => [...prev.slice(-1), { ...banner, id }]);
    window.setTimeout(() => setBanners((prev) => prev.filter((b) => b.id !== id)), 4200);
  }, []);

  useEffect(() => {
    const handle = (event: GamificationEvent) => {
      switch (event.type) {
        case "xp": {
          const id = ++counter.current;
          setPops((prev) => [...prev.slice(-2), { id, amount: event.amount, label: event.label }]);
          window.setTimeout(() => setPops((prev) => prev.filter((p) => p.id !== id)), 1700);
          playSound("xp");
          break;
        }
        case "goal":
          confetti(110);
          playSound("success");
          pushBanner({
            emoji: "🎯",
            title: "Hoàn thành mục tiêu hôm nay!",
            subtitle: "Tuyệt vời! Bạn đã đạt đủ XP cho ngày hôm nay.",
            tone: "gold",
          });
          break;
        case "streak":
          confetti(70);
          playSound("success");
          pushBanner({
            emoji: "🔥",
            title: `Chuỗi ${event.days} ngày học liên tiếp!`,
            subtitle: "Giữ lửa nhé — mỗi ngày một chút sẽ tạo nên khác biệt.",
            tone: "sakura",
          });
          break;
        case "levelup":
          confetti(130);
          playSound("levelup");
          pushBanner({
            emoji: "🌸",
            title: `Lên cấp ${event.level}!`,
            subtitle: "Kiến thức của bạn đang nở rộ như hoa anh đào.",
            tone: "indigo",
          });
          break;
        case "celebrate":
          confetti(120);
          playSound("success");
          pushBanner({
            emoji: "🎉",
            title: event.title,
            subtitle: event.subtitle,
            tone: "indigo",
          });
          break;
      }
    };
    const off = gamification.onEvent(handle);
    return () => {
      off();
      if (confettiTimer.current) window.clearTimeout(confettiTimer.current);
    };
  }, [confetti, pushBanner]);

  const toneClass: Record<Banner["tone"], string> = {
    gold: "from-amber-400 to-amber-500 text-amber-950",
    sakura: "from-rose-400 to-rose-500 text-white",
    indigo: "from-indigo-600 to-indigo-800 text-white",
  };

  return (
    <>
      {/* Confetti */}
      {pieces.length > 0 && (
        <div className="fixed inset-0 z-[80] pointer-events-none overflow-hidden" aria-hidden="true">
          {pieces.map((p) => (
            <span
              key={p.id}
              className="confetti-piece"
              style={{
                ...p.style,
                background: p.color,
                borderRadius: p.shape === "dot" ? "9999px" : p.shape === "petal" ? "0 70% 0 70%" : "2px",
              }}
            />
          ))}
        </div>
      )}

      {/* Achievement banners */}
      <div
        className="fixed top-20 inset-x-0 z-[75] flex flex-col items-center gap-2 px-4 pointer-events-none"
        role="status"
        aria-live="polite"
      >
        {banners.map((b) => (
          <div
            key={b.id}
            className={`animate-pop pointer-events-auto flex items-center gap-3 rounded-2xl bg-gradient-to-r ${toneClass[b.tone]} px-5 py-3.5 shadow-zen max-w-md w-full sm:w-auto`}
          >
            <span className="text-3xl" aria-hidden="true">
              {b.emoji}
            </span>
            <div className="min-w-0">
              <p className="font-display font-extrabold text-sm sm:text-base leading-tight">{b.title}</p>
              {b.subtitle && <p className="text-xs sm:text-[13px] opacity-90 leading-snug mt-0.5">{b.subtitle}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Floating +XP */}
      <div
        className="fixed bottom-24 lg:bottom-10 inset-x-0 z-[70] flex flex-col items-center gap-1.5 pointer-events-none"
        aria-hidden="true"
      >
        {pops.map((p) => (
          <div
            key={p.id}
            className="xp-pop inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 text-white px-3.5 py-1.5 text-sm font-bold shadow-elevated backdrop-blur"
          >
            <span className="text-amber-300">⚡ +{p.amount} XP</span>
            {p.label && <span className="text-[11px] font-medium text-slate-300">{p.label}</span>}
          </div>
        ))}
      </div>
    </>
  );
};

export default CelebrationHost;
