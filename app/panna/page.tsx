"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";

// 🔌 SOCKET INIT
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

type LikePayload = {
  newsId: string;
  likes: number;
};

type CommentPayload = {
  newsId: string;
  comment: Comment;
};

type ViewPayload = {
  newsId: string;
  views: number;
};

type SharePayload = {
  newsId: string;
  shares: number;
};

export default function NewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);

  // 👤 VISITOR ID
  const getVisitorId = () => {
    if (typeof window === "undefined") return "";

    let id = localStorage.getItem("visitorId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("visitorId", id);
    }
    return id;
  };

  const visitorId = getVisitorId();

  // 📥 FETCH NEWS
  const fetchNews = async () => {
    try {
      const res = await axios.get(
        "https://starnewsbackend.onrender.com/api/news"
      );
      setNewsList(res.data);

      res.data.forEach((n: News) => {
        socket.emit("joinNews", n._id);
      });
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNews();

    // ❤️ LIKE
    socket.on("likeUpdated", ({ newsId, likes }: LikePayload) => {
      setNewsList((prev) =>
        prev.map((n) => (n._id === newsId ? { ...n, likes } : n))
      );
    });

    // 💬 COMMENT
    socket.on("newComment", ({ newsId, comment }: CommentPayload) => {
      setNewsList((prev) =>
        prev.map((n) =>
          n._id === newsId
            ? { ...n, comments: [...n.comments, comment] }
            : n
        )
      );
    });

    // 👁️ VIEW
    socket.on("viewUpdated", ({ newsId, views }: ViewPayload) => {
      setNewsList((prev) =>
        prev.map((n) =>
          n._id === newsId ? { ...n, views } : n
        )
      );
    });

    // 🔗 SHARE
    socket.on("shareUpdated", ({ newsId, shares }: SharePayload) => {
      setNewsList((prev) =>
        prev.map((n) =>
          n._id === newsId ? { ...n, shares } : n
        )
      );
    });

    return () => {
      socket.off();
    };
  }, []);

  // 👁️ VIEW
  const handleView = async (id: string) => {
    await axios.post(
      `https://starnewsbackend.onrender.com/api/interactions/view/${id}`,
      { visitorId }
    );
  };

  // ❤️ LIKE
  const handleLike = async (id: string) => {
    await axios.post(
      `https://starnewsbackend.onrender.com/api/interactions/like/${id}`,
      { visitorId }
    );
  };

  // 💬 COMMENT
  const handleComment = async (id: string, text: string) => {
    if (!text) return;

    await axios.post(
      `https://starnewsbackend.onrender.com/api/interactions/comment/${id}`,
      { text, visitorId }
    );
  };

  // 🔗 SHARE
  const handleShare = async (news: News) => {
    await axios.post(
      `https://starnewsbackend.onrender.com/api/interactions/share/${news._id}`,
      { visitorId }
    );

    const url = `${window.location.origin}/news/${news._id}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        news.title + " " + url
      )}`
    );
  };

  const hero = newsList[0];

  return (
   <div className="space-y-6">

  {/* 🔴 HEADER TITLE */}
  <div className="flex items-center justify-between">
    <h1 className="text-2xl font-bold flex items-center gap-2">
      📰 पन्ना स्टार न्यूज़
      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded animate-pulse">
        LIVE
      </span>
    </h1>
  </div>

  {/* 🔥 HERO SECTION */}
  {hero && (
    <div className="grid md:grid-cols-3 gap-4">

      {/* BIG NEWS */}
      <div
        onClick={() => handleView(hero._id)}
        className="md:col-span-2 relative rounded-xl overflow-hidden shadow-xl cursor-pointer group"
      >
        <img
          src={hero.featuredImage}
          className="w-full h-[320px] object-cover group-hover:scale-105 transition"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        <div className="absolute bottom-0 p-5 text-white">
          <span className="bg-red-600 px-2 py-1 text-xs rounded">
            BREAKING
          </span>

          <h2 className="text-xl md:text-2xl font-bold mt-2">
            {hero.title}
          </h2>

          <p className="text-sm opacity-80 mt-1 line-clamp-2">
            {hero.description}
          </p>

          <div className="flex gap-4 text-xs mt-2">
            <span>👁️ {hero.views}</span>
            <span>❤️ {hero.likes}</span>
          </div>
        </div>
      </div>

      {/* SIDE NEWS */}
      <div className="space-y-4">
        {newsList.slice(1, 4).map((news) => (
          <div
            key={news._id}
            onClick={() => handleView(news._id)}
            className="flex gap-3 bg-white dark:bg-gray-900 p-2 rounded-lg shadow hover:shadow-md cursor-pointer"
          >
            <img
              src={news.featuredImage}
              className="w-24 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="text-sm font-semibold line-clamp-2">
                {news.title}
              </h3>

              <div className="text-xs text-gray-500 mt-1 flex gap-2">
                <span>👁️ {news.views}</span>
                <span>❤️ {news.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* 📰 GRID NEWS BELOW */}
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

    {newsList.map((news) => (
      <div
        key={news._id}
        onClick={() => handleView(news._id)}
        className="bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
      >
        <img
          src={news.featuredImage}
          className="w-full h-44 object-cover"
        />

        <div className="p-3 space-y-2">

          <h2 className="font-bold line-clamp-2">
            {news.title}
          </h2>

          <div className="flex justify-between text-sm border-t pt-2">
            <span>👁️ {news.views}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike(news._id);
              }}
              className="text-red-500"
            >
              ❤️ {news.likes}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare(news);
              }}
              className="text-green-600"
            >
              🔗 {news.shares}
            </button>
          </div>

        </div>
      </div>
    ))}

  </div>

</div>
  );
}