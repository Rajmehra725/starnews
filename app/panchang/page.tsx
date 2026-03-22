"use client";

import { useEffect, useState } from "react";


interface PanchangData {
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
}

export default function Panchang() {
  const [data, setData] = useState<PanchangData | null>(null);

  const fetchPanchang = async () => {
    try {
      // 🔥 Example FREE API (replace with your key if needed)
      const res = await fetch(
        "https://api.allorigins.win/raw?url=https://api.drikpanchang.com/v1/panchang?date=today"
      );

      const result = await res.json();

      // 👉 API structure ke hisab se map karna padega
      setData({
        tithi: result.tithi?.name || "N/A",
        nakshatra: result.nakshatra?.name || "N/A",
        yoga: result.yoga?.name || "N/A",
        karana: result.karana?.name || "N/A",
        sunrise: result.sunrise || "N/A",
        sunset: result.sunset || "N/A",
      });

    } catch (err) {
      console.error("Panchang fetch error:", err);

      // fallback data
      setData({
        tithi: "पूर्णिमा",
        nakshatra: "रोहिणी",
        yoga: "शुभ",
        karana: "बव",
        sunrise: "06:20 AM",
        sunset: "06:10 PM",
      });
    }
  };

  useEffect(() => {
    fetchPanchang();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
     

      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">
          🪔 Panchang Today
        </h1>

        {data ? (
          <div className="bg-white shadow rounded p-4 space-y-2">
            <p>📅 तिथि: <b>{data.tithi}</b></p>
            <p>🌟 नक्षत्र: <b>{data.nakshatra}</b></p>
            <p>🧘 योग: <b>{data.yoga}</b></p>
            <p>🔄 करण: <b>{data.karana}</b></p>
            <p>🌅 सूर्योदय: <b>{data.sunrise}</b></p>
            <p>🌇 सूर्यास्त: <b>{data.sunset}</b></p>
          </div>
        ) : (
          <p>Loading Panchang...</p>
        )}
      </div>
    </div>
  );
}