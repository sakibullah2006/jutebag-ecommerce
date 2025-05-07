import { getProducts } from '@/actions/products-actions'
import ProductsGrid from '@/components/store/Products-grid'
import React from 'react'

const Page = async () => {
    const { products } = await getProducts()

    return (
        <section className='container mx-auto'>
            <ProductsGrid products={products} title={"All Products"} subtitle='Explore our wide range of products.' />
            {/* Pagination */}
            {/* <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="?page=1">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="?page=2" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination> */}
        </section>
    )
}

export default Page