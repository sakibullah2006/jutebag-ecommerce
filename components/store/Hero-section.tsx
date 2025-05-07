"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {

    return (
        <div className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
            {/* Background with theme-aware gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 z-0" />

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 dark:bg-yellow-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300">
                    Quality is not a Demand
                </h1>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-10 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-purple-600 dark:from-rose-400 dark:to-purple-400">
                    It&apos;s a Requirement
                </h1>
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-10">
                    We believe in delivering excellence without compromise. Our commitment to quality drives everything we do.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={"/#product-showcase"}>
                        <Button size="lg" className="text-lg px-8">
                            Shop Now
                        </Button>
                    </Link>
                </div>
            </div>


        </div>
    )
}
