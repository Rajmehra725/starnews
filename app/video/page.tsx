"use client";

import { useState } from "react";

const videos = [
  {
    id: "1", // unique id
    youtubeId: "i34mx5QR2rQ?si=l0V2v4gIYFLHI9Hr",
    title: "Breaking News: India Big Update 🔥",
    channel: "STAR NEWS",
    time: "2 hours ago",
  },
  {
    id: "2",
    youtubeId: "Io-G_aiF8HA?si=GpG79tz-pjZkTlSD",
    title: "India vs World Latest News 🌍",
    channel: "STAR NEWS",
    time: "5 hours ago",
  },
  {
    id: "3",
    youtubeId: "pkP0VG8koI8?si=m9cCEeKS7oP2JgmE",
    title: "Cricket News Today 🏏",
    channel: "STAR SPORTS",
    time: "1 day ago",
  },
  {
    id: "4",
    youtubeId: "vulF9g5q2uo?si=teGCIuNw5kIBR8qo",
    title: "Political News Update 🏛",
    channel: "STAR NEWS",
    time: "3 hours ago",
  },
];

export default function YouTubePage() {
  const [selected, setSelected] = useState(videos[0]);

  return (
    <div className="p-4 space-y-6">

      {/* 🔴 TITLE */}
      <h1 className="text-2xl font-bold text-red-600 flex items-center gap-2">
        ▶ STAR NEWS YouTube
        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded animate-pulse">
          LIVE
        </span>
      </h1>

      {/* 🎥 MAIN VIDEO */}
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${selected.youtubeId}`}
          title={selected.title}
          allowFullScreen
        ></iframe>
      </div>

      {/* VIDEO INFO */}
      <div>
        <h2 className="text-lg font-bold">{selected.title}</h2>
        <p className="text-sm text-gray-500">
          {selected.channel} • {selected.time}
        </p>
      </div>

      {/* 📂 VIDEO LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelected(video)}
            className="cursor-pointer rounded-xl overflow-hidden shadow hover:shadow-xl transition border"
          >
            {/* Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/0.jpg`}
              alt={video.title}
              className="w-full"
            />

            {/* Info */}
            <div className="p-3">
              <h3 className="font-semibold text-sm line-clamp-2">
                {video.title}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {video.channel}
              </p>

              <p className="text-xs text-gray-400">
                {video.time}
              </p>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}