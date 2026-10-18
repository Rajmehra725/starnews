"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBroadcastTower } from "react-icons/fa";

export default function Header() {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* LOGO & BRAND MASTHEAD */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-red-600 shadow-sm shrink-0 bg-white p-0.5">
            <Image
              src="/logo.jpeg"
              alt="Star News Network Logo"
              width={64}
              height={64}
              priority
              className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white uppercase font-sans">
                STAR <span className="text-red-600">NEWS</span>
              </span>
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                NETWORK
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
              स्टार न्यूज़ नेटवर्क — निष्पक्ष, निर्भीक और सच का आईना
            </p>
          </div>
        </Link>

        {/* RIGHT: Live TV & Fast Action Banner */}
        <div className="flex items-center gap-3">
          <Link
            href="/video"
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg shadow font-semibold text-xs sm:text-sm transition animate-pulse"
          >
            <FaBroadcastTower className="text-white text-base" />
            <span className="tracking-wide uppercase">LIVE TV / वीडियो</span>
          </Link>

          <Link
            href="/submit-news"
            className="hidden sm:inline-flex items-center gap-1.5 border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition"
          >
            <span>✍️ खबर भेजें</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
