"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    OneSignal: any; // Or import OneSignal types if available
  }
}

export default function OneSignalInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize OneSignal array if not already
    window.OneSignal = window.OneSignal || [];

    window.OneSignal.push(() => {
      window.OneSignal.init({
        appId: "eeee5e2f-e240-4204-b29b-32b080e46210",

        // 🔔 Floating bell button
        notifyButton: {
          enable: true,
          position: "bottom-right",
          size: "medium",
          theme: "default",
        },

        // 🚀 Auto permission prompt
        promptOptions: {
          slidedown: {
            enabled: true,
            autoPrompt: true,
            text: {
              actionMessage: "🔔 Latest news paane ke liye notifications allow karein",
              acceptButton: "Allow",
              cancelButton: "No Thanks",
            },
          },
        },

        // 🌐 Welcome notification
        welcomeNotification: {
          title: "Star News",
          message: "Thanks for subscribing! 🔥 Latest updates aapko milte rahenge.",
        },

        // 🛡️ Better UX
        autoResubscribe: true,
        allowLocalhostAsSecureOrigin: true, // for dev
      });

      // ✅ Debug logs
      window.OneSignal.isPushNotificationsEnabled((isEnabled: boolean) => {
        console.log("📌 Push Enabled?", isEnabled);
      });

      window.OneSignal.getUserId((userId: string | null) => {
        console.log("🆔 Player ID:", userId);
      });
    });
  }, []);

  return null; // nothing to render
}