import { IconAlertCircle } from '@tabler/icons-react';
import Link from 'next/link';

type ErrorType = 'AccessDenied' | 'Verification' | 'UserNotRegistered' | 'Default';

function getErrorMessage(error: ErrorType): string {
    switch (error) {
        case 'AccessDenied':
            return 'Access denied. You do not have permission to access this resource.';
        case 'Verification':
            return 'Email verification required. Please check your inbox and verify your email.';
        case 'UserNotRegistered':
            return 'User not registered. Please sign up first.';
        default:
            return 'An authentication error occurred. Please try again.';
    }
}

export default function AuthError({
    searchParams,
}: {
    searchParams: { error?: string };
}) {
    const errorType = (searchParams.error as ErrorType) || 'Default';
    const errorMessage = getErrorMessage(errorType);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
            <div className="max-w-md w-full mx-auto rounded-2xl p-8 shadow-2xl bg-white dark:bg-black">
                <div className="flex flex-col items-center space-y-4">
                    <IconAlertCircle className="w-16 h-16 text-red-500" />
                    <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                        Authentication Error
                    </h1>
                    <p className="text-center text-neutral-600 dark:text-neutral-400">
                        {errorMessage}
                    </p>
                    <div className="flex space-x-4">
                        <Link
                            href="/signin"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
                        >
                            Back to Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}