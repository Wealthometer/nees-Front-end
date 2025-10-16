import { Link } from 'react-router-dom'

export default function CheckoutPage() {
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
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Billing details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>
                  <input
                    type="text"
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
                  placeholder="Company name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Town / City
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State / Country
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postcode / Zip
                </label>
                <input
                  type="text"
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
                    placeholder="Phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Shipping details
              </h2>
              <p className="text-gray-600">
                Same as billing address or add different shipping address
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                In your cart (2)
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <img
                    src="/placeholder.svg?height=80&width=80"
                    alt="Product"
                    className="w-20 h-20 object-contain bg-gray-50 rounded-lg"
                  />
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900 text-sm">
                      Solar Street Light
                    </h4>
                    <p className="text-xs text-gray-600">
                      Product code: CA700315418
                    </p>
                    <p className="text-emerald-600 font-semibold text-sm mt-1">
                      2 X ₦11.00
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <img
                    src="/placeholder.svg?height=80&width=80"
                    alt="Product"
                    className="w-20 h-20 object-contain bg-gray-50 rounded-lg"
                  />
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900 text-sm">
                      Solar Street Light
                    </h4>
                    <p className="text-xs text-gray-600">
                      Product code: CA700315418
                    </p>
                    <p className="text-emerald-600 font-semibold text-sm mt-1">
                      2 X ₦11.00
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-4">Your order</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Product:</span>
                    <span>Total</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Candy nut chocolate</span>
                    <span>₦84.00</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>A bakery doughnutes</span>
                    <span>₦84.00</span>
                  </div>
                  <div className="flex justify-between text-gray-700 pt-3 border-t">
                    <span>Subtotal</span>
                    <span>₦128.00</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping Charge</span>
                    <span className="text-emerald-600">Free shipping</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                    <span>Total</span>
                    <span>₦128.00</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="w-4 h-4 text-emerald-500"
                      defaultChecked
                    />
                    <span className="text-gray-700">Direct bank transfer</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="w-4 h-4 text-emerald-500"
                    />
                    <span className="text-gray-700">Paypal</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="w-4 h-4 text-emerald-500"
                    />
                    <span className="text-gray-700">Cash on hand</span>
                  </label>
                </div>

                <div className="flex gap-2 mb-6">
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
                  <img
                    src="/discovery-path.png"
                    alt="Discover"
                    className="h-6"
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
