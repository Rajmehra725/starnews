"use client";

import { useEffect, useState } from "react";

type Ad = {
  _id: string;
  title: string;
  image: string;
  link: string;
  position: "top" | "bottom" | "side"; // ✅ side added
};

export function AdBanner({ position }: { position: "top" | "bottom" | "side" }) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [visible, setVisible] = useState(true);

  // 🔥 Fetch Ad
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(
          `https://starnewsbackend.onrender.com/api/ads?position=${position}`
        );
        const data = await res.json();

        console.log("Ad Data:", data);

        if (data && data.length > 0) {
          setAd(data[0]);
        }
      } catch (err) {
        console.error("Ad fetch error:", err);
      }
    };

    fetchAd();
  }, [position]);

  // ❌ Close Ad
  const closeAd = () => {
    setVisible(false);
  };

  // 📊 Click Tracking
  const handleClick = async () => {
    if (!ad) return;

    try {
      await fetch(
        `https://starnewsbackend.onrender.com/api/ads/click/${ad._id}`,
        { method: "POST" }
      );
    } catch (err) {
      console.error("Click tracking failed");
    }

    window.open(ad.link, "_blank");
  };

  if (!ad || !visible) return null;

  return (
    <div
      className={`flex justify-center ${
        position === "top"
          ? "w-full my-2"
          : position === "bottom"
          ? "w-full fixed bottom-0 z-50"
          : "hidden lg:flex fixed right-4 top-24 w-64 z-50" // ✅ SIDE AD
      }`}
    >
      <div
        className={`relative w-full bg-white dark:bg-gray-900 shadow-lg rounded overflow-hidden border
        ${position === "side" ? "max-w-xs" : "max-w-5xl"}`}
      >
        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={closeAd}
          className="absolute top-1 right-2 bg-black/60 text-white px-2 rounded text-xs hover:bg-black"
        >
          ✕
        </button>

        {/* LABEL */}
        <div className="bg-yellow-400 text-black text-xs px-2 py-1 font-semibold">
          Sponsored • Star News
        </div>

        {/* IMAGE */}
        <img
          src={
            ad.image.startsWith("http")
              ? ad.image
              : `https://starnewsbackend.onrender.com/${ad.image}`
          }
          alt={ad.title}
          onClick={handleClick}
          className={`w-full object-cover cursor-pointer
            ${
              position === "side"
                ? "h-[400px]"
                : "h-[90px] md:h-[120px]"
            }`}
          loading="lazy"
        />

        {/* TITLE */}
        <div
          onClick={handleClick}
          className="text-center text-sm py-1 font-medium cursor-pointer"
        >
          {ad.title}
        </div>
      </div>
    </div>
  );
}