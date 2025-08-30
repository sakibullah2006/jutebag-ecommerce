import { Metadata } from 'next'
import Register from '../../../components/Register/registerClient';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

export const metadata: Metadata = {
    title: 'Register - Create an Account',
    description: 'Create a new account to enjoy personalized shopping experiences, exclusive offers, and more.',
}

export default function ForgotPasswordPage() {

    return (
        <>
            <div id="header" className='relative w-full'>
                <Breadcrumb heading='Create An Account' subHeading='Create An Account' />
            </div>
            <Register />
        </>
    );
}