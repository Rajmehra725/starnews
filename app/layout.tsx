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
      <body className="min-h-screen bg-gray-100 dark:bg-gray-900 transition">
        <MainLayout>
          {children}
        </MainLayout>
          {/* OneSignal SDK */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
        />

        {/* OneSignal Init */}
     <Script id="onesignal-init" strategy="afterInteractive">
  {`
    window.OneSignalDeferred = window.OneSignalDeferred || [];

    window.OneSignalDeferred.push(async function(OneSignal) {
      await OneSignal.init({
        appId: "a9b347a6-b6c4-425a-8321-c11b9c94aa80",
        notifyButton: { enable: true },
        allowLocalhostAsSecureOrigin: true
      });

      // ✅ Correct prompt method (v16)
      OneSignal.Slidedown.prompt();

      // Debug
      OneSignal.User.PushSubscription.addEventListener("change", (event) => {
        console.log("Subscribed:", event.current);
      });

      console.log("OneSignal Initialized");
    });
  `}
</Script>

        <BottomTicker />
        <WhatsAppFloat />
      </body>
    </html>
  );
}