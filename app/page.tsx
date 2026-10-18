"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  fetchNews,
  fetchSatnaNews,
  fetchChhatarpurNews,
  fetchVideos,
  fetchGallery,
  fetchEpaper,
  NewsItem,
  VideoItem,
  GalleryItem,
  EpaperItem,
  getMediaUrl,
  formatTimeHindi,
} from "../lib/api";
import NewsCard from "./components/NewsCard";
import SectionHeader from "./components/SectionHeader";
import {
  Flame,
  Tv,
  Calendar,
  Image as ImageIcon,
  Newspaper,
  ChevronRight,
  Play,
  TrendingUp,
} from "lucide-react";

export default function HomePage() {
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [satnaNews, setSatnaNews] = useState<NewsItem[]>([]);
  const [chhatarpurNews, setChhatarpurNews] = useState<NewsItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [epapers, setEpapers] = useState<EpaperItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRegionalTab, setActiveRegionalTab] = useState<"satna" | "panna" | "chhatarpur">("satna");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [newsData, satnaData, chhatarpurData, videoData, galleryData, epaperData] =
          await Promise.all([
            fetchNews(),
            fetchSatnaNews(),
            fetchChhatarpurNews(),
            fetchVideos(),
            fetchGallery(),
            fetchEpaper(),
          ]);

        setAllNews(newsData);
        setSatnaNews(satnaData);
        setChhatarpurNews(chhatarpurData);
        setVideos(videoData);
        setGallery(galleryData);
        setEpapers(epaperData);
      } catch (err) {
        console.error("Homepage load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Compute lead story and headlines
  const leadStory = allNews[0] || satnaNews[0] || null;
  const topHeadlines = allNews.slice(1, 5);
  const trendingStories = allNews.slice(0, 5);
  const nationalStories = allNews.filter(
    (n) => n.category?.toLowerCase() === "politics" || n.category?.toLowerCase() === "education"
  ).slice(0, 4);
  const sportsStories = allNews.filter(
    (n) => n.category?.toLowerCase() === "sports" || n.category?.toLowerCase() === "cricket"
  ).slice(0, 4);
  const entertainmentStories = allNews.filter(
    (n) => n.category?.toLowerCase() === "entertainment" || n.category?.toLowerCase() === "crime"
  ).slice(0, 4);
  const premiumStories = allNews.slice(2, 6);

  // Active regional items based on selected tab
  const regionalItems =
    activeRegionalTab === "satna"
      ? satnaNews.slice(0, 6)
      : activeRegionalTab === "chhatarpur"
      ? chhatarpurNews.slice(0, 6)
      : allNews.slice(0, 6); // panna shares general news

  return (
    <div className="space-y-8">
      {/* 1. HERO SECTION: LEAD STORY (2/3) + TOP HEADLINES STACK (1/3) */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT: MAIN LEAD STORY */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="w-full aspect-[16/10] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl" />
            ) : leadStory ? (
              <NewsCard news={leadStory} variant="lead" hrefPrefix="/news" />
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center text-gray-500 border">
                मुख्य समाचार लोड हो रहे हैं...
              </div>
            )}
          </div>

          {/* RIGHT: TOP HEADLINES STACK (SATNA TIMES STYLE) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-red-600">
                <Flame className="text-red-600 fill-red-600" size={18} />
                <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white uppercase tracking-tight">
                  मुख्य सुर्खियां
                </h3>
              </div>

              <div className="flex-1 flex flex-col justify-between gap-2.5">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-20 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"
                    />
                  ))
                ) : topHeadlines.length > 0 ? (
                  topHeadlines.map((item) => (
                    <NewsCard
                      key={item._id}
                      news={item}
                      variant="horizontal"
                      hrefPrefix="/news"
                    />
                  ))
                ) : (
                  satnaNews.slice(1, 5).map((item) => (
                    <NewsCard
                      key={item._id}
                      news={item}
                      variant="horizontal"
                      hrefPrefix="/satna"
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REGIONAL NEWS TABS SECTION (सतना, पन्ना, छतरपुर) */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-5 border-b border-gray-200 dark:border-gray-800 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-red-600 rounded-full" />
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              मध्य प्रदेश व क्षेत्रीय समाचार
            </h2>
          </div>

          {/* TABS */}
          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveRegionalTab("satna")}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeRegionalTab === "satna"
                  ? "bg-red-600 text-white shadow"
                  : "text-gray-700 dark:text-gray-300 hover:text-red-600"
              }`}
            >
              सतना न्यूज़
            </button>
            <button
              onClick={() => setActiveRegionalTab("panna")}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeRegionalTab === "panna"
                  ? "bg-red-600 text-white shadow"
                  : "text-gray-700 dark:text-gray-300 hover:text-red-600"
              }`}
            >
              पन्ना न्यूज़
            </button>
            <button
              onClick={() => setActiveRegionalTab("chhatarpur")}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeRegionalTab === "chhatarpur"
                  ? "bg-red-600 text-white shadow"
                  : "text-gray-700 dark:text-gray-300 hover:text-red-600"
              }`}
            >
              छतरपुर न्यूज़
            </button>
          </div>
        </div>

        {/* REGIONAL GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl"
              />
            ))
          ) : regionalItems.length > 0 ? (
            regionalItems.map((news) => (
              <NewsCard
                key={news._id}
                news={news}
                hrefPrefix={
                  activeRegionalTab === "satna"
                    ? "/satna"
                    : activeRegionalTab === "chhatarpur"
                    ? "/chhatarpur"
                    : "/panna"
                }
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-500">
              इस क्षेत्र में अभी कोई समाचार उपलब्ध नहीं है।
            </div>
          )}
        </div>

        <div className="mt-5 text-center">
          <Link
            href={`/${activeRegionalTab}`}
            className="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition duration-300"
          >
            <span>{activeRegionalTab.toUpperCase()} की सभी खबरें देखें</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* 3. DIGITAL PREMIUM STORY (डिजिटल प्रीमियम स्टोरी) — SATNA TIMES HIGHLIGHT */}
      <section className="bg-gradient-to-br from-[#1a1e24] to-[#0f1216] rounded-2xl p-5 sm:p-7 text-white shadow-xl border border-gray-800">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-7 bg-yellow-400 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              डिजिटल प्रीमियम स्टोरी
            </h2>
            <span className="bg-yellow-400 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
              EXCLUSIVE
            </span>
          </div>

          <Link
            href="/news"
            className="text-xs font-bold text-yellow-400 hover:underline flex items-center gap-1"
          >
            <span>सभी देखें</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-60 bg-gray-800/80 animate-pulse rounded-xl"
              />
            ))
          ) : premiumStories.length > 0 ? (
            premiumStories.map((item) => (
              <NewsCard
                key={item._id}
                news={item}
                hrefPrefix="/news"
              />
            ))
          ) : (
            <div className="col-span-4 text-center py-6 text-gray-400">
              प्रीमियम कहानियां लोड हो रही हैं...
            </div>
          )}
        </div>
      </section>

      {/* 4. MAIN 2-COLUMN LAYOUT: CATEGORY STORIES (8 COLS) + SIDEBAR WIDGETS (4 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* LEFT COLUMN: NATIONAL, SPORTS & ENTERTAINMENT */}
        <div className="lg:col-span-8 space-y-8">
          {/* NATIONAL NEWS (देश / राष्ट्रीय) */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
            <SectionHeader
              title="देश / राष्ट्रीय समाचार"
              link="/india"
              linkText="और देश की खबरें"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(nationalStories.length > 0 ? nationalStories : allNews.slice(0, 4)).map(
                (item) => (
                  <NewsCard key={item._id} news={item} hrefPrefix="/news" />
                )
              )}
            </div>
          </section>

          {/* CRICKET & SPORTS (खेल व क्रिकेट) */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
            <SectionHeader
              title="खेल व क्रिकेट अपडेट्स"
              link="/cricket"
              linkText="लाइव स्कोर व खेल"
              badge="LIVE"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(sportsStories.length > 0 ? sportsStories : allNews.slice(4, 8)).map(
                (item) => (
                  <NewsCard key={item._id} news={item} hrefPrefix="/news" />
                )
              )}
            </div>
          </section>

          {/* ENTERTAINMENT & BOLLYWOOD (मनोरंजन) */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
            <SectionHeader
              title="मनोरंजन व सिनेमा"
              link="/entertainment"
              linkText="बॉलीवुड व मनोरंजन"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(entertainmentStories.length > 0 ? entertainmentStories : allNews.slice(2, 6)).map(
                (item) => (
                  <NewsCard key={item._id} news={item} hrefPrefix="/news" />
                )
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: SIDEBAR WIDGETS */}
        <div className="lg:col-span-4 space-y-6">
          {/* TRENDING STORIES (ट्रेंडिंग खबरें) */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-red-600">
              <TrendingUp className="text-red-600" size={18} />
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white uppercase tracking-tight">
                ट्रेंडिंग खबरें
              </h3>
            </div>

            <div className="space-y-3">
              {trendingStories.map((item, index) => (
                <Link
                  key={item._id}
                  href={`/news/${item._id}`}
                  className="flex items-start gap-3 group py-2 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                >
                  <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 font-black text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-red-600 transition line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {formatTimeHindi(item.createdAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* PANCHANG & ASTRO PREVIEW */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800/80 rounded-2xl p-5 shadow-sm border border-amber-200/60 dark:border-gray-800">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-amber-600/30">
              <Calendar className="text-amber-600" size={18} />
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                दैनिक पंचांग व राशिफल
              </h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              आज का शुभ मुहूर्त, राहुकाल, दिशाशूल और 12 राशियों का सटीक दैनिक राशिफल देखें।
            </p>
            <Link
              href="/panchang"
              className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-xl text-xs transition shadow"
            >
              <span>पंचांग व राशिफल पढ़ें</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* E-PAPER HIGHLIGHT */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-red-600">
              <Newspaper className="text-red-600" size={18} />
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                डिजिटल ई-पेपर (E-Paper)
              </h3>
            </div>
            <div className="aspect-[16/10] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative mb-3 flex items-center justify-center">
              {epapers.length > 0 && epapers[0].pages && epapers[0].pages[0] ? (
                <img
                  src={getMediaUrl(epapers[0].pages[0])}
                  alt="E-paper"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <Newspaper className="mx-auto text-red-600 mb-1" size={32} />
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    आज का अखबार
                  </span>
                </div>
              )}
            </div>
            <Link
              href="/epaper"
              className="w-full inline-flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-xl text-xs transition shadow"
            >
              <span>ई-पेपर संस्करण पढ़ें</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* 5. MULTIMEDIA SECTION: VIDEOS & LIVE TV */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
        <SectionHeader
          title="वीडियो व विशेष बुलेटिन"
          link="/video"
          linkText="सभी वीडियो देखें"
          badge="VIDEO"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.slice(0, 3).map((v) => {
            const regex =
              /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)/;
            const match = v.link ? v.link.match(regex) : null;
            const videoId = match ? match[1] : null;

            return (
              <div
                key={v._id}
                className="group bg-gray-50 dark:bg-gray-800/60 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
              >
                <div className="relative aspect-video w-full bg-black">
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Play size={32} />
                    </div>
                  )}
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-2">
                    {v.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Tv size={12} className="text-red-600" /> STAR VIDEO
                    </span>
                    <a
                      href={v.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:underline font-semibold"
                    >
                      YouTube पर देखें ↗
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. PHOTO GALLERY & WEB STORIES PREVIEW */}
      {gallery.length > 0 && (
        <section className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <SectionHeader
            title="फोटो गैलरी"
            link="/gallery"
            linkText="सभी एल्बम देखें"
            badge="GALLERY"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.slice(0, 4).map((item) => (
              <Link
                key={item._id}
                href="/gallery"
                className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow block"
              >
                <img
                  src={getMediaUrl(item.images?.[0])}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end text-white">
                  <span className="flex items-center gap-1 text-[10px] text-yellow-300 font-bold mb-1">
                    <ImageIcon size={12} /> {item.images?.length || 1} तस्वीरें
                  </span>
                  <h4 className="text-xs font-bold line-clamp-2 leading-tight">
                    {item.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}