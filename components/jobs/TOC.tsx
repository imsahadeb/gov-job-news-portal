"use client";

import { useEffect, useState } from 'react';
import { Section } from '@/data/jobs';

interface TOCProps {
    sections: Section[];
}

export default function TOC({ sections }: TOCProps) {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -60% 0px' }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // Offset for sticky header
                behavior: 'smooth'
            });
            setActiveSection(id);
        }
    };

    return (
        <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 hidden lg:block">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pl-4 border-l-4 border-transparent">
                Table of Contents
            </h3>
            <ul className="space-y-1">
                {sections.map((section) => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            onClick={(e) => scrollToSection(e, section.id)}
                            className={`block py-2 pl-4 border-l-4 text-sm font-medium transition-all duration-200 ${activeSection === section.id
                                    ? 'border-red-600 text-red-700 bg-red-50'
                                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                }`}
                        >
                            {section.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
