"use client"
import { useState } from "react"

export default function CreateStaffPage() {
    const [formData, setFormData] = useState({
        staff_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone: "",
        position: "",
        password: "",
        image: null
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const positions = [
        { title: 'Manager', value: 'manager' },
        { title: 'Receptionist', value: 'receptionist' },
        { title: 'Housekeeping', value: 'housekeeping' },
        { title: 'Chef', value: 'chef' },
        { title: 'Waitstaff', value: 'waitstaff' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({
                    ...prev,
                    image: "Please select a valid image file"
                }));
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    image: "Image size should be less than 5MB"
                }));
                return;
            }
            setFormData(prev => ({
                ...prev,
                image: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            if (errors.image) {
                setErrors(prev => ({
                    ...prev,
                    image: ""
                }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.staff_id.trim()) {
            newErrors.staff_id = "Staff ID is required";
        }

        if (!formData.first_name.trim()) {
            newErrors.first_name = "First name is required";
        }

        if (!formData.last_name.trim()) {
            newErrors.last_name = "Last name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        if (!formData.position) {
            newErrors.position = "Position is required";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null) {
                    submitData.append(key, formData[key]);
                }
            });

            const response = await fetch('/api/staff/manager/add_staff', {
                method: 'POST',
                body: submitData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setModalType("success");
                setModalMessage("Staff member added successfully!");
                setShowModal(true);
                setFormData({
                    staff_id: "",
                    first_name: "",
                    middle_name: "",
                    last_name: "",
                    email: "",
                    phone: "",
                    position: "",
                    password: "",
                    image: null
                });
                setImagePreview(null);
            } else {
                throw new Error(data.message || "Failed to add staff member");
            }
        } catch (error) {
            setModalType("error");
            setModalMessage(error.message || "An error occurred while adding staff member");
            setShowModal(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalMessage("");
        setModalType("");
    };

    const clearForm = () => {
        setFormData({
            staff_id: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            phone: "",
            position: "",
            password: "",
            image: null
        });
        setImagePreview(null);
        setErrors({});
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div>
                <a href="/staff/manager/add-staff" className="bg-black px-4 py-2 rounded-md text-white">Back</a>
            </div>
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Add New Staff Member</h1>
                    <p className="text-gray-600 mt-2">Fill in the details to add a new staff member to the system</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Image
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="image"
                                        className="cursor-pointer inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors"
                                    >
                                        Choose Image
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
                                </div>
                            </div>
                            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="staff_id" className="block text-sm font-medium text-gray-700 mb-1">
                                    Staff ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="staff_id"
                                    name="staff_id"
                                    value={formData.staff_id}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                                        errors.staff_id ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="E.g. ST123"
                                />
                                {errors.staff_id && <p className="text-red-500 text-sm mt-1">{errors.staff_id}</p>}
                            </div>

                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                                        errors.first_name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="John"
                                />
                                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                            </div>

                            <div>
                                <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    id="middle_name"
                                    name="middle_name"
                                    value={formData.middle_name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Optional"
                                />
                            </div>

                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                                        errors.last_name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Doe"
                                />
                                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="john.doe@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                                        errors.phone ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="0541234567"
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                                Position <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="position"
                                name="position"
                                value={formData.position}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                                    errors.position ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select a position</option>
                                {positions.map(pos => (
                                    <option key={pos.value} value={pos.value}>
                                        {pos.title}
                                    </option>
                                ))}
                            </select>
                            {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Min. 8 characters"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`flex-1 px-6 py-3 rounded-md font-medium text-white transition-colors ${
                                    isSubmitting
                                        ? 'bg-red-400 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700'
                                }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding Staff...
                                    </span>
                                ) : (
                                    'Add Staff Member'
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={clearForm}
                                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-center mb-4">
                            {modalType === "success" ? (
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                            ) : (
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </div>
                            )}
                        </div>
                        <h3 className={`text-xl font-semibold text-center mb-2 ${
                            modalType === "success" ? "text-green-900" : "text-red-900"
                        }`}>
                            {modalType === "success" ? "Success!" : "Error"}
                        </h3>
                        <p className="text-gray-600 text-center mb-6">{modalMessage}</p>
                        <button
                            onClick={closeModal}
                            className={`w-full px-4 py-2 rounded-md font-medium text-white transition-colors ${
                                modalType === "success"
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-red-600 hover:bg-red-700"
                            }`}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}