import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { reviewApi } from "../../services/reviewApi";
import { useGamification } from "../../lib/gamification";
import { setSoundMuted, useSoundMuted } from "../../lib/sound";
import { StreakFlame } from "../gamification/GamificationWidgets";
import StatsPopover from "../gamification/StatsPopover";
import ThemeToggle from "./ThemeToggle";
import { cn } from "../../utils/cn";

export interface HeaderProps {
  onOpenMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
  /** Align with the wide AppShell container (sidebar layout). */
  wide?: boolean;
}

const iconBtn =
  "p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-indigo-500 cursor-pointer";

/** Closes a popover on outside click / Escape. */
function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
  return ref;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  isMobileMenuOpen = false,
  wide = false,
}) => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const stats = useGamification();
  const soundMuted = useSoundMuted();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const userMenuRef = useDismiss(isUserMenuOpen, () => setIsUserMenuOpen(false));
  const statsRef = useDismiss(isStatsOpen, () => setIsStatsOpen(false));

  // Review items due → shows an attention badge on "Ôn tập"
  const { data: dueItems = [] } = useQuery({
    queryKey: ["review-items-due"],
    queryFn: () => reviewApi.getDueReviewItems(),
    enabled: !!currentUser,
  });
  const dueCount = dueItems.length;

  const path = location.pathname;
  const isLearningActive =
    path.startsWith("/beginner") ||
    path.startsWith("/levels") ||
    path.startsWith("/n5") ||
    path.startsWith("/n4") ||
    path.startsWith("/lessons");

  const navItems = [
    { id: "learning-nav-link", to: "/levels/n5", label: "Học", active: isLearningActive },
    { id: "review-nav-link", to: "/review", label: "Ôn tập", active: path.startsWith("/review"), badge: dueCount },
    { id: "progress-nav-link", to: "/progress", label: "Tiến độ", active: path.startsWith("/progress") },
    { id: "handbook-nav-link", to: "/handbook", label: "Sổ tay", active: path.startsWith("/handbook") },
  ];

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/85 backdrop-blur-xl border-b border-slate-200/80">
      <div
        className={cn(
          "h-full mx-auto px-4 sm:px-6 flex items-center justify-between gap-3",
          wide ? "max-w-[1440px]" : "max-w-[1280px]",
        )}
      >
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Mở danh mục học tập"
            aria-expanded={isMobileMenuOpen}
            className={cn(iconBtn, "lg:hidden -ml-2")}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link
            to="/"
            className="flex items-center gap-2.5 group rounded-xl p-1 focus-visible:outline-2 focus-visible:outline-indigo-500"
          >
            <span className="relative w-9 h-9 rounded-[12px] bg-gradient-to-br from-indigo-500 to-indigo-800 text-white font-extrabold text-lg flex items-center justify-center font-mincho shadow-[0_3px_0_0_#1D3050] transition-transform group-hover:-rotate-6 group-active:translate-y-[2px] group-active:shadow-none">
              日
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-400 border-2 border-white" />
            </span>
            <span className="hidden min-[400px]:flex flex-col">
              <span className="font-display text-[15px] font-extrabold text-slate-900 leading-tight tracking-tight">
                Nihongo<span className="text-rose-500">.</span>
              </span>
              <span className="text-[11px] text-slate-500 font-japanese font-medium leading-none">日本語を学ぼう</span>
            </span>
          </Link>
        </div>

        {/* Center: primary navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <Link
              key={item.id}
              id={item.id}
              to={item.to}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "relative px-4 py-2 rounded-xl text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-indigo-500",
                item.active
                  ? "bg-indigo-50 text-indigo-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
              )}
            >
              {item.label}
              {item.badge ? (
                <span className="ml-1.5 inline-flex min-w-5 h-5 px-1.5 items-center justify-center rounded-full bg-rose-500 text-white text-[11px] font-bold leading-none align-middle">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>

        {/* Right: gamification + utilities + user */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {currentUser && (
            <div className="relative mr-1" ref={statsRef}>
              <button
                type="button"
                onClick={() => setIsStatsOpen((v) => !v)}
                aria-expanded={isStatsOpen}
                aria-haspopup="dialog"
                aria-label={`Chuỗi ${stats.streak} ngày, ${stats.xpToday} trên ${stats.dailyGoal} XP hôm nay`}
                className={cn(
                  "flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer",
                  stats.streak > 0
                    ? "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
                    : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200/70",
                )}
              >
                <StreakFlame active={stats.streak > 0} className="text-base" />
                <span className="tabular-nums">{stats.streak}</span>
                <span
                  className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-current/20"
                  title={`${stats.xpToday}/${stats.dailyGoal} XP hôm nay`}
                >
                  <span className="w-12 h-1.5 rounded-full bg-black/10 overflow-hidden">
                    <span
                      className={cn(
                        "block h-full rounded-full transition-all duration-700",
                        stats.goalReached ? "bg-amber-500" : "bg-indigo-500",
                      )}
                      style={{ width: `${Math.max(stats.xpToday > 0 ? 8 : 0, stats.goalPercent)}%` }}
                    />
                  </span>
                  <span className="tabular-nums text-[11px]">{stats.xpToday} XP</span>
                </span>
              </button>

              {isStatsOpen && (
                <StatsPopover
                  stats={stats}
                  className="animate-pop absolute right-0 mt-2.5 w-[320px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl border border-slate-200 shadow-zen p-5 z-50 origin-top-right"
                />
              )}
            </div>
          )}

          <Link
            to="/search"
            id="search-nav-link"
            aria-label="Tìm kiếm bài học và từ vựng"
            className={cn(iconBtn, path.startsWith("/search") && "text-indigo-800 bg-indigo-50")}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          <ThemeToggle />

          <Link
            to="/favorites"
            id="favorites-nav-link"
            aria-label="Mục yêu thích đã lưu"
            className={cn(iconBtn, "hidden sm:inline-flex", path.startsWith("/favorites") && "text-rose-600 bg-rose-50")}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>

          {currentUser ? (
            <div className="relative ml-1" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((v) => !v)}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="menu"
                aria-label="Mở menu người dùng"
                className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-500 cursor-pointer"
              >
                <span className="relative w-9 h-9 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                  {(currentUser.fullName || currentUser.email).charAt(0).toUpperCase()}
                  <span className="absolute -bottom-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-indigo-700 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white leading-none">
                    {stats.level}
                  </span>
                </span>
                <svg className="hidden lg:block w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  className="animate-pop absolute right-0 mt-2.5 w-64 bg-white rounded-2xl border border-slate-200 shadow-zen py-2 z-50 origin-top-right"
                >
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900 truncate">{currentUser.fullName || "Người học"}</p>
                    <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                    <p className="text-[11px] font-semibold text-indigo-700 mt-1.5">
                      Cấp {stats.level} · {stats.totalXp} XP
                    </p>
                  </div>

                  <div className="py-1">
                    {[
                      { to: "/progress", label: "Tiến độ học tập", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
                      { to: "/favorites", label: "Mục yêu thích", d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        role="menuitem"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.d} />
                        </svg>
                        {item.label}
                      </Link>
                    ))}
                    {currentUser.role === "ADMIN" && (
                      <Link
                        to="/admin"
                        role="menuitem"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      >
                        <span className="w-4 mr-3 text-center text-slate-400" aria-hidden="true">⚙</span>
                        Trang quản trị
                      </Link>
                    )}
                    <button
                      type="button"
                      role="menuitemcheckbox"
                      aria-checked={!soundMuted}
                      onClick={() => setSoundMuted(!soundMuted)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center">
                        <span className="w-4 mr-3 text-center" aria-hidden="true">{soundMuted ? "🔇" : "🔊"}</span>
                        Âm thanh hiệu ứng
                      </span>
                      <span
                        className={cn(
                          "w-9 h-5 rounded-full p-0.5 transition-colors",
                          soundMuted ? "bg-slate-300" : "bg-indigo-600",
                        )}
                        aria-hidden="true"
                      >
                        <span
                          className={cn(
                            "block w-4 h-4 rounded-full bg-white shadow transition-transform",
                            !soundMuted && "translate-x-4",
                          )}
                        />
                      </span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      id="logout-button"
                      role="menuitem"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 ml-1">
              <Link
                to="/login"
                id="login-link"
                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-indigo-800 hover:bg-indigo-50 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                id="register-link"
                className="hidden sm:inline-flex px-4 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-[0_3px_0_0_#1D3050] active:translate-y-[2px] active:shadow-none focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                Đăng ký miễn phí
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
