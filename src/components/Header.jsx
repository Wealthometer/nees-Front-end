import { Link } from 'react-router-dom'
import { Search, Heart, ShoppingCart, ChevronDown, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      {/* Top bar */}
      <div className="bg-gray-100 py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-gray-600">
            Email: support@neessolarpanelget.com
          </div>
          <div className="flex items-center gap-6">
            <span className="text-gray-600">
              Free nationwide & Free return for above N0N10,000{' '}
              <Link to="/products" className="text-emerald-500 font-medium">
                Shop now!
              </Link>
            </span>
            <div className="flex gap-4 text-gray-600">
              <span>90K Followers</span>
              <span>60K Followers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="/Nee Solar Logo 1.png"
                alt="NEESSOLAR"
                className="h-12"
              />
            </Link>

            {/* Search bar */}
            <div className="flex-grow max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find our search"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-emerald-500 text-white rounded-r-lg hover:bg-emerald-600">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contact & Cart */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-xs text-gray-600">Hotline number</div>
                <div className="font-semibold">+234 0500 2400</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700"
              >
                <Menu className="w-5 h-5" />
                <span>TRENDING CATEGORY</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="flex gap-8 ml-8">
                <Link to="/" className="py-3 hover:text-emerald-100">
                  HOME
                </Link>
                <Link to="/products" className="py-3 hover:text-emerald-100">
                  PRODUCT
                </Link>
                <Link to="/about" className="py-3 hover:text-emerald-100">
                  ABOUT
                </Link>
                <Link to="/contact" className="py-3 hover:text-emerald-100">
                  CONTACT US
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 py-3 hover:text-emerald-100">
                <Heart className="w-5 h-5" />
                <span>My wishlist</span>
              </button>
              <Link
                to="/cart"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded hover:bg-gray-900"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>My cart</span>
                <span className="bg-emerald-500 px-2 py-0.5 rounded text-sm">
                  04
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
