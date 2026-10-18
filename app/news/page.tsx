"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchNews, NewsItem } from "../../lib/api";
import NewsCard from "../components/NewsCard";
import SectionHeader from "../components/SectionHeader";
import { Search, Filter } from "lucide-react";

export default function AllNewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("सभी");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const categories = [
    "सभी",
    "Politics",
    "Crime",
    "Sports",
    "Education",
    "Local",
    "Health",
    "Finance",
  ];

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchNews();
      setNewsList(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      const matchCat =
        selectedCategory === "सभी" ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [newsList, selectedCategory, searchQuery]);

  const displayedNews = filteredNews.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="ताज़ा खबरें व समाचार बुलेटिन"
        badge="ALL NEWS"
      />

      {/* FILTERS & SEARCH BAR */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* CATEGORY CHIPS */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs font-bold">
          <span className="text-gray-400 flex items-center gap-1 shrink-0 mr-1">
            <Filter size={13} /> श्रेणी:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-red-600 text-white shadow"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-red-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SEARCH INPUT */}
        <div className="relative w-full md:w-64 shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="इस सूची में खोजें..."
            className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl pl-8 pr-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <Search size={14} className="absolute left-2.5 top-2 text-gray-400" />
        </div>
      </div>

      {/* NEWS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-72 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : displayedNews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedNews.map((item) => (
            <NewsCard key={item._id} news={item} hrefPrefix="/news" />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center text-gray-500 border border-gray-200 dark:border-gray-800">
          कोई समाचार नहीं मिला। कृपया कोई अन्य श्रेणी या कीवर्ड चुनें।
        </div>
      )}

      {/* LOAD MORE BUTTON */}
      {visibleCount < filteredNews.length && (
        <div className="text-center pt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow"
          >
            और खबरें लोड करें ({filteredNews.length - visibleCount} शेष)
          </button>
        </div>
      )}
    </div>
  );
}