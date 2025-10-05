"use client"
import React from "react";
import { Building2, User, Mail, Phone, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    
  })

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert("Signup successful!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred while signing up. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 to-rose-950">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Side - Hotel Image and Branding */}
          <div className="hidden lg:block">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-950 rounded-xl mb-6">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">Hotel Nexus</h1>
              <p className="text-xl text-gray-600">Hotel Management System</p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hotel-lobby.png"
                alt="Luxury hotel lobby"
                width={600}
                height={400}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Join Hotel Nexus Today</h3>
                <p className="text-lg opacity-90">
                  Streamline your hotel operations with our comprehensive management system
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* Mobile Branding */}
            <div className="text-center mb-8 lg:hidden">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">HotelPro</h1>
              <p className="text-gray-600 mt-2">Hotel Management System</p>
            </div>

            {/* Signup Card */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <div className="space-y-1 pb-6 text-center">
                <h2 className="text-2xl font-semibold">Create Account</h2>
                <p className="text-gray-600">Join HotelPro to manage your hotel efficiently</p>
              </div>

              <form className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className="pl-10 h-12 w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className="pl-10 h-12 w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Middle Name */}
                <div className="space-y-2">
                  <label htmlFor="middleName" className="text-sm font-medium text-gray-700">
                    Middle Name <span className="text-gray-400">(Optional)</span>
                  </label>      
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="middleName"
                      type="text"
                      placeholder="Middle name"
                      className="pl-10 h-12 w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Gender *</label>
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="gender" value="M" className="form-radio text-blue-600" required />
                      <span className="text-sm">Male</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="gender" value="F" className="form-radio text-blue-600" />
                      <span className="text-sm">Female</span>
                    </label>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className="pl-10 h-12 w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="pl-10 h-12 w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="pl-3 pr-10 h-12 w-full border border-gray-200 rounded-lg focus:border-rose-500 focus:ring focus:ring-rose-200"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-3 pr-10 h-12 w-full border border-gray-200 rounded-lg focus:border-rose-500 focus:ring focus:ring-rose-200"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <button type="button" className="text-rose-600 hover:text-rose-800 font-medium">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button type="button" className="text-rose-600 hover:text-rose-800 font-medium">
                      Privacy Policy
                    </button>
                  </label>
                </div>

                {/* Create Account Button */}
                <button
                  type="submit"
                  className="w-full h-12 bg-rose-600 hover:bg-rose-800 text-white font-medium rounded-lg transition-colors"
                >
                  Create Account
                </button>
              </form>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-gray-200 mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Sign in here</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
