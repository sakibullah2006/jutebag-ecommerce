import { getAllProductsPaginated } from '@/actions/products-actions';
import SearchResult from '@/components/search-result/searchResult';
import { Suspense } from 'react';

const SearchResultServerComponent = async () => {
  const { products: productData } = await getAllProductsPaginated();

  return (
    <Suspense fallback={<></>}>
      <SearchResult productData={productData} />
    </Suspense>
  )
};

export default SearchResultServerComponent;
