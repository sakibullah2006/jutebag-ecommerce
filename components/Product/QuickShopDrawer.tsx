// components/ui/QuickShopDrawer.tsx

"use client";

import { useEffect } from 'react';

interface QuickShopDrawerProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function QuickShopDrawer({ open, onClose, children }: QuickShopDrawerProps) {
    // Effect to handle body scroll lock
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Cleanup function to reset scroll on component unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [open]);

    if (!open) {
        return null;
    }

    return (
        // Main container: fixed position, covers the screen, and is on top (z-50)
        <div className="fixed  inset-0 z-[150] flex md:hidden items-end justify-center">
            {/* Overlay: semi-transparent background. Clicking it closes the drawer. */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Drawer Panel: positioned at the bottom, slides in and out */}
            <div
                className={`
          relative w-full  transform bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out
          rounded-t-2xl
          ${open ? 'translate-y-0' : 'translate-y-full'}
        `}
                // Stop clicks inside the panel from closing the drawer
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}