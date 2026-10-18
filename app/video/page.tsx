"use client";

import { useState, useEffect } from "react";
import { fetchVideos, VideoItem } from "../../lib/api";
import SectionHeader from "../components/SectionHeader";
import { Search, Play, Copy, Check, Tv, Radio } from "lucide-react";

export default function VideoLivePage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchVideos();
      setVideos(data);
      if (data.length > 0) {
        setSelectedVideo(data[0]);
      }
      setLoading(false);
    }
    load();
  }, []);

  const getEmbedURL = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)/;
    const match = url?.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  const getThumbnail = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)/;
    const match = url?.match(regex);
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : "/assets/placeholder-news.jpg";
  };

  const copyLink = async (id: string, link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {}
  };

  const filtered = videos.filter((v) =>
    (v.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <SectionHeader title="वीडियो समाचार व लाइव प्रसारण" badge="LIVE TV" />

      {/* 1. FEATURED / LIVE PLAYER SECTION */}
      <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        <div className="p-3 bg-red-700 text-white flex items-center justify-between text-xs font-bold">
          <span className="flex items-center gap-2">
            <Radio className="animate-pulse" size={16} /> STAR NEWS LIVE STREAM
          </span>
          <span className="bg-black/30 px-2 py-0.5 rounded text-[10px]">
            1080p HD
          </span>
        </div>

        <div className="aspect-video w-full bg-black relative flex items-center justify-center">
          {selectedVideo ? (
            <iframe
              src={`${getEmbedURL(selectedVideo.link)}?autoplay=1`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <div className="text-center text-gray-400 p-8">
              <Tv size={48} className="mx-auto mb-2 opacity-50" />
              <p>लाइव प्रसारण लोड हो रहा है...</p>
            </div>
          )}
        </div>

        {selectedVideo && (
          <div className="p-4 sm:p-5 bg-gray-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                अब चल रहा है
              </span>
              <h3 className="text-base sm:text-lg font-bold mt-1 text-gray-100">
                {selectedVideo.title}
              </h3>
            </div>

            <button
              onClick={() => copyLink(selectedVideo._id, selectedVideo.link)}
              className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0"
            >
              {copiedId === selectedVideo._id ? (
                <>
                  <Check size={14} className="text-green-400" />
                  <span>लिंक कॉपी हुआ</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>वीडियो लिंक कॉपी करें</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* 2. VIDEO LISTINGS & SEARCH */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white border-l-4 border-red-600 pl-2">
            स्टार न्यूज़ नेटवर्क वीडियो लाइब्रेरी ({videos.length})
          </h3>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="वीडियो खोजें..."
              className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl pl-9 pr-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <Search size={14} className="absolute left-3 top-2 text-gray-400" />
          </div>
        </div>

        {/* VIDEOS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-56 bg-gray-200 dark:bg-gray-800 rounded-2xl"
              />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => (
              <div
                key={v._id}
                onClick={() => setSelectedVideo(v)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col ${
                  selectedVideo?._id === v._id
                    ? "border-red-600 ring-2 ring-red-600/30 shadow-lg"
                    : "border-gray-200 dark:border-gray-800 hover:shadow-md"
                }`}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src={getThumbnail(v.link)}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                      <Play size={20} className="fill-white translate-x-0.5" />
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between bg-white dark:bg-gray-900">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-red-600 transition">
                    {v.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <span>🔴 स्टार वीडियो</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyLink(v._id, v.link);
                      }}
                      className="hover:text-red-600 transition flex items-center gap-1"
                    >
                      {copiedId === v._id ? "कॉपी हुआ" : "शेयर करें"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            कोई वीडियो नहीं मिला।
          </div>
        )}
      </div>
    </div>
  );
}