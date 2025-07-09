import ModalCart from '@/components/Modal/ModalCart'
import ModalCompare from '@/components/Modal/ModalCompare'
import ModalQuickview from '@/components/Modal/ModalQuickview'
import ModalSearch from '@/components/Modal/ModalSearch'
import ModalWishlist from '@/components/Modal/ModalWishlist'
import '@/styles/styles.scss'
import { Instrument_Sans } from 'next/font/google'
import GlobalProvider from './GlobalProvider'
import { Metadata } from 'next'


const instrument = Instrument_Sans({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'SakibBaba Store',
  description: 'Your online store built with Next.js and WooCommerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={instrument.className}>
        <GlobalProvider>
          {children}
          <ModalQuickview />
          <ModalSearch />
          <ModalCompare />
          <ModalWishlist />
          <ModalCart />
        </GlobalProvider>
      </body>
    </html>
  )
}