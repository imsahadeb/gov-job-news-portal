import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 font-sans">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Column 1: About */}
                    <div>
                        <div className="flex items-center mb-4">
                            <span className="text-2xl font-bold text-white">GOVT</span>
                            <span className="text-2xl font-bold text-red-500 ml-1">JOBS</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                            India's No.1 Government Jobs Preparation Platform. Prepare for Banking, SSC, Railways, State Level Exams with us.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-white">
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </Link>
                            <Link href="#" className="hover:text-white">
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                            </Link>
                            <Link href="#" className="hover:text-white">
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                            </Link>
                            <Link href="#" className="hover:text-white">
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about-us" className="hover:text-red-500 transition-colors">About Us</Link></li>
                            <li><Link href="/contact-us" className="hover:text-red-500 transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-red-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-conditions" className="hover:text-red-500 transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/sitemap" className="hover:text-red-500 transition-colors">Sitemap</Link></li>
                            <li><Link href="/careers" className="hover:text-red-500 transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Exams */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">Popular Exams</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/banking" className="hover:text-red-500 transition-colors">Banking Exams</Link></li>
                            <li><Link href="/ssc" className="hover:text-red-500 transition-colors">SSC Exams</Link></li>
                            <li><Link href="/railways" className="hover:text-red-500 transition-colors">Railways Exams</Link></li>
                            <li><Link href="/teaching" className="hover:text-red-500 transition-colors">Teaching Exams</Link></li>
                            <li><Link href="/defense" className="hover:text-red-500 transition-colors">Defense Exams</Link></li>
                            <li><Link href="/upsc" className="hover:text-red-500 transition-colors">UPSC Exams</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact/App */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">Get Our App</h3>
                        Download the Govt Jobs App for accessing free study material, quizzes and mock tests.
                        <div className="flex flex-col space-y-3">
                            <button className="bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white py-2 px-4 rounded flex items-center justify-center transition-colors">
                                <span className="text-xs">Download on the</span>
                                <span className="font-bold ml-1">Play Store</span>
                            </button>
                        </div>
                        <div className="mt-6">
                            <h4 className="text-white text-sm font-semibold mb-2">Contact Support</h4>
                            <p className="text-sm text-gray-400">support@govtjobs.in</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="bg-black py-4 border-t border-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-xs text-gray-500">
                        Copyright © {new Date().getFullYear()} Govt Jobs. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
