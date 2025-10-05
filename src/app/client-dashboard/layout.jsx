"use client";

import { useState } from "react";
import { ClientSidebar } from "../client-dashboard/components/client-sidebar";

export default function ClientDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <ClientSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="h-16 flex items-center px-4 border-b border-rose-200 bg-white">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="text-rose-600 p-2 hover:bg-rose-50 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}