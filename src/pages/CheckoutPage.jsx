'use client'

import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { getImageUrl } from '../services/api'

export default function CheckoutPage() {
  const { cartItems, getCartTotal } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'Nigeria',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postcode: '',
    email: '',
    phone: '',
    paymentMethod: 'bank'
  })

  const subtotal = getCartTotal()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">Home / Checkout</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Billing Details */}
            <div className="bg-white rounded-lg p-4 md:p-6 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                Billing details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company name (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Select a country</option>
                  <option>Nigeria</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apartment, suite, unit etc. (Optional)
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Town / City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State / Country
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postcode / Zip
                </label>
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white rounded-lg p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                Shipping details
              </h2>
              <p className="text-gray-600">
                Same as billing address or add different shipping address
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 md:p-6 lg:sticky lg:top-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                In your cart ({cartItems.length})
              </h3>
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={getImageUrl(item.thumbnail) || '/placeholder.svg'}
                      alt={item.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain bg-gray-50 rounded-lg"
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        Product code: {item.id}
                      </p>
                      <p className="text-emerald-600 font-semibold text-sm mt-1">
                        {item.quantity} X ₦{Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-4">Your order</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Product:</span>
                    <span>Total</span>
                  </div>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-gray-700 text-sm"
                    >
                      <span className="truncate mr-2">{item.name}</span>
                      <span>₦{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-gray-700 pt-3 border-t">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping Charge</span>
                    <span className="text-emerald-600">Free shipping</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                    <span>Total</span>
                    <span>₦{subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-emerald-500"
                    />
                    <span className="text-gray-700">Direct bank transfer</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-emerald-500"
                    />
                    <span className="text-gray-700">Paypal</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-emerald-500"
                    />
                    <span className="text-gray-700">Cash on hand</span>
                  </label>
                </div>

                <div className="flex gap-2 mb-6 justify-center">
                  <img
                    src="/visa-application-process.png"
                    alt="Visa"
                    className="h-5 md:h-6"
                  />
                  <img
                    src="/mastercard-logo-abstract.png"
                    alt="Mastercard"
                    className="h-5 md:h-6"
                  />
                  <img
                    src="/paypal-digital-payment.png"
                    alt="PayPal"
                    className="h-5 md:h-6"
                  />
                  <img
                    src="/discovery-path.png"
                    alt="Discover"
                    className="h-5 md:h-6"
                  />
                </div>

                <Link
                  to="/order-complete"
                  className="block w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 text-center"
                >
                  PLACE ORDER
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
