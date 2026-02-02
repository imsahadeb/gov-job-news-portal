import Link from "next/link";
import { STATE_LIST } from "@/data/homeData";

const StateJobsSection = () => {

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">State Wise Govt Jobs</h2>
                    <Link href="/state-exams" className="text-red-600 font-medium hover:underline">View All States</Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {STATE_LIST.map((state, index) => (
                        <Link
                            key={index}
                            href={`/state-exams/${state.toLowerCase().replace(/ /g, '-')}`}
                            className="bg-gray-50 hover:bg-red-50 hover:border-red-200 border border-transparent rounded-lg p-4 text-center transition-all group"
                        >
                            <span className="text-gray-700 font-medium group-hover:text-red-600 truncate block">
                                {state}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StateJobsSection;
