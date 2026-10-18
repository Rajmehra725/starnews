"use client";

import { useEffect, useState } from "react";
import { fetchNews, NewsItem } from "../../lib/api";
import NewsCard from "../components/NewsCard";
import SectionHeader from "../components/SectionHeader";
import { Trophy, RefreshCw, AlertCircle } from "lucide-react";

export default function CricketPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [tab, setTab] = useState<"live" | "upcoming" | "finished" | "news">("live");
  const [loading, setLoading] = useState(true);
  const [cricError, setCricError] = useState(false);

  const API_KEY = "0f0e435c-8c2f-4743-88ff-c00e164a4cd4";

  const loadMatches = async () => {
    setLoading(true);
    setCricError(false);
    try {
      const res = await fetch(
        `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
      );
      const data = await res.json();
      if (data && data.data) {
        setMatches(data.data);
      } else {
        setCricError(true);
      }
    } catch {
      setCricError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
    async function loadSportsNews() {
      const all = await fetchNews();
      const sports = all.filter(
        (n) =>
          n.category?.toLowerCase() === "sports" ||
          n.category?.toLowerCase() === "cricket"
      );
      setNewsList(sports.length > 0 ? sports : all.slice(0, 6));
    }
    loadSportsNews();
  }, []);

  const filteredMatches = matches.filter((m) => {
    if (tab === "live") return m.matchStarted && !m.matchEnded;
    if (tab === "finished") return m.matchEnded;
    if (tab === "upcoming") return !m.matchStarted;
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-3">
        <SectionHeader title="क्रिकेट व खेल समाचार" badge="SPORTS LIVE" />

        {/* TABS */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 p-1 rounded-xl text-xs font-bold border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setTab("live")}
            className={`px-3 py-1.5 rounded-lg transition ${
              tab === "live"
                ? "bg-red-600 text-white shadow"
                : "text-gray-700 dark:text-gray-300 hover:text-red-600"
            }`}
          >
            🔴 लाइव स्कोर
          </button>
          <button
            onClick={() => setTab("upcoming")}
            className={`px-3 py-1.5 rounded-lg transition ${
              tab === "upcoming"
                ? "bg-red-600 text-white shadow"
                : "text-gray-700 dark:text-gray-300 hover:text-red-600"
            }`}
          >
            आगामी मैच
          </button>
          <button
            onClick={() => setTab("finished")}
            className={`px-3 py-1.5 rounded-lg transition ${
              tab === "finished"
                ? "bg-red-600 text-white shadow"
                : "text-gray-700 dark:text-gray-300 hover:text-red-600"
            }`}
          >
            समाप्त मैच
          </button>
          <button
            onClick={() => setTab("news")}
            className={`px-3 py-1.5 rounded-lg transition ${
              tab === "news"
                ? "bg-red-600 text-white shadow"
                : "text-gray-700 dark:text-gray-300 hover:text-red-600"
            }`}
          >
            खेल समाचार
          </button>
        </div>
      </div>

      {/* MATCHES VIEW */}
      {tab !== "news" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {tab === "live"
                ? "वर्तमान में चल रहे लाइव मैच"
                : tab === "upcoming"
                ? "आगामी मुकाबले"
                : "हाल ही में समाप्त मैच"}
            </h3>

            <button
              onClick={loadMatches}
              className="text-xs text-red-600 flex items-center gap-1 hover:underline"
            >
              <RefreshCw size={13} /> रीफ्रेश करें
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl"
                />
              ))}
            </div>
          ) : filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMatches.map((m) => (
                <div
                  key={m.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-bold text-red-600">{m.matchType?.toUpperCase()}</span>
                    <span>{m.status}</span>
                  </div>

                  <h4 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                    {m.name}
                  </h4>

                  {/* TEAMS & SCORES */}
                  {m.score && Array.isArray(m.score) && (
                    <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl space-y-1.5 text-xs">
                      {m.score.map((s: any, idx: number) => (
                        <div key={idx} className="flex justify-between font-semibold">
                          <span>{s.inning}</span>
                          <span className="text-red-600 font-bold">
                            {s.r}/{s.w} ({s.o} ov)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-[11px] text-gray-400">
                    स्थान: {m.venue || "अंतर्राष्ट्रीय मैदान"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center text-gray-500 border space-y-2">
              <Trophy className="mx-auto text-yellow-500" size={32} />
              <p>इस श्रेणी में अभी कोई लाइव मैच उपलब्ध नहीं है।</p>
              {cricError && (
                <p className="text-xs text-amber-600 flex items-center justify-center gap-1">
                  <AlertCircle size={13} />
                  लाइव स्कोर प्रदाता सेवा वर्तमान में व्यस्त है। नीचे खेल समाचार पढ़ें।
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* SPORTS NEWS GRID */}
      <div>
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-4 border-l-4 border-red-600 pl-2">
          खेल व क्रिकेट की मुख्य खबरें
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((item) => (
            <NewsCard key={item._id} news={item} hrefPrefix="/news" />
          ))}
        </div>
      </div>
    </div>
  );
}