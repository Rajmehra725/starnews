"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";

import {
  FaHeart,
  FaRegHeart,
  FaWhatsapp,
  FaRegComment,
  FaEye,
  FaCheckCircle
} from "react-icons/fa";

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
};

export default function SatnaNewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
  const [animateLike, setAnimateLike] = useState<string | null>(null);

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

  // time ago
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

  // fetch news
  const fetchNews = async () => {
    const res = await axios.get(
      "https://starnewsbackend.onrender.com/api/news"
    );
    setNewsList(res.data);
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

    return () => {
      socket.disconnect();
    };
  }, []);

  // like toggle
  const handleLike = async (id: string) => {
    setLiked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));

    setAnimateLike(id);

    setTimeout(() => {
      setAnimateLike(null);
    }, 700);

    try {
      await axios.post(
        `https://starnewsbackend.onrender.com/api/interactions/like/${id}`,
        { visitorId }
      );
    } catch (err) {
      console.error(err);
    }
  };

  // double tap like
  const handleDoubleTap = (id: string) => {
    handleLike(id);
  };

  // whatsapp share
  const shareWhatsApp = (news: News) => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      news.title
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto px-2 md:px-4 py-4 space-y-4">

      {/* header */}
      <h1 className="text-xl md:text-2xl font-bold">
        📰 Satna Star News
      </h1>

      {newsList.map(news => (
        <div
          key={news._id}
          className="bg-white rounded-xl shadow overflow-hidden"
        >
          {/* image */}
          <div
            className="relative"
            onDoubleClick={() => handleDoubleTap(news._id)}
          >
            <img
              src={news.featuredImage}
              className="w-full h-[220px] md:h-[420px] object-cover"
            />

            {/* big like animation */}
            {animateLike === news._id && (
              <FaHeart className="absolute text-white text-6xl md:text-8xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
            )}

            {/* breaking */}
            {news.breaking && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                BREAKING
              </div>
            )}
          </div>

          {/* content */}
          <div className="p-3 space-y-2">

            <h2 className="font-semibold text-base md:text-lg flex items-center gap-2">
              {news.title}

              {news.verified && (
                <FaCheckCircle className="text-blue-500 text-sm" />
              )}
            </h2>

            <p className="text-sm text-gray-600">
              {news.description}
            </p>

            {/* icons */}
            <div className="flex items-center gap-4 pt-2">

              {/* like */}
              <button
                onClick={() => handleLike(news._id)}
                className="flex items-center gap-1"
              >
                {liked[news._id] ? (
                  <FaHeart className="text-red-500 text-lg" />
                ) : (
                  <FaRegHeart className="text-lg" />
                )}
                <span className="text-sm">
                  {news.likes}
                </span>
              </button>

              {/* comment */}
              <div className="flex items-center gap-1">
                <FaRegComment />
                <span className="text-sm">
                  {news.comments?.length}
                </span>
              </div>

              {/* share */}
              <button
                onClick={() => shareWhatsApp(news)}
                className="flex items-center gap-1"
              >
                <FaWhatsapp className="text-green-500" />
              </button>

              {/* views */}
              <div className="flex items-center gap-1 ml-auto">
                <FaEye />
                <span className="text-xs">
                  {news.views}
                </span>
              </div>
            </div>

            {/* comments */}
            {news.comments?.length > 0 && (
              <div className="border-t pt-2 space-y-1">
                {news.comments
                  .slice(0, 2)
                  .map(c => (
                    <p
                      key={c._id}
                      className="text-xs text-gray-600"
                    >
                      💬 {c.text}
                    </p>
                  ))}
              </div>
            )}

            {/* time */}
            <div className="text-xs text-gray-400">
              {timeAgo(news.createdAt)}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}