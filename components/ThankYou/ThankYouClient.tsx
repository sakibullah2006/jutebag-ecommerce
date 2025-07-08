'use client'

import React from 'react'
import Link from 'next/link'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useModalCartContext } from '@/context/ModalCartContext'
import { decodeHtmlEntities, formatDate } from '@/lib/utils';
import Image from "next/image"
import { OrderType } from '@/types/order-type'
import { useCart } from '@/context/CartContext'
import { useAppData } from '../../context/AppDataContext';

interface ThankYouClientProps {
    orderData: OrderType
}

const ThankYouClient: React.FC<ThankYouClientProps> = ({
    orderData,
}) => {
    const { openModalCart } = useModalCartContext()
    const { cartState } = useCart()
    const { currentCurrency } = useAppData()

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'processing':
                return 'text-blue-600 bg-blue-100'
            case 'completed':
                return 'text-green-600 bg-green-100'
            case 'pending':
                return 'text-yellow-600 bg-yellow-100'
            case 'on-hold':
                return 'text-orange-600 bg-orange-100'
            case 'cancelled':
            case 'refunded':
            case 'failed':
                return 'text-red-600 bg-red-100'
            default:
                return 'text-gray-600 bg-gray-100'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'processing':
                return <Icon.ClockIcon size={20} />
            case 'completed':
                return <Icon.CheckCircleIcon size={20} />
            case 'pending':
                return <Icon.CircleDashedIcon size={20} />
            case 'on-hold':
                return <Icon.PauseIcon size={20} />
            case 'cancelled':
            case 'refunded':
            case 'failed':
                return <Icon.XCircleIcon size={20} />
            default:
                return <Icon.InfoIcon size={20} />
        }
    }

    return (
        <>
            {/* Header - Same as checkout */}
            <div id="header" className='relative w-full'>
                <div className={`header-menu style-one fixed top-0 left-0 right-0 w-full md:h-[74px] h-[56px]`}>
                    <div className="container mx-auto h-full">
                        <div className="header-main flex items-center justify-between h-full">
                            <Link href={'/'} className='flex items-center'>
                                <div className="heading4">Anvogue</div>
                            </Link>
                            <button className="max-md:hidden cart-icon flex items-center relative h-fit cursor-pointer" onClick={openModalCart}>
                                <Icon.Handbag size={24} color='black' />
                                <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">{cartState.cartArray.length}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thank You Content */}
            <div className="thank-you-block relative md:pt-[74px] pt-[56px]">
                <div className="container mx-auto">
                    <div className="content-main max-w-4xl mx-auto py-20 px-4">
                        {/* Success Header */}
                        <div className="text-center mb-12">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <Icon.CheckCircle size={32} className="text-green-600" />
                                </div>
                            </div>
                            <h1 className="heading2 mb-4">Thank You for Your Order!</h1>
                            <p className="body1 text-secondary2 mb-6">
                                Your order has been successfully placed. We&apos;ll send you a confirmation email shortly.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">Order Number:</span>
                                    <span className="bg-black text-white px-3 py-1 rounded">#{orderData.number}</span>
                                </div>
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(orderData.status)}`}>
                                    {getStatusIcon(orderData.status)}
                                    <span className="font-semibold capitalize">{orderData.status.replace('-', ' ')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Left Column - Order Details */}
                            <div className="space-y-8">
                                {/* Order Items */}
                                <div className="bg-surface rounded-lg p-6">
                                    <h3 className="heading5 mb-6">Order Items</h3>
                                    <div className="space-y-4">
                                        {orderData.line_items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-line last:border-b-0 last:pb-0">
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    {item.meta_data && item.meta_data.length > 0 && item.meta_data[0]?.value && item.meta_data[0]?.key === "product_image" ?
                                                        <Image src={item.meta_data[0].value} alt={item.name} width={64} height={64} className="object-cover rounded-lg" />
                                                        :
                                                        <Icon.PackageIcon size={24} className="text-gray-400" />
                                                    }
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-title font-semibold">{item.name}</h4>
                                                    <div className="flex items-center gap-4 mt-1">
                                                        <span className="text-secondary">Qty: {item.quantity}</span>
                                                        {item.sku && (
                                                            <span className="text-secondary">SKU: {item.sku}</span>
                                                        )}
                                                    </div>
                                                    <div className=' text-sm text-secondary flex flex-wrap gap-2'>
                                                        {item.meta_data && item.meta_data.length > 0 && item.meta_data.map((meta) => (
                                                            meta.key !== "product_image" && meta.key !== "_reduced_stock" && meta.key && meta.value ? (
                                                                <span key={meta.id} className="text-secondary">
                                                                    {meta.key}: {meta.value}
                                                                </span>
                                                            ) : null
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-title font-semibold">
                                                        {decodeHtmlEntities(currentCurrency?.symbol || '$')}{Number(item.total).toFixed(2)}
                                                    </div>
                                                    <div className="text-sm text-secondary">
                                                        {decodeHtmlEntities(currentCurrency?.symbol || '$')}{Number(item.price).toFixed(2)} each
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Shipping & Billing Addresses */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {/* Shipping Address */}
                                    {orderData.shipping && (
                                        <div className="bg-surface rounded-lg py-6 px-4">
                                            <h3 className="heading6 mb-4 flex text-lg items-center gap-4">
                                                <Icon.Truck size={30} />
                                                Shipping Address
                                            </h3>
                                            <div className="text-sm space-y-1">
                                                <div className="font-semibold">
                                                    {orderData.shipping.first_name} {orderData.shipping.last_name}
                                                </div>
                                                {orderData.shipping.company && (
                                                    <div>{orderData.shipping.company}</div>
                                                )}
                                                <div>{orderData.shipping.address_1}</div>
                                                {orderData.shipping.address_2 && (
                                                    <div>{orderData.shipping.address_2}</div>
                                                )}
                                                <div>
                                                    {orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.postcode}
                                                </div>
                                                <div>{orderData.shipping.country}</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Billing Address */}
                                    <div className="bg-surface rounded-lg p-6">
                                        <h3 className="heading6 mb-4 flex items-center gap-4">
                                            <Icon.CreditCard size={40} />
                                            Billing Address
                                        </h3>
                                        <div className="text-sm space-y-1">
                                            <div className="font-semibold">
                                                {orderData.billing.first_name} {orderData.billing.last_name}
                                            </div>
                                            {orderData.billing.company && (
                                                <div>{orderData.billing.company}</div>
                                            )}
                                            <div>{orderData.billing.address_1}</div>
                                            {orderData.billing.address_2 && (
                                                <div>{orderData.billing.address_2}</div>
                                            )}
                                            <div>
                                                {orderData.billing.city}, {orderData.billing.state} {orderData.billing.postcode}
                                            </div>
                                            <div>{orderData.billing.country}</div>
                                            <div className="pt-2 border-t border-line mt-2">
                                                <div>{orderData.billing.email}</div>
                                                <div>{orderData.billing.phone}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Order Summary */}
                            <div className="space-y-6">
                                {/* Order Info */}
                                <div className="bg-surface rounded-lg p-6">
                                    <h3 className="heading5 mb-6">Order Information</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span>Order Date:</span>
                                            <span className="font-semibold">{formatDate(orderData.date_created)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Payment Method:</span>
                                            <span className="font-semibold">{orderData.payment_method_title}</span>
                                        </div>
                                        {orderData.shipping_lines.length > 0 && (
                                            <div className="flex justify-between">
                                                <span>Shipping Method:</span>
                                                <span className="font-semibold">{orderData.shipping_lines[0].method_title}</span>
                                            </div>
                                        )}
                                        {orderData.customer_note && (
                                            <div className="pt-3 border-t border-line">
                                                <span className="font-semibold">Order Notes:</span>
                                                <p className="text-secondary mt-1">{orderData.customer_note}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Order Totals */}
                                <div className="bg-surface rounded-lg p-6">
                                    <h3 className="heading5 mb-6">Order Total</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span>Subtotal:</span>
                                            <span>{decodeHtmlEntities(currentCurrency?.symbol || '$')}{(Number(orderData.total) - Number(orderData.shipping_total) - Number(orderData.total_tax) + Number(orderData.discount_total)).toFixed(2)}</span>
                                        </div>

                                        {Number(orderData.discount_total) > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Discount:</span>
                                                <span>-{decodeHtmlEntities(currentCurrency?.symbol || '$')}{Number(orderData.discount_total).toFixed(2)}</span>
                                            </div>
                                        )}

                                        {orderData.coupon_lines.length > 0 && (
                                            <div className="text-sm text-secondary">
                                                {orderData.coupon_lines.map((coupon) => (
                                                    <div key={coupon.id}>Coupon: {coupon.code}</div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex justify-between">
                                            <span>Shipping:</span>
                                            <span>{Number(orderData.shipping_total) > 0 ? `${decodeHtmlEntities(currentCurrency?.symbol || '$')}${Number(orderData.shipping_total).toFixed(2)}` : 'Free'}</span>
                                        </div>

                                        {Number(orderData.total_tax) > 0 && (
                                            <div className="flex justify-between">
                                                <span>Tax:</span>
                                                <span>{decodeHtmlEntities(currentCurrency?.symbol || '$')}{Number(orderData.total_tax).toFixed(2)}</span>
                                            </div>
                                        )}

                                        <div className="border-t border-line pt-3 mt-3">
                                            <div className="flex justify-between">
                                                <strong className="heading5">Total:</strong>
                                                <strong className="heading5">{decodeHtmlEntities(currentCurrency?.symbol || '$')}{Number(orderData.total).toFixed(2)}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-3">
                                    <Link href="/shop" className="button-main w-full text-center block">
                                        Continue Shopping
                                    </Link>
                                    <Link href="/dashboard" className="button-main bg-white border border-black text-black hover:bg-black hover:text-white w-full text-center block">
                                        View Order History
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer - Same as checkout */}
                    <div className="copyright caption1 py-3 border-t border-line text-center">
                        ©2024 Anvogue. All Rights Reserved.
                    </div>
                </div>
            </div >
        </>
    )
}

export default ThankYouClient
