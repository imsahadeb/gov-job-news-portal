import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { query } from "@/lib/db";
import Link from "next/link";
import { CheckCircle, Mail, Briefcase } from "lucide-react";
import ProfileSettings from "@/components/dashboard/ProfileSettings";

async function getUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return null;

    try {
        const decoded = verifyToken(token);
        if (!decoded) return null;

        const result = await query(
            "SELECT id, name, email, google_id, image, email_verified, created_at, resume_url, address, dob, mobile, sex, bio, linkedin_url FROM users WHERE id = $1",
            [decoded.userId]
        );
        return result.rows[0];
    } catch (err) {
        return null;
    }
}

export default async function DashboardPage() {
    const user = await getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                        {/* Avatar */}
                        <div className="relative">
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center border-4 border-white shadow-md">
                                    <span className="text-3xl font-bold text-red-600">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            {user.email_verified && (
                                <div className="absolute bottom-1 right-1 bg-green-500 text-white p-1 rounded-full border-2 border-white" title="Verified Account">
                                    <CheckCircle size={14} />
                                </div>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                            <div className="flex items-center justify-center md:justify-start text-gray-500 mt-1 space-x-4">
                                <div className="flex items-center space-x-1">
                                    <Mail size={16} />
                                    <span>{user.email}</span>
                                </div>
                                <div className="text-sm">
                                    Member since {new Date(user.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Status</h3>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                <span className="text-gray-600">Email Verification</span>
                                {user.email_verified ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Verified
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Pending
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                <span className="text-gray-600">Login Method</span>
                                <span className="text-gray-800 font-medium capitalize">
                                    {user.google_id ? "Google" : "Email"}
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                                    <Briefcase className="mr-2 text-red-600" size={20} />
                                    Saved Jobs
                                </h2>
                            </div>
                            <div className="text-center py-6">
                                <p className="text-gray-500 text-sm mb-4">No saved jobs yet.</p>
                                <Link href="/" className="text-red-600 hover:text-red-700 text-sm font-medium hover:underline">
                                    Browse Jobs
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content: Profile Settings */}
                    <div className="lg:col-span-3">
                        <ProfileSettings user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
}
