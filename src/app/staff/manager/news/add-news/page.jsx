"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AddNewsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("announcement");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/staff/manager/news/add_news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, type }),
      });
      const result = await res.json();
      setLoading(false);
      if (result.success) {
        router.push("/staff/news");
      } else {
        alert(result.message || "Failed to add");
      }
    } catch (err) {
      setLoading(false);
      alert("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-white px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border border-rose-200 flex flex-col items-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-rose-600 hover:text-rose-800 font-semibold self-start"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-3xl font-bold mb-6 text-rose-700 text-center">
          Create News / Update
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-rose-500 bg-white"
              required
              placeholder="Enter news title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-rose-500 bg-white"
            >
              <option value="service">Service</option>
              <option value="event">Event</option>
              <option value="menu">Menu Update</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-rose-500 bg-white"
              rows={6}
              required
              placeholder="Describe the news/update..."
            />
          </div>
          <button
            className="w-full px-4 py-3 bg-rose-600 hover:bg-rose-800 text-white rounded-lg font-semibold transition-colors"
            disabled={loading}
          >
            {loading ? "Saving..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
