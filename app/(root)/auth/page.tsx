"use client";

import { LoginForm } from "@/components/store/login-form";
import { SignupForm } from "@/components/store/signup-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState<string>("login");
    const { isAuthenticated } = useAuth();

    // Prevent rendering if already authenticated
    if (isAuthenticated) {
        return null;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        {activeTab === "login" ? "Welcome back" : "Create an account"}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {activeTab === "login"
                            ? "Enter your credentials to sign in to your account"
                            : "Enter your information to create an account"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <LoginForm />
                        </TabsContent>
                        <TabsContent value="signup">
                            <SignupForm />
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-center text-muted-foreground">
                        {activeTab === "login" ? (
                            <p>
                                Don&apos;t have an account?{" "}
                                <button
                                    onClick={() => setActiveTab("signup")}
                                    className="underline text-primary hover:text-primary/90 transition-colors"
                                >
                                    Sign up
                                </button>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{" "}
                                <button
                                    onClick={() => setActiveTab("login")}
                                    className="underline text-primary hover:text-primary/90 transition-colors"
                                >
                                    Login
                                </button>
                            </p>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}