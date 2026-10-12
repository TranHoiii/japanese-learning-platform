import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navigationData } from "./Sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { useGamification } from "../../lib/gamification";
import { StreakFlame } from "../gamification/GamificationWidgets";
import { cn } from "../../utils/cn";

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const stats = useGamification();

  // Close on Escape and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Close drawer whenever route changes
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden flex"
      role="dialog"
      aria-modal="true"
      aria-label="Danh mục học tập"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-[300px] bg-slate-50 h-full shadow-modal flex flex-col z-10 animate-slide-left">
        {/* Drawer Header */}
        <div className="hero-ink pattern-seigaiha px-4 pt-4 pb-5 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-[12px] bg-white/15 border border-white/25 text-white font-extrabold text-lg flex items-center justify-center font-mincho">
                日
              </span>
              <span className="font-display font-extrabold text-base">Nihongo.</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng danh mục học tập"
              className="p-2 -mr-1 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {currentUser && (
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 px-3 py-2.5">
              <StreakFlame active={stats.streak > 0} className="text-2xl" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold leading-tight">{stats.streak} ngày liên tiếp</p>
                <p className="text-[11px] text-white/75 tabular-nums">
                  Hôm nay {stats.xpToday}/{stats.dailyGoal} XP · Cấp {stats.level}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {navigationData.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              <h2 className="px-3 text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase font-sans">
                {section.title}
              </h2>

              <ul className="space-y-1" role="list">
                {section.items.map((item, iIdx) => {
                  const isActive = item.matchPattern
                    ? item.matchPattern(location.pathname)
                    : location.pathname === item.href;

                  return (
                    <li key={iIdx}>
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm min-h-[48px] transition-colors focus-visible:outline-2 focus-visible:outline-indigo-500",
                          isActive
                            ? "bg-white text-indigo-900 font-bold shadow-card ring-1 ring-indigo-100"
                            : "text-slate-600 hover:bg-white hover:text-slate-900 font-medium",
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span
                          className={cn(
                            "w-9 h-9 rounded-[10px] flex items-center justify-center text-lg shrink-0",
                            isActive ? "bg-indigo-50" : "bg-slate-100",
                          )}
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                        <div className="flex flex-col truncate">
                          <span className="truncate leading-tight">{item.label}</span>
                          {item.sublabel && (
                            <span className="text-[11px] text-slate-400 font-normal truncate leading-tight mt-0.5">
                              {item.sublabel}
                            </span>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <p className="text-xs text-slate-500 text-center">Nền tảng học tiếng Nhật cho người Việt</p>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
