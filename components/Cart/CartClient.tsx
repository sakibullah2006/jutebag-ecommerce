/* eslint-disable prefer-const */
'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { CartItem, useCart } from '@/context/CartContext'
import { useAppData } from '@/context/AppDataContext'
import { calculatePrice, cn, decodeHtmlEntities } from '@/lib/utils'
import { validateCoupon } from '@/actions/coupon'
import { PATH } from '../../constant/pathConstants'
import QuantitySelector from '../extra/quantitySelector'
import { getQuantityList } from '../../lib/productUtils'

interface CouponData {
    id: string
    code: string
    discount: number
    minValue: number
    description: string
}

// interface CartClientProps {
//     // coupons: CouponData[]
// }

const CartClient = () => {
    const router = useRouter()
    const { cartState, addToCart, removeFromCart, updateCart } = useCart();
    const [discountCode, setDiscountCode] = useState<string>('');
    const [appliedCoupon, setAppliedCoupon] = useState<{
        code: string;
        discount_type: "percent" | "fixed_cart" | "fixed_product";
        amount: number;
        product_ids: number[];
    } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    let [totalCart, setTotalCart] = useState<number>(0)
    let [discountCart, setDiscountCart] = useState<number>(0)
    let { currentCurrency } = useAppData()

    // console.log("CART STATE", cartState)

    useEffect(() => {
        if (appliedCoupon) {
            let discount = 0;

            if (appliedCoupon.discount_type === 'percent') {
                discount = (totalCart * appliedCoupon.amount) / 100;
            } else if (appliedCoupon.discount_type === 'fixed_cart') {
                discount = appliedCoupon.amount;
            } else if (appliedCoupon.discount_type === 'fixed_product') {
                // Calculate discount for specific products
                const applicableItems = cartState.cartArray.filter(item =>
                    appliedCoupon.product_ids.includes(item.id)
                );
                discount = applicableItems.reduce((total, item) => {
                    return total + (appliedCoupon.amount * item.quantity);
                }, 0);
            }

            setDiscountCart(Math.min(discount, totalCart));
        } else {
            setDiscountCart(0);
        }
    }, [appliedCoupon, totalCart, cartState.cartArray]);

    const handleQuantityChange = (productId: string, newQuantity: number, variation_id?: string | undefined) => {

        const itemToUpdate = cartState.cartArray.find((item) => {
            if (variation_id) {
                return item.id.toString() === productId && item.variation_id === variation_id
            }
            return item.id.toString() === productId
        });
        // console.log("In Cart \n")
        // console.log("ITEM TO UPDATE", itemToUpdate)
        // console.log('VariationID', variation_id)

        if (itemToUpdate) {
            updateCart(productId, newQuantity, variation_id);
        }
    };


    cartState.cartArray.map(item => {
        totalCart += Number(calculatePrice(item)) * item.quantity
    })

    // const handleApplyCode = (minValue: number, discount: number) => {
    //     if (totalCart > minValue) {
    //         setApplyCode(minValue)
    //         setDiscountCart(discount)
    //     } else {
    //         alert(`Minimum order must be ${minValue}$`)
    //     }
    // }

    const handleDiscountSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);
        try {
            const response = await validateCoupon(discountCode, cartState.cartArray);
            if (response.isValid && response.coupon) {
                setAppliedCoupon(response.coupon);
            } else {
                setErrorMessage(response.error || 'Invalid coupon code');
                setAppliedCoupon(null);
            }
        } catch (error) {
            console.error('Error validating coupon:', error);
            setErrorMessage('Error valid coupon');
            setAppliedCoupon(null);
        } finally {
            setIsLoading(false);
        }
    }



    const redirectToCheckout = () => {
        router.push(`/checkout?${appliedCoupon ? ("appliedCoupon=" + appliedCoupon.code) : ''}`);
    }

    return (
        <div className="cart-block md:py-20 py-10">
            <div className="container">
                <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
                    <div className="xl:w-2/3 xl:pr-3 w-full">
                        <div className="list-product w-full sm:mt-7 mt-5">
                            <div className='w-full'>
                                <div className="heading bg-surface bora-4 pt-4 pb-4">
                                    <div className="flex">
                                        <div className="w-1/2">
                                            <div className="text-button text-center">Products</div>
                                        </div>
                                        <div className="w-1/12">
                                            <div className="text-button text-center">Price</div>
                                        </div>
                                        <div className="w-1/6">
                                            <div className="text-button text-center">Quantity</div>
                                        </div>
                                        <div className="w-1/6">
                                            <div className="text-button text-center">Total Price</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-product-main w-full mt-3">
                                    {cartState.cartArray.length < 1 ? (
                                        <div className='flex flex-col items-center justify-center h-[400px]'>
                                            <Image src="/images/cart/empty_cart.svg" height={400} width={400} alt="Empty_Cart" />
                                            <p className='text-lg font-bold text-slate-700'>Your Cart is Empty</p>
                                        </div>
                                    ) : (
                                        cartState.cartArray.map((product) => (
                                            <div className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full" key={product.id}>
                                                <div className="w-1/2">
                                                    <div className="flex items-center gap-6">
                                                        <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
                                                            <Image
                                                                src={product.selectedVariation?.image.src || product.images[0].src}
                                                                width={1000}
                                                                height={1000}
                                                                alt={product.name}
                                                                className='w-full h-full object-cover rounded-lg'
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="text-title">{product.name}</div>
                                                            <div className="list-select mt-3">
                                                                {product.selectedColor &&
                                                                    <div className="text-secondary text-sm">
                                                                        <span className="font-bold">Color:</span> {product.selectedColor}
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-1/12 price flex items-center justify-center">
                                                    <div className="text-title text-center">{decodeHtmlEntities(currentCurrency!.symbol)}{Number(calculatePrice(product)).toFixed(2)}</div>
                                                </div>
                                                <div className="w-1/6 flex items-center justify-center">
                                                    {/* <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
                                                        <Icon.MinusIcon
                                                            onClick={() => {
                                                                if (product.quantity > 1) {
                                                                    handleQuantityChange(product.id.toString(), product.quantity - 1)
                                                                }
                                                            }}
                                                            className={`text - base max - md: text - sm ${product.quantity === 1 ? 'disabled' : ''} `}
                                                        />
                                                        <div className="text-button quantity">{product.quantity}</div>
                                                        <Icon.PlusIcon
                                                            onClick={() => handleQuantityChange(product.id.toString(), product.quantity + 1)}
                                                            className='text-base max-md:text-sm'
                                                        />
                                                    </div> */}

                                                    <QuantitySelector
                                                        quantityList={
                                                            getQuantityList(
                                                                Number(product.production_details?.printScreenDetails?.[0]?.quantity),
                                                                Number(product?.selectedVariation && product?.selectedVariation.stock_quantity || product.stock_quantity)
                                                            )
                                                        }
                                                        setQuantity={(qty) => handleQuantityChange(product.id.toString(), qty, product.variation_id ?? undefined)}
                                                        quantity={product.quantity}
                                                    />
                                                </div>
                                                <div className="w-1/6 flex total-price items-center justify-center">
                                                    <div className="text-title text-center">${(product.quantity * Number(calculatePrice(product))).toFixed(2)}</div>
                                                </div>
                                                <div className="w-1/12 flex items-center justify-center">
                                                    <Icon.XCircleIcon
                                                        className='text-xl max-md:text-base text-red cursor-pointer hover:text-black duration-500'
                                                        onClick={() => {
                                                            removeFromCart(product.id.toString(), product.variation_id ? product.variation_id : undefined)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="input-block discount-code w-full h-12 sm:mt-7 mt-5">
                            <form className='w-full h-full relative' onSubmit={handleDiscountSubmit}>
                                <input
                                    type="text"
                                    placeholder='Add voucher discount'
                                    className='w-full h-full bg-surface pl-4 pr-14 rounded-lg border border-line'
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={cn(
                                        'button-main absolute top-1 bottom-1 right-1 px-5 rounded-lg flex items-center justify-center',
                                        isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-black/90 duration-500'
                                    )}
                                >
                                    {isLoading ? 'Validating' : 'Apply Code'}
                                </button>
                            </form>
                            {errorMessage && (
                                <div className='text-red text-sm bg-red/10 p-4 text-center font-bold mt-2'> {errorMessage}</div>
                            )}
                            {appliedCoupon && (
                                <div className='text-green text-sm bg-green/30 p-4 text-center font-bold mt-2'>Coupon Code {appliedCoupon.code} Applied</div>
                            )}
                        </div>
                        {/* <div className="list-voucher flex items-center gap-5 flex-wrap sm:mt-7 mt-5">
                            {coupons.map((coupon) => (
                                <div key={coupon.id} className={`item ${ applyCode === coupon.minValue ? 'bg-green' : '' } border border - line rounded - lg py - 2`}>
                                    <div className="top flex gap-10 justify-between px-3 pb-2 border-b border-dashed border-line">
                                        <div className="left">
                                            <div className="caption1">Discount</div>
                                            <div className="caption1 font-bold">{coupon.discount}% OFF</div>
                                        </div>
                                        <div className="right">
                                            <div className="caption1">{coupon.description}</div>
                                        </div>
                                    </div>
                                    <div className="bottom gap-6 items-center flex justify-between px-3 pt-2">
                                        <div className="text-button-uppercase">Code: {coupon.code}</div>
                                        <div
                                            className="button-main py-1 px-2.5 capitalize text-xs"
                                            onClick={() => handleApplyCode(coupon.minValue, Math.floor((totalCart / 100) * coupon.discount))}
                                        >
                                            {applyCode === coupon.minValue ? 'Applied' : 'Apply Code'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                    <div className="xl:w-1/3 xl:pl-12 w-full">
                        <div className="checkout-block bg-surface p-6 rounded-2xl">
                            <div className="heading5">Order Summary</div>
                            <div className="total-block py-5 flex justify-between border-b border-line">
                                <div className="text-title">Subtotal</div>
                                <div className="text-title">{decodeHtmlEntities(currentCurrency?.symbol || '')}<span className="total-product">{totalCart.toFixed(2)}</span><span></span></div>
                            </div>
                            <div className="discount-block py-5 flex justify-between border-b border-line">
                                <div className="text-title flex gap-2 justify-center items-center">Discounts {appliedCoupon && (<div className='bg-yellow/30 p-2 rounded-xl text-[15px] font-bold'>Coupon Applied</div>)}</div>
                                <div className="text-title"><span className="discount">{discountCart && `- ${decodeHtmlEntities(currentCurrency?.symbol || '')}${discountCart.toFixed(2)} `}</span></div>
                            </div>
                            <div className="ship-block py-5 flex justify-between border-b border-line">
                                <div className="text-title flex justify-between">Shipping</div>
                                <div className="choose-type flex gap-12">
                                    <div className="right">
                                        <div className="ship text-sm">will be calculated at checkout</div>
                                    </div>
                                </div>
                            </div>
                            <div className="total-cart-block pt-4 pb-4 flex justify-between">
                                <div className="heading5">Total</div>
                                <div className="heading5">{decodeHtmlEntities(currentCurrency?.symbol || '')}
                                    <span className="total-cart heading5">{Number(totalCart - discountCart).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="block-button flex flex-col items-center gap-y-4 mt-5">
                                <div className="checkout-btn button-main text-center w-full" onClick={redirectToCheckout}>Process To Checkout</div>
                                <Link className="text-button hover-underline" href={PATH.SHOP}>Continue shopping</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartClient
