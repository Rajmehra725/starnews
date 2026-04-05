"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    OneSignalDeferred: any[];
  }
}

export default function OneSignalInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.OneSignalDeferred = window.OneSignalDeferred || [];

    window.OneSignalDeferred.push(async function (OneSignal: any) {
      await OneSignal.init({
        appId: "5084b9c1-5107-4b55-a60c-72b44ca306b1", // 👈 apna App ID daalo
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });

      console.log("✅ OneSignal Initialized");
    });
  }, []);

  return null;
}