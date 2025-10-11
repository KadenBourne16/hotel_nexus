"use client"

import { useState } from "react";
import { Download, Clock, CheckCircle, CreditCard, Calendar, DollarSign } from "lucide-react";

export default function Billing() {
    const [bookings, setBookings] = useState([
        { id: 1, service: "Website Design", amount: 2500, date: "2024-10-05", status: "pending" },
        { id: 2, service: "Logo Design", amount: 800, date: "2024-10-08", status: "pending" },
        { id: 3, service: "Brand Guidelines", amount: 1200, date: "2024-10-10", status: "pending" },
    ]);
    
    const [billingInfo] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        company: "Acme Corporation",
        address: "123 Business St, Suite 100",
        city: "Accra",
        country: "Ghana",
        totalOutstanding: 4500,
        nextDueDate: "2024-10-20"
    });

    const handleGetInvoice = () => {
        alert("Invoice download started!");
    };

    const handleMarkAsPaid = (id) => {
        setBookings(bookings.filter(booking => booking.id !== id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Billing Dashboard</h1>
                    <p className="text-slate-600">Manage your payments and billing information</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Side - Pending Payments */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-amber-100 rounded-xl">
                                <Clock className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">Pending Payments</h2>
                                <p className="text-sm text-slate-500">{bookings.length} outstanding invoices</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {bookings.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                                    <p className="text-lg font-semibold text-slate-700">All caught up!</p>
                                    <p className="text-slate-500">No pending payments at the moment</p>
                                </div>
                            ) : (
                                bookings.map((booking) => (
                                    <div 
                                        key={booking.id} 
                                        className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-semibold text-slate-800 text-lg">{booking.service}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Calendar className="w-4 h-4 text-slate-500" />
                                                    <p className="text-sm text-slate-600">{booking.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-slate-800">GHc{booking.amount}</p>
                                                <span className="inline-block mt-1 px-3 py-1 bg-amber-200 text-amber-800 text-xs font-semibold rounded-full">
                                                    Pending
                                                </span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleMarkAsPaid(booking.id)}
                                            className="w-full mt-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Mark as Paid
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {bookings.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 font-medium">Total Outstanding</span>
                                    <span className="text-3xl font-bold text-slate-800">
                                        GHc{bookings.reduce((sum, b) => sum + b.amount, 0)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Side - Billing Info */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-red-100 rounded-xl">
                                <CreditCard className="w-6 h-6 text-red-600" />
                            </div>
                            <div>s
                                <h2 className="text-2xl font-bold text-slate-800">Billing Information</h2>
                                <p className="text-sm text-slate-500">Your account details</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Account Summary Card */}
                            <div className="bg-gradient-to-br from-red-500 to-purple-600 rounded-xl p-6 text-white">
                                <div className="flex items-center gap-2 mb-4">
                                    <DollarSign className="w-5 h-5" />
                                    <p className="text-red-100 text-sm font-medium">Total Outstanding</p>
                                </div>
                                <p className="text-4xl font-bold mb-4">GHc{billingInfo.totalOutstanding}</p>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-red-100" />
                                    <p className="text-sm text-red-100">Next due: {billingInfo.nextDueDate}</p>
                                </div>
                            </div>

                            {/* Billing Details */}
                            <div className="space-y-4">
                                <div className="pb-3 border-b border-slate-200">
                                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Full Name</p>
                                    <p className="text-slate-800 font-medium">{billingInfo.name}</p>
                                </div>
                                
                                <div className="pb-3 border-b border-slate-200">
                                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Email</p>
                                    <p className="text-slate-800 font-medium">{billingInfo.email}</p>
                                </div>
                                
                                <div className="pb-3 border-b border-slate-200">
                                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Company</p>
                                    <p className="text-slate-800 font-medium">{billingInfo.company}</p>
                                </div>
                                
                                <div className="pb-3 border-b border-slate-200">
                                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Address</p>
                                    <p className="text-slate-800 font-medium">{billingInfo.address}</p>
                                    <p className="text-slate-800 font-medium">{billingInfo.city}, {billingInfo.country}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 space-y-3">
                                <button 
                                    onClick={handleGetInvoice}
                                    className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-purple-700 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                                >
                                    <Download className="w-5 h-5" />
                                    Download Invoice
                                </button>
                                
                                <button className="w-full bg-slate-100 text-slate-700 py-3 px-6 rounded-xl font-semibold hover:bg-slate-200 transition-all">
                                    Update Billing Info
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}