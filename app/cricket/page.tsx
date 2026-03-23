"use client";

import { useEffect, useState } from "react";


export default function CricketPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [tab, setTab] = useState("live");
  const [loading, setLoading] = useState(true);

  const API_KEY = "0f0e435c-8c2f-4743-88ff-c00e164a4cd4";

  useEffect(() => {
    fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
    )
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🎯 Filter matches
  const filteredMatches = matches.filter((m) => {
    if (tab === "live") return m.matchStarted && !m.matchEnded;
    if (tab === "finished") return m.matchEnded;
    if (tab === "upcoming") return !m.matchStarted;
    return true;
  });

  return (
    <div className="space-y-4">


      {/* 🔴 Heading */}
      <div className="px-4">
        <h1 className="text-2xl font-bold border-l-4 border-red-600 pl-2">
          🏏 Live Cricket
        </h1>
      </div>

      {/* 🔘 Tabs */}
      <div className="flex gap-2 px-4">
        {["live", "upcoming", "finished"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize
            ${
              tab === t
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ⏳ Loading */}
      {loading && <p className="px-4 text-gray-500">Loading matches...</p>}

      {/* ❌ No Data */}
      {!loading && filteredMatches.length === 0 && (
        <p className="px-4 text-gray-500">No matches found</p>
      )}

      {/* 🏏 Match Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {filteredMatches.map((match, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-4 space-y-3 border-l-4 border-red-500"
          >
            {/* 🔴 Status */}
            <div className="flex justify-between text-sm">
              <span className="text-red-600 font-semibold">
                {match.matchStarted && !match.matchEnded
                  ? "LIVE 🔴"
                  : match.matchEnded
                  ? "Finished"
                  : "Upcoming"}
              </span>
              <span className="text-gray-500">{match.date}</span>
            </div>

            {/* 🏏 Teams */}
            <div className="text-lg font-semibold text-center">
              {match.teams?.[0]} vs {match.teams?.[1]}
            </div>

            {/* 📊 Score */}
            <div className="text-center text-gray-800 font-bold">
              {match.score?.map((s: any, i: number) => (
                <div key={i}>
                  {s.inning}: {s.r}/{s.w} ({s.o})
                </div>
              ))}
            </div>

            {/* 📝 Status Text */}
            <p className="text-center text-sm text-gray-600">
              {match.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}