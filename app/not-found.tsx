import Footer from "@/components/Footer/Footer";
import MenuOne from "@/components/Header/Menu/MenuOne";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Link from 'next/link'; // Import Link for the homepage button
import GoBackButton from "../components/extra/GoBackButton";
import MenuEight from "../components/Header/Menu/MenuEight";
import { getProductCategories } from "../actions/data-actions";

export default async function NotFound() {

    const [categoriesResult] = await Promise.allSettled([
        getProductCategories(),
    ]);

    const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];


    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="Limited Offer: Free shipping on orders over $50" />
            <div id="header" className='relative w-full style-nine'>
                <MenuEight props="bg-transparent" categories={categories} />
            </div>
            <div className="not-found-block text-center">
                <div className="container">
                    <div className="main-content-block">
                        <div className="text-7xl font-bold">404</div>
                        <div className="text-4xl font-bold mt-4">Oops! Page Not Found</div>
                        <div className="text-base mt-4">
                            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                        </div>

                        {/* --- CORRECTED PART --- */}
                        <div className="flex items-center justify-center  gap-4 mt-8">
                            <Link href="/" className="button-main">
                                Go to Homepage
                            </Link>
                            <GoBackButton />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}