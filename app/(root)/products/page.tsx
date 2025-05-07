import { getProducts } from '@/actions/products-actions';
import ProductsGrid from '@/components/store/Products-grid';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import React from 'react';

const Page = async ({
    searchParams,
}: {
    searchParams: { page?: string, category?: string, tag?: string };
}) => {
    const page = parseInt(searchParams.page || '1', 10);
    const { products } = await getProducts({ page })

    return (
        <section className='container mx-auto mb-10'>
            {/* Products Grid */}
            <ProductsGrid products={products} title={"All Products"} subtitle='Explore our wide range of products.' />

            {/* Pagination */}
            <Pagination >
                <PaginationContent>
                    {page > 1 && (
                        <PaginationItem>
                            <PaginationPrevious href={`/?page=${page - 1}`} />
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationLink href={`?page=${page}`} >{page}</PaginationLink>
                    </PaginationItem>
                    {
                        products.length == 10 && (
                            <PaginationItem>
                                <PaginationNext href={`?page=${page + 1}`} />
                            </PaginationItem>
                        )}
                </PaginationContent>
            </Pagination>
        </section>
    )
}

export default Page