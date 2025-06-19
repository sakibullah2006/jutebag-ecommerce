"use server"

import Cookies from "js-cookie";

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

const wordpressSiteUrl = process.env.WORDPRESS_SITE_URL;

if (!wordpressSiteUrl) {
    throw new Error("WORDPRESS_SITE_URL is not defined in environment variables");
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

export const userResetPassword = async (email: string): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${wordpressSiteUrl}/wp-json/custom/v1/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const data: AuthResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Reset password error:", error);
        return { success: false, message: "Failed to send reset password email" };
    }
};