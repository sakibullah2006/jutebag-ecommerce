import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Award, History, Target, Users } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
    title: "About Us - Our Company",
    description: "Learn more about our company, mission, vision, team, history, and core values. Discover what makes us unique and how we can help you achieve your goals.",
}

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">About Our Company</h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    We&apos;re a passionate team dedicated to creating innovative solutions that make a difference in people&apos;s
                                    lives.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link href="/contact">
                                    <Button>
                                        Contact Us
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <Image
                            src="/placeholder.svg?height=550&width=550"
                            width={550}
                            height={550}
                            alt="Company team"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:aspect-square"
                        />
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Purpose</div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Mission & Vision</h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Driving innovation and excellence in everything we do.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="flex items-center space-x-2">
                                <Target className="h-6 w-6 text-primary" />
                                <h3 className="text-xl font-bold">Our Mission</h3>
                            </div>
                            <p className="text-muted-foreground">
                                To provide cutting-edge solutions that empower businesses and individuals to achieve their goals
                                efficiently and effectively. We are committed to excellence, innovation, and customer satisfaction in
                                every project we undertake.
                            </p>
                            <div className="flex items-center space-x-2">
                                <Award className="h-6 w-6 text-primary" />
                                <h3 className="text-xl font-bold">Our Vision</h3>
                            </div>
                            <p className="text-muted-foreground">
                                To be the leading provider of innovative solutions in our industry, recognized for our commitment to
                                quality, integrity, and customer-centric approach. We aspire to create a positive impact on society
                                through our work.
                            </p>
                        </div>
                        <Image
                            src="/placeholder.svg?height=550&width=550"
                            width={550}
                            height={550}
                            alt="Company values"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                        />
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Our People</div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet Our Team</h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                The talented individuals who make our company great.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((member, index) => (
                            <Card key={index} className="overflow-hidden pt-0">
                                <div className="aspect-square overflow-hidden bg-muted">
                                    <Image
                                        src={member.image || "/placeholder.svg"}
                                        alt={member.name}
                                        width={400}
                                        height={400}
                                        className="object-cover w-full h-full transition-transform hover:scale-105"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="text-xl font-bold">{member.name}</h3>
                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                    <p className="mt-2 text-sm">{member.bio}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company History */}
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Journey</div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Company History</h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                From humble beginnings to where we are today.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto max-w-3xl space-y-8 py-12">
                        {historyEvents.map((event, index) => (
                            <div key={index} className="relative pl-8 pb-8 border-l border-muted-foreground/20 last:border-0">
                                <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 -translate-x-1/2 rounded-full bg-primary text-primary-foreground">
                                    <History className="h-4 w-4" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">{event.year}</h3>
                                    <p className="text-muted-foreground">{event.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Our Principles</div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Core Values</h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                The principles that guide our work and culture.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                        {coreValues.map((value, index) => (
                            <Card key={index} className="text-center">
                                <CardContent className="p-6">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-bold">{value.title}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 border-t">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to work with us?</h2>
                            <p className="text-muted-foreground md:text-xl">
                                Get in touch with our team to discuss how we can help you achieve your goals.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
                            <Link href="/contact">
                                <Button size="lg">
                                    Contact Us
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button variant="outline" size="lg">
                                    Our Services
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

// Sample data - replace with your actual data
const teamMembers = [
    {
        name: "Jane Smith",
        role: "CEO & Founder",
        bio: "Jane has over 15 years of experience in the industry and founded the company in 2010.",
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        name: "Sakib Ullah",
        role: "Web Developer",
        bio: "Sakib is a skilled web developer with a passion for creating user-friendly applications.",
        image: "https://avatars.githubusercontent.com/u/67195555?u=a3a5a1231c94a4c74f0e7245e52e3d1643cf20e5&v=4",
    },
    {
        name: "Emily Johnson",
        role: "Design Director",
        bio: "Emily brings creative vision to all our projects with her extensive design background.",
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        name: "Michael Brown",
        role: "Marketing Lead",
        bio: "Michael develops our marketing strategies and helps clients grow their businesses.",
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        name: "Sarah Wilson",
        role: "Project Manager",
        bio: "Sarah ensures all our projects are delivered on time and exceed client expectations.",
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        name: "David Lee",
        role: "Lead Developer",
        bio: "David is a coding wizard who turns complex problems into elegant solutions.",
        image: "/placeholder.svg?height=400&width=400",
    },
]

const historyEvents = [
    {
        year: "2010",
        description: "Our company was founded with a vision to revolutionize the industry with innovative solutions.",
    },
    {
        year: "2013",
        description: "Expanded our team and moved to a larger office to accommodate our growing client base.",
    },
    {
        year: "2015",
        description: "Launched our flagship product that quickly became an industry standard.",
    },
    {
        year: "2018",
        description: "Opened our first international office and began serving clients globally.",
    },
    {
        year: "2020",
        description: "Adapted to remote work and continued to thrive despite global challenges.",
    },
    {
        year: "2023",
        description: "Celebrated our most successful year to date with record growth and client satisfaction.",
    },
]

const coreValues = [
    {
        title: "Innovation",
        description: "We constantly seek new and better ways to solve problems and create value.",
        icon: <Target className="h-6 w-6 text-primary" />,
    },
    {
        title: "Integrity",
        description: "We conduct business with honesty, transparency, and ethical standards.",
        icon: <Award className="h-6 w-6 text-primary" />,
    },
    {
        title: "Collaboration",
        description: "We believe in the power of teamwork and partnership with our clients.",
        icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
        title: "Excellence",
        description: "We strive for the highest quality in everything we do.",
        icon: <Award className="h-6 w-6 text-primary" />,
    },
    {
        title: "Customer Focus",
        description: "We put our clients' needs at the center of our decision-making.",
        icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
        title: "Adaptability",
        description: "We embrace change and continuously evolve to meet new challenges.",
        icon: <Target className="h-6 w-6 text-primary" />,
    },
]
