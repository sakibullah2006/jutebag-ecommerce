'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as Icon from '@phosphor-icons/react/dist/ssr';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useAppData } from '../../context/AppDataContext';
import { Product as ProductType } from '@/types/product-type';

interface Props {
    data: ProductType;
    isOpen: boolean;
    onClose: () => void;
}

const ModalPrintguide: React.FC<Props> = ({ data, isOpen, onClose }) => {
    const { storeConfig } = useAppData();

    const primaryCountryDetails =
        data.production_details?.printScreenDetails?.find(
            (detail) =>
                detail.countryCode === storeConfig?.address.countryCode || 'US'
        );

    const otherCountries =
        data.production_details?.printScreenDetails?.filter(
            (detail) => detail.countryCode !== storeConfig?.address.countryCode
        ) || [];

    // Disable background scroll when modal is open
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Render nothing if modal is closed
    if (!isOpen) return null;

    // Ensure we’re on the client for portal rendering
    if (typeof window === 'undefined') return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            onClick={onClose}
        >
            <div
                className="relative bg-white md:p-10 p-6 min-h-[400px] rounded-[32px] shadow-2xl w-full max-w-4xl border border-gray-200 transition-transform duration-300 transform scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="absolute right-5 top-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <Icon.X size={18} />
                </button>

                {/* Content */}
                <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-4">
                    {/* Header */}
                    <div className="bg-black text-white">
                        <div
                            className="grid gap-4 px-6 py-4"
                            style={{
                                gridTemplateColumns: `1fr repeat(${otherCountries.length}, 1fr)`,
                            }}
                        >
                            <div className="font-semibold text-sm uppercase tracking-wide">
                                Screen Print
                            </div>
                            {otherCountries.map((country) => (
                                <div
                                    key={country.countryCode}
                                    className="font-semibold text-sm uppercase tracking-wide text-center"
                                >
                                    {country.countryCode}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-100">
                        <div
                            className="grid gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                            style={{
                                gridTemplateColumns: `1fr repeat(${otherCountries.length}, 1fr)`,
                            }}
                        >
                            <div className="text-gray-600 font-medium">Print Area</div>
                            {otherCountries.map((country) => (
                                <div
                                    key={country.countryCode}
                                    className="text-center text-gray-900"
                                >
                                    {country.area || 'N/A'}
                                </div>
                            ))}
                        </div>

                        <div
                            className="grid gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                            style={{
                                gridTemplateColumns: `1fr repeat(${otherCountries.length}, 1fr)`,
                            }}
                        >
                            <div className="text-gray-600 font-medium">Minimum Order</div>
                            {otherCountries.map((country) => (
                                <div
                                    key={country.countryCode}
                                    className="text-center text-gray-900"
                                >
                                    {country.quantity || 'N/A'}
                                </div>
                            ))}
                        </div>

                        <div
                            className="grid gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                            style={{
                                gridTemplateColumns: `1fr repeat(${otherCountries.length}, 1fr)`,
                            }}
                        >
                            <div className="text-gray-600 font-medium">Lead Times</div>
                            {otherCountries.map((country) => (
                                <div
                                    key={country.countryCode}
                                    className="text-center text-gray-900"
                                >
                                    {country.time || 'N/A'}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ModalPrintguide;
