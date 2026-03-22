"use client";

import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  // 🔥 Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  // 🌙 Toggle Function
  const toggleDark = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  return (
    <button
      onClick={toggleDark}
      className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded shadow hover:scale-105 transition"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}