"use client";

import { useEffect, useState } from "react";

type NewsSource = {
  id: string;
  name: string;
  description: string;
  category: string;
  language: string;
  country: string;
  url: string;
};

export default function TopNewsPage() {
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const res = await fetch(
          "https://newsdata.io/api/1/sources?country=IN&apikey=pub_79d78609851c446da9885589b524e7ef"
        );
        const data = await res.json();
        if (data && data.results) {
          // Sort sources by priority descending for top news
          const sortedSources = data.results.sort(
            (a: any, b: any) => (b.source_priority || 0) - (a.source_priority || 0)
          );
          setSources(sortedSources);
        } else {
          setError("No news sources found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch sources");
      } finally {
        setLoading(false);
      }
    };

    fetchSources();
  }, []);

  if (loading) return <p className="p-4 text-gray-500">Loading top news sources...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Star News - Top News Sources</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-lg p-3 hover:shadow-lg transition flex flex-col"
          >
            <h2 className="text-lg font-semibold">{source.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{source.description}</p>
            <span className="text-xs text-gray-400 mt-2 block">
              Language: {source.language} | Country: {source.country}
            </span>
            <span className="text-xs text-gray-400 mt-1 block">
              Category: {source.category}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}