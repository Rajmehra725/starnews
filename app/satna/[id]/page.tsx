"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { Eye, Heart, MessageCircle, Share2 } from "lucide-react";

let socket: Socket;

interface CommentType {
  text: string;
  visitorId: string;
  createdAt?: string;
}

interface NewsType {
  _id: string;
  title: string;
  content:string;
  description: string;
  featuredImage?: string;
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

  // 🔥 AUTO VISITOR ID
  useEffect(() => {
    let vid = localStorage.getItem("visitorId");
    if (!vid) {
      vid = "user_" + Math.random().toString(36).substring(2, 8);
      localStorage.setItem("visitorId", vid);
    }
    setVisitorId(vid);
  }, []);

  // 🔥 FETCH NEWS
  const fetchNews = async () => {
    const res = await axios.get(
      "https://starnewsbackend.onrender.com/api/news"
    );
    const found = res.data.find((n: NewsType) => n._id === id);
    setNews(found);
  };

  // 🔥 FETCH COMMENTS
  const fetchComments = async () => {
    const res = await axios.get(
      `https://starnewsbackend.onrender.com/api/interactions/comment/${id}`
    );

    const data = res.data;
    if (Array.isArray(data)) setComments(data);
    else if (data.comments) setComments(data.comments);
    else setComments([]);
  };

  // 🔥 SOCKET SETUP
  useEffect(() => {
    socket = io("https://starnewsbackend.onrender.com");

    socket.on("commentAdded", (newComment) => {
      setComments((prev) => [newComment, ...prev]);
    });

    socket.on("likeUpdated", ({ newsId, likes }) => {
      if (newsId === id) {
        setNews((prev: any) => ({ ...prev, likes }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  // 🔥 INITIAL LOAD
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchNews(), fetchComments()]);
      setLoading(false);
    };
    load();
  }, [id]);

  // ❤️ LIKE BUTTON
  const handleLike = async () => {
    await axios.post(
      `https://starnewsbackend.onrender.com/api/interactions/like/${id}`,
      { visitorId }
    );
  };

  // 🔁 SHARE BUTTON
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news?.title,
        text: news?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  // 💬 COMMENT POST
  const handleComment = async () => {
    if (!text) return;

    await axios.post(
      `https://starnewsbackend.onrender.com/api/interactions/comment/${id}`,
      { text, visitorId }
    );

    setText("");
  };

  // 🔥 LOADING
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

      {/* HEADER */}
      <div className="bg-red-600 text-white px-4 py-3 flex justify-between">
        <h1 className="text-xl font-bold">📰 STAR NEWS</h1>
        <span className="bg-white text-red-600 px-2 py-1 text-xs rounded">
          LIVE
        </span>
      </div>

      {/* MAIN */}
      <div className="max-w-4xl mx-auto bg-white p-4 mt-3 rounded shadow">

        <img
          src={news.featuredImage}
          className="w-full h-[300px] object-cover rounded"
        />

        <h1 className="text-2xl font-bold mt-4">{news.title}</h1>

        <p className="text-sm text-gray-500">
          {new Date(news.createdAt).toLocaleString()}
        </p>
 <p className="mt-4 text-red-800 leading-relaxed">
          {news.description}
        </p>
         <p className="mt-4 text-gray-800 leading-relaxed">
          {news.content}
        </p>
        {/* ACTION BAR */}
        <div className="flex justify-between items-center border-y py-2 mt-3">

          <button onClick={handleLike} className="flex items-center gap-1 text-red-500">
            <Heart size={18}/> {news.likes}
          </button>

          <span className="flex items-center gap-1">
            <Eye size={18}/> {news.views}
          </span>

          <button onClick={handleShare} className="flex items-center gap-1 text-green-600">
            <Share2 size={18}/> Share
          </button>

          <span className="flex items-center gap-1">
            <MessageCircle size={18}/> {comments.length}
          </span>

        </div>

       
      </div>

      {/* COMMENTS */}
      <div className="max-w-4xl mx-auto bg-white mt-4 p-4 rounded shadow">

        <h2 className="font-semibold text-lg mb-3">
          💬 Comments ({comments.length})
        </h2>

        {/* INPUT */}
        <textarea
          placeholder="Write comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <button
          onClick={handleComment}
          className="bg-red-600 text-white px-4 py-2 rounded w-full"
        >
          Post Comment
        </button>

        {/* LIST */}
        <div className="mt-4 space-y-4">
          {comments.map((c, i) => (
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