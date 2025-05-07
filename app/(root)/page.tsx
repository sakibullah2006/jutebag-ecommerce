import { getProducts } from "@/actions/products-actions";
import Hero from "@/components/store/Hero-section";
import ProductsGrid from "@/components/store/Products-grid";




const Home = async () => {
  const { products, totalItems, totalPages } = await getProducts({ perPage: 10 });
  console.log(`Total Items: ${totalItems}, Total Pages: ${totalPages}`);


  return (
    <>
      {/* Hero Section  */}
      <Hero />
      {/* Product Grid */}
      <section id="product-showcase" className="container mx-auto my-5">
        <ProductsGrid products={products} title="Featured Products" />

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
    </>
  )
}

export default Home

