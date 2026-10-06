import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { progressApi } from "../../services/progressApi";
import { cn } from "../../utils/cn";

export interface HeaderProps {
  onOpenMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  isMobileMenuOpen = false,
}) => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Fetch progress summary to display matching Daily XP
  const { data: progressSummary } = useQuery({
    queryKey: ["progress-summary"],
    queryFn: progressApi.getProgressSummary,
    enabled: !!currentUser,
  });

  const overallPercent = progressSummary?.overallProgress ?? 0;
  const currentXp = overallPercent > 0 ? overallPercent * 5 : 0;
  const targetXp = 500;
  const xpPercent = Math.min(100, Math.round((currentXp / targetXp) * 100));

  // Close user menu on outside click or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isUserMenuOpen]);

  // Determine active state for high-level header navigation
  const isLearningActive =
    location.pathname.startsWith("/beginner") ||
    location.pathname.startsWith("/levels") ||
    location.pathname.startsWith("/n5") ||
    location.pathname.startsWith("/n4") ||
    location.pathname.startsWith("/lessons");

  const isReviewActive = location.pathname.startsWith("/review");
  const isProgressActive = location.pathname.startsWith("/progress");
  const isFavoritesActive = location.pathname.startsWith("/favorites");
  const isSearchActive = location.pathname.startsWith("/search");

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="max-w-[1200px] h-full mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Mở danh mục học tập"
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden p-2 -ml-2 text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-[8px] transition-colors focus-visible:outline-2 focus-visible:outline-[#2684D9]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2.5 text-left group focus-visible:outline-2 focus-visible:outline-[#2684D9] rounded-[8px] p-1"
          >
            <div className="w-8 h-8 rounded-[8px] bg-[#F0F7FF] border border-[#BBDDFF] text-[#12558F] font-bold text-sm flex items-center justify-center font-japanese transition-colors group-hover:bg-[#2684D9] group-hover:text-white">
              日
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] sm:text-base font-bold text-[#0F172A] leading-tight tracking-tight group-hover:text-[#2684D9] transition-colors">
                Japanese Learning
              </span>
              <span className="text-[11px] text-[#64748B] font-japanese font-medium leading-none">
                日本語
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop High-Level Navigation & Daily XP widget */}
        <div className="hidden md:flex items-center space-x-6">
          <nav
            className="flex items-center space-x-1"
            aria-label="Điều hướng chính"
          >
            <Link
              to="/levels/n5"
              id="learning-nav-link"
              className={cn(
                "px-3.5 py-2 rounded-[10px] text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-[#2684D9]",
                isLearningActive
                  ? "bg-[#F0F7FF] text-[#12558F] font-semibold"
                  : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]",
              )}
            >
              Học
            </Link>

            <Link
              to="/review"
              id="review-nav-link"
              className={cn(
                "px-3.5 py-2 rounded-[10px] text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-[#2684D9]",
                isReviewActive
                  ? "bg-[#F0F7FF] text-[#12558F] font-semibold"
                  : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]",
              )}
            >
              Ôn tập
            </Link>

            <Link
              to="/progress"
              id="progress-nav-link"
              className={cn(
                "px-3.5 py-2 rounded-[10px] text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-[#2684D9]",
                isProgressActive
                  ? "bg-[#F0F7FF] text-[#12558F] font-semibold"
                  : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]",
              )}
            >
              Tiến độ
            </Link>

            <Link
              to="/handbook"
              id="handbook-nav-link"
              className={cn(
                "px-3.5 py-2 rounded-[10px] text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-[#2684D9]",
                location.pathname.startsWith("/handbook")
                  ? "bg-[#F0F7FF] text-[#12558F] font-semibold"
                  : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]",
              )}
            >
              Sổ tay
            </Link>
          </nav>
        </div>

        {/* Right: Gamification widgets & User profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Streak Flame Badge */}
          <Link
            to="/progress"
            title="Chuỗi ngày học liên tục: 14 ngày"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold hover:bg-amber-500/20 transition-all cursor-pointer"
          >
            <span className="text-sm">🔥</span>
            <span>14 ngày</span>
          </Link>

          {/* Daily XP Progress Pill (Hidden on mobile) */}
          <Link
            to="/progress"
            title={`Mục tiêu học hôm nay: ${currentXp}/${targetXp} XP (${xpPercent}%)`}
            className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/70 border border-slate-200/80 text-xs font-medium text-slate-700 transition-colors"
          >
            <span className="text-[11px] text-slate-500 font-semibold uppercase">Daily XP</span>
            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(currentXp > 0 ? 5 : 0, xpPercent)}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-indigo-700">
              {currentXp}/{targetXp}
            </span>
          </Link>

          {/* Quick Search */}
          <Link
            to="/search"
            id="search-nav-link"
            aria-label="Tìm kiếm bài học và từ vựng"
            className={cn(
              "p-2 text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-[8px] transition-colors focus-visible:outline-2 focus-visible:outline-[#2684D9]",
              isSearchActive && "text-[#12558F] bg-[#F0F7FF]",
            )}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>

          {/* Quick Favorites */}
          <Link
            to="/favorites"
            id="favorites-nav-link"
            aria-label="Mục yêu thích đã lưu"
            className={cn(
              "p-2 text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-[8px] transition-colors focus-visible:outline-2 focus-visible:outline-[#2684D9]",
              isFavoritesActive && "text-[#12558F] bg-[#F0F7FF]",
            )}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </Link>

          {/* User Menu / Authentication */}
          {currentUser ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="menu"
                aria-label="Mở menu người dùng"
                className="flex items-center space-x-2 p-1.5 rounded-[8px] hover:bg-[#F1F5F9] transition-colors focus-visible:outline-2 focus-visible:outline-[#2684D9] cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#F0F7FF] text-[#12558F] font-bold text-xs flex items-center justify-center border border-[#BBDDFF]">
                  {currentUser.fullName
                    ? currentUser.fullName.charAt(0).toUpperCase()
                    : currentUser.email.charAt(0).toUpperCase()}
                </div>
                <span className="hidden lg:inline-block text-xs font-semibold text-[#0F172A] max-w-[120px] truncate text-left">
                  {currentUser.fullName || currentUser.email}
                </span>
                <svg
                  className="hidden lg:inline-block w-4 h-4 text-[#64748B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute right-0 mt-2 w-56 bg-white rounded-[12px] border border-[#E2E8F0] shadow-[0_4px_12px_rgba(15,23,42,0.08)] py-1.5 z-50 animate-in fade-in"
                >
                  <div className="px-4 py-2 border-b border-[#F1F5F9]">
                    <p className="text-xs font-semibold text-[#0F172A] truncate">
                      {currentUser.fullName || "Người học"}
                    </p>
                    <p className="text-[11px] text-[#64748B] truncate">
                      {currentUser.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/progress"
                      role="menuitem"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-xs sm:text-sm text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Tiến độ học tập
                    </Link>

                    <Link
                      to="/favorites"
                      role="menuitem"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-xs sm:text-sm text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Mục yêu thích
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-[#F1F5F9]">
                    <button
                      type="button"
                      id="logout-button"
                      role="menuitem"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center px-4 py-2 text-xs sm:text-sm text-[#EF4444] hover:bg-[#FEF2F2] transition-colors text-left cursor-pointer"
                    >
                      <svg className="w-4 h-4 mr-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                id="login-link"
                className="px-3 py-1.5 rounded-[8px] text-xs sm:text-sm font-semibold text-[#12558F] hover:bg-[#F0F7FF] transition-colors focus-visible:outline-2 focus-visible:outline-[#2684D9]"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                id="register-link"
                className="hidden sm:inline-flex px-3 py-1.5 rounded-[8px] text-xs sm:text-sm font-semibold bg-[#2684D9] text-white hover:bg-[#1769B0] transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-[#2684D9]"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
