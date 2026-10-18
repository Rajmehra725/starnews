"use client";

import SectionHeader from "../components/SectionHeader";
import { MoonStar, Sun, CloudSun, Calendar } from "lucide-react";

export default function PanchangPage() {
  const rashiList = [
    { name: "मेष (Aries)", symbol: "♈", desc: "आज कार्यक्षेत्र में सफलता मिलेगी। पारिवारिक सुख में वृद्धि होगी।" },
    { name: "वृषभ (Taurus)", symbol: "♉", desc: "आर्थिक स्थिति सुदृढ़ होगी। नए व्यापारिक संपर्क बनेंगे।" },
    { name: "मिथुन (Gemini)", symbol: "♊", desc: "मित्रों का सहयोग प्राप्त होगा। यात्रा के योग बन रहे हैं।" },
    { name: "कर्क (Cancer)", symbol: "♋", desc: "मन प्रसन्न रहेगा। स्वास्थ्य का विशेष ध्यान रखें।" },
    { name: "सिंह (Leo)", symbol: "♌", desc: "नेतृत्व क्षमता में निखार आएगा। मान-सम्मान में वृद्धि होगी।" },
    { name: "कन्या (Virgo)", symbol: "♍", desc: "कठिन परिश्रम का शुभ फल मिलेगा। वाणी पर संयम रखें।" },
    { name: "तुला (Libra)", symbol: "♎", desc: "पारिवारिक सामंजस्य बना रहेगा। अचानक धन लाभ संभव है।" },
    { name: "वृश्चिक (Scorpio)", symbol: "♏", desc: "साहस और पराक्रम में वृद्धि। विरोधियों पर विजय मिलेगी।" },
    { name: "धनु (Sagittarius)", symbol: "♐", desc: "ज्ञान व विवेक से निर्णय लें। संतान पक्ष से शुभ समाचार।" },
    { name: "मकर (Capricorn)", symbol: "♑", desc: "कार्यस्थल पर पदोन्नति के योग। निवेश सोच-समझकर करें।" },
    { name: "कुंभ (Aquarius)", symbol: "♒", desc: "नई योजनाएं सफल होंगी। सामाजिक दायरा बढ़ेगा।" },
    { name: "मीन (Pisces)", symbol: "♓", desc: "धार्मिक कार्यों में रुचि बढ़ेगी। मानसिक शांति का अनुभव होगा।" },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader title="दैनिक पंचांग, राशिफल व मौसम" badge="ASTRO" />

      {/* RASHI GRID */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 pb-3 mb-5 border-b border-gray-200 dark:border-gray-800">
          <MoonStar className="text-amber-500" size={20} />
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
            आज का 12 राशियों का राशिफल
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rashiList.map((r, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-gradient-to-br from-amber-50/70 to-orange-50/40 dark:from-gray-800 dark:to-gray-800/50 border border-amber-200/60 dark:border-gray-700 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                  {r.name}
                </span>
                <span className="text-2xl">{r.symbol}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PANCHANG & WEATHER WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* HINDI PANCHANG */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 flex flex-col">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-red-600">
            <Calendar size={18} className="text-red-600" />
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">
              शुभ मुहूर्त व पंचांग
            </h4>
          </div>
          <div className="h-[360px] w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
            <iframe
              src="https://www.igoogleportal.com/shindig/gadgets/ifr?url=http://hosting.gmodules.com/ig/gadgets/file/109787730588197067267/hindi_panchang.xml&lang=en&country=ALL"
              className="w-full h-full"
              frameBorder="0"
              scrolling="no"
              title="Hindi Panchang"
            />
          </div>
        </div>

        {/* HINDI ASTROLOGY */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 flex flex-col">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-amber-600">
            <Sun size={18} className="text-amber-600" />
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">
              दैनिक ज्योतिष गणना
            </h4>
          </div>
          <div className="h-[360px] w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
            <iframe
              src="https://piushtrivedi.neocities.org/hindi_astrology_google_gadget_part_1_updated_html2.html"
              className="w-full h-full"
              frameBorder="0"
              scrolling="no"
              title="Hindi Astrology"
            />
          </div>
        </div>

        {/* WEATHER FORECAST */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 flex flex-col">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-sky-600">
            <CloudSun size={18} className="text-sky-600" />
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">
              क्षेत्रीय मौसम पूर्वानुमान
            </h4>
          </div>
          <div className="h-[360px] w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
            <iframe
              src="https://api.wo-cloud.com/content/widget/?geoObjectKey=16143051&language=en&region=IN&timeFormat=HH:mm&windUnit=kmh&systemOfMeasurement=metric&temperatureUnit=celsius"
              className="w-full max-w-[290px] h-full"
              frameBorder="0"
              scrolling="no"
              title="Weather Forecast"
            />
          </div>
        </div>
      </div>
    </div>
  );
}