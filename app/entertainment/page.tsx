"use client";

import Image from "next/image";
import Link from "next/link";

const Business = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="border-l-4 border-blue-600 pl-3 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            व्यापार की ताज़ा खबरें
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT GRID NEWS */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

              {[1,2,3,4,5,6].map((item)=>(
                <div key={item} className="group">

                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={`/assets/img/news/news3${item}.jpg`}
                      alt="news"
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                    />

                    <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1">
                      News
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    January 17, 2017
                  </p>

                  <Link
                    href="/news_info"
                    className="text-sm font-semibold text-gray-900 hover:text-red-600"
                  >
                    अवैध पशु परिवहन पर पन्ना पुलिस की बड़ी कार्रवाई , एक आरोपी गिरफ्तार
                  </Link>

                </div>
              ))}

            </div>
          </div>

          {/* RIGHT FEATURED */}
          <div className="lg:col-span-4">
            <div className="relative rounded-xl overflow-hidden group">

              <Image
                src="/assets/img/news/news31.jpg"
                alt="news"
                width={400}
                height={500}
                className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-5">
                <span className="bg-black text-white text-xs px-3 py-1 w-fit mb-2">
                  News
                </span>

                <p className="text-white text-sm mb-2">
                  06 Oct 2025
                </p>

                <Link
                  href="/news_info"
                  className="text-white font-semibold text-lg hover:text-yellow-400"
                >
                  रैपुरा में कैट के राष्ट्रीय अध्यक्ष का आगमन आज, जिलाध्यक्ष
                  केसरवानी ने लोगो से समय पर पहुंचने की अपील
                </Link>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Business;