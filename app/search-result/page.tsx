import { getProducts } from '@/actions/products-actions';
import SearchResult from '@/components/search-result/searchResult';

const SearchResultServerComponent = async () => {
    const { products: productData } = await getProducts();

    return <SearchResult productData={productData} />
};

export default SearchResultServerComponent;