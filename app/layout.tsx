import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import MainLayout from "./MainLayout";
import BottomTicker from "./components/BottomTicker";
import WhatsAppFloat from "./components/WhatsAppFloat";
import OneSignalInit from "./components/OneSignalInit";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star News - Latest Hindi News",
  description:
    "Breaking news, India news, world news, sports, entertainment, live cricket and panchang updates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* ✅ Latest OneSignal SDK */}
      

      <body className="min-h-screen bg-gray-100 dark:bg-gray-900 transition">
         {/* ✅ OneSignal Client Init */}
        <OneSignalInit />
        <MainLayout>
          {children}
        </MainLayout>

        {/* 🔴 Bottom Ads Ticker */}
        <BottomTicker />

        {/* 💬 WhatsApp Floating */}
        <WhatsAppFloat />
      </body>
    </html>
  );
}