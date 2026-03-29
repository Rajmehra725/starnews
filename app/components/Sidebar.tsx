"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin,TvIcon,LocationEditIcon } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }: any) {
  const pathname = usePathname();

  const links = [
   
    { name: "Home", href: "/", icon: "🏠" },
     { name: "Panna ", href: "/panna", icon: <MapPin size={18} /> },
      { name: "Satna", href: "/satna", icon: <TvIcon size={18} /> },
       { name: "Chhatarpur", href: "/chhatarpur", icon: <LocationEditIcon size={18} /> },
    { name: "India", href: "/india", icon: "🇮🇳" },
    { name: "Entertainment", href: "/entertainment", icon: "🎬" },
    { name: "Video", href: "/video", icon: "🎥" },
    { name: "Submit", href: "/submit-news", icon: "📤" },
    { name: "Cricket", href: "/cricket", icon: "🔴" },
    { name: "Panchang", href: "/panchang", icon: "🪔" },
  ];

  return (
    <>
      {/* BACKDROP MOBILE */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky md:top-0 
        top-0 left-0 h-screen w-64 
        bg-gradient-to-b from-red-700 to-red-900 text-white
        transform transition-transform duration-300
        z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        flex flex-col`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-red-500">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <h2 className="text-lg font-bold tracking-wide">
              STAR NEWS
            </h2>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* NAV */}
        <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition font-medium
                ${
                  active
                    ? "bg-white text-red-700 font-bold shadow"
                    : "hover:bg-red-800"
                }`}
              >
                <span className="text-lg flex items-center">
                  {link.icon}
                </span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-4 text-xs text-red-200 border-t border-red-500">
          © 2026 STAR NEWS
        </div>
      </aside>
    </>
  );
}