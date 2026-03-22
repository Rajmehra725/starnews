"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit, ToggleLeft, ToggleRight, Search } from "lucide-react";

interface BreakingNews {
  _id: string;
  text: string;
  isActive: boolean;
  priority: number;
}

const API_URL = "https://starnewsbackend.onrender.com/api/breaking";

export default function BreakingNewsPage() {
  const [newsList, setNewsList] = useState<BreakingNews[]>([]);
  const [search, setSearch] = useState("");

  const fetchNews = async () => {
    try {
      const res = await axios.get<BreakingNews[]>(API_URL);
      setNewsList(res.data.sort((a, b) => a.priority - b.priority));
    } catch (err) {
      console.error(err);
      alert("Failed to fetch breaking news");
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 30000);
    return () => clearInterval(interval);
  }, []);

 

  const activeNews = newsList.filter((item) => item.isActive);


  return (
    <div className=" bg-gray-100">

      {/* 🔴 MARQUEE */}
      {activeNews.length > 0 && (
        <div className="bg-red-600 text-white overflow-hidden py-2 px-3 h-10 flex items-center">
              <span className="bg-black text-white text-xs font-bold px-3 h-full flex items-center">
            BREAKING NEWS
          </span>
          <div className="relative w-full">
            <div className="absolute whitespace-nowrap animate-marquee">
              {activeNews.map((item) => (
                <span
                  key={item._id}
                  className="mx-2 font-bold text-s uppercase"
                >
                 🔴 {item.text}
                </span>
              ))}
            </div>
          </div>

          <style jsx>{`
            .animate-marquee {
              display: inline-block;
              white-space: nowrap;
              animation: marquee 35s linear infinite;
            }
            @keyframes marquee {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `}</style>
        </div>
      )}

    </div>
  );
}