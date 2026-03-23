"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import {
  Eye,
  Heart,
  Share2,
  MessageCircle
} from "lucide-react";

const socket: Socket = io("https://starnewsbackend.onrender.com");

// TYPES
type Comment = {
  _id: string;
  text: string;
};

type News = {
  _id: string;
  title: string;
  description: string;
  featuredImage: string;
  likes: number;
  comments: Comment[];
  shares: number;
  views: number;
  createdAt: string;
};

export default function NewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);

  // TIME AGO
  const timeAgo = (date: string) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );

    const intervals: any = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const i in intervals) {
      const counter = Math.floor(seconds / intervals[i]);
      if (counter > 0)
        return `${counter} ${i}${counter > 1 ? "s" : ""} ago`;
    }

    return "Just now";
  };

  // FETCH
  const fetchNews = async () => {
    try {
      const res = await axios.get(
        "https://starnewsbackend.onrender.com/api/news"
      );
      setNewsList(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNews();

    socket.on("likeUpdated", ({ newsId, likes }) => {
      setNewsList((prev) =>
        prev.map((n) => (n._id === newsId ? { ...n, likes } : n))
      );
    });

    return () => {
      socket.off();
    };
  }, []);

  const hero = newsList[0];

  return (
    <div className="w-full max-w-full overflow-x-hidden px-2 md:px-4 space-y-4">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b pb-2">
        <h1 className="text-lg md:text-2xl font-bold flex items-center gap-2">
          📰 पन्ना स्टार न्यूज़
          <span className="bg-red-600 text-white text-[10px] px-2 py-1 rounded animate-pulse">
            LIVE
          </span>
        </h1>
      </div>

      {/* HERO */}
      {hero && (
        <div className="relative rounded-xl overflow-hidden shadow cursor-pointer group">

          <img
            src={hero.featuredImage}
            alt={hero.title}
            className="w-full max-w-full h-[220px] md:h-[360px] object-cover group-hover:scale-105 transition"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="absolute bottom-0 p-4 text-white w-full">

            <h2 className="text-lg md:text-2xl font-bold">
              {hero.title}
            </h2>

            <p className="text-sm opacity-90 line-clamp-2">
              {hero.description}
            </p>

            <div className="flex items-center gap-4 text-xs mt-2">

              <span className="flex items-center gap-1">
                <Eye size={14}/> {hero.views}
              </span>

              <span className="flex items-center gap-1 text-red-500">
                <Heart size={14}/> {hero.likes}
              </span>

              <span className="flex items-center gap-1 text-green-600">
                <Share2 size={14}/> {hero.shares}
              </span>

              <span className="flex items-center gap-1">
                <MessageCircle size={14}/> {hero.comments?.length}
              </span>

              <span className="text-xs opacity-80">
                {timeAgo(hero.createdAt)}
              </span>

            </div>

          </div>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">

        {newsList.slice(1).map((news) => (
          <div
            key={news._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
          >

            <img
              src={news.featuredImage}
              alt={news.title}
              className="w-full max-w-full h-40 object-cover group-hover:scale-105 transition"
            />

            <div className="p-3 space-y-2">

              <h2 className="font-semibold text-sm line-clamp-2">
                {news.title}
              </h2>

              <p className="text-xs text-gray-500 line-clamp-2">
                {news.description}
              </p>

              <div className="flex justify-between text-xs border-t pt-2">

                <span>👁️ {news.views}</span>
                <span className="text-red-500">❤️ {news.likes}</span>
                <span className="text-green-600">🔗 {news.shares}</span>
                <span>💬 {news.comments?.length}</span>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}