'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { getImageUrl } from '../services/api'

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart()
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

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* FORM SUBMISSION START */}
          <form
            action="https://formsubmit.co/alexandermfoniso18@gmail.com"
            method="POST"
            onSubmit={() => clearCart()}
            className="lg:col-span-2 bg-white rounded-lg p-4 md:p-6"
          >
            {/* FormSubmit hidden config */}
            <input type="hidden" name="_subject" value="New Checkout Order" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_next"
              value={`${window.location.origin}/order-complete`}
            />

            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">
              Billing details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                required
              />
            </div>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Company name (Optional)"
              className="w-full mt-3 md:mt-4 px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
            />

            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full mt-3 md:mt-4 px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
            >
              <option value="Nigeria">Nigeria</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Street address"
              className="w-full mt-3 md:mt-4 px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
              required
            />

            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleInputChange}
              placeholder="Apartment, suite, etc. (Optional)"
              className="w-full mt-3 md:mt-4 px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
            />

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="w-full mt-3 md:mt-4 px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
              required
            />

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
              className="w-full mt-3 md:mt-4 px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
              required
            />

            <input
              type="text"
              name="postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              placeholder="Postcode / Zip"
              className="w-full mt-3 md:mt-4 px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              className="w-full mt-3 md:mt-4 px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
              required
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone number"
              className="w-full mt-3 md:mt-4 px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
              required
            />

            {/* Payment Method */}
            <div className="mt-5 md:mt-6 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={formData.paymentMethod === 'bank'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-emerald-500"
                />
                <span className="text-sm md:text-base">Direct bank transfer</span>
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
                <span className="text-sm md:text-base">Paypal</span>
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
                <span className="text-sm md:text-base">Cash on hand</span>
              </label>
            </div>

            {/* Add hidden cart data */}
            <textarea
              name="cartDetails"
              readOnly
              value={JSON.stringify(cartItems, null, 2)}
              className="hidden"
            />

            <div className="mt-6 md:mt-8">
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white py-2.5 md:py-3 rounded-lg font-semibold hover:bg-emerald-600 text-sm md:text-base"
              >
                PLACE ORDER
              </button>
            </div>
          </form>
          {/* FORM END */}

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1 bg-white rounded-lg p-4 md:p-6 lg:sticky lg:top-4 h-fit">
            <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">
              In your cart ({cartItems.length})
            </h3>

            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 md:gap-4">
                  <img
                    src={getImageUrl(item.thumbnail) || '/placeholder.svg'}
                    alt={item.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain bg-gray-50 rounded-lg flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      ₦{item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 md:pt-4">
              <div className="flex justify-between font-semibold text-base md:text-lg">
                <span>Total</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
