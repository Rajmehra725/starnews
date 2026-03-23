"use client";
import { useEffect, useState } from "react";

const API_KEY = "ebdf48db152446c0b77151538262303";

type WeatherData = {
  location: { name: string };
  current: { temp_c: number; condition: { text: string; icon: string } };
};

export default function MiniWeatherHorizontal() {
  const [pannaWeather, setPannaWeather] = useState<WeatherData | null>(null);
  const [satnaWeather, setSatnaWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async (city: string, setter: any) => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
        );
        const data = await res.json();
        setter(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather("Panna", setPannaWeather);
    fetchWeather("Satna", setSatnaWeather);
  }, []);

  const renderMiniCard = (data: WeatherData | null) => {
    if (!data)
      return (
        <div className="p-2 text-center bg-white shadow rounded w-24 text-xs">
          Loading...
        </div>
      );

    return (
      <div className="bg-white shadow rounded p-2 flex flex-col items-center gap-1 w-24 text-xs hover:scale-105 transition-transform">
        <h3 className="font-semibold text-sm text-center">{data.location.name}</h3>
        <img
          src={`https:${data.current.condition.icon}`}
          alt={data.current.condition.text}
          className="w-10 h-10"
        />
        <p className="font-bold text-sm">{data.current.temp_c.toFixed(0)}°C</p>
        <p className="text-gray-600 text-[10px] capitalize text-center">
          {data.current.condition.text}
        </p>
      </div>
    );
  };

  return (
    <div className="flex gap-2 overflow-x-auto p-2">
      {renderMiniCard(pannaWeather)}
      {renderMiniCard(satnaWeather)}
    </div>
  );
}