"use client";

import { DarkModeToggle } from "./DarkModeToggle";

export default function Navbar({ setIsOpen }: any) {
  return (
    <header className="sticky top-0 z-50 shadow">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-red-700 to-red-600 text-white">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          
          {/* ☰ HAMBURGER (mobile only) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">📰</span>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-wide">
              STAR <span className="text-yellow-300">NEWS</span>
            </h1>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <DarkModeToggle />
        </div>

      </div>

    </header>
  );
}