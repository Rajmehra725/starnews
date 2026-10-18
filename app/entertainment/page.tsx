"use client";

import { useEffect, useState } from "react";
import { fetchNews, NewsItem } from "../../lib/api";
import NewsCard from "../components/NewsCard";
import SectionHeader from "../components/SectionHeader";
import { Film } from "lucide-react";

export default function EntertainmentPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchNews();
      // Filter for entertainment, cinema, lifestyle or all
      const ent = data.filter(
        (n) =>
          n.category?.toLowerCase() === "entertainment" ||
          n.category?.toLowerCase() === "crime" ||
          n.category?.toLowerCase() === "local"
      );
      setNewsList(ent.length > 0 ? ent : data);
      setLoading(false);
    }
    load();
  }, []);

  const leadStory = newsList[0];
  const otherStories = newsList.slice(1);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="मनोरंजन, बॉलीवुड व सिनेमा"
        badge="ENTERTAINMENT"
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
              मनोरंजन समाचार अभी लोड हो रहे हैं...
            </div>
          )}
        </>
      )}
    </div>
  );
}