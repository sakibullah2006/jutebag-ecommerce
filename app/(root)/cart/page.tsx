import React, { Suspense } from 'react'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import CartClient from '@/components/Cart/CartClient'
import { Metadata } from 'next'
import { getProductCategories } from '../../../actions/data-actions'
import { STOREINFO } from '../../../constant/storeConstants'


const Cart = async () => {
    return (
        <>
            <div id="header" className='relative w-full'>
                <Breadcrumb heading='Shopping cart' subHeading='Shopping cart' />
            </div>
            <CartClient />
        </>
    )
}

export const metadata: Metadata = {
    title: `Cart - ${STOREINFO.name}`,
    description: `View and manage your shopping cart at ${STOREINFO.name}. Adjust quantities, remove items, and proceed to checkout.`,
    keywords: ['cart', 'shopping cart', `${STOREINFO.name}`, 'online store', 'checkout'],
    openGraph: {
        title: `Cart - ${STOREINFO.name}`,
        description: `View and manage your shopping cart at ${STOREINFO.name}. Adjust quantities, remove items, and proceed to checkout.`,
        type: 'website',
        url: '/cart',
    },
}

export default Cart