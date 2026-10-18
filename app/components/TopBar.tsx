"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSun,
  FaNewspaper,
} from "react-icons/fa";
import { getHindiDateString } from "../../lib/api";

export default function TopBar() {
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setDateStr(getHindiDateString());
  }, []);

  return (
    <div className="bg-[#1e2329] text-gray-200 text-xs border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* LEFT: Date & Location/Weather */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-gray-300">
            <FaCalendarAlt className="text-red-500" />
            <span>{dateStr || "आज की ताज़ा खबरें"}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-gray-400">
            <FaMapMarkerAlt className="text-red-400" />
            <span>सतना / पन्ना / म.प्र.</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-amber-400">
            <FaSun />
            <span>28°C धूप</span>
          </div>
        </div>

        {/* RIGHT: Join Us / Epaper / Social */}
        <div className="flex items-center gap-3">
          <Link
            href="/epaper"
            className="flex items-center gap-1 bg-red-700 hover:bg-red-800 text-white px-2 py-0.5 rounded text-[11px] font-semibold transition"
          >
            <FaNewspaper />
            <span>ई-पेपर</span>
          </Link>

          <Link
            href="/submit-news"
            className="text-gray-300 hover:text-white transition font-medium hover:underline text-[11px]"
          >
            हमसे जुड़े...
          </Link>

          <span className="text-gray-600">|</span>

          {/* SOCIAL CHANNELS */}
          <div className="flex items-center gap-2 text-sm">
            <a
              href="https://youtube.com/@starnewsnetworks88?si=HHAEJevcHq48Fdrh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-red-500 transition"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.facebook.com/share/1Dj3yMqD7R/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/reel/DSEzE6VjA1u/?igsh=enR1OGZ0ZmN4enhz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/919871014353"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-green-500 transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-sky-400 transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
