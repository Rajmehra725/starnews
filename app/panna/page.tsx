"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import {
Eye,
Heart,
Share2,
MessageCircle,
Clock,
Flame,
TrendingUp
} from "lucide-react";
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
<div className="w-full max-w-[1400px] mx-auto px-2 md:px-4 lg:px-6 space-y-4">

{/* HEADER */}
<div className="flex items-center justify-between border-b pb-2">
<h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
📰 पन्ना स्टार न्यूज़
<span className="bg-red-600 text-white text-[10px] md:text-xs px-2 py-1 rounded animate-pulse">
LIVE
</span>
</h1>
</div>

{/* HERO */}
{hero && (
<div
onClick={() => handleView(hero._id)}
className="relative rounded-xl overflow-hidden shadow cursor-pointer group"
>

<img
src={hero.featuredImage}
className="w-full h-[260px] md:h-[360px] lg:h-[480px] object-cover group-hover:scale-105 transition"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

<div className="absolute bottom-0 p-4 md:p-6 text-white w-full">

<div className="flex gap-2">
<span className="bg-red-600 px-2 py-1 text-xs rounded">
BREAKING
</span>

<span className="bg-black/60 px-2 py-1 text-xs rounded">
LIVE
</span>
</div>

<h2 className="text-lg md:text-2xl lg:text-3xl font-bold mt-2">
{hero.title}
</h2>

<p className="text-sm md:text-base opacity-90 mt-2 line-clamp-2">
{hero.description}
</p>

{/* STATS */}
<div className="flex items-center gap-4 text-xs">

<span className="flex items-center gap-1">
<Eye size={14}/> {hero.views}
</span>

<button className="flex items-center gap-1 text-red-500">
<Heart size={14}/> {hero.likes}
</button>

<button className="flex items-center gap-1 text-green-600">
<Share2 size={14}/> {hero.shares}
</button>

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

{/* TITLE */}
<div className="flex items-center justify-between mt-4">
<div className="flex items-center gap-2">
<div className="w-1 h-5 bg-red-600"></div>
<h2 className="font-bold text-lg">Latest News</h2>
</div>
</div>

{/* GRID */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">

{newsList.slice(1).map((news, index) => (
<div
key={news._id}
onClick={() => handleView(news._id)}
className="bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden group"
>

{/* IMAGE */}
<div className="relative">

<img
src={news.featuredImage}
className="w-full h-40 md:h-44 object-cover group-hover:scale-105 transition"
/>

{index < 3 && (
<span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
TRENDING
</span>
)}

</div>

{/* CONTENT */}
<div className="p-3 space-y-2">

<h2 className="font-semibold text-sm md:text-base line-clamp-2">
{news.title}
</h2>

<p className="text-xs text-gray-500 line-clamp-2">
{news.description}
</p>

{/* TIME */}
<div className="text-xs text-gray-400">
🕒 {timeAgo(news.createdAt)}
</div>

{/* ACTIONS */}
<div className="flex items-center justify-between text-xs border-t pt-2">

<span className="flex items-center gap-1">
👁️ {news.views}
</span>

<button
onClick={(e) => {
e.stopPropagation();
handleLike(news._id);
}}
className="flex items-center gap-1 text-red-500 hover:scale-110 transition"
>
❤️ {news.likes}
</button>

<button
onClick={(e) => {
e.stopPropagation();
handleShare(news);
}}
className="flex items-center gap-1 text-green-600 hover:scale-110 transition"
>
🔗 {news.shares}
</button>

<span className="flex items-center gap-1">
💬 {news.comments?.length || 0}
</span>

</div>

</div>

</div>
))}

</div>

</div>
);
}