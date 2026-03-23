"use client";

import Image from "next/image";
import Link from "next/link";

const Crime = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:flex lg:gap-6">

        {/* LEFT CONTENT */}
        <div className="lg:w-2/3">

          {/* Section Title */}
          <div className="border-l-4 border-gray-800 pl-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">अपराध</h2>
          </div>

          {/* Featured News */}
          <div className="relative group mb-6">
            <Image
              src="/assets/img/ezgif-5530dd1da8b37c_1759988348.webp"
              alt="news"
              width={800}
              height={400}
              className="w-full h-80 object-cover rounded-lg group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-5 text-white">
              <span className="text-sm mb-1">National News</span>
              <p className="text-xs mb-2">March 22, 2017</p>
              <Link
                href="/news-info"
                className="text-lg font-semibold hover:text-yellow-400"
              >
                यमुनोत्री जाते समय चलती कार में गिरा पहाड़: 3 लोग सवार, बिहार से आए दर्शन करने; रेस्क्यू ऑपरेशन जारी – Uttarkashi News
              </Link>
            </div>
          </div>

          {/* Other News List */}
          {[1,2,3].map((i)=>(
            <div key={i} className="flex mb-6 gap-4">
              <div className="w-1/3 relative group">
                <Image
                  src={`/assets/img/ezgif-25eec5267e400a_175997823${i}.webp`}
                  alt="news"
                  width={200}
                  height={150}
                  className="object-cover rounded-md group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1">News</span>
              </div>
              <div className="w-2/3">
                <p className="text-xs text-gray-500 mb-1">March 22, 2017</p>
                <Link href="/news-info" className="font-semibold text-gray-900 hover:text-red-600 text-sm md:text-base">
                  {/* Replace with respective title */}
                  {i===1 ? "जहरीला कफ सिरप बनाने वाली कंपनी का डायरेक्टर गिरफ्तार:– Madhya Pradesh" :
                   i===2 ? "हरियाणा IPS सुसाइड केस; 2 धड़ों में बंटे अफसर:– Chandigarh News" :
                   "नागपुर से मिला था छिंदवाड़ा को ‘मौत का अलर्ट:– Madhya Pradesh News"}
                </Link>
                <p className="text-sm text-gray-700 mt-1">
                  {/* Replace with respective description */}
                  {i===1 ? "मध्य प्रदेश में 23 बच्चों की मौत का कारण बने कोल्ड्रिफ कफ सिरप बनाने वाली कंपनी श्रीसन फार्मा का डायरेक्टर..." :
                   i===2 ? "हरियाणा के IPS अफसर IG वाई पूरन कुमार का सुसाइड केस अब तूल पकड़ता दिख रहा है..." :
                   "छिंदवाड़ा में कोल्ड्रिफ कफ सिरप से हुई बच्चों की मौतों को टाला जा सकता था..."}
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:w-1/3 mt-10 lg:mt-0 space-y-6">

          {/* Stay Connected */}
          <div className="p-4 border rounded-lg space-y-3">
            <h3 className="font-bold text-gray-800 mb-2">Stay Connected</h3>
            <ul className="flex gap-3">
              {[
                {icon:"fa-facebook", count:"50k"},
                {icon:"fa-instagram", count:"10k"},
                {icon:"fa-youtube", count:"25k"},
                {icon:"fa-twitter", count:"20k"}
              ].map((item,idx)=>(
                <li key={idx} className="relative">
                  <Link href="#" className="text-white w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-600">
                    <i className={`fa ${item.icon}`}></i>
                  </Link>
                  <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-xs">{item.count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weather Box */}
          <div className="relative rounded-lg overflow-hidden group">
            <Image
              src="/assets/img/rain-6243559_1280.jpg"
              alt="weather"
              width={400}
              height={250}
              className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3 text-white">
              <p className="text-sm">Panna, IN</p>
              <p className="text-xs">6:03 pm, Oct 7, 2025</p>
            </div>
          </div>

          {/* Recent News */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800">Recent News</h3>
            <div className="grid grid-cols-2 gap-3">
              {[283,284,285,282,286,287].map((num)=>(
                <div key={num} className="border rounded-md overflow-hidden">
                  <Link href="/news-info">
                    <Image
                      src={`/assets/img/news/news${num}.jpg`}
                      alt="news"
                      width={150}
                      height={100}
                      className="w-full h-24 object-cover hover:scale-105 transition duration-300"
                    />
                  </Link>
                  <div className="p-2">
                    <Link href="/news-info" className="text-xs font-semibold hover:text-red-600 block">
                      Rosie Hutin ghton Habits Career.
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Crime;