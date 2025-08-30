"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useAppData } from '../../context/AppDataContext';
import { STOREINFO } from '../../constant/storeConstants';
import { PATH } from '../../constant/pathConstants';

// Data for the footer links, promoting maintainability.
const footerLinkSections = [
    {
        title: 'Information',
        links: [
            { label: 'Contact us', href: '#!' },
            { label: 'Career', href: '#!' },
            { label: 'My Account', href: PATH.DASHBOARD },
            { label: 'FAQs', href: '#!' }
        ]
    },
    {
        title: 'Quick Shop',
        links: [
            { label: 'Women', href: `${PATH.SHOP}?gender=women` },
            { label: 'Men', href: `${PATH.SHOP}?gender=men` },
            { label: 'Clothes', href: `${PATH.SHOP}?category=first_order_fashion` },
            { label: 'Accessories', href: `${PATH.SHOP}?category=second_order_fahion_common_accessories` }
        ]
    },
    {
        title: 'Customer Services',
        links: [
            { label: 'Orders FAQs', href: '#!' },
            { label: 'Shipping', href: '#!' },
            { label: 'Privacy Policy', href: '#!' },
            { label: 'Return & Refund', href: `${PATH.DASHBOARD}?tab=orders` }
        ]
    }
];


const Footer = () => {
    const { currentCurrency, storeConfig } = useAppData()

    return (
        <div id="footer" className='footer'>
            <div className="footer-main bg-surface">
                <div className="container">
                    {/* CHANGE: Main content is now a column on mobile, a row on large screens. */}
                    {/* Added vertical gap for mobile, horizontal for desktop. */}
                    <div className="content-footer py-12 lg:py-16 flex flex-col lg:flex-row lg:justify-between gap-y-12 lg:gap-x-8">

                        {/* Company Info */}
                        {/* CHANGE: Width is now responsive. No padding on mobile. */}
                        <div className="company-infor lg:basis-1/4 lg:pr-7">
                            <Link href={'/'} className="logo">
                                <div className="heading4">{STOREINFO.name}</div>
                            </Link>
                            <div className='flex gap-4 mt-4'>
                                <div className="flex flex-col font-semibold">
                                    <span className="text-button">Mail:</span>
                                    <span className="text-button mt-2">Phone:</span>
                                    <span className="text-button mt-2">Address:</span>
                                </div>
                                <div className="flex flex-col">
                                    <span>{STOREINFO.email}</span>
                                    <span className='mt-2'>{STOREINFO.phoneNumber}</span>
                                    <span className='mt-2'>{storeConfig?.address.address1 + ", " + storeConfig?.address.address2}</span>
                                </div>
                            </div>
                        </div>

                        {/* Links & Newsletter Wrapper */}
                        {/* CHANGE: This section also stacks vertically on mobile. */}
                        <div className="right-content flex flex-col xl:flex-row gap-y-12 xl:gap-x-8 lg:basis-3/4">

                            {/* Link Sections (Now Data-Driven) */}
                            {/* CHANGE: Stacks on mobile, row on medium screens. Mapped from our array. */}
                            <div className="list-nav flex flex-col sm:flex-row sm:justify-between gap-y-10 xl:basis-2/3">
                                {footerLinkSections.map((section) => (
                                    <div key={section.title} className="item flex flex-col sm:basis-1/3">
                                        <div className="text-button-uppercase pb-3">{section.title}</div>
                                        {section.links.map((link) => (
                                            <Link key={link.label} className='caption1 has-line-before duration-300 w-fit pt-2' href={link.href}>
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {/* Newsletter */}
                            {/* CHANGE: Width and padding are now responsive. */}
                            <div className="newsletter xl:basis-1/3 xl:pl-7">
                                <div className="text-button-uppercase">Newsletter</div>
                                <div className="caption1 mt-3">Sign up for our newsletter and get 10% off your first purchase</div>
                                <div className="input-block w-full h-[52px] mt-4">
                                    <form className='w-full h-full relative' action="post">
                                        <input type="email" placeholder='Enter your e-mail' className='caption1 w-full h-full pl-4 pr-14 rounded-xl border border-line' required />
                                        <button className='w-11 h-11 bg-black flex items-center justify-center rounded-lg absolute top-1 right-1'>
                                            <Icon.ArrowRight size={24} color='#fff' />
                                        </button>
                                    </form>
                                </div>
                                <div className="list-social flex items-center gap-6 mt-4">
                                    {/* Icons can also be mapped from a data array for even cleaner code */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            {/* CHANGE: Stacks on mobile, row on large screens. Items centered on mobile. */}
            <div className="container">
                <div className="footer-bottom py-4 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 border-t border-line">
                    <div className="left flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                        <div className="copyright caption1 text-secondary">©{new Date().getFullYear()} Vetex. All Rights Reserved.</div>
                        <div className="select-block flex items-center gap-5">
                            {/* Language and Currency selectors here */}
                        </div>
                    </div>
                    <div className="right flex items-center gap-2">
                        {/* Payment icons here */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer