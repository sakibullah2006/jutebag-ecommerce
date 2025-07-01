'use client'

import { getCurrentCurrency } from '@/actions/data-actions'
import { getProductVariationsById } from '@/actions/products-actions'
import { useCart } from '@/context/CartContext'
import { useCompare } from '@/context/CompareContext'
import { useModalCartContext } from '@/context/ModalCartContext'
import { useModalCompareContext } from '@/context/ModalCompareContext'
import { useModalQuickviewContext } from '@/context/ModalQuickviewContext'
import { useModalWishlistContext } from '@/context/ModalWishlistContext'
import { useWishlist } from '@/context/WishlistContext'
import { COLORS } from '@/data/color-codes'
import { decodeHtmlEntities } from '@/lib/utils'
import { CurrencyType } from '@/types/data-type'
import { Product as ProductType, VariationProduct } from '@/types/product-type'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import Rate from '../Other/Rate'

interface ProductProps {
    data: ProductType
    type: string
    style: string
}

const Product: React.FC<ProductProps> = ({ data, type, style }) => {
    const [variations, setVariations] = useState<VariationProduct[]>([])
    const [selectedVariation, setSelectedVariation] = useState<VariationProduct | null>(null);
    const [actionType, setActionType] = useState<string>("add to cart")
    const [activeColor, setActiveColor] = useState<string>('')
    const [activeSize, setActiveSize] = useState<string>('')
    const [openQuickShop, setOpenQuickShop] = useState<boolean>(false)
    const [currentCurrency, setCurrentCurrency] = useState<CurrencyType>({ name: 'doller', symbol: '$', code: 'USD' })
    const { addToCart, updateCart, cartState } = useCart();
    const { openModalCart } = useModalCartContext()
    const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
    const { openModalWishlist } = useModalWishlistContext()
    const { addToCompare, removeFromCompare, compareState } = useCompare();
    const { openModalCompare } = useModalCompareContext()
    const { openQuickview } = useModalQuickviewContext()
    const [isloading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        let isMounted = true;
        const loadVariations = async () => {
            setIsLoading(true);
            try {
                const variations = await fetchVariations();
                if (isMounted && variations) {
                    // Set active color and size based on the first variation
                    const firstVariation = variations[0];
                    setSelectedVariation(variations[0] || null);
                    setActiveColor(firstVariation.find((attr: { name: string, option: string }) => attr.name.toLowerCase() === 'color')?.option || '');
                    setActiveSize(firstVariation.attributes.find((attr: { name: string, option: string }) => attr.name.toLowerCase() === 'size')?.option || '');
                }
            } catch (error) {
                if (isMounted) console.error(error);
            }
        };
        const loadCurrency = async () => {
            const currency = await getCurrentCurrency();
            if (isMounted) {
                setCurrentCurrency(currency);
            }
        }
        loadVariations();
        setIsLoading(false);
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        if (data.attributes?.length > 0) {
            const matchingVariation = findMatchingVariation();
            setSelectedVariation(matchingVariation);
        }
        // console.log(selectedVariation)
    }, [activeColor, activeSize]);


    const fetchVariations = useCallback(async () => {
        if (data.attributes?.length > 1) { setActionType("quick shop") };

        if (data.attributes?.length > 0) {
            const response = await getProductVariationsById({ id: data.id.toString() });
            if (response.status === 'OK') {
                setVariations(response.variations!);
                return response.variations;
            }
        }

    }, [])

    // Find matching variation based on activeColor or activeSize
    const findMatchingVariation = (color?: string, size?: string) => {
        const matchingVariant = variations.find((variation) => {
            // Create a map of variation attributes for easier comparison
            const variationAttrs = variation.attributes.reduce(
                (acc, attr) => ({ ...acc, [attr.name.toLowerCase()]: attr.option }),
                {} as Record<string, string>,
            );

            // Check if activeColor and/or activeSize matches the variation's attributes
            const colorMatch = activeColor ? variationAttrs['color'] === (color ?? activeColor) : true;
            const sizeMatch = activeSize ? variationAttrs['size'] === (size ?? activeSize) : true;

            // Ensure the variation matches either color or size or both
            return colorMatch && sizeMatch;
        });

        return matchingVariant ? matchingVariant : null;
    };

    // console.log('Variations fetched:', variations);

    const handleActiveColor = (item: string) => {
        setActiveColor(item)
    }

    const handleActiveSize = (item: string) => {
        setActiveSize(item)
    }

    const handleAddToCart = () => {
        // if (!cartState.cartArray.find(item => item.id === data.id)) {
        //     addToCart({ ...data });
        //     updateCart(data.id, data.quantityPurchase, activeSize, activeColor)
        // } else {
        //     updateCart(data.id, data.quantityPurchase, activeSize, activeColor)
        // }
        openModalCart()
    };

    const handleAddToWishlist = () => {
        // if product existed in wishlit, remove from wishlist and set state to false
        // if (wishlistState.wishlistArray.some(item => item.id === data.id)) {
        //     removeFromWishlist(data.id);
        // } else {
        //     // else, add to wishlist and set state to true
        //     addToWishlist(data);
        // }
        openModalWishlist();
    };

    const handleAddToCompare = () => {
        // if product existed in wishlit, remove from wishlist and set state to false
        // if (compareState.compareArray.length < 3) {
        //     if (compareState.compareArray.some(item => item.id === data.id)) {
        //         removeFromCompare(data.id);
        //     } else {
        //         // else, add to wishlist and set state to true
        //         addToCompare(data);
        //     }
        // } else {
        //     alert('Compare up to 3 products')
        // }

        openModalCompare();
    };

    const handleQuickviewOpen = () => {
        // openQuickview(data)
    }

    const handleDetailProduct = (productId: string) => {
        // redirect to shop with category selected
        router.push(`/product/default?id=${productId}`);
    };

    let percentSale = Math.floor(100 - ((Number(data.sale_price || selectedVariation?.sale_price) / Number(data.regular_price || selectedVariation?.regular_price)) * 100))
    let percentSold = Math.floor((data.total_sales / data.stock_quantity!) * 100)

    if (isloading) {
        return (
            <div className={`product-item grid-type ${style} animate-pulse`}>
                <div className="product-main cursor-pointer block">
                    <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
                        <div className="product-img w-full h-full aspect-[3/4] bg-gray-200"></div>
                    </div>
                    <div className="product-infor mt-4 lg:mb-7">
                        <div className="product-name text-title bg-gray-200 h-6 mb-2"></div>
                        <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                            <div className="product-price text-title bg-gray-200 h-6 w-20"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* new Date(data.date_created) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); */}
            {type === "grid" ? (
                <div className={`product-item grid-type ${style}`}>
                    <div onClick={() => handleDetailProduct(data.id.toString())} className="product-main cursor-pointer block">
                        <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
                            {(data.date_created && new Date(data.date_created) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) &&
                                <div className="product-tag text-button-uppercase bg-green px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">
                                    New
                                </div>
                            )}
                            {data.on_sale && Number(data.regular_price || data.price) !== Number(data.sale_price) && (
                                <div className="product-tag text-button-uppercase text-white bg-red px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">
                                    Sale
                                </div>
                            )}
                            {style === 'style-1' || style === 'style-3' || style === 'style-4' ? (
                                <div className="list-action-right absolute top-3 right-3 max-lg:hidden">
                                    {style === 'style-4' && (
                                        <div
                                            className={`add-cart-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative mb-2 ${compareState.compareArray.some(item => item.id.toString() === data.id.toString()) ? 'active' : ''}`}
                                            onClick={e => {
                                                e.stopPropagation();
                                                handleAddToCart()
                                            }}
                                        >
                                            <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Add To Cart</div>
                                            <Icon.ShoppingBagOpenIcon size={20} />
                                        </div>
                                    )}
                                    <div
                                        className={`add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative ${wishlistState.wishlistArray.some(item => item.id.toString() === data.id.toString()) ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleAddToWishlist()
                                        }}
                                    >
                                        <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Add To Wishlist</div>
                                        {wishlistState.wishlistArray.some(item => item.id.toString() === data.id.toString()) ? (
                                            <>
                                                <Icon.HeartIcon size={18} weight='fill' className='text-white' />
                                            </>
                                        ) : (
                                            <>
                                                <Icon.HeartIcon size={18} />
                                            </>
                                        )}
                                    </div>
                                    <div
                                        className={`compare-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative mt-2 ${compareState.compareArray.some(item => item.id.toString() === data.id.toString()) ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleAddToCompare()
                                        }}
                                    >
                                        <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Compare Product</div>
                                        <Icon.RepeatIcon size={18} className='compare-icon' />
                                        <Icon.CheckCircleIcon size={20} className='checked-icon' />
                                    </div>
                                    {style === 'style-3' || style === 'style-4' ? (
                                        <div
                                            className={`quick-view-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative mt-2 ${compareState.compareArray.some(item => item.id.toString() === data.id.toString()) ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleQuickviewOpen()
                                            }}
                                        >
                                            <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Quick View</div>
                                            <Icon.EyeIcon size={20} />
                                        </div>
                                    ) : <></>}
                                </div>
                            ) : <></>}
                            {/* <div className="product-img w-full h-full aspect-[3/4]">
                                {activeColor ? (
                                    <>
                                        {
                                            <Image
                                                src={selectedVariation?.image.src ?? (data.images[0].src)}
                                                width={500}
                                                height={500}
                                                alt={data.name}
                                                priority={true}
                                                className='w-full h-full object-cover duration-700'
                                            />
                                        }
                                    </>
                                ) : (
                                    <>
                                        {
                                            data.images.map((img, index) => (
                                                <Image
                                                    key={index}
                                                    src={img.src}
                                                    width={500}
                                                    height={500}
                                                    priority={true}
                                                    alt={data.name}
                                                    className='w-full h-full object-cover duration-700'
                                                />
                                            ))
                                        }
                                    </>
                                )}
                            </div> */}
                            <div className="product-img w-full h-full aspect-[3/4]">
                                {activeColor && selectedVariation?.image.src ? (
                                    <Image
                                        src={selectedVariation.image.src}
                                        width={500}
                                        height={500}
                                        alt={data.name}
                                        priority={true}
                                        className="w-full h-full object-cover duration-700"
                                    />
                                ) : data.images[0]?.src ? (
                                    data.images.map((img, index) => (
                                        <Image
                                            key={index}
                                            src={img.src}
                                            width={500}
                                            height={500}
                                            priority={true}
                                            alt={data.name}
                                            className="w-full h-full object-cover duration-700"
                                        />
                                    ))
                                ) : (
                                    <Image
                                        src="/images/placeholder.png" // Fallback placeholder image
                                        width={500}
                                        height={500}
                                        alt={data.name}
                                        priority={true}
                                        className="w-full h-full object-cover duration-700"
                                    />
                                )}
                            </div>
                            {data.on_sale && Number(data.regular_price) !== Number(data.sale_price) && (
                                <>
                                    <Marquee className='banner-sale-auto bg-black absolute bottom-0 left-0 w-full py-1.5'>
                                        <div className={`caption2 font-semibold uppercase text-white px-2.5`}>Hot Sale {percentSale}% OFF</div>
                                        <Icon.LightningIcon weight='fill' className='text-red' />
                                        <div className={`caption2 font-semibold uppercase text-white px-2.5`}>Hot Sale {percentSale}% OFF</div>
                                        <Icon.LightningIcon weight='fill' className='text-red' />
                                        <div className={`caption2 font-semibold uppercase text-white px-2.5`}>Hot Sale {percentSale}% OFF</div>
                                        <Icon.LightningIcon weight='fill' className='text-red' />
                                        <div className={`caption2 font-semibold uppercase text-white px-2.5`}>Hot Sale {percentSale}% OFF</div>
                                        <Icon.LightningIcon weight='fill' className='text-red' />
                                        <div className={`caption2 font-semibold uppercase text-white px-2.5`}>Hot Sale {percentSale}% OFF</div>
                                        <Icon.LightningIcon weight='fill' className='text-red' />
                                    </Marquee>
                                </>
                            )}
                            {style === 'style-2' || style === 'style-4' ? (
                                <div className="list-size-block flex items-center justify-center gap-4 absolute bottom-0 left-0 w-full h-8">
                                    {data.attributes.find(item => item.name.toLowerCase() === "size")?.options.map((item: string, index: number) => (
                                        <strong key={index} className="size-item text-xs font-bold uppercase">{item}</strong>
                                    ))}
                                </div>
                            ) : <></>}
                            {style === 'style-1' || style === 'style-3' ?
                                <div className={`list-action ${style === 'style-1' ? 'grid grid-cols-2 gap-3' : ''} px-5 absolute w-full bottom-5 max-lg:hidden`}>
                                    {style === 'style-1' && (
                                        <div
                                            className="quick-view-btn w-full text-button-uppercase py-2 text-center rounded-full duration-300 bg-white hover:bg-black hover:text-white"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleQuickviewOpen()
                                            }}
                                        >
                                            Quick View
                                        </div>
                                    )}
                                    {actionType === 'add to cart' ? (
                                        <div
                                            className="add-cart-btn w-full text-button-uppercase py-2 text-center rounded-full duration-500 bg-white hover:bg-black hover:text-white"
                                            onClick={e => {
                                                e.stopPropagation();
                                                handleAddToCart()
                                            }}
                                        >
                                            Add To Cart
                                        </div>
                                    ) : (
                                        <>
                                            <div
                                                className="quick-shop-btn text-button-uppercase py-2 text-center rounded-full duration-500 bg-white hover:bg-black hover:text-white"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    setOpenQuickShop(!openQuickShop)
                                                }}
                                            >
                                                Quick Shop
                                            </div>
                                            <div
                                                className={`quick-shop-block absolute left-5 right-5 bg-white p-5 rounded-[20px] ${openQuickShop ? 'open' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                }}
                                            >
                                                <div className="list-size flex items-center  flex-wrap gap-2 border-b-line mb-2">
                                                    {data.attributes.find(item => item.name.toLowerCase() === "size") && <div >Size : </div>}

                                                    {data.attributes.find(item => item.name.toLowerCase() === "size")?.options.map((item: string, index: number) => (
                                                        <div
                                                            className={`size-item w-10 h-10 px-3 py-3 text-sm rounded-sm flex items-center justify-center text-button bg-white border border-line ${activeSize === item ? 'active' : ''}`}
                                                            key={index}
                                                            onClick={() => handleActiveSize(item)}
                                                        >
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="list-size flex items-center  flex-wrap gap-2">
                                                    {data.attributes.find(item => item.name.toLowerCase() === "color") && <div >Color : </div>}

                                                    {data.attributes.find(item => item.name.toLowerCase() === "color")?.options.map((item: string, index: number) => (
                                                        <div
                                                            className={`size-item w-13 h-10 text-sm overflow-ellipsis py-4 px-3 rounded-sm flex items-center justify-center text-button bg-white border border-line ${activeColor === item ? 'active' : ''}`}
                                                            key={index}
                                                            onClick={() => handleActiveColor(item)}
                                                        >
                                                            {item.toWellFormed()}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div
                                                    className="button-main w-full text-center rounded-full py-3 mt-4"
                                                    onClick={() => {
                                                        handleAddToCart()
                                                        setOpenQuickShop(false)
                                                    }}
                                                >
                                                    Add To cart
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                : <></>
                            }
                            {style === 'style-2' || style === 'style-5' ?
                                <>
                                    <div className={`list-action flex items-center justify-center gap-3 px-5 absolute w-full ${style === 'style-2' ? 'bottom-12' : 'bottom-5'} max-lg:hidden`}>
                                        {style === 'style-2' && (
                                            <div
                                                className={`add-cart-btn w-9 h-9 flex items-center justify-center rounded-full bg-white duration-300 relative ${compareState.compareArray.some(item => item.id.toString() === data.id.toString()) ? 'active' : ''}`}
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    handleAddToCart()
                                                }}
                                            >
                                                <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Add To Cart</div>
                                                <Icon.ShoppingBagOpenIcon size={20} />
                                            </div>
                                        )}
                                        <div
                                            className={`add-wishlist-btn w-9 h-9 flex items-center justify-center rounded-full bg-white duration-300 relative ${wishlistState.wishlistArray.some(item => item.id.toString() === data.id.toString()) ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleAddToWishlist()
                                            }}
                                        >
                                            <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Add To Wishlist</div>
                                            {wishlistState.wishlistArray.some(item => item.id.toString() === data.id.toString()) ? (
                                                <>
                                                    <Icon.HeartIcon size={18} weight='fill' className='text-white' />
                                                </>
                                            ) : (
                                                <>
                                                    <Icon.HeartIcon size={18} />
                                                </>
                                            )}
                                        </div>
                                        <div
                                            className={`compare-btn w-9 h-9 flex items-center justify-center rounded-full bg-white duration-300 relative ${compareState.compareArray.some(item => item.id.toString() === data.id.toString()) ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleAddToCompare()
                                            }}
                                        >
                                            <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Compare Product</div>
                                            <Icon.RepeatIcon size={18} className='compare-icon' />
                                            <Icon.CheckCircleIcon size={20} className='checked-icon' />
                                        </div>
                                        <div
                                            className={`quick-view-btn w-9 h-9 flex items-center justify-center rounded-full bg-white duration-300 relative ${compareState.compareArray.some(item => item.id.toString() === data.id.toString()) ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleQuickviewOpen()
                                            }}
                                        >
                                            <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Quick View</div>
                                            <Icon.EyeIcon size={20} />
                                        </div>
                                        {style === 'style-5' && actionType !== 'add to cart' && (
                                            <div
                                                className={`quick-shop-block absolute left-5 right-5 bg-white p-5 rounded-[20px] ${openQuickShop ? 'open' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                }}
                                            >
                                                <div className="list-size flex items-center justify-center flex-wrap gap-2">
                                                    {data.attributes.find(item => item.name.toLowerCase() === "size")?.options.map((item: string, index: number) => (
                                                        <div
                                                            className={`size-item w-10 h-10 rounded-full flex items-center justify-center text-button bg-white border border-line ${activeSize === item ? 'active' : ''}`}
                                                            key={index}
                                                            onClick={() => handleActiveSize(item)}
                                                        >
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div
                                                    className="button-main w-full text-center rounded-full py-3 mt-4"
                                                    onClick={() => {
                                                        handleAddToCart()
                                                        setOpenQuickShop(false)
                                                    }}
                                                >
                                                    Add To cart
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </> :
                                <></>
                            }
                            <div className="list-action-icon flex items-center justify-center gap-2 absolute w-full bottom-3 z-[1] lg:hidden">
                                <div
                                    className="quick-view-btn w-9 h-9 flex items-center justify-center rounded-lg duration-300 bg-white hover:bg-black hover:text-white"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleQuickviewOpen()
                                    }}
                                >
                                    <Icon.EyeIcon className='text-lg' />
                                </div>
                                <div
                                    className="add-cart-btn w-9 h-9 flex items-center justify-center rounded-lg duration-300 bg-white hover:bg-black hover:text-white"
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleAddToCart()
                                    }}
                                >
                                    <Icon.ShoppingBagOpenIcon className='text-lg' />
                                </div>
                            </div>
                        </div>
                        <div className="product-infor mt-4 lg:mb-7">
                            <div className="product-sold sm:pb-4 pb-2">
                                <div className="progress bg-line h-1.5 w-full rounded-full overflow-hidden relative">
                                    <div
                                        className={`progress-sold bg-red absolute left-0 top-0 h-full`}
                                        style={{ width: `${percentSold}%` }}
                                    >
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-3 gap-y-1 flex-wrap mt-2">
                                    <div className="text-button-uppercase">
                                        <span className='text-secondary2 max-sm:text-xs'>Sold: </span>
                                        <span className='max-sm:text-xs'>{data.total_sales}</span>
                                    </div>
                                    <div className="text-button-uppercase">
                                        <span className='text-secondary2 max-sm:text-xs'>Available: </span>
                                        {/* <span className='max-sm:text-xs'>{data.stock_quantity! - data.total_sales}</span> */}
                                    </div>
                                </div>
                            </div>
                            <div className={`product-name text-title duration-300`}>{data.name}</div>
                            {data.attributes?.length > 0 ? (
                                <div className="list-color py-2 max-md:hidden flex items-center gap-2 flex-wrap duration-500">
                                    {data.attributes.find(item => item.name.toLowerCase() === "color")?.options.map((item: string, index: number) => (
                                        <div
                                            key={index}
                                            className={`color-item w-6 h-6 rounded-full duration-300 relative ${activeColor === item ? 'active' : ''}`}
                                            style={{ backgroundColor: `${COLORS[item.toLowerCase().replace(" ", "")] ?? "#000000"}` }}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleActiveColor(item)
                                            }}>
                                            <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">{item}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : <div className='hidden'></div>
                            }
                            {/* {data.variation.length > 0 && data.action === 'quick shop' && (
                                <div className="list-color-image max-md:hidden flex items-center gap-2 flex-wrap duration-500">
                                    {data.variation.map((item, index) => (
                                        <div
                                            className={`color-item w-8 h-8 rounded-lg duration-300 relative ${activeColor === item.color ? 'active' : ''}`}
                                            key={index}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleActiveColor(item.color)
                                            }}
                                        >
                                            <Image
                                                src={item.colorImage}
                                                width={100}
                                                height={100}
                                                alt='color'
                                                priority={true}
                                                className='w-full h-full object-cover rounded-lg'
                                            />
                                            <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">{item.color}</div>
                                        </div>
                                    ))}
                                </div>
                            )} */}
                            {selectedVariation != null ?
                                (<div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                                    <div className="product-price text-title">{decodeHtmlEntities(currentCurrency.symbol)}{selectedVariation.on_sale ? Number(selectedVariation.sale_price).toFixed(2) : Number(selectedVariation.price).toFixed(2)}</div>
                                    {selectedVariation.on_sale && percentSale > 0 && (
                                        <>
                                            <div className="product-origin-price caption1 text-secondary2"><del>{decodeHtmlEntities(currentCurrency.symbol)}{Number(selectedVariation.regular_price).toFixed(2)}</del></div>
                                            <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                                                -{percentSale}%
                                            </div>
                                        </>
                                    )}
                                </div>) :
                                (<div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                                    <div className="product-price text-title">{decodeHtmlEntities(currentCurrency.symbol)}{data.on_sale ? Number(data.sale_price).toFixed(2) : Number(data.price).toFixed(2)}</div>
                                    {data.on_sale && percentSale > 0 && (
                                        <>
                                            <div className="product-origin-price caption1 text-secondary2"><del>{decodeHtmlEntities(currentCurrency.symbol)}{Number(data.regular_price).toFixed(2)}</del></div>
                                            <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                                                -{percentSale}%
                                            </div>
                                        </>
                                    )}
                                </div>)
                            }


                            {style === 'style-5' &&
                                <>
                                    {actionType === 'add to cart' ? (
                                        <div
                                            className="add-cart-btn w-full text-button-uppercase py-2.5 text-center mt-2 rounded-full duration-300 bg-white border border-black hover:bg-black hover:text-white max-lg:hidden"
                                            onClick={e => {
                                                e.stopPropagation()
                                                handleAddToCart()
                                            }}
                                        >
                                            Add To Cart
                                        </div>
                                    ) : (
                                        <div
                                            className="quick-shop-btn text-button-uppercase py-2.5 text-center mt-2 rounded-full duration-300 bg-white border border-black hover:bg-black hover:text-white max-lg:hidden"
                                            onClick={e => {
                                                e.stopPropagation()
                                                setOpenQuickShop(!openQuickShop)
                                            }}
                                        >
                                            Quick Shop
                                        </div>
                                    )}
                                </>
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {type === "list" ? (
                        <>
                            <div className="product-item list-type">
                                <div className="product-main cursor-pointer flex lg:items-center sm:justify-between gap-7 max-lg:gap-5">
                                    <div onClick={() => handleDetailProduct(data.id.toString())} className="product-thumb bg-white relative overflow-hidden rounded-2xl block max-sm:w-1/2">
                                        {(data.date_created && new Date(data.date_created) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) && (
                                            <div className="product-tag text-button-uppercase bg-green px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">
                                                New
                                            </div>
                                        )}
                                        {data.on_sale && (
                                            <div className="product-tag text-button-uppercase text-white bg-red px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">
                                                Sale
                                            </div>
                                        )}
                                        <div className="product-img w-full aspect-[3/4] rounded-2xl overflow-hidden">
                                            {data.images.map((img, index) => (
                                                <Image
                                                    key={index}
                                                    src={img.src}
                                                    width={500}
                                                    height={500}
                                                    priority={true}
                                                    alt={data.name}
                                                    className='w-full h-full object-cover duration-700'
                                                />
                                            ))}
                                        </div>
                                        <div className="list-action px-5 absolute w-full bottom-5 max-lg:hidden">
                                            <div
                                                className={`quick-shop-block absolute left-5 right-5 bg-white p-5 rounded-[20px] ${openQuickShop ? 'open' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                }}
                                            >
                                                <div className="list-size flex items-center justify-center flex-wrap gap-2">
                                                    {data.attributes.find(item => item.name.toLowerCase() === "size")?.options.map((item, index) => (
                                                        <div
                                                            className={`size-item ${item !== 'freesize' ? 'w-10 h-10' : 'h-10 px-4'} flex items-center justify-center text-button bg-white rounded-full border border-line ${activeSize === item ? 'active' : ''}`}
                                                            key={index}
                                                            onClick={() => handleActiveSize(item)}
                                                        >
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div
                                                    className="button-main w-full text-center rounded-full py-3 mt-4"
                                                    onClick={() => {
                                                        handleAddToCart()
                                                        setOpenQuickShop(false)
                                                    }}
                                                >
                                                    Add To cart
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex sm:items-center gap-7 max-lg:gap-4 max-lg:flex-wrap max-lg:w-full max-sm:flex-col max-sm:w-1/2'>
                                        <div className="product-infor max-sm:w-full">
                                            <div onClick={() => handleDetailProduct(data.id.toString())} className="product-name heading6 inline-block duration-300">{data.name}</div>
                                            <div className="product-price-block flex items-center gap-2 flex-wrap mt-2 duration-300 relative z-[1]">
                                                <div className="product-price text-title">${Number(data.sale_price || selectedVariation?.sale_price).toFixed(2)}</div>
                                                <div className="product-origin-price caption1 text-secondary2"><del>${Number(data.regular_price || selectedVariation?.regular_price).toFixed()}</del></div>
                                                {data.price && (
                                                    <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                                                        -{percentSale}%
                                                    </div>
                                                )}
                                            </div>
                                            {data.attributes.length > 0 && actionType === 'add to cart' ? (
                                                <div className="list-color max-md:hidden py-2 mt-5 mb-1 flex items-center gap-3 flex-wrap duration-300">
                                                    {data.attributes.find(item => item.name.toLowerCase() === "color")?.options.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className={`color-item w-8 h-8 rounded-full duration-300 relative`}
                                                            style={{ backgroundColor: `${COLORS[item]}` }}
                                                        >
                                                            <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">{item}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <>
                                                    {data.attributes.length > 0 && actionType === 'quick shop' ? (
                                                        <>
                                                            <div className="list-color flex items-center gap-2 flex-wrap mt-5">
                                                                {data.attributes.find(item => item.name.toLowerCase() === "color")?.options.map((item, index) => (
                                                                    <div
                                                                        className={`color-item w-12 h-12 rounded-xl duration-300 relative ${activeColor === item ? 'active' : ''}`}
                                                                        key={index}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            handleActiveColor(item)
                                                                        }}
                                                                    >
                                                                        <Image
                                                                            src={findMatchingVariation(item)?.image.src || "/images/product/1000x1000.png"}
                                                                            width={100}
                                                                            height={100}
                                                                            alt='color'
                                                                            priority={true}
                                                                            className='rounded-xl'
                                                                        />
                                                                        <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                                                                            {item}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </>
                                            )}
                                            <div className='text-secondary desc mt-5 max-sm:hidden'>{data.description}</div>
                                        </div>
                                        <div className="action w-fit flex flex-col items-center justify-center">
                                            <div
                                                className="quick-shop-btn button-main whitespace-nowrap py-2 px-9 max-lg:px-5 rounded-full bg-white text-black border border-black hover:bg-black hover:text-white"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    setOpenQuickShop(!openQuickShop)
                                                }}
                                            >
                                                Quick Shop
                                            </div>
                                            <div className="list-action-right flex items-center justify-center gap-3 mt-4">
                                                <div
                                                    className={`add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative ${wishlistState.wishlistArray.some(item => item.id.toString() === data.id.toString()) ? 'active' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleAddToWishlist()
                                                    }}
                                                >
                                                    <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Add To Wishlist</div>
                                                    {wishlistState.wishlistArray.some(item => item.id.toString() === data.id.toString()) ? (
                                                        <>
                                                            <Icon.HeartIcon size={18} weight='fill' className='text-white' />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Icon.HeartIcon size={18} />
                                                        </>
                                                    )}
                                                </div>
                                                <div
                                                    className={`compare-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative ${compareState.compareArray.some(item => item.id.toString() === data.id.toString()) ? 'active' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleAddToCompare()
                                                    }}
                                                >
                                                    <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Compare Product</div>
                                                    <Icon.ArrowsCounterClockwiseIcon size={18} className='compare-icon' />
                                                    <Icon.CheckCircleIcon size={20} className='checked-icon' />
                                                </div>
                                                <div
                                                    className="quick-view-btn-list w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleQuickviewOpen()
                                                    }}
                                                >
                                                    <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Quick View</div>
                                                    <Icon.Eye size={18} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </>
            )
            }

            {type === 'marketplace' ? (
                <div className="product-item style-marketplace p-4 border border-line rounded-2xl" onClick={() => handleDetailProduct(data.id.toString())}>
                    <div className="bg-img relative w-full">
                        <Image className='w-full aspect-square' width={5000} height={5000} src={data.images[0].src} alt="img" />
                        <div className="list-action flex flex-col gap-1 absolute top-0 right-0">
                            <span
                                className={`add-wishlist-btn w-8 h-8 bg-white flex items-center justify-center rounded-full box-shadow-sm duration-300 ${wishlistState.wishlistArray.some(item => item.id.toString() === data.id.toString()) ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleAddToWishlist()
                                }}
                            >
                                {wishlistState.wishlistArray.some(item => item.id.toString() === data.id.toString()) ? (
                                    <>
                                        <Icon.HeartIcon size={18} weight='fill' className='text-white' />
                                    </>
                                ) : (
                                    <>
                                        <Icon.HeartIcon size={18} />
                                    </>
                                )}
                            </span>
                            <span
                                className={`compare-btn w-8 h-8 bg-white flex items-center justify-center rounded-full box-shadow-sm duration-300 ${compareState.compareArray.some(item => item.id.toString() === data.id.toString()) ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleAddToCompare()
                                }}
                            >
                                <Icon.RepeatIcon size={18} className='compare-icon' />
                                <Icon.CheckCircleIcon size={20} className='checked-icon' />
                            </span>
                            <span
                                className="quick-view-btn w-8 h-8 bg-white flex items-center justify-center rounded-full box-shadow-sm duration-300"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleQuickviewOpen()
                                }}
                            >
                                <Icon.Eye />
                            </span>
                            <span
                                className="add-cart-btn w-8 h-8 bg-white flex items-center justify-center rounded-full box-shadow-sm duration-300"
                                onClick={e => {
                                    e.stopPropagation();
                                    handleAddToCart()
                                }}
                            >
                                <Icon.ShoppingBagOpenIcon />
                            </span>
                        </div>
                    </div>
                    <div className="product-infor mt-4">
                        <span className="text-title">{data.name}</span>
                        <div className="flex gap-0.5 mt-1">
                            <Rate currentRate={Number(data.average_rating)} size={16} />
                        </div>
                        <span className="text-title inline-block mt-1">${data.price}.00</span>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default Product