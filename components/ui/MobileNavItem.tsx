"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuItem } from "@/data/menuItems";

interface MobileNavItemProps {
    item: MenuItem;
    depth?: number;
}

const MobileNavItem = ({ item, depth = 0 }: MobileNavItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
        return (
            <div className="w-full">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center justify-between w-full py-2 border-b border-gray-50 text-gray-700 font-medium hover:text-red-600 ${depth > 0 ? "pl-4 text-sm" : ""
                        }`}
                >
                    {item.label}
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="bg-gray-50">
                        {item.children!.map((child, index) => (
                            <MobileNavItem key={index} item={child} depth={depth + 1} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            href={item.href}
            className={`block w-full py-2 border-b border-gray-50 text-gray-700 font-medium hover:text-red-600 ${depth > 0 ? "pl-8 text-sm text-gray-600" : ""
                }`}
        >
            {item.label}
        </Link>
    );
};

export default MobileNavItem;
