"use client";

import Link from "next/link";

export default function BottomTicker() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      <div className="bg-black text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">

          <Link href="#" className="mx-6 text-yellow-400">
            🔥 विज्ञापन: आपकी दुकान का प्रचार यहाँ करें
          </Link>

          <Link href="#" className="mx-6">
            📢 Star News पर विज्ञापन देने के लिए संपर्क करें
          </Link>

          <Link href="#" className="mx-6 text-red-400">
            💼 Business Promotion Available
          </Link>

          <Link href="#" className="mx-6">
            🎯 Local News Promotion Available
          </Link>

        </div>
      </div>
    </div>
  );
}