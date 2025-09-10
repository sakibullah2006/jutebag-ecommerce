'use client'

import { MotionDiv } from '@/types/montion-types'
import { ProductCategory, Product as ProductType } from '@/types/product-type'
// import { ProductType } from '@/types/ProductType'
import { TagType } from '@/types/data-type'
import React, { useEffect, useMemo, useState } from 'react'
import Product from '../Product/Product'
import { useAppData } from '../../context/AppDataContext'

interface Props {
    data: ProductType[];
    start: number;
    limit: number;
}

const WhatNewOne: React.FC<Props> = ({ data, start, limit }) => {
    const { categories } = useAppData()
    const commonCategories = categories?.filter(cat => cat.slug.toLowerCase().split("_").includes("common")).sort((a, b) => b.count - a.count)?.slice(0, 5)
    const [activeTab, setActiveTab] = useState<string>(commonCategories && commonCategories[0]?.slug.trim() || 'All');

    const handleTabClick = (type: string) => {
        setActiveTab(type);
    };

    const filteredProducts = useMemo(() => {
        if (activeTab === 'All') {
            return data;
        }
        return data.filter(
            (product) => product.categories.some((cat) => cat.slug === activeTab)
        );
    }, [activeTab, data]);

    return (
        <>
            <MotionDiv
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                className="whate-new-block md:pt-20 pt-10">
                <div className="container">
                    <div className="heading flex flex-col items-center text-center">
                        <div className="heading3">What{String.raw`'s`} new</div>
                        <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl mt-6">
                            {commonCategories && commonCategories.map((item) => (
                                <div
                                    key={item.id}
                                    className={`tab-item relative text-secondary text-button-uppercase py-2 px-5 cursor-pointer duration-500 hover:text-black ${activeTab.toLowerCase() === item.slug.toLowerCase() ? 'active' : ''}`}
                                    onClick={() => handleTabClick(item.slug.trim())}
                                >
                                    {activeTab.toLowerCase() === item.slug.toLowerCase() && (
                                        <MotionDiv
                                            layoutId='active-pill'
                                            transition={{ duration: 0.3 }}
                                            className='absolute inset-0 rounded-2xl bg-white'
                                        ></MotionDiv>
                                    )}
                                    <span className='relative text-button-uppercase z-[1]'>
                                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
                        {filteredProducts.slice(start, limit).map((prd, index) => (
                            <MotionDiv
                                initial={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
                                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 * index }}
                                key={`${activeTab}-${prd.id}-${index}`}
                                className="products"
                            >
                                <Product data={prd} type='grid' key={`${activeTab}-${prd.id}-${index}`} style='style-1' />
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </MotionDiv>
        </>
    )
}

export default WhatNewOne