"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { Eye, Heart, MessageCircle, Share2 } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaWhatsapp
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
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

  headingBgColor?: string;
  headingTextColor?: string;

  contentBgColor?: string;
  contentTextColor?: string;
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
  const params = useParams();
const id = params.id as string;

  const [news, setNews] = useState<NewsType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [text, setText] = useState("");
  const [visitorId, setVisitorId] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const viewedRef = useRef(false);

  useEffect(() => {
    let vid = localStorage.getItem("visitorId");
    if (!vid) {
      vid = "user_" + Math.random().toString(36).substring(2, 8);
      localStorage.setItem("visitorId", vid);
    }
    setVisitorId(vid);
  }, []);

  // ✅ FIXED (fetch by id)
  const fetchNews = async () => {
  const res = await axios.get(
    "https://starnewsbackend.onrender.com/api/news"
  );

  const found = res.data.find((n: NewsType) => n._id === id);

  setNews(found);
};

  const fetchComments = async () => {
    const res = await axios.get(
      `https://starnewsbackend.onrender.com/api/news/${id}/comments`
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

    // ✅ realtime views
    socket.on("viewsUpdated", ({ newsId, views }) => {
      if (newsId === id) {
        setNews((prev: any) => {
          if (!prev) return prev;
          return { ...prev, views };
        });
      }
    });

    socket.on("shareUpdated", ({ newsId, shares }) => {
      if (newsId === id) {
        setNews((prev: any) => (prev ? { ...prev, shares } : prev));
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

  // ✅ view increment
  useEffect(() => {
    if (!id || !visitorId || viewedRef.current) return;

    viewedRef.current = true;

    axios.post(
      `https://starnewsbackend.onrender.com/api/news/${id}/view`,
      { userId: visitorId }
    );
  }, [id, visitorId]);

  const handleLike = async () => {
    await axios.post(
      `https://starnewsbackend.onrender.com/api/news/${id}/like`,
      { userId: visitorId }
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

            await axios.post(
              `https://starnewsbackend.onrender.com/api/news/${id}/share`
            );

            return;
          }
        } catch {}
      }

      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          shareText + "\n\nRead more: " + url
        )}`,
        "_blank"
      );

      await axios.post(
        `https://starnewsbackend.onrender.com/api/news/${id}/share`
      );

    } catch (err) {
      await navigator.clipboard.writeText(
        shareText + "\n\nRead more: " + url
      );
    }
  };

  const handleComment = async () => {
    if (!text) return;

    await axios.post(
      `https://starnewsbackend.onrender.com/api/news/${id}/comment`,
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
{/* SOCIAL MEDIA ICONS */}

<div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3">

  <a
    href="https://www.instagram.com/reel/DSEzE6VjA1u/?igsh=enR1OGZ0ZmN4enhz"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
               flex items-center justify-center 
               rounded-full 
               bg-gradient-to-tr from-pink-500 to-yellow-500 
               text-white shadow"
  >
    <FaInstagram className="text-sm sm:text-base md:text-lg" />
  </a>

  <a
    href="https://www.facebook.com/share/1Dj3yMqD7R/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
               flex items-center justify-center 
               rounded-full 
               bg-blue-600 
               text-white shadow"
  >
    <FaFacebookF className="text-sm sm:text-base md:text-lg" />
  </a>

  <a
    href="https://youtube.com/@starnewsnetworks88?si=HHAEJevcHq48Fdrh"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
               flex items-center justify-center 
               rounded-full 
               bg-red-600 
               text-white shadow"
  >
    <FaYoutube className="text-sm sm:text-base md:text-lg" />
  </a>

  <a
    href="https://x.com/starnews88"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
               flex items-center justify-center 
               rounded-full 
               bg-black 
               text-white shadow"
  >
    <FaTwitter className="text-sm sm:text-base md:text-lg" />
  </a>
<a
  href="https://wa.me/917987667358" // apna number daalo
  target="_blank"
  className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 text-white"
>
  <FaWhatsapp />
</a>
</div>

{/* REPORTER INFO */}
<div className="flex items-center gap-3 sm:gap-4 mt-4">

  <img
    src="/Reporter.jpg"
    alt="Reporter"
    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
               rounded-full object-cover 
               border-2 border-red-600 shadow-sm"
  />

  <div className="leading-tight">
    <p className="font-semibold text-gray-800 
                  text-sm sm:text-base md:text-lg">
      Prakash Shrivastava
    </p>
    <p className="text-xs sm:text-sm text-gray-500">
      STAR NEWS PANNA
    </p>
  </div>

</div>
        {/* DESCRIPTION */}
        <p className="mt-4 text-red-700 font-semibold text-lg md:text-xl leading-relaxed border-l-4 border-red-700 pl-3">
          {news.description}
        </p>

<p className="font-bold text-gray-900 mt-3 
              text-sm sm:text-base md:text-lg 
              leading-snug">
  स्टार न्यूज़ नेटवर्क ब्यूरो पन्ना।
</p>
        {/* CONTENT */}
        <p className="mt-4 text-gray-800 leading-relaxed text-justify text-base md:text-lg">
          {news.content}
        </p>

        {/* IMAGES SLIDER */}
        {news.images && news.images.length > 0 && (
           <div className="w-[280px] sm:w-full md:w-full mx-auto rounded overflow-hidden mt-6 border-t pt-4">
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
    <div key={sec._id} className="mt-6 rounded-lg overflow-hidden shadow">

      {sec.heading && (
        <div
          className="p-4 font-bold text-xl md:text-2xl"
          style={{
            backgroundColor: sec.headingBgColor || "#f3f4f6",
            color: sec.headingTextColor || "#000",
          }}
        >
          {sec.heading}
        </div>
      )}

      <div
        className="p-5"
        style={{
          backgroundColor: sec.contentBgColor || "#ffffff",
          color: sec.contentTextColor || "#000",
        }}
      >
        {sec.image && (
          <img
            src={sec.image}
            className="w-full h-[200px] object-cover rounded mb-3 shadow"
          />
        )}

        <p className="text-base md:text-lg text-justify">
          {sec.content}
        </p>
      </div>

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
<Eye size={20}/> {news?.views ?? 0}
</span>

<button
onClick={handleShare}
className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-all font-medium"
>
<Share2 size={20}/> {news.shares ?? 0}
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