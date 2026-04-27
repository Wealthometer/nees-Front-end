'use client'

import { Minus, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { productsAPI, getImageUrl } from '../services/api'

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } =
    useCart()
  const [trendingProducts, setTrendingProducts] = useState([])
  const [specialInstructions, setSpecialInstructions] = useState('')

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const products = await productsAPI.getAll()
        setTrendingProducts(products.slice(0, 4))
      } catch (error) {
        console.error('[v0] Error fetching trending products:', error)
      }
    }
    fetchTrendingProducts()
  }, [])

  const handleUpdateQuantity = (id, delta) => {
    const item = cartItems.find((item) => item.id === id)
    if (item) {
      updateQuantity(id, item.quantity + delta)
    }
  }

  const subtotal = getCartTotal()

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">Home / Shopping cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12">
        {cartItems.length === 0 ? (
          <div className="text-center py-10 md:py-16">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
              Add some products to get started!
            </p>
            <Link
              to="/products"
              className="inline-block bg-emerald-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-emerald-600 text-sm sm:text-base"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-4 md:p-6 mb-4 md:mb-6">
                  <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                    My cart:
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pb-4 md:pb-6 border-b last:border-b-0"
                      >
                        <img
                          src={
                            getImageUrl(item.thumbnail) || '/placeholder.svg'
                          }
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain bg-gray-50 rounded-lg flex-shrink-0"
                        />
                        <div className="flex-grow min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm md:text-base truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                            Category: {item.category}
                          </p>
                          <p className="text-emerald-600 font-semibold text-sm md:text-base">
                            ₦{Number(item.price).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="w-6 sm:w-8 text-center font-semibold text-sm md:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 sm:flex-col sm:items-end">
                          <p className="font-semibold text-gray-900 text-sm md:text-base">
                            ₦{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 text-xs sm:text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Link
                    to="/products"
                    className="flex-1 bg-emerald-500 text-white py-2.5 md:py-3 rounded-lg font-semibold hover:bg-emerald-600 text-center text-sm md:text-base"
                  >
                    CONTINUE SHOPPING
                  </Link>
                  <button
                    onClick={clearCart}
                    className="flex-1 bg-gray-200 text-gray-700 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-300 text-sm md:text-base"
                  >
                    CLEAR CART
                  </button>
                </div>

                <div className="mt-4 md:mt-6 bg-white rounded-lg p-4 md:p-6">
                  <label className="block text-gray-900 font-semibold mb-2 text-sm md:text-base">
                    Special instructions for seller
                  </label>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                    rows="3"
                    placeholder="Add any special instructions..."
                  ></textarea>
                </div>
              </div>

              {/* Shipping & Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-4 md:p-6 mb-4 md:mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">
                    Shipping info
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 md:mb-2">
                        Country
                      </label>
                      <select className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                        <option>Nigeria</option>
                        <option>USA</option>
                        <option>UK</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 md:mb-2">
                        State
                      </label>
                      <select className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                        <option>Lagos</option>
                        <option>Abuja</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 md:mb-2">
                        Zip/Postal Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                      />
                    </div>
                    <button className="w-full bg-emerald-500 text-white py-2.5 md:py-3 rounded-lg font-semibold hover:bg-emerald-600 text-sm md:text-base">
                      CALCULATE
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 md:p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Total</h3>
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <div className="flex justify-between text-gray-700 text-sm md:text-base">
                      <span>Subtotal</span>
                      <span>₦{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 text-sm md:text-base">
                      <span>Shipping Charge</span>
                      <span className="text-emerald-600">Free shipping</span>
                    </div>
                    <div className="pt-2 md:pt-3 border-t flex justify-between font-semibold text-base md:text-lg">
                      <span>Total</span>
                      <span>₦{subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Discount code"
                    className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg mb-3 md:mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                  <Link
                    to="/checkout"
                    className="block w-full bg-emerald-500 text-white py-2.5 md:py-3 rounded-lg font-semibold hover:bg-emerald-600 text-center text-sm md:text-base"
                  >
                    CHECKOUT
                  </Link>
                  <div className="flex gap-2 mt-3 md:mt-4 justify-center">
                    <img
                      src="/visa-application-process.png"
                      alt="Visa"
                      className="h-4 sm:h-5 md:h-6"
                    />
                    <img
                      src="/mastercard-logo-abstract.png"
                      alt="Mastercard"
                      className="h-4 sm:h-5 md:h-6"
                    />
                    <img
                      src="/paypal-digital-payment.png"
                      alt="PayPal"
                      className="h-4 sm:h-5 md:h-6"
                    />
                    <img
                      src="/discovery-path.png"
                      alt="Discover"
                      className="h-4 sm:h-5 md:h-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Products */}
            <section className="py-10 md:py-16">
              <div className="text-center mb-8 md:mb-12">
                <p className="text-emerald-500 text-sm font-medium mb-2">
                  Browse collection
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  Trending product
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {trendingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center mt-8 md:mt-12">
                <Link to="/products">
                  <button className="bg-emerald-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-emerald-600 font-medium text-sm sm:text-base">
                    VIEW ALL ITEM
                  </button>
                </Link>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
