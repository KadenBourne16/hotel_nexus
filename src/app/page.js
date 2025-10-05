"use client"

import { Building2, Phone, Lock, User, Users } from "lucide-react"
import { useState } from "react"

export default function LoginPage() {
  const [accountType, setAccountType] = useState("client")

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 to-rose-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-950 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">HotelNexus</h1>
          <p className="mt-2 text-white">Hotel Management System</p>
        </div>

        {/* Account Type Selection */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-black shadow-2xl">
          <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">Select Account Type</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setAccountType("staff")}
              className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                accountType === "staff"
                  ? "border-rose-600 bg-rose-50 text-rose-600"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Hotel Staff</span>
            </button>
            <button
              onClick={() => setAccountType("client")}
              className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                accountType === "client"
                  ? "border-rose-600 bg-rose-50 text-rose-600"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Client</span>
            </button>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white shadow-black shadow-2xl rounded-lg p-6">
          <div className="space-y-1 pb-6">
            <h2 className="text-2xl font-semibold text-center text-rose-600">Welcome Back</h2>
            <p className="text-center text-gray-600">
              Sign in to access your {accountType === "staff" ? "hotel dashboard" : "account"}
            </p>
          </div>
          <div className="space-y-6">
            <form className="space-y-4">
              {/* Staff ID Field - Only for Hotel Staff */}
              {accountType === "staff" && (
                <div className="space-y-2">
                  <label htmlFor="staffId" className="text-sm font-medium text-gray-700">
                    Staff ID
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="staffId"
                      type="text"
                      placeholder="Enter your staff ID"
                      className="pl-10 h-12 w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-gray-300"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Phone Number Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="phone"
                    type="tel"
                    placeholder="020123456789"
                    className="pl-10 h-12 w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 h-12 w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder:text-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <button type="button" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full h-12 bg-red-600 hover:bg-red-900 text-white font-medium rounded-lg transition-colors"
              >
                Sign In as {accountType === "staff" ? "Hotel Staff" : "Client"}
              </button>
            </form>

            {/* Sign Up Button - Only for Clients */}
            {accountType === "client" && (
              <div className="w-full max-w-md mx-auto flex justify-center items-center">
                <p className="text-black text-sm">
                  Don't have account?{" "}
                  <span>
                    <a href="/signup" className="text-rose-600 hover:text-rose-800 font-medium">
                      Sign Up
                    </a>
                  </span>
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Alternative Sign In Options */}
            <div className="grid grid-cols-2 gap-3">
              <button className="h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition">
                <svg className="w-5 h-5 mr-2 text-rose-600" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-rose-600 font-medium text-sm">Google</span>
              </button>
              <button className="h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition">
                <svg className="w-5 h-5 mr-2 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-rose-600 font-medium text-sm">Facebook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-white">
          <p>
            Need help? <button className="text-red-300 hover:text-rose-400 font-medium">Contact Support</button>
          </p>
        </div>
      </div>
    </div>
  )
}
