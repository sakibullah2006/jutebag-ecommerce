"use client";

import { AuthResponse, userResetPassword } from "@/actions/auth-actions";
import { ConfirmationDialog } from "@/components/dialog/confirmation-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import React, { useEffect, useState } from 'react';

type Props = {}

const PasswordResetVIew = (props: Props) => {
    const searchParams = new URLSearchParams(window.location.search);
    let defaultEmail = searchParams.get("email");
    const [email, setEmail] = useState(defaultEmail || "");
    const [response, setResponse] = useState<AuthResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    // Access searchParams only on the client side

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        // This runs only on the client, so searchParams is safe to access
        let defaultEmail = searchParams.get("email") || "";
        // If email is not provided, set it to an empty string

        // Update the email state with the value from searchParams
        setEmail(defaultEmail);
    }, [searchParams]);

    const handleSubmit = async () => {
        setIsLoading(true);
        setResponse(null);

        try {
            if (isAuthenticated) {
                await logout();
            }
            const response = await userResetPassword(email);

            if (response.success) {
                setResponse({
                    success: true,
                    message: `A reset link has been sent to ${email}. Please check your inbox.`,
                });
            } else {
                setResponse({
                    success: false,
                    message: response.message || "Failed to send reset email. Please try again.",
                });
            }
        } catch (error) {
            setResponse({
                success: false,
                message: "An error occurred while sending the reset email. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
                        <CardDescription className="text-center">
                            Enter your email address and we'll send you a link to reset your password
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setConfirmationDialogOpen(true);
                            }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading || isAuthenticated}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading || !email}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Reset Email"
                                )}
                            </Button>
                        </form>

                        {response && (
                            <Alert className={response.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                                {response.success ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                    <XCircle className="h-4 w-4 text-red-600" />
                                )}
                                <AlertDescription className={`ml-2 ${response.success ? "text-green-800" : "text-red-800"}`}>
                                    {response.message}
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="text-center text-sm text-gray-600">
                            Remember your password?{" "}
                            <a href="/login" className="text-blue-600 hover:underline">
                                Back to login
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <ConfirmationDialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
                <div className="p-6">
                    <DialogHeader>
                        <DialogTitle>Confirm Reset</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to reset your password? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="w-full mt-2">
                        <Button variant="outline" onClick={() => setConfirmationDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => {
                                handleSubmit();
                                setConfirmationDialogOpen(false);
                            }}
                            disabled={isLoading || !email}
                        >
                            Confirm Reset
                        </Button>
                    </DialogFooter>
                </div>
            </ConfirmationDialog>
        </>
    );
}

export default PasswordResetVIew