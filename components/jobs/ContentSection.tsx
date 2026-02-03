import { Section, TextContent, TableContent, ListContent, AlertContent } from '@/data/jobs';

interface ContentSectionProps {
    section: Section;
}

export default function ContentSection({ section }: ContentSectionProps) {
    return (
        <div id={section.id} className="scroll-mt-24 mb-10 border-b border-gray-100 last:border-0 pb-8 last:pb-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-1.5 h-8 bg-red-600 mr-3 rounded-full"></span>
                {section.title}
            </h2>

            <div className="space-y-6">
                {section.content.map((block, index) => {
                    switch (block.type) {
                        case 'text':
                            return (
                                <div
                                    key={index}
                                    className="prose prose-slate max-w-none text-gray-600 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: block.html }}
                                />
                            );

                        case 'table':
                            return (
                                <div key={index} className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                                    {block.title && <div className="bg-gray-50 px-4 py-2 font-semibold text-gray-700 border-b border-gray-200">{block.title}</div>}
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {block.headers.map((header, hIndex) => (
                                                    <th key={hIndex} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {block.rows.map((row, rIndex) => (
                                                <tr key={rIndex} className="hover:bg-gray-50 transition-colors">
                                                    {row.map((cell, cIndex) => (
                                                        <td key={cIndex} className="px-6 py-4 text-sm text-gray-600 whitespace-pre-wrap">
                                                            {cell}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            );

                        case 'list':
                            return (
                                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                    {block.title && <h3 className="font-semibold text-gray-800 mb-3">{block.title}</h3>}
                                    <ul className={`space-y-2 text-gray-600 ${block.ordered ? 'list-decimal' : 'list-disc'} list-inside`}>
                                        {block.items.map((item, iIndex) => (
                                            <li key={iIndex} className="pl-1">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            );

                        case 'alert':
                            const styles = {
                                info: 'bg-blue-50 text-blue-700 border-blue-200',
                                warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
                                success: 'bg-green-50 text-green-700 border-green-200',
                                danger: 'bg-red-50 text-red-700 border-red-200',
                            };
                            return (
                                <div key={index} className={`p-4 rounded-md border ${styles[block.style]} flex items-start`}>
                                    {/* Icon placeholder could go here */}
                                    <span className="text-sm font-medium">{block.content}</span>
                                </div>
                            )

                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
}
