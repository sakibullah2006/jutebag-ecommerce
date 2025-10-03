'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ErrorIllustration() {
    const router = useRouter();


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="relative mb-8">
                    {/* Modern Error Illustration */}
                    <div className="w-48 h-48 mx-auto relative">
                        {/* Background Circle */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-orange-100 rounded-full opacity-20"></div>

                        {/* Main Icon Container */}
                        <div className="absolute inset-4 bg-white rounded-full shadow-lg flex items-center justify-center">
                            {/* Error Icon */}
                            <svg className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-200 rounded-full animate-bounce delay-100"></div>
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-red-200 rounded-full animate-pulse"></div>
                        <div className="absolute top-8 -left-3 w-3 h-3 bg-yellow-200 rounded-full animate-ping"></div>
                    </div>
                </div>

                {/* Error Content */}
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">Oops! Something went wrong</h1>
                    <p className="text-gray-600 leading-relaxed text-xl">
                        We're having trouble loading the products right now.
                        Don't worry, our team is working on it!
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                        <button
                            onClick={() => router.refresh()}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                        >
                            Try Again
                        </button>
                        <Link
                            href={"/"}
                            className="px-6 py-3 bg-white text-gray-700 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-sm"
                        >
                            Go Home
                        </Link>
                    </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}