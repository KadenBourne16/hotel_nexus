"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingAnimation from "@/app/staff/components/loading";

export default function ViewStaffPage() {
    const { id } = useParams();
    const router = useRouter();
    const [staff, setStaff] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStaff() {
            setLoading(true);
            try {
                const res = await fetch(`/api/staff/manager/add_staff/get_staff?id=${id}`);
                const data = await res.json();
                setStaff(data.staff || data.data || null);
            } catch (err) {
                setStaff(null);
            }
            setLoading(false);
        }
        fetchStaff();
    }, [id]);

    if (loading){
        return <div className="p-6">
           <LoadingAnimation message="Loading Staff Data, Please wait"/>
        </div>;
    }
    if (!staff) return <div className="p-6">Staff not found.</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="mb-6 text-rose-600 hover:text-rose-800 font-semibold"
                >
                    &larr; Back
                </button>
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Staff Details</h1>
                <div className="space-y-3">
                    <div><strong>Staff ID:</strong> {staff.staff_id}</div>
                    <div><strong>Name:</strong> {staff.first_name} {staff.middle_name} {staff.last_name}</div>
                    <div><strong>Email:</strong> {staff.email}</div>
                    <div><strong>Phone:</strong> {staff.phone}</div>
                    <div><strong>Position:</strong> {staff.position}</div>
                    <div><strong>Password:</strong> {staff.password}</div>
                    {staff.image && (
                        <div>
                            <strong>Profile Image:</strong>
                            <img src={staff.image?.asset?.url || staff.image} alt="Profile" className="mt-2 w-32 h-32 object-cover rounded-full" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
