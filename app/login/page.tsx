import { Metadata } from 'next'
import Login from "@/components/Login/loginClient";

export const metadata: Metadata = {
    title: 'Login - My Account',
    description: 'Login to your account to access your orders, profile, and more.',
}

export default function Page() {
    return (
        <Login />
    );
}