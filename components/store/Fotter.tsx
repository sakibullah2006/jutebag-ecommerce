import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="w-full border-t bg-background py-12 mx-0">
            <div className="container grid gap-8 px-4 md:grid-cols-3 md:px-6">
                {/* Section 1: Logo, Copyright, Business Info, Policy */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        {/* <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} className="h-8 w-8" /> */}
                        <span className="text-lg font-semibold">WooNex Store</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        <p>© {new Date().getFullYear()} Company Name. All rights reserved.</p>
                        {/* <p className="mt-1">123 Business Street, Suite 100</p>
                        <p>City, State 12345</p> */}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            Cookie Policy
                        </Link>
                    </div>
                </div>

                {/* Section 2: FAQ */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Frequently Asked Questions
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Help Center
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Support
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Documentation
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Guides
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Section 3: Social Links */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Connect With Us</h3>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Facebook className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Twitter className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Instagram className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Linkedin className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Github className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                    </div>
                    <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">Subscribe to our newsletter</p>
                        <div className="flex max-w-sm items-center space-x-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
