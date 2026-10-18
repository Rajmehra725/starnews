import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://starnewsbackend.onrender.com";

export const SOCKET_URL = API_BASE_URL;

// Helper to normalize image URLs
export function getMediaUrl(path?: string | null): string {
  if (!path) return "/assets/placeholder-news.jpg";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (path.startsWith("/")) {
    return `${API_BASE_URL}${path}`;
  }
  return `${API_BASE_URL}/${path}`;
}

// Format relative Hindi time
export function formatTimeHindi(dateString?: string): string {
  if (!dateString) return "";
  const now = new Date().getTime();
  const date = new Date(dateString).getTime();
  const diffInSeconds = Math.max(0, Math.floor((now - date) / 1000));

  if (diffInSeconds < 60) return "अभी-अभी";
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes} मिनट पहले`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} घंटे पहले`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} दिन पहले`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} महीने पहले`;
  const years = Math.floor(months / 12);
  return `${years} वर्ष पहले`;
}

// Format Hindi display date (e.g., "रविवार, 18 अक्टूबर 2026")
export function getHindiDateString(): string {
  const now = new Date();
  const days = [
    "रविवार",
    "सोमवार",
    "मंगलवार",
    "बुधवार",
    "गुरुवार",
    "शुक्रवार",
    "शनिवार",
  ];
  const months = [
    "जनवरी",
    "फरवरी",
    "मार्च",
    "अप्रैल",
    "मई",
    "जून",
    "जुलाई",
    "अगस्त",
    "सितंबर",
    "अक्टूबर",
    "नवंबर",
    "दिसंबर",
  ];

  const dayName = days[now.getDay()];
  const dateNum = now.getDate();
  const monthName = months[now.getMonth()];
  const year = now.getFullYear();

  return `${dayName}, ${dateNum} ${monthName} ${year}`;
}

export interface SectionType {
  _id?: string;
  heading?: string;
  content: string;
  image?: string;
  headingBgColor?: string;
  headingTextColor?: string;
  contentBgColor?: string;
  contentTextColor?: string;
}

export interface CommentType {
  _id: string;
  text: string;
  visitorId: string;
  name?: string;
  createdAt: string;
}

export interface NewsItem {
  _id: string;
  title: string;
  description?: string;
  content?: string;
  category?: string;
  sections?: SectionType[];
  status?: string;
  featuredImage?: string;
  images?: string[];
  likes?: number;
  likedBy?: string[];
  views?: number;
  viewedBy?: string[];
  shares?: number;
  sharedBy?: string[];
  comments?: CommentType[];
  createdAt: string;
  updatedAt?: string;
}

export interface BreakingItem {
  _id: string;
  text: string;
  isActive: boolean;
  priority: number;
  createdAt?: string;
}

export interface VideoItem {
  _id: string;
  title: string;
  link: string;
  createdAt?: string;
}

export interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  images: string[];
  createdAt: string;
}

export interface EpaperItem {
  _id: string;
  title: string;
  date?: string;
  pages: string[];
  pdfUrl?: string;
  createdAt: string;
}

// ----------------------------------------------------
// API Methods
// ----------------------------------------------------

export async function fetchNews(category?: string): Promise<NewsItem[]> {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/news`, { timeout: 15000 });
    let list: NewsItem[] = Array.isArray(res.data) ? res.data : [];
    if (category && category !== "All") {
      const lower = category.toLowerCase();
      list = list.filter((item) => item.category?.toLowerCase() === lower);
    }
    return list;
  } catch (err) {
    console.warn("fetchNews error:", err);
    return [];
  }
}

export async function fetchNewsById(id: string): Promise<NewsItem | null> {
  try {
    // Try single item endpoint first
    try {
      const singleRes = await axios.get(`${API_BASE_URL}/api/news/${id}`, {
        timeout: 10000,
      });
      if (singleRes.data && singleRes.data._id) return singleRes.data;
    } catch {
      // Fallback to all news list
    }

    const res = await axios.get(`${API_BASE_URL}/api/news`, { timeout: 15000 });
    const list: NewsItem[] = Array.isArray(res.data) ? res.data : [];
    return list.find((item) => item._id === id) || null;
  } catch (err) {
    console.warn("fetchNewsById error:", err);
    return null;
  }
}

export async function fetchSatnaNews(): Promise<NewsItem[]> {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/satna`, { timeout: 15000 });
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.warn("fetchSatnaNews error:", err);
    return [];
  }
}

export async function fetchSatnaNewsById(id: string): Promise<NewsItem | null> {
  try {
    try {
      const singleRes = await axios.get(`${API_BASE_URL}/api/satna/${id}`, {
        timeout: 10000,
      });
      if (singleRes.data && singleRes.data._id) return singleRes.data;
    } catch {
      // fallback
    }

    const res = await axios.get(`${API_BASE_URL}/api/satna`, { timeout: 15000 });
    const list: NewsItem[] = Array.isArray(res.data) ? res.data : [];
    return list.find((item) => item._id === id) || null;
  } catch (err) {
    console.warn("fetchSatnaNewsById error:", err);
    return null;
  }
}

export async function fetchChhatarpurNews(): Promise<NewsItem[]> {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/chhatarpur`, {
      timeout: 15000,
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.warn("fetchChhatarpurNews error:", err);
    return [];
  }
}

export async function fetchChhatarpurNewsById(
  id: string
): Promise<NewsItem | null> {
  try {
    try {
      const singleRes = await axios.get(
        `${API_BASE_URL}/api/chhatarpur/${id}`,
        { timeout: 10000 }
      );
      if (singleRes.data && singleRes.data._id) return singleRes.data;
    } catch {
      // fallback
    }

    const res = await axios.get(`${API_BASE_URL}/api/chhatarpur`, {
      timeout: 15000,
    });
    const list: NewsItem[] = Array.isArray(res.data) ? res.data : [];
    return list.find((item) => item._id === id) || null;
  } catch (err) {
    console.warn("fetchChhatarpurNewsById error:", err);
    return null;
  }
}

export async function fetchBreakingNews(): Promise<BreakingItem[]> {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/breaking`, {
      timeout: 12000,
    });
    const list: BreakingItem[] = Array.isArray(res.data) ? res.data : [];
    return list
      .filter((item) => item.isActive)
      .sort((a, b) => (a.priority || 0) - (b.priority || 0));
  } catch (err) {
    console.warn("fetchBreakingNews error:", err);
    return [];
  }
}

export async function fetchVideos(): Promise<VideoItem[]> {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/youtube/all`, {
      timeout: 12000,
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.warn("fetchVideos error:", err);
    return [];
  }
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/gallery`, {
      timeout: 12000,
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.warn("fetchGallery error:", err);
    return [];
  }
}

export async function fetchEpaper(): Promise<EpaperItem[]> {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/epaper`, {
      timeout: 12000,
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.warn("fetchEpaper error:", err);
    return [];
  }
}

export async function subscribeNewsletter(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/newsletter/subscribe`, {
      email,
    });
    return res.data;
  } catch (err: any) {
    const msg =
      err.response?.data?.message || "सदस्यता लेने में त्रुटि (Subscription error)";
    return { success: false, message: msg };
  }
}

export async function submitContact(data: {
  name: string;
  phone: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    await axios.post(`${API_BASE_URL}/api/contact`, data);
    return {
      success: true,
      message: "आपका संदेश सफलतापूर्वक प्राप्त हुआ! हम जल्द ही संपर्क करेंगे।",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || "संदेश भेजने में त्रुटि हुई",
    };
  }
}

export async function toggleLike(
  newsId: string,
  userId: string,
  type: "news" | "satna" | "chhatarpur" = "news"
) {
  try {
    const url =
      type === "satna"
        ? `${API_BASE_URL}/api/interactions/like/${newsId}`
        : type === "chhatarpur"
        ? `${API_BASE_URL}/api/interactions/like/${newsId}`
        : `${API_BASE_URL}/api/news/${newsId}/like`;
    const res = await axios.post(url, { userId });
    return res.data;
  } catch (err) {
    console.warn("toggleLike error:", err);
    return null;
  }
}

export async function recordView(
  newsId: string,
  userId: string,
  type: "news" | "satna" | "chhatarpur" = "news"
) {
  try {
    if (type === "satna") {
      await axios.put(`${API_BASE_URL}/api/satna/view/${newsId}`);
    } else if (type === "chhatarpur") {
      await axios.put(`${API_BASE_URL}/api/chhatarpur/view/${newsId}`);
    } else {
      await axios.post(`${API_BASE_URL}/api/news/${newsId}/view`, { userId });
    }
  } catch (err) {
    console.warn("recordView error:", err);
  }
}

export async function recordShare(
  newsId: string,
  userId: string,
  type: "news" | "satna" | "chhatarpur" = "news"
) {
  try {
    if (type === "satna") {
      await axios.put(`${API_BASE_URL}/api/satna/share/${newsId}`);
    } else if (type === "chhatarpur") {
      await axios.put(`${API_BASE_URL}/api/chhatarpur/share/${newsId}`);
    } else {
      await axios.post(`${API_BASE_URL}/api/news/${newsId}/share`, { userId });
    }
  } catch (err) {
    console.warn("recordShare error:", err);
  }
}
