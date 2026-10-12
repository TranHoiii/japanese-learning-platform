import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { reviewApi } from "../../services/reviewApi";
import { cn } from "../../utils/cn";

const ICONS = {
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  learn:
    "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  review: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  progress:
    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
};

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  const { data: dueItems = [] } = useQuery({
    queryKey: ["review-items-due"],
    queryFn: () => reviewApi.getDueReviewItems(),
    enabled: !!currentUser,
  });

  const path = location.pathname;
  const isLearningActive =
    path.startsWith("/beginner") ||
    path.startsWith("/levels") ||
    path.startsWith("/n5") ||
    path.startsWith("/n4") ||
    path.startsWith("/lessons");

  const destinations = [
    { label: "Trang chủ", href: "/", isActive: path === "/", icon: ICONS.home },
    { label: "Học", href: "/levels/n5", isActive: isLearningActive, icon: ICONS.learn },
    { label: "Ôn tập", href: "/review", isActive: path.startsWith("/review"), icon: ICONS.review, badge: dueItems.length },
    { label: "Tiến độ", href: "/progress", isActive: path.startsWith("/progress"), icon: ICONS.progress },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1 pointer-events-none"
      aria-label="Điều hướng dưới cùng"
    >
      <div className="pointer-events-auto grid grid-cols-4 h-16 max-w-md mx-auto rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-zen px-1.5">
        {destinations.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            aria-current={item.isActive ? "page" : undefined}
            className="relative flex flex-col items-center justify-center gap-0.5 rounded-2xl my-1.5 select-none transition-colors focus-visible:outline-2 focus-visible:outline-indigo-500"
          >
            <span
              className={cn(
                "relative flex items-center justify-center w-11 h-7 rounded-full transition-all duration-300",
                item.isActive ? "bg-indigo-100 text-indigo-800" : "text-slate-500",
              )}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={item.isActive ? 2.4 : 2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.badge ? (
                <span className="absolute -top-1 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center leading-none border-2 border-white">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              ) : null}
            </span>
            <span
              className={cn(
                "text-[11px] leading-none tracking-tight",
                item.isActive ? "text-indigo-900 font-bold" : "text-slate-500 font-medium",
              )}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
