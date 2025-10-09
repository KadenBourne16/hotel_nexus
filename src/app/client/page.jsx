"use client"

import { useEffect, useState } from "react"
import { Calendar, DollarSign, Heart, Clock, Bell, Menu, Bed, Users, Star, Loader2 } from "lucide-react"
import { StatsCard, UpdateCard } from "@/app/client/components/stats-card"
import BookingModal from "@/app/client/components/booking-modal"
import RoomDetailsModal from "@/app/client/components/room-details-modal"
import imageUrlBuilder from "@sanity/image-url"
import { client as sanityClient } from "@/sanity/lib/client"

const userStats = {
  totalBookings: 12,
  averagePrice: 285,
  favoriteRoom: "Deluxe Ocean View",
  longestStay: "7 nights",
}

const hotelUpdates = [
  {
    id: "1",
    title: "New Spa Services Available",
    description:
      "We've added hot stone massage and aromatherapy treatments to our spa menu. Book your relaxing session today!",
    date: "2 days ago",
    type: "service",
    isNew: true,
  },
  {
    id: "2",
    title: "Wine Tasting Event",
    description: "Join us for an exclusive wine tasting event featuring local vintages. Limited seats available.",
    date: "5 days ago",
    type: "event",
    isNew: true,
  },
  {
    id: "3",
    title: "New Mediterranean Menu",
    description:
      "Our chef has crafted a new Mediterranean-inspired menu featuring fresh seafood and organic ingredients.",
    date: "1 week ago",
    type: "menu",
    isNew: false,
  },
  {
    id: "4",
    title: "Pool Area Renovation Complete",
    description: "Our newly renovated pool area is now open with enhanced facilities and comfortable lounging areas.",
    date: "2 weeks ago",
    type: "announcement",
    isNew: false,
  },
  {
    id: "5",
    title: "24/7 Concierge Service",
    description:
      "We're excited to announce our new 24/7 concierge service to assist you with any requests at any time.",
    date: "3 weeks ago",
    type: "service",
    isNew: false,
  },
]

