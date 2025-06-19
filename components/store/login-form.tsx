"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const loginSchema = z.object({
    username: z.string().min(3, { message: "Username is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await login(data.username, data.password);
            if (response.success) {
                toast.success("Login successful");
                router.push("/profile");
            } else {
                setError(response.message);
                toast.error(response.message);
            }
        } catch {
            setError("Failed to login. Please try again.");
            toast.error("Failed to login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    placeholder="name@example.com"
                    autoComplete="username"
                    {...register("username")}
                    aria-invalid={errors.username ? "true" : "false"}
                />
                {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                        type="button"
                        className="text-sm hover:text-primary/90 transition-colors text-blue-600"
                        onClick={() => router.push("/auth/reset-password")}
                    >
                        Forgot password?
                    </button>
                </div>
                <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password")}
                    aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                    </>
                ) : (
                    "Login"
                )}
            </Button>
        </form>


    );
}