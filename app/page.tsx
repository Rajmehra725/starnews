"use client";

import Link from "next/link";
import PannaSection from "./panna/page";
import IndiaNewsPage from "./india/page";
import EntertainmentPage from "./entertainment/page";
import SportsNewsSourcesPage from "./sports/page";
import WorldNewsSourcesPage from "./World/page";

export default function Home() {
  const categories = [
    { name: "🇮🇳 देश", link: "/india" },
    { name: "🌍 दुनिया", link: "/world" },
    { name: "🏏 खेल", link: "/sports" },
    { name: "🎬 मनोरंजन", link: "/entertainment" },
    { name: "🎥 वीडियो", link: "/video" },
    { name: "📤 खबर भेजें", link: "/submit" },
    { name: "🔴 क्रिकेट", link: "/cricket" },
    { name: "🪔 पंचांग", link: "/panchang" },
  ];

  return (
    <div className="space-y-2 md:space-y-5">

      {/* PANNA */}
      <section className="bg-white dark:bg-gray-900 shadow-sm md:shadow rounded-md md:rounded-xl p-2 md:p-4">
        <Header title="🔴 पन्ना टॉप खबर" link="/panna" />
        <PannaSection />
      </section>

      {/* CATEGORY */}
      <section className="bg-white dark:bg-gray-900 shadow-sm md:shadow rounded-md md:rounded-xl p-2 md:p-4">
        <Header title="📂 कैटेगरी" link="#" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 md:gap-3">
          {categories.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="bg-gray-50 dark:bg-gray-800 p-2 text-xs md:text-sm rounded text-center"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      <Section title="🇮🇳 देश" link="/india">
        <IndiaNewsPage />
      </Section>

      <Section title="🎬 मनोरंजन" link="/entertainment">
        <EntertainmentPage />
      </Section>

      <Section title="🏏 खेल" link="/sports">
        <SportsNewsSourcesPage />
      </Section>

      <Section title="🌍 दुनिया" link="/world">
        <WorldNewsSourcesPage />
      </Section>

    </div>
  );
}

function Section({ title, link, children }: any) {
  return (
    <section className="bg-white dark:bg-gray-900 shadow-sm md:shadow rounded-md md:rounded-xl p-2 md:p-4">
      <Header title={title} link={link} />
      {children}
    </section>
  );
}

function Header({ title, link }: any) {
  return (
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-sm md:text-lg font-bold border-l-4 border-red-600 pl-2">
        {title}
      </h2>

      <Link
        href={link}
        className="text-[10px] md:text-sm text-red-600"
      >
        और देखें
      </Link>
    </div>
  );
}