"use server"

import Cookies from "js-cookie";
import z from "zod";
import dns from 'dns/promises';
import { requestOtpSchema, verifyOtpSchema, resetPasswordSchema } from "../lib/validations/resetPasswordValidation";


export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user_id?: number;
    user_email?: string;
    user_display_name?: string;
}

export interface User {
    user_id: number;
    user_email: string;
    user_display_name: string;
}

export interface PasswordResetResponse {
    success?: string;
    error?: string | { [key: string]: string[] | undefined };
    resetComplete?: boolean;
}

const wordpressSiteUrl = process.env.WORDPRESS_SITE_URL;

if (!wordpressSiteUrl) {
    throw new Error("WORDPRESS_SITE_URL is not defined in environment variables");
}


async function apiCall(endpoint: string, body: object) {
    try {
        const response = await fetch(`${wordpressSiteUrl}/wp-json/custom/v1${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            cache: 'no-store', // Ensure fresh data for auth actions
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: data.message || 'An unknown server error occurred.' };
        }
        return { success: data.message };
    } catch (error) {
        return { error: 'Could not connect to the server. Please try again.' };
    }
}

async function isEmailDomainReal(email: string): Promise<boolean> {
    try {
        const domain = email.split('@')[1];
        const addresses = await dns.resolveMx(domain);
        return addresses && addresses.length > 0;
    } catch (error) {
        return false; // Domain does not exist or has no MX records
    }
}

export const userLogin = async (username: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${wordpressSiteUrl}/wp-json/custom/v1/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data: AuthResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "Login failed" };
    }
};

export const userSignup = async (username: string, email: string, password: string): Promise<AuthResponse> => {

    if (!(await isEmailDomainReal(email))) {
        return { success: false, message: "Email domain appears to be invalid." };
    }

    try {
        const response = await fetch(`${wordpressSiteUrl}/wp-json/custom/v1/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });
        const data: AuthResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Signup error:", error);
        return { success: false, message: "Signup failed" };
    }
};

export const userLogout = async (): Promise<AuthResponse> => {
    try {
        const token = Cookies.get("jwt_token");
        if (!token) {
            return { success: true, message: "No token found, already logged out" };
        }

        const response = await fetch(`${wordpressSiteUrl}/wp-json/custom/v1/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const data: AuthResponse = await response.json();

        // Check the success field directly
        if (data.success) {
            return { success: true, message: "Logout successful" };
        } else {
            return { success: false, message: data.message || "Logout failed" };
        }
    } catch (error) {
        console.error("Logout error:", error);
        return { success: false, message: "Logout failed due to an error" };
    }
};

/**
 Action to request a password reset OTP.
 */
export async function requestPasswordOtp(prevState: any, formData: FormData) {
    const validatedFields = requestOtpSchema.safeParse({ email: formData.get('email') });
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }
    return apiCall('/request-password-otp', validatedFields.data);
}

/**
  Action to verify the OTP.
 */
export async function verifyPasswordOtp(prevState: any, formData: FormData) {
    const validatedFields = verifyOtpSchema.safeParse({
        email: formData.get('email'),
        otp: formData.get('otp'),
    });
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }
    return apiCall('/verify-password-otp', validatedFields.data);
}

/**
 Action to reset the password using the verified OTP.
 */
export async function resetPasswordWithOtp(prevState: any, formData: FormData): Promise<PasswordResetResponse> {
    const validatedFields = resetPasswordSchema.safeParse({
        email: formData.get('email'),
        otp: formData.get('otp'),
        password: formData.get('password'),
    });
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }
    const result = await apiCall('/reset-password-with-otp', validatedFields.data);

    // Add a flag to signal completion to the UI
    if (result.success) {
        return { ...result, resetComplete: true };
    }
    return result;
}