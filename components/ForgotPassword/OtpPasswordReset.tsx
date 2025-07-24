'use client';

import { useState, useEffect, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import OtpInput from 'react-otp-input';
import { useAuth } from '@/context/AuthContext';
import { requestOtpSchema, verifyOtpSchema, resetPasswordSchema } from '@/lib/validations/resetPasswordValidation';
import { z } from 'zod';
import Link from 'next/link';
import { PATH } from '../../constant/pathConstants';

// A submit button component that shows a loading state
function SubmitButton({ text, isTransitionPending = false }: { text: string; isTransitionPending?: boolean }) {
    const isLoading = isTransitionPending;

    return (
        <button
            type="submit"
            disabled={isLoading}
            className={`button-main w-full disabled:opacity-100 disabled:pointer-events-none ${isLoading ?
                "bg-surface text-secondary2 border cursor-not-allowed disabled hover:normal-case"
                : "bg-black text-white hover:bg-green-300"
                }`}
        >
            {isLoading ? 'Please wait...' : text}
        </button>
    );
}

// Infer types from Zod schemas
type RequestOtpForm = z.infer<typeof requestOtpSchema>;
type VerifyOtpForm = z.infer<typeof verifyOtpSchema>;
type ResetPasswordForm = { password: string }; // Simplified type for just password

// Simple password validation schema
const passwordOnlySchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

export default function OtpPasswordReset() {
    const { requestOtp, verifyOtp, resetPassword } = useAuth();

    const [step, setStep] = useState<'request' | 'verify' | 'reset'>('request');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isVerifyPending, startVerifyTransition] = useTransition();
    const [isRequestPending, startRequestTransition] = useTransition();
    const [isResetPending, startResetTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
    const [requestError, setRequestError] = useState<string | null>(null);
    const [verifyError, setVerifyError] = useState<string | null>(null);
    const [resetError, setResetError] = useState<string | null>(null);
    const [isResetComplete, setIsResetComplete] = useState(false);

    // --- React Hook Form instances for each step ---
    const {
        register: registerRequest,
        handleSubmit: handleRequestSubmit,
        formState: { errors: requestErrors },
    } = useForm<RequestOtpForm>({ resolver: zodResolver(requestOtpSchema) });

    const {
        control: verifyControl,
        handleSubmit: handleVerifySubmit,
        watch: watchVerify,
    } = useForm<VerifyOtpForm>({ resolver: zodResolver(verifyOtpSchema) });

    const {
        register: registerReset,
        handleSubmit: handleResetSubmit,
        formState: { errors: resetErrors },
    } = useForm<ResetPasswordForm>({ resolver: zodResolver(passwordOnlySchema) });

    // --- Server action state hooks ---
    // Using Auth Context instead of useFormState

    // --- Step transition logic ---
    // Steps are managed through successful function calls now

    // --- Auto-submit OTP form ---
    const otpValue = watchVerify('otp');

    // Reset auto-submit flag when OTP changes (user starts typing new OTP)
    useEffect(() => {
        if (otpValue && otpValue.length < 6) {
            setHasAutoSubmitted(false);
        }
    }, [otpValue]);

    useEffect(() => {
        if (otpValue?.length === 6 && !isVerifyPending && !hasAutoSubmitted) {
            setHasAutoSubmitted(true); // Set flag to prevent multiple submissions
            startVerifyTransition(async () => {
                try {
                    const result = await verifyOtp(email, otpValue);
                    if (result.success) {
                        setOtp(otpValue); // Store OTP for the final step
                        setStep('reset');
                        setHasAutoSubmitted(false); // Reset flag when moving to next step
                        setVerifyError(null);
                    } else {
                        const errorMessage = typeof result.error === 'string'
                            ? result.error
                            : 'OTP verification failed';
                        setVerifyError(errorMessage);
                        setHasAutoSubmitted(false); // Allow retry
                    }
                } catch (error) {
                    setVerifyError('OTP verification failed');
                    setHasAutoSubmitted(false); // Allow retry
                }
            });
        }
    }, [otpValue, verifyOtp, email, isVerifyPending, hasAutoSubmitted]);

    // --- Final success message ---
    if (isResetComplete) {
        return (
            <div className="login-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="md:w-1/2 w-full max-w-md text-center">
                            <div className="heading4 mb-4 flex items-center justify-center gap-3">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22,4 12,14.01 9,11.01" />
                                </svg>
                                Password Reset Successful!
                            </div>
                            <p className="text-secondary mb-7">Your password has been successfully reset. You can now login with your new password.</p>
                            <div className="block-button">
                                <Link href={PATH.LOGIN} className="button-main">Go to Login</Link>
                            </div>
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
        );
    }

    return (
        <div className="login-block md:py-20 py-10">
            <div className="container">
                <div className="content-main flex gap-y-8 max-md:flex-col">
                    <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                        {/* --- STEP 1: Request OTP --- */}
                        {step === 'request' && (
                            <div>
                                <div className="heading4 mb-7">Reset Your Password</div>
                                <form
                                    onSubmit={handleRequestSubmit(async (data) => {
                                        setEmail(data.email); // Store email for next steps
                                        startRequestTransition(async () => {
                                            try {
                                                const result = await requestOtp(data.email);
                                                if (result.success) {
                                                    setStep('verify');
                                                    setRequestError(null);
                                                } else {
                                                    const errorMessage = typeof result.error === 'string'
                                                        ? result.error
                                                        : 'Failed to send OTP';
                                                    setRequestError(errorMessage);
                                                }
                                            } catch (error) {
                                                setRequestError('Failed to send OTP');
                                            }
                                        });
                                    })}
                                >
                                    <div className="email">
                                        <input
                                            {...registerRequest('email')}
                                            id="email"
                                            type="email"
                                            placeholder="Email Address *"
                                            className={`border-line px-4 pt-3 pb-3 w-full rounded-lg ${requestErrors.email ? "border-red" : ""}`}
                                        />
                                        {requestErrors.email && <p className="text-red text-sm mt-1">{requestErrors.email.message}</p>}
                                        {requestError && <p className="text-red text-sm mt-1">{requestError}</p>}
                                    </div>
                                    <div className="block-button md:mt-7 mt-4">
                                        <SubmitButton text="Send OTP" isTransitionPending={isRequestPending} />
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* --- STEP 2: Verify OTP --- */}
                        {step === 'verify' && (
                            <div>
                                <div className="heading4 mb-7 flex items-center justify-center">Verify OTP</div>
                                <p className="mb-6 text-center text-secondary">Enter the code sent to <strong className="text-black">{email}</strong></p>
                                <form
                                    onSubmit={handleVerifySubmit(async (data) => {
                                        try {
                                            const result = await verifyOtp(email, data.otp);
                                            if (result.success) {
                                                setOtp(data.otp);
                                                setStep('reset');
                                                setVerifyError(null);
                                            } else {
                                                const errorMessage = typeof result.error === 'string'
                                                    ? result.error
                                                    : 'OTP verification failed';
                                                setVerifyError(errorMessage);
                                            }
                                        } catch (error) {
                                            setVerifyError('OTP verification failed');
                                        }
                                    })}
                                >
                                    <div className="flex justify-center mb-6">
                                        <Controller
                                            name="otp"
                                            control={verifyControl}
                                            render={({ field }) => (
                                                <OtpInput
                                                    value={field.value || ''}
                                                    onChange={field.onChange}
                                                    numInputs={6}
                                                    containerStyle="justify-center gap-2"
                                                    inputStyle="text-2xl border border-line rounded-lg !w-12 h-14 focus:border-black focus:outline-none text-center"
                                                    renderInput={(props) => <input {...props} />}
                                                />
                                            )}
                                        />
                                    </div>
                                    {isVerifyPending && (
                                        <p className="text-center text-secondary text-sm mb-4">Verifying OTP...</p>
                                    )}
                                    {verifyError && <p className="text-red text-sm text-center mb-4">{verifyError}</p>}
                                    <div className="block-button">
                                        <SubmitButton text="Verify OTP" isTransitionPending={isVerifyPending} />
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* --- STEP 3: Reset Password --- */}
                        {step === 'reset' && (
                            <div>
                                <div className="heading4 mb-7">Set New Password</div>
                                <form
                                    onSubmit={handleResetSubmit(async (data) => {
                                        console.log('Form submitted with data:', data);
                                        console.log('Email:', email, 'OTP:', otp);
                                        startResetTransition(async () => {
                                            try {
                                                console.log('Calling resetPassword...');
                                                const result = await resetPassword(email, otp, data.password);
                                                console.log('Reset password result:', result);
                                                if (result.success) {
                                                    setIsResetComplete(true);
                                                    setResetError(null);
                                                } else {
                                                    const errorMessage = typeof result.error === 'string'
                                                        ? result.error
                                                        : 'Password reset failed';
                                                    setResetError(errorMessage);
                                                }
                                            } catch (error) {
                                                console.error('Password reset error:', error);
                                                setResetError('Password reset failed');
                                            }
                                        });
                                    })}
                                >
                                    <div className="pass relative">
                                        <input
                                            {...registerReset('password')}
                                            name="password"
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="New Password *"
                                            className={`border-line px-4 pt-3 pb-3 w-full rounded-lg pr-12 ${resetErrors.password ? "border-red" : ""}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-black transition-colors"
                                        >
                                            {showPassword ? (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                    <line x1="1" y1="1" x2="23" y2="23" />
                                                </svg>
                                            ) : (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                        {resetErrors.password && <p className="text-red text-sm mt-1">{resetErrors.password.message}</p>}
                                        {resetError && <p className="text-red text-sm mt-1">{resetError}</p>}
                                    </div>
                                    <div className="block-button md:mt-7 mt-4">
                                        <button
                                            type="submit"
                                            disabled={isResetPending}
                                            onClick={() => console.log('Reset password button clicked')}
                                            className={`button-main w-full disabled:opacity-100 disabled:pointer-events-none ${isResetPending ?
                                                "bg-surface text-secondary2 border cursor-not-allowed disabled hover:normal-case"
                                                : "bg-black text-white hover:bg-green-300"
                                                }`}
                                        >
                                            {isResetPending ? 'Please wait...' : 'Reset Password'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
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
    );
}