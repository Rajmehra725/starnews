"use client";

import { useEffect, useState } from "react";
import { fetchNews, NewsItem } from "../../lib/api";
import NewsCard from "../components/NewsCard";
import SectionHeader from "../components/SectionHeader";

export default function IndiaNewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchNews();
      // Filter for national, politics, or general items
      const national = data.filter(
        (n) =>
          !n.category ||
          n.category.toLowerCase() === "politics" ||
          n.category.toLowerCase() === "education" ||
          n.category.toLowerCase() === "national" ||
          n.category.toLowerCase() === "finance"
      );
      setNewsList(national.length > 0 ? national : data);
      setLoading(false);
    }
    load();
  }, []);

  const leadStory = newsList[0];
  const otherStories = newsList.slice(1);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="देश व राष्ट्रीय समाचार"
        badge="INDIA"
      />

      {loading ? (
        <div className="space-y-6 animate-pulse">
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl"
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          {leadStory && (
            <div className="mb-8">
              <NewsCard news={leadStory} variant="lead" hrefPrefix="/news" />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherStories.map((item) => (
              <NewsCard key={item._id} news={item} hrefPrefix="/news" />
            ))}
          </div>

          {newsList.length === 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center text-gray-500 border">
              देश समाचार अभी लोड हो रहे हैं...
            </div>
          )}
        </>
      )}
    </div>
  );
}