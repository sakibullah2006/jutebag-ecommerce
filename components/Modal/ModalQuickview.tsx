'use client'

// Quickview.tsx
import { useCart } from '@/context/CartContext';
import { useCompare } from '@/context/CompareContext';
import { useModalCartContext } from '@/context/ModalCartContext';
import { useModalCompareContext } from '@/context/ModalCompareContext';
import { useModalQuickviewContext } from '@/context/ModalQuickviewContext';
import { useModalWishlistContext } from '@/context/ModalWishlistContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAppData } from '@/context/AppDataContext';
import { Product, VariationProduct, ProductReview } from '@/types/product-type';
import { decodeHtmlEntities } from '@/lib/utils';
import { getProductVariationsById, getProductReviews } from '@/actions/products-actions';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import Rate from '../Other/Rate';
import ModalPrintguide from './ModalPrintguide';
import VariationSkeleton from '../Other/VariationSkeleton';
import parse from 'html-react-parser';
import { useRouter } from 'next/navigation';
import { getAvailableQuantities, isValidQuantityForCart } from '@/lib/productUtils';
import QuantitySelector from '../extra/quantitySelector';

const ModalQuickview = () => {
    const [photoIndex, setPhotoIndex] = useState(0)
    const [openPopupImg, setOpenPopupImg] = useState(false)
    const [openSizeGuide, setOpenSizeGuide] = useState<boolean>(false)
    const [variations, setVariations] = useState<VariationProduct[]>([])
    const [reviews, setReviews] = useState<ProductReview[]>([])
    const [isLoadingVariations, setIsLoadingVariations] = useState(false)
    const { selectedProduct, closeQuickview } = useModalQuickviewContext()
    const [activeColor, setActiveColor] = useState<string>('')
    const [quantity, setQuantity] = useState(1)
    const [selectedVariation, setSelectedVariation] = useState<VariationProduct | null>(null)
    const { currentCurrency, allCountries } = useAppData()
    const { addToCart, updateCart, cartState } = useCart()
    const { openModalCart } = useModalCartContext()
    const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist()
    const { openModalWishlist } = useModalWishlistContext()
    const { addToCompare, removeFromCompare, compareState } = useCompare();
    const { openModalCompare } = useModalCompareContext()
    const router = useRouter()

    const isColorReq = selectedProduct?.attributes?.some(attr => attr.name.toLowerCase() === "color") || false

    const quantities = selectedProduct ? getAvailableQuantities(
        Number(selectedProduct.production_details?.printScreenDetails?.[0]?.quantity) || 1,
        Number(selectedVariation?.stock_quantity && selectedVariation?.stock_quantity || selectedProduct.stock_quantity) || 0
    ) : [1]


    // useEffect(() => {
    //     let isMounted = true;
    //     fetchVariations()
    //     // loadVariations();
    //     return () => { isMounted = false; };
    // }, []);




    // Fetch variations ONLY when the selected product changes
    useEffect(() => {
        const fetchVariations = async () => {
            // Exit if there's no product or it has no variation IDs to fetch
            if (!selectedProduct?.id || selectedProduct.variations.length === 0) {
                setVariations([]); // Clear out old variations
                setIsLoadingVariations(false);
                return;
            }

            setIsLoadingVariations(true);
            try {
                const result = await getProductVariationsById({ id: selectedProduct.id.toString() });
                if (result.status === "OK" && result.variations) {
                    setVariations(result.variations);
                } else {
                    setVariations([]); // Clear on failure to avoid stale data
                }
            } catch (error) {
                setVariations([]); // Also clear on error
            } finally {
                // The loading state is set here or after variations are set in the next effect.
                // For simplicity, we can do it here.
                setIsLoadingVariations(false);
            }
        };

        const fetchReviews = async () => {
            if (!selectedProduct?.id) {
                setReviews([]);
                return;
            }

            try {
                const result = await getProductReviews(selectedProduct.id);
                if (result.success && result.reviews) {
                    setReviews(result.reviews);
                } else {
                    setReviews([]);
                }
            } catch (error) {
                setReviews([]);
            }
        };

        fetchVariations();
        fetchReviews();

        // Also, reset the active attributes and quantity when the product changes
        if (selectedProduct) {
            const colorAttr = selectedProduct.attributes?.find(attr => attr.name.toLowerCase() === "color");
            setActiveColor(colorAttr?.options[0] || '');
            setQuantity(1);
        }

    }, [selectedProduct]);

    const calculateReviews = () => {
        let calculatedAverage_rating = 0;
        const star_count = {
            one: 0,
            two: 0,
            three: 0,
            four: 0,
            five: 0
        };

        reviews?.forEach((review) => {
            if (review.rating === 1) star_count.one++;
            else if (review.rating === 2) star_count.two++;
            else if (review.rating === 3) star_count.three++;
            else if (review.rating === 4) star_count.four++;
            else if (review.rating === 5) star_count.five++;
            calculatedAverage_rating += review.rating
        });
        calculatedAverage_rating = calculatedAverage_rating / reviews.length

        return {
            rating_count: reviews.length,
            ...star_count,
            calculatedAverage_rating: calculatedAverage_rating || 0,
        };
    };


    // Find matching variation based on activeColor only
    const findMatchingVariation = useCallback(() => {
        if (!variations || variations.length === 0) return null;
        const hasColorAttribute = selectedProduct?.attributes?.some(attr => attr.name.toLowerCase() === 'color' && attr.variation);
        const matchingVariant = variations.find((variation) => {
            const colorMatch = !hasColorAttribute || variation.attributes.some(
                attr => attr.name.toLowerCase() === 'color' && attr.option === activeColor
            );
            return colorMatch;
        });
        return matchingVariant ?? null;
    }, [selectedProduct, activeColor, variations]);

    useEffect(() => {
        if (!selectedProduct || !selectedProduct.variations || selectedProduct.variations.length === 0) {
            return;
        }
        if (variations && variations.length > 0) {
            const initialVariation = findMatchingVariation();
            if (initialVariation) {
                setSelectedVariation(initialVariation);
            }
        }
    }, [selectedProduct, findMatchingVariation, variations, activeColor]);

    useEffect(() => {
        const matchingVariation = findMatchingVariation();
        if (matchingVariation) {
            setSelectedVariation(matchingVariation);
        } else {
            setSelectedVariation(null);
        }
    }, [findMatchingVariation])

    // Ensure quantity is set when quantities become available
    useEffect(() => {
        if (quantities.length > 0 && (quantity === 0 || !quantities.includes(quantity))) {
            setQuantity(quantities[0]);
        }
    }, [quantities, quantity]);

    const percentSale = selectedProduct ? (() => {
        const matchingVariation = findMatchingVariation();
        const salePrice = Number(selectedProduct?.sale_price || matchingVariation?.sale_price);
        const regularPrice = Number(selectedProduct?.regular_price || matchingVariation?.regular_price);

        if (regularPrice && salePrice && regularPrice > salePrice) {
            return Math.floor(100 - ((salePrice / regularPrice) * 100));
        }
        return 0;
    })() : 0;


    // const handleOpenSizeGuide = () => {
    //     setOpenSizeGuide(true);
    // };

    // const handleCloseSizeGuide = () => {
    //     setOpenSizeGuide(false);
    // };

    // Handler for color selection only
    const handleActiveColor = (newColor: string) => {
        setActiveColor(newColor);
    };

    const handleAddToCart = () => {
        if (selectedProduct) {
            // Additional validation before adding to cart
            if (!isValidQuantityForCart(quantity, quantities)) {
                return;
            }

            const cartVariation = findMatchingVariation();
            addToCart(
                selectedProduct, // The base product data
                quantity,
                activeColor,
                cartVariation?.id?.toString(),
                cartVariation ?? undefined
            );
            openModalCart();
            closeQuickview();
        }
    };

    const handleBuyNow = () => {
        if (selectedProduct) {
            // Additional validation before buy now
            if (!isValidQuantityForCart(quantity, quantities)) {
                return;
            }

            const cartVariation = findMatchingVariation();
            addToCart(
                selectedProduct, // The base product data
                quantity,
                activeColor,
                cartVariation?.id?.toString(),
                cartVariation ?? undefined
            );
            router.push("/checkout");
            closeQuickview();
        }
    };

    const handleAddToWishlist = () => {
        if (selectedProduct) {
            // if product existed in wishlit, remove from wishlist and set state to false
            if (wishlistState.wishlistArray.some(item => item.id === selectedProduct.id)) {
                removeFromWishlist(selectedProduct.id.toString());
            } else {
                // else, add to wishlist and set state to true
                addToWishlist(selectedProduct);
            }
            openModalWishlist();
        }
    };

    const handleClose = () => {
        // ✨ 2. Reset all local state to its initial state
        setVariations([]);
        setSelectedVariation(null);
        setActiveColor('');
        setQuantity(1);
        setReviews([]);

        // ✨ 3. Call the original context function to finish closing
        closeQuickview();
    };

    const reviewsInfo = calculateReviews();



    return (
        <>
            <div className={`modal-quickview-block`} onClick={handleClose}>
                <div
                    className={`modal-quickview-main py-6 ${selectedProduct !== null ? 'open' : ''}`}
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className="flex h-full max-md:flex-col-reverse gap-y-6">
                        <div className="left lg:w-[388px] md:w-[300px] flex-shrink-0 px-6">
                            <div className="list-img max-md:flex items-center gap-4">
                                {selectedProduct?.images.map((item, index) => (
                                    <div className="bg-img w-full aspect-[3/4] max-md:w-[150px] max-md:flex-shrink-0 rounded-[20px] overflow-hidden md:mt-6" key={index}>
                                        <Image
                                            src={item.src}
                                            width={1500}
                                            height={2000}
                                            alt={item.alt || item.name}
                                            priority={true}
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="right w-full px-4">
                            <div className="heading pb-6 px-4 flex items-center justify-between relative">
                                <div className="heading5">Quick View</div>
                                <div
                                    className="close-btn absolute right-0 top-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                                    onClick={closeQuickview}
                                >
                                    <Icon.X size={14} />
                                </div>
                            </div>
                            <div className="product-infor px-4">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="caption2 text-secondary font-semibold uppercase">{selectedProduct?.tags?.[0]?.name || selectedProduct?.type}</div>
                                        <div className="heading4 mt-1">{selectedProduct?.name}</div>
                                    </div>
                                    <div
                                        className={`add-wishlist-btn w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-lg duration-300 flex-shrink-0 hover:bg-black hover:text-white ${wishlistState.wishlistArray.some(item => item.id === selectedProduct?.id) ? 'active' : ''}`}
                                        onClick={handleAddToWishlist}
                                    >
                                        {wishlistState.wishlistArray.some(item => item.id === selectedProduct?.id) ? (
                                            <Icon.Heart size={20} weight='fill' className='text-red' />
                                        ) : (
                                            <Icon.Heart size={20} />
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center mt-3">
                                    <Rate currentRate={Number(reviewsInfo.calculatedAverage_rating)} size={14} />
                                    <span className='caption1 text-secondary'>({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
                                    {isLoadingVariations && selectedProduct?.variations && selectedProduct.variations.length > 0 ? (
                                        <div className="animate-pulse">
                                            <div className="h-6 bg-surface rounded w-20"></div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="product-price heading5">
                                                {currentCurrency ? decodeHtmlEntities(currentCurrency.symbol) : '$'}
                                                {Number(selectedVariation?.sale_price || selectedVariation?.price || selectedProduct?.sale_price || selectedProduct?.price || 0).toFixed(2)}
                                            </div>
                                            {((selectedVariation?.on_sale || selectedProduct?.on_sale) && percentSale > 0) && (
                                                <>
                                                    <div className='w-px h-4 bg-line'></div>
                                                    <div className="product-origin-price font-normal text-secondary2">
                                                        <del>
                                                            {currentCurrency ? decodeHtmlEntities(currentCurrency.symbol) : '$'}
                                                            {Number(selectedVariation?.regular_price || selectedProduct?.regular_price || 0).toFixed(2)}
                                                        </del>
                                                    </div>
                                                    <div className="product-sale caption2 font-semibold bg-green-500 px-3 py-0.5 inline-block rounded-full">
                                                        -{percentSale}%
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {/* <div className='desc text-secondary parsed-html mt-3'>{selectedProduct?.short_description ? parse(selectedProduct.short_description) : parse(selectedProduct?.description.toString().slice(0, 200) + "...")}</div> */}

                                    <div className=' w-full my-3'>
                                        <div className="item bg-surface flex items-center gap-8 py-3 px-10">
                                            <div className="text-title sm:w-1/4 w-1/3">Fabric</div>
                                            <div className="flex items-center gap-1">
                                                <p>{selectedProduct?.production_details?.fabric || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div className="item flex items-center gap-8 py-3 px-10">
                                            <div className="text-title sm:w-1/4 w-1/3">Handles</div>
                                            <p>{selectedProduct?.production_details?.handles || 'N/A'}</p>
                                        </div>
                                        <div className="item bg-surface flex items-center gap-8 py-3 px-10">
                                            <div className="text-title sm:w-1/4 w-1/3">Size</div>
                                            <p>{selectedProduct?.production_details?.size || 'N/A'}</p>
                                        </div>

                                        <div className="item flex items-center gap-8 py-3 px-10">
                                            <div className="text-title sm:w-1/4 w-fit">Manufacturer</div>
                                            <p>{allCountries.find((con => con.code === selectedProduct?.production_details?.manufacturer?.countryCode))?.name}</p>
                                        </div>

                                        <div className="item bg-surface flex justify-center gap-8 pl-8 pr-2 py-2">
                                            <div className="text-title sm:w-1/4 w-1/3 py-3">Print Details</div>
                                            <div
                                                onClick={() => setOpenSizeGuide(true)}
                                                className='flex w-full justify-center rounded-md cursor-pointer items-center  py-0 text-white bg-black'
                                            >
                                                See Details
                                            </div>
                                        </div>
                                        {selectedProduct && <ModalPrintguide data={selectedProduct} isOpen={openSizeGuide} onClose={() => setOpenSizeGuide(false)} />}
                                    </div>
                                </div>
                                <div className="list-action mt-6">
                                    {isLoadingVariations && selectedProduct?.variations && selectedProduct.variations.length > 0 ? (
                                        <VariationSkeleton />
                                    ) : (
                                        <>
                                            {selectedProduct?.attributes?.some(item => item.name.toLowerCase() === "color") && (
                                                <div className="choose-color">
                                                    <div className="text-title">Colors: <span className='text-title color'>{activeColor}</span></div>
                                                    <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                                                        {selectedProduct?.attributes?.find(item => item.name.toLowerCase() === "color")?.options.map((item, index) => (
                                                            <div
                                                                className={`color-item w-fit h-fit flex px-3 py-2 items-center justify-center text-button rounded-md  border border-line ${activeColor === item ? 'active bg-black-800 text-white ' : ''}`}
                                                                key={index}
                                                                onClick={() => handleActiveColor(item)}
                                                            >
                                                                {item}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <div className="text-title mt-5">Quantity:</div>
                                    <div className="choose-quantity flex items-center max-xl:flex-wrap lg:justify-between gap-5 mt-3">
                                        <QuantitySelector
                                            quantityList={quantities}
                                            setQuantity={setQuantity}
                                            quantity={quantity}
                                        />

                                        <button
                                            type="button"
                                            disabled={isLoadingVariations || selectedProduct?.stock_status === "outofstock" || (isColorReq && activeColor.length === 0) || !isValidQuantityForCart(quantity, quantities)}
                                            onClick={handleAddToCart}
                                            className={`button-main w-full text-center ${isLoadingVariations || selectedProduct?.stock_status === "outofstock" || selectedProduct?.stock_quantity === 0 || !selectedProduct?.purchasable || (isColorReq && activeColor.length === 0) || !isValidQuantityForCart(quantity, quantities)
                                                ? "bg-surface text-secondary2 border"
                                                : "bg-white text-black border border-black"
                                                }`}
                                        >
                                            {isLoadingVariations ? "Loading..." : (selectedProduct?.stock_status === "outofstock" || selectedProduct?.stock_quantity === 0 ? "Out Of Stock" : !isValidQuantityForCart(quantity, quantities) ? "Select Quantity" : "Add To Cart")}
                                        </button>

                                    </div>
                                    <div className="button-block mt-5">
                                        <button
                                            onClick={handleBuyNow}
                                            type="button"
                                            disabled={isLoadingVariations || selectedProduct?.stock_status === "outofstock" || (isColorReq && activeColor.length === 0) || !isValidQuantityForCart(quantity, quantities)}
                                            className={`button-main w-full text-center ${isLoadingVariations || selectedProduct?.stock_status === "outofstock" || selectedProduct?.stock_quantity === 0 || !selectedProduct?.purchasable || (isColorReq && activeColor.length === 0) || !isValidQuantityForCart(quantity, quantities)
                                                ? "bg-surface text-secondary2 border"
                                                : "bg-black text-white"
                                                }`}
                                        >
                                            {isLoadingVariations ? "Loading..." : (selectedProduct?.stock_status === "outofstock" || selectedProduct?.stock_quantity === 0 ? "Out Of Stock" : !isValidQuantityForCart(quantity, quantities) ? "Select Quantity" : "Buy It Now")}
                                        </button>
                                    </div>
                                    <div className="flex items-center flex-wrap lg:gap-20 gap-8 gap-y-4 mt-5">
                                        {/* <div className="compare flex items-center gap-3 cursor-pointer" onClick={handleAddToCompare}>
                                            <div
                                                className="compare-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white"
                                            >
                                                <Icon.ArrowsCounterClockwise className='heading6' />
                                            </div>
                                            <span>Compare</span>
                                        </div> */}
                                        <div className="share flex items-center gap-3 cursor-pointer">
                                            <div className="share-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white">
                                                <Icon.ShareNetwork weight='fill' className='heading6' />
                                            </div>
                                            <span>Share Products</span>
                                        </div>
                                    </div>
                                    <div className="more-infor mt-6">
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <div className="flex items-center gap-1">
                                                <Icon.ArrowClockwise className='body1' />
                                                <div className="text-title">Delivery & Return</div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Icon.Question className='body1' />
                                                <div className="text-title">Ask A Question</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center flex-wrap gap-1 mt-3">
                                            <Icon.Timer className='body1' />
                                            <span className="text-title">Estimated Delivery:</span>
                                            <span className="text-secondary">{new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-3">
                                            <div className="text-title">SKU:</div>
                                            <div className="text-secondary">{selectedProduct?.sku || "N/A"}</div>
                                        </div>
                                        <div className="flex items-center gap-1 mt-3">
                                            <div className="text-title">Categories:</div>
                                            <div className="text-secondary">
                                                {selectedProduct?.categories?.map((item, index) => item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()).join(", ") || "N/A"}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 mt-3">
                                            <div className="text-title">Tag:</div>
                                            <div className="text-secondary">
                                                {selectedProduct?.tags?.map((item) => item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()).join(", ") || "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-payment mt-7">
                                        <div className="main-content lg:pt-8 pt-6 lg:pb-6 pb-4 sm:px-4 px-3 border border-line rounded-xl relative max-md:w-2/3 max-sm:w-full">
                                            <div className="heading6 px-5 bg-white absolute -top-[14px] left-1/2 -translate-x-1/2 whitespace-nowrap">Guaranteed safe checkout</div>
                                            <div className="list grid grid-cols-4">
                                                <div className="item flex items-center justify-center lg:px-3 px-1">
                                                    <Image
                                                        src={'/images/payment/visa_logo.png'}
                                                        width={500}
                                                        height={450}
                                                        alt='payment'
                                                        className='w-full rounded-lg p-1 border-line border'
                                                    />
                                                </div>
                                                <div className="item flex items-center justify-center lg:px-3 px-1">
                                                    <Image
                                                        src={'/images/payment/master_card_logo.png'}
                                                        width={500}
                                                        height={450}
                                                        alt='payment'
                                                        className='w-full rounded-lg p-1 border-line border'
                                                    />
                                                </div>
                                                <div className="item flex items-center justify-center lg:px-3 px-1">
                                                    <Image
                                                        src={'/images/payment/paypal_logo.png'}
                                                        width={500}
                                                        height={450}
                                                        alt='payment'
                                                        className='w-full rounded-lg p-1 border-line border'
                                                    />
                                                </div>
                                                <div className="item flex items-center justify-center lg:px-3 px-1">
                                                    <Image
                                                        src={'/images/payment/google_pay_logo.png'}
                                                        width={500}
                                                        height={450}
                                                        alt='payment'
                                                        className='w-full rounded-lg p-1 border-line border'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ModalQuickview;
