"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BreakingTicker from "./components/BreakingTicker";
import { AdBanner } from "./components/AdBanner";

export default function MainLayout({ children }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🔝 NAVBAR */}
      <Navbar setIsOpen={setIsOpen} />

      {/* 🔴 BREAKING NEWS */}
      <BreakingTicker />

      {/* 🔲 MAIN LAYOUT */}
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="flex-1 p-3 pb-20">
          {children}
        </main>
      </div>

      {/* 📢 BOTTOM AD */}
      <div className="fixed bottom-0 w-full z-50">
        <AdBanner position="bottom" />
      </div>
    </>
  );
}