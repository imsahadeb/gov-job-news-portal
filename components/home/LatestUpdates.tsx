import Link from "next/link";
import { LATEST_JOBS, ADMIT_CARDS, RESULTS } from "@/data/homeData";

const UpdateCard = ({ title, items, colorClass }: { title: string, items: { label: string, href: string, isNew?: boolean }[], colorClass: string }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className={`px-4 py-3 border-b flex justify-between items-center ${colorClass} text-white`}>
            <h3 className="font-bold text-lg">{title}</h3>
            <Link href="#" className="text-xs hover:underline opacity-90">View All</Link>
        </div>
        <ul className="divide-y divide-gray-100">
            {items.map((item, idx) => (
                <li key={idx} className="hover:bg-gray-50 transition-colors">
                    <Link href={item.href} className="flex items-start px-4 py-3">
                        {item.isNew && (
                            <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded mr-2 mt-1">NEW</span>
                        )}
                        <span className="text-sm text-gray-700 leading-snug">{item.label}</span>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const LatestUpdates = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Latest Updates</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <UpdateCard title="Latest Jobs" items={LATEST_JOBS} colorClass="bg-blue-600" />
                    <UpdateCard title="Admit Cards" items={ADMIT_CARDS} colorClass="bg-green-600" />
                    <UpdateCard title="Results" items={RESULTS} colorClass="bg-red-600" />
                </div>
            </div>
        </section>
    );
};

export default LatestUpdates;
