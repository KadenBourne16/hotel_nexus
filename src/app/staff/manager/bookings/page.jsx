"use client"

import { useState, useEffect } from "react"
import { client } from "@/sanity/lib/client"
import { Calendar, User, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function BookingsPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)

      const query = `*[_type == "booking"] | order(created_at desc) {
        _id,
        client->{
          _id,
          first_name,
          middle_name,
          last_name,
          email,
          phone
        },
        room->{
          _id,
          room_number,
          image,
          description,
          amenities,
          capacity,
          rating,
          services,
          room_type->{
            name,
            price_per_night
          }
        },
        check_in,
        check_out,
        status,
        payment_status,
        created_at
      }`

      const result = await client.fetch(query)
      setBookings(result)
    } catch (err) {
      console.error("Error fetching bookings:", err)
      setError("Failed to load bookings. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'booked':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'checked_in':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'checked_out':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'booked':
        return <Clock className="w-4 h-4" />
      case 'checked_in':
        return <CheckCircle className="w-4 h-4" />
      case 'checked_out':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatClientName = (client) => {
    if (!client) return 'Unknown Client'

    const { first_name, middle_name, last_name } = client
    const nameParts = [first_name, middle_name, last_name].filter(Boolean)
    return nameParts.length > 0 ? nameParts.join(' ') : 'Unknown Client'
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'not_paid':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />
      case 'not_paid':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedBooking(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading bookings...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
          <p className="mt-2 text-gray-600">View and manage all hotel bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'checked_in').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'booked').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.payment_status === 'paid').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Payment</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.payment_status === 'not_paid').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Bookings</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="p-6 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No bookings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-in
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booked On
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleBookingClick(booking)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-500" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {formatClientName(booking.client)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.client?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Room {booking.room?.room_number}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.room?.room_type?.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.check_in)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.check_out)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">
                            {booking.status.replace('_', ' ')}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPaymentStatusColor(booking.payment_status)}`}>
                          {getPaymentStatusIcon(booking.payment_status)}
                          <span className="ml-1 capitalize">
                            {booking.payment_status === 'not_paid' ? 'Not Paid' : booking.payment_status}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Room Image */}
                <div>
                  {selectedBooking.room?.image && selectedBooking.room.image.length > 0 ? (
                    <img
                      src={selectedBooking.room.image[0].asset.url}
                      alt={`Room ${selectedBooking.room.room_number}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Booking Information */}
                <div className="space-y-6">
                  {/* Client Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Client Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 font-medium">
                        {formatClientName(selectedBooking.client)}
                      </p>
                      <p className="text-gray-600">{selectedBooking.client?.email}</p>
                      <p className="text-gray-600">{selectedBooking.client?.phone}</p>
                    </div>
                  </div>

                  {/* Room Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Room Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 font-medium">
                        Room {selectedBooking.room?.room_number}
                      </p>
                      <p className="text-gray-600">{selectedBooking.room?.room_type?.name}</p>
                      {selectedBooking.room?.description && (
                        <p className="text-gray-600 mt-2">{selectedBooking.room.description}</p>
                      )}
                      {selectedBooking.room?.capacity && (
                        <p className="text-gray-600">Capacity: {selectedBooking.room.capacity} guests</p>
                      )}
                      {selectedBooking.room?.rating && (
                        <p className="text-gray-600">Rating: {selectedBooking.room.rating}/5</p>
                      )}
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-medium">{formatDate(selectedBooking.check_in)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-medium">{formatDate(selectedBooking.check_out)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedBooking.status)}`}>
                          {getStatusIcon(selectedBooking.status)}
                          <span className="ml-1 capitalize">
                            {selectedBooking.status.replace('_', ' ')}
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment:</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(selectedBooking.payment_status)}`}>
                          {getPaymentStatusIcon(selectedBooking.payment_status)}
                          <span className="ml-1 capitalize">
                            {selectedBooking.payment_status === 'not_paid' ? 'Not Paid' : selectedBooking.payment_status}
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booked on:</span>
                        <span className="font-medium">
                          {new Date(selectedBooking.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Room Amenities & Services */}
                  {(selectedBooking.room?.amenities?.length > 0 || selectedBooking.room?.services?.length > 0) && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Room Features</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        {selectedBooking.room?.amenities?.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Amenities:</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedBooking.room.amenities.map((amenity, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {selectedBooking.room?.services?.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedBooking.room.services.map((service, index) => (
                                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}