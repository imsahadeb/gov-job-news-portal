import { notFound } from 'next/navigation';
import { getJobBySlug } from '@/data/jobs';
import JobHeader from '@/components/jobs/JobHeader';
import ContentSection from '@/components/jobs/ContentSection';
import JobDetailLayout from '@/components/jobs/JobDetailLayout';
import TOC from '@/components/jobs/TOC';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function JobPage({ params }: PageProps) {
    const { slug } = await params;
    const job = getJobBySlug(slug);

    if (!job) {
        notFound();
    }

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Jobs', href: '/jobs' }, // Assuming a jobs listing page exists or helps nav
        { label: job.title, href: `/jobs/${job.slug}` },
    ];

    return (
        <JobDetailLayout
            sidebar={<TOC sections={job.sections} />}
        >
            <JobHeader
                title={job.title}
                lastUpdated={job.lastUpdated}
                breadcrumbs={breadcrumbs}
            />

            <div className="mt-8">
                {/* Short Description */}
                <p className="text-lg text-gray-600 mb-8 leading-relaxed italic border-l-4 border-gray-300 pl-4 py-2 bg-gray-50 rounded-r">
                    {job.shortDescription}
                </p>

                {/* Render Sections */}
                {job.sections.map((section) => (
                    <ContentSection key={section.id} section={section} />
                ))}
            </div>

            {/* Simple footer for the article */}
            <div className="mt-12 pt-6 border-t border-gray-100 text-center text-gray-500 text-sm">
                <p>Disclaimer: Details are based on official notifications. Please verify with the official website.</p>
            </div>
        </JobDetailLayout>
    );
}
