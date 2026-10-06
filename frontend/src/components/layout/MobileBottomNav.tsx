import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  const isHomeActive = location.pathname === "/";
  const isLearningActive =
    location.pathname.startsWith("/beginner") ||
    location.pathname.startsWith("/levels") ||
    location.pathname.startsWith("/n5") ||
    location.pathname.startsWith("/n4") ||
    location.pathname.startsWith("/lessons");
  const isReviewActive = location.pathname.startsWith("/review");
  const isProgressActive = location.pathname.startsWith("/progress");

  const destinations = [
    {
      label: "Trang chủ",
      href: "/",
      isActive: isHomeActive,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      label: "Học",
      href: "/levels/n5",
      isActive: isLearningActive,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      label: "Ôn",
      href: "/review",
      isActive: isReviewActive,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
    },
    {
      label: "Tiến độ",
      href: "/progress",
      isActive: isProgressActive,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] shadow-[0_-2px_10px_rgba(15,23,42,0.04)] pb-[env(safe-area-inset-bottom)]"
      aria-label="Điều hướng dưới cùng"
    >
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto">
        {destinations.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors select-none focus-visible:outline-2 focus-visible:outline-[#2684D9]",
              item.isActive
                ? "text-[#2684D9] font-semibold"
                : "text-[#64748B] hover:text-[#0F172A] font-medium",
            )}
            aria-current={item.isActive ? "page" : undefined}
          >
            <div className="shrink-0 mb-1">{item.icon}</div>
            <span className="text-[11px] leading-none tracking-tight">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
