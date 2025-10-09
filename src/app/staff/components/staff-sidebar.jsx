"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  Home,
  UserPlus,
  Calendar,
  Newspaper,
  CreditCard,
  Settings,
  Bed,
  Utensils,
  ClipboardList,
  LogOut,
} from "lucide-react";

const managerMenu = [
  { title: "Home", url: "/staff", icon: Home },
  { title: "Add Staff", url: "/staff/manager/add-staff", icon: UserPlus },
  {title: "Add rooms", url: "/staff/manager/add-rooms", icon: UserPlus},
  { title: "Bookings", url: "/staff/manager/bookings", icon: Calendar },
  { title: "News/Update", url: "/staff/manager/news", icon: Newspaper },
  { title: "Payments", url: "/staff/manager/payments", icon: CreditCard },
  { title: "Settings", url: "/staff/manager/settings", icon: Settings },
];

const receptionistMenu = [
  { title: "Home", url: "/staff", icon: Home },
  { title: "Bookings", url: "/staff/bookings", icon: Calendar },
  { title: "News/Update", url: "/staff/news", icon: Newspaper },
  { title: "Payments", url: "/staff/payments", icon: CreditCard },
  { title: "Settings", url: "/staff/settings", icon: Settings },
];

const housekeepingMenu = [
  { title: "Home", url: "/staff", icon: Home },
  { title: "Room Status", url: "/staff/room-status", icon: Bed },
  { title: "News/Update", url: "/staff/news", icon: Newspaper },
  { title: "Settings", url: "/staff/settings", icon: Settings },
];

const chefMenu = [
  { title: "Home", url: "/staff", icon: Home },
  { title: "Menu", url: "/staff/menu", icon: Utensils },
  { title: "News/Update", url: "/staff/news", icon: Newspaper },
  { title: "Settings", url: "/staff/settings", icon: Settings },
];

const waitstaffMenu = [
  { title: "Home", url: "/staff", icon: Home },
  { title: "Orders", url: "/staff/orders", icon: ClipboardList },
  { title: "News/Update", url: "/staff/news", icon: Newspaper },
  { title: "Settings", url: "/staff/settings", icon: Settings },
];

function getMenu(role) {
  switch (role) {
    case "manager":
      return managerMenu;
    case "receptionist":
      return receptionistMenu;
    case "housekeeping":
      return housekeepingMenu;
    case "chef":
      return chefMenu;
    case "waitstaff":
      return waitstaffMenu;
    default:
      return [];
  }
}

export function StaffSidebar({ sidebarOpen, setSidebarOpen }) {
  useEffect(() => {
    const staff_data = localStorage.getItem('staff');
    const token = localStorage.getItem('token');    
    if (!staff_data) {
        window.location.href = '/'; // Redirect to home page if no staff data
    }

    if(!token) {
        window.location.href = '/'; // Redirect to home page if no token
    }

    const staff = JSON.parse(staff_data);
    if (!staff || staff.accountType !== "staff") {
        window.location.href = '/'; // Redirect to home page if not staff
    }


  }, []);

  // Get staff info from localStorage
  const staff = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("staff")) : null;
  const role = staff?.position || "manager";
  const menuItems = getMenu(role);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("staff");
    window.location.href = "/";
  };

  return (
    <aside
      className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        fixed md:sticky top-0 left-0 z-30 w-64 h-screen flex flex-col border-r border-rose-200 bg-white shadow-sm transition-transform duration-200 ease-in-out`}
    >
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-rose-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-rose-900">HotelNexus Staff</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Header */}
      <div className="border-b border-rose-200 bg-gradient-to-r from-rose-50 to-rose-100">
        <div className="flex items-center gap-3 px-4 py-5">
          <div className="flex items-center justify-center w-10 h-10 bg-rose-600 rounded-full">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-rose-900">HotelNexus Staff</h2>
            <p className="text-sm text-rose-600 capitalize">{role}</p>
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
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-700"
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
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 text-sm text-gray-700 hover:text-rose-700 hover:bg-rose-100 px-3 py-2 w-full rounded-md"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}