import { Metadata } from 'next'
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import OtpPasswordReset from "../../../components/ForgotPassword/OtpPasswordReset";

export const metadata: Metadata = {
    title: 'Forgot Password - Reset Your Password',
    description: 'Enter your email to receive a password reset link.',
}

export default function ForgotPasswordPage() {

    return (
        <>
            <div id="header" className='relative w-full'>
                <Breadcrumb heading='Forget your password' subHeading='Forget your password' />
            </div>
            <OtpPasswordReset />
        </>
    );
}