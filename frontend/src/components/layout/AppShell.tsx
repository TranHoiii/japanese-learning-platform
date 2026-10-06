import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import MobileBottomNav from "./MobileBottomNav";
import { cn } from "../../utils/cn";

export interface AppShellProps {
  children?: React.ReactNode;
  showSidebar?: boolean;
  className?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  showSidebar = true,
  className,
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className={cn("min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col", className)}>
      {/* Header (sticky top-0, 64px) */}
      <Header
        onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
        isMobileMenuOpen={isMobileDrawerOpen}
      />

      {/* Mobile Drawer (left slide-in) */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      {/* Main Container: Sidebar + Content */}
      <div className="flex-1 flex w-full max-w-[1440px] mx-auto">
        {showSidebar && (
          <div className="hidden lg:block shrink-0">
            <Sidebar className="sticky top-16" />
          </div>
        )}

        <main
          id="main-content"
          className="flex-1 min-w-0 pb-24 lg:pb-12 focus:outline-none"
          tabIndex={-1}
        >
          {children || <Outlet />}
        </main>
      </div>

      {/* Mobile Bottom Navigation (fixed bottom, mobile/tablet only) */}
      <MobileBottomNav />
    </div>
  );
};

export default AppShell;
