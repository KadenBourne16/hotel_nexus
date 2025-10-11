"use client"

import { useState } from "react";
import { User, Mail, Phone, Lock, MapPin, Calendar, Settings, Bell, Heart, LogOut, Edit2, Save, X } from "lucide-react";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [clientData, setClientData] = useState({
        first_name: "John",
        middle_name: "Michael",
        last_name: "Doe",
        gender: "Male",
        email: "john.doe@example.com",
        phone: "+233 24 123 4567",
        password: "********",
        memberSince: "January 2023",
        totalBookings: 12,
        upcomingBookings: 2
    });

    const [editedData, setEditedData] = useState({ ...clientData });

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData({ ...clientData });
    };

    const handleSave = () => {
        setClientData({ ...editedData });
        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    const handleCancel = () => {
        setEditedData({ ...clientData });
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setEditedData({ ...editedData, [field]: value });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">My Profile</h1>
                    <p className="text-slate-600">Manage your account information and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Sidebar - Profile Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                            {/* Profile Avatar */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-xl">
                                    <span className="text-5xl font-bold text-white">
                                        {clientData.first_name[0]}{clientData.last_name[0]}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 text-center">
                                    {clientData.first_name} {clientData.middle_name} {clientData.last_name}
                                </h2>
                                <p className="text-slate-500 mt-1">{clientData.gender}</p>
                                <span className="mt-3 px-4 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                                    Premium Guest
                                </span>
                            </div>

                            {/* Stats */}
                            <div className="space-y-4 mb-6">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-600">Total Bookings</p>
                                            <p className="text-3xl font-bold text-slate-800">{clientData.totalBookings}</p>
                                        </div>
                                        <Calendar className="w-10 h-10 text-blue-500" />
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-600">Upcoming Stays</p>
                                            <p className="text-3xl font-bold text-slate-800">{clientData.upcomingBookings}</p>
                                        </div>
                                        <MapPin className="w-10 h-10 text-green-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Member Since */}
                            <div className="pt-4 border-t border-slate-200">
                                <p className="text-sm text-slate-500">Member Since</p>
                                <p className="text-lg font-semibold text-slate-800">{clientData.memberSince}</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                                    <Heart className="w-5 h-5 text-rose-500" />
                                    <span className="text-slate-700 font-medium">Favorite Hotels</span>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                                    <Bell className="w-5 h-5 text-amber-500" />
                                    <span className="text-slate-700 font-medium">Notifications</span>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                                    <Settings className="w-5 h-5 text-slate-500" />
                                    <span className="text-slate-700 font-medium">Settings</span>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-left">
                                    <LogOut className="w-5 h-5 text-red-500" />
                                    <span className="text-red-600 font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Profile Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                            {/* Header with Edit Button */}
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Personal Information</h2>
                                    <p className="text-slate-500 mt-1">Update your personal details</p>
                                </div>
                                {!isEditing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold hover:bg-slate-300 transition-all"
                                        >
                                            <X className="w-4 h-4" />
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-md"
                                        >
                                            <Save className="w-4 h-4" />
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-6">
                                {/* Name Fields Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            First Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="text"
                                                value={isEditing ? editedData.first_name : clientData.first_name}
                                                onChange={(e) => handleInputChange('first_name', e.target.value)}
                                                disabled={!isEditing}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                                    isEditing ? 'bg-white border-slate-300' : 'bg-slate-50 border-slate-200'
                                                }`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            value={isEditing ? editedData.middle_name : clientData.middle_name}
                                            onChange={(e) => handleInputChange('middle_name', e.target.value)}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                                isEditing ? 'bg-white border-slate-300' : 'bg-slate-50 border-slate-200'
                                            }`}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={isEditing ? editedData.last_name : clientData.last_name}
                                            onChange={(e) => handleInputChange('last_name', e.target.value)}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                                isEditing ? 'bg-white border-slate-300' : 'bg-slate-50 border-slate-200'
                                            }`}
                                        />
                                    </div>
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Gender
                                    </label>
                                    <select
                                        value={isEditing ? editedData.gender : clientData.gender}
                                        onChange={(e) => handleInputChange('gender', e.target.value)}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                            isEditing ? 'bg-white border-slate-300' : 'bg-slate-50 border-slate-200'
                                        }`}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                    </select>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            value={isEditing ? editedData.email : clientData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                                isEditing ? 'bg-white border-slate-300' : 'bg-slate-50 border-slate-200'
                                            }`}
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="tel"
                                            value={isEditing ? editedData.phone : clientData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                                isEditing ? 'bg-white border-slate-300' : 'bg-slate-50 border-slate-200'
                                            }`}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="password"
                                            value={clientData.password}
                                            disabled
                                            className="w-full pl-10 pr-4 py-3 border border-slate-200 bg-slate-50 rounded-xl"
                                        />
                                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-sm font-semibold hover:text-blue-700">
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            {!isEditing && (
                                <div className="mt-8 pt-6 border-t border-slate-200">
                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                                        <p className="text-sm text-blue-800">
                                            <strong>Note:</strong> Some changes may require email verification for security purposes.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}