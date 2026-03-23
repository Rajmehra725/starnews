"use client";

import { useEffect, useState } from "react";

type Source = {
  id: string;
  name: string;
  url: string;
  icon: string;
  description: string;
  category: string[];
  language: string;
  country: string[];
};

export default function PoliticsPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "pub_79d78609851c446da9885589b524e7ef";

  useEffect(() => {
    fetch(
      `https://newsdata.io/api/1/sources?apikey=${API_KEY}&country=IN`
    )
      .then((res) => res.json())
      .then((data) => {
        // 🏛️ Filter only politics sources
        const politicsSources = (data.results || []).filter((item: any) =>
          item.category?.includes("politics")
        );

        setSources(politicsSources);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 space-y-4">

      {/* 🔥 Heading */}
      <h1 className="text-2xl font-bold border-l-4 border-blue-500 pl-2">
        🏛️ Politics Sources (India)
      </h1>

      {/* ⏳ Loading */}
      {loading && <p className="text-gray-500">Loading sources...</p>}

      {/* ❌ No Data */}
      {!loading && sources.length === 0 && (
        <p className="text-gray-500">No politics sources found</p>
      )}

      {/* 📡 Sources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sources.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition space-y-3"
          >
            {/* 🖼 Logo */}
            <img
              src={item.icon || "https://via.placeholder.com/100"}
              alt={item.name}
              className="w-16 h-16 object-contain"
            />

            {/* 🏷 Name */}
            <h2 className="font-semibold text-lg">
              {item.name}
            </h2>

            {/* 📝 Description */}
            <p className="text-sm text-gray-600 line-clamp-3">
              {item.description || "No description available"}
            </p>

            {/* 🌐 Meta */}
            <div className="text-xs text-gray-500 space-y-1">
              <p>Language: {item.language}</p>
              <p>Country: {item.country?.join(", ")}</p>
              <p>Category: {item.category?.join(", ")}</p>
            </div>

            {/* 🔗 Visit */}
            <a
              href={item.url}
              target="_blank"
              className="text-blue-600 text-sm font-medium"
            >
              Visit Source →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}