import { Dessert } from "lucide-react";
import { React } from "react";
import { StaffSidebar } from "./components/staff-sidebar";

export const metadata = {
    title: 'Staff Portal - Hotel Nexus',
    description: 'Manage hotel operations efficiently with the Hotel Nexus staff portal.',
}

export default function StaffLayout({ children }) {
    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat flex relative" style={{backgroundImage: "url('/HotelFront.jpg')"}}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 w-64 h-screen border-r border-rose-200 bg-white flex-shrink-0 sticky top-0">
                <StaffSidebar />
            </div>
            <main className="flex-1 min-h-screen">
                {children}
            </main>
        </div>
    )
}