"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface BreakingNews {
  _id: string;
  text: string;
  isActive: boolean;
  priority: number;
}

const API_URL = "https://starnewsbackend.onrender.com/api/breaking";

export default function BreakingNewsPage() {
  const [newsList, setNewsList] = useState<BreakingNews[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchNews = async () => {
    try {
      const res = await axios.get<BreakingNews[]>(API_URL, {
        timeout: 10000, // important for render cold start
      });

      const sorted = res.data.sort((a, b) => a.priority - b.priority);
      setNewsList(sorted);
      setLoaded(true);
    } catch (err) {
      console.error("Failed to fetch breaking news:", err);
      setLoaded(true); // prevent crash
    }
  };

  useEffect(() => {
    fetchNews();

    const interval = setInterval(fetchNews, 30000);

    return () => clearInterval(interval);
  }, []);

  const activeNews = newsList.filter((item) => item.isActive);

  if (!loaded || activeNews.length === 0) return null;

  return (
    <div className="bg-red-600 text-white overflow-hidden py-2 px-3 h-10 flex items-center">
      
      <span className="bg-black text-white text-xs font-bold px-3 h-full flex items-center mr-3 shrink-0">
        BREAKING NEWS
      </span>

      <div className="overflow-hidden flex-1">
        <div className="whitespace-nowrap animate-marquee inline-block">
          {activeNews.map((item) => (
            <span key={item._id} className="mx-4 font-bold text-sm uppercase">
              🔴 {item.text}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}