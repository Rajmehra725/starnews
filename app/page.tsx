"use client";

import Link from "next/link";
import PannaSection from "./panna/page";
import IndiaNewsPage from "./india/page";
import EntertainmentPage from "./entertainment/page";
import BannerAd from "./components/BannerAd";
import VideoSection from "./video/page";
import PanchangSection from "./panchang/page";
export default function Home() {
  const categories = [
    { name: "🇮🇳 देश", link: "/india" },
    { name: "🏏 खेल", link: "/sports" },
    { name: "🎬 मनोरंजन", link: "/entertainment" },
    { name: "🎥 वीडियो", link: "/video" },
    { name: "📤 खबर भेजें", link: "/submit" },
    { name: "🔴 क्रिकेट", link: "/cricket" },
    { name: "🪔 पंचांग", link: "/panchang" },
  ];

  return (
    <div className="w-full flex justify-center">
      
      {/* 🔥 MAIN CONTAINER */}
      <div className="w-full max-w-[1200px] px-2 md:px-4 space-y-3 md:space-y-6">

        {/* 🔴 TOP BANNER */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1000px]">
            <BannerAd />
          </div>
        </div>
        <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-white to-blue-50 border">

      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          📢 Latest Star News Blog
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Click karke poora blog padhein aur latest updates ke saath updated rahein.
        </p>

        <Link
          href="https://starnewsnetworks.blogspot.com/2026/03/blog-post.html?m=1"
          target="_blank"
        >
          <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-xl hover:scale-105 transition">
            Read Now →
          </button>
        </Link>
      </div>
    </div>

        {/* 📰 PANNA SECTION */}
        <Section title="🔴 पन्ना टॉप खबर" link="/panna">
          <PannaSection />
        </Section>
          <Section title="🔴 Youtube Videos " link="/video">
          <VideoSection />
        </Section>
          <Section title="🔴 Hindi Panchang " link="/panchang">
          <PanchangSection />
        </Section>

        {/* 📂 CATEGORY */}
        <section className="bg-white dark:bg-gray-900 shadow-sm md:shadow rounded-md md:rounded-xl p-2 md:p-4">
          <Header title="📂 कैटेगरी" link="#" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
            {categories.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="
                  bg-gray-50 dark:bg-gray-800 
                  p-2 md:p-3 
                  text-xs md:text-sm 
                  rounded-md 
                  text-center 
                  hover:bg-red-50 dark:hover:bg-gray-700
                  transition
                "
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>

        {/* 🇮🇳 INDIA NEWS */}
        <Section title="🇮🇳 देश" link="/india">
          <IndiaNewsPage />
        </Section>

        {/* 🎬 ENTERTAINMENT */}
        <Section title="🎬 मनोरंजन" link="/entertainment">
          <EntertainmentPage />
        </Section>

      </div>
    </div>
  );
}

function Section({ title, link, children }: any) {
  return (
    <section className="
      bg-white dark:bg-gray-900 
      shadow-sm md:shadow 
      rounded-md md:rounded-xl 
      p-2 md:p-4
    ">
      <Header title={title} link={link} />
      {children}
    </section>
  );
}

function Header({ title, link }: any) {
  return (
    <div className="flex justify-between items-center mb-2 md:mb-3">
      <h2 className="
        text-sm md:text-lg 
        font-bold 
        border-l-4 border-red-600 
        pl-2
      ">
        {title}
      </h2>

      <Link
        href={link}
        className="
          text-[10px] md:text-sm 
          text-red-600 
          hover:underline
        "
      >
        और देखें
      </Link>
    </div>
  );
}