"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

interface BreakingNews {
  _id: string;
  text: string;
  isActive: boolean;
  priority: number;
}

const API_URL = "https://starnewsbackend.onrender.com/api/breaking";

export default function BreakingNews() {
  const [newsList, setNewsList] = useState<BreakingNews[]>([]);
  const [loaded, setLoaded] = useState(false);
  const intervalRef = useRef<any>(null);

  const fetchNews = async () => {
    try {
      const res = await axios.get(API_URL, {
        timeout: 20000,
      });

      const sorted = [...res.data].sort(
        (a, b) => a.priority - b.priority
      );

      setNewsList(sorted);
      setLoaded(true);
    } catch (err: any) {
      console.log("Breaking API Error:", err?.message);
      setLoaded(true);
    }
  };

  useEffect(() => {
    fetchNews();
    intervalRef.current = setInterval(fetchNews, 30000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const activeNews = newsList.filter((item) => item.isActive);

  if (!loaded || activeNews.length === 0) return null;

  return (
    <div className="w-full overflow-hidden bg-black text-white border-y border-red-600">
      
      <div className="flex items-center h-10 sm:h-12 overflow-hidden">

        {/* BREAKING LABEL */}
        <span className="bg-red-600 px-4 text-sm sm:text-base font-extrabold h-full flex items-center shrink-0 tracking-wide">
          BREAKING
        </span>

        {/* MARQUEE */}
        <div className="flex-1 overflow-hidden">
          <div className="whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
            
            {[...activeNews, ...activeNews].map((item, index) => (
              <span
                key={item._id + index}
                className="mx-6 text-sm sm:text-lg font-bold uppercase tracking-wider antialiased"
              >
                🔴 {item.text}
              </span>
            ))}

          </div>
        </div>

      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 100s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

    </div>
  );
}