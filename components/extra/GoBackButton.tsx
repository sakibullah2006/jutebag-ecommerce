'use client'; // This directive is essential!

import { useRouter } from 'next/navigation';

export default function GoBackButton() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center">
            <button
                type="button"
                onClick={() => router.back()} // Uses the browser's history
                className="button-main" // I used mt-8 from your commented out Link
            >
                Go Back
            </button>
        </div>
    );
}