"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Search,
  X,
  Moon,
  Sun,
  Home,
  Tv,
} from "lucide-react";

interface NavbarProps {
  setIsOpen: (open: boolean) => void;
}

export default function Navbar({ setIsOpen }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  };

  const navLinks = [
    { name: "होम", href: "/", icon: <Home size={15} /> },
    { name: "देश", href: "/india" },
    { name: "सतना", href: "/satna" },
    { name: "पन्ना", href: "/panna" },
    { name: "छतरपुर", href: "/chhatarpur" },
    { name: "क्रिकेट", href: "/cricket" },
    { name: "मनोरंजन", href: "/entertainment" },
    { name: "पंचांग", href: "/panchang" },
    { name: "वीडियो/Live", href: "/video", icon: <Tv size={15} /> },
    { name: "ई-पेपर", href: "/epaper" },
    { name: "गैलरी", href: "/gallery" },
    { name: "खबर भेजें", href: "/submit-news" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#c00] text-white shadow-md border-b-2 border-red-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between">
        {/* MOBILE MENU BUTTON */}
        <div className="flex items-center lg:hidden py-2">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Navigation Menu"
            className="p-1.5 rounded-md hover:bg-red-800 transition"
          >
            <Menu size={24} />
          </button>
          <Link href="/" className="ml-2 font-bold text-base tracking-tight truncate">
            STAR NEWS
          </Link>
        </div>

        {/* DESKTOP NAV LINKS (SATNA TIMES STYLE) */}
        <div className="hidden lg:flex items-center gap-0.5 overflow-x-auto py-0">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-1 px-3 py-3 text-[13px] font-bold tracking-wide transition border-b-2 whitespace-nowrap
                  ${
                    isActive
                      ? "bg-red-800 border-yellow-300 text-yellow-300 shadow-inner"
                      : "border-transparent hover:bg-red-700 hover:text-white"
                  }`}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* RIGHT CONTROLS: SEARCH & THEME TOGGLE */}
        <div className="flex items-center gap-1 sm:gap-2 py-2">
          {/* SEARCH BUTTON */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search Star News"
            className="p-2 rounded-full hover:bg-red-800 transition text-white"
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full hover:bg-red-800 transition text-white"
          >
            {isDark ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* SEARCH BAR DROPDOWN */}
      {searchOpen && (
        <div className="bg-red-950 px-4 py-3 border-t border-red-800 shadow-lg animate-fadeIn">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="खबरें, विषय या शहर खोजें..."
                className="w-full bg-white text-gray-900 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                autoFocus
              />
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-gray-500"
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold px-4 py-2 rounded-lg text-sm transition"
            >
              खोजें
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}