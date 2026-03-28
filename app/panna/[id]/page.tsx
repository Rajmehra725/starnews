"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { Eye, Heart, MessageCircle, Share2 } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

let socket: Socket;

interface CommentType {
  text: string;
  visitorId: string;
  createdAt?: string;
}

interface NewsType {
  _id: string;
  title: string;
  content: string;
  description: string;
  featuredImage?: string;
  images?: string[];
  createdAt: string;
  likes: number;
  shares: number;
  views: number;
}

export default function NewsDetailPage() {
  const { id } = useParams();

  const [news, setNews] = useState<NewsType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [text, setText] = useState("");
  const [visitorId, setVisitorId] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // visitor id
  useEffect(() => {
    let vid = localStorage.getItem("visitorId");
    if (!vid) {
      vid = "user_" + Math.random().toString(36).substring(2, 8);
      localStorage.setItem("visitorId", vid);
    }
    setVisitorId(vid);
  }, []);

  // fetch news
  const fetchNews = async () => {
    const res = await axios.get(
      "https://starnewsbackend.onrender.com/api/news"
    );
    const found = res.data.find((n: NewsType) => n._id === id);
    setNews(found);
  };

  // fetch comments
  const fetchComments = async () => {
    const res = await axios.get(
      `https://starnewsbackend.onrender.com/api/interactions/comment/${id}`
    );

    const data = res.data;

    if (Array.isArray(data)) setComments(data);
    else if (data.comments) setComments(data.comments);
    else setComments([]);
  };

  // ✅ FIXED SOCKET (ERROR FREE CLEANUP)
  useEffect(() => {
    socket = io("https://starnewsbackend.onrender.com");

    socket.on("commentAdded", (newComment) => {
      setComments((prev) => [newComment, ...prev]);
    });

    socket.on("likeUpdated", ({ newsId, likes }) => {
      if (newsId === id) {
        setNews((prev: any) => (prev ? { ...prev, likes } : prev));
      }
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, [id]);

  // load
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchNews(), fetchComments()]);
      setLoading(false);
    };

    load();
  }, [id]);

  // like
  const handleLike = async () => {
    await axios.post(
      `https://starnewsbackend.onrender.com/api/interactions/like/${id}`,
      { visitorId }
    );
  };

  // ✅ FIXED SHARE (NO DOUBLE LINK + IMAGE SUPPORT)
  const handleShare = async () => {
    if (!news) return;

    const url = window.location.href;

    // ❌ FIX: duplicate link removed
    const shareText = `${news.title}

${news.description}

${news.content?.slice(0, 350)}...`;

    try {
      const imageUrl = news.featuredImage || news.images?.[0];

      // ✅ try native share with image
      if (navigator.canShare && imageUrl) {
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();

          const file = new File([blob], "news.jpg", {
            type: blob.type || "image/jpeg",
          });

          const shareData: any = {
            title: news.title,
            text: shareText,
            files: [file],
          };

          if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
            return;
          }
        } catch {
          console.log("Image fetch failed");
        }
      }

      // ✅ fallback (WhatsApp with single link)
      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          shareText + "\n\n" + url
        )}`,
        "_blank"
      );

    } catch (err) {
      console.error(err);
      await navigator.clipboard.writeText(shareText + "\n\n" + url);
      alert("News copied!");
    }
  };

  // comment
  const handleComment = async () => {
    if (!text) return;

    await axios.post(
      `https://starnewsbackend.onrender.com/api/interactions/comment/${id}`,
      { text, visitorId }
    );

    setText("");
  };

  if (loading) {
    return (
      <div className="p-4 max-w-4xl mx-auto animate-pulse space-y-4">
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
        <div className="h-[250px] bg-gray-300 rounded"></div>
        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
      </div>
    );
  }

  if (!news) return <p className="p-4">Not found</p>;

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="bg-red-600 text-white px-4 py-3 flex justify-between">
        <h1 className="text-xl font-bold">📰 STAR NEWS</h1>
        <span className="bg-white text-red-600 px-2 py-1 text-xs rounded">
          LIVE
        </span>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-4 mt-3 rounded shadow">

        <div className="w-full rounded overflow-hidden">
          <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} loop>

            {news.featuredImage && (
              <SwiperSlide>
                <img
                  src={news.featuredImage}
                  className="w-full h-[220px] md:h-[350px] object-cover"
                />
              </SwiperSlide>
            )}

            {news.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  className="w-full h-[220px] md:h-[350px] object-cover"
                />
              </SwiperSlide>
            ))}

          </Swiper>
        </div>

        <h1 className="text-2xl font-bold mt-4">{news.title}</h1>

        <p className="text-sm text-gray-500">
          {new Date(news.createdAt).toLocaleString()}
        </p>

        <p className="mt-4 text-red-800 font-semibold leading-relaxed">
          {news.description}
        </p>

        <p className="mt-4 text-gray-800 leading-relaxed text-justify">
          {news.content}
        </p>

        <div className="flex justify-between items-center border-y py-2 mt-3">

          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-red-500"
          >
            <Heart size={18}/> {news.likes}
          </button>

          <span className="flex items-center gap-1">
            <Eye size={18}/> {news.views}
          </span>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-green-600"
          >
            <Share2 size={18}/> Share
          </button>

          <span className="flex items-center gap-1">
            <MessageCircle size={18}/> {comments.length}
          </span>

        </div>

      </div>

      <div className="max-w-4xl mx-auto bg-white mt-4 p-4 rounded shadow">

        <h2 className="font-semibold text-lg mb-3">
          💬 Comments ({comments.length})
        </h2>

        <textarea
          placeholder="Write comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <button
          onClick={handleComment}
          className="bg-red-600 text-white px-4 py-2 rounded text-sm"
        >
          Post Comment
        </button>

        {comments.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-red-600 text-sm mt-2 ml-3"
          >
            {showAll ? "Show Less" : "View More Comments"}
          </button>
        )}

        <div className="mt-4 space-y-4">
          {(showAll ? comments : comments.slice(0, 5)).map((c, i) => (
            <div key={i} className="flex gap-3 border-b pb-3">

              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm">
                {c.visitorId?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-semibold">User</p>
                <p>{c.text}</p>
                <p className="text-xs text-gray-400">
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleString()
                    : ""}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}