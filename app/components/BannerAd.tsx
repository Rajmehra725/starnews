"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { Heart, Share2, Eye } from "lucide-react";

const API = "https://starnewsbackend.onrender.com/api/banners";
const BASE = "https://starnewsbackend.onrender.com";

export default function BannerAd() {
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const res = await axios.get(API);
    setBanners(res.data);
  };

  return (
    <div className="w-full flex justify-center">

      {/* ✅ MOBILE FIXED / DESKTOP FULL */}
      <div className="
        w-full
        max-w-[300px]   /* mobile same */
        sm:max-w-[300px]
        md:max-w-[500px]  /* tablet thoda bada */
        lg:max-w-full     /* desktop full width */
      ">

        <div className="text-[10px] text-gray-500 mb-1 px-1">
          ADVERTISEMENT
        </div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={banners.length > 1}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner._id}>
              <div className="relative w-full overflow-hidden rounded-md">

                {/* ✅ IMAGE RESPONSIVE */}
                <img
                  src={
                    banner.image?.startsWith("http")
                      ? banner.image
                      : `${BASE}${banner.image}`
                  }
                  className="
                    w-full 
                    h-[100px]       /* mobile */
                    md:h-[140px]    /* tablet */
                    lg:h-[200px]    /* desktop */
                    object-cover
                  "
                />

                {/* Overlay */}
                <div className="
                  absolute bottom-0 right-0 
                  bg-black/70 text-white 
                  text-[8px]
                  px-2 py-[2px] 
                  flex gap-2 
                  rounded-tl-md
                ">
                  <span className="flex items-center gap-1">
                    <Heart size={10} /> {banner.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 size={10} /> {banner.shares}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={10} /> {banner.views}
                  </span>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}