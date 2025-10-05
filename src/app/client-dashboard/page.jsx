"use client"

import { useState } from "react"
import { Calendar, DollarSign, Heart, Clock, Bell, Menu } from "lucide-react"
import { StatsCard, UpdateCard } from "@/app/client-dashboard/components/stats-card"

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

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between px-4 border-b border-rose-200 bg-white">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen((prev) => !prev)} className="text-rose-600 p-2 hover:bg-rose-50">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-rose-900">Dashboard</h1>
          </div>
          <button className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded">
            <Calendar className="w-4 h-4" /> Book a Room
          </button>
        </header>

        <main className="space-y-6 p-6 bg-gradient-to-br from-rose-50 to-white min-h-screen">
          <section className="bg-white p-6 rounded-lg border border-rose-200 shadow-sm">
            <h2 className="text-2xl font-bold text-rose-900 mb-2">Welcome back, John!</h2>
            <p className="text-gray-600">
              Here's an overview of your booking history and the latest updates from HotelNexus.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Bookings"
              value={userStats.totalBookings}
              subtitle="All time bookings"
              icon={<Calendar className="w-4 h-4" />}
              trend={{ value: "+2 this month", isPositive: true }}
            />
            <StatsCard
              title="Average Room Price"
              value={`$${userStats.averagePrice}`}
              subtitle="Per night average"
              icon={<DollarSign className="w-4 h-4" />}
            />
            <StatsCard
              title="Favorite Room"
              value={userStats.favoriteRoom}
              subtitle="Most booked room type"
              icon={<Heart className="w-4 h-4" />}
            />
            <StatsCard
              title="Longest Stay"
              value={userStats.longestStay}
              subtitle="Your record stay"
              icon={<Clock className="w-4 h-4" />}
            />
          </section>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotelUpdates.map((update) => (
                <UpdateCard key={update.id} {...update} />
              ))}
            </div>
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
    </div>
  )
}
