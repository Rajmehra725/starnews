import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl p-8 text-center shadow-lg border border-gray-200 dark:border-gray-800 space-y-5">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 text-3xl font-black">
          404
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
            पृष्ठ नहीं मिला (Page Not Found)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
            क्षमा करें, जिस पृष्ठ को आप खोज रहे हैं वह हटा दिया गया है, उसका नाम बदल दिया गया है या वह अस्थायी रूप से अनुपलब्ध है।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow"
          >
            <Home size={15} />
            <span>होमपेज पर जाएं</span>
          </Link>

          <Link
            href="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-800 dark:text-gray-200 font-bold px-6 py-2.5 rounded-xl text-xs transition"
          >
            <Search size={15} />
            <span>खबर खोजें</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
