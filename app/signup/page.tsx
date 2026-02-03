import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata = {
    title: "Sign Up | Govt Jobs Portal",
    description: "Create your account to get the latest government job updates.",
};

export default async function SignUpPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (token) {
        const payload = verifyToken(token);
        if (payload) {
            redirect('/');
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <SignUpForm />
        </div>
    );
}
