import { Metadata } from 'next'
import Register from '../../components/Register/registerClient';

export const metadata: Metadata = {
    title: 'Register - Create an Account',
    description: 'Create a new account to enjoy personalized shopping experiences, exclusive offers, and more.',
}

export default function ForgotPasswordPage() {
    return (
        <Register />
    );
}