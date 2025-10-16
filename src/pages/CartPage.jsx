'use client'

import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Bluetooth earbuds',
      color: 'Black',
      price: 11.0,
      quantity: 1,
      image: '/placeholder.svg?height=100&width=100'
    },
    {
      id: 2,
      name: 'Portable speaker',
      color: 'White',
      price: 21.0,
      quantity: 1,
      image: '/placeholder.svg?height=100&width=100'
    },
    {
      id: 3,
      name: 'Verse earphones',
      color: 'Red',
      price: 24.0,
      quantity: 1,
      image: '/placeholder.svg?height=100&width=100'
    }
  ])

  const trendingProducts = [
    {
      id: 1,
      name: 'Outdoor Ac Unit',
      category: 'Outdoor',
      price: '₦32.00 - ₦38.00',
      rating: 5,
      image: '/outdoor-ac.jpg'
    },
    {
      id: 2,
      name: 'Solar Panel',
      category: 'Panel',
      price: '₦21.00 - ₦25.00',
      rating: 5,
      image: '/solar-panel.jpg'
    },
    {
      id: 3,
      name: 'Solar Inverter',
      category: 'Inverter',
      price: '₦15.00 - ₦16.00',
      rating: 5,
      image: '/solar-inverter.jpg'
    },
    {
      id: 4,
      name: 'Standing Fan',
      category: 'Fan',
      price: '₦12.00 - ₦24.00',
      rating: 5,
      image: '/standing-fan.jpg'
    }
  ]

  const updateQuantity = (id, delta) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">Home / Shopping cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                My cart:
              </h2>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-6 pb-6 border-b last:border-b-0"
                  >
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      className="w-24 h-24 object-contain bg-gray-50 rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Color: {item.color}
                      </p>
                      <p className="text-emerald-600 font-semibold">
                        ₦{item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-semibold text-gray-900 w-20 text-right">
                      ₦{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                to="/products"
                className="flex-1 bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 text-center"
              >
                CONTINUE SHOPPING
              </Link>
              <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300">
                CLEAR CART
              </button>
            </div>

            <div className="mt-6 bg-white rounded-lg p-6">
              <label className="block text-gray-900 font-semibold mb-2">
                Special instructions for seller
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows="4"
                placeholder="Add any special instructions..."
              ></textarea>
            </div>
          </div>

          {/* Shipping & Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Shipping info
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Country
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>India</option>
                    <option>Nigeria</option>
                    <option>USA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    State
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Gujarat</option>
                    <option>Lagos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Zip/Postal Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600">
                  CALCULATE
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Total</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping Charge</span>
                  <span className="text-emerald-600">Free shipping</span>
                </div>
                <div className="pt-3 border-t flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₦{subtotal.toFixed(2)}</span>
                </div>
              </div>
              <input
                type="text"
                placeholder="Discount code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Link
                to="/checkout"
                className="block w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 text-center"
              >
                CHECKOUT
              </Link>
              <div className="flex gap-2 mt-4 justify-center">
                <img
                  src="/visa-application-process.png"
                  alt="Visa"
                  className="h-6"
                />
                <img
                  src="/mastercard-logo-abstract.png"
                  alt="Mastercard"
                  className="h-6"
                />
                <img
                  src="/paypal-digital-payment.png"
                  alt="PayPal"
                  className="h-6"
                />
                <img src="/discovery-path.png" alt="Discover" className="h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Trending Products */}
        <section className="py-16">
          <div className="text-center mb-12">
            <p className="text-emerald-500 text-sm font-medium mb-2">
              Browse collection
            </p>
            <h2 className="text-4xl font-bold text-gray-900">
              Trending product
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 font-medium">
              VIEW ALL ITEM
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
