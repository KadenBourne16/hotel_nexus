"use client";

import { useState } from "react";
import { RoomCard } from "./components/room-card";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

const rooms = [
  {
    id: "1",
    name: "Deluxe Ocean View",
    type: "Deluxe Room",
    price: 299,
    originalPrice: 349,
    rating: 4.8,
    capacity: 2,
    image: "/placeholder.svg?height=200&width=300&text=Deluxe+Ocean+View",
    amenities: ["WiFi", "Parking", "Coffee", "Restaurant"],
    isAvailable: true,
    discount: 15,
  },
  {
    id: "2",
    name: "Executive Suite",
    type: "Suite",
    price: 459,
    rating: 4.9,
    capacity: 4,
    image: "/placeholder.svg?height=200&width=300&text=Executive+Suite",
    amenities: ["WiFi", "Parking", "Coffee", "Restaurant"],
    isAvailable: true,
  },
  {
    id: "3",
    name: "Standard Room",
    type: "Standard",
    price: 189,
    originalPrice: 229,
    rating: 4.5,
    capacity: 2,
    image: "/placeholder.svg?height=200&width=300&text=Standard+Room",
    amenities: ["WiFi", "Coffee"],
    isAvailable: true,
    discount: 18,
  },
  {
    id: "4",
    name: "Presidential Suite",
    type: "Presidential Suite",
    price: 899,
    rating: 5.0,
    capacity: 6,
    image: "/placeholder.svg?height=200&width=300&text=Presidential+Suite",
    amenities: ["WiFi", "Parking", "Coffee", "Restaurant"],
    isAvailable: false,
  },
  {
    id: "5",
    name: "Family Room",
    type: "Family",
    price: 329,
    rating: 4.6,
    capacity: 4,
    image: "/placeholder.svg?height=200&width=300&text=Family+Room",
    amenities: ["WiFi", "Parking", "Coffee"],
    isAvailable: true,
  },
  {
    id: "6",
    name: "Business Suite",
    type: "Business Suite",
    price: 399,
    originalPrice: 449,
    rating: 4.7,
    capacity: 2,
    image: "/placeholder.svg?height=200&width=300&text=Business+Suite",
    amenities: ["WiFi", "Parking", "Coffee", "Restaurant"],
    isAvailable: true,
    discount: 12,
  },
];

export default function ClientDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center h-16 px-4 border-b border-rose-200 bg-white">
          <h1 className="text-xl font-semibold text-rose-900">Available Rooms</h1>
        </header>

        {/* Content */}
        <div className="flex-1 space-y-4 p-6 bg-gradient-to-br from-rose-50 to-white">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border border-rose-200 shadow-sm">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search rooms..."
                className="w-full pl-10 pr-4 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-rose-200 text-rose-700 rounded-md hover:bg-rose-50 bg-white">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-rose-200 text-rose-700 rounded-md hover:bg-rose-50 bg-white">
                <SlidersHorizontal className="w-4 h-4" />
                Sort
              </button>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-rose-200 shadow-sm">
              <h3 className="text-sm font-medium text-gray-600">Total Rooms</h3>
              <p className="text-2xl font-bold text-rose-600">{rooms.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-rose-200 shadow-sm">
              <h3 className="text-sm font-medium text-gray-600">Available</h3>
              <p className="text-2xl font-bold text-green-600">
                {rooms.filter((room) => room.isAvailable).length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-rose-200 shadow-sm">
              <h3 className="text-sm font-medium text-gray-600">Starting From</h3>
              <p className="text-2xl font-bold text-rose-600">
                ${Math.min(...rooms.filter((room) => room.isAvailable).map((room) => room.price))}
              </p>
            </div>
          </div>

          {/* Room Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
