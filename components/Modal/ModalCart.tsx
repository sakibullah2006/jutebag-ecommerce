/* eslint-disable prefer-const */
'use client'

import { useAppData } from '@/context/AppDataContext';
import { useCart } from '@/context/CartContext';
import { useModalCartContext } from '@/context/ModalCartContext';
import { calculatePrice, decodeHtmlEntities } from '@/lib/utils';
import { Product as ProductType } from '@/types/product-type';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ModalCart = () => {
    // const [timeLeft, setTimeLeft] = useState(serverTimeLeft);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setTimeLeft(countdownTime());
    //     }, 1000);

    //     return () => clearInterval(timer);
    // }, []);

    const [activeTab, setActiveTab] = useState<string | undefined>('')
    const [couponCode, setCouponCode] = useState<string>('')
    const { isModalOpen, closeModalCart } = useModalCartContext();
    const { cartState, removeFromCart } = useCart()
    const { currentCurrency } = useAppData()


    // const handleAddToCart = (productItem: ProductType, quantity: number) => {
    //     if (!cartState.cartArray.find(item => item.id === productItem.id)) {
    //         addToCart({ ...productItem });
    //         updateCart(productItem.id.toString(), quantity, '', '')
    //     } else {
    //         updateCart(productItem.id.toString(), quantity, '', '')
    //     }
    // };

    const handleActiveTab = (tab: string) => {
        setActiveTab(tab)
    }

    // let moneyForFreeship = 150;
    let [totalCart, setTotalCart] = useState<number>(0)
    let [discountCart, setDiscountCart] = useState<number>(0)

    cartState.cartArray.map(item => totalCart += Number(item.price) * item.quantity)

    return (
        <>
            <div className={`modal-cart-block`} onClick={closeModalCart}>
                <div
                    className={`modal-cart-main flex ${isModalOpen ? 'open' : ''}`}
                    onClick={(e) => { e.stopPropagation() }}
                >
                    {/* <div className="left w-1/2 border-r border-line py-6 max-md:hidden">
                        <div className="heading5 px-6 pb-3">You May Also Like</div>
                        <div className="list px-6">
                            {productData.slice(0, 4).map((product) => (
                                <div key={product.id} className='item py-5 flex items-center justify-between gap-3 border-b border-line'>
                                    <div className="infor flex items-center gap-5">
                                        <div className="bg-img">
                                            <Image
                                                src={product.images[0]}
                                                width={300}
                                                height={300}
                                                alt={product.name}
                                                className='w-[100px] aspect-square flex-shrink-0 rounded-lg'
                                            />
                                        </div>
                                        <div className=''>
                                            <div className="name text-button">{product.name}</div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="product-price text-title">${product.price}.00</div>
                                                <div className="product-origin-price text-title text-secondary2"><del>${product.originPrice}.00</del></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="text-xl bg-white w-10 h-10 rounded-xl border border-black flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                                        onClick={e => {
                                            e.stopPropagation();
                                            handleAddToCart(product)
                                        }}
                                    >
                                        <Icon.Handbag />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}
                    <div className="cart-block  !w-full py-5 pb-0 mb-0 flex flex-col justify-between overflow-auto">
                        <div className="heading px-6 pb-3 relative ">
                            <div className="heading5">Shopping Cart</div>
                            <div
                                className="close-btn absolute right-6 top-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                                onClick={closeModalCart}
                            >
                                <Icon.X size={14} />
                            </div>
                        </div>

                        <div className=" px-6 flex-1 flex-col overflow-y-auto">
                            {cartState.cartArray.length === 0 ? (
                                <div className="empty-cart flex flex-col items-center justify-center h-full">
                                    <Icon.Handbag size={64} className="text-gray-300" />
                                    <p className="mt-4 text-lg text-gray-500">Your cart is empty</p>
                                </div>
                            ) : (
                                cartState.cartArray.map((product) => (
                                    <div key={product.id} className='item py-5 flex items-center justify-between gap-3 border-b border-line'>
                                        <div className="infor flex items-center gap-3 w-full">
                                            <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                                                <Image
                                                    src={product.selectedVariation?.image.src || product.images[0].src}
                                                    width={300}
                                                    height={300}
                                                    alt={product.name}
                                                    className='w-full h-full'
                                                />
                                            </div>
                                            <div className='w-full'>
                                                <div className="flex items-center justify-between w-full">
                                                    <div className="name text-button">{product.name}</div>
                                                    <div
                                                        className="remove-cart-btn caption1 font-semibold text-red underline cursor-pointer"
                                                        onClick={() => removeFromCart(product.id.toString(), product.variation_id ? product.variation_id : undefined)}
                                                    >
                                                        Remove
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between gap-2 mt-3 w-full">
                                                    <div className="flex items-center text-secondary2 capitalize">
                                                        {product.selectedColor ?? ''}
                                                    </div>
                                                    <div className="product-price text-title">
                                                        {decodeHtmlEntities(currentCurrency!.symbol)}{calculatePrice(product).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="footer-modal bg-white h-fit w-full ">

                            <div className="flex items-center justify-between pt-6 px-6">
                                <div className="heading5">Subtotal</div>
                                <div className="heading5">{decodeHtmlEntities(currentCurrency?.symbol || '')}{Number(totalCart).toFixed(2)}</div>
                            </div>
                            <div className="block-button text-center p-6">
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={'/cart'}
                                        className='button-main basis-1/2 bg-white border border-black text-black text-center uppercase'
                                        onClick={closeModalCart}
                                    >
                                        View cart
                                    </Link>
                                    <Link
                                        href={'/checkout'}
                                        className='button-main basis-1/2 text-center uppercase'
                                        onClick={closeModalCart}
                                    >
                                        CheckOut
                                    </Link>
                                </div>
                                <div onClick={closeModalCart} className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block">Or continue shopping</div>
                            </div>
                            <div className={`tab-item note-block ${activeTab === 'note' ? 'active' : ''}`}>
                                <div className="px-6 py-4 border-b border-line">
                                    <div className="item flex items-center gap-3 cursor-pointer">
                                        <Icon.NotePencilIcon className='text-xl' />
                                        <div className="caption1">Note</div>
                                    </div>
                                </div>
                                <div className="form pt-4 px-6">
                                    <textarea name="form-note" id="form-note" rows={4} placeholder='Add special instructions for your order...' className='caption1 py-3 px-4 bg-surface border-line rounded-md w-full'></textarea>
                                </div>
                                <div className="block-button text-center pt-4 px-6 pb-6">
                                    <div className='button-main w-full text-center' onClick={() => setActiveTab('')}>Save</div>
                                    <div onClick={() => setActiveTab('')} className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block">Cancel</div>
                                </div>
                            </div>
                            {/* <div className={`tab-item note-block ${activeTab === 'shipping' ? 'active' : ''}`}>
                                <div className="px-6 py-4 border-b border-line">
                                    <div className="item flex items-center gap-3 cursor-pointer">
                                        <Icon.Truck className='text-xl' />
                                        <div className="caption1">Estimate shipping rates</div>
                                    </div>
                                </div>
                                <div className="form pt-4 px-6">
                                    <div className="">
                                        <label htmlFor='select-country' className="caption1 text-secondary">Country/region</label>
                                        <div className="select-block relative mt-2">
                                            <select
                                                id="select-country"
                                                name="select-country"
                                                className='w-full py-3 pl-5 rounded-xl bg-white border border-line'
                                                defaultValue={'Country/region'}
                                            >
                                                <option value="Country/region" disabled>Country/region</option>
                                                <option value="France">France</option>
                                                <option value="Spain">Spain</option>
                                                <option value="UK">UK</option>
                                                <option value="USA">USA</option>
                                            </select>
                                            <Icon.CaretDownIcon size={12} className='absolute top-1/2 -translate-y-1/2 md:right-5 right-2' />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor='select-state' className="caption1 text-secondary">State</label>
                                        <div className="select-block relative mt-2">
                                            <select
                                                id="select-state"
                                                name="select-state"
                                                className='w-full py-3 pl-5 rounded-xl bg-white border border-line'
                                                defaultValue={'State'}
                                            >
                                                <option value="State" disabled>State</option>
                                                <option value="Paris">Paris</option>
                                                <option value="Madrid">Madrid</option>
                                                <option value="London">London</option>
                                                <option value="New York">New York</option>
                                            </select>
                                            <Icon.CaretDownIcon size={12} className='absolute top-1/2 -translate-y-1/2 md:right-5 right-2' />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor='select-code' className="caption1 text-secondary">Postal/Zip Code</label>
                                        <input className="border-line px-5 py-3 w-full rounded-xl mt-3" id="select-code" type="text" placeholder="Postal/Zip Code" />
                                    </div>
                                </div>
                                <div className="block-button text-center pt-4 px-6 pb-6">
                                    <div className='button-main w-full text-center' onClick={() => setActiveTab('')}>Calculator</div>
                                    <div onClick={() => setActiveTab('')} className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block">Cancel</div>
                                </div>
                            </div> */}
                            <div className={`tab-item note-block ${activeTab === 'coupon' ? 'active' : ''}`}>
                                <div className="px-6 py-4 border-b border-line">
                                    <div className="item flex items-center gap-3 cursor-pointer">
                                        <Icon.TagIcon className='text-xl' />
                                        <div className="caption1">Add A Coupon Code</div>
                                    </div>
                                </div>
                                <div className="form pt-4 px-6">
                                    <div className="">
                                        <label htmlFor='select-discount' className="caption1 text-secondary">Enter Code</label>
                                        <input className="border-line px-5 py-3 w-full rounded-xl mt-3" id="select-discount" type="text" placeholder="Discount code" onChange={e => setCouponCode(e.target.value)} />
                                    </div>
                                </div>
                                <div className="block-button text-center pt-4 px-6 pb-6">
                                    <div className='button-main w-full text-center' onClick={() => setActiveTab('')}>Apply</div>
                                    <div onClick={() => setActiveTab('')} className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block">Cancel</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalCart