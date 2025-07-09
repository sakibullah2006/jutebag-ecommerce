import ForgotPassword from "../../components/ForgotPassword/forgotPassword";

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Forgot Password - Reset Your Password',
    description: 'Enter your email to receive a password reset link.',
}

export default function ForgotPasswordPage() {
    return (
        <ForgotPassword />
    );
}