"use client";

import Link from "next/link";
import { formatTimeHindi, getMediaUrl, NewsItem } from "../../lib/api";
import { Eye, Clock, Share2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface NewsCardProps {
  news: NewsItem;
  hrefPrefix?: string;
  variant?: "card" | "horizontal" | "compact" | "lead";
  showCategory?: boolean;
}

export function NewsCard({
  news,
  hrefPrefix = "/news",
  variant = "card",
  showCategory = true,
}: NewsCardProps) {
  const href = `${hrefPrefix}/${news._id}`;
  const imageUrl = getMediaUrl(
    news.featuredImage || (news.images && news.images[0])
  );
  const time = formatTimeHindi(news.createdAt);
  const category = news.category || "ताज़ा खबर";

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${href}`;
      const text = `${news.title}\n\nपूरी खबर पढ़ें: ${fullUrl}`;
      window.open(
        `https://wa.me/?text=${encodeURIComponent(text)}`,
        "_blank"
      );
    }
  };

  // 1. LEAD VARIANT (HERO MAIN STORY)
  if (variant === "lead") {
    return (
      <article className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 flex flex-col h-full">
        <Link href={href} className="relative block overflow-hidden aspect-[16/10] w-full">
          <img
            src={imageUrl}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          {showCategory && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md tracking-wider uppercase shadow">
              {category}
            </span>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold leading-snug group-hover:text-yellow-300 transition-colors line-clamp-3">
              {news.title}
            </h2>
            {news.description && (
              <p className="hidden sm:line-clamp-2 text-xs sm:text-sm text-gray-200 mt-2 line-clamp-2 font-normal">
                {news.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs text-gray-300 mt-3 pt-2 border-t border-white/20">
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {time}
              </span>
              {typeof news.views === "number" && (
                <span className="flex items-center gap-1">
                  <Eye size={13} />
                  {news.views} देखा
                </span>
              )}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // 2. HORIZONTAL VARIANT (SATNA TIMES TOP HEADLINES LIST)
  if (variant === "horizontal") {
    return (
      <article className="group flex gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 hover:shadow-md transition">
        <Link
          href={href}
          className="relative w-28 sm:w-36 h-20 sm:h-24 shrink-0 rounded-lg overflow-hidden block"
        >
          <img
            src={imageUrl}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            loading="lazy"
          />
          {showCategory && (
            <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
              {category}
            </span>
          )}
        </Link>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <Link href={href}>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 leading-snug">
              {news.title}
            </h3>
          </Link>

          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {time}
            </span>
            <button
              onClick={handleShare}
              title="शेयर करें"
              className="p-1 hover:text-green-600 transition"
            >
              <FaWhatsapp size={13} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // 3. COMPACT VARIANT (SIDEBAR / SMALL WIDGET)
  if (variant === "compact") {
    return (
      <article className="group flex items-start gap-2.5 py-2 border-b border-gray-150 dark:border-gray-800 last:border-b-0">
        <Link
          href={href}
          className="w-16 h-14 shrink-0 rounded-md overflow-hidden block relative"
        >
          <img
            src={imageUrl}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
            loading="lazy"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={href}>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 group-hover:text-red-600 line-clamp-2 leading-tight">
              {news.title}
            </h4>
          </Link>
          <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
            <Clock size={10} /> {time}
          </span>
        </div>
      </article>
    );
  }

  // 4. STANDARD VERTICAL CARD
  return (
    <article className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-800 flex flex-col h-full">
      <Link href={href} className="relative block overflow-hidden aspect-[16/10] w-full">
        <img
          src={imageUrl}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {showCategory && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
            {category}
          </span>
        )}
      </Link>

      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={href}>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
              {news.title}
            </h3>
          </Link>
          {news.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2">
              {news.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-800">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {time}
          </span>

          <div className="flex items-center gap-3">
            {typeof news.views === "number" && (
              <span className="flex items-center gap-1">
                <Eye size={12} />
                {news.views}
              </span>
            )}
            <button
              onClick={handleShare}
              title="व्हाट्सएप पर शेयर करें"
              className="text-gray-500 hover:text-green-600 transition"
            >
              <FaWhatsapp size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;