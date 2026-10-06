import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navigationData } from "./Sidebar";
import { cn } from "../../utils/cn";

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

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
        className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-[280px] bg-white h-full shadow-[0_10px_30px_rgba(15,23,42,0.2)] flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="h-16 px-4 border-b border-[#E2E8F0] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-[6px] bg-[#F0F7FF] border border-[#BBDDFF] text-[#12558F] font-bold text-xs flex items-center justify-center font-japanese">
              日
            </div>
            <span className="font-bold text-sm text-[#0F172A]">Japanese Learning</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng danh mục học tập"
            className="p-2 -mr-1 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-[8px] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
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
                        onClick={onClose}
                        className={cn(
                          "flex items-center px-3 py-3 rounded-[8px] text-sm min-h-[44px] transition-colors focus-visible:outline-2 focus-visible:outline-[#2684D9]",
                          isActive
                            ? "bg-[#F0F7FF] text-[#12558F] font-semibold border-l-3 border-[#2684D9]"
                            : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] font-medium border-l-3 border-transparent",
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="text-lg mr-3 shrink-0" aria-hidden="true">
                          {item.icon}
                        </span>
                        <div className="flex flex-col truncate">
                          <span className="truncate">{item.label}</span>
                          {item.sublabel && (
                            <span className="text-[11px] text-[#94A3B8] font-normal truncate">
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
        <div className="p-4 border-t border-[#F1F5F9] bg-[#F8FAFC]">
          <p className="text-xs text-[#64748B] text-center">
            Nền tảng học tiếng Nhật cho người Việt
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
