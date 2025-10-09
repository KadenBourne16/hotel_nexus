"use client"
import React, { useEffect } from "react";


export default function LoadingAnimation({message}) {
    return (
        <div className="p-6 bg-gradient-to-br from-rose-100 to-white min-h-screen text-sm font-sans">
            <div className="p-6 h-screen w-full justify-center items-center flex flex-col">
                <p className="text-red-700">{message}</p>
            </div>
        </div>
    )
}