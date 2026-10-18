"use client";

import { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import BreakingTicker from "./components/BreakingTicker";
import Footer from "./components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* 1. TOP BAR */}
      <TopBar />

      {/* 2. BRAND MASTHEAD */}
      <Header />

      {/* 3. PRIMARY HORIZONTAL NAV */}
      <Navbar setIsOpen={setIsMobileMenuOpen} />

      {/* 4. MOBILE SLIDE-OUT DRAWER */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      {/* 5. BREAKING NEWS STRIP */}
      <BreakingTicker />

      {/* 6. MAIN CONTENT AREA */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {children}
      </main>

      {/* 7. PORTAL FOOTER */}
      <Footer />
    </div>
  );
}