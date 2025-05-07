"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { navbarData, } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Menu, Moon, ShoppingCart, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Suspense, useState } from "react"
import { Skeleton } from "../ui/skeleton"


export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const { theme, setTheme } = useTheme()
    const currentPath = usePathname()
    const { totalItems } = useCart()


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

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 w-full transition-all duration-300 dark:bg-gray-900 z-50",
                isScrolled ? "bg-white shadow-md z-50" : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-6 dark:text-invert ">
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
                                href={`/products?category=male-fashion`}
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
                        <Link href="/cart">
                            <Button variant="ghost" size="icon"
                                className={cn("relative", totalItems > 0
                                    ? "text-primary" : "text-gray-500",
                                    (currentPath === "/cart") ? "bg-muted text-primary dark:text-primary" : "",

                                )}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white dark:bg-white dark:text-black">
                                    {totalItems}
                                </span>
                            </Button>
                        </Link>


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
                                    <nav className="flex flex-col space-y-4">
                                        {navbarData.map((category) => (
                                            <SheetClose asChild key={category.name}>
                                                <Link
                                                    href={category.href}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        className={cn(
                                                            "text-base font-medium text-gray-700 transition-colors hover:text-gray-900 dark:bg-gray-800",
                                                            (category.href === currentPath) ? "bg-muted text-primary dark:text-primary" : "",
                                                        )}
                                                    >
                                                        {category.name}
                                                    </Button>
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>


                    {/* Theme toggle button */}
                    <div className="flex items-center justify-center">
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
        </header>
    )
}



