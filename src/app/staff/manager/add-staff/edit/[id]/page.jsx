"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const positions = [
  { title: 'Manager', value: 'manager' },
  { title: 'Receptionist', value: 'receptionist' },
  { title: 'Housekeeping', value: 'housekeeping' },
  { title: 'Chef', value: 'chef' },
  { title: 'Waitstaff', value: 'waitstaff' },
];

export default function EditStaffPage() {
    const { id } = useParams();
    const router = useRouter();
    const [formData, setFormData] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStaff() {
            setLoading(true);
            try {
                const res = await fetch(`/api/staff/manager/add_staff/get_staff?id=${id}`);
                const data = await res.json();
                const staff = data.staff || data.data || {};
                // Set formData to the loaded staff object
                setFormData({
                    staff_id: staff.staff_id || "",
                    first_name: staff.first_name || "",
                    middle_name: staff.middle_name || "",
                    last_name: staff.last_name || "",
                    email: staff.email || "",
                    phone: staff.phone || "",
                    position: staff.position || "",
                    password: staff.password || ""
                });
            } catch (err) {
                setFormData({
                    staff_id: "",
                    first_name: "",
                    middle_name: "",
                    last_name: "",
                    email: "",
                    phone: "",
                    position: "",
                    password: ""
                });
            }
            setLoading(false);
        }
        fetchStaff();
    }, [id]);

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

    const validateForm = () => {
        const newErrors = {};
        if (!formData.staff_id?.trim()) newErrors.staff_id = "Staff ID is required";
        if (!formData.first_name?.trim()) newErrors.first_name = "First name is required";
        if (!formData.last_name?.trim()) newErrors.last_name = "Last name is required";
        if (!formData.email?.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
        if (!formData.phone?.trim()) newErrors.phone = "Phone is required";
        if (!formData.position) newErrors.position = "Position is required";
        if (!formData.password?.trim()) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/staff/manager/add_staff/update_staff', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, id }),
            });
            const result = await res.json();
            if (result.success) {
                router.push("/staff/manager/add-staff");
            } else {
                alert(result.message || "Failed to update staff");
            }
        } catch (err) {
            alert("Network error");
        }
        setIsSubmitting(false);
    };

    if (loading || !formData) return <div className="p-6">Loading...</div>;

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
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Edit Staff Member</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Staff ID</label>
                        <input name="staff_id" value={formData.staff_id} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
                        {errors.staff_id && <p className="text-red-500 text-xs">{errors.staff_id}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">First Name</label>
                        <input name="first_name" value={formData.first_name} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
                        {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Middle Name</label>
                        <input name="middle_name" value={formData.middle_name} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Last Name</label>
                        <input name="last_name" value={formData.last_name} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
                        {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input name="email" value={formData.email} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Position</label>
                        <select
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">Select a position</option>
                            {positions.map(pos => (
                                <option key={pos.value} value={pos.value}>
                                    {pos.title}
                                </option>
                            ))}
                        </select>
                        {errors.position && <p className="text-red-500 text-xs">{errors.position}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input name="password" type="password" value={formData.password} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>
                    <button className="w-full px-4 py-2 bg-rose-600 text-white rounded" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
}
