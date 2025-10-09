"use client";
import {React} from "react";
import { useEffect, useState } from "react"

export default function StaffDashboard() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch payments data from API (placeholder logic)
        setLoading(false);
        setPayments([]); // No payments found
    }, []);

    return (
        <div className="p-6 bg-gradient-to-br from-rose-100 to-white min-h-screen text-sm">
            <h1 className="text-3xl font-bold mb-4">Payments</h1>
            <div className="p-6 h-screen w-full justify-center items-center flex flex-col">
                <h1 className="text-[100px]">😔</h1>
                <p>No payments found</p>
            </div>
        </div>
    )
}