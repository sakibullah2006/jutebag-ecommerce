import { getProducts } from "@/actions/products-actions";
import Hero from "@/components/store/Hero-section";
import ProductsGrid from "@/components/store/Products-grid";
// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export const metadata = {
  title: "WooNext - Store with WP",
  description: "Browse our collection of products and find what you need. Powered by WordPress and Next.js.",
};

const Home = async ({
  searchParams,
}: {
  searchParams: { page?: string, category?: string, tag?: string };
}) => {
  const page = parseInt((await searchParams).page || '1', 10);
  // const category = searchParams.category || '';
  // const tag = searchParams.tag || '';
  const { products, totalItems, totalPages } = await getProducts({ page });
  console.log(`Total Items: ${totalItems}, Total Pages: ${totalPages}`);
  console.log(products.length);


  return (
    <>
      {/* Hero Section  */}
      <Hero />
      {/* Product Grid */}
      <section id="product-showcase" className="container mx-auto my-5">

        <ProductsGrid products={products} />

        {/* Pagination */}
        {/* <Pagination>
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
        </Pagination> */}

      </section>
    </>
  )
}

export default Home

