"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Bed, DollarSign, Layers, Info, Users, Star, List, LucideImage } from "lucide-react";

const amenitiesList = ["WiFi", "TV", "AC", "Mini Bar", "Balcony", "Safe", "Bathtub"];
const servicesList = ["Room Service", "Laundry", "Wifi", "Parking", "Coffee", "Breakfast"];
const typeOptions = ["single", "double", "suite", "deluxe", "family", "presidential"];

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params.id;
  const [form, setForm] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "" });

  useEffect(() => {
    async function fetchRoom() {
      setLoading(true);
      try {
        const res = await fetch(`/api/staff/manager/get_room?id=${roomId}`);
        const data = await res.json();
        setForm({
          room_number: data.room.room_number || "",
          type: data.room.type || "",
          status: data.room.status || "available",
          price: data.room.price || "",
          description: data.room.description || "",
          amenities: data.room.amenities || [],
          capacity: data.room.capacity || "",
          rating: data.room.rating || "",
          services: data.room.services || [],
          image: data.room.image || [],
        });
        setImages([]);
      } catch (err) {
        setForm(null);
      }
      setLoading(false);
    }
    fetchRoom();
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCheckbox = (name, value) => {
    setForm((prev) => {
      const arr = prev[name];
      return {
        ...prev,
        [name]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare form data for API
    const data = { ...form };

    // Handle image upload (send as FormData)
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value);
      }
    });
    images.forEach((img) => formData.append("image", img));
    formData.append("id", roomId);

    try {
      const res = await fetch("/api/staff/manager/update_room", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      setLoading(false);
      if (result.success) {
        setModal({ isOpen: true, title: "Success", message: "Room updated successfully!" });
        setTimeout(() => {
          setModal({ isOpen: false, title: "", message: "" });
          router.push("/staff/add-rooms");
        }, 1200);
      } else {
        setModal({ isOpen: true, title: "Error", message: result.message || "Failed to update room." });
      }
    } catch (err) {
      setLoading(false);
      setModal({ isOpen: true, title: "Error", message: "Network error. Please try again." });
    }
  };

  if (loading || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="animate-spin w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full"></span>
        <span className="ml-3 text-rose-600 font-semibold">Loading room...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 border border-rose-200">
        <h1 className="text-3xl font-bold text-rose-700 mb-2 flex items-center gap-2">
          <Bed className="w-7 h-7" /> Edit Room
        </h1>
        <p className="mb-6 text-gray-600">Update the details below and click update to save changes.</p>
        {modal.isOpen && (
          <div className={`mb-4 px-4 py-2 rounded ${modal.title === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            <strong>{modal.title}:</strong> {modal.message}
          </div>
        )}
        <form className="space-y-5" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
            <input
              name="room_number"
              type="text"
              value={form.room_number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-rose-500"
              required
              placeholder="E.g. 101"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-rose-500"
              required
            >
              <option value="">Select type</option>
              {typeOptions.map((type) => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-rose-500"
              required
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Price (GHS)
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-rose-500"
              required
              min={0}
              placeholder="E.g. 350"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Info className="w-4 h-4" /> Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-rose-500"
              rows={3}
              required
              placeholder="Describe the room..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center gap-1 text-xs bg-rose-50 px-2 py-1 rounded border border-rose-200">
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(amenity)}
                    onChange={() => handleCheckbox("amenities", amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Users className="w-4 h-4" /> Capacity
            </label>
            <input
              name="capacity"
              type="number"
              value={form.capacity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-rose-500"
              required
              min={1}
              placeholder="E.g. 2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Star className="w-4 h-4" /> Rating
            </label>
            <input
              name="rating"
              type="number"
              value={form.rating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-rose-500"
              min={1}
              max={5}
              step={0.1}
              placeholder="E.g. 4.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <List className="w-4 h-4" /> Services
            </label>
            <div className="flex flex-wrap gap-2">
              {servicesList.map((service) => (
                <label key={service} className="flex items-center gap-1 text-xs bg-rose-50 px-2 py-1 rounded border border-rose-200">
                  <input
                    type="checkbox"
                    checked={form.services.includes(service)}
                    onChange={() => handleCheckbox("services", service)}
                  />
                  {service}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <LucideImage className="w-4 h-4" /> Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-rose-500"
            />
            {/* Show existing images */}
            {form.image && form.image.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {form.image.map((img, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {img.asset?.url ? (
                      <a href={img.asset.url} target="_blank" rel="noopener noreferrer">{img.asset.url.split("/").pop()}</a>
                    ) : "Image"}
                  </span>
                ))}
              </div>
            )}
            {/* Show new images to be uploaded */}
            {images.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {images.map((img, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">{img.name}</span>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent border-b-transparent rounded-full animate-spin mr-2"></span>
                Updating Room...
              </>
            ) : (
              "Update Room"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
