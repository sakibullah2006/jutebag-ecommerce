"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/hooks/use-auth"
import { navbarData, } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Loader2, Menu, Moon, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Suspense, useState } from "react"
import { toast } from "sonner"
import { Skeleton } from "../ui/skeleton"
import CartButton from "./CartButton"


export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const { theme, setTheme } = useTheme()
    const currentPath = usePathname()
    const { isAuthenticated, logout } = useAuth()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)



    // Handle scroll effect for sticky behavior
    if (typeof window !== "undefined" && window.onload) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        })
    }

    const handleLogout = async () => {
        try {
            setIsLoading(true)
            const res = await logout()
            if (res.success) {
                toast.success(`Successfully Logged Out`)
                router.push("/")
            }
        } catch (error) {
            console.log(`LogOut failed, ${error}`)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 w-full transition-all duration-300 dark:bg-gray-900 z-50",
                isScrolled ? "bg-white shadow-md z-50" : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between md:px-6 max-sm:px-3  dark:text-invert ">
                {/* Logo/Brand - Left side */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold">WooNex Store</span>
                    </Link>
                </div>

                {/* Categories - Middle (hidden on mobile) */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navbarData.map((category) => {

                        return (category.isLink ? <Link
                            key={category.name}
                            href={category.href}

                        // className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                        >
                            <Button
                                variant="ghost"
                                className={cn(
                                    "text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-slate-100",
                                    (category.href === currentPath) ? "bg-muted text-primary dark:text-primary" : "",
                                )}
                            >
                                {category.name}
                            </Button>
                        </Link> : (
                            <Link
                                key={category.name}
                                href={`/products`}
                                className={cn(
                                    "text-sm font-medium px-3 py-2 rounded-md text-gray-700 transition-colors hover:bg-muted hover:text-gray-900 hover:dark:bg-muted dark:text-slate-100",
                                    (category.href === currentPath) ? "bg-muted text-primary dark:bg-muted" : "",
                                )}
                            >
                                {category.name}
                            </Link>
                        ))
                    })}
                </nav>

                {/* Right side - Cart and Mobile Menu */}
                <div className="flex items-center gap-8 justify-between">
                    {/* Cart Icon - Always visible and sticky */}
                    <div className="flex items-center justify-center">
                        <CartButton />


                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <SheetHeader hidden>
                                    <SheetTitle hidden>mobile menu</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-6">

                                    <div className="flex items-center justify-between">
                                        <Link href="/" className="flex items-center gap-2">
                                            <span className="text-xl font-bold">WooNex Store</span>
                                        </Link>
                                        {/* <SheetClose asChild>
                                        <Button variant="ghost" size="icon">
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </SheetClose> */}
                                    </div>
                                    <div className="flex gap-3 justify-between items-center">
                                        <Link href="/profile">
                                            <Button
                                                variant="ghost"
                                                className={cn("", ("/profile" === currentPath) ? "bg-muted400 text-primary dark:text-primary dark:bg-gray-500" : "",
                                                )}
                                            >
                                                <User size="icon" />
                                                <span className="">Profile</span>
                                            </Button>
                                        </Link>

                                        {/* Theme toggle button */}
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                                                aria-label="Toggle theme"
                                            >
                                                <Suspense fallback={<Skeleton className="h-5 w-5" />}>
                                                    {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-blue-500" />}
                                                </Suspense>
                                            </button>
                                        </div>
                                    </div>
                                    <nav className="flex flex-col space-y-4">
                                        {navbarData.map((category) => (
                                            <SheetClose asChild key={category.name}>
                                                <Link
                                                    href={category.href}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        className={cn(
                                                            "text-base font-medium text-gray-700 transition-colors hover:text-gray-900 dark:bg-gray-600 dark:text-foreground",
                                                            (category.href === currentPath) ? "bg-muted400 text-primary dark:text-primary dark:bg-gray-500" : "",
                                                        )}
                                                    >
                                                        {category.name}
                                                    </Button>
                                                </Link>
                                            </SheetClose>
                                        ))}
                                        <SheetClose asChild key="auth">
                                            {isAuthenticated ? (
                                                <Button
                                                    variant="default"
                                                    onClick={handleLogout}
                                                >

                                                    {isLoading ? (
                                                        <span className="flex items-center">
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Logging Out
                                                        </span>) : <span>Log Out</span>}
                                                </Button>
                                            ) :
                                                (
                                                    <Button
                                                        onClick={() => router.push('/auth')}
                                                        variant="default"
                                                        disabled={isLoading}

                                                    >

                                                        Log In
                                                    </Button>
                                                )
                                            }

                                        </SheetClose>

                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Login/Loout Button */}
                    <div className="flex items-center justify-center max-sm:hidden">
                        {!isAuthenticated ? (
                            <Link href="/auth">
                                <Button
                                    variant="ghost"
                                >
                                    Log In
                                </Button>
                            </Link>
                        ) : (
                            <div className="flex gap-3 max-sm:hidden">
                                <Link href="/profile">
                                    <Button
                                        variant="ghost"
                                        className={cn("", ("/profile" === currentPath) ? "bg-muted400 text-primary dark:text-primary dark:bg-gray-500" : "",
                                        )}
                                    >
                                        <User size="icon" />
                                        <span className="max-sm:hidden">Profile</span>
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    onClick={handleLogout}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Logging Out
                                        </span>) : <span>Log Out</span>
                                    }
                                </Button>
                            </div>
                        )}

                    </div>

                    {/* Theme toggle button */}
                    <div className="flex items-center justify-center max-sm:hidden">
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="absolute top-4 right-4 p-2 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                            aria-label="Toggle theme"
                        >
                            <Suspense fallback={<Skeleton className="h-5 w-5" />}>
                                {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-blue-500" />}
                            </Suspense>
                        </button>
                    </div>
                </div>
            </div>
        </header >
    )
}



