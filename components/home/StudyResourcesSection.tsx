import Link from "next/link";
import { STUDY_RESOURCES_DATA } from "@/data/homeData";

const ResourceCard = ({ title, description, icon, href, colorClass }: { title: string, description: string, icon: any, href: string, colorClass: string }) => (
    <Link href={href} className="group block h-full">
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${colorClass} hover:border-current`}>
            <div className="mb-4 text-gray-700 group-hover:scale-110 transition-transform duration-300 ease-in-out inline-block">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
    </Link>
);

const ICONS: Record<string, JSX.Element> = {
    "syllabus": <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>,
    "previous-papers": <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>,
    "mock-tests": <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
};

const StudyResourcesSection = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Study Resources</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {STUDY_RESOURCES_DATA.map((item) => (
                        <ResourceCard
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            href={item.href}
                            colorClass={item.colorClass}
                            icon={ICONS[item.id]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StudyResourcesSection;
