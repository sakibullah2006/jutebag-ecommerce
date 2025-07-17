'use client'

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import MenuOne from '@/components/Header/Menu/MenuOne'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import { useAuth } from '@/context/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'


const signupSchema = z
    .object({
        username: z.string().min(3, "Username must be at least 3 characters"),
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
        termsAccepted: z.boolean().refine((val) => val === true, {
            message: "You must accept the Terms of User",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Apply error to the confirmPassword field
    });

type SignupFormInputs = z.infer<typeof signupSchema>;


const Register = () => {
    const [error, setError] = useState<string | null>(null);
    const { signup, loading } = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>(loading)
    const router = useRouter()

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormInputs>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormInputs) => {
        setError(null);
        setIsLoading(true);
        try {
            const response = await signup(data.username, data.email, data.password);
            if (response.success) {
                console.log("Sign Up Successfull");
                // Redirect to the homepage or dashboard after signup
                reset();
                router.push('/login');
            } else {
                // Handle Singup failure
                setError(response.message || "SignUp failed. Please try again.");
            }
        } catch (err) {
            setError("Signup failed. The email or username may already be taken.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
          
            <div className="register-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Register</div>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        className="border-line mt-1 px-4 py-3 w-full rounded-lg"
                                        placeholder="Choose a username"
                                        {...register("username")}
                                    />
                                    {errors.username && (
                                        <p className="text-red text-sm mt-1">{errors.username.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="border-line mt-1 px-4 py-3 w-full rounded-lg"
                                        placeholder="you@example.com"
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <p className="text-red text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="border-line mt-1 px-4 py-3 w-full rounded-lg"
                                        placeholder="••••••••"
                                        {...register("password")}
                                    />
                                    {errors.password && (
                                        <p className="text-red text-sm mt-1">{errors.password.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        className="border-line mt-1 px-4 py-3 w-full rounded-lg"
                                        placeholder="••••••••"
                                        {...register("confirmPassword")}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red text-sm mt-1">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>

                                {/* Accept Terms Checkbox */}
                                <div className="pt-2">
                                    <div className="flex items-center">
                                        <div className="block-input relative w-5 h-5">
                                            <input
                                                type="checkbox"
                                                id="termsAccepted"
                                                className="absolute w-full h-full opacity-0 cursor-pointer peer"
                                                {...register("termsAccepted")}
                                            />
                                            <Icon.CheckSquareIcon
                                                id="termsAccepted"
                                                size={20}
                                                weight="fill"
                                                className="icon-checkbox text-gray-300 peer-checked:text-green"
                                            />
                                        </div>
                                        <label
                                            htmlFor="termsAccepted"
                                            className="pl-2 cursor-pointer select-none text-secondary2"
                                        >
                                            I agree to the
                                            <Link href={"/terms-of-service"} className="text-black hover:underline pl-1">
                                                Terms of User
                                            </Link>
                                        </label>
                                    </div>
                                    {errors.termsAccepted && (
                                        <p className="text-red text-sm mt-1">
                                            {errors.termsAccepted.message}
                                        </p>
                                    )}
                                </div>

                                {error && <p className="text-red text-center">{error}</p>}

                                <div className="block-button">
                                    <button
                                        type="submit"
                                        className={`button-main w-full disabled:opacity-100 disabled:pointer-events-none ${isLoading ?
                                            "bg-surface text-secondary2 hover:normal-case border cursor-not-allowed disabled "
                                            : "bg-black text-white hover:bg-green-300"
                                            }`}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Signing Up..." : "Sign Up"}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">Already have an account?</div>
                                <div className="mt-2 text-secondary">Welcome back. Sign in to access your personalized experience, saved preferences, and more. We{String.raw`'re`} thrilled to have you with us again!</div>
                                <div className="block-button md:mt-7 mt-4">
                                    <Link href={'/login'} className="button-main">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register