"use client";

import { useEffect, useState } from "react";
import { fetchEpaper, EpaperItem, getMediaUrl, formatTimeHindi } from "../../lib/api";
import SectionHeader from "../components/SectionHeader";
import { Newspaper, ChevronLeft, ChevronRight, Download, Calendar } from "lucide-react";

export default function EpaperPage() {
  const [editions, setEditions] = useState<EpaperItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeEdition, setActiveEdition] = useState<EpaperItem | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchEpaper();
      setEditions(data);
      if (data.length > 0) {
        setActiveEdition(data[0]);
      }
      setLoading(false);
    }
    load();
  }, []);

  const totalPages = activeEdition?.pages?.length || 0;

  return (
    <div className="space-y-8">
      <SectionHeader title="डिजिटल ई-पेपर संस्करण" badge="E-PAPER" />

      {loading ? (
        <div className="h-[70vh] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
      ) : activeEdition && totalPages > 0 ? (
        <div className="space-y-6">
          {/* CONTROL BAR */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Newspaper className="text-red-600" size={24} />
              <div>
                <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                  {activeEdition.title || "स्टार न्यूज़ दैनिक समाचार पत्र"}
                </h3>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={12} />
                  {activeEdition.date || formatTimeHindi(activeEdition.createdAt)}
                </span>
              </div>
            </div>

            {/* PAGE NAVIGATION */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-red-600 hover:text-white transition disabled:opacity-40"
                aria-label="Previous Page"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                पृष्ठ {currentPage + 1} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage >= totalPages - 1}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-red-600 hover:text-white transition disabled:opacity-40"
                aria-label="Next Page"
              >
                <ChevronRight size={18} />
              </button>

              {activeEdition.pages[currentPage] && (
                <a
                  href={getMediaUrl(activeEdition.pages[currentPage])}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 rounded-xl text-xs transition shadow ml-2"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">पृष्ठ डाउनलोड करें</span>
                </a>
              )}
            </div>
          </div>

          {/* MAIN PAGE VIEWER */}
          <div className="bg-gray-950 rounded-2xl p-4 sm:p-8 flex items-center justify-center min-h-[70vh] shadow-2xl border border-gray-800">
            <img
              src={getMediaUrl(activeEdition.pages[currentPage])}
              alt={`Epaper Page ${currentPage + 1}`}
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* THUMBNAIL PAGES SELECTOR */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              सभी पृष्ठ
            </h4>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {activeEdition.pages.map((pg, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`w-20 sm:w-24 shrink-0 rounded-xl overflow-hidden border-2 transition ${
                    currentPage === idx
                      ? "border-red-600 ring-2 ring-red-600/30 scale-105"
                      : "border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800">
                    <img
                      src={getMediaUrl(pg)}
                      alt={`Page ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="py-1 text-[11px] font-bold text-center bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    पृष्ठ {idx + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-16 text-center text-gray-500 border border-gray-200 dark:border-gray-800 space-y-3">
          <Newspaper className="mx-auto text-red-600" size={48} />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            ई-पेपर संस्करण तैयार हो रहा है
          </h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            आज का डिजिटल अखबार शीघ्र ही उपलब्ध होगा। कृपया कुछ समय पश्चात पुनः देखें।
          </p>
        </div>
      )}

      {/* ARCHIVE EDITIONS */}
      {editions.length > 1 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
          <h4 className="text-sm font-extrabold text-gray-900 dark:text-white border-l-4 border-red-600 pl-2 mb-4">
            पुराने संस्करण (Archive)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {editions.map((ed) => (
              <button
                key={ed._id}
                onClick={() => {
                  setActiveEdition(ed);
                  setCurrentPage(0);
                }}
                className={`p-3 rounded-xl border text-left transition ${
                  activeEdition?._id === ed._id
                    ? "border-red-600 bg-red-50 dark:bg-red-950/40"
                    : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <div className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-1">
                  {ed.title || "ई-पेपर संस्करण"}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  {ed.date || formatTimeHindi(ed.createdAt)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
