import { Metadata } from 'next'
import Login from "@/components/Login/loginClient";
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Footer from '../../components/Footer/Footer';
import MenuOne from '../../components/Header/Menu/MenuOne';
import TopNavOne from '../../components/Header/TopNav/TopNavOne';
import { getProductCategories } from '../../actions/data-actions';

export const metadata: Metadata = {
    title: 'Login - My Account',
    description: 'Login to your account to access your orders, profile, and more.',
}

export default async function Page() {
    const [categories] = await Promise.all([
        getProductCategories()
    ])

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" categories={categories} />
                <Breadcrumb heading='Login' subHeading='Login' />
            </div>
            <Login />
            <Footer />

        </>

    );
}