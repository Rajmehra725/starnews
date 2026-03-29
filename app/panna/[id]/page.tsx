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

interface SectionType {
  _id: string;
  heading: string;
  content: string;
  image?: string;
  bgColor?: string;
  textColor?: string;
}

interface NewsType {
  _id: string;
  title: string;
  content: string;
  description: string;
  featuredImage?: string;
  images?: string[];
  sections?: SectionType[];
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

  useEffect(() => {
    let vid = localStorage.getItem("visitorId");
    if (!vid) {
      vid = "user_" + Math.random().toString(36).substring(2, 8);
      localStorage.setItem("visitorId", vid);
    }
    setVisitorId(vid);
  }, []);

  const fetchNews = async () => {
    const res = await axios.get(
      "https://starnewsbackend.onrender.com/api/news"
    );
    const found = res.data.find((n: NewsType) => n._id === id);
    setNews(found);
  };

  const fetchComments = async () => {
    const res = await axios.get(
      `https://starnewsbackend.onrender.com/api/interactions/comment/${id}`
    );
    const data = res.data;

    if (Array.isArray(data)) setComments(data);
    else if (data.comments) setComments(data.comments);
    else setComments([]);
  };

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

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchNews(), fetchComments()]);
      setLoading(false);
    };

    load();
  }, [id]);

  const handleLike = async () => {
    await axios.post(
      `https://starnewsbackend.onrender.com/api/interactions/like/${id}`,
      { visitorId }
    );
  };

  const handleShare = async () => {
    if (!news) return;

    const url = window.location.origin + window.location.pathname;
    const shareText = `${news.title}\n\n${news.description}`;

    try {
      const imageUrl = news.featuredImage || news.images?.[0];

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
            url: url,
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

      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          shareText + "\n\nRead more: " + url
        )}`,
        "_blank"
      );
    } catch (err) {
      console.error(err);
      await navigator.clipboard.writeText(shareText + "\n\nRead more: " + url);
      alert("News copied!");
    }
  };

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
    <div className="bg-gray-100 min-h-screen font-sans">

      {/* HEADER */}
      <div className="bg-red-700 text-white px-4 py-3 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold tracking-wide">📰 STAR NEWS</h1>
        <span className="bg-white text-red-700 px-3 py-1 text-xs rounded font-medium">
          LIVE
        </span>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-5 mt-4 rounded shadow-lg">

        {/* FEATURED IMAGE */}
        {news.featuredImage && (
          <img
            src={news.featuredImage}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-md shadow-md"
          />
        )}

        {/* TITLE + DATE */}
        <h1 className="text-3xl md:text-4xl font-extrabold mt-4 text-gray-900 leading-tight">
          {news.title}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {new Date(news.createdAt).toLocaleString()}
        </p>

        {/* DESCRIPTION */}
        <p className="mt-4 text-red-700 font-semibold text-lg md:text-xl leading-relaxed border-l-4 border-red-700 pl-3">
          {news.description}
        </p>

        {/* CONTENT */}
        <p className="mt-4 text-gray-800 leading-relaxed text-justify text-base md:text-lg">
          {news.content}
        </p>

        {/* IMAGES SLIDER */}
        {news.images && news.images.length > 0 && (
          <div className="w-full rounded overflow-hidden mt-6 border-t pt-4">
            <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} loop>
              {news.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    className="w-full h-[220px] md:h-[350px] object-cover rounded-md shadow"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* SECTIONS */}
        {news.sections &&
          news.sections.map((sec) => (
            <div
              key={sec._id}
              className="mt-6 p-5 rounded-lg shadow-inner"
              style={{ backgroundColor: sec.bgColor || "#f9f9f9", color: sec.textColor || "#000" }}
            >
              {sec.heading && (
                <h2 className="font-bold text-xl md:text-2xl mb-3">
                  {sec.heading}
                </h2>
              )}
              {sec.image && (
                <img
                  src={sec.image}
                  className="w-full h-[200px] object-cover rounded mb-3 shadow"
                />
              )}
              <p className="text-gray-900 text-base md:text-lg">{sec.content}</p>
            </div>
          ))}

        {/* LIKE / VIEW / SHARE / COMMENTS */}
        <div className="flex justify-between items-center border-t border-b py-3 mt-6 text-gray-700">

          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-all font-medium"
          >
            <Heart size={20}/> {news.likes}
          </button>

          <span className="flex items-center gap-2">
            <Eye size={20}/> {news.views}
          </span>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-all font-medium"
          >
            <Share2 size={20}/> Share
          </button>

          <span className="flex items-center gap-2">
            <MessageCircle size={20}/> {comments.length}
          </span>

        </div>

      </div>

      {/* COMMENTS */}
      <div className="max-w-4xl mx-auto bg-white mt-5 p-5 rounded shadow-lg">

        <h2 className="font-semibold text-lg md:text-xl mb-4">
          💬 Comments ({comments.length})
        </h2>

        <textarea
          placeholder="Write comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-3 rounded mb-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-red-700"
        />

        <button
          onClick={handleComment}
          className="bg-red-700 text-white px-5 py-2 rounded text-base md:text-lg font-semibold hover:bg-red-800 transition"
        >
          Post Comment
        </button>

        {comments.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-red-700 text-sm mt-3 ml-2 hover:underline"
          >
            {showAll ? "Show Less" : "View More Comments"}
          </button>
        )}

        <div className="mt-4 space-y-4">
          {(showAll ? comments : comments.slice(0, 5)).map((c, i) => (
            <div key={i} className="flex gap-3 border-b pb-3">

              <div className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center text-sm md:text-base font-bold">
                {c.visitorId?.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <p className="text-sm md:text-base font-semibold text-gray-800">User</p>
                <p className="text-gray-700">{c.text}</p>
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