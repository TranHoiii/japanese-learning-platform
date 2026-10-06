import React, { useState } from "react";
import Header from "./layout/Header";
import MobileDrawer from "./layout/MobileDrawer";
import MobileBottomNav from "./layout/MobileBottomNav";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Header
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <MobileBottomNav />
    </>
  );
}
