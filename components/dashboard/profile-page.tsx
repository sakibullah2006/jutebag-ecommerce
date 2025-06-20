"use client"

import { useAuth } from "@/hooks/use-auth"
import { CountryData, Customer, DownloadData, Order } from "@/types/woocommerce"
import { Separator } from "@radix-ui/react-separator"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Button } from "../ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "../ui/sidebar"
import { Downloads } from "./ downloads-section"
import { AccountDetails } from "./account-details"
import { Addresses } from "./addresses-section"
import Dashboard from "./dashboard"
import { Orders } from "./order-section"
import { ProfileSidebar } from "./profile-sidebar"

// // Sample data
// export const userData = {
//   name: "John Doe",
//   email: "john.doe@example.com",
//   joinDate: "January 2023",
//   totalOrders: 24,
//   totalSpent: "$2,450.00",
// }

// export const recentOrders = [
//   { id: "#3102", date: "Dec 15, 2023", status: "Delivered", total: "$120.00" },
//   { id: "#3101", date: "Dec 10, 2023", status: "Processing", total: "$85.50" },
//   { id: "#3100", date: "Dec 5, 2023", status: "Delivered", total: "$200.00" },
// ]

// export const allOrders = [
//   { id: "#3102", date: "Dec 15, 2023", status: "Delivered", total: "$120.00", items: 3 },
//   { id: "#3101", date: "Dec 10, 2023", status: "Processing", total: "$85.50", items: 2 },
//   { id: "#3100", date: "Dec 5, 2023", status: "Delivered", total: "$200.00", items: 4 },
//   { id: "#3099", date: "Nov 28, 2023", status: "Delivered", total: "$150.75", items: 2 },
//   { id: "#3098", date: "Nov 20, 2023", status: "Cancelled", total: "$95.00", items: 1 },
// ]

// export const Dummydownloads = [
//   { name: "Product Manual.pdf", date: "Dec 15, 2023", size: "2.4 MB" },
//   { name: "Software License.txt", date: "Dec 10, 2023", size: "1.2 KB" },
//   { name: "Installation Guide.pdf", date: "Dec 5, 2023", size: "5.8 MB" },
// ]

// export const addresses = [
//   {
//     id: 1,
//     type: "Shipping",
//     name: "John Doe",
//     address: "123 Main St, Apt 4B",
//     city: "New York, NY 10001",
//     isDefault: true,
//   },
//   {
//     id: 2,
//     type: "Billing",
//     name: "John Doe",
//     address: "456 Oak Ave",
//     city: "Brooklyn, NY 11201",
//     isDefault: false,
//   },
// ]


interface ProfilePageProps {
  orders?: Order[],
  downloads?: DownloadData[],
  customer: Customer,
  countries?: CountryData[]
}

export default function ProfilePage({ orders, customer, countries, downloads }: ProfilePageProps) {
  // Get the value of the "tab" search parameter and set it to activeSection
  const searchParams = new URLSearchParams(window.location.search);
  const tab = searchParams.get("tab");
  const [activeSection, setActiveSection] = useState(tab || "dashboard")
  const router = useRouter()


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("tab", activeSection);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard orders={orders} customer={customer} setActiveSection={setActiveSection} />
      case "orders":
        return <Orders orders={orders} />
      case "downloads":
        return <Downloads downloads={downloads} />
      case "addresses":
        return <Addresses billing={customer?.billing} shipping={customer?.shipping} countries={countries || []} />
      case "account":
        return <AccountDetails customer={customer} />
      default:
        return <Dashboard customer={customer} orders={orders} setActiveSection={setActiveSection} />
    }
  }

  // if (isAuthenticated === false) {
  //   router.push("/auth");

  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <p className="text-lg text-muted-foreground">You are not logged in. Please log in to access your account.</p>
  //     </div>
  //   )
  // }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full absolute inset-0">
        <ProfileSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <SidebarInset className="-ml-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="w-full hidden md:flex items justify-between h-16 px-4 md:border-b">
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl font-bold">WooNex Store</span>
                </Link>
              </div>

              <div className="hidden md:flex items-center">
                <Button variant="default" onClick={() => router.push("/")}>
                  Continue Shopping
                </Button>
              </div>
            </div>

            <div className="flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b px-4 md:hidden">
              <h1 className="font-semibold">My Account</h1>

              <div>
                <Button variant="default" onClick={() => router.push("/")}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          </header>

          <main className="p-4 md:p-6">{renderContent()}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
