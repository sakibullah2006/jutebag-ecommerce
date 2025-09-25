import { getAllProductsPaginated } from '@/actions/products-actions'
import Banner from '@/components/Home/Banner'
import Benefit from '@/components/Home/Benefit'
import Brand from '@/components/Home/Brand'
import TabFeatures from '@/components/Home/TabFeatures'
import WhatNewOne from '@/components/Home/WhatNewOne'
import { Metadata } from 'next'
import React from 'react'
import { STOREINFO } from '../../constant/storeConstants'
import { getDeals } from '../../actions/deal-actions'
import SliderNine from '../../components/Slider/SliderNine'
import TrendingNow from '../../components/Home/TrendingNow'
import { getBanners } from '../../actions/banner-actions'


export const metadata: Metadata = {
  title: `Home | ${STOREINFO.name} Store`,
  description: `Discover the latest products and collections at ${STOREINFO.name} Store. Shop now for exclusive deals and free shipping on orders over $50.`,
  keywords: 'online store, shopping, products, collections, deals, free shipping',
  openGraph: {
    title: `Home | ${STOREINFO.name} Store`,
    description: `Discover the latest products and collections at ${STOREINFO.name} Store. Shop now for exclusive deals and free shipping on orders over $50.`,
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Home | ${STOREINFO.name} Store`,
    description: `Discover the latest products and collections at ${STOREINFO.name} Store. Shop now for exclusive deals and free shipping on orders over $50.`,
  },
}




export default async function HomeTwo() {

  // const { products } = await getAllProductsPaginated();
  const [
    productsResult,
    dealsResult,
    bannersResult
  ] = await Promise.allSettled([
    getAllProductsPaginated(),
    getDeals(),
    getBanners()
  ]);

  const products = productsResult.status === 'fulfilled' ? productsResult.value.products : [];
  const deals = dealsResult.status === 'fulfilled' ? dealsResult.value : [];
  const banners = bannersResult.status === 'fulfilled' ? bannersResult.value : [];



  return (
    <>
      <div
        id="header"
        className='relative w-full style-nine'>
        <SliderNine deals={deals} />
      </div>
      <TrendingNow />
      <div className='max-w-[1200px] 2xl:max-w-[80%] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12'>
        {/* <Collection props="pt-5" /> */}
      </div>
      <div className='max-w-[1200px] 2xl:max-w-[80%] mx-auto'>
        <WhatNewOne data={products} start={0} limit={4} />
        <Banner banners={banners} />
        <TabFeatures data={products} start={0} limit={4} />
        <Benefit props="md:mt-20 mt-10 py-10 px-2.5 bg-surface rounded-3xl" />
      </div>
      {/* <Instagram /> */}
      <Brand />
      {/* Black Friday Pop Up Modal */}
      {/* <ModalNewsletter /> */}
    </>
  )
}

