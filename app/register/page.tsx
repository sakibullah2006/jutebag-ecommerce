import { Metadata } from 'next'
import Register from '../../components/Register/registerClient';
import { getProductCategories } from '../../actions/data-actions';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Footer from '../../components/Footer/Footer';
import MenuOne from '../../components/Header/Menu/MenuOne';
import TopNavOne from '../../components/Header/TopNav/TopNavOne';

export const metadata: Metadata = {
    title: 'Register - Create an Account',
    description: 'Create a new account to enjoy personalized shopping experiences, exclusive offers, and more.',
}

export default async function ForgotPasswordPage() {
    const [categories] = await Promise.all([
        getProductCategories()
    ])

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" categories={categories} />
                <Breadcrumb heading='Create An Account' subHeading='Create An Account' />
            </div>
            <Register />
            <Footer />
        </>
    );
}