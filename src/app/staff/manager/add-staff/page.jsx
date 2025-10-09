"use client"
import { Delete } from "lucide-react";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function AddStaffPage() {
    const [staffData, setStaffData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchStaffData = async () => {
            try {
                const response = await fetch('/api/staff/manager/add_staff/get_staff');
                const data = await response.json();
                setStaffData(data.staff || data.data || []);
            }catch (error) {
                console.error("Error fetching staff data:", error);
                setStaffData([]); // Fallback to demo data on error
            }
        }

        fetchStaffData().finally(() => setLoading(false));
    }, []);

    const getPositionColor = (position) => {
        const colors = {
            manager: "bg-red-100 text-red-800",
            supervisor: "bg-purple-100 text-purple-800",
            staff: "bg-green-100 text-green-800",
            default: "bg-gray-100 text-gray-800"
        };
        return colors[position?.toLowerCase()] || colors.default;
    };

    const getInitials = (firstName, lastName) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    const handleView = (id) => {
        router.push(`/staff/manager/add-staff/view/${id}`);
    };

    const handleEdit = (id) => {
        router.push(`/staff/manager/add-staff/edit/${id}`);
    };

    const handleDismiss = async (id) => {
        if (!confirm("Are you sure you want to dismiss this staff member?")) return;
        try {
            const res = await fetch('/api/staff/manager/add_staff/delete_staff', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const result = await res.json();
            if (result.success) {
                setStaffData(prev => prev.filter(staff => staff._id !== id));
            } else {
                alert(result.message || "Failed to dismiss staff member");
            }
        } catch (err) {
            alert("Network error");
        }
    };

    if(loading){
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="text-xl">Loading Staff Data, Please wait...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen w-full bg-gray-50">
            <div className="mb-6 flex items-center justify-end w-full">
                <a href="/staff/manager/add-staff/create-staff" className="bg-red-600 px-4 py-2 text-white rounded-md">Create Staff</a>
            </div>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 text-gray-900">Staff Management</h1>
                <p className="text-gray-600 mb-6">Manage and view all staff members</p>
                
                {staffData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-96">
                        <div className="text-8xl mb-4">😔</div>
                        <p className="text-xl text-gray-600">No staff found</p>
                        <p className="text-sm text-gray-500 mt-2">Add new staff members to get started</p>
                    </div>
                ) : (
                    <div>
                        <div className="mb-4 text-sm text-gray-600">
                            Showing {staffData.length} staff {staffData.length === 1 ? 'member' : 'members'}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {staffData.map((staff) => (
                                <div key={staff._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                                                    {getInitials(staff.first_name, staff.last_name)}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {staff.first_name} {staff.middle_name && staff.middle_name.charAt(0) + '.'} {staff.last_name}
                                                    </h3>
                                                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPositionColor(staff.position)}`}>
                                                        {staff.position?.charAt(0).toUpperCase() + staff.position?.slice(1)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="truncate">{staff.email}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span>{staff.phone}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                                </svg>
                                                <span className="font-mono text-xs">{staff.staff_id}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2 pt-4 border-t border-gray-100">
                                            <button
                                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
                                                onClick={() => handleView(staff._id)}
                                            >
                                                View Details
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors duration-200"
                                                onClick={() => handleEdit(staff._id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors duration-200 flex flex-row"
                                                onClick={() => handleDismiss(staff._id)}
                                            >
                                                <Delete className="text-[10px] text-red-500"/>
                                                Dismiss
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}