"use client";

import { useEffect, useState } from "react";
import { fetchGallery, GalleryItem, getMediaUrl, formatTimeHindi } from "../../lib/api";
import SectionHeader from "../components/SectionHeader";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryPage() {
  const [albums, setAlbums] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlbum, setActiveAlbum] = useState<GalleryItem | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchGallery();
      setAlbums(data);
      setLoading(false);
    }
    load();
  }, []);

  const openLightbox = (album: GalleryItem, index = 0) => {
    setActiveAlbum(album);
    setPhotoIndex(index);
  };

  const closeLightbox = () => {
    setActiveAlbum(null);
    setPhotoIndex(0);
  };

  const nextPhoto = () => {
    if (!activeAlbum || !activeAlbum.images) return;
    setPhotoIndex((prev) => (prev + 1) % activeAlbum.images.length);
  };

  const prevPhoto = () => {
    if (!activeAlbum || !activeAlbum.images) return;
    setPhotoIndex((prev) => (prev - 1 + activeAlbum.images.length) % activeAlbum.images.length);
  };

  return (
    <div className="space-y-8">
      <SectionHeader title="फोटो गैलरी व दृश्य समाचार" badge="GALLERY" />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-2xl"
            />
          ))}
        </div>
      ) : albums.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => {
            const coverImage = getMediaUrl(album.images?.[0]);
            return (
              <div
                key={album._id}
                onClick={() => openLightbox(album, 0)}
                className="group cursor-pointer bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <img
                    src={coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                    <ImageIcon size={13} className="text-yellow-400" />
                    <span>{album.images?.length || 1} तस्वीरें</span>
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-2">
                      {album.title}
                    </h3>
                  </div>
                </div>

                <div className="p-3.5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{formatTimeHindi(album.createdAt)}</span>
                  <span className="text-red-600 font-bold group-hover:underline">
                    गैलरी देखें →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center text-gray-500 border border-gray-200 dark:border-gray-800">
          फोटो एल्बम लोड हो रहे हैं...
        </div>
      )}

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {activeAlbum && activeAlbum.images && activeAlbum.images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 backdrop-blur-sm animate-fadeIn">
          {/* HEADER */}
          <div className="flex items-center justify-between text-white border-b border-gray-800 pb-3">
            <div>
              <h3 className="font-bold text-sm sm:text-base line-clamp-1">
                {activeAlbum.title}
              </h3>
              <span className="text-xs text-gray-400">
                तस्वीर {photoIndex + 1} / {activeAlbum.images.length}
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2 rounded-full hover:bg-gray-800 text-white transition"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* MAIN PHOTO DISPLAY */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={prevPhoto}
              className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 text-white hover:bg-red-600 transition"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>

            <img
              src={getMediaUrl(activeAlbum.images[photoIndex])}
              alt={`Photo ${photoIndex + 1}`}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl transition-all"
            />

            <button
              onClick={nextPhoto}
              className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 text-white hover:bg-red-600 transition"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* BOTTOM THUMBNAILS STRIP */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {activeAlbum.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setPhotoIndex(i)}
                className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                  photoIndex === i
                    ? "border-red-600 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={getMediaUrl(img)}
                  alt="Thumb"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
