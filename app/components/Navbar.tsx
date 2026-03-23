"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.jpeg";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export default function Navbar({ setIsOpen }: any) {
  return (
    <header className="sticky top-0 z-50 w-full overflow-x-hidden shadow">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-2 py-2 md:px-4 bg-gradient-to-r from-red-700 to-red-600 text-white">

        {/* LEFT: MENU + LOGO */}
        <div className="flex items-center gap-2">
          <button className="md:hidden text-xl" onClick={() => setIsOpen(true)}>☰</button>
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="Star News" width={100} height={100} className="rounded" />
            <span className="hidden md:block font-bold text-lg">STAR NEWS</span>
          </Link>
        </div>

        {/* RIGHT ICONS (Desktop only) */}
        <div className="hidden md:flex items-center gap-2">
          <a href="#" className="p-1"><Facebook size={16} /></a>
          <a href="#" className="p-1"><Instagram size={16} /></a>
          <a href="#" className="p-1"><Twitter size={16} /></a>
          <a href="#" className="p-1"><Youtube size={16} /></a>
        </div>
      </div>

      {/* MOBILE ICONS BELOW */}
      <div className="flex justify-center gap-4 bg-red-700 text-white py-1 md:hidden">
        <a href="#"><Facebook size={16} /></a>
        <a href="#"><Instagram size={16} /></a>
        <a href="#"><Twitter size={16} /></a>
        <a href="#"><Youtube size={16} /></a>
      </div>

      {/* BREAKING NEWS TICKER */}
      <div className="bg-yellow-400 text-black text-xs w-full overflow-hidden">
        <div className="inline-block whitespace-nowrap animate-marquee px-2 py-1">
          🔥 Breaking: India wins match | Heavy rain alert | New policy announced
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