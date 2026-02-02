"use client";

import Link from "next/link";
import { useState } from "react";

const HeroSection = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <section className="bg-red-600 py-12 md:py-16 text-white relative overflow-hidden">
            {/* Background Pattern (Optional) */}
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Your Success, Your Way.
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    India's No.1 Government Jobs Preparation Platform. Prepare for Banking, SSC, Railways, and State Exams.
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 flex items-center shadow-lg mb-8">
                    <input
                        type="text"
                        placeholder="Search for exams, job alerts..."
                        className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="bg-gray-900 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors">
                        Search
                    </button>
                </div>

                {/* Quick Blocks */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/exams/bank" className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-all">
                        Banking
                    </Link>
                    <Link href="/exams/ssc" className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-all">
                        SSC
                    </Link>
                    <Link href="/exams/railway" className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-all">
                        Railways
                    </Link>
                    <Link href="/exams/teaching" className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-all">
                        Teaching
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
