import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      {/* Brand logos */}
      <div className="bg-emerald-500 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around text-white text-2xl font-bold opacity-80">
            <span>Samsung</span>
            <span>SONY</span>
            <span>LG</span>
            <span>SONY</span>
            <span>Panasonic</span>
            <span>Toshiba</span>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <img
              src="/placeholder.svg?key=efx3h"
              alt="NEESSOLAR"
              className="h-16 mb-4"
            />
            <p className="text-gray-600 text-sm leading-relaxed">
              There are many variations of passages of lorem ipsum available,
              but the majority...
            </p>
          </div>

          {/* Help with */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Help with</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link to="/contact" className="hover:text-emerald-500">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-500">
                  Terms & conditions
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-500">
                  Track your order
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-500">
                  Our guarantee
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-500">
                  Guide des tailles
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Information</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link to="/about" className="hover:text-emerald-500">
                  About story
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-500">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-500">
                  Return policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-500">
                  Payment policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-500">
                  We our brand
                </Link>
              </li>
            </ul>
          </div>

          {/* Top category */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Top category</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link to="/products" className="hover:text-emerald-500">
                  Solar Panel
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-emerald-500">
                  Solar Inverter Battries
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-emerald-500">
                  Indoor AC Unit
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-emerald-500">
                  Outdoor AC Unit
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-emerald-500">
                  Fan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact info</h3>
            <div className="space-y-3 text-gray-600 text-sm">
              <p>Phone: +234 806 897 6393</p>
              <p>Email: neesolar@gmail.com</p>
              <p className="leading-relaxed">
                No 2 tomez avenue off ago palace road, Amuwo odofin laleo known
                as No 1 okusun road off ago palace road, Amuwo odofin Lagos
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/placeholder.svg?key=29e82"
                alt="Visa"
                className="h-6"
              />
              <img
                src="/placeholder.svg?key=cqgny"
                alt="Mastercard"
                className="h-6"
              />
              <img
                src="/placeholder.svg?key=ik33y"
                alt="PayPal"
                className="h-6"
              />
              <img
                src="/placeholder.svg?key=d3xqc"
                alt="Discover"
                className="h-6"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-900">
                Subscribe newsletter
              </span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="px-6 py-2 bg-emerald-500 text-white rounded-r-lg hover:bg-emerald-600 font-medium">
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-gray-600 text-sm">
          © 2025 Copyright Nees Solar Panel
        </div>
      </div>
    </footer>
  )
}
