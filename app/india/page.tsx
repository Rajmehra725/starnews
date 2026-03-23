"use client";

import Image from "next/image";
import Link from "next/link";

const Country = () => {
  return (
    <section className="py-8 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT NEWS */}
          <div className="lg:col-span-8">
            
            {/* Heading */}
            <div className="border-l-4 border-gray-800 pl-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                देश की ताज़ा खबरें
              </h2>
            </div>

            {/* Main Big News */}
            <div className="relative rounded-xl overflow-hidden group">
              <Image
                src="/assets/img/ezgif-5530dd1da8b37c_1759988348.webp"
                alt="news"
                width={900}
                height={500}
                className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
                <span className="bg-black text-white px-3 py-1 text-xs w-fit mb-2">
                  National News
                </span>

                <p className="text-sm text-gray-200 mb-2">
                  March 22, 2017
                </p>

                <Link
                  href="/news_info"
                  className="text-white text-xl font-semibold hover:text-yellow-400"
                >
                  यमुनोत्री जाते समय चलती कार में गिरा पहाड़: 3 लोग सवार, बिहार से आए दर्शन करने
                </Link>
              </div>
            </div>

            {/* Small News List */}
            <div className="mt-8 space-y-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex flex-col md:flex-row gap-4 border-b pb-6"
                >
                  <Image
                    src="/assets/img/live-update-centre-2025-10-09t081936484_1759978108.webp"
                    alt="news"
                    width={300}
                    height={200}
                    className="w-full md:w-60 h-40 object-cover rounded-lg"
                  />

                  <div>
                    <p className="text-sm text-gray-500 mb-2">
                      March 22, 2017
                    </p>

                    <Link
                      href="/news_info"
                      className="text-lg font-semibold text-gray-900 hover:text-red-600"
                    >
                      जहरीला कफ सिरप बनाने वाली कंपनी का डायरेक्टर गिरफ्तार
                    </Link>

                    <p className="text-gray-600 mt-2 text-sm">
                      मध्य प्रदेश में 23 बच्चों की मौत का कारण बने कोल्ड्रिफ
                      कफ सिरप बनाने वाली कंपनी श्रीसन फार्मा का डायरेक्टर...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Stay Connected */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-4">Stay Connected</h3>

              <div className="grid grid-cols-4 gap-3">
                <div className="bg-blue-600 text-white p-3 rounded text-center">
                  FB
                </div>
                <div className="bg-pink-600 text-white p-3 rounded text-center">
                  IG
                </div>
                <div className="bg-red-600 text-white p-3 rounded text-center">
                  YT
                </div>
                <div className="bg-sky-500 text-white p-3 rounded text-center">
                  TW
                </div>
              </div>
            </div>

            {/* Weather */}
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src="/assets/img/rain-6243559_1280.jpg"
                alt="weather"
                width={400}
                height={300}
                className="w-full h-60 object-cover"
              />

              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
                <p className="text-white text-sm">Panna, IN</p>
                <p className="text-white text-lg font-semibold">
                  28°C Cloudy
                </p>
              </div>
            </div>

            {/* Recent News */}
            <div>
              <h3 className="font-bold text-lg mb-4">
                Recent News
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="group">
                    <Image
                      src="/assets/img/news/news283.jpg"
                      alt="news"
                      width={200}
                      height={150}
                      className="w-full h-24 object-cover rounded"
                    />

                    <Link
                      href="/news_info"
                      className="text-sm font-medium mt-2 block group-hover:text-red-600"
                    >
                      Rosie Hutin ghton Habits Career
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Country;