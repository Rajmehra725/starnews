"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const API = "https://starnewsbackend.onrender.com/api/advertisement";

/* ---------------------------
   HOOK: Detect Visibility
----------------------------*/
const useInView = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return { ref, isVisible };
};

/* ---------------------------
   MAIN COMPONENT
----------------------------*/
export default function AdvertisementSystem() {
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    const res = await axios.get(API);
    setAds(res.data);
  };

  return (
    <div className="w-full flex justify-center">

      <div className="w-full max-w-[700px]">

        {/* LABEL */}
        <div className="text-[10px] text-gray-500 mb-1 px-1">
          ADVERTISEMENT
        </div>

        {/* CAROUSEL */}
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={ads.length > 1}
        >

          {ads.map((ad) => (
            <SwiperSlide key={ad._id}>
              <AdCard ad={ad} />
            </SwiperSlide>
          ))}

        </Swiper>

      </div>
    </div>
  );
}

/* ---------------------------
   AD CARD (SMART VIDEO CONTROL)
----------------------------*/
function AdCard({ ad }: any) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className="relative rounded-lg overflow-hidden shadow-md bg-white"
    >

      {/* IMAGE OR VIDEO */}
      {ad.mediaType === "video" ? (
        <video
          src={ad.url}
          className="w-full h-[160px] md:h-[220px] object-cover"
          autoPlay={isVisible}
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={ad.url}
          className="w-full h-[160px] md:h-[220px] object-cover"
        />
      )}

      {/* CLICK OVERLAY */}
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
      />

      {/* LABEL */}
      <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-[2px] rounded">
        AD
      </div>

      {/* TITLE */}
      {ad.title && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1">
          {ad.title}
        </div>
      )}

    </div>
  );
}