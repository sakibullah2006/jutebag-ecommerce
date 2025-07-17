'use client'
import { useMemo, useState, useEffect } from 'react'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { useWishlist } from '@/context/WishlistContext'
import { Product as ProductType } from '@/types/product-type'
import Product from '@/components/Product/Product'
import HandlePagination from '@/components/Other/HandlePagination'
import { TagType } from '../../types/data-type'

interface WishlistClientProps {
    tags: TagType[];
}

const WishlistClient: React.FC<WishlistClientProps> = ({ tags }) => {
    const { wishlistState } = useWishlist();
    const [sortOption, setSortOption] = useState('');
    const [layoutCol, setLayoutCol] = useState<number>(4);
    const [type, setType] = useState<string | undefined>();
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 12;

    const handleLayoutCol = (col: number) => {
        setLayoutCol(col);
    };

    const handleType = (type: string) => {
        setType((prevType) => (prevType === type ? undefined : type));
    };

    const handleSortChange = (option: string) => {
        setSortOption(option);
    };

    const filteredData = useMemo(() => {
        let data = [...wishlistState.wishlistArray];

        if (type) {
            data = data.filter(product => product.tags.some(tag => tag.name.toLowerCase() === type.toLowerCase()));
        }

        if (sortOption === 'soldQuantityHighToLow') {
            data.sort((a, b) => b.total_sales - a.total_sales);
        } else if (sortOption === 'discountHighToLow') {
            data = data
                .filter(item => item.on_sale === true)
                .sort((a, b) =>
                    (Math.floor(100 - ((Number(b.sale_price) / Number(b.price)) * 100))) -
                    (Math.floor(100 - ((Number(a.sale_price) / Number(a.price)) * 100)))
                );
        } else if (sortOption === 'priceHighToLow') {
            data.sort((a, b) => Number(b.price) - Number(a.price));
        } else if (sortOption === 'priceLowToHigh') {
            data.sort((a, b) => Number(a.price) - Number(b.price));
        }

        return data;
    }, [wishlistState.wishlistArray, type, sortOption]);

    const totalProducts = filteredData.length;
    const pageCount = Math.ceil(totalProducts / productsPerPage);

    useEffect(() => {
        if (pageCount > 0 && currentPage >= pageCount) {
            setCurrentPage(pageCount - 1);
        } else if (pageCount === 0) {
            setCurrentPage(0);
        }
    }, [pageCount, currentPage]);

    const currentProducts = useMemo(() => {
        const offset = currentPage * productsPerPage;
        return filteredData.slice(offset, offset + productsPerPage);
    }, [filteredData, currentPage, productsPerPage]);

    const handlePageChange = (selected: number) => {
        setCurrentPage(selected);
    };

    return (
        <div className="container">
            <div className="list-product-block relative">
                <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
                    <div className="left flex has-line items-center flex-wrap gap-5">
                        <div className="choose-layout flex items-center gap-2">
                            {[3, 4, 5].map(col => (
                                <div
                                    key={col}
                                    className={`item p-2 border border-line rounded flex items-center justify-center cursor-pointer ${layoutCol === col ? 'active' : ''}`}
                                    onClick={() => handleLayoutCol(col)}
                                >
                                    <div className='flex items-center gap-0.5'>
                                        {Array.from({ length: col }).map((_, index) => (
                                            <span key={index} className='w-[3px] h-4 bg-secondary2 rounded-sm'></span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="right flex items-center gap-3">
                        <div className="select-block filter-type relative">
                            <select
                                className='caption1 py-2 pl-3 md:pr-12 pr-8 rounded-lg border border-line capitalize'
                                name="select-type"
                                id="select-type"
                                onChange={(e) => handleType(e.target.value)}
                                value={type === undefined ? 'Type' : type}
                            >
                                <option value="Type" disabled>Type</option>
                                {tags.map((item, index) => (
                                    <option key={index} value={item.name} className='capitalize'>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <Icon.CaretDown size={12} className='absolute top-1/2 -translate-y-1/2 md:right-4 right-2' />
                        </div>
                        <div className="select-block relative">
                            <select
                                id="select-filter"
                                name="select-filter"
                                className='caption1 py-2 pl-3 md:pr-20 pr-10 rounded-lg border border-line'
                                onChange={(e) => handleSortChange(e.target.value)}
                                defaultValue={'Sorting'}
                            >
                                <option value="Sorting" disabled>Sorting</option>
                                <option value="soldQuantityHighToLow">Best Selling</option>
                                <option value="discountHighToLow">Best Discount</option>
                                <option value="priceHighToLow">Price High To Low</option>
                                <option value="priceLowToHigh">Price Low To High</option>
                            </select>
                            <Icon.CaretDown size={12} className='absolute top-1/2 -translate-y-1/2 md:right-4 right-2' />
                        </div>
                    </div>
                </div>

                <div className="list-filtered flex items-center gap-3 mt-4">
                    <div className="total-product">
                        {totalProducts}
                        <span className='text-secondary pl-1'>Products Found</span>
                    </div>
                    {type && (
                        <>
                            <div className='w-px h-4 bg-line'></div>
                            <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize cursor-pointer" onClick={() => setType(undefined)}>
                                <Icon.X />
                                <span>{type}</span>
                            </div>
                            <div
                                className="clear-btn flex items-center px-2 py-1 gap-1 rounded-full border border-red cursor-pointer"
                                onClick={() => setType(undefined)}
                            >
                                <Icon.X color='rgb(219, 68, 68)' />
                                <span className='text-button-uppercase text-red'>Clear All</span>
                            </div>
                        </>
                    )}
                </div>

                <div className={`list-product hide-product-sold grid lg:grid-cols-${layoutCol} sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7`}>
                    {currentProducts.length === 0 ? (
                        <div className="no-data-product col-span-full text-center">No products match the selected criteria.</div>
                    ) : (
                        currentProducts.map((item: ProductType) => (
                            <Product key={item.id} data={item} type='grid' style='style-1' />
                        ))
                    )}
                </div>

                {pageCount > 1 && (
                    <div className="list-pagination flex items-center justify-center md:mt-10 mt-7">
                        <HandlePagination pageCount={pageCount} onPageChange={handlePageChange} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default WishlistClient;
