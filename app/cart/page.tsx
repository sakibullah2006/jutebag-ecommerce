import React from 'react'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import CartClient from '@/components/Cart/CartClient'

interface CouponData {
    id: string
    code: string
    discount: number
    minValue: number
    description: string
}

// Mock coupon data - in a real app, this would come from an API or database
const getCoupons = async (): Promise<CouponData[]> => {
    return [
        {
            id: '1',
            code: 'AN6810',
            discount: 10,
            minValue: 200,
            description: 'For all orders from 200$'
        },
        {
            id: '2',
            code: 'AN6815',
            discount: 15,
            minValue: 300,
            description: 'For all orders from 300$'
        },
        {
            id: '3',
            code: 'AN6820',
            discount: 20,
            minValue: 400,
            description: 'For all orders from 400$'
        }
    ]
}

const Cart = async () => {
    const coupons = await getCoupons()

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Shopping cart' subHeading='Shopping cart' />
            </div>
            <CartClient coupons={coupons} />
            <Footer />
        </>
    )
}

export default Cart