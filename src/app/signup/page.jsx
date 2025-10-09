"use client"
import React from "react";
import { Building2, User, Mail, Phone, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { set } from "sanity";
import { useRouter } from "next/navigation";

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
    confirmPassword: "",
  });
  const [error, setError] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const router = useRouter();

  // Controlled input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation function
  const handleValidation = () => {
    const newError = {};
    const { password, confirmPassword, email, first_name, last_name, phone, gender } = formData;

    if (!first_name) newError.first_name = "First name is required.";
    if (!last_name) newError.last_name = "Last name is required.";
    if (!email) newError.email = "Email is required.";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newError.email = "Please enter a valid email address.";
    }
    if (!phone) newError.phone = "Phone number is required.";
    else {
      // Ghana network operator indicators
      const operatorIndicators = [
        "020", "050", "024", "025", "055", "059", "026", "057", "056"
      ];
      // Remove non-digit characters
      const phoneDigits = phone.replace(/\D/g, "");
      const prefix = phoneDigits.substring(0, 3);
      if (
        phoneDigits.length !== 10 ||
        !operatorIndicators.includes(prefix)
      ) {
        newError.phone = "Phone number must be 10 digits and start with a valid network operator code.";
      }
    }
    if (!gender) newError.gender = "Gender is required.";
    if (!password) newError.password = "Password is required.";
    if (!confirmPassword) newError.confirmPassword = "Please confirm your password.";
    if (password && confirmPassword && password !== confirmPassword)
      newError.confirmPassword = "Passwords do not match.";

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error("Invalid server response");
      }

      if (data && data.success) {
        setModal({
          isOpen: true,
          title: "Success",
          message: "Account created successfully! Redirecting...",
          isSuccess: true,
        });
        setLoading(false);
        setTimeout(() => {
          setModal({ isOpen: false, title: "", message: "" });
          router.push("/"); // Change to your login route
        }, 1000);
      } else {
        setModal({
          isOpen: true,
          title: "Error",
          message: data?.message || "Signup failed.",
          isSuccess: false,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setModal({
        isOpen: true,
        title: "Error",
        message: "An error occurred while signing up. Please try again.",
        isSuccess: false,
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 to-rose-950 text-sm font-sans">
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4">{modal.title}</h2>
            <p className="mb-6">{modal.message}</p>
            {modal.isSuccess ? (
              <div className="flex flex-col items-center justify-center">
                <span className="w-8 h-8 border-4 border-rose-500 border-t-transparent border-b-transparent rounded-full animate-spin mb-2"></span>
                <span className="text-rose-500 font-semibold">Redirecting...</span>
              </div>
            ) : (
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 px-4 py-2 text-white font-semibold rounded-sm w-auto"
                  onClick={() =>
                    setModal({ isOpen: false, title: "", message: "" })
                  }
                >
                  Ok
                </button>
              </div>
            )}
          </div>
        </div>
      )}
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

              <form className="space-y-4" onSubmit={handleSignup}>
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
                        name="first_name"
                        type="text"
                        placeholder="John"
                        className="pl-10 h-12 w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                        required
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                    </div>
                    {error.first_name && <p className="text-rose-600 text-sm mt-1">{error.first_name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        id="lastName"
                        name="last_name"
                        type="text"
                        placeholder="Doe"
                        className="pl-10 h-12 w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                        required
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </div>
                    {error.last_name && <p className="text-rose-600 text-sm mt-1">{error.last_name}</p>}
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
                      name="middle_name"
                      type="text"
                      placeholder="Middle name"
                      className="pl-10 h-12 w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                      value={formData.middle_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Gender *</label>
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="M"
                        className="form-radio text-blue-600"
                        required
                        checked={formData.gender === "M"}
                        onChange={handleChange}
                      />
                      <span className="text-sm">Male</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="F"
                        className="form-radio text-blue-600"
                        checked={formData.gender === "F"}
                        onChange={handleChange}
                      />
                      <span className="text-sm">Female</span>
                    </label>
                  </div>
                  {error.gender && <p className="text-rose-600 text-sm mt-1">{error.gender}</p>}
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
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className="pl-10 h-12 w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {error.email && <p className="text-rose-600 text-sm mt-1">{error.email}</p>}
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
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="pl-10 h-12 w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  {error.phone && <p className="text-rose-600 text-sm mt-1">{error.phone}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="pl-3 pr-10 h-12 w-full border border-gray-200 rounded-lg focus:border-rose-500 focus:ring focus:ring-rose-200"
                      required
                      value={formData.password}
                      onChange={handleChange}
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
                  {error.password && <p className="text-rose-600 text-sm mt-1">{error.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-3 pr-10 h-12 w-full border border-gray-200 rounded-lg focus:border-rose-500 focus:ring focus:ring-rose-200"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
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
                  {error.confirmPassword && <p className="text-rose-600 text-sm mt-1">{error.confirmPassword}</p>}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    checked={!!formData.terms}
                    onChange={handleChange}
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
                  className="w-full h-12 bg-rose-600 hover:bg-rose-800 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent border-b-transparent rounded-full animate-spin mr-2"></span>
                      Creating Account
                    </>
                  ) : (
                    "Create Account"
                  )}
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
