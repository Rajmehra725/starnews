// app/news/sports/page.tsx
"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
};

export default function SportsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await fetch(
          "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=293cf473654e4363b1f26f3c4d38676d"
        );
        const data = await res.json();
        setArticles(data.articles);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSports();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Sports News</h1>
      {articles.map((item, idx) => (
        <div key={idx} className="border rounded shadow p-4">
          {item.urlToImage && (
            <img
              src={item.urlToImage}
              alt={item.title}
              className="w-full h-48 object-cover rounded"
            />
          )}
          <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
          <p className="text-gray-700 mt-1">{item.description}</p>
          <a href={item.url} target="_blank" className="text-blue-600 mt-2 block">
            Read More
          </a>
          <p className="text-sm text-gray-400 mt-1">
            {new Date(item.publishedAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}