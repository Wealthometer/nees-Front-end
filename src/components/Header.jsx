'use client'

import { Link } from 'react-router-dom'
import { Search, Heart, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getCartCount } = useCart()
  const { getWishlistCount } = useWishlist()

  return (
    <header className="bg-white max-w-full overflow-x-hidden">
      {/* Top bar */}
      <div className="bg-gray-100 py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="text-gray-600 text-xs md:text-sm">
            Email: support@neessolarpanelget.com
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <span className="text-gray-600 text-xs md:text-sm text-center">
              Free nationwide & Free return for above N0N10,000{' '}
              <Link to="/products" className="text-emerald-500 font-medium">
                Shop now!
              </Link>
            </span>
            <div className="hidden lg:flex gap-4 text-gray-600 text-xs">
              <span>90K Followers</span>
              <span>60K Followers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="/Nee Solar Logo 1.png"
                alt="NEESSOLAR"
                className="h-8 md:h-12"
              />
            </Link>

            <div className="hidden md:flex flex-grow max-w-2xl">
              {/* <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Find our search"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-emerald-500 text-white rounded-r-lg hover:bg-emerald-600">
                  <Search className="w-5 h-5" />
                </button>
              </div> */}
            </div>

            {/* Contact & Cart */}
            <div className="flex items-center gap-2 md:gap-6">
              <div className="hidden lg:block text-right">
                <div className="text-xs text-gray-600">Hotline number</div>
                <div className="font-semibold text-sm">+234 0500 2400</div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden mt-4">
            <div className="relative">
              {/* <input
                type="text"
                placeholder="Find our search"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              /> */}
              {/* <button className="absolute right-0 top-0 h-full px-4 bg-emerald-500 text-white rounded-r-lg hover:bg-emerald-600">
                <Search className="w-5 h-5" />
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center">
              {/* <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700"
              >
                <Menu className="w-5 h-5" />
                <span className="hidden lg:inline">TRENDING CATEGORY</span>
                <span className="lg:hidden">MENU</span>
                <ChevronDown className="w-4 h-4" />
              </button> */}
              <div className="flex gap-4 lg:gap-8 ml-4 lg:ml-8">
                <Link
                  to="/"
                  className="py-3 hover:text-emerald-100 text-sm lg:text-base"
                >
                  HOME
                </Link>
                <Link
                  to="/products"
                  className="py-3 hover:text-emerald-100 text-sm lg:text-base"
                >
                  PRODUCT
                </Link>
                <Link
                  to="/about"
                  className="py-3 hover:text-emerald-100 text-sm lg:text-base"
                >
                  ABOUT
                </Link>
                <Link
                  to="/contact"
                  className="py-3 hover:text-emerald-100 text-sm lg:text-base"
                >
                  CONTACT
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/wishlist"
                className="hidden lg:flex items-center gap-2 py-3 hover:text-emerald-100"
              >
                <Heart className="w-5 h-5" />
                <span>My wishlist</span>
                {getWishlistCount() > 0 && (
                  <span className="bg-white text-emerald-500 px-2 py-0.5 rounded text-sm font-semibold">
                    {getWishlistCount()}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-gray-800 rounded hover:bg-gray-900"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden lg:inline">My cart</span>
                <span className="bg-emerald-500 px-2 py-0.5 rounded text-sm">
                  {getCartCount()}
                </span>
              </Link>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <Link
                to="/"
                className="block py-2 hover:text-emerald-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                to="/products"
                className="block py-2 hover:text-emerald-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                PRODUCT
              </Link>
              <Link
                to="/about"
                className="block py-2 hover:text-emerald-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                className="block py-2 hover:text-emerald-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center gap-2 py-2 hover:text-emerald-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                <span>My wishlist ({getWishlistCount()})</span>
              </Link>
              <Link
                to="/cart"
                className="flex items-center gap-2 py-2 hover:text-emerald-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>My cart ({getCartCount()})</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
