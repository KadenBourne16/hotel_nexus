"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit, Calendar } from "lucide-react";

export default function NewsListPage() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "" });
  const router = useRouter();

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/staff/manager/news/get_news");
      const data = await res.json();
      setUpdates(data.updates || []);
    } catch (err) {
      setUpdates([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this update?")) return;
    try {
      const res = await fetch("/api/staff/manager/news/delete_news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success) {
        setModal({ isOpen: true, title: "Success", message: "Update deleted" });
        setUpdates((prev) => prev.filter((u) => u._id !== id));
      } else {
        setModal({ isOpen: true, title: "Error", message: result.message || "Delete failed" });
      }
    } catch (err) {
      setModal({ isOpen: true, title: "Error", message: "Network error" });
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between w-full">
        <h1 className="text-3xl font-bold">News & Updates</h1>
        <button onClick={() => router.push("/staff/news/add-news")} className="flex items-center gap-2 bg-rose-600 text-white px-3 py-2 rounded">
          <Plus className="w-4 h-4" /> Add News
        </button>
      </div>

      {modal.isOpen && (
        <div className={`mb-4 px-4 py-2 rounded ${modal.title === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          <strong>{modal.title}:</strong> {modal.message}
          <div className="mt-2">
            <button onClick={() => setModal({ isOpen: false, title: "", message: "" })} className="px-3 py-1 bg-rose-600 text-white rounded">Ok</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : updates.length === 0 ? (
        <div className="text-gray-500">No updates found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {updates.map((u) => (
            <div key={u._id} className="bg-white p-4 rounded-lg border border-rose-200 shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{u.title}</h3>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> {new Date(u.date).toLocaleString()} · <span className="capitalize">{u.type}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => router.push(`/staff/news/update-news/${u._id}`)} title="Edit" className="p-2 rounded bg-rose-50 hover:bg-rose-100">
                    <Edit className="w-4 h-4 text-rose-600" />
                  </button>
                  <button onClick={() => handleDelete(u._id)} title="Delete" className="p-2 rounded bg-rose-50 hover:bg-rose-100">
                    <Trash2 className="w-4 h-4 text-rose-600" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mt-3 text-sm">{u.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}