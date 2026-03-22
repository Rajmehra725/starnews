"use client";

import Link from "next/link";
import PannaSection from "./panna/page";
import IndiaNewsPage from "./india/page";
import EntertainmentPage from "./entertainment/page";
import SportsNewsSourcesPage from "./sports/page";
import WorldNewsSourcesPage from "./World/page";
export default function Home() {
  return (
    <div className="space-y-6">

      {/* 🔝 PANNA NEWS (TOP PRIORITY) */}
      < PannaSection/> 

      {/* 📂 CATEGORY LINKS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { name: "🇮🇳 देश", link: "/india" },
          { name: "🌍 दुनिया", link: "/world" },
          { name: "🏏 खेल", link: "/sports" },
          { name: "🎬 मनोरंजन", link: "/entertainment" },
          { name: "🎥 वीडियो", link: "/video" },
          { name: "📤 खबर भेजें", link: "/submit" },
          { name: "🔴 क्रिकेट", link: "/cricket" },
          { name: "🪔 पंचांग", link: "/panchang" },
        ].map((item, i) => (
          <Link
            key={i}
            href={item.link}
            className="bg-white dark:bg-gray-900 p-3 rounded shadow text-center hover:bg-red-600 hover:text-white transition"
          >
            {item.name}
          </Link>
        ))}
      </div>
     <IndiaNewsPage/>
     <EntertainmentPage/>
     <SportsNewsSourcesPage/>
     <WorldNewsSourcesPage/>
    </div>
  );
}