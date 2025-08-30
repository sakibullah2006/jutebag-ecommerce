/* eslint-disable prefer-const */
'use client'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import MenuOne from '@/components/Header/Menu/MenuOne'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import HandlePagination from '@/components/Other/HandlePagination'
import Product from '@/components/Product/Product'
import { Product as ProductType } from '@/types/product-type'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface SearchResultProps {
    productData: ProductType[];
}

const SearchResult = ({ productData }: SearchResultProps) => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 8;
    const offset = currentPage * productsPerPage;
    let filteredData = productData

    const router = useRouter()

    const handleSearch = (value: string) => {
        router.push(`/search-result?query=${value}`)
        setSearchKeyword('')
    }

    const searchParams = useSearchParams()
    let query = searchParams.get('query') as string

    if (query === null) {
        query = 'dress'
    } else {
        filteredData = productData.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.type.toLowerCase().includes(query.toLowerCase())
        );
    }

    if (filteredData.length === 0) {
        filteredData = [];
    }

    // Find page number base on filteredData
    const pageCount = Math.ceil(filteredData.length / productsPerPage);

    // Reset page when filtered data changes
    useEffect(() => {
        if (pageCount === 0) {
            setCurrentPage(0);
        }
    }, [pageCount]);

    // Get product data for current page
    let currentProducts: ProductType[] = filteredData.length > 0
        ? filteredData.slice(offset, offset + productsPerPage)
        : [];

    const handlePageChange = (selected: number) => {
        setCurrentPage(selected);
    };

    return (
        <>

            <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10 px-10">
                <div className="container">
                    <div className="heading flex flex-col items-center">
                        <div className="heading4 lg:text-3xl text-center">Found {filteredData.length} results for {String.raw`"`}{query}{String.raw`"`}</div>
                        <div className="input-block lg:w-1/2 sm:w-3/5 w-full md:h-[52px] h-[44px] sm:mt-8 mt-5">
                            <div className='w-full h-full relative'>
                                <input
                                    type="text"
                                    placeholder='Search...'
                                    className='caption1 w-full h-full pl-4 md:pr-[150px] pr-32  rounded-2xl border border-line  focus:outline-none'
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
                                />
                                <button
                                    className='button-main absolute top-1 bottom-1 right-1 flex items-center justify-center'
                                    onClick={() => handleSearch(searchKeyword)}
                                >
                                    search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="list-product-block relative md:pt-10 pt-6">
                        <div className="heading6">product Search: {query}</div>
                        <div className={`list-product hide-product-sold grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-5`}>
                            {currentProducts.length === 0 ? (
                                <div className="no-data-product">No products match the selected criteria.</div>
                            ) : (
                                currentProducts.map((item) => <Product key={item.id} data={item} type='grid' style='style-1' />)
                            )}
                        </div>

                        {pageCount > 1 && (
                            <div className="list-pagination flex items-center justify-center md:mt-10 mt-7">
                                <HandlePagination pageCount={pageCount} onPageChange={handlePageChange} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchResult