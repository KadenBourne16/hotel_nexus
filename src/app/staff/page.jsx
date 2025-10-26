"use client"
import {React} from "react";
import { useEffect, useState } from "react"

export default function StaffDashboard() {
    return (
        <div className="p-6 relative bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/HotelFront.jpg')"}}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-4">Staff Dashboard</h1>
                <p>Welcome to the staff dashboard. Here you can manage hotel operations.</p>
            </div>
        </div>
    )
}