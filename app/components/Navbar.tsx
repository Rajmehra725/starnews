"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.jpeg";
import {
  Facebook,
  Instagram,
  Youtube,
  Menu
} from "lucide-react";

export default function Navbar({ setIsOpen }: any) {
  return (
    <header className="sticky top-0 z-50 w-full shadow">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-red-700 to-red-600 text-white">

        {/* LEFT */}
        <div className="flex items-center gap-2">
          <button className="md:hidden" onClick={() => setIsOpen(true)}>
            <Menu size={22} />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Star News"
              priority
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <span className="font-bold text-sm sm:text-base md:text-lg">
              STAR NEWS Networks
            </span>
          </Link>
        </div>

        {/* RIGHT PROFESSIONAL ICONS */}
        <div className="flex items-center gap-3">
          <a href="https://youtube.com/@starnewsnetworks88?si=HHAEJevcHq48Fdrh" className="hover:opacity-80 transition">
            <Youtube size={24} />
          </a>

          <a href="https://www.facebook.com/share/1CK1ZzzX1B/" className="hover:opacity-80 transition">
            <Facebook size={24} />
          </a>

          <a href="https://www.instagram.com/starnewsnetworks?igsh=NWw2cDhnbTllcWpv" className="hover:opacity-80 transition">
            <Instagram size={24} />
          </a>

        </div>
      </div>

    

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </header>
  );
}