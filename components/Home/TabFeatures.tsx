'use client'

import { MotionDiv } from '@/types/montion-types';
import React, { useState } from 'react';

import { Product as ProductType } from '@/types/product-type';
import Product from '../Product/Product';



interface Props {
    data: ProductType[];
    start: number;
    limit: number;
}

const TabFeatures: React.FC<Props> = ({ data, start, limit }) => {
    const [activeTab, setActiveTab] = useState<string>('on sale')

    const handleTabClick = (item: string) => {
        setActiveTab(item)
    }

    const getFilterData = () => {
        if (activeTab === 'on sale') {
            return data.filter(
                (product) =>
                    product.on_sale
            )
        }

        if (activeTab === 'new arrivals') {
            return data
                .slice()
                .filter(
                    (product) => product.tags.some((tag) => tag.slug === 'promotion_new-arrival')
                )
        }

        if (activeTab === 'best sellers') {
            return data
                .slice()
                .filter(
                    (product) => product.tags.some((tag) => tag.slug === 'promotion_new-arrival')
                )
        }

        return data
    }

    const filteredProducts = getFilterData()

    return (
        <>
            <MotionDiv
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                className="tab-features-block md:pt-20 pt-10">
                <div className="container">
                    <div className="heading flex flex-col items-center text-center">
                        <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl">
                            {['best sellers', 'on sale', 'new arrivals'].map((item, index) => (
                                <div
                                    key={index}
                                    className={`tab-item relative text-secondary heading5 py-2 px-5 cursor-pointer duration-500 hover:text-black ${activeTab === item ? 'active' : ''}`}
                                    onClick={() => handleTabClick(item)}
                                >
                                    {activeTab === item && (
                                        <MotionDiv
                                            layoutId='active-pill'
                                            transition={{ duration: 0.3 }}
                                            className='absolute inset-0 rounded-2xl bg-white'
                                        ></MotionDiv>
                                    )}
                                    <span className='relative heading5 z-[1]'>
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="list-product hide-product-sold  grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
                        {filteredProducts.slice(start, limit).map((prd, index) => (
                            <Product key={index} data={prd} type='grid' style='style-1' />
                        ))}
                    </div>
                </div>
            </MotionDiv>
        </>
    )
}

export default TabFeatures