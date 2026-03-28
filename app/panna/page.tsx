"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import Link from "next/link";
import {
  FaHeart,
  FaRegHeart,
  FaWhatsapp,
  FaRegComment,
  FaEye,
  FaCheckCircle,
  FaBookmark,
  FaRegBookmark
} from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
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
  breaking?: boolean;
  verified?: boolean;
  category?: string;
};

export default function SatnaNewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
  const [saved, setSaved] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  const [animateLike, setAnimateLike] = useState<string | null>(null);

  const viewedRef = useRef<Set<string>>(new Set());

  const visitorId =
    typeof window !== "undefined"
      ? localStorage.getItem("visitorId") ||
        Math.random().toString(36).substring(2)
      : "";

  useEffect(() => {
    if (visitorId) {
      localStorage.setItem("visitorId", visitorId);
    }
  }, []);

  const timeAgo = (date: string) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );

    const intervals: any = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const i in intervals) {
      const counter = Math.floor(seconds / intervals[i]);
      if (counter > 0)
        return `${counter} ${i}${counter > 1 ? "s" : ""} ago`;
    }

    return "Just now";
  };

  const fetchNews = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://starnewsbackend.onrender.com/api/news"
    );
    setNewsList(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();

    const socket: Socket = io(
      "https://starnewsbackend.onrender.com"
    );

    socket.on("likeUpdated", ({ newsId, likes }) => {
      setNewsList(prev =>
        prev.map(n =>
          n._id === newsId ? { ...n, likes } : n
        )
      );
    });

    socket.on("commentUpdated", ({ newsId, comments }) => {
      setNewsList(prev =>
        prev.map(n =>
          n._id === newsId ? { ...n, comments } : n
        )
      );
    });

    socket.on("viewsUpdated", ({ newsId, views }) => {
      setNewsList(prev =>
        prev.map(n =>
          n._id === newsId ? { ...n, views } : n
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLike = async (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));

    setAnimateLike(id);
    setTimeout(() => setAnimateLike(null), 700);

    await axios.post(
      `https://starnewsbackend.onrender.com/api/interactions/like/${id}`,
      { visitorId }
    );
  };

  const handleView = async (id: string) => {
    if (viewedRef.current.has(id)) return;
    viewedRef.current.add(id);

    try {
      await axios.post(
        `https://starnewsbackend.onrender.com/api/interactions/view/${id}`,
        { visitorId }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = (id: string) => {
    setSaved(prev => ({ ...prev, [id]: !prev[id] }));
  };

 const handleShare = async (news: News) => {
  const shareData = {
    title: news.title,
    text: news.description,
    url: `${window.location.origin}/panna/${news._id}`
  };

  try {
    // Mobile / supported browsers
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Desktop fallback (copy link)
      await navigator.clipboard.writeText(shareData.url);
      alert("Link copied! Now you can share it 👍");
    }

    // Backend share count update
    await axios.post(
      `https://starnewsbackend.onrender.com/api/interactions/share/${news._id}`
    );
  } catch (err) {
    console.log("Share cancelled or failed");
  }
};

  return (
    <div className="max-w-6xl mx-auto px-3 py-4">

      {/* 🔴 BREAKING STRIP */}
      <div className="bg-red-600 text-white text-xs px-3 py-1 mb-3 animate-pulse">
        🔴 BREAKING: Latest updates from Panna & Satna
      </div>

      {/* 📰 HEADER */}
      <div className="mb-6 border-b pb-3">
        <h1 className="text-3xl font-extrabold text-red-600">
          STAR NEWS
        </h1>

        <div className="flex gap-3 mt-2 text-xs text-gray-600 font-medium">
          <span>🏠 Home</span>
          <span>📍 Panna</span>
          <span>📍 Satna</span>
          <span>🔥 Breaking</span>
          <span>📈 Trending</span>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
            ))
          : newsList.map(news => (
              <div
                key={news._id}
                onMouseEnter={() => handleView(news._id)}
                className="bg-white rounded-xl border hover:shadow-xl transition duration-300 overflow-hidden group"
              >

                {/* IMAGE */}
                <div
                  className="relative"
                  onDoubleClick={() => handleLike(news._id)}
                >
                  <img
                    src={news.featuredImage || "/no-image.png"}
                    onError={(e: any) => (e.target.src = "/no-image.png")}
                    className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* like animation */}
                  {animateLike === news._id && (
                    <FaHeart className="absolute text-white text-6xl md:text-8xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
                  )}

                  {news.breaking && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded font-bold">
                      BREAKING
                    </span>
                  )}

                  <span className="absolute bottom-2 left-2 bg-white text-black text-[10px] px-2 py-1 rounded font-semibold shadow">
                    {news.category || "LOCAL NEWS"}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-3 space-y-2">

                  <h2 className="font-bold text-base text-gray-900 line-clamp-2 flex items-center gap-1">
                    {news.title}
                    {news.verified && (
                      <FaCheckCircle className="text-blue-500 text-xs" />
                    )}
                  </h2>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {news.description}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-4 pt-3 border-t text-gray-500 text-sm">

                    <button onClick={() => handleLike(news._id)}>
                      {liked[news._id] ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                    <span>{news.likes}</span>

                    <div className="flex items-center gap-1">
                      <FaRegComment />
                      <span>{news.comments?.length}</span>
                    </div>

                   <button onClick={() => handleShare(news)}>
  <FaShareAlt className="text-gray-600 hover:text-black transition" />
</button>

                    <button
                      onClick={() => handleSave(news._id)}
                      className="ml-auto"
                    >
                      {saved[news._id] ? (
                        <FaBookmark />
                      ) : (
                        <FaRegBookmark />
                      )}
                    </button>
                  </div>

                  {/* FOOTER */}
                  <div className="flex justify-between items-center text-xs text-gray-400 pt-2">
                    <span>🕒 {timeAgo(news.createdAt)}</span>

                    <span className="flex items-center gap-1">
                      <FaEye />
                      {news.views}
                    </span>
                  </div>

                  {/* BUTTON */}
                  <Link
                    href={`/panna/${news._id}`}
                    className="block text-center text-sm font-semibold text-white bg-red-600 py-2 rounded mt-2 hover:bg-red-700 transition"
                  >
                    Read Full Story
                  </Link>

                </div>
              </div>
            ))}
      </div>
    </div>
  );
}