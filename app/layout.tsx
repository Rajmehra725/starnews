import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import MainLayout from "./MainLayout";
import BottomTicker from "./components/BottomTicker";
import WhatsAppFloat from "./components/WhatsAppFloat";

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

       <Script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          strategy="afterInteractive"
        />
        <Script id="onesignal-init" strategy="afterInteractive">
          {`
            window.OneSignal = window.OneSignal || [];
            OneSignal.push(function() {
              OneSignal.init({
                appId: "a9b347a6-b6c4-425a-8321-c11b9c94aa80",
                notifyButton: {
                  enable: true,
                },
              });
            });
          `}
        </Script>
      <body className="min-h-screen bg-gray-100 dark:bg-gray-900 transition">

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