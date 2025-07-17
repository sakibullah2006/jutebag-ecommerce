/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
'use client'

import { useAppData } from "@/context/AppDataContext";
import { COLORS } from "@/data/color-codes";
import { decodeHtmlEntities } from "@/lib/utils";
import { AttributesWithTermsType, CategorieType, CurrencyType, ProductBrandType, TagType } from "@/types/data-type";
import { Product as ProductType } from "@/types/product-type";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useCallback, useEffect, useState } from 'react';
import HandlePagination from '../Other/HandlePagination';
import Product from '../Product/Product';

interface Props {
    data: Array<ProductType>
    productPerPage: number
    dataType: string | null | undefined
    gender: string | null
    category: string | null
}

const ShopBreadCrumb1: React.FC<Props> = ({ data, productPerPage, dataType, gender, category }) => {
    const [showOnlySale, setShowOnlySale] = useState(false)
    const [sortOption, setSortOption] = useState('');
    const [pageCount, setPageCount] = useState<number | null>(null);
    const [type, setType] = useState<string | null | undefined>(dataType)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(category);
    const [size, setSize] = useState<string | null>()
    const [color, setColor] = useState<string | null>()
    const [brand, setBrand] = useState<string | null>()
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = productPerPage;
    const offset = currentPage * productsPerPage;

    // const { tags, attributes: attributesData } = productOptions || {};
    const { currentCurrency, brands, categories, attributes: attributesData, tags } = useAppData()

    useEffect(() => {
        // fetchProductOptions()
        const initialCount = Math.ceil(data.length / productsPerPage);
        setPageCount(initialCount);
    }, [])

    useEffect(() => {
        if (pageCount === 0) {
            setCurrentPage(0);
        }
    }, [pageCount]);

    const handleShowOnlySale = () => {
        setShowOnlySale(toggleSelect => !toggleSelect)
    }

    const handleSortChange = (option: string) => {
        setSortOption(option);
        setCurrentPage(0);
    };

    const handleType = (type: string | null) => {
        setType((prevType) => (prevType === type ? null : type))
        setCurrentPage(0);
    }

    const handleCategory = (cat: string | null) => {
        const newCategory = selectedCategory === cat ? null : cat;
        setSelectedCategory(newCategory);
        setCurrentPage(0);

        const params = new URLSearchParams(window.location.search);
        if (newCategory) {
            params.set('category', newCategory);
        } else {
            params.delete('category');
        }
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    }

    const handleSize = (size: string) => {
        setSize((prevSize) => (prevSize === size ? null : size))
        setCurrentPage(0);
    }

    const handlePriceChange = (values: number | number[]) => {
        if (Array.isArray(values)) {
            setPriceRange({ min: values[0], max: values[1] });
            setCurrentPage(0);
        }
    };

    const handleColor = (color: string) => {
        setColor((prevColor) => (prevColor === color ? null : color))
        setCurrentPage(0);
    }

    const handleBrand = (brand: string) => {
        setBrand((prevBrand) => (prevBrand === brand ? null : brand));
        setCurrentPage(0);
    }


    // Filter product
    let filteredData = data.filter(product => {
        let isShowOnlySaleMatched = true;
        if (showOnlySale) {
            isShowOnlySaleMatched = product.on_sale
        }

        let isDatagenderMatched = true;
        if (gender) {
            isDatagenderMatched = product.categories.find(cat => cat.slug.includes("gender"))?.slug.includes(gender) || false;
        }

        let isDataCategoryMatched = true;
        if (selectedCategory) {
            isDataCategoryMatched = product.categories.some(cat => cat.slug.toLowerCase() === selectedCategory.toLowerCase())
        }

        let isDataTypeMatched = true;
        if (dataType) {
            isDataTypeMatched = product.tags.some((tag) => tag.slug.toLowerCase() === dataType!.toLowerCase())
        }

        let isTypeMatched = true;
        if (type) {
            dataType = type
            isTypeMatched = product.tags.some((tag) => tag.slug.toLowerCase() === dataType!.toLowerCase())
        }

        let isSizeMatched = true;
        if (size) {
            isSizeMatched = !!product.attributes.find((attr) => attr.name.toLowerCase() === "size")?.options.some((s) => s.toLowerCase() === size.toLowerCase());
        }

        let isPriceRangeMatched = true;
        if (priceRange.min !== 0 || priceRange.max !== 1000) {
            isPriceRangeMatched = Number(product.price) >= priceRange.min && Number(product.price) <= priceRange.max;
        }

        let isColorMatched = true;
        if (color) {
            isColorMatched = !!product.attributes.find((attr) => attr.name.toLowerCase() === "color")?.options.some((c) => c.toLowerCase() === color.toLowerCase());
        }

        let isBrandMatched = true;
        if (brand) {
            isBrandMatched = product.brands.some((b) => b.name.toLowerCase() === brand.toLowerCase());
        }

        return isShowOnlySaleMatched && isDatagenderMatched && isDataCategoryMatched && isDataTypeMatched && isTypeMatched && isSizeMatched && isColorMatched && isBrandMatched && isPriceRangeMatched
    })


    // Create a copy array filtered to sort
    let sortedData = [...filteredData];

    if (sortOption === 'soldQuantityHighToLow') {
        filteredData = sortedData.sort((a, b) => b.total_sales - a.total_sales)
    }

    if (sortOption === 'discountHighToLow') {
        filteredData = sortedData
            .filter(item => item.on_sale)
            .sort((a, b) => (
                (Math.floor(100 - ((Number(b.sale_price) / Number(b.regular_price)) * 100))) - (Math.floor(100 - ((Number(a.sale_price) / Number(a.regular_price)) * 100)))
            ))
    }

    if (sortOption === 'priceHighToLow') {
        filteredData = sortedData.sort((a, b) => Number(b.price) - Number(a.price))
    }

    if (sortOption === 'priceLowToHigh') {
        filteredData = sortedData.sort((a, b) => Number(a.price) - Number(b.price))
    }

    const totalProducts = filteredData.length
    const selectedType = type
    const selectedSize = size
    const selectedColor = color
    const selectedBrand = brand


    if (filteredData.length === 0) {
        filteredData = [];
    }


    // Find page number base on filteredData
    const filteredPageCount = Math.ceil(filteredData.length / productsPerPage);




    // Get product data for current page
    let currentProducts: ProductType[];

    if (filteredData.length > 0) {
        currentProducts = filteredData.slice(offset, offset + productsPerPage);
    } else {
        currentProducts = []
    }

    const handlePageChange = (selected: number) => {
        setCurrentPage(selected);
    };

    const handleClearAll = () => {
        dataType = null
        setShowOnlySale(false);
        setSortOption('');
        setSelectedCategory(null);
        setType(null);
        setSize(null);
        setColor(null);
        setBrand(null);
        setPriceRange({ min: 0, max: 1000 });
        setCurrentPage(0);
        handleType(null)
    };

    return (
        <>
            <div className="breadcrumb-block style-img">
                <div className="breadcrumb-main bg-linear overflow-hidden">
                    <div className="container lg:pt-[134px] pt-24 pb-10 relative">
                        <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
                            <div className="text-content">
                                <div className="heading2 text-center">{selectedCategory === null ? 'Shop' : categories.find(cat => cat.slug === selectedCategory)?.name}</div>
                                <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                                    <Link href={'/'}>Homepage</Link>
                                    <Icon.CaretRightIcon size={14} className='text-secondary2' />
                                    <div className='text-secondary2 capitalize'>{selectedCategory === null ? 'Shop' : categories.find(cat => cat.slug === selectedCategory)?.name}</div>
                                </div>
                            </div>
                            <div className="list-tab flex flex-wrap items-center justify-center gap-y-5 gap-8 lg:mt-[70px] mt-12 overflow-hidden">
                                {categories && categories.filter(cat => cat.slug.includes("common")).sort((a, b) => b.count - a.count).slice(0, 5).map((item, index) => (
                                    <div
                                        key={index}
                                        className={`tab-item text-button-uppercase cursor-pointer has-line-before line-2px ${selectedCategory?.toLowerCase() === item.slug.toLowerCase() ? 'active' : ''}`}
                                        onClick={() => handleCategory(item.slug.toLowerCase())}
                                    >
                                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                <div className="container">
                    <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
                        <div className="sidebar lg:w-1/4 md:w-1/3 w-full md:pr-12">
                            <div className="filter-type pb-8 border-b border-line">
                                <div className="heading6">Featured</div>
                                <div className="list-type mt-4">
                                    {tags && tags.filter(tag => tag.slug.includes("promotion")).sort((a, b) => b.count - a.count).map((item, index) => (
                                        <div
                                            key={index}
                                            className={`item flex items-center justify-between cursor-pointer ${selectedType?.toLowerCase() === item.slug.toLowerCase() ? 'active' : ''}`}
                                            onClick={() => handleType(item.slug.toLowerCase())}
                                        >
                                            <div className='text-secondary has-line-before hover:text-black capitalize'>{item.name}</div>
                                            <div className='text-secondary2'>
                                                {/* ({data.filter(dataItem => dataItem.tags.some(tag => tag.name.toLowerCase() === item.name.toLowerCase())
                                                    && dataItem.categories.some(cat => cat.name.toLowerCase() === 'fashion')).length}) */}
                                                ({item.count})
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-type pb-8 border-b border-line">
                                <div className="heading6">Products Type</div>
                                <div className="list-type mt-4">
                                    {categories && categories.filter(cat => cat.slug.includes("common")).sort((a, b) => b.count - a.count).map((item, index) => (
                                        <div
                                            key={index}
                                            className={`item flex items-center justify-between cursor-pointer ${selectedCategory?.toLowerCase() === item.slug.toLowerCase() ? 'active' : ''}`}
                                            onClick={() => handleCategory(item.slug.toLowerCase())}
                                        >
                                            <div className='text-secondary has-line-before hover:text-black capitalize'>{item.name}</div>
                                            <div className='text-secondary2'>
                                                {/* ({data.filter(dataItem => dataItem.tags.some(tag => tag.name.toLowerCase() === item.name.toLowerCase())
                                                    && dataItem.categories.some(cat => cat.name.toLowerCase() === 'fashion')).length}) */}
                                                ({item.count})
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="filter-size pb-8 border-b border-line mt-8">
                                <div className="heading6">Size</div>
                                <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                                    {
                                        attributesData?.filter(attr => attr.attribute.name.toLowerCase() === "size").map((item, index) => (
                                            item.terms.map((term, termIndex) => (
                                                // <div
                                                //     key={termIndex}
                                                //     className={`size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-line ${size === term.name ? 'active' : ''}`}
                                                //     onClick={() => handleSize(term.name)}
                                                // >
                                                //     {term.name}
                                                // </div>
                                                <div
                                                    key={termIndex}
                                                    className={`size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-line ${size === term.name ? 'active' : ''}`}
                                                    onClick={() => handleSize(term.name)}
                                                >
                                                    {term.name}
                                                </div>
                                            ))
                                        ))
                                    }
                                    <div
                                        className={`size-item text-button px-4 py-2 flex items-center justify-center rounded-full border border-line ${size === 'freesize' ? 'active' : ''}`}
                                        onClick={() => handleSize('freesize')}
                                    >
                                        Freesize
                                    </div>
                                </div>
                            </div>
                            <div className="filter-price pb-8 border-b border-line mt-8">
                                <div className="heading6">Price Range</div>
                                <Slider
                                    range
                                    defaultValue={[0, priceRange.max]}
                                    min={0}
                                    max={1000}
                                    onChange={handlePriceChange}
                                    className='mt-5'
                                />
                                <div className="price-block flex items-center justify-between flex-wrap mt-4">
                                    <div className="min flex items-center gap-1">
                                        <div>Min price:</div>
                                        <div className='price-min'>
                                            <span>{decodeHtmlEntities(currentCurrency?.symbol ?? '')}{priceRange.min}</span>
                                        </div>
                                    </div>
                                    <div className="min flex items-center gap-1">
                                        <div>Max price:</div>
                                        <div className='price-max'>
                                            <span>{decodeHtmlEntities(currentCurrency?.symbol ?? '')}{priceRange.max}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filter-color pb-8 border-b border-line mt-8">
                                <div className="heading6">colors</div>
                                <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                                    {
                                        attributesData!.filter(attr => attr.attribute.name.toLowerCase() === "color").map((item, index) => (
                                            item.terms.map((term, termIndex) => (
                                                // <div
                                                //     key={termIndex}
                                                //     className={`size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-line ${size === term.name ? 'active' : ''}`}
                                                //     onClick={() => handleSize(term.name)}
                                                // >
                                                //     {term.name}
                                                // </div>
                                                <div
                                                    key={termIndex}
                                                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color?.toLowerCase() === term.name.toLowerCase() ? 'active' : ''}`}
                                                    onClick={() => handleColor(term.name)}
                                                >
                                                    <div style={{ background: COLORS[term.name.toLowerCase()] }} className={`color w-5 h-5 rounded-full`}></div>
                                                    <div className="caption1 capitalize">{term.name}</div>
                                                </div>
                                            ))
                                        ))
                                    }
                                    {/* <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'pink' ? 'active' : ''}`}
                                        onClick={() => handleColor('pink')}
                                    >
                                        <div className="color bg-[#F4C5BF] w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">pink</div>
                                    </div> */}
                                </div>

                            </div>
                            <div className="filter-brand mt-8">
                                <div className="heading6">Brands</div>
                                <div className="list-brand mt-4">
                                    {brands?.map((item, index) => (
                                        <div key={index} className="brand-item flex items-center justify-between">
                                            <div className="left flex items-center cursor-pointer">
                                                <div className="block-input">
                                                    <input
                                                        type="checkbox"
                                                        name={item.name}
                                                        id={item.id.toString()}
                                                        checked={brand === item.name}
                                                        onChange={() => handleBrand(item.name)} />
                                                    <Icon.CheckSquareIcon size={20} weight='fill' className='icon-checkbox' />
                                                </div>
                                                <label htmlFor={item.name} className="brand-name capitalize pl-2 cursor-pointer">{item.name}</label>
                                            </div>
                                            <div className='text-secondary2'>
                                                ({item.count})
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3">
                            <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
                                <div className="left flex has-line items-center flex-wrap gap-5">
                                    {/* <div className="choose-layout flex items-center gap-2">
                                        <div className="item three-col w-8 h-8 border border-line rounded flex items-center justify-center cursor-pointer active">
                                            <div className='flex items-center gap-0.5'>
                                                <span className='w-[3px] h-4 bg-secondary2 rounded-sm'></span>
                                                <span className='w-[3px] h-4 bg-secondary2 rounded-sm'></span>
                                                <span className='w-[3px] h-4 bg-secondary2 rounded-sm'></span>
                                            </div>
                                        </div>
                                        <Link href={'/shop/sidebar-list'} className="item row w-8 h-8 border border-line rounded flex items-center justify-center cursor-pointer">
                                            <div className='flex flex-col items-center gap-0.5'>
                                                <span className='w-4 h-[3px] bg-secondary2 rounded-sm'></span>
                                                <span className='w-4 h-[3px] bg-secondary2 rounded-sm'></span>
                                                <span className='w-4 h-[3px] bg-secondary2 rounded-sm'></span>
                                            </div>
                                        </Link>
                                    </div> */}
                                    <div className="check-sale flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="filterSale"
                                            id="filter-sale"
                                            className='border-line'
                                            onChange={handleShowOnlySale}
                                        />
                                        <label htmlFor="filter-sale" className='cation1 cursor-pointer'>Show only products on sale</label>
                                    </div>
                                </div>
                                <div className="right flex items-center gap-3">
                                    <div className="select-block relative">
                                        <select
                                            id="select-filter"
                                            name="select-filter"
                                            className='caption1 py-2 pl-3 md:pr-20 pr-10 rounded-lg border border-line'
                                            onChange={(e) => { handleSortChange(e.target.value) }}
                                            defaultValue={'Sorting'}
                                        >
                                            <option value="Sorting" disabled>Sorting</option>
                                            <option value="soldQuantityHighToLow">Best Selling</option>
                                            <option value="discountHighToLow">Best Discount</option>
                                            <option value="priceHighToLow">Price High To Low</option>
                                            <option value="priceLowToHigh">Price Low To High</option>
                                        </select>
                                        <Icon.CaretDownIcon size={12} className='absolute top-1/2 -translate-y-1/2 md:right-4 right-2' />
                                    </div>
                                </div>
                            </div>

                            <div className="list-filtered flex items-center gap-3 mt-4">
                                <div className="total-product">
                                    {totalProducts}
                                    <span className='text-secondary pl-1'>Products Found</span>
                                </div>
                                {
                                    (selectedType || selectedSize || selectedColor || selectedBrand || selectedCategory) && (
                                        <>
                                            <div className="list flex items-center gap-3">
                                                <div className='w-px h-4 bg-line'></div>
                                                {selectedType && (
                                                    <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setType(null) }}>
                                                        <Icon.X className='cursor-pointer' />
                                                        <span>{tags.find(tag => tag.slug.toLowerCase() === selectedType.toLowerCase())?.name}</span>
                                                    </div>
                                                )}
                                                {selectedCategory && (
                                                    <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { handleCategory(null) }}>
                                                        <Icon.X className='cursor-pointer' />
                                                        <span>{categories.find(cat => cat.slug.toLowerCase() === selectedCategory.toLowerCase())?.name}</span>
                                                    </div>
                                                )}

                                                {selectedSize && (
                                                    <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setSize(null) }}>
                                                        <Icon.X className='cursor-pointer' />
                                                        <span>{selectedSize}</span>
                                                    </div>
                                                )}
                                                {selectedColor && (
                                                    <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setColor(null) }}>
                                                        <Icon.X className='cursor-pointer' />
                                                        <span>{selectedColor}</span>
                                                    </div>
                                                )}
                                                {selectedBrand && (
                                                    <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setBrand(null) }}>
                                                        <Icon.X className='cursor-pointer' />
                                                        <span>{selectedBrand}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                className="clear-btn flex items-center px-2 py-1 gap-1 rounded-full border border-red cursor-pointer"
                                                onClick={handleClearAll}
                                            >
                                                <Icon.X color='rgb(219, 68, 68)' className='cursor-pointer' />
                                                <span className='text-button-uppercase text-red'>Clear All</span>
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            <div className="list-product hide-product-sold grid lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7">
                                {currentProducts.length !== 0 ? (
                                    currentProducts.map((item) => <Product key={item.id} data={item} type='grid' style='style-1' />)
                                ) : (
                                    <div className="no-data-product">
                                        {/* <Icon.Empty */}
                                    </div>
                                )}
                            </div>

                            {((filteredPageCount && filteredPageCount > 1) || (pageCount && pageCount > 1)) && (filteredData.length > 0) && (
                                <div className="list-pagination flex items-center md:mt-10 mt-7">
                                    <HandlePagination pageCount={filteredPageCount} onPageChange={handlePageChange} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ShopBreadCrumb1