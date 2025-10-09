"use client"

import { useState } from "react"
import { X, Bed, Users, DollarSign, Star, MapPin, Wifi, Car, Utensils, Dumbbell, Calendar, ArrowLeft } from "lucide-react"
import imageUrlBuilder from "@sanity/image-url"
import { client as sanityClient } from "@/sanity/lib/client"

export default function RoomDetailsModal({ isOpen, onClose, room }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen || !room) return null

  const builder = imageUrlBuilder(sanityClient)
  function urlFor(source) {
    if (!source) return ""
    if (source._ref) return builder.image(source).width(800).height(400).fit("crop").url()
    if (source.url) return source.url
    return ""
  }

  const images = room.image && room.image.length > 0 ? room.image : []
  const amenities = room.amenities || []
  const services = room.services || []

  const getAmenityIcon = (amenity) => {
    const lower = amenity.toLowerCase()
    if (lower.includes("wifi") || lower.includes("internet")) return <Wifi className="w-4 h-4" />
    if (lower.includes("parking")) return <Car className="w-4 h-4" />
    if (lower.includes("restaurant") || lower.includes("food") || lower.includes("dining")) return <Utensils className="w-4 h-4" />
    if (lower.includes("gym") || lower.includes("fitness")) return <Dumbbell className="w-4 h-4" />
    return <Star className="w-4 h-4" />
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-500" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Room Details</h2>
              <p className="text-sm text-gray-500">View complete room information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="relative h-80 bg-gray-100">
              <img
                src={urlFor(images[currentImageIndex]?.asset)}
                alt={room.type}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {room.type} #{room.room_number}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      room.status === "available"
                        ? "bg-green-100 text-green-800"
                        : room.status === "occupied"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      ⭐ {room.rating || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-rose-600">
                    GH₵{room.price}
                  </div>
                  <div className="text-sm text-gray-500">per night</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600 leading-relaxed">{room.description}</p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Bed className="w-5 h-5 text-rose-600" />
                  Room Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Type:</span>
                    <span className="font-medium">{room.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Number:</span>
                    <span className="font-medium">#{room.room_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {room.capacity} guests
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      GH₵{room.price}/night
                    </span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {amenities.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-600">
                        {getAmenityIcon(amenity)}
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Services */}
            {services.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  Services
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking CTA */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-6 border border-rose-100">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Ready to Book?</h4>
                <p className="text-gray-600 mb-4">
                  Reserve this {room.type.toLowerCase()} room for your perfect stay
                </p>
                <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto">
                  <Calendar className="w-5 h-5" />
                  Book This Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
