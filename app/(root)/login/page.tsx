import { Metadata } from 'next'
import Login from "@/components/Login/loginClient";
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import Footer from '../../../components/Footer/Footer';

export const metadata: Metadata = {
    title: 'Login - My Account',
    description: 'Login to your account to access your orders, profile, and more.',
}

export default async function Page() {

    return (
        <>
            <div id="header" className='relative w-full'>
                <Breadcrumb heading='Login' subHeading='Login' />
            </div>
            <Login />
        </>

    );
}