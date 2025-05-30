"use client"

import { Download, Edit, Eye, Loader2, Plus, Trash2, User } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/hooks/use-auth"
import { menuItems } from "@/lib/data"
import { Customer, Order } from "@/types/woocommerce"
import { useRouter } from "next/navigation"

// Sample data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  joinDate: "January 2023",
  totalOrders: 24,
  totalSpent: "$2,450.00",
}

const recentOrders = [
  { id: "#3102", date: "Dec 15, 2023", status: "Delivered", total: "$120.00" },
  { id: "#3101", date: "Dec 10, 2023", status: "Processing", total: "$85.50" },
  { id: "#3100", date: "Dec 5, 2023", status: "Delivered", total: "$200.00" },
]

const allOrders = [
  { id: "#3102", date: "Dec 15, 2023", status: "Delivered", total: "$120.00", items: 3 },
  { id: "#3101", date: "Dec 10, 2023", status: "Processing", total: "$85.50", items: 2 },
  { id: "#3100", date: "Dec 5, 2023", status: "Delivered", total: "$200.00", items: 4 },
  { id: "#3099", date: "Nov 28, 2023", status: "Delivered", total: "$150.75", items: 2 },
  { id: "#3098", date: "Nov 20, 2023", status: "Cancelled", total: "$95.00", items: 1 },
]

const downloads = [
  { name: "Product Manual.pdf", date: "Dec 15, 2023", size: "2.4 MB" },
  { name: "Software License.txt", date: "Dec 10, 2023", size: "1.2 KB" },
  { name: "Installation Guide.pdf", date: "Dec 5, 2023", size: "5.8 MB" },
]

const addresses = [
  {
    id: 1,
    type: "Shipping",
    name: "John Doe",
    address: "123 Main St, Apt 4B",
    city: "New York, NY 10001",
    isDefault: true,
  },
  {
    id: 2,
    type: "Billing",
    name: "John Doe",
    address: "456 Oak Ave",
    city: "Brooklyn, NY 11201",
    isDefault: false,
  },
]


function ProfileSidebar({
  activeSection,
  setActiveSection,
}: {
  activeSection: string
  setActiveSection: (section: string) => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, logout, user } = useAuth()

  const _handleLogout = async () => {
    setIsLoading(true)
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">{user?.user_display_name}</p>
            <p className="text-sm text-muted-foreground">My Account</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => setActiveSection(item.id)} isActive={activeSection === item.id}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter >
        <Button onClick={_handleLogout}>
          {isLoading ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
              Logging Out
            </span>) : <span>Log Out</span>
          }
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

interface DashboardProps {
  orders?: Order[],
  customer: Customer,
}

function Dashboard({ orders, customer }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, {userData.name}!</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-500 font-bold">{userData.totalSpent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Member Since</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.joinDate}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Your last 3 orders</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile-friendly order cards */}
          <div className="block md:hidden space-y-4">
            {recentOrders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{order.total}</span>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>{order.total}</TableCell>
                    {/* <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface OrdersProps {
  orders?: Order[],
}

function Orders({ orders }: OrdersProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Orders</h2>
        <p className="text-muted-foreground">View and manage your order history</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mobile-friendly order cards */}
          <div className="block md:hidden space-y-4">
            {allOrders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                    <p className="text-sm text-muted-foreground">{order.items} items</p>
                  </div>
                  <Badge
                    variant={
                      order.status === "Delivered"
                        ? "default"
                        : order.status === "Processing"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{order.total}</span>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "Processing"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell>{order.total}</TableCell>
                    {/* <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Downloads() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Downloads</h2>
        <p className="text-muted-foreground">Access your downloadable files</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Downloads</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mobile-friendly download cards */}
          <div className="block md:hidden space-y-4">
            {downloads.map((download, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{download.name}</p>
                    <p className="text-sm text-muted-foreground">{download.date}</p>
                    <p className="text-sm text-muted-foreground">{download.size}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-2 flex-shrink-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {downloads.map((download, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{download.name}</TableCell>
                    <TableCell>{download.date}</TableCell>
                    <TableCell>{download.size}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface AddressesProps {
  billing?: Customer["billing"]
  shipping?: Customer["shipping"]
}

function Addresses({ billing, shipping }: AddressesProps) {

  const addressesArray = [billing, shipping]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Addresses</h2>
          <p className="text-muted-foreground">Manage your shipping and billing addresses</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {addresses.map((address) => (
          <Card key={address.id} className="flex justify-between">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{address.type} Address</CardTitle>
                  {address.isDefault && (
                    <Badge variant="secondary" className="w-fit mt-2">
                      Default
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2 ml-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">{address.name}</p>
                <p className="text-sm text-muted-foreground">{address.address}</p>
                <p className="text-sm text-muted-foreground">{address.city}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

interface AccountDetailsProps {
  customer: Customer,
}

function AccountDetails({ customer }: AccountDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Account Details</h2>
        <p className="text-muted-foreground">Update your account information</p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={userData.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={userData.email} />
            </div>
            <Button className="w-full sm:w-auto">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button className="w-full sm:w-auto">Update Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface ProfilePageProps {
  orders?: Order[],
  customer: Customer,
}

export default function ProfilePage({ orders, customer }: ProfilePageProps) {
  const [activeSection, setActiveSection] = useState("dashboard")
  const { isAuthenticated } = useAuth()
  const router = useRouter()


  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard orders={orders} customer={customer} />
      case "orders":
        return <Orders orders={orders} />
      case "downloads":
        return <Downloads />
      case "addresses":
        return <Addresses billing={customer.billing} shipping={customer.shipping} />
      case "account":
        return <AccountDetails customer={customer} />
      default:
        return <Dashboard customer={customer} orders={orders} />
    }
  }

  if (isAuthenticated === false) {
    router.back();

    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">You are not logged in. Please log in to access your account.</p>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <ProfileSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:hidden">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2">
              <h1 className="font-semibold">My Account</h1>
            </div>
          </header>
          <main className="p-4 md:p-6">{renderContent()}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
