
export interface JobPost {
    id: string;
    slug: string;
    title: string;
    type: 'Recruitment' | 'Admit Card' | 'Result' | 'Syllabus';
    lastUpdated: string;
    shortDescription: string;
    sections: Section[];
}

export interface Section {
    id: string;
    title: string;
    content: (TextContent | TableContent | ListContent | AlertContent)[];
}

export interface TextContent {
    type: 'text';
    html: string;
}

export interface TableContent {
    type: 'table';
    title?: string;
    headers: string[];
    rows: string[][];
}

export interface ListContent {
    type: 'list';
    title?: string;
    items: string[];
    ordered?: boolean;
}

export interface AlertContent {
    type: 'alert';
    style: 'info' | 'warning' | 'success' | 'danger';
    content: string;
}

export const MOCK_JOBS: JobPost[] = [
    {
        id: '1',
        slug: 'ibps-clerk',
        title: 'IBPS Clerk 2026 Exam Date Out, Notification, Vacancies',
        type: 'Recruitment',
        lastUpdated: 'February 2, 2026',
        shortDescription: 'IBPS Clerk 2026 Prelims Exam will be conducted on 10th & 11th October 2026. Check notification, vacancies, and eligibility criteria here.',
        sections: [
            {
                id: 'overview',
                title: 'IBPS Clerk 2026 Overview',
                content: [
                    {
                        type: 'text',
                        html: '<p>The Institute of Banking Personnel Selection (IBPS) has released the <strong>IBPS Clerk 2026 Notification</strong> for the recruitment of clerical cadre in participating banks.</p>'
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        slug: 'ibps-po',
        title: 'IBPS PO 2026 Notification, Exam Date, Vacancy',
        type: 'Recruitment',
        lastUpdated: 'February 2, 2026',
        shortDescription: 'The IBPS PO Exam is conducted every year by the Institute of Banking Personnel Selection (IBPS) to select eligible candidates for the post of Probationary Officers in different public sector banks in India.',
        sections: [
            {
                id: 'overview',
                title: 'IBPS PO 2026 Overview',
                content: [
                    {
                        type: 'text',
                        html: '<p>The IBPS PO Exam is conducted every year by the Institute of Banking Personnel Selection (IBPS) to select eligible candidates for the post of Probationary Officers in different public sector banks in India. IBPS PO exam has been conducted every year since 2011, and in 2026, this will be the 16th edition.</p>'
                    },
                    {
                        type: 'table',
                        title: 'IBPS PO 2026 Exam Summary',
                        headers: ['Particulars', 'Details'],
                        rows: [
                            ['Organisation', 'Institute of Banking Personnel Selection (IBPS)'],
                            ['Post Name', 'Probationary Officer'],
                            ['Exam Name', 'CRP PO/MT CRP-XVI'],
                            ['Vacancy', 'To be notified'],
                            ['Participating Banks', '11'],
                            ['Application Mode', 'Online'],
                            ['Exam Mode', 'Online'],
                            ['Recruitment Process', 'Prelims- Mains- Interview'],
                            ['Education Qualification', 'Graduate'],
                            ['Age Limit', '20 years to 30 years'],
                            ['Salary', 'Rs. 74,000 to 76,000'],
                            ['Official website', 'www.ibps.in']
                        ]
                    }
                ]
            },
            {
                id: 'dates',
                title: 'Important Dates',
                content: [
                    {
                        type: 'table',
                        title: 'IBPS PO 2026 Important Dates',
                        headers: ['Events', 'Dates'],
                        rows: [
                            ['IBPS PO Notification 2026', 'June 2026'],
                            ['Online Registration Process Starts', 'June 2026'],
                            ['Online Registration Process Ends', 'July 2026'],
                            ['Last Date to Pay Application Fee', '--'],
                            ['Dates for Application Correction', '--'],
                            ['IBPS PO Prelims Exam Date 2026', '22nd and 23rd August 2026'],
                            ['IBPS PO Mains Exam Date 2026', '4th October 2026']
                        ]
                    }
                ]
            },
            {
                id: 'vacancy',
                title: 'IBPS PO Vacancy 2026',
                content: [
                    {
                        type: 'text',
                        html: '<p>The IBPS PO Vacancies for IBPS PO 2026 will be announced along with the official IBPS PO notification 2026 pdf. Last year, IBPS had released 6189 vacancies.</p>'
                    },
                    {
                        type: 'table',
                        title: 'IBPS PO Vacancy 2025 (Last Year Reference)',
                        headers: ['Participating Banks', 'Total'],
                        rows: [
                            ['Bank of Baroda', '1000'],
                            ['Bank of India', '700'],
                            ['Bank of Maharashtra', '1000'],
                            ['Canara Bank', '1000'],
                            ['Central Bank of India', '500'],
                            ['Indian Bank', '700'],
                            ['Indian Overseas Bank', '450'],
                            ['Punjab National Bank', '200'],
                            ['Punjab & Sind Bank', '358'],
                            ['UCO Bank', '100'],
                            ['Total', '6189']
                        ]
                    }
                ]
            },
            {
                id: 'application',
                title: 'Application Details',
                content: [
                    {
                        type: 'text',
                        html: '<p>The application for the IBPS PO Exam 2026 needs to be done online at www.ibps.in.</p>'
                    },
                    {
                        type: 'table',
                        title: 'Application Fee',
                        headers: ['Categories', 'Application Fee'],
                        rows: [
                            ['SC/ST/PWD', 'Rs. 175/- (inclusive of GST)'],
                            ['General and Others', 'Rs. 850/- (inclusive of GST)']
                        ]
                    }
                ]
            },
            {
                id: 'eligibility',
                title: 'Eligibility Criteria',
                content: [
                    {
                        type: 'list',
                        title: 'Educational Qualification',
                        items: [
                            'Graduation Degree in any discipline from a University recognized by the Govt. of India.',
                            'Working knowledge of computer systems is necessary.'
                        ]
                    },
                    {
                        type: 'list',
                        title: 'Age Limit',
                        items: [
                            'Minimum Age: 20 Years',
                            'Maximum Age: 30 Years',
                            'Candidates born between 02.07.1996 and 01.07.2006 (inclusive).'
                        ]
                    },
                    {
                        type: 'table',
                        title: 'Age Relaxation',
                        headers: ['Category', 'Age Relaxation'],
                        rows: [
                            ['SC/ST', '5 years'],
                            ['OBC (Non-Creamy Layer)', '3 years'],
                            ['PWD', '10 years'],
                            ['Ex-servicemen', '5 years'],
                            ['Widows/Divorced Women', '9 years']
                        ]
                    }
                ]
            },
            {
                id: 'exam-pattern',
                title: 'Exam Pattern',
                content: [
                    {
                        type: 'table',
                        title: 'Prelims Exam Pattern',
                        headers: ['Name of Tests', 'No. of Questions', 'Maximum Marks', 'Duration'],
                        rows: [
                            ['English Language', '30', '30', '20 minutes'],
                            ['Numerical Ability', '35', '30', '20 minutes'],
                            ['Reasoning Ability', '35', '40', '20 minutes'],
                            ['Total', '100', '100', '60 minutes']
                        ]
                    },
                    {
                        type: 'table',
                        title: 'Mains Exam Pattern',
                        headers: ['Name of Tests', 'No. of Questions', 'Maximum Marks', 'Duration'],
                        rows: [
                            ['Reasoning & Computer Aptitude', '40', '60', '50 minutes'],
                            ['English Language', '35', '40', '40 minutes'],
                            ['Data Analysis & Interpretation', '35', '50', '45 minutes'],
                            ['General/ Economy/ Banking Awareness', '35', '50', '25 minutes'],
                            ['English Language (Letter & Essay)', '2', '25', '30 minutes']
                        ]
                    },
                    {
                        type: 'alert',
                        style: 'warning',
                        content: 'Negative Marking: 0.25 marks are deducted for each wrong answer in both Prelims and Mains.'
                    }
                ]
            },
            {
                id: 'syllabus',
                title: 'Syllabus',
                content: [
                    {
                        type: 'table',
                        title: 'Prelims Syllabus Overview',
                        headers: ['Reasoning', 'Quantitative Aptitude', 'English Language'],
                        rows: [
                            ['Logical Reasoning, Puzzles', 'Simplification, Number System', 'Reading Comprehension'],
                            ['Alphanumeric Series', 'Profit & Loss, SI/CI', 'Cloze Test'],
                            ['Coding-Decoding', 'Data Interpretation', 'Error Spotting']
                        ]
                    }
                ]
            },
            {
                id: 'salary',
                title: 'Salary & Benefits',
                content: [
                    {
                        type: 'text',
                        html: '<p>The initial in-hand salary of an IBPS Probationary Officer is <strong>Rs. 74,000 to 76,000</strong> with dearness allowances, special allowances, and other benefits. The basic pay scale starts at Rs. 48,480.</p>'
                    }
                ]
            },
            {
                id: 'cutoff',
                title: 'Previous Year Cut Off',
                content: [
                    {
                        type: 'table',
                        title: 'IBPS PO Prelims Cut-Off 2025 (Category-wise)',
                        headers: ['Category', 'Cut Off'],
                        rows: [
                            ['GEN', '49.21'],
                            ['SC', '45.96'],
                            ['ST', '40.96'],
                            ['OBC-NCL', '49.21'],
                            ['EWS', '49.21']
                        ]
                    }
                ]
            }
        ]
    }
];

export function getJobBySlug(slug: string): JobPost | undefined {
    return MOCK_JOBS.find(job => job.slug === slug);
}
