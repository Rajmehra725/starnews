"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  X,
  Search,
  Home,
  MapPin,
  Tv,
  Film,
  Trophy,
  MoonStar,
  Newspaper,
  Image as ImageIcon,
  Send,
  Phone,
  FileText,
  ShieldCheck,
} from "lucide-react";
import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const navItems = [
    { name: "होम (Home)", href: "/", icon: <Home size={18} /> },
    { name: "देश (National)", href: "/india", icon: <MapPin size={18} /> },
    { name: "सतना (Satna)", href: "/satna", icon: <MapPin size={18} /> },
    { name: "पन्ना (Panna)", href: "/panna", icon: <MapPin size={18} /> },
    { name: "छतरपुर (Chhatarpur)", href: "/chhatarpur", icon: <MapPin size={18} /> },
    { name: "क्रिकेट व खेल (Cricket)", href: "/cricket", icon: <Trophy size={18} /> },
    { name: "मनोरंजन (Entertainment)", href: "/entertainment", icon: <Film size={18} /> },
    { name: "पंचांग व राशिफल (Panchang)", href: "/panchang", icon: <MoonStar size={18} /> },
    { name: "वीडियो व लाइव टीवी (Video/Live TV)", href: "/video", icon: <Tv size={18} /> },
    { name: "ई-पेपर (E-Paper)", href: "/epaper", icon: <Newspaper size={18} /> },
    { name: "फोटो गैलरी (Gallery)", href: "/gallery", icon: <ImageIcon size={18} /> },
    { name: "खबर भेजें (Submit News)", href: "/submit-news", icon: <Send size={18} /> },
  ];

  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* DRAWER */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[82%] max-w-sm bg-white dark:bg-gray-900 z-50 lg:hidden transform transition-transform duration-300 shadow-2xl flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="bg-red-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white p-0.5 shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="font-extrabold text-base tracking-wide">
                STAR NEWS
              </h2>
              <p className="text-[10px] text-red-200">सच्ची और निष्पक्ष पत्रकारिता</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Menu"
            className="p-2 rounded-full hover:bg-red-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="खबर खोजें..."
              className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg pl-9 pr-3 py-2 text-xs border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <Search
              size={15}
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </form>
        </div>

        {/* NAV LIST */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1">
            मुख्य श्रेणियां
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400 transition"
            >
              <span className="text-red-600 dark:text-red-400">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1">
              जानकारी व संपर्क
            </div>
            <Link
              href="/about-us"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-xs text-gray-600 dark:text-gray-400 hover:text-red-600 transition"
            >
              <FileText size={15} /> हमारे बारे में (About Us)
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-xs text-gray-600 dark:text-gray-400 hover:text-red-600 transition"
            >
              <Phone size={15} /> संपर्क करें (Contact Us)
            </Link>
            <Link
              href="/privacy-policy"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-xs text-gray-600 dark:text-gray-400 hover:text-red-600 transition"
            >
              <ShieldCheck size={15} /> गोपनीयता नीति (Privacy Policy)
            </Link>
          </div>
        </div>

        {/* SOCIAL & FOOTER */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-300 mb-2">
            <a
              href="https://youtube.com/@starnewsnetworks88?si=HHAEJevcHq48Fdrh"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm hover:text-red-600 transition"
            >
              <FaYoutube size={16} />
            </a>
            <a
              href="https://www.facebook.com/share/1Dj3yMqD7R/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm hover:text-blue-600 transition"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://www.instagram.com/reel/DSEzE6VjA1u/?igsh=enR1OGZ0ZmN4enhz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm hover:text-pink-600 transition"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://wa.me/919871014353"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm hover:text-green-600 transition"
            >
              <FaWhatsapp size={16} />
            </a>
          </div>
          <p className="text-[10px] text-center text-gray-400">
            © 2026 Star News Network. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
