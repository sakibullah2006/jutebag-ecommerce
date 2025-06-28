'use client'

import { MotionDiv } from '@/types/montion-types'
import { Product as ProductType } from '@/types/product-type copy'
// import { ProductType } from '@/types/ProductType'
import React, { useState } from 'react'
import Product from '../Product/Product'

interface Props {
    data: Array<ProductType>;
    start: number;
    limit: number;
}

const WhatNewOne: React.FC<Props> = ({ data, start, limit }) => {
    const [activeTab, setActiveTab] = useState<string>('t-shirt');

    const handleTabClick = (type: string) => {
        setActiveTab(type);
    };

    const filteredProducts: ProductType[] = data.filter(
        (product) => 1 === 1
        // product.type === activeTab &&
        // product.categories.some((category) => category.name.toLocaleLowerCase() === "fashion")
    );

    return (
        <>
            <div className="whate-new-block md:pt-20 pt-10">
                <div className="container">
                    <div className="heading flex flex-col items-center text-center">
                        <div className="heading3">What{String.raw`'s`} new</div>
                        <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl mt-6">
                            {['top', 't-shirt', 'dress', 'sets', 'shirt'].map((type) => (
                                <div
                                    key={type}
                                    className={`tab-item relative text-secondary text-button-uppercase py-2 px-5 cursor-pointer duration-500 hover:text-black ${activeTab === type ? 'active' : ''}`}
                                    onClick={() => handleTabClick(type)}
                                >
                                    {activeTab === type && (
                                        <MotionDiv
                                            layoutId='active-pill'
                                            className='absolute inset-0 rounded-2xl bg-white'
                                        ></MotionDiv>
                                    )}
                                    <span className='relative text-button-uppercase z-[1]'>
                                        {type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
                        {filteredProducts.slice(start, limit).map((prd, index) => (
                            <Product data={prd} type='grid' key={index} style='style-1' />
                            // <>{index} <br /></>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhatNewOne