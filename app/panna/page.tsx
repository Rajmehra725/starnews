"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import Link from "next/link";
import {
  FaHeart,
  FaRegHeart,
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
  const [showOldNews, setShowOldNews] = useState(false);
  const [oldNewsFilter, setOldNewsFilter] = useState<string>("");

  const [animateLike, setAnimateLike] = useState<string | null>(null);
  const viewedRef = useRef<Set<string>>(new Set());

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("userId") ||
        Math.random().toString(36).substring(2)
      : "";

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, []);

  const isOldNews = (date: string) => {
    const diff = new Date().getTime() - new Date(date).getTime();
    return diff > 24 * 60 * 60 * 1000;
  };

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
useEffect(() => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("data-id");
        if (id) handleView(id);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll("[data-id]").forEach(el =>
    observer.observe(el)
  );

  return () => observer.disconnect();
}, [newsList]);

  const handleLike = async (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));

    setAnimateLike(id);
    setTimeout(() => setAnimateLike(null), 700);

    await axios.post(
      `https://starnewsbackend.onrender.com/api/news/${id}/like`,
      { userId }
    );
  };

  const handleView = async (id: string) => {
    if (viewedRef.current.has(id)) return;
    viewedRef.current.add(id);

    try {
      await axios.post(
        `https://starnewsbackend.onrender.com/api/news/${id}/view`,
        { userId }
      );
    } catch {}
  };

  const handleSave = (id: string) => {
    setSaved(prev => ({ ...prev, [id]: !prev[id] }));
  };

  
 const handleShare = async (news: News) => {
  const url = `${window.location.origin}/panna/${news._id}`;
  const shareText = `${news.title}\n\n${news.description}`;

  const incrementShare = async () => {
    try {
      await axios.post(
        `https://starnewsbackend.onrender.com/api/news/${news._id}/share`,
        { userId: "guest" }
      );
    } catch (err) {
      console.log("Share count failed");
    }
  };

  try {
    const imageUrl = news.featuredImage;

    // ✅ Native Share (Mobile)
    if (navigator.share && imageUrl) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const file = new File([blob], "news.jpg", {
          type: blob.type || "image/jpeg",
        });

        const shareData: any = {
          title: news.title,
          text: shareText,
          url,
          files: [file],
        };

        if (navigator.canShare?.(shareData)) {
          await navigator.share(shareData);

          // ✅ increment only after successful share
          await incrementShare();
          return;
        }
      } catch {
        console.log("Image share failed");
      }
    }

    // ✅ WhatsApp fallback
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${shareText}\n\n${url}`
    )}`;

    window.open(whatsappUrl, "_blank");

    await incrementShare();

  } catch (err) {
    console.log("Share failed, copying link...");

    // ✅ clipboard fallback
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied 👍");

      await incrementShare();
    } catch {}
  }
};
  const handleCopyLink = async (id: string) => {
  try {
    const link = `${window.location.origin}/panna/${id}`;

    await navigator.clipboard.writeText(link);

    alert("Link copied 👍 (Preview will show in WhatsApp)");
  } catch (error) {
    console.error("Copy failed", error);
  }
};

  const latestNews = newsList.filter(n => !isOldNews(n.createdAt));
  const oldNews = newsList.filter(n => isOldNews(n.createdAt))
    .filter(n =>
      oldNewsFilter
        ? new Date(n.createdAt).toISOString().slice(0, 10) === oldNewsFilter
        : true
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const renderCard = (news: News, isOld = false) => (
    <div
  key={news._id}
  data-id={news._id}
     onClick={() => handleView(news._id)}
      className={`rounded-2xl overflow-hidden border transition-all duration-300 group
        ${isOld ? "bg-gray-50 opacity-80" : "bg-white hover:shadow-2xl hover:-translate-y-1"}
      `}
    >
      <div
        className="relative"
        onDoubleClick={() => handleLike(news._id)}
      >
        <img
          src={news.featuredImage || "/no-image.png"}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {animateLike === news._id && (
          <FaHeart className="absolute text-white text-7xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
        )}

        {news.breaking && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow">
            🔴 BREAKING
          </span>
        )}

        <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-black text-xs px-3 py-1 rounded-full font-semibold shadow">
          {news.category || "LOCAL"}
        </span>
      </div>

      <div className="p-4 space-y-3">
        <h2 className="font-bold text-lg text-gray-900 line-clamp-2 flex items-center gap-2">
          {news.title}
          {news.verified && (
            <FaCheckCircle className="text-blue-500 text-sm" />
          )}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {news.description}
        </p>

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

           <div className="flex items-center gap-1">
            <FaShareAlt />
            <span>{news.comments?.length}</span>
          </div>

          <button onClick={() => handleCopyLink(news._id)}>
            📋
          </button>

          <button
            onClick={() => handleSave(news._id)}
            className="ml-auto"
          >
            {saved[news._id] ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          <span>🕒 {timeAgo(news.createdAt)}</span>
          <span className="flex items-center gap-1">
  <FaEye />
  {news.views ?? 0}
</span>
        </div>

        <Link
          href={`/panna/${news._id}`}
          className="block text-center text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 py-2 rounded-lg hover:from-red-700 hover:to-red-600 transition"
        >
          Read Full Story
        </Link>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="bg-white shadow-sm border-b  top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-red-600">
            STAR NEWS
          </h1>
          <span className="text-sm text-gray-500">
            Live • Panna & Satna
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* BREAKING BAR */}
        <div className="bg-red-600 text-white text-sm px-4 py-2 mb-6 rounded-lg animate-pulse">
          🔴 Breaking News Updates
        </div>

        {/* LATEST */}
        <h2 className="text-xl font-bold mb-4">🆕 Latest News</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
              ))
            : latestNews.map(n => renderCard(n))}
        </div>

        {/* OLD NEWS */}
        {oldNews.length > 0 && (
          <div className="mt-10">
            <button
              onClick={() => setShowOldNews(prev => !prev)}
              className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              {showOldNews ? "Hide Old News" : "Show Old News"}
            </button>

            {showOldNews && (
              <>
                <div className="mb-4 flex items-center gap-2">
                  <label htmlFor="filterDate" className="text-gray-600 font-semibold">
                    Filter by Date:
                  </label>
                  <input
                    type="date"
                    id="filterDate"
                    value={oldNewsFilter}
                    onChange={e => setOldNewsFilter(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  />
                  {oldNewsFilter && (
                    <button
                      onClick={() => setOldNewsFilter("")}
                      className="ml-2 text-sm text-red-500 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <h2 className="text-xl font-bold mb-4 text-gray-500">
                  📰 Old News (24h+)
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {oldNews.map(n => renderCard(n, true))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}