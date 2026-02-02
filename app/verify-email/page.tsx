"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

function VerifyContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Invalid token');
            return;
        }

        const verify = async () => {
            try {
                const res = await fetch(`/api/auth/verify?token=${token}`);
                const data = await res.json();
                if (res.ok) {
                    setStatus('success');
                } else {
                    setStatus('error');
                    setMessage(data.error);
                }
            } catch (error) {
                setStatus('error');
                setMessage('Something went wrong');
            }
        };

        verify();
    }, [token]);

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
            {status === 'loading' && (
                <div className="flex flex-col items-center">
                    <Loader2 className="h-12 w-12 text-red-600 animate-spin mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800">Verifying email...</h2>
                </div>
            )}

            {status === 'success' && (
                <div className="flex flex-col items-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Verified!</h2>
                    <p className="text-gray-600 mb-6">Your account has been successfully verified.</p>
                    <Link
                        href="/login"
                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                        Go to Login
                    </Link>
                </div>
            )}

            {status === 'error' && (
                <div className="flex flex-col items-center">
                    <XCircle className="h-16 w-16 text-red-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h2>
                    <p className="text-red-600 mb-6">{message}</p>
                    <Link
                        href="/login"
                        className="text-gray-600 hover:underline"
                    >
                        Back to Login
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyContent />
            </Suspense>
        </div>
    );
}
