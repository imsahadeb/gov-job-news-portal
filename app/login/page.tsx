import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';

export const metadata = {
    title: "Login | Govt Jobs Portal",
    description: "Log in to your account.",
};

export default async function LoginPage() {
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
            <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
