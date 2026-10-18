"use client";

import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { submitContact } from "../../lib/api";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const res = await submitContact({ name, phone, message });
    setFeedback(res);
    setLoading(false);

    if (res.success) {
      setName("");
      setPhone("");
      setMessage("");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <SectionHeader title="संपर्क करें (Contact Us)" badge="CONTACT" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* LEFT: INFO CARD */}
        <div className="md:col-span-5 bg-gradient-to-br from-red-700 to-red-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-200">
              STAR NEWS HELPLINE
            </span>
            <h2 className="text-2xl font-black mt-1 mb-3">
              हमसे सीधे संपर्क करें
            </h2>
            <p className="text-xs text-red-100 leading-relaxed">
              विज्ञापन, समाचार सुझाव, प्रेस विज्ञप्ति या किसी भी प्रकार की सहायता के लिए हमारी टीम से तुरंत संपर्क करें।
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="text-yellow-400 shrink-0 mt-0.5" size={18} />
              <div>
                <strong className="block text-white">कार्यालय का पता:</strong>
                <span className="text-red-100">
                  स्टार न्यूज़ नेटवर्क, सिविल लाइन्स, सतना / पन्ना, मध्य प्रदेश - 485001
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="text-yellow-400 shrink-0 mt-0.5" size={18} />
              <div>
                <strong className="block text-white">फोन / हेल्पलाइन:</strong>
                <span className="text-red-100">+91 98710 14353</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="text-yellow-400 shrink-0 mt-0.5" size={18} />
              <div>
                <strong className="block text-white">ईमेल पता:</strong>
                <span className="text-red-100">contact@starnewsnetworks.com</span>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/919871014353"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-xs transition shadow"
          >
            <FaWhatsapp size={16} />
            <span>व्हाट्सएप पर चैट करें</span>
          </a>
        </div>

        {/* RIGHT: CONTACT FORM */}
        <div className="md:col-span-7 bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            संदेश भेजें
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            कृपया नीचे दिए गए फॉर्म को भरें। हम जल्द से जल्द आपसे संपर्क करेंगे।
          </p>

          {feedback && (
            <div
              className={`p-4 rounded-xl text-xs font-semibold mb-6 ${
                feedback.success
                  ? "bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-200"
                  : "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200"
              }`}
            >
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                आपका नाम *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="पूरा नाम दर्ज करें"
                required
                className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                मोबाइल नंबर *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10 अंकों का मोबाइल नंबर"
                required
                className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                संदेश या सवाल *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="अपना संदेश विस्तार से लिखें..."
                required
                className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition shadow disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send size={15} />
              <span>{loading ? "संदेश भेजा जा रहा है..." : "संदेश भेजें"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
