"use client";

import { useEffect, useState } from "react";

type News = {
  article_id: string;
  title: string;
  description: string;
  image_url: string;
  source_name: string;
  pubDate: string;
  link: string;
};

export default function WorldPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "pub_79d78609851c446da9885589b524e7ef";

  useEffect(() => {
    fetch(
      `https://newsdata.io/api/1/news?apikey=${API_KEY}&category=world&language=en`
    )
      .then((res) => res.json())
      .then((data) => {
        setNews(data.results || []);
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
      <h1 className="text-2xl font-bold border-l-4 border-red-500 pl-2">
        🌍 World News
      </h1>

      {/* ⏳ Loading */}
      {loading && <p className="text-gray-500">Loading news...</p>}

      {/* ❌ No Data */}
      {!loading && news.length === 0 && (
        <p className="text-gray-500">No news available</p>
      )}

      {/* 📰 News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {news.map((item) => (
          <div
            key={item.article_id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* 🖼 Image */}
            <img
              src={item.image_url || "https://via.placeholder.com/400x250"}
              alt={item.title}
              className="w-full h-48 object-cover"
            />

            {/* 📄 Content */}
            <div className="p-4 space-y-2">
              <h2 className="font-semibold text-lg line-clamp-2">
                {item.title}
              </h2>

              <p className="text-sm text-gray-600 line-clamp-3">
                {item.description}
              </p>

              {/* 🏷 Meta */}
              <div className="flex justify-between text-xs text-gray-500">
                <span>{item.source_name}</span>
                <span>
                  {new Date(item.pubDate).toLocaleDateString()}
                </span>
              </div>

              {/* 🔗 Link */}
              <a
                href={item.link}
                target="_blank"
                className="text-blue-600 text-sm font-medium"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}