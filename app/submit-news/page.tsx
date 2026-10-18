"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL, getMediaUrl, formatTimeHindi } from "../../lib/api";
import SectionHeader from "../components/SectionHeader";
import { Send, Upload, CheckCircle, Clock } from "lucide-react";

export default function SubmitNewsPage() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "Local",
    location: "",
    district: "Satna",
    name: "",
    mobile: "",
    email: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [approvedNews, setApprovedNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchApprovedNews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/newsSubmit/approved`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setApprovedNews(data);
      }
    } catch (err) {
      console.warn("fetchApprovedNews error:", err);
    }
  };

  useEffect(() => {
    fetchApprovedNews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    if (video) {
      formData.append("video", video);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/newsSubmit`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "खबर भेजने में त्रुटि हुई");
      }

      setStatusMessage("✅ आपकी खबर संपादकीय समीक्षा के लिए भेज दी गई है। स्वीकृति के पश्चात यह पोर्टल पर प्रदर्शित होगी!");
      fetchApprovedNews();
      setImages([]);
      setVideo(null);
      setForm({
        title: "",
        content: "",
        category: "Local",
        location: "",
        district: "Satna",
        name: "",
        mobile: "",
        email: "",
      });
    } catch (err: any) {
      setStatusMessage("❌ " + (err.message || "खबर भेजने में समस्या आई"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <SectionHeader title="नागरिक पत्रकारिता — अपनी खबर भेजें" badge="REPORTER" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SUBMISSION FORM (7 COLS) */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-red-600">
            <Send className="text-red-600" size={20} />
            <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">
              खबर का विवरण दर्ज करें
            </h3>
          </div>
          <p className="text-xs text-gray-500 mb-6">
            अपने गांव, कस्बे, शहर या क्षेत्र की जनसमस्या, घटना या सकारात्मक समाचार हमारे साथ साझा करें।
          </p>

          {statusMessage && (
            <div className="p-4 rounded-xl text-xs font-semibold mb-6 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  आपका शुभ नाम *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="उदा. राहुल शर्मा"
                  required
                  className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-xs border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  मोबाइल नंबर *
                </label>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  placeholder="उदा. 9876543210"
                  required
                  className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-xs border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  जिला *
                </label>
                <select
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-xs border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="Satna">सतना (Satna)</option>
                  <option value="Panna">पन्ना (Panna)</option>
                  <option value="Chhatarpur">छतरपुर (Chhatarpur)</option>
                  <option value="Maihar">मैहर (Maihar)</option>
                  <option value="Rewa">रीवा (Rewa)</option>
                  <option value="Other">अन्य (Other)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  श्रेणी *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-xs border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="Local">स्थानीय (Local)</option>
                  <option value="Crime">अपराध (Crime)</option>
                  <option value="Politics">राजनीति (Politics)</option>
                  <option value="Health">स्वास्थ्य (Health)</option>
                  <option value="Education">शिक्षा (Education)</option>
                  <option value="Sports">खेल (Sports)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  स्थान / गांव / वार्ड *
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="उदा. सिविल लाइन्स"
                  required
                  className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-xs border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                खबर का शीर्षक (Headline) *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="प्रमुख घटना या समाचार का संक्षिप्त शीर्षक..."
                required
                className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-xs border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                खबर का पूरा विवरण (Details) *
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={5}
                placeholder="पूरी घटना, समस्या या विवरण विस्तार से लिखें..."
                required
                className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  फोटो संलग्न करें (वैकल्पिक)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setImages(Array.from(e.target.files));
                    }
                  }}
                  className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  वीडियो संलग्न करें (वैकल्पिक)
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setVideo(e.target.files[0]);
                    }
                  }}
                  className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition shadow disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
            >
              <Send size={16} />
              <span>{loading ? "खबर भेजी जा रही है..." : "खबर सबमिट करें"}</span>
            </button>
          </form>
        </div>

        {/* RECENTLY APPROVED COMMUNITY NEWS (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-red-600">
              <CheckCircle className="text-green-600" size={18} />
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                नागरिकों द्वारा भेजी गई प्रकाशित खबरें
              </h3>
            </div>

            <div className="space-y-4">
              {approvedNews.length > 0 ? (
                approvedNews.slice(0, 5).map((n) => (
                  <div
                    key={n._id}
                    className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-150 dark:border-gray-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span className="font-bold text-red-600">
                        {n.district || "मध्य प्रदेश"} • {n.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {formatTimeHindi(n.createdAt)}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white line-clamp-2">
                      {n.title}
                    </h4>

                    {n.content && (
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                        {n.content}
                      </p>
                    )}

                    <div className="text-[10px] text-gray-400 pt-1">
                      संवाददाता: <span className="font-medium text-gray-700 dark:text-gray-300">{n.name}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic text-center py-6">
                  प्रकाशित नागरिक खबरें लोड हो रही हैं...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}