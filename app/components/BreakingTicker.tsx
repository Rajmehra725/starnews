"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { fetchBreakingNews, BreakingItem } from "../../lib/api";
import { Zap } from "lucide-react";

export default function BreakingTicker() {
  const [breakingList, setBreakingList] = useState<BreakingItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const loadBreaking = async () => {
      const items = await fetchBreakingNews();
      if (items.length > 0) {
        setBreakingList(items);
      }
    };

    loadBreaking();
    const refreshTimer = setInterval(loadBreaking, 45000);
    return () => clearInterval(refreshTimer);
  }, []);

  // Step-through headline animation every 5 seconds if multiple breaking items exist
  useEffect(() => {
    if (breakingList.length <= 1 || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingList.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [breakingList.length, isPaused]);

  if (breakingList.length === 0) {
    return null;
  }

  const currentItem = breakingList[currentIndex] || breakingList[0];

  return (
    <div className="w-full bg-[#0d1117] text-white border-y border-red-700/60 shadow-inner overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-stretch h-10 sm:h-11">
        {/* BADGE (SATNA TIMES STYLE "बड़ी खबरें") */}
        <div className="bg-red-600 px-3 sm:px-4 flex items-center gap-2 shrink-0 z-10 font-black tracking-wider text-xs sm:text-sm uppercase text-white shadow-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
          </span>
          <span className="flex items-center gap-1 font-bold">
            <Zap size={14} className="text-yellow-300 fill-yellow-300" />
            बड़ी खबरें
          </span>
        </div>

        {/* ROTATING HEADLINE */}
        <div
          className="flex-1 overflow-hidden flex items-center px-3 sm:px-4 cursor-pointer relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            key={currentItem._id}
            className="w-full truncate text-xs sm:text-sm text-gray-100 hover:text-yellow-300 transition-colors font-medium flex items-center gap-2 animate-fadeIn"
          >
            <span className="text-red-400 font-bold">•</span>
            <span className="truncate">{currentItem.text}</span>
          </div>

          {/* COUNTER IF MULTIPLE */}
          {breakingList.length > 1 && (
            <div className="hidden md:flex items-center gap-1 shrink-0 text-[11px] text-gray-400 pl-3">
              <span>{currentIndex + 1}</span>
              <span>/</span>
              <span>{breakingList.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}