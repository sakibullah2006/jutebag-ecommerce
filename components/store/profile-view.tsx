// "use client"

// import { Customer, Order } from '@/types/woocommerce'
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
// import { Separator } from '@radix-ui/react-select'
// import { Badge, ChevronDown, ChevronUp, Clock, Mail, MapPin, Package, Phone, User } from 'lucide-react'
// import React, { useState } from 'react'
// import { Button } from '../ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

// interface Props {
//     customer: Customer,
//     orders: Order[]
// }



// const ProfileView = ({ customer: cdata, odata }: Props) => {
//     const [customer, setCustomer] = useState(cdata || mockCustomer)
//     const [orders, setOrders] = useState(odata || mockOrders)

//     return (
//         <div className="container max-w-4xl py-10">
//             <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

//             {/* User Information Card */}
//             <Card className="mb-8">
//                 <CardHeader>
//                     <CardTitle className="text-xl flex items-center gap-2">
//                         <User className="h-5 w-5" />
//                         Personal Information
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="grid gap-6 md:grid-cols-2">
//                         <div>
//                             <h3 className="font-medium text-sm text-muted-foreground mb-2">Contact Details</h3>
//                             <div className="space-y-2">
//                                 <p className="flex items-center gap-2">
//                                     <User className="h-4 w-4 text-muted-foreground" />
//                                     <span>
//                                         {customer.first_name} {customer.last_name}
//                                     </span>
//                                 </p>
//                                 <p className="flex items-center gap-2">
//                                     <Mail className="h-4 w-4 text-muted-foreground" />
//                                     <span>{customer.email}</span>
//                                 </p>
//                                 <p className="flex items-center gap-2">
//                                     <Phone className="h-4 w-4 text-muted-foreground" />
//                                     <span>{customer.billing.phone}</span>
//                                 </p>
//                             </div>
//                         </div>

//                         <div>
//                             <h3 className="font-medium text-sm text-muted-foreground mb-2">Default Shipping Address</h3>
//                             <div className="space-y-1">
//                                 <p className="flex items-start gap-2">
//                                     <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
//                                     <span className="flex-1">
//                                         {customer.shipping.address_1}
//                                         <br />
//                                         {customer.shipping.city}, {customer.shipping.state} {customer.shipping.postcode}
//                                         <br />
//                                         {customer.shipping.country}
//                                     </span>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="mt-6">
//                         <Button variant="outline" size="sm">
//                             Edit Profile
//                         </Button>
//                     </div>
//                 </CardContent>
//             </Card>

//             {/* Orders Section */}
//             <div>
//                 <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                     <Package className="h-5 w-5" />
//                     My Orders
//                 </h2>

//                 {orders.length === 0 ? (
//                     <Card>
//                         <CardContent className="py-6">
//                             <p className="text-center text-muted-foreground">You haven&apos;t placed any orders yet.</p>
//                         </CardContent>
//                     </Card>
//                 ) : (
//                     <div className="space-y-4">
//                         {orders.map((order) => (
//                             <OrderCard key={order.id} order={order} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// function OrderCard({ order }: { order: Order }) {
//     const [isOpen, setIsOpen] = useState(false)

//     // Format date
//     const formattedDate = new Date(order.date_created).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//     })

//     // Get status color
//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case "completed":
//                 return "bg-green-100 text-green-800"
//             case "processing":
//                 return "bg-blue-100 text-blue-800"
//             case "on-hold":
//                 return "bg-amber-100 text-amber-800"
//             default:
//                 return "bg-gray-100 text-gray-800"
//         }
//     }

//     return (
//         <Card>
//             <CardHeader className="pb-2">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
//                     <div>
//                         <CardTitle className="text-base">Order #{order.id}</CardTitle>
//                         <CardDescription className="flex items-center gap-1 mt-1">
//                             <Clock className="h-3 w-3" />
//                             {formattedDate}
//                         </CardDescription>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <Badge className={`${getStatusColor(order.status)} capitalize`}>{order.status}</Badge>
//                         <span className="font-medium">{order.total}</span>
//                     </div>
//                 </div>
//             </CardHeader>

//             <Collapsible open={isOpen} onOpenChange={setIsOpen}>
//                 <CardContent className="pb-2 pt-0">
//                     <CollapsibleTrigger asChild>
//                         <Button variant="ghost" size="sm" className="flex items-center gap-1 p-0 h-auto">
//                             {isOpen ? (
//                                 <>
//                                     <ChevronUp className="h-4 w-4" />
//                                     <span>Hide details</span>
//                                 </>
//                             ) : (
//                                 <>
//                                     <ChevronDown className="h-4 w-4" />
//                                     <span>View details</span>
//                                 </>
//                             )}
//                         </Button>
//                     </CollapsibleTrigger>

//                     <CollapsibleContent className="mt-4">
//                         <div className="space-y-4">
//                             <div>
//                                 <h4 className="text-sm font-medium mb-2">Items</h4>
//                                 <ul className="space-y-2">
//                                     {order.line_items.map((item, index) => (
//                                         <li key={index} className="flex justify-between text-sm">
//                                             <span>
//                                                 Product #{item.product_id} {item.size && `(${item.size})`}
//                                             </span>
//                                             <span>Qty: {item.quantity}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             <Separator />

//                             <div className="grid gap-4 md:grid-cols-2">
//                                 <div>
//                                     <h4 className="text-sm font-medium mb-2">Shipping Address</h4>
//                                     {order.shipping ? (
//                                         <p className="text-sm text-muted-foreground">
//                                             {order.shipping.first_name} {order.shipping.last_name}
//                                             <br />
//                                             {order.shipping.address_1}
//                                             <br />
//                                             {order.shipping.city}, {order.shipping.state} {order.shipping.postcode}
//                                             <br />
//                                             {order.shipping.country}
//                                         </p>
//                                     ) : (
//                                         <p className="text-sm text-muted-foreground">No shipping information</p>
//                                     )}
//                                 </div>

//                                 <div>
//                                     <h4 className="text-sm font-medium mb-2">Billing Address</h4>
//                                     <p className="text-sm text-muted-foreground">
//                                         {order.billing.first_name} {order.billing.last_name}
//                                         <br />
//                                         {order.billing.address_1}
//                                         <br />
//                                         {order.billing.city}, {order.billing.state} {order.billing.postcode}
//                                         <br />
//                                         {order.billing.country}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex justify-end">
//                                 <Button size="sm" variant="outline">
//                                     View Invoice
//                                 </Button>
//                             </div>
//                         </div>
//                     </CollapsibleContent>
//                 </CardContent>
//             </Collapsible>
//         </Card>
//     )
// }


// export default ProfileView