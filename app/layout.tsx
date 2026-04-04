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
      {/* ✅ Latest OneSignal SDK */}
      <Script
        src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
        strategy="afterInteractive"
      />

      {/* ✅ Professional Init */}
      <Script id="onesignal-init" strategy="afterInteractive">
        {`
          window.OneSignalDeferred = window.OneSignalDeferred || [];

          OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.init({
              appId: "f3843a47-6b7a-4564-83de-c91cc1cb7f64",

              // 🔥 VERY IMPORTANT (Fix for Next.js)
              serviceWorkerPath: "/OneSignalSDKWorker.js",
              serviceWorkerUpdaterPath: "/OneSignalSDKUpdaterWorker.js",

              // 🔔 Bell Button
              notifyButton: {
                enable: true,
                position: "bottom-right",
                size: "medium",
                theme: "default",
              },

              // 🚀 Auto Prompt
              promptOptions: {
                slidedown: {
                  enabled: true,
                  autoPrompt: true,
                  text: {
                    actionMessage: "🔔 Latest news paane ke liye notifications allow karein",
                    acceptButton: "Allow",
                    cancelButton: "No Thanks"
                  }
                }
              },

              // 🌐 Welcome Notification
              welcomeNotification: {
                title: "Star News",
                message: "Thanks for subscribing! 🔥 Latest updates aapko milte rahenge.",
              },

              autoResubscribe: true,
            });
          });
        `}
      </Script>

      <body className="min-h-screen bg-gray-100 dark:bg-gray-900 transition">
        <MainLayout>
          {children}
        </MainLayout>

        <BottomTicker />
        <WhatsAppFloat />
      </body>
    </html>
  );
}