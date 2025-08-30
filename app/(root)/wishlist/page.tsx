import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import WishlistClient from '@/components/wishlist/WishlistClient'

const WishlistPage = () => {

    return (
        <>
            <div id="header" className='relative w-full'>
                <Breadcrumb heading='Wishlist' subHeading='Wishlist' />
            </div>
            <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                <WishlistClient />
            </div>
        </>
    )
}

export default WishlistPage