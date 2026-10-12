import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useGamification } from "../../lib/gamification";
import { DailyGoalRing, StreakFlame } from "../gamification/GamificationWidgets";
import { cn } from "../../utils/cn";

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  label: string;
  sublabel?: string;
  href: string;
  icon: string | React.ReactNode;
  matchPattern?: (pathname: string) => boolean;
}

export const navigationData: NavSection[] = [
  {
    title: "HỌC",
    items: [
      {
        label: "Sơ cấp",
        sublabel: "Bảng chữ cái & Nền tảng",
        href: "/beginner",
        icon: "🌱",
        matchPattern: (pathname) => pathname.startsWith("/beginner"),
      },
      {
        label: "N5",
        sublabel: "Căn bản Minnano Nihongo",
        href: "/levels/n5",
        icon: "📘",
        matchPattern: (pathname) =>
          pathname === "/levels/n5" ||
          pathname.startsWith("/n5") ||
          (pathname.startsWith("/lessons") && !pathname.includes("n4")),
      },
      {
        label: "N4",
        sublabel: "Sơ trung cấp",
        href: "/levels/n4",
        icon: "📗",
        matchPattern: (pathname) =>
          pathname === "/levels/n4" || pathname.startsWith("/n4"),
      },
    ],
  },
  {
    title: "SỔ TAY",
    items: [
      {
        label: "Sổ tay",
        sublabel: "Tra cứu & Ngữ pháp",
        href: "/handbook",
        icon: "📝",
        matchPattern: (pathname) => pathname.startsWith("/handbook"),
      },
    ],
  },
  {
    title: "ÔN TẬP",
    items: [
      {
        label: "Ôn tập",
        sublabel: "Flashcard & Trắc nghiệm",
        href: "/review",
        icon: "🔄",
        matchPattern: (pathname) => pathname.startsWith("/review"),
      },
      {
        label: "Yêu thích",
        sublabel: "Nội dung đã lưu",
        href: "/favorites",
        icon: "⭐",
        matchPattern: (pathname) => pathname.startsWith("/favorites"),
      },
    ],
  },
  {
    title: "CÁ NHÂN",
    items: [
      {
        label: "Tiến độ",
        sublabel: "Thống kê học tập",
        href: "/progress",
        icon: "📊",
        matchPattern: (pathname) => pathname.startsWith("/progress"),
      },
    ],
  },
];

export interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const stats = useGamification();

  return (
    <aside
      className={cn(
        "w-[260px] shrink-0 bg-white/70 backdrop-blur border-r border-slate-200/80 min-h-[calc(100vh-64px)] flex flex-col py-6 px-4 select-none",
        className,
      )}
      aria-label="Thanh điều hướng học tập"
    >
      <nav className="flex-1 space-y-6">
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
                      className={cn(
                        "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all focus-visible:outline-2 focus-visible:outline-indigo-500",
                        isActive
                          ? "bg-indigo-50 text-indigo-900 font-bold"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-indigo-600" aria-hidden="true" />
                      )}
                      <span
                        className={cn(
                          "w-9 h-9 rounded-[10px] flex items-center justify-center text-lg shrink-0 transition-all group-hover:scale-110",
                          isActive ? "bg-white shadow-sm" : "bg-slate-100 group-hover:bg-white",
                        )}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span className="truncate leading-tight">{item.label}</span>
                        {item.sublabel && (
                          <span className="text-[11px] text-slate-400 font-normal truncate leading-tight mt-0.5">
                            {item.sublabel}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Daily goal mini-card */}
      {currentUser ? (
        <Link
          to="/progress"
          className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-card hover:shadow-elevated transition-shadow"
        >
          <DailyGoalRing value={stats.xpToday} goal={stats.dailyGoal} size={52} strokeWidth={6}>
            <span className="text-lg" aria-hidden="true">{stats.goalReached ? "🎯" : "⚡"}</span>
          </DailyGoalRing>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 leading-tight">
              {stats.goalReached ? "Đã đạt mục tiêu!" : "Mục tiêu hôm nay"}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 tabular-nums">
              {stats.xpToday}/{stats.dailyGoal} XP
            </p>
            <p className="text-[11px] text-amber-700 font-semibold mt-0.5 flex items-center gap-1">
              <StreakFlame active={stats.streak > 0} className="text-xs" />
              {stats.streak} ngày liên tiếp
            </p>
          </div>
        </Link>
      ) : (
        <Link
          to="/register"
          className="mt-6 block rounded-2xl hero-ink p-4 text-white shadow-zen hover:brightness-110 transition"
        >
          <p className="font-display font-bold text-sm">Lưu tiến độ của bạn</p>
          <p className="text-[11px] text-white/80 mt-1 leading-snug">
            Đăng ký miễn phí để theo dõi chuỗi ngày học, XP và ôn tập thông minh.
          </p>
        </Link>
      )}
    </aside>
  );
};

export default Sidebar;
