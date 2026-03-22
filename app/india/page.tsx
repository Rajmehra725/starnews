"use client";

import { useEffect, useState } from "react";

type NewsArticle = {
  article_id: string;
  title: string;
  link: string;
  description: string;
  content: string;
  image_url?: string;
  source_name: string;
  pubDate: string;
  sentiment?: string;
};

export default function IndiaNewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://newsdata.io/api/1/latest?country=in&category=Breaking&apikey=pub_79d78609851c446da9885589b524e7ef"
        );
        const data = await res.json();
        if (data && data.results) {
          setNews(data.results);
        } else {
          setError("No news found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="p-4 text-gray-500">Loading breaking news...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Star News - India Breaking</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {news.map((article) => (
          <a
            key={article.article_id}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-lg p-3 hover:shadow-lg transition flex flex-col"
          >
            {article.image_url ? (
              <img
                src={article.image_url}
                alt={article.title}
                className="h-40 w-full object-cover rounded-md mb-2"
              />
            ) : (
              <div className="h-40 w-full bg-gray-200 flex items-center justify-center rounded-md mb-2">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}
            <h2 className="text-lg font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{article.description}</p>
            <span className="text-xs text-gray-400 mt-2 block">
              Source: {article.source_name} | {new Date(article.pubDate).toLocaleString()}
            </span>
            {article.sentiment && (
              <span
                className={`text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded ${
                  article.sentiment === "positive"
                    ? "bg-green-100 text-green-700"
                    : article.sentiment === "negative"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {article.sentiment.toUpperCase()}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}