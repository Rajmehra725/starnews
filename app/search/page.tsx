"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { fetchNews, fetchSatnaNews, fetchChhatarpurNews, NewsItem } from "../../lib/api";
import NewsCard from "../components/NewsCard";
import SectionHeader from "../components/SectionHeader";
import { Search } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [inputQuery, setInputQuery] = useState(queryParam);
  const [activeQuery, setActiveQuery] = useState(queryParam);
  const [allData, setAllData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      try {
        const [news, satna, chhatarpur] = await Promise.all([
          fetchNews(),
          fetchSatnaNews(),
          fetchChhatarpurNews(),
        ]);

        // Merge uniquely by _id
        const map = new Map<string, NewsItem>();
        [...news, ...satna, ...chhatarpur].forEach((item) => {
          if (item._id && !map.has(item._id)) {
            map.set(item._id, item);
          }
        });

        setAllData(Array.from(map.values()));
      } catch (err) {
        console.error("Search load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  useEffect(() => {
    setActiveQuery(queryParam);
    setInputQuery(queryParam);
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(inputQuery.trim());
  };

  const results = useMemo(() => {
    if (!activeQuery.trim()) return allData;
    const q = activeQuery.toLowerCase();
    return allData.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q)
    );
  }, [allData, activeQuery]);

  return (
    <div className="space-y-8">
      <SectionHeader title="समाचार खोजें" badge="SEARCH" />

      {/* SEARCH INPUT BAR */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="कोई भी खबर, विषय, शहर या राजनेता खोजें..."
              className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow shrink-0"
          >
            खोजें
          </button>
        </form>
      </div>

      {/* RESULTS SUMMARY */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          {activeQuery ? (
            <>
              &ldquo;<strong className="text-gray-900 dark:text-white">{activeQuery}</strong>&rdquo; के लिए परिणाम:
            </>
          ) : (
            "सभी उपलब्ध समाचार:"
          )}
        </span>
        <span className="font-bold text-red-600">{results.length} खबरें मिलीं</span>
      </div>

      {/* RESULTS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl"
            />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <NewsCard key={item._id} news={item} hrefPrefix="/news" />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-16 text-center text-gray-500 border border-gray-200 dark:border-gray-800 space-y-2">
          <Search className="mx-auto text-gray-400" size={40} />
          <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">
            कोई परिणाम नहीं मिला
          </h3>
          <p className="text-xs text-gray-400">
            कृपया अन्य कीवर्ड या शहर का नाम दर्ज करके पुनः प्रयास करें।
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm">खोज पृष्ठ लोड हो रहा है...</div>}>
      <SearchContent />
    </Suspense>
  );
}
