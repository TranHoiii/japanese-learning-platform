import React from "react";
import { Link, useLocation } from "react-router-dom";
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

  return (
    <aside
      className={cn(
        "w-[240px] shrink-0 bg-white border-r border-[#E2E8F0] min-h-[calc(100vh-64px)] flex flex-col py-6 px-3 select-none",
        className,
      )}
      aria-label="Thanh điều hướng học tập"
    >
      <nav className="flex-1 space-y-6">
        {navigationData.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1.5">
            <h2 className="px-3 text-[11px] font-bold tracking-wider text-[#94A3B8] uppercase">
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
                        "group relative flex items-center px-3 py-2.5 rounded-[8px] text-sm transition-all focus-visible:outline-2 focus-visible:outline-[#2684D9]",
                        isActive
                          ? "bg-[#F0F7FF] text-[#12558F] font-semibold border-l-3 border-[#2684D9]"
                          : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] font-medium border-l-3 border-transparent",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span
                        className="text-base mr-3 shrink-0 flex items-center justify-center transition-transform group-hover:scale-110"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer info */}
      <div className="pt-4 border-t border-[#F1F5F9] px-3">
        <p className="text-[11px] text-[#94A3B8] font-medium">
          Phiên bản sơ cấp &bull; N5-N4
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
