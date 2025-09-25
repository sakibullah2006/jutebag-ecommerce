'use client'

import { Product as ProductType } from '@/types/product-type';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import React, { useState } from 'react';
// import Slider from 'react-slider'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useAppData } from '../../context/AppDataContext';

interface Props {
    data: ProductType;
    isOpen: boolean;
    onClose: () => void;
}

const ModalPrintguide: React.FC<Props> = ({ data, isOpen, onClose }) => {
    const { storeConfig } = useAppData()
    const primaryCountryDetails = data.production_details?.printScreenDetails?.find((detail) => detail.countryCode === storeConfig?.address.countryCode || "US")
    const otherCountries = data.production_details?.printScreenDetails?.filter((detail) => detail.countryCode != storeConfig?.address.countryCode)

    return (
        <div className={`modal-sizeguide-block`} onClick={onClose}>
            <div
                className={`modal-sizeguide-main md:p-10 p-6 min-h-[400px] rounded-[32px] ${isOpen ? 'open' : ''}`}
                onClick={(e) => { e.stopPropagation() }}
            >
                <div
                    className="close-btn absolute right-5 top-5 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                    onClick={onClose}
                >
                    <Icon.X size={14} />
                </div>

                <div className=" bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-black text-white">
                        <div
                            className={`grid gap-4 px-6 py-4`}
                            style={{ gridTemplateColumns: `1fr repeat(${(otherCountries?.length || 0)}, 1fr)` }}
                        >
                            <div className="font-semibold text-sm uppercase tracking-wide">Screen Print</div>
                            {/* <div className="font-semibold text-sm uppercase tracking-wide text-center">UK</div> */}
                            {otherCountries?.map((country) => (
                                <div key={country.countryCode} className="font-semibold text-sm uppercase tracking-wide text-center">
                                    {country.countryCode}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-100">
                        <div
                            className={`grid gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150`}
                            style={{ gridTemplateColumns: `1fr repeat(${(otherCountries?.length || 0)}, 1fr)` }}
                        >
                            <div className="text-gray-600 font-medium">Print Area</div>
                            {/* <div className="text-center text-gray-900">{primaryCountryDetails?.area || "N/A"}</div> */}
                            {otherCountries?.map((country) => (
                                <div key={country.countryCode} className="text-center text-gray-900">
                                    {country.area}
                                </div>
                            ))}
                        </div>

                        <div
                            className={`grid gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150`}
                            style={{ gridTemplateColumns: `1fr repeat(${(otherCountries?.length || 0)}, 1fr)` }}
                        >
                            <div className="text-gray-600 font-medium">Minimum Order</div>
                            {/* <div className="text-center text-gray-900">{primaryCountryDetails?.quantity || "N/A"}</div> */}
                            {otherCountries?.map((country) => (
                                <div key={country.countryCode} className="text-center text-gray-900">
                                    {country.quantity}
                                </div>
                            ))}
                        </div>

                        <div
                            className={`grid gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150`}
                            style={{ gridTemplateColumns: `1fr repeat(${(otherCountries?.length || 0)}, 1fr)` }}
                        >
                            <div className="text-gray-600 font-medium">Lead Times</div>
                            {/* <div className="text-center text-gray-900">{primaryCountryDetails?.time || "N/A"}</div> */}
                            {otherCountries?.map((country) => (
                                <div key={country.countryCode} className="text-center text-gray-900">
                                    {country.time}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )

}

export default ModalPrintguide