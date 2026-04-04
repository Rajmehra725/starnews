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
        <MainLayout>{children}</MainLayout>

        {/* ✅ OneSignal SDK (BODY me hona chahiye) */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
        />

        {/* ✅ OneSignal Init (FIXED) */}
        <Script id="onesignal-init" strategy="afterInteractive">
          {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];

            window.OneSignalDeferred.push(async function(OneSignal) {
              try {
                await OneSignal.init({
                  appId: "5084b9c1-5107-4b55-a60c-72b44ca306b1",

                  notifyButton: {
                    enable: true,
                  },

                  allowLocalhostAsSecureOrigin: true,
                  autoResubscribe: true,
                });

                console.log("✅ OneSignal Initialized");

                // ✅ IMPORTANT: Prompt manually trigger
                OneSignal.Slidedown.prompt();

                // ✅ Debug subscription
                OneSignal.User.PushSubscription.addEventListener("change", function (event) {
                  console.log("🔔 Subscription:", event.current);
                });

                // ✅ User ID check
                OneSignal.User.PushSubscription.id.then(function(id) {
                  console.log("🆔 User ID:", id);
                });

              } catch (e) {
                console.error("❌ OneSignal Error:", e);
              }
            });
          `}
        </Script>

        <BottomTicker />
        <WhatsAppFloat />
      </body>
    </html>
  );
}