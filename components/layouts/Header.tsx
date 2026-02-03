"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import NavDropdown from "../ui/NavDropdown";
import MobileNavItem from "../ui/MobileNavItem";
import { EXAMS_MENU, RECENT_EXAMS_MENU } from "@/data/menuItems";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout, loading } = useAuth();

    return (
        <header className="font-sans sticky top-0 z-50 bg-white">


            {/* Main Navigation */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-red-600">GOVT</span>
                            <span className="text-2xl font-bold text-gray-800 ml-1">JOBS</span>
                        </Link>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex space-x-6 items-center h-full">
                            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium text-sm">HOME</Link>
                            <Link href="/current-affairs" className="text-gray-700 hover:text-red-600 font-medium text-sm">CURRENT AFFAIRS</Link>

                            <NavDropdown label="EXAMS" items={EXAMS_MENU} />
                            <NavDropdown label="RECENT EXAMS" items={RECENT_EXAMS_MENU} />

                            <Link href="/job-alerts" className="text-gray-700 hover:text-red-600 font-medium text-sm">JOB ALERTS</Link>
                            <Link href="/state-exams" className="text-gray-700 hover:text-red-600 font-medium text-sm">STATE EXAMS</Link>
                        </nav>

                        {/* Actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button className="text-gray-600 hover:text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            {loading ? (
                                <div className="w-24 h-8 bg-gray-200 animate-pulse rounded"></div>
                            ) : user ? (
                                <div className="flex items-center space-x-4">
                                    <Link href="/dashboard" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-red-600 transition duration-200">
                                        {/* Optional: Add small avatar here if available in user object later */}
                                        <span>Hi, {user.name}</span>
                                    </Link>
                                    <button onClick={logout} className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-200 transition duration-300">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" className="bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-700 transition duration-300">
                                    Login / Sign Up
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700 hover:text-red-600 focus:outline-none"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100">
                        <div className="flex flex-col px-4 py-2 space-y-2">
                            <MobileNavItem item={{ label: "HOME", href: "/" }} />
                            <MobileNavItem item={{ label: "CURRENT AFFAIRS", href: "/current-affairs" }} />

                            <MobileNavItem item={{ label: "EXAMS", href: "#", children: EXAMS_MENU }} />
                            <MobileNavItem item={{ label: "RECENT EXAMS", href: "#", children: RECENT_EXAMS_MENU }} />

                            <MobileNavItem item={{ label: "JOB ALERTS", href: "/job-alerts" }} />
                            <MobileNavItem item={{ label: "STATE EXAMS", href: "/state-exams" }} />

                            {loading ? (
                                <div className="w-full h-10 bg-gray-200 animate-pulse rounded mt-4"></div>
                            ) : user ? (
                                <div className="flex flex-col space-y-2 mt-4">
                                    <Link href="/dashboard" className="text-sm font-semibold text-gray-700 text-center hover:text-red-600 py-2">
                                        Hi, {user.name}
                                    </Link>
                                    <button onClick={logout} className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-200">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-700 mt-4">
                                    Login / Sign Up
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
