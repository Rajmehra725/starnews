"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { subscribeNewsletter } from "../../lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("कृपया एक वैध ईमेल पता दर्ज करें");
      return;
    }

    setLoading(true);
    setStatus(null);
    const res = await subscribeNewsletter(email);
    setStatus(res.message);
    setLoading(false);
    if (res.success) {
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#12161c] text-gray-300 pt-10 border-t-4 border-red-700">
      <div className="max-w-7xl mx-auto px-4">
        {/* NEWSLETTER BANNER (SATNA TIMES STYLE ENGAGEMENT) */}
        <div className="bg-gradient-to-r from-red-800 to-red-950 rounded-2xl p-6 mb-12 shadow-xl border border-red-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
              ताज़ा खबरों के लिए न्यूज़लेटर सब्सक्राइब करें
            </h3>
            <p className="text-xs sm:text-sm text-red-200">
              हर दिन सुबह की मुख्य खबरें, ब्रेकिंग अपडेट और खास रिपोर्ट सीधे आपके ईमेल पर।
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="w-full md:w-auto flex flex-col sm:flex-row gap-2 max-w-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="अपना ईमेल पता दर्ज करें..."
              className="bg-white text-gray-900 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-64"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold px-5 py-2.5 rounded-lg text-sm transition shrink-0 disabled:opacity-50"
            >
              {loading ? "प्रतीक्षा करें..." : "सदस्यता लें"}
            </button>
          </form>
        </div>

        {status && (
          <div className="text-center text-xs text-yellow-300 -mt-8 mb-6 font-medium">
            {status}
          </div>
        )}

        {/* 4 COLUMNS FOOTER CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          {/* COL 1: ABOUT */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white p-0.5 shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="Star News Network"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-lg font-black text-white tracking-tight">
                  STAR NEWS <span className="text-red-500">NETWORK</span>
                </h4>
                <p className="text-[11px] text-gray-400">निष्पक्ष व निर्भीक समाचार</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              स्टार न्यूज़ नेटवर्क निडर, निष्पक्ष और समय पर सच्ची खबरें आप तक पहुँचाने के लिए समर्पित है। हमारा उद्देश्य आमजन की समस्याओं को प्रमुखता से समाज और शासन के सामने रखना है।
            </p>

            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500 shrink-0" />
                <span>सतना, पन्ना, मध्य प्रदेश - 485001</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-red-500 shrink-0" />
                <span>contact@starnewsnetworks.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-red-500 shrink-0" />
                <span>+91 98710 14353</span>
              </div>
            </div>
          </div>

          {/* COL 2: REGIONAL CATEGORIES */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
              प्रमुख श्रेणियां
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/satna" className="hover:text-red-400 transition">
                  सतना न्यूज़
                </Link>
              </li>
              <li>
                <Link href="/panna" className="hover:text-red-400 transition">
                  पन्ना न्यूज़
                </Link>
              </li>
              <li>
                <Link href="/chhatarpur" className="hover:text-red-400 transition">
                  छतरपुर न्यूज़
                </Link>
              </li>
              <li>
                <Link href="/india" className="hover:text-red-400 transition">
                  देश / राष्ट्रीय
                </Link>
              </li>
              <li>
                <Link href="/cricket" className="hover:text-red-400 transition">
                  खेल व क्रिकेट
                </Link>
              </li>
              <li>
                <Link href="/entertainment" className="hover:text-red-400 transition">
                  मनोरंजन व सिनेमा
                </Link>
              </li>
              <li>
                <Link href="/panchang" className="hover:text-red-400 transition">
                  पंचांग व राशिफल
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3: QUICK LINKS & MULTIMEDIA */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
              क्विक लिंक्स
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/video" className="hover:text-red-400 transition">
                  वीडियो व Live TV
                </Link>
              </li>
              <li>
                <Link href="/epaper" className="hover:text-red-400 transition">
                  ई-पेपर (E-Paper)
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-red-400 transition">
                  फोटो गैलरी
                </Link>
              </li>
              <li>
                <Link href="/submit-news" className="hover:text-red-400 transition">
                  खबर भेजें (Submit News)
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-red-400 transition">
                  हमारे बारे में (About Us)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-400 transition">
                  संपर्क करें (Contact Us)
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4: LEGAL & SOCIAL */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
              नीतियां व सोशल मीडिया
            </h4>
            <ul className="space-y-2 text-xs mb-5">
              <li>
                <Link href="/privacy-policy" className="hover:text-red-400 transition">
                  गोपनीयता नीति (Privacy Policy)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-red-400 transition">
                  नियम और शर्तें (Terms & Conditions)
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-red-400 transition">
                  अस्वीकरण (Disclaimer)
                </Link>
              </li>
            </ul>

            <h5 className="text-xs font-bold text-gray-200 uppercase mb-2.5">
              सोशल मीडिया पर जुड़ें
            </h5>
            <div className="flex items-center gap-2 text-sm">
              <a
                href="https://youtube.com/@starnewsnetworks88?si=HHAEJevcHq48Fdrh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.facebook.com/share/1Dj3yMqD7R/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/reel/DSEzE6VjA1u/?igsh=enR1OGZ0ZmN4enhz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/919871014353"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="py-5 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 स्टार न्यूज़ नेटवर्क (Star News Network). सर्वाधिकार सुरक्षित।</p>
          <p className="text-[11px] text-gray-600">
            डिजाइन व तकनीक: स्टार डिजिटल मीडिया | सत्यमेव जयते
          </p>
        </div>
      </div>
    </footer>
  );
}
