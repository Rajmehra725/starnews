"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import StarImage from "../../public/starnews.jpg";

const AD_DATE = "2026-08-15";
const STORAGE_KEY = `independence-ad-closed-${AD_DATE}`;u

export default function IndependenceAd() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);

    // User ne aaj close kiya hai
    localStorage.setItem(STORAGE_KEY, "true");
  }, []);

  useEffect(() => {
    // India timezone ke according aaj ki date
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    // Sirf 15 August 2026 ko show hoga
    if (today !== AD_DATE) {
      return;
    }

    // Agar user already close kar chuka hai
    const isClosed = localStorage.getItem(STORAGE_KEY);

    if (isClosed === "true") {
      return;
    }

    // 700ms ke baad popup show hoga
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // ESC press karne par close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Independence Day Special Greeting"
    >
      {/* Main Popup */}
      <div className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:rounded-2xl">

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close advertisement"
          className="
            absolute right-2 top-2 z-30
            flex h-9 w-9 items-center justify-center
            rounded-full bg-black/75 text-white
            shadow-lg backdrop-blur-md
            transition-all duration-200
            hover:scale-110 hover:bg-red-600
            active:scale-95
            sm:right-3 sm:top-3 sm:h-11 sm:w-11
          "
        >
          <X size={22} strokeWidth={3} />
        </button>

        {/* Special Greeting */}
        <div className="absolute left-2 top-2 z-20 rounded-md bg-red-600/90 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white shadow sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
          Special Greeting 🇮🇳
        </div>

        {/* Image Container */}
        <div className="flex flex-1 items-center justify-center overflow-auto bg-black">
          <Image
            src={StarImage}
            alt="Star News Networks Independence Day Greetings"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
            className="
              h-auto
              max-h-[75vh]
              w-auto
              max-w-full
              object-contain
            "
          />
        </div>

        {/* Bottom Greeting Bar */}
        <div className="flex shrink-0 flex-col gap-2 bg-gradient-to-r from-red-700 via-red-600 to-orange-500 px-3 py-2.5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3">
          <div>
            <p className="text-xs font-bold sm:text-base">
              🇮🇳 स्वतंत्रता दिवस की हार्दिक शुभकामनाएं
            </p>

            <p className="mt-0.5 text-[9px] text-white/85 sm:text-xs">
              Star News Networks की ओर से आप सभी को स्वतंत्रता दिवस की शुभकामनाएं।
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="
              w-full shrink-0 rounded-lg
              bg-white px-4 py-2
              text-xs font-bold text-red-700
              shadow-md transition-all
              hover:scale-[1.02] hover:bg-gray-100
              active:scale-95
              sm:w-auto sm:text-sm
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}