import { getProductTags } from '@/actions/data-actions'
import { getAllProductsPaginated } from '@/actions/products-actions'
import Footer from '@/components/Footer/Footer'
import MenuTwo from '@/components/Header/Menu/MenuTwo'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import Banner from '@/components/Home/Banner'
import Benefit from '@/components/Home/Benefit'
import Brand from '@/components/Home/Brand'
import Collection from '@/components/Home/Collection'
import Instagram from '@/components/Home/Instagram'
import TabFeatures from '@/components/Home/TabFeatures'
import WhatNewOne from '@/components/Home/WhatNewOne'
// import ModalNewsletter from '@/components/Modal/ModalNewsletter'
import SliderTwo from '@/components/Slider/SliderTwo'
import React from 'react'




export default async function HomeTwo() {

  // const { products } = await getAllProductsPaginated();
  const [{ products }, tags] = await Promise.all([
    getAllProductsPaginated(),
    getProductTags()
  ])
  console.log("Fetch Products:", products.length);

  return (
    <>
      {/* <TopNavOne props="style-two bg-purple" slogan='Limited Offer: Free shipping on orders over $50' /> */}
      <div id="header" className='relative w-full'>
        <MenuTwo />
        <SliderTwo />
      </div>
      <Collection props="pt-5" />
      <WhatNewOne data={products} tags={tags} start={0} limit={8} />
      <Banner />
      <TabFeatures data={products} start={0} limit={8} />
      <Benefit props="md:mt-20 mt-10 py-10 px-2.5 bg-surface rounded-3xl" />
      {/* <Instagram /> */}
      <Brand />
      <Footer />
      {/* Black Friday Pop Up Modal */}
      {/* <ModalNewsletter /> */}
    </>
  )
}

