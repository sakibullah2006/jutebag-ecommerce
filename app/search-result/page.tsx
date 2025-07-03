import { getAllProductsPaginated } from '@/actions/products-actions';
import SearchResult from '@/components/search-result/searchResult';

const SearchResultServerComponent = async () => {
    const { products: productData } = await getAllProductsPaginated();

    return <SearchResult productData={productData} />
};

export default SearchResultServerComponent;