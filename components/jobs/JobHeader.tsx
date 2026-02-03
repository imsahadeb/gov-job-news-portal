import Link from 'next/link';

interface JobHeaderProps {
    title: string;
    lastUpdated: string;
    breadcrumbs: { label: string; href: string }[];
}

export default function JobHeader({ title, lastUpdated, breadcrumbs }: JobHeaderProps) {
    return (
        <div className="mb-8">
            {/* Breadcrumbs */}
            <nav className="flex text-sm text-gray-500 mb-4 overflow-x-auto whitespace-nowrap">
                {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center">
                        {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                        {index === breadcrumbs.length - 1 ? (
                            <span className="text-gray-700 font-medium">{crumb.label}</span>
                        ) : (
                            <Link href={crumb.href} className="hover:text-red-600 transition-colors">
                                {crumb.label}
                            </Link>
                        )}
                    </div>
                ))}
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">
                {title}
            </h1>

            <div className="flex items-center text-sm text-gray-500">
                <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide mr-3">
                    Latest Update
                </span>
                <span>Updated on {lastUpdated}</span>
            </div>

            <hr className="mt-6 border-gray-200" />
        </div>
    );
}
