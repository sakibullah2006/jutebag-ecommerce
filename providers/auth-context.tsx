"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

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

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (username: string, password: string) => Promise<AuthResponse>;
    signup: (username: string, email: string, password: string) => Promise<AuthResponse>;
    logout: () => Promise<AuthResponse>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("jwt_token");
        const storedUser = Cookies.get("user");
        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error parsing stored user:", error);
                Cookies.remove("jwt_token");
                Cookies.remove("user");
            }
        }
        setLoading(false);
    }, []);

    const login = async (username: string, password: string): Promise<AuthResponse> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/custom/v1/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data: AuthResponse = await response.json();
            if (data.success && data.token && data.user_id) {
                Cookies.set("jwt_token", data.token, { secure: true, sameSite: "strict", expires: 7 });
                const userData: User = {
                    user_id: data.user_id,
                    user_email: data.user_email || "",
                    user_display_name: data.user_display_name || "",
                };
                Cookies.set("user", JSON.stringify(userData), { secure: true, sameSite: "strict", expires: 7 });
                setUser(userData);
                setIsAuthenticated(true);
            }
            return data;
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: "Login failed" };
        }
    };

    const signup = async (username: string, email: string, password: string): Promise<AuthResponse> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/custom/v1/signup`, {
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

    const logout = async (): Promise<AuthResponse> => {
        try {
            const token = Cookies.get("jwt_token");
            const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/custom/v1/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            const data: AuthResponse = await response.json();
            if (data.success) {
                Cookies.remove("jwt_token");
                Cookies.remove("user");
                setUser(null);
                setIsAuthenticated(false);
                router.push("/auth");
            }
            return data;
        } catch (error) {
            console.error("Logout error:", error);
            Cookies.remove("jwt_token");
            Cookies.remove("user");
            setUser(null);
            setIsAuthenticated(false);
            router.push("/auth");
            return { success: true, message: "Logout successful" };
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

