import { z } from 'zod';

export const requestOtpSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
});

export const verifyOtpSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6, 'OTP must be 6 digits.'),
});

export const resetPasswordSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
});