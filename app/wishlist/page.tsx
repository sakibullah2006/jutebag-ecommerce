import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import MenuOne from '@/components/Header/Menu/MenuOne'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import WishlistClient from '@/components/wishlist/WishlistClient'
import { getProductCategories, getProductTags, } from '@/actions/data-actions'

const WishlistPage = async () => {
    const [categories, tags] = await Promise.all([
        getProductCategories(),
        getProductTags()
    ])

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" categories={categories} />
                <Breadcrumb heading='Wishlist' subHeading='Wishlist' />
            </div>
            <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                <WishlistClient tags={tags} />
            </div>
            <Footer />
        </>
    )
}

export default WishlistPage