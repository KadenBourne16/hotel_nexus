import { Dessert } from "lucide-react";
import { React } from "react";
import { StaffSidebar } from "./components/staff-sidebar";

export const metadata = {
    title: 'Staff Portal - Hotel Nexus',
    description: 'Manage hotel operations efficiently with the Hotel Nexus staff portal.',
}

export default function StaffLayout({ children }) {
    return (
        <div className="min-h-screen bg-rose-50 flex">
            <div className="w-64 h-screen border-r border-rose-200 bg-white flex-shrink-0 sticky top-0">
                <StaffSidebar />
            </div>
            <main className="flex-1 min-h-screen">
                {children}
            </main>
        </div>
    )
}