'use client'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import MenuOne from '@/components/Header/Menu/MenuOne'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import { useAuth } from '@/context/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { set } from 'lodash'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'


const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
});

type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
    const { loading, resetPassword } = useAuth()
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ForgotPasswordFormInputs>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormInputs) => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);
        if (loading) {
            return; // Prevent submission if already loading
        }
        try {
            // --- TODO: Replace this with your actual API call ---
            console.log("Submitting email for password reset:", data.email);
            const response = await resetPassword(data.email);
            if (response.success) {
                setSuccessMessage("A password reset link has been sent to your email.");
                reset(); // Reset the form fields
            } else {
                // Handle reset password failure
                setError(response.message || "Failed to send reset link. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>

            <div className="forgot-pass md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Reset your password</div>
                            <div className="body1 mt-2">We will send you an email to reset your password</div>
                            <form onSubmit={handleSubmit(onSubmit)} className="md:mt-7 mt-4">
                                {/* Don't show the form again after successful submission */}
                                {!successMessage ? (
                                    <>
                                        <div className="email">
                                            <input
                                                className={`border-line px-4 pt-3 pb-3 w-full rounded-lg ${errors.email ? "border-red" : ""
                                                    }`}
                                                id="email" // Changed from "username" to "email" for clarity
                                                type="email"
                                                placeholder="Your email address *"
                                                {...register("email")}
                                            />
                                            {errors.email && (
                                                <p className="text-red text-sm mt-1">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <div className="block-button md:mt-7 mt-4">
                                            <button
                                                type="submit"
                                                className={`button-main w-full disabled:opacity-100 disabled:pointer-events-none ${isLoading ?
                                                    "bg-surface text-secondary2 border cursor-not-allowed disabled hover:normal-case"
                                                    : "bg-black text-white hover:bg-green-300"
                                                    }`}
                                                disabled={isLoading}
                                            >
                                                <span>{isLoading ? "Submitting..." : "Submit"}</span>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    // Show success message
                                    <div className="text-center p-4 bg-green/20 text-green-800 rounded-lg">
                                        {successMessage || "A password reset link has been sent to your email."}
                                    </div>
                                )}

                                {/* Display general form errors */}
                                {error && (
                                    <div className='mt-4 p-5 bg-red/20 rounded-lg'>
                                        <p className="text-red text-center">{error}</p>
                                    </div>
                                )}
                            </form>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">New Customer</div>
                                <div className="mt-2 text-secondary">Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.</div>
                                <div className="block-button md:mt-7 mt-4">
                                    <Link href={'/register'} className="button-main">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword