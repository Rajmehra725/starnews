"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BreakingTicker from "./components/BreakingTicker";
import { AdBanner } from "./components/AdBanner";
import Weather from "./components/weather";
export default function MainLayout({ children }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar setIsOpen={setIsOpen} />

      <BreakingTicker />
       <Weather />
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="flex-1 p-3 pb-20 min-h-screen">
          {children}
        </main>
      </div>

      <div className="fixed bottom-0 w-full z-50">
        <AdBanner position="bottom" />
      </div>
    </>
  );
}