"use client";

import DarkModeToggle from "./DarkModeToggle";

export default function Navbar({ setIsOpen }: any) {
  return (
    <header className="sticky top-0 z-50 shadow">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-red-700 to-red-600 text-white">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>

          <div className="flex items-center gap-2">
            <span className="text-2xl">📰</span>
            <h1 className="text-xl md:text-2xl font-extrabold">
              STAR <span className="text-yellow-300">NEWS</span>
            </h1>
          </div>

          {/* LIVE */}
          <span className="bg-green-500 text-xs px-2 py-1 rounded animate-pulse hidden md:block">
            LIVE
          </span>
        </div>

        {/* CENTER (Search) */}
        <input
          type="text"
          placeholder="Search news..."
          className="hidden md:block px-3 py-1 rounded text-black w-64"
        />

        {/* RIGHT */}
        <div className="flex items-center gap-4">

        

          {/* Notification */}
          <span className="text-xl cursor-pointer">🔔</span>

          {/* Profile */}
          <span className="text-xl">👤</span>

        </div>

      </div>

      {/* BREAKING NEWS */}
     <div className="bg-yellow-400 text-black text-sm overflow-hidden">
  <div className="whitespace-nowrap animate-scroll px-4 py-1">
    🔥 Breaking: India wins match | Heavy rain alert | New policy announced
  </div>
</div>

    </header>
  );
}