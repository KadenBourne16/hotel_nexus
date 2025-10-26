"use client"

import { useState } from "react";
import { Bell, Shield, CreditCard, Globe, Moon, Sun, Smartphone, Mail, MessageSquare, Lock, Eye, EyeOff, Trash2, Download, AlertCircle, Check } from "lucide-react";

export default function Settings() {
    const [activeTab, setActiveTab] = useState('notifications');
    const [darkMode, setDarkMode] = useState(false);
    const [settings, setSettings] = useState({
        // Notifications
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        bookingConfirmations: true,
        promotionalEmails: false,
        bookingReminders: true,
        priceAlerts: true,
        
        // Privacy & Security
        twoFactorAuth: false,
        showProfile: true,
        shareBookingHistory: false,
        
        // Payment
        savePaymentMethods: true,
        autoFillPayment: false,
        
        // Preferences
        currency: "GHc",
        language: "English",
        temperature: "Celsius",
        dateFormat: "DD/MM/YYYY"
    });

    const [showPassword, setShowPassword] = useState(false);

    const toggleSetting = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const handleSelectChange = (key, value) => {
        setSettings({ ...settings, [key]: value });
    };

    const tabs = [
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy & Security', icon: Shield },
        { id: 'payment', label: 'Payment Methods', icon: CreditCard },
        { id: 'preferences', label: 'Preferences', icon: Globe },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Settings</h1>
                    <p className="text-slate-600">Manage your account preferences and settings</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-200 sticky top-6">
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-all ${
                                                activeTab === tab.id
                                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                                    : 'text-slate-700 hover:bg-slate-50'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="text-sm">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>

                            {/* Dark Mode Toggle */}
                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        {darkMode ? <Moon className="w-5 h-5 text-slate-600" /> : <Sun className="w-5 h-5 text-amber-500" />}
                                        <span className="text-sm font-medium text-slate-700">Dark Mode</span>
                                    </div>
                                    <button
                                        onClick={() => setDarkMode(!darkMode)}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${
                                            darkMode ? 'bg-blue-600' : 'bg-slate-300'
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                darkMode ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                            {/* Notifications Tab */}
                            {activeTab === 'notifications' && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-blue-100 rounded-xl">
                                            <Bell className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-800">Notification Preferences</h2>
                                            <p className="text-slate-500">Choose how you want to be notified</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Channel Preferences */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Notification Channels</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                                                    <div className="flex items-center gap-3">
                                                        <Mail className="w-5 h-5 text-slate-600" />
                                                        <div>
                                                            <p className="font-medium text-slate-800">Email Notifications</p>
                                                            <p className="text-sm text-slate-500">Receive updates via email</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => toggleSetting('emailNotifications')}
                                                        className={`relative w-12 h-6 rounded-full transition-colors ${
                                                            settings.emailNotifications ? 'bg-green-500' : 'bg-slate-300'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                                settings.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                                                            }`}
                                                        />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                                                    <div className="flex items-center gap-3">
                                                        <MessageSquare className="w-5 h-5 text-slate-600" />
                                                        <div>
                                                            <p className="font-medium text-slate-800">SMS Notifications</p>
                                                            <p className="text-sm text-slate-500">Get text message updates</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => toggleSetting('smsNotifications')}
                                                        className={`relative w-12 h-6 rounded-full transition-colors ${
                                                            settings.smsNotifications ? 'bg-green-500' : 'bg-slate-300'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                                settings.smsNotifications ? 'translate-x-6' : 'translate-x-0'
                                                            }`}
                                                        />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                                                    <div className="flex items-center gap-3">
                                                        <Smartphone className="w-5 h-5 text-slate-600" />
                                                        <div>
                                                            <p className="font-medium text-slate-800">Push Notifications</p>
                                                            <p className="text-sm text-slate-500">Receive in-app notifications</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => toggleSetting('pushNotifications')}
                                                        className={`relative w-12 h-6 rounded-full transition-colors ${
                                                            settings.pushNotifications ? 'bg-green-500' : 'bg-slate-300'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                                settings.pushNotifications ? 'translate-x-6' : 'translate-x-0'
                                                            }`}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Preferences */}
                                        <div className="pt-6 border-t border-slate-200">
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4">What to notify me about</h3>
                                            <div className="space-y-3">
                                                {[
                                                    { key: 'bookingConfirmations', label: 'Booking confirmations and updates', icon: Check },
                                                    { key: 'bookingReminders', label: 'Reminders before check-in', icon: Bell },
                                                    { key: 'priceAlerts', label: 'Price drops and special offers', icon: AlertCircle },
                                                    { key: 'promotionalEmails', label: 'Promotional emails and newsletters', icon: Mail },
                                                ].map((item) => {
                                                    const Icon = item.icon;
                                                    return (
                                                        <div key={item.key} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                                                            <div className="flex items-center gap-3">
                                                                <Icon className="w-4 h-4 text-slate-500" />
                                                                <span className="text-slate-700">{item.label}</span>
                                                            </div>
                                                            <button
                                                                onClick={() => toggleSetting(item.key)}
                                                                className={`relative w-12 h-6 rounded-full transition-colors ${
                                                                    settings[item.key] ? 'bg-green-500' : 'bg-slate-300'
                                                                }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                                        settings[item.key] ? 'translate-x-6' : 'translate-x-0'
                                                                    }`}
                                                                />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Privacy & Security Tab */}
                            {activeTab === 'privacy' && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-green-100 rounded-xl">
                                            <Shield className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-800">Privacy & Security</h2>
                                            <p className="text-slate-500">Manage your account security settings</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Two-Factor Authentication */}
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <Lock className="w-6 h-6 text-green-600" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-slate-800">Two-Factor Authentication</h3>
                                                        <p className="text-sm text-slate-600 mt-1">Add an extra layer of security to your account</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => toggleSetting('twoFactorAuth')}
                                                    className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                                                        settings.twoFactorAuth ? 'bg-green-500' : 'bg-slate-300'
                                                    }`}
                                                >
                                                    <span
                                                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                            settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                            {settings.twoFactorAuth && (
                                                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                                                    Configure 2FA
                                                </button>
                                            )}
                                        </div>

                                        {/* Change Password */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Change Password</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            placeholder="Enter current password"
                                                        />
                                                        <button
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                                        >
                                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                                                    <input
                                                        type="password"
                                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        placeholder="Enter new password"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                                                    <input
                                                        type="password"
                                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        placeholder="Confirm new password"
                                                    />
                                                </div>
                                                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md">
                                                    Update Password
                                                </button>
                                            </div>
                                        </div>

                                        {/* Privacy Settings */}
                                        <div className="pt-6 border-t border-slate-200">
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Privacy Settings</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                                                    <span className="text-slate-700">Show my profile to other users</span>
                                                    <button
                                                        onClick={() => toggleSetting('showProfile')}
                                                        className={`relative w-12 h-6 rounded-full transition-colors ${
                                                            settings.showProfile ? 'bg-green-500' : 'bg-slate-300'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                                settings.showProfile ? 'translate-x-6' : 'translate-x-0'
                                                            }`}
                                                        />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                                                    <span className="text-slate-700">Share booking history for recommendations</span>
                                                    <button
                                                        onClick={() => toggleSetting('shareBookingHistory')}
                                                        className={`relative w-12 h-6 rounded-full transition-colors ${
                                                            settings.shareBookingHistory ? 'bg-green-500' : 'bg-slate-300'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                                settings.shareBookingHistory ? 'translate-x-6' : 'translate-x-0'
                                                            }`}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Payment Methods Tab */}
                            {activeTab === 'payment' && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-purple-100 rounded-xl">
                                            <CreditCard className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-800">Payment Methods</h2>
                                            <p className="text-slate-500">Manage your saved payment options</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Payment Settings */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                                                <div>
                                                    <p className="font-medium text-slate-800">Save payment methods</p>
                                                    <p className="text-sm text-slate-500">Store cards securely for faster checkout</p>
                                                </div>
                                                <button
                                                    onClick={() => toggleSetting('savePaymentMethods')}
                                                    className={`relative w-12 h-6 rounded-full transition-colors ${
                                                        settings.savePaymentMethods ? 'bg-green-500' : 'bg-slate-300'
                                                    }`}
                                                >
                                                    <span
                                                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                            settings.savePaymentMethods ? 'translate-x-6' : 'translate-x-0'
                                                        }`}
                                                    />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                                                <div>
                                                    <p className="font-medium text-slate-800">Auto-fill payment information</p>
                                                    <p className="text-sm text-slate-500">Use saved card by default</p>
                                                </div>
                                                <button
                                                    onClick={() => toggleSetting('autoFillPayment')}
                                                    className={`relative w-12 h-6 rounded-full transition-colors ${
                                                        settings.autoFillPayment ? 'bg-green-500' : 'bg-slate-300'
                                                    }`}
                                                >
                                                    <span
                                                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                            settings.autoFillPayment ? 'translate-x-6' : 'translate-x-0'
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Saved Cards */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Saved Cards</h3>
                                            <div className="space-y-3">
                                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-5 text-white">
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div>
                                                            <p className="text-sm text-blue-100">Primary Card</p>
                                                            <p className="text-xs text-blue-200 mt-1">Visa</p>
                                                        </div>
                                                        <CreditCard className="w-8 h-8 text-white opacity-80" />
                                                    </div>
                                                    <p className="text-xl font-mono mb-4 tracking-wider">•••• •••• •••• 4242</p>
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="text-xs text-blue-200">Expires</p>
                                                            <p className="text-sm font-semibold">12/25</p>
                                                        </div>
                                                        <button className="text-sm bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
                                                            Default
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="bg-slate-100 rounded-xl p-5 border-2 border-dashed border-slate-300">
                                                    <button className="w-full flex items-center justify-center gap-2 text-slate-600 hover:text-slate-800 font-medium">
                                                        <CreditCard className="w-5 h-5" />
                                                        Add New Payment Method
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Preferences Tab */}
                            {activeTab === 'preferences' && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-orange-100 rounded-xl">
                                            <Globe className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-800">Preferences</h2>
                                            <p className="text-slate-500">Customize your experience</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Regional Settings */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Regional Settings</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                                                    <select
                                                        value={settings.language}
                                                        onChange={(e) => handleSelectChange('language', e.target.value)}
                                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                    >
                                                        <option>English</option>
                                                        <option>Spanish</option>
                                                        <option>French</option>
                                                        <option>German</option>
                                                        <option>Chinese</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                                                    <select
                                                        value={settings.currency}
                                                        onChange={(e) => handleSelectChange('currency', e.target.value)}
                                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                    >
                                                        <option>USD - US Dollar</option>
                                                        <option>EUR - Euro</option>
                                                        <option>GBP - British Pound</option>
                                                        <option>GHS - Ghanaian Cedi</option>
                                                        <option>JPY - Japanese Yen</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">Temperature Unit</label>
                                                    <select
                                                        value={settings.temperature}
                                                        onChange={(e) => handleSelectChange('temperature', e.target.value)}
                                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                    >
                                                        <option>Celsius</option>
                                                        <option>Fahrenheit</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">Date Format</label>
                                                    <select
                                                        value={settings.dateFormat}
                                                        onChange={(e) => handleSelectChange('dateFormat', e.target.value)}
                                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                    >
                                                        <option>DD/MM/YYYY</option>
                                                        <option>MM/DD/YYYY</option>
                                                        <option>YYYY-MM-DD</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Data & Storage */}
                                        <div className="pt-6 border-t border-slate-200">
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Data & Storage</h3>
                                            <div className="space-y-3">
                                                <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <Download className="w-5 h-5 text-blue-600" />
                                                        <div className="text-left">
                                                            <p className="font-medium text-slate-800">Download My Data</p>
                                                            <p className="text-sm text-slate-500">Get a copy of your account data</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-blue-600 text-sm font-semibold">Export</span>
                                                </button>

                                                <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200 hover:bg-red-100 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <Trash2 className="w-5 h-5 text-red-600" />
                                                        <div className="text-left">
                                                            <p className="font-medium text-slate-800">Delete Account</p>
                                                            <p className="text-sm text-slate-500">Permanently delete your account and all data</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-red-600 text-sm font-semibold">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Save Button */}
                            <div className="pt-8 border-t border-slate-200 flex justify-end">
                                <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md">
                                    <Check className="w-5 h-5" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}