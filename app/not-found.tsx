
import { getProductCategories } from "@/actions/data-actions";
import Footer from "@/components/Footer/Footer";
import MenuOne from "@/components/Header/Menu/MenuOne";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Link from "next/link";

export default async function NotFound() {
    const categories = await getProductCategories();

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="Limited Offer: Free shipping on orders over $50" />
            <div id="header" className="relative w-full">
                <MenuOne props={"bg-transparent"} categories={categories} />
            </div>
            <div className="not-found-block text-center">
                <div className="container">
                    <div className="main-content-block">
                        <div className="text-7xl font-bold">404</div>
                        <div className="text-4xl font-bold mt-4">Oops! Page Not Found</div>
                        <div className="text-base mt-4">
                            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                        </div>
                        <Link href="/" className="button-main mt-8">
                            Go to Homepage
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
