"use client"

import { useState } from "react"
import { Calendar, X, Loader2 } from "lucide-react"

export default function BookingModal({ isOpen, onClose, room, onBookingSubmit }) {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates")
      return
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      setError("Check-out date must be after check-in date")
      return
    }

    if (!room || !room._id) {
      setError("Invalid room selection")
      return
    }

    setIsLoading(true)

    // Prepare booking data
    const bookingData = {
      room,
      checkIn,
      checkOut,
    }

    console.log("Booking Data to be Submitted:", bookingData)
    console.log("Room object:", room)
    console.log("Room ID:", room?._id)
    console.log("Check-in:", checkIn, "Type:", typeof checkIn)
    console.log("Check-out:", checkOut, "Type:", typeof checkOut)

    try {
      await onBookingSubmit(bookingData)
      handleClose()
    } catch (err) {
      console.error("Booking submission error:", err)
      setError("Failed to create booking. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setCheckIn("")
    setCheckOut("")
    setError("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Book Room</h2>
              <p className="text-sm text-gray-500">Reserve your stay</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Room Info */}
        <div className="p-6 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🏨</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {room.type} #{room.room_number}
              </h3>
              <div className="flex items-center gap-4 mt-1">
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  💰 GH₵{room.price}/night
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  👥 {room.capacity} guests
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  room.status === "available"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
              Check-in Date
            </label>
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div>
            <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">
              Check-out Date
            </label>
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
              min={checkIn || new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Booking Summary */}
          {checkIn && checkOut && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-gray-900">Booking Summary</h4>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Check-in:</span>
                <span>{new Date(checkIn).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Check-out:</span>
                <span>{new Date(checkOut).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Nights:</span>
                <span>{Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-gray-900 border-t pt-2">
                <span>Total:</span>
                <span>GH₵{Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) * room.price}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  Confirm Booking
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
