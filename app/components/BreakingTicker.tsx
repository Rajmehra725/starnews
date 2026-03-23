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

  const fetchNews = async (signal?: AbortSignal) => {
    try {
      const res = await axios.get<BreakingNews[]>(API_URL, { signal });
      // sort by priority
      setNewsList(res.data.sort((a, b) => a.priority - b.priority));
    } catch (err) {
      // silent error log
      if (!axios.isCancel(err)) {
        console.error("Failed to fetch breaking news:", err);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchNews(controller.signal);

    // interval fetch every 30s
    const interval = setInterval(() => fetchNews(controller.signal), 30000);

    return () => {
      controller.abort(); // cancel pending request
      clearInterval(interval);
    };
  }, []);

  const activeNews = newsList.filter((item) => item.isActive);

  if (activeNews.length === 0) return null;

  return (
    <div className="bg-red-600 text-white overflow-hidden py-2 px-3 h-10 flex items-center">
      {/* LABEL */}
      <span className="bg-black text-white text-xs font-bold px-3 h-full flex items-center mr-3 shrink-0">
        BREAKING NEWS
      </span>

      {/* MARQUEE */}
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