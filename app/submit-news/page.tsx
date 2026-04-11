"use client";

"use client";

import { useEffect, useState } from "react";

const API = "https://starnewsbackend.onrender.com/api/newsSubmit";

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

  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  const [approvedNews, setApprovedNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // fetch approved
  const fetchApprovedNews = async () => {
    try {
      const res = await fetch(`${API}/approved`);
      const data = await res.json();
      setApprovedNews(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApprovedNews();
  }, []);

  // submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

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
      const res = await fetch(API, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log("response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Submit failed");
      }

      alert("📰 Your news has been submitted for review!");

      fetchApprovedNews();

      setImages([]);
      setVideo(null);

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

    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error submitting news");
    }

    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-red-600 text-white p-4 text-center shadow">
        <h1 className="text-2xl font-bold">⭐ Star News Reporter</h1>
        <p className="text-sm">Submit your local news & get published</p>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-6">

        {/* FORM */}
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

            {/* IMAGE */}
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setImages(Array.from(e.target.files || []))
              }
            />

            {/* IMAGE PREVIEW */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    className="h-24 object-cover rounded"
                  />
                ))}
              </div>
            )}

            {/* VIDEO */}
            <input
              type="file"
              accept="video/*"
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setVideo(e.target.files?.[0] || null)
              }
            />

            {/* VIDEO PREVIEW */}
            {video && (
              <video
                src={URL.createObjectURL(video)}
                className="w-full h-40 object-cover rounded"
                controls
              />
            )}

            <button
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
            >
              {loading ? "Submitting..." : "Submit News"}
            </button>

          </form>
        </div>

        {/* APPROVED NEWS */}
        <div>
          <h2 className="text-lg font-semibold mb-3">🟢 Approved News</h2>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {approvedNews.length === 0 && (
              <p className="text-gray-500">No approved news yet...</p>
            )}

            {approvedNews.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded shadow">

                <h3 className="font-bold text-lg">{item.title}</h3>

                {item.video && (
                  <video
                    src={item.video}
                    controls
                    className="w-full h-48 object-cover rounded mt-2"
                  />
                )}

                {item.images?.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {item.images.map((img: string, i: number) => (
                      <img
                        key={i}
                        src={img}
                        className="w-full h-32 object-cover rounded"
                      />
                    ))}
                  </div>
                )}

                <p className="text-sm text-gray-600 mt-2">
                  {item.content}
                </p>

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