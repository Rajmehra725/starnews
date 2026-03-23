"use client";

import { useState } from "react";

export default function PanchangPage() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 📅 Month days generate
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];

  // empty slots
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // actual dates
  for (let i = 1; i <= lastDate; i++) {
    days.push(i);
  }

  // 🪔 Dummy Panchang (later API se replace kar sakta hai)
  const panchang = {
    tithi: "Ekadashi",
    nakshatra: "Rohini",
    yoga: "Siddhi",
    karan: "Bava",
    sunrise: "06:15 AM",
    sunset: "06:25 PM",
  };

  const changeMonth = (dir: number) => {
    setCurrentDate(new Date(year, month + dir, 1));
  };

  return (
    <div className="p-4 space-y-6">

      {/* 🪔 Panchang */}
      <div className="bg-orange-50 p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold mb-2">🪔 Today Panchang</h2>

        <p>📅 Tithi: {panchang.tithi}</p>
        <p>🌟 Nakshatra: {panchang.nakshatra}</p>
        <p>🧘 Yoga: {panchang.yoga}</p>
        <p>🔥 Karan: {panchang.karan}</p>
        <p>🌅 Sunrise: {panchang.sunrise}</p>
        <p>🌇 Sunset: {panchang.sunset}</p>
      </div>

      {/* 📅 Calendar */}
      <div className="bg-white p-4 rounded-xl shadow">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => changeMonth(-1)}>⬅</button>
          <h2 className="font-bold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button onClick={() => changeMonth(1)}>➡</button>
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 text-center font-semibold mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {days.map((d, i) => {
            const isToday =
              d === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            return (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  isToday
                    ? "bg-red-500 text-white font-bold"
                    : "bg-gray-100"
                }`}
              >
                {d || ""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}