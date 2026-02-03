"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, FileText, Lock, Upload, Save, Loader2, Linkedin, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileSettingsProps {
    user: any;
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [activeTab, setActiveTab] = useState<'profile' | 'documents' | 'security'>('profile');

    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "", // Read-only mostly
        mobile: user.mobile || "",
        address: user.address || "",
        dob: user.dob ? user.dob.split('T')[0] : "", // Format YYYY-MM-DD
        sex: user.sex || "",
        bio: user.bio || "",
        linkedin_url: user.linkedin_url || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'photo') => {
        if (e.target.files && e.target.files[0]) {
            if (type === 'resume') setResumeFile(e.target.files[0]);
            if (type === 'photo') setPhotoFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        // Basic validation
        if (activeTab === 'security') {
            if (formData.newPassword !== formData.confirmPassword) {
                setMessage({ type: 'error', text: "New passwords do not match" });
                setIsLoading(false);
                return;
            }
            if (!formData.currentPassword) {
                setMessage({ type: 'error', text: "Current password is required to set a new one" });
                setIsLoading(false);
                return;
            }
        }

        try {
            const data = new FormData();
            // Append all text fields
            Object.keys(formData).forEach(key => {
                // Only append password fields if in security tab and they are set
                if (['currentPassword', 'newPassword', 'confirmPassword'].includes(key)) {
                    if (activeTab === 'security' && (formData as any)[key]) {
                        data.append(key, (formData as any)[key]);
                    }
                } else {
                    data.append(key, (formData as any)[key]);
                }
            });

            if (resumeFile) data.append('resume', resumeFile);
            if (photoFile) data.append('photo', photoFile);

            const res = await fetch('/api/user/update', {
                method: 'POST',
                body: data,
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || 'Failed to update profile');
            }

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            router.refresh(); // Refresh server components to show new data (like header name/avatar)

            // Clear passwords
            setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
            setResumeFile(null);
            setPhotoFile(null);

        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'profile'
                            ? 'text-red-600 border-b-2 border-red-600'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    <div className="flex items-center space-x-2">
                        <User size={18} />
                        <span>Personal Details</span>
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('documents')}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'documents'
                            ? 'text-red-600 border-b-2 border-red-600'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    <div className="flex items-center space-x-2">
                        <FileText size={18} />
                        <span>Resume & Docs</span>
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('security')}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'security'
                            ? 'text-red-600 border-b-2 border-red-600'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    <div className="flex items-center space-x-2">
                        <Lock size={18} />
                        <span>Security</span>
                    </div>
                </button>
            </div>

            <div className="p-6">
                {message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            {/* Bio section */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Bio / Professional Summary</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Tell us a bit about yourself..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email Address (Read Only)</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            readOnly
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                            placeholder="+91 9876543210"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Gender</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-2.5 flex items-center pointer-events-none">
                                            <UserCircle className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            name="sex"
                                            value={formData.sex}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">LinkedIn Profile</label>
                                    <div className="relative">
                                        <Linkedin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                        <input
                                            type="url"
                                            name="linkedin_url"
                                            value={formData.linkedin_url}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Enter your full address"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-8">
                            {/* Profile Photo Upload */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Profile Photo</h3>
                                <div className="flex items-start space-x-6">
                                    <div className="shrink-0">
                                        {photoFile ? (
                                            <img src={URL.createObjectURL(photoFile)} alt="Preview" className="h-24 w-24 object-cover rounded-full border border-gray-200" />
                                        ) : user.image ? (
                                            <img src={user.image} alt="Current" className="h-24 w-24 object-cover rounded-full border border-gray-200" />
                                        ) : (
                                            <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                <User size={32} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col space-y-2">
                                            <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer w-fit">
                                                <Upload className="h-4 w-4 mr-2" />
                                                Change Photo
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'photo')} />
                                            </label>
                                            <p className="text-sm text-gray-500">JPG, GIF or PNG. Max size of 2MB.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Resume Upload */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Resume / CV</h3>
                                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-400 transition-colors">
                                    <div className="flex flex-col items-center">
                                        <div className="p-3 bg-red-50 rounded-full mb-3">
                                            <FileText className="h-8 w-8 text-red-600" />
                                        </div>

                                        {user.resume_url && !resumeFile && (
                                            <div className="mb-4">
                                                <p className="text-sm font-medium text-green-600">Current Resume Available</p>
                                                <a href={user.resume_url} target="_blank" rel="noreferrer" className="text-xs text-red-600 hover:underline">View Current Resume</a>
                                            </div>
                                        )}

                                        {resumeFile && (
                                            <div className="mb-4">
                                                <p className="text-sm font-medium text-gray-900">Selected: {resumeFile.name}</p>
                                            </div>
                                        )}

                                        <label className="cursor-pointer">
                                            <span className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition shadow-sm">
                                                Upload New Resume
                                            </span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) => handleFileChange(e, 'resume')}
                                            />
                                        </label>
                                        <p className="text-xs text-gray-500 mt-3">PDF, DOC, DOCX up to 5MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="max-w-md mx-auto space-y-6">
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                                To change your password, you must verify your current password first.
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Current Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-5 w-5 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
