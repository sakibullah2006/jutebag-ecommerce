import { getAllProductsPaginated } from '@/actions/products-actions';
import SearchResult from '@/components/search-result/searchResult';
import { Suspense } from 'react';
import MenuOne from '../../../components/Header/Menu/MenuOne';
import { getProductCategories } from '../../../actions/data-actions';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import Footer from '../../../components/Footer/Footer';
import TopNavOne from '../../../components/Header/TopNav/TopNavOne';

const SearchResultServerComponent = async () => {
  const [{ products: productData }, categories] = await Promise.all([
    getAllProductsPaginated(),
    getProductCategories()
  ])

  return (

    <>
      <div id="header" className='relative w-full'>
        <Breadcrumb heading='Search Result' subHeading='Search Result' />
      </div>
      <Suspense fallback={<></>}>
        <SearchResult productData={productData} />
      </Suspense>
    </>
  )
};

export default SearchResultServerComponent;
