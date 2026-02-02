export interface MenuItem {
    label: string;
    href: string;
    children?: MenuItem[];
}

export const EXAMS_MENU: MenuItem[] = [
    {
        label: "Bank",
        href: "/exams/bank",
        children: [
            { label: "IBPS PO", href: "/exams/bank/ibps-po" },
            { label: "IBPS Clerk", href: "/exams/bank/ibps-clerk" },
            { label: "IBPS RRB", href: "/exams/bank/ibps-rrb" },
            { label: "SBI Clerk", href: "/exams/bank/sbi-clerk" },
            { label: "SBI PO", href: "/exams/bank/sbi-po" },
            { label: "RBI Grade B", href: "/exams/bank/rbi-grade-b" },
        ],
    },
    { label: "SSC", href: "/exams/ssc" },
    { label: "Railway", href: "/exams/railway" },
    { label: "Teaching", href: "/exams/teaching" },
    { label: "Defence", href: "/exams/defence" },
    { label: "UPSC", href: "/exams/upsc" },
    { label: "12th+", href: "/exams/12th-plus" },
];

export const RECENT_EXAMS_MENU: MenuItem[] = [
    { label: "SBI PO 2026", href: "/recent-exams/sbi-po" },
    { label: "IBPS Clerk", href: "/recent-exams/ibps-glerk" },
    { label: "SSC CGL", href: "/recent-exams/ssc-cgl" },
    { label: "RRB NTPC", href: "/recent-exams/rrb-ntpc" },
];
