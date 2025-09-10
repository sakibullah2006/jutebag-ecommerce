"use client"

import React from 'react'
import { MotionDiv } from '../../types/montion-types'

interface Props {
    props: string;
}

const benefitData = [
    {
        icon: 'icon-phone-call',
        title: '24/7 Customer Service',
        description: "We're here to help you with any questions or concerns you have, 24/7."
    },
    {
        icon: 'icon-return',
        title: '14-Day Money Back',
        description: "If you're not satisfied with your purchase, simply return it within 14 days for a refund."
    },
    {
        icon: 'icon-guarantee',
        title: 'Our Guarantee',
        description: "We stand behind our products and services and guarantee your satisfaction."
    },
    {
        icon: 'icon-delivery-truck',
        title: 'Shipping worldwide',
        description: "We ship our products worldwide, making them accessible to customers everywhere."
    }
]

const Benefit: React.FC<Props> = ({ props }) => {
    return (
        <>
            <div className="container">
                <div className={`benefit-block ${props}`}>
                    <div className="list-benefit grid items-start lg:grid-cols-4 grid-cols-2 gap-[30px]">
                        {benefitData.map((item, index) => (
                            <MotionDiv
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="benefit-item flex flex-col items-center justify-center"
                            >
                                <i className={`${item.icon} lg:text-7xl text-5xl`}></i>
                                <div className="heading6 text-center mt-5">{item.title}</div>
                                <div className="caption1 text-secondary text-center mt-3">{item.description}</div>
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Benefit