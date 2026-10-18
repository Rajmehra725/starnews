"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  NewsItem,
  CommentType,
  getMediaUrl,
  formatTimeHindi,
  toggleLike,
  recordView,
  recordShare,
  API_BASE_URL,
} from "../../lib/api";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import {
  Eye,
  Heart,
  Share2,
  Clock,
  User,
  ChevronRight,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaTelegramPlane,
} from "react-icons/fa";

interface ArticleDetailViewProps {
  initialNews?: NewsItem | null;
  newsId: string;
  categoryType?: "news" | "satna" | "chhatarpur";
  categoryLabel?: string;
  categoryLink?: string;
}

export default function ArticleDetailView({
  initialNews,
  newsId,
  categoryType = "news",
  categoryLabel = "ताज़ा समाचार",
  categoryLink = "/news",
}: ArticleDetailViewProps) {
  const [news, setNews] = useState<NewsItem | null>(initialNews || null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [loading, setLoading] = useState(!initialNews);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const viewSentRef = useRef(false);

  // Visitor ID
  const [visitorId, setVisitorId] = useState("");

  useEffect(() => {
    let vid = "";
    if (typeof window !== "undefined") {
      vid = localStorage.getItem("visitorId") || "";
      if (!vid) {
        vid = "user_" + Math.random().toString(36).substring(2, 9);
        localStorage.setItem("visitorId", vid);
      }
      setVisitorId(vid);
    }
  }, []);

  // Fetch News if not passed or to ensure freshness
  useEffect(() => {
    async function loadArticle() {
      try {
        const endpoint =
          categoryType === "satna"
            ? `${API_BASE_URL}/api/satna`
            : categoryType === "chhatarpur"
            ? `${API_BASE_URL}/api/chhatarpur`
            : `${API_BASE_URL}/api/news`;

        // Try single by id endpoint
        try {
          const singleRes = await axios.get(`${endpoint}/${newsId}`, { timeout: 8000 });
          if (singleRes.data && singleRes.data._id) {
            setNews(singleRes.data);
            setLikesCount(singleRes.data.likes || 0);
            return;
          }
        } catch {
          // fallback to list search
        }

        const res = await axios.get(endpoint, { timeout: 12000 });
        const list: NewsItem[] = Array.isArray(res.data) ? res.data : [];
        const found = list.find((n) => n._id === newsId);
        if (found) {
          setNews(found);
          setLikesCount(found.likes || 0);
        }
        // Related
        setRelatedNews(list.filter((n) => n._id !== newsId).slice(0, 4));
      } catch (err) {
        console.error("Failed to load article:", err);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [newsId, categoryType]);

  // Record unique view once
  useEffect(() => {
    if (visitorId && newsId && !viewSentRef.current) {
      viewSentRef.current = true;
      recordView(newsId, visitorId, categoryType);
    }
  }, [visitorId, newsId, categoryType]);

  // Comments & Socket listener
  useEffect(() => {
    let socket: Socket | null = null;
    try {
      socket = io(API_BASE_URL);

      socket.emit("joinNews", newsId);

      socket.on("likeUpdated", (data) => {
        if (data.newsId === newsId) {
          setLikesCount(data.likes);
        }
      });

      socket.on("commentAdded", (newComment) => {
        setComments((prev) => [newComment, ...prev]);
      });
    } catch (err) {
      console.warn("Socket connect error:", err);
    }

    // Load initial comments
    async function loadComments() {
      try {
        const url =
          categoryType === "satna" || categoryType === "chhatarpur"
            ? `${API_BASE_URL}/api/interactions/comment/${newsId}`
            : `${API_BASE_URL}/api/news/${newsId}/comments`;

        const res = await axios.get(url, { timeout: 8000 });
        if (Array.isArray(res.data)) {
          setComments(res.data);
        } else if (res.data?.comments) {
          setComments(res.data.comments);
        }
      } catch {
        // quiet fallback
      }
    }

    loadComments();

    return () => {
      if (socket) socket.disconnect();
    };
  }, [newsId, categoryType]);

  // Handle Like
  const handleLike = async () => {
    if (!visitorId) return;
    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount((prev) => (newLiked ? prev + 1 : Math.max(0, prev - 1)));
    await toggleLike(newsId, visitorId, categoryType);
  };

  // Handle Share Click
  const handleShare = (platform: "whatsapp" | "facebook" | "twitter" | "telegram" | "copy") => {
    if (typeof window === "undefined") return;
    recordShare(newsId, visitorId, categoryType);

    const url = window.location.href;
    const text = news ? `${news.title}\n\nपूरी खबर पढ़ें: ${url}` : url;

    if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    } else if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          news?.title || ""
        )}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else if (platform === "telegram") {
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
          news?.title || ""
        )}`,
        "_blank"
      );
    } else if (platform === "copy") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Handle Add Comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const url =
        categoryType === "satna" || categoryType === "chhatarpur"
          ? `${API_BASE_URL}/api/interactions/comment/${newsId}`
          : `${API_BASE_URL}/api/news/${newsId}/comment`;

      const payload = {
        text: commentText.trim(),
        visitorId: visitorId || "anonymous",
        name: commentName.trim() || "पाठक",
      };

      const res = await axios.post(url, payload);
      if (Array.isArray(res.data)) {
        setComments(res.data);
      } else {
        setComments((prev) => [
          {
            _id: Math.random().toString(),
            text: commentText.trim(),
            name: commentName.trim() || "पाठक",
            visitorId,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
      setCommentText("");
    } catch (err) {
      console.error("Comment submit error:", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
        <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          खबर उपलब्ध नहीं है
        </h2>
        <p className="text-gray-500">
          संबंधित समाचार हटा दिया गया है या इसका लिंक बदल गया है।
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-red-700 transition"
        >
          होमपेज पर जाएं
        </Link>
      </div>
    );
  }

  const mainImage = getMediaUrl(
    news.featuredImage || (news.images && news.images[0])
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* 1. BREADCRUMB NAVIGATION */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4 flex-wrap">
        <Link href="/" className="hover:text-red-600">
          होम
        </Link>
        <ChevronRight size={12} />
        <Link href={categoryLink} className="hover:text-red-600">
          {news.category || categoryLabel}
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-xs sm:max-w-md">
          {news.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT ARTICLE BODY (8 COLS) */}
        <article className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-7 shadow-sm border border-gray-200 dark:border-gray-800">
          {/* CATEGORY BADGE */}
          <span className="inline-block bg-red-600 text-white text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider mb-3">
            {news.category || categoryLabel}
          </span>

          {/* HEADLINE */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-950 dark:text-white leading-tight tracking-tight mb-4">
            {news.title}
          </h1>

          {/* META BAR: AUTHOR, TIME, VIEWS */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400 py-3 border-y border-gray-150 dark:border-gray-800 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 font-bold text-gray-800 dark:text-gray-200">
                <User size={14} className="text-red-600" />
                स्टार न्यूज़ ब्यूरो
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {formatTimeHindi(news.createdAt)}
              </span>
              {typeof news.views === "number" && (
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  {news.views} व्यूज
                </span>
              )}
            </div>

            {/* LIKE BUTTON */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition border ${
                liked
                  ? "bg-red-50 text-red-600 border-red-300 dark:bg-red-950/40"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-700"
              }`}
            >
              <Heart
                size={14}
                className={liked ? "fill-red-600 text-red-600" : ""}
              />
              <span>{likesCount} पसंद</span>
            </button>
          </div>

          {/* SOCIAL SHARING STRIP (SATNA TIMES STYLE) */}
          <div className="flex items-center gap-2 mb-6 flex-wrap bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl border border-gray-150 dark:border-gray-800">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 mr-2 flex items-center gap-1">
              <Share2 size={14} className="text-red-600" /> शेयर करें:
            </span>

            <button
              onClick={() => handleShare("whatsapp")}
              className="flex items-center gap-1 bg-[#25D366] hover:bg-[#20ba59] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition"
            >
              <FaWhatsapp size={14} /> WhatsApp
            </button>

            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center gap-1 bg-[#1877F2] hover:bg-[#166fe5] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition"
            >
              <FaFacebookF size={13} /> Facebook
            </button>

            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center gap-1 bg-gray-900 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition"
            >
              <FaTwitter size={13} /> X
            </button>

            <button
              onClick={() => handleShare("telegram")}
              className="flex items-center gap-1 bg-[#0088cc] hover:bg-[#0077b5] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition"
            >
              <FaTelegramPlane size={13} /> Telegram
            </button>

            <button
              onClick={() => handleShare("copy")}
              className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 text-gray-800 dark:text-gray-100 px-3 py-1.5 rounded-lg text-xs font-bold transition ml-auto"
            >
              {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
              <span>{copied ? "कॉपी हो गया!" : "लिंक कॉपी"}</span>
            </button>
          </div>

          {/* FEATURED IMAGE */}
          {mainImage && (
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 shadow-sm border border-gray-150 dark:border-gray-800">
              <img
                src={mainImage}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* SHORT DESCRIPTION EXCERPT */}
          {news.description && (
            <div className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 leading-relaxed mb-6 pb-6 border-b border-gray-150 dark:border-gray-800 italic">
              {news.description}
            </div>
          )}

          {/* ARTICLE CONTENT / SECTIONS */}
          <div className="article-body space-y-6 text-gray-800 dark:text-gray-200 text-base leading-relaxed">
            {news.content && (
              <div
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            )}

            {/* RICH SECTIONS FROM ADMIN */}
            {news.sections &&
              news.sections.length > 0 &&
              news.sections.map((sec, idx) => (
                <div
                  key={sec._id || idx}
                  className="p-4 sm:p-5 rounded-xl border border-gray-150 dark:border-gray-800 space-y-3"
                  style={{
                    backgroundColor: sec.contentBgColor || undefined,
                    color: sec.contentTextColor || undefined,
                  }}
                >
                  {sec.heading && (
                    <h3
                      className="text-lg sm:text-xl font-bold p-2 rounded-lg"
                      style={{
                        backgroundColor: sec.headingBgColor || undefined,
                        color: sec.headingTextColor || undefined,
                      }}
                    >
                      {sec.heading}
                    </h3>
                  )}

                  {sec.image && (
                    <div className="rounded-xl overflow-hidden my-3 max-h-96">
                      <img
                        src={getMediaUrl(sec.image)}
                        alt={sec.heading || "Section image"}
                        className="w-full object-cover"
                      />
                    </div>
                  )}

                  <div
                    className="whitespace-pre-line text-sm sm:text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: sec.content }}
                  />
                </div>
              ))}
          </div>

          {/* BOTTOM LIKE & SHARE BAR */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition shadow ${
                liked
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <Heart
                size={18}
                className={liked ? "fill-white text-white" : ""}
              />
              <span>{liked ? "पसंद किया गया" : "खबर पसंद आई?"} ({likesCount})</span>
            </button>

            <button
              onClick={() => handleShare("whatsapp")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow"
            >
              <FaWhatsapp size={18} />
              <span>मित्रों के साथ शेयर करें</span>
            </button>
          </div>

          {/* COMMENTS SECTION */}
          <section className="mt-10 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="text-red-600" size={22} />
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                पाठकों की प्रतिक्रिया ({comments.length})
              </h3>
            </div>

            {/* COMMENT INPUT FORM */}
            <form onSubmit={handleCommentSubmit} className="space-y-3 mb-8">
              <input
                type="text"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="आपका नाम (वैकल्पिक)..."
                className="w-full sm:w-1/2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                placeholder="इस खबर पर अपनी राय लिखें..."
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-4 text-sm border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition shadow"
              >
                टिप्पणी भेजें
              </button>
            </form>

            {/* COMMENTS LIST */}
            <div className="space-y-3">
              {comments.length > 0 ? (
                comments.map((c, i) => (
                  <div
                    key={c._id || i}
                    className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-150 dark:border-gray-800"
                  >
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span className="font-bold text-gray-900 dark:text-gray-100">
                        {c.name || "पाठक"}
                      </span>
                      <span>{formatTimeHindi(c.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {c.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic">
                  अभी तक कोई टिप्पणी नहीं है। पहली टिप्पणी आप करें!
                </p>
              )}
            </div>
          </section>
        </article>

        {/* RIGHT SIDEBAR (4 COLS) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* RELATED STORIES */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="font-extrabold text-base text-gray-900 dark:text-white border-l-4 border-red-600 pl-2 mb-4">
              संबंधित खबरें
            </h3>
            <div className="space-y-3">
              {relatedNews.map((item) => (
                <Link
                  key={item._id}
                  href={`/news/${item._id}`}
                  className="flex gap-3 group py-2 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                >
                  <img
                    src={getMediaUrl(item.featuredImage || item.images?.[0])}
                    alt={item.title}
                    className="w-20 h-16 rounded-lg object-cover shrink-0 group-hover:scale-105 transition"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 group-hover:text-red-600 transition line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {formatTimeHindi(item.createdAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ADVERTISEMENT WIDGET */}
          <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl p-6 text-center shadow">
            <span className="text-[10px] uppercase font-bold tracking-widest text-red-200 block mb-1">
              विज्ञापन
            </span>
            <h4 className="text-base font-extrabold mb-2">
              स्टार न्यूज़ नेटवर्क पर विज्ञापन दें
            </h4>
            <p className="text-xs text-red-100 mb-4">
              लाखों पाठकों तक अपने व्यापार और संदेश को तुरंत पहुँचाएँ।
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-red-700 font-bold px-4 py-2 rounded-xl text-xs hover:bg-yellow-300 transition"
            >
              संपर्क करें →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
