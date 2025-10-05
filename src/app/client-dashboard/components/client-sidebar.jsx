"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Home,
  Calendar,
  CreditCard,
  User,
  Settings,
  LogOut,
  Bed,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
    isActive: false,
  },
  {
    title: "Available Rooms",
    url: "#",
    icon: Bed,
    isActive: true,
  },
  {
    title: "My Bookings",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Billing",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Profile",
    url: "#",
    icon: User,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function ClientSidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <aside 
      className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
                 fixed md:sticky top-0 left-0 z-30 w-64 h-screen flex flex-col border-r border-rose-200 bg-white shadow-sm transition-transform duration-200 ease-in-out`}>
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-rose-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-rose-900">HotelNexus</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Header */}
      <div className="border-b border-rose-200 bg-gradient-to-r from-rose-50 to-rose-100">
        <div className="flex items-center gap-3 px-4 py-5">
          <div className="flex items-center justify-center w-10 h-10 bg-rose-600 rounded-full">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-rose-900">HotelNexus</h2>
            <p className="text-sm text-rose-600">Client Portal</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <p className="text-xs text-rose-700 font-semibold mb-2">Navigation</p>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              <Link
                href={item.url}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                  item.isActive
                    ? "bg-rose-100 text-rose-700"
                    : "text-gray-700 hover:bg-rose-50 hover:text-rose-700"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-rose-200 bg-rose-50 px-4 py-3">
        <button className="flex items-center gap-3 text-sm text-gray-700 hover:text-rose-700 hover:bg-rose-100 px-3 py-2 w-full rounded-md">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
