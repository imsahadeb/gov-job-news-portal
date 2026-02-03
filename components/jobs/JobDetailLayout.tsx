import { ReactNode } from 'react';

interface JobDetailLayoutProps {
    children: ReactNode;
    sidebar: ReactNode;
}

export default function JobDetailLayout({ children, sidebar }: JobDetailLayoutProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Area */}
                <main className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
                    {children}
                </main>

                {/* Sidebar (TOC + Other potential widgets) */}
                <aside className="hidden lg:block lg:col-span-1">
                    {sidebar}
                </aside>
            </div>
        </div>
    );
}
