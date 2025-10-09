"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Bed, DollarSign, Users, Star, Loader2 } from "lucide-react";

export default function AddRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      setLoading(true);
      try {
        const res = await fetch("/api/staff/manager/get_rooms");
        const data = await res.json();
        setRooms(data.rooms || []);
      } catch (err) {
        setRooms([]);
      }
      setLoading(false);
    }
    fetchRooms();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-end w-full">
        <a href="/staff/add-rooms/create-rooms" className="bg-red-400 p-2 text-white rounded-md">Create Room</a>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin w-8 h-8 text-rose-600" />
          <span className="ml-3 text-rose-600 font-semibold">Loading rooms...</span>
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No rooms found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white border border-rose-200 rounded-xl shadow p-5 flex flex-col">
              <div className="mb-3">
                {room.image && room.image.length > 0 ? (
                  <Image
                    src={room.image[0].asset?.url || "/images/room-placeholder.jpg"}
                    alt={room.type}
                    width={400}
                    height={200}
                    className="rounded-lg object-cover w-full h-40"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    <Bed className="w-12 h-12" />
                  </div>
                )}
              </div>
              <h2 className="text-lg font-bold text-rose-700 mb-1">{room.type} <span className="text-gray-500">#{room.room_number}</span></h2>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${room.status === "available" ? "bg-green-100 text-green-700" : room.status === "occupied" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}`}>
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </span>
                <span className="flex items-center gap-1 text-xs bg-rose-50 px-2 py-1 rounded border border-rose-200">
                  <DollarSign className="w-3 h-3" /> {room.price} GHS
                </span>
                <span className="flex items-center gap-1 text-xs bg-rose-50 px-2 py-1 rounded border border-rose-200">
                  <Users className="w-3 h-3" /> {room.capacity} Guests
                </span>
                <span className="flex items-center gap-1 text-xs bg-rose-50 px-2 py-1 rounded border border-rose-200">
                  <Star className="w-3 h-3" /> {room.rating || "N/A"}
                </span>
              </div>
              <p className="text-gray-600 mb-2 text-sm">{room.description}</p>
              <div className="mb-2">
                <span className="font-semibold text-xs text-rose-700">Amenities:</span>
                <span className="ml-2 text-xs text-gray-700">{room.amenities?.join(", ") || "None"}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-xs text-rose-700">Services:</span>
                <span className="ml-2 text-xs text-gray-700">{room.services?.join(", ") || "None"}</span>
              </div>
              <a
                href={`/staff/add-rooms/edit-rooms/${room._id}`}
                className="mt-2 self-end bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded text-xs font-semibold transition"
              >
                Edit
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}