export default function ClientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "" })
  const [error, setError] = useState("")
  const [stats, setStats] = useState({
      totalBookings: 0,
      averagePrice: 0,
      favoriteRoom: "",
      longestStay: "",
  })
  const [rooms, setRooms] = useState([])
  const [updates, setUpdates] = useState([])
  const [bookingModal, setBookingModal] = useState({ isOpen: false, room: null })
  const [roomDetailsModal, setRoomDetailsModal] = useState({ isOpen: false, room: null })
  const [roomsLoading, setRoomsLoading] = useState(true)
  const [updatesLoading, setUpdatesLoading] = useState(true)
  const builder = imageUrlBuilder(sanityClient)
  function urlFor(source) {
    if (!source) return ""
    if (source._ref) return builder.image(source).width(400).height(200).fit("crop").url()
    if (source.url) return source.url
    return ""
  }

  useEffect(() => {
    //fetch user information from local storage or API
    const localStorage_user = JSON.parse(localStorage.getItem('user'))
    if(localStorage_user){
      setUser(localStorage_user)
    }
    // Fetch rooms
    async function fetchRooms() {
      setRoomsLoading(true)
      try {
        const res = await fetch("/api/staff/manager/get_rooms")
        const data = await res.json()
        setRooms(data.rooms || [])
      } catch (err) {
        setRooms([])
      }
      setRoomsLoading(false)
    }
    // Fetch updates
    async function fetchUpdates() {
      setUpdatesLoading(true)
      try {
        const res = await fetch("/api/staff/manager/news/get_news")
        const data = await res.json()
        setUpdates(data.updates || [])
      } catch (err) {
        setUpdates([])
      }
      setUpdatesLoading(false)
    }
    fetchRooms()
    fetchUpdates()
    // eslint-disable-next-line
  }, [])

  const handleBookingSubmit = async (bookingData) => {
    console.log("Received booking data in handleBookingSubmit:", bookingData)

    try {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user || !user.id) {
        console.error("Invalid user data:", user)
        setError('Please log in to make a booking')
        return
      }

      // bookingData should contain checkIn, checkOut, and room info
      const { checkIn, checkOut, room } = bookingData
      if (!room || !room._id || !checkIn || !checkOut) {
        console.error("Invalid booking data:", bookingData)
        console.error("Room object:", room)
        console.error("Room ID:", room?._id)
        console.error("Check-in value:", checkIn, "Type:", typeof checkIn)
        console.error("Check-out value:", checkOut, "Type:", typeof checkOut)
        setError('Missing booking details')
        return
      }

      console.log("Extracted data:", { roomId: room._id, checkIn, checkOut, clientId: user.id })

      const response = await fetch('/api/client/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: room._id,
          checkIn,
          checkOut,
          clientId: user.id,
        }),
      })

      console.log("API Response status:", response.status)

      if (response.ok) {
        const result = await response.json()
        console.log("Booking successful:", result)

        setModal({
          isOpen: true,
          title: 'Booking Successful!',
          message: 'Your room has been booked successfully. You will receive a confirmation email shortly.'
        })
        // refetch rooms to update availability
        // fetchRooms is defined in useEffect, so move it out to top-level
        window.location.reload() // quick fix to refresh room status
      } else {
        const err = await response.json()
        console.error("Booking failed:", err)
        setError(err.error || 'Failed to create booking')
      }
    } catch (error) {
      console.error('Booking submission error:', error)
      setError('Failed to create booking. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <header className="flex h-20 items-center justify-between px-6 border-b border-rose-200 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen((prev) => !prev)} className="text-rose-600 p-3 hover:bg-rose-50 rounded-lg transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-rose-900">HotelNexus</h1>
              <p className="text-sm text-gray-500">Client Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg">
              <Calendar className="w-5 h-5" /> Book a Room
            </button>
          </div>
        </header>

        <main className="space-y-6 p-6 bg-gradient-to-br from-rose-50 to-white min-h-screen">
          <section className="bg-white p-6 rounded-lg border border-rose-200 shadow-sm">
            <h2 className="text-2xl font-bold text-rose-900 mb-2">
              Welcome back, {user?.first_name}
              {user?.middle_name ? ` ${user.middle_name}` : ""}
              {user?.last_name ? ` ${user.last_name}` : ""}
            </h2>
            <p className="text-gray-600">
              Here's an overview of your booking history and the latest updates from HotelNexus.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Bookings"
              value={stats.totalBookings}
              subtitle="All time bookings"
              icon={<Calendar className="w-4 h-4" />}
              trend={{ value: "0 this month", isPositiveis: true }}
            />
            <StatsCard
              title="Average Room Price"
              value={`GHc${stats.averagePrice}`}
              subtitle="Per night average"
              icon={<DollarSign className="w-4 h-4" />}
            />
            <StatsCard
              title="Favorite Room"
              value={stats.favoriteRoom}
              subtitle="Most booked room type"
              icon={<Heart className="w-4 h-4" />}
            />
            <StatsCard
              title="Longest Stay"
              value={stats.longestStay}
              subtitle="Your record stay"
              icon={<Clock className="w-4 h-4" />}
            />
          </section>

          {/* Available Rooms Section */}
          <section>
            <h3 className="text-xl font-semibold text-rose-900 mb-4 flex items-center gap-2">
              <Bed className="w-5 h-5" /> Available Rooms
            </h3>
            {roomsLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="animate-spin w-8 h-8 text-rose-600" />
                <span className="ml-3 text-rose-600 font-semibold">Loading rooms...</span>
              </div>
            ) : rooms.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No rooms found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <div key={room._id} className="bg-white border border-rose-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col group">
                    <div className="mb-4 relative overflow-hidden rounded-xl">
                      {room.image && room.image.length > 0 && room.image[0].asset ? (
                        <img
                          src={urlFor(room.image[0].asset)}
                          alt={room.type}
                          className="rounded-xl object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center text-gray-400">
                          <Bed className="w-16 h-16" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                          room.status === "available"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : room.status === "occupied"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-slate-100 text-slate-800 border border-slate-200"
                        }`}>
                          {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                        {room.type} <span className="text-rose-600">#{room.room_number}</span>
                      </h2>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="flex items-center gap-1 text-sm bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200 text-rose-700 font-medium">
                          <DollarSign className="w-4 h-4" /> {room.price} GHS
                        </span>
                        <span className="flex items-center gap-1 text-sm bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 text-blue-700 font-medium">
                          <Users className="w-4 h-4" /> {room.capacity}
                        </span>
                        <span className="flex items-center gap-1 text-sm bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 text-amber-700 font-medium">
                          <Star className="w-4 h-4" /> {room.rating || "N/A"}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                        {room.description}
                      </p>

                      {(room.amenities?.length > 0 || room.services?.length > 0) && (
                        <div className="mb-4 space-y-2">
                          {room.amenities?.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              <span className="text-xs font-semibold text-rose-700 mr-2">Amenities:</span>
                              {room.amenities.slice(0, 2).map((amenity, index) => (
                                <span key={index} className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">
                                  {amenity}
                                </span>
                              ))}
                              {room.amenities.length > 2 && (
                                <span className="text-xs text-gray-500">+{room.amenities.length - 2} more</span>
                              )}
                            </div>
                          )}
                          {room.services?.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              <span className="text-xs font-semibold text-blue-700 mr-2">Services:</span>
                              {room.services.slice(0, 2).map((service, index) => (
                                <span key={index} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                                  {service}
                                </span>
                              ))}
                              {room.services.length > 2 && (
                                <span className="text-xs text-gray-500">+{room.services.length - 2} more</span>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2 mt-auto pt-4">
                        <button
                          className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                            room.status === 'available'
                              ? "bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                          onClick={() => {
                            if (room.status === 'available') {
                              setBookingModal({ isOpen: true, room })
                            } else {
                              setError('This room is currently not available')
                            }
                          }}
                          disabled={room.status !== 'available'}
                        >
                          {room.status === 'available' ? 'Book Room' : 'Unavailable'}
                        </button>
                        <button
                          className="flex-1 border-2 border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 py-3 px-4 rounded-xl font-semibold transition-all duration-200"
                          onClick={() => setRoomDetailsModal({ isOpen: true, room })}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Hotel Updates Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-rose-600" />
                <h3 className="text-xl font-semibold text-rose-900">Hotel Updates</h3>
              </div>
              <button className="border border-rose-200 text-rose-700 hover:bg-rose-50 px-4 py-2 rounded">
                View All Updates
              </button>
            </div>
            {updatesLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="animate-spin w-8 h-8 text-rose-600" />
                <span className="ml-3 text-rose-600 font-semibold">Loading updates...</span>
              </div>
            ) : updates.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No updates found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {updates.map((update) => (
                  <UpdateCard key={update._id} {...update} />
                ))}
              </div>
            )}
          </section>

          <section className="bg-white p-6 rounded-lg border border-rose-200 shadow-sm">
            <h3 className="text-lg font-semibold text-rose-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-rose-600 hover:bg-rose-700 text-white h-12 rounded">Book a New Room</button>
              <button className="border border-rose-200 text-rose-700 hover:bg-rose-50 h-12 rounded bg-transparent">
                View My Bookings
              </button>
              <button className="border border-rose-200 text-rose-700 hover:bg-rose-50 h-12 rounded bg-transparent">
                Contact Support
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Modal Components */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ isOpen: false, room: null })}
        room={bookingModal.room}
        onBookingSubmit={handleBookingSubmit}
      />

      <RoomDetailsModal
        isOpen={roomDetailsModal.isOpen}
        onClose={() => setRoomDetailsModal({ isOpen: false, room: null })}
        room={roomDetailsModal.room}
      />
    </div>
  )
}
