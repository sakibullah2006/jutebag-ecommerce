import React from 'react'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import CartClient from '@/components/Cart/CartClient'
import { Metadata } from 'next'





const Cart = async () => {

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Shopping cart' subHeading='Shopping cart' />
            </div>
            <CartClient />
            <Footer />
        </>
    )
}

export const metadata: Metadata = {
    title: 'Cart - SakibBaba Store',
    description: 'View and manage your shopping cart at SakibBaba Store. Adjust quantities, remove items, and proceed to checkout.',
    keywords: ['cart', 'shopping cart', 'SakibBaba Store', 'online store', 'checkout'],
    openGraph: {
        title: 'Cart - SakibBaba Store',
        description: 'View and manage your shopping cart at SakibBaba Store. Adjust quantities, remove items, and proceed to checkout.',
        type: 'website',
        url: '/cart',
    },
}

export default Cart