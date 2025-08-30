import React from 'react'
import TopNavOne from '../../components/Header/TopNav/TopNavOne'
import Footer from '../../components/Footer/Footer'
import MenuEight from '../../components/Header/Menu/MenuEight'
import { getProductCategories } from '../../actions/data-actions'

interface RootLayoutProps {
    children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
    const [
        categoriesResult,
    ] = await Promise.allSettled([
        getProductCategories(),
    ]);
    const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];



    return (
        <>
            <TopNavOne props="style-one bg-black" slogan='Limited Offer: Free shipping on orders over $50' />
            <div id="header" className='relative w-full style-nine'>
                <MenuEight props={''} categories={categories} />
            </div>
            {children}
            <Footer />
        </>
    )
}

export default RootLayout
