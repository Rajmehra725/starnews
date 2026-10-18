"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchSatnaNews, NewsItem } from "../../lib/api";
import NewsCard from "../components/NewsCard";
import SectionHeader from "../components/SectionHeader";
import { Search } from "lucide-react";

export default function SatnaNewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchSatnaNews();
      setNewsList(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return newsList;
    const q = search.toLowerCase();
    return newsList.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.description?.toLowerCase().includes(q)
    );
  }, [newsList, search]);

  const leadStory = filtered[0];
  const otherStories = filtered.slice(1);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-3">
        <SectionHeader title="सतना शहर व जिला समाचार" badge="SATNA" />

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="सतना की खबरें खोजें..."
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl pl-9 pr-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <Search size={14} className="absolute left-3 top-2 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl"
            />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <>
          {leadStory && !search && (
            <div className="mb-8">
              <NewsCard news={leadStory} variant="lead" hrefPrefix="/satna" />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(search ? filtered : otherStories).map((item) => (
              <NewsCard key={item._id} news={item} hrefPrefix="/satna" />
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center text-gray-500 border">
          सतना की कोई खबर नहीं मिली।
        </div>
      )}
    </div>
  );
}