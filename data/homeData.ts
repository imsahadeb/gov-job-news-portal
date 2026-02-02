export interface UpdateItem {
    label: string;
    href: string;
    isNew?: boolean;
}

export const LATEST_JOBS: UpdateItem[] = [
    { label: "RBI Grade B 2026 Notification Out", href: "#", isNew: true },
    { label: "SSC CGL 2026 application form online", href: "#", isNew: true },
    { label: "IBPS PO Prelims Result Declared", href: "#" },
    { label: "SBI Clerk Mains Admit Card Released", href: "#" },
    { label: "RRB NTPC Exam Date Announced", href: "#" },
];

export const ADMIT_CARDS: UpdateItem[] = [
    { label: "UPSC CSE Prelims Admit Card 2026", href: "#", isNew: true },
    { label: "SSC CHSL Tier 1 Admit Card", href: "#", isNew: true },
    { label: "IBPS Clerk Mains Call Letter", href: "#" },
    { label: "NDA 1 2026 Admit Card Download", href: "#" },
    { label: "CTET July 2026 Admit Card", href: "#" },
];

export const RESULTS: UpdateItem[] = [
    { label: "UPSC CSE Final Result 2025", href: "#", isNew: true },
    { label: "SSC GD Constable Result 2025", href: "#", isNew: true },
    { label: "IBPS SO Final Result 2025", href: "#" },
    { label: "GATE 2026 Score Card", href: "#" },
    { label: "CAT 2025 Result Declared", href: "#" },
];

export const STATE_LIST: string[] = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "J&K"
];

export interface ResourceItem {
    id: string;
    title: string;
    description: string;
    href: string;
    colorClass: string;
}

export const STUDY_RESOURCES_DATA: ResourceItem[] = [
    {
        id: "syllabus",
        title: "Syllabus & Exam Pattern",
        description: "Detailed syllabus and exam pattern for all major government exams to help you plan your preparation.",
        href: "/syllabus",
        colorClass: "hover:text-blue-600",
    },
    {
        id: "previous-papers",
        title: "Previous Year Papers",
        description: "Download previous year question papers with answer keys for better practice and understanding.",
        href: "/previous-papers",
        colorClass: "hover:text-purple-600",
    },
    {
        id: "mock-tests",
        title: "Mock Tests & Quizzes",
        description: "Attempt free mock tests and daily quizzes to analyze your performance and improve speed.",
        href: "/mock-tests",
        colorClass: "hover:text-green-600",
    },
];
