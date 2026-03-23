"use client";

import { useEffect, useState } from "react";

export default function SubmitNews() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    location: "",
    district: "",
    name: "",
    mobile: "",
    email: "",
  });

  const [approvedNews, setApprovedNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 📥 Fetch approved news
  const fetchApprovedNews = async () => {
    const res = await fetch("https://starnewsbackend.onrender.com/api/newsSubmit/approved");
    const data = await res.json();
    setApprovedNews(data);
  };

  useEffect(() => {
    fetchApprovedNews();
  }, []);

  // 📨 Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await fetch("https://starnewsbackend.onrender.com/api/newsSubmit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("📰 Your news has been submitted for review!");
    setLoading(false);

    // reset form
    setForm({
      title: "",
      content: "",
      category: "",
      location: "",
      district: "",
      name: "",
      mobile: "",
      email: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔴 HEADER */}
      <div className="bg-red-600 text-white p-4 text-center shadow">
        <h1 className="text-2xl font-bold">⭐ Star News Reporter</h1>
        <p className="text-sm">Submit your local news & get published</p>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-6">

        {/* 📝 FORM */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4">📰 Submit News</h2>

          <form onSubmit={handleSubmit} className="space-y-3">

            <input
              value={form.name}
              placeholder="Your Name"
              className="w-full border p-2 rounded"
              onChange={e => setForm({...form, name: e.target.value})}
            />

            <input
              value={form.mobile}
              placeholder="Mobile Number"
              className="w-full border p-2 rounded"
              onChange={e => setForm({...form, mobile: e.target.value})}
            />

            <input
              value={form.email}
              placeholder="Email"
              className="w-full border p-2 rounded"
              onChange={e => setForm({...form, email: e.target.value})}
            />

            <input
              value={form.title}
              placeholder="News Title"
              className="w-full border p-2 rounded"
              onChange={e => setForm({...form, title: e.target.value})}
            />

            <textarea
              value={form.content}
              placeholder="Full News Content..."
              className="w-full border p-2 rounded h-28"
              onChange={e => setForm({...form, content: e.target.value})}
            />

            <input
              value={form.location}
              placeholder="Location"
              className="w-full border p-2 rounded"
              onChange={e => setForm({...form, location: e.target.value})}
            />

            <input
              value={form.district}
              placeholder="District"
              className="w-full border p-2 rounded"
              onChange={e => setForm({...form, district: e.target.value})}
            />

            <select
              value={form.category}
              className="w-full border p-2 rounded"
              onChange={e => setForm({...form, category: e.target.value})}
            >
              <option value="">Select Category</option>
              <option>Local</option>
              <option>India</option>
              <option>Crime</option>
              <option>Sports</option>
            </select>

            <button
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
            >
              {loading ? "Submitting..." : "Submit News"}
            </button>
          </form>
        </div>

        {/* 🌐 APPROVED NEWS */}
        <div>
          <h2 className="text-lg font-semibold mb-3">🟢 Approved News</h2>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {approvedNews.length === 0 && (
              <p className="text-gray-500">No approved news yet...</p>
            )}

            {approvedNews.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded shadow">

                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.content}</p>

                <div className="text-xs text-gray-500 mt-2 flex justify-between">
                  <span>👤 {item.name}</span>
                  <span>📍 {item.location}</span>
                </div>

                <div className="text-xs text-gray-400 mt-1">
                  Category: {item.category}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}