'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import * as Icon from "@phosphor-icons/react/dist/ssr";

// --- Consolidated Imports ---
import { useAuth } from '@/context/AuthContext';
import { useAppData } from '@/context/AppDataContext';
import { useCart } from '@/context/CartContext';
import { useModalCartContext } from '@/context/ModalCartContext';
import { useModalWishlistContext } from '@/context/ModalWishlistContext';
import useLoginPopup from '@/store/useLoginPopup';
import useMenuMobile from '@/store/useMenuMobile';
import useSubMenuDepartment from '@/store/useSubMenuDepartment';
import { PATH } from '@/constant/pathConstants';
import { STOREINFO } from '@/constant/storeConstants';
import { generateMenuItems, MenuItem } from '@/lib/categoryUtils';
import { CategorieType } from '@/types/data-type';

interface Props {
    props?: string;
    categories: CategorieType[];
}

const MenuEight: React.FC<Props> = ({ props, categories }) => {
    const router = useRouter();
    const pathname = usePathname();

    // --- State and Context Hooks ---
    const { openLoginPopup, handleLoginPopup } = useLoginPopup();
    const { openMenuMobile, handleMenuMobile } = useMenuMobile();
    const { openSubMenuDepartment, handleSubMenuDepartment } = useSubMenuDepartment();
    const { openModalCart } = useModalCartContext();
    const { cartState } = useCart();
    const { openModalWishlist } = useModalWishlistContext();
    const { user, isAuthenticated, logout, loading } = useAuth();
    const { categories: categoriesData } = useAppData();

    // --- Component State ---
    const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [fixedHeader, setFixedHeader] = useState(false);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    // --- Effects ---
    useEffect(() => {
        const data = categories || categoriesData;
        if (data) {
            setMenuItems(generateMenuItems(data));
        }
    }, [categories, categoriesData]);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPosition = window.scrollY;
                    setFixedHeader(scrollPosition > 0 && scrollPosition < lastScrollPosition);
                    setLastScrollPosition(scrollPosition);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollPosition]);

    // --- Handlers ---
    const handleSearch = (value: string) => {
        if (!value.trim()) return;
        router.push(`/search-result?query=${value}`);
        setSearchKeyword('');
    };

    const handleOpenSubNavMobile = (index: number) => {
        setOpenSubNavMobile(openSubNavMobile === index ? null : index);
    };

    return (
        <>
            <div className={`header-menu style-eight ${fixedHeader ? ' fixed' : ''} ${props || 'bg-white'} w-full md:h-[74px] h-[56px]`}>
                <div className="container mx-auto h-full">
                    <div className="header-main flex items-center justify-between h-full">
                        <div className="menu-mobile-icon lg:hidden flex items-center" onClick={handleMenuMobile}>
                            <i className="icon-category text-2xl"></i>
                        </div>
                        <Link href={PATH.HOME} className='flex items-center'>
                            <div className="heading4">{STOREINFO.name}</div>
                        </Link>
                        <div className="form-search w-2/3 mr-4 pl-8 flex items-center h-[44px] max-lg:hidden">
                            <input
                                type="text"
                                className="search-input h-full px-4 w-full border border-line rounded-l"
                                placeholder="What are you looking for today?"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
                            />
                            <button
                                className="search-button button-main bg-black h-full flex items-center px-7 rounded-none rounded-r"
                                onClick={() => handleSearch(searchKeyword)}
                            >
                                Search
                            </button>
                        </div>
                        <div className="right flex gap-12">
                            <div className="list-action flex items-center gap-4">
                                <div className="user-icon flex items-center justify-center cursor-pointer">
                                    <Icon.UserIcon size={24} color='black' onClick={handleLoginPopup} />
                                    <div className={`login-popup absolute top-[74px] w-[320px] p-7 rounded-xl bg-white box-shadow-sm ${openLoginPopup ? 'open' : ''}`}>
                                        {!isAuthenticated ? (
                                            <>
                                                <Link href={PATH.LOGIN} className="button-main w-full text-center">Login</Link>
                                                <div className="text-secondary text-center mt-3 pb-4">Don’t have an account?
                                                    <Link href={PATH.REGISTER} className='text-black pl-1 hover:underline'>Register</Link>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-secondary text-center mt-3 pb-4">Hello, <span className='text-black'>{user?.user_display_name}</span></div>
                                                <Link href={PATH.DASHBOARD} className="button-main bg-white text-black border border-black w-full text-center">Dashboard</Link>
                                                <div
                                                    className={`button-main w-full text-center mt-3 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    onClick={() => {
                                                        if (loading) return;
                                                        logout();
                                                        handleLoginPopup();
                                                        router.push(PATH.LOGIN);
                                                    }}
                                                >
                                                    {loading ? "Logging Out..." : "Log Out"}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="max-md:hidden wishlist-icon flex items-center cursor-pointer" onClick={openModalWishlist}>
                                    <Icon.Heart size={24} color='black' />
                                </div>
                                <div className="cart-icon flex items-center relative cursor-pointer" onClick={openModalCart}>
                                    <Icon.Handbag size={24} color='black' />
                                    <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">{cartState.cartArray.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="top-nav-menu relative bg-white border-t border-b border-line h-[44px] max-lg:hidden z-10">
                <div className="container h-full">
                    <div className="top-nav-menu-main flex items-center justify-between h-full">
                        <div className="left flex items-center h-full">
                            <div className="menu-department-block relative h-full">
                                <div
                                    className="menu-department-btn bg-black relative flex items-center sm:gap-16 gap-4 px-4 h-full w-fit cursor-pointer"
                                    onClick={handleSubMenuDepartment}
                                >
                                    <div className="text-button-uppercase text-white whitespace-nowrap">Department</div>
                                    <Icon.CaretDownIcon color='#ffffff' className='text-xl max-sm:text-base' />
                                </div>
                                <div className={`sub-menu-department absolute top-[44px] left-0 right-0 h-max bg-white rounded-b-2xl ${openSubMenuDepartment ? 'open' : ''}`}>
                                    {categories && categories
                                        .filter(item => item.slug.toLowerCase().includes('common'))
                                        .map(item => (
                                            <div key={item.id} className="item block">
                                                <Link href={`${PATH.SHOP}?category=${item.slug}`} className='py-1.5  whitespace-nowrap inline-block hover:text-black'>
                                                    {item.name}
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="menu-main style-eight h-full pl-12 max-lg:hidden">
                                <ul className='flex items-center gap-8 h-full'>
                                    <li className='h-full'>
                                        <Link
                                            href={PATH.SHOP}
                                            className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${pathname.includes(PATH.SHOP) ? 'active' : ''}`}
                                        >
                                            Shop
                                        </Link>
                                    </li>
                                    <li className='h-full'>
                                        <Link href="#!" className='text-button-uppercase duration-300 h-full flex items-center justify-center'>
                                            All Categories
                                        </Link>
                                        <div className="mega-menu absolute top-[44px] left-0 bg-white w-screen">
                                            <div className="container">
                                                <div className="flex justify-between py-8">
                                                    <div className="nav-link basis-full grid grid-cols-4 gap-y-8">
                                                        {menuItems.map((menuItem) => (
                                                            <React.Fragment key={menuItem.id}>
                                                                {menuItem.subMenu && menuItem.subMenu.length > 0 && (
                                                                    <div className="nav-item">
                                                                        <div className="text-button-uppercase pb-2">{menuItem.name}</div>
                                                                        <ul>
                                                                            {menuItem.subMenu.slice(0, 6).map((subMenu) => (
                                                                                <li key={subMenu.id}>
                                                                                    <Link
                                                                                        href={`${PATH.SHOP}?category=${subMenu.slug}` + (menuItem.isGenderCat ? `&gender=${menuItem.genderCategory}` : '')}
                                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                                    >
                                                                                        {subMenu.name}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                            <li>
                                                                                <Link
                                                                                    href={menuItem.isGenderCat ? `${PATH.SHOP}?gender=${menuItem.genderCategory}` : `${PATH.SHOP}?category=${menuItem.slug}`}
                                                                                    className={`link text-secondary duration-300 view-all-btn`}
                                                                                >
                                                                                    View All
                                                                                </Link>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="right flex items-center gap-1">
                            <div className="caption1">Hotline:</div>
                            <div className="text-button-uppercase">{STOREINFO.phoneNumber}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="menu-mobile" className={`${openMenuMobile ? 'open' : ''}`}>
                <div className="menu-container bg-white h-full">
                    <div className="container h-full">
                        <div className="menu-main h-full overflow-hidden">
                            <div className="heading py-2 relative flex items-center justify-center">
                                <div
                                    className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                                    onClick={handleMenuMobile}
                                >
                                    <Icon.X size={14} />
                                </div>
                                <Link href={PATH.HOME} className='logo text-3xl font-semibold text-center'>{STOREINFO.name}</Link>
                            </div>
                            <div className="form-search relative mt-2">
                                <Icon.MagnifyingGlass size={20} className='absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer' onClick={() => handleSearch(searchKeyword)} />
                                <input
                                    type="text"
                                    placeholder='What are you looking for?'
                                    className=' h-12 rounded-lg border border-line text-sm w-full pl-10 pr-4'
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
                                />
                            </div>
                            <div className="list-nav mt-6">
                                <ul>
                                    <li>
                                        <Link href={PATH.SHOP} className='text-xl font-semibold flex items-center justify-between'>
                                            Shop
                                        </Link>
                                    </li>
                                    <li className={`${openSubNavMobile === 1 ? 'open' : ''}`}>
                                        <div
                                            onClick={() => handleOpenSubNavMobile(1)}
                                            className='text-xl font-semibold flex items-center justify-between mt-5 cursor-pointer'
                                        >
                                            Categories
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </div>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={(e) => { e.stopPropagation(); handleOpenSubNavMobile(1); }}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-3 pb-12 grid grid-cols-2 gap-5 gap-y-6">
                                                {menuItems.map((menuItem) => (
                                                    <div key={menuItem.id} className="nav-item">
                                                        <div className="text-button-uppercase pb-1">{menuItem.name}</div>
                                                        <ul>
                                                            {menuItem.subMenu?.map((subMenuItem) => (
                                                                <li key={subMenuItem.id}>
                                                                    <Link
                                                                        href={`${PATH.SHOP}?category=${subMenuItem.slug}` + (menuItem.isGenderCat ? `&gender=${menuItem.genderCategory}` : '')}
                                                                        className={`link text-secondary duration-300 cursor-pointer`}
                                                                    >
                                                                        {subMenuItem.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenuEight;