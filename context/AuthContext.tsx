"use client";
import { AuthResponse, User, userLogin, userLogout, userResetPassword, userSignup } from "@/actions/auth-actions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";


interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (username: string, password: string) => Promise<AuthResponse>;
    signup: (username: string, email: string, password: string) => Promise<AuthResponse>;
    logout: () => Promise<AuthResponse>;
    resetPassword: (email: string) => Promise<AuthResponse>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    // const router = useRouter();

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
        const data = await userLogin(username, password);
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
    };

    const signup = async (username: string, email: string, password: string): Promise<AuthResponse> => {
        const data = await userSignup(username, email, password);
        return data;
    };

    const logout = async (): Promise<AuthResponse> => {
        const data = await userLogout();
        if (data.success) {
            Cookies.remove("jwt_token");
            Cookies.remove("user");
            setUser(null);
            setIsAuthenticated(false);
        }
        return data;
    };

    const resetPassword = async (email: string): Promise<AuthResponse> => {
        const data = await userResetPassword(email);
        return data;
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, signup, logout, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};