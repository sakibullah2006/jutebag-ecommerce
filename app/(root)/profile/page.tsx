import { fetchProfileData } from "@/actions/customer-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer, Order } from "@/types/woocommerce";
import { Mail, MapPin, Package, Phone, User } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OrderCard from "../../../components/store/OrderCard"; // Import the separate Client Component

export default async function ProfilePage() {
    const token = (await cookies()).get("jwt_token")?.value;
    if (!token) {
        redirect("/auth");
    }

    const storedUser = (await cookies()).get("user")?.value
    // const email = JSON.parse(storedUser!).user_email
    const userId = JSON.parse(storedUser!).user_id
    // console.log(email)

    if (!userId) {
        return (
            <div className="container max-w-4xl py-10 mx-auto">
                <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
                <Card>
                    <CardContent className="py-6">
                        <p className="text-center text-muted-foreground">User ID not found. Please log in again.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    let customer: Customer | null = null;
    let orders: Order[] = [];
    let error: string | null = null;

    try {
        const data = await fetchProfileData(userId);
        customer = data.customer;
        orders = data.orders;
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to fetch profile data";
        console.error("ProfilePage server-side error:", err);
    }

    if (error || !customer) {
        return (
            <div className="container max-w-4xl py-10">
                <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
                <Card>
                    <CardContent className="py-6">
                        <p className="text-center text-muted-foreground">
                            {error || "Unable to load profile data. Please try again later."}
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container max-w-4xl py-10 mx-auto">
            <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

            {/* User Information Card */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="font-medium text-sm text-muted-foreground mb-2">Contact Details</h3>
                            <div className="space-y-2">
                                <p className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                        {customer.first_name} {customer.last_name}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{customer.email}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{customer.billing.phone || "Not provided"}</span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium text-sm text-muted-foreground mb-2">Default Shipping Address</h3>
                            <div className="space-y-1">
                                <p className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <span className="flex-1">
                                        {customer.shipping.address_1 || "Not provided"}
                                        {customer.shipping.address_1 && (
                                            <>
                                                <br />
                                                {customer.shipping.city}, {customer.shipping.state} {customer.shipping.postcode}
                                                <br />
                                                {customer.shipping.country}
                                            </>
                                        )}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button
                            variant="outline"
                            size="sm"
                        // onClick={() => toast.info("Edit profile feature coming soon!")}
                        >
                            Edit Profile
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Orders Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    My Orders
                </h2>

                {orders.length === 0 ? (
                    <Card>
                        <CardContent className="py-6">
                            <p className="text-center text-muted-foreground">You haven&apos;t placed any orders yet.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}