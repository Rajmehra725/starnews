"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Search, ExternalLink, Copy, Play } from "lucide-react";

type Video = {
  _id: string;
  title: string;
  link: string;
};

export default function YoutubeFrontend() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filtered, setFiltered] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://starnewsbackend.onrender.com/api/youtube/all"
        );
        setVideos(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // 🔍 Search filter
  useEffect(() => {
   const result = videos.filter((v) => {
  const title = v.title ?? "";
  return title.toLowerCase().includes(search.toLowerCase());
});
    setFiltered(result);
  }, [search, videos]);

  const getEmbedURL = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)/;
    const match = url.match(regex);
    return match
      ? `https://www.youtube.com/embed/${match[1]}`
      : "";
  };

  const copyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied 👍");
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
          🎥 Star News Videos
        </h1>

        {/* SEARCH */}
        <div className="mb-6 max-w-md mx-auto">
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white h-64 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No videos found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((v) => (
              <div
                key={v._id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition group"
              >
                {/* VIDEO */}
                <div className="relative pt-[56.25%] bg-black">
                  <iframe
                    src={getEmbedURL(v.link)}
                    title={v.title}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  />

                  {/* ▶️ overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                    <Play className="text-white w-12 h-12" />
                  </div>
                </div>

                {/* DETAILS */}
                <div className="p-4 space-y-3">
                  <h2 className="text-md font-semibold text-gray-800 line-clamp-2">
                    {v.title}
                  </h2>

                  {/* ACTIONS */}
                  <div className="flex items-center justify-between text-sm text-gray-500">

                    <button
                      onClick={() => copyLink(v.link)}
                      className="flex items-center gap-1 hover:text-black transition"
                    >
                      <Copy size={14} />
                      Copy
                    </button>

                    <a
                      href={v.link}
                      target="_blank"
                      className="flex items-center gap-1 hover:text-red-600 transition"
                    >
                      <ExternalLink size={14} />
                      Watch
                    </a>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}