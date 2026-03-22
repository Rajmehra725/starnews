"use client";

type Props = {
  title: string;
  image?: string;
  category?: string;
  time?: string;
  views?: number;
};

export function NewsCard({
  title,
  image = "https://source.unsplash.com/400x300/?news",
  category = "LIVE",
  time = "2 मिनट पहले",
  views = 100,
}: Props) {

  // 📲 WhatsApp Share
  const shareWhatsApp = () => {
    const url = window.location.href;
    const text = `${title} - पढ़ें पूरी खबर: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition">

      {/* IMAGE */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />

        {/* CATEGORY TAG */}
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          {category}
        </span>

        {/* OVERLAY TITLE */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white p-2 text-sm font-semibold">
          {title}
        </div>
      </div>

      {/* META */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-3 py-1">
        <span>{time}</span>
        <span>👁️ {views}</span>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-around text-sm border-t dark:border-gray-700 py-2">

        <button className="hover:text-blue-500">👍 Like</button>

        <button className="hover:text-green-500">💬 Comment</button>

        <button onClick={shareWhatsApp} className="hover:text-green-600">
          📲 Share
        </button>

      </div>
    </div>
  );
}