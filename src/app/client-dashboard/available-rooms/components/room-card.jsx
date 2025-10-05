import { Wifi, Car, Coffee, Utensils, Star, Users } from "lucide-react";

export function RoomCard({
  id,
  name,
  type,
  price,
  originalPrice,
  rating,
  capacity,
  image,
  amenities,
  isAvailable,
  discount,
}) {
  const amenityIcons = {
    WiFi: Wifi,
    Parking: Car,
    Coffee: Coffee,
    Restaurant: Utensils,
  };

  return (
    <div className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-rose-200 rounded-lg bg-white">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover"
        />

        {/* Discount badge */}
        {discount && (
          <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs px-2 py-1 rounded-md">
            {discount}% OFF
          </span>
        )}

        {/* Unavailable overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
              Not Available
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-rose-600 font-medium">{type}</p>
        </div>

        {/* Rating and Capacity */}
        <div className="flex items-center gap-4 text-gray-700">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">Up to {capacity} guests</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity];
            return (
              <div key={amenity} className="flex items-center gap-1 text-xs text-gray-600">
                {Icon && <Icon className="w-3 h-3" />}
                <span>{amenity}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-rose-600">${price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
          )}
          <span className="text-sm text-gray-600">/ night</span>
        </div>
        <button
          disabled={!isAvailable}
          className={`px-4 py-2 text-sm rounded-md font-medium transition ${
            isAvailable
              ? "bg-rose-600 text-white hover:bg-rose-700"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          {isAvailable ? "Book Now" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}
