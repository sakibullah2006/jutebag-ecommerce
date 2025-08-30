// components/ui/CountdownTimer.tsx
'use client';

import { useState, useEffect } from 'react';

// ... (Interfaces and calculateTimeLeft function remain the same)
interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
interface CountdownTimerProps {
    expiryDate: string;
}
const calculateTimeLeft = (expiry: string): TimeLeft | null => {
    const difference = +new Date(expiry) - +new Date();
    if (difference <= 0) {
        return null;
    }
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
};

const CountdownTimer = ({ expiryDate }: CountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setTimeLeft(calculateTimeLeft(expiryDate));

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(expiryDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [expiryDate]);

    if (!isClient || !timeLeft) {
        return (
            <div className="text-center font-semibold text-sm text-white">
                Offer has expired!
            </div>
        )
    }

    const timerComponents = [
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Minutes' },
        { value: timeLeft.seconds, label: 'Seconds' },
    ];

    return (
        // CHANGE #1: Reduced horizontal spacing even more to make the component more compact.
        // From `space-x-1 md:space-x-2` to `space-x-0.5 md:space-x-1`.
        <div className="flex items-center justify-center space-x-0.5 md:space-x-1">
            {timerComponents.map((part, index) => (
                <div key={index} className="flex gap-1 items-center">
                    {/* CHANGE #2: Scaled down the font size for the numbers even more.
                      - From `text-xl` to `text-lg`.
                      - From `md:text-2xl` to `md:text-xl`.
                      - From `lg:text-3xl` to `lg:text-2xl`.
                    */}
                    <span className="text-lg md:text-xl lg:text-2xl max-sm:text-sm font-bold text-white leading-none">
                        {String(part.value).padStart(2, '0')}
                    </span>
                    {/* CHANGE #3: Made the label font size even smaller.
                      - From `text-xs` to `text-xs` but added more compact styling.
                    */}
                    <span className="text-xs uppercase text-gray-200 leading-tight">
                        {part.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;