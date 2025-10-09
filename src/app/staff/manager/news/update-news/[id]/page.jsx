"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateNewsPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("announcement");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/staff/manager/news/get_news?id=${id}`);
        const data = await res.json();
        if (data.update && mounted) {
          setTitle(data.update.title || "");
          setDescription(data.update.description || "");
          setType(data.update.type || "announcement");
        }
      } catch (err) {
        // ignore
      }
      if (mounted) setLoading(false);
    })();
    return () => { mounted = false; };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/staff/manager/news/update_news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, description, type }),
      });
      const result = await res.json();
      setSubmitting(false);
      if (result.success) {
        router.push("/staff/news");
      } else {
        setError(result.message || "Update failed");
      }
    } catch (err) {
      setSubmitting(false);
      setError("Network error. Please try again.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit News</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        {error && <div className="text-red-600 p-2 bg-red-100 rounded">{error}</div>}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="service">Service</option>
            <option value="event">Event</option>
            <option value="menu">Menu Update</option>
            <option value="announcement">Announcement</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border px-3 py-2 rounded" rows={6} required />
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-rose-600 text-white rounded" disabled={submitting}>
            {submitting ? "Updating..." : "Update"}
          </button>
          <button type="button" className="px-4 py-2 border rounded" onClick={() => router.push("/staff/news")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
