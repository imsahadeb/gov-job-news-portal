"use client";

import Link from "next/link";
import { MenuItem } from "@/data/menuItems";

interface NavDropdownProps {
    label: string;
    items: MenuItem[];
}

const NavDropdown = ({ label, items }: NavDropdownProps) => {
    return (
        <div className="relative group h-full flex items-center">
            <button className="text-gray-700 hover:text-red-600 font-medium text-sm flex items-center h-full">
                {label}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div className="absolute left-0 top-full mt-0 w-56 bg-white border border-gray-200 shadow-lg rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 py-2">
                {items.map((item, index) => (
                    <div key={index} className="relative group/nested">
                        {item.children ? (
                            <>
                                <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 flex justify-between items-center border-b border-gray-100 last:border-0">
                                    {item.label}
                                    <svg className="w-4 h-4 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                <div className="absolute left-full top-0 w-48 bg-white border border-gray-200 shadow-lg rounded-md invisible opacity-0 group-hover/nested:visible group-hover/nested:opacity-100 transition-all duration-200 -ml-1">
                                    {item.children.map((child, childIndex) => (
                                        <Link
                                            key={childIndex}
                                            href={child.href}
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 border-b border-gray-100 last:border-0"
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <Link
                                href={item.href}
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 border-b border-gray-100 last:border-0"
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavDropdown;
