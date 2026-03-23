"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BreakingTicker from "./components/BreakingTicker";
import { AdBanner } from "./components/AdBanner";


export default function MainLayout({ children }: any) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <Navbar setIsOpen={setIsOpen} />
      <BreakingTicker />

      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="flex-1 p-2 pb-20">
        
          {children}
        </main>
      </div>

      <div className="fixed bottom-0 w-full z-50">
        <AdBanner position="bottom" />
      </div>
    </>
  );
}