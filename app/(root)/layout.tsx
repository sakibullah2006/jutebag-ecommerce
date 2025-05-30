import Footer from "@/components/store/Fotter"
import { Navbar, } from "@/components/store/Navbar"
import { CartSheet } from "@/components/store/cart-sheet"
import React from "react"
// import Loading from "./loading"

export default function MainLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <main className="flex flex-col min-h-screen w-full">
                {/* <Suspense fallback={<NavbarSkeleton />}> */}
                <div>
                    {/* <Suspense fallback={<NavbarSkeleton />}> */}
                    <Navbar />
                    {/* </Suspense> */}
                </div>
                {/* </Suspense> */}
                {/* <Suspense fallback={<Loading />}> */}
                <div className="flex-1 pt-16">
                    {children}
                </div>

                {/* </Suspense> */}
            </main>
            <div className="container mx-auto">
                <Footer />
            </div>
            <CartSheet />
        </>
    )
}