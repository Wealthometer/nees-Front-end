'use client'

import { CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'

export default function OrderCompletePage() {
  const { getCartTotal, clearCart } = useCart()
  const [orderTotal] = useState(getCartTotal())
  const [orderNumber] = useState(Math.floor(Math.random() * 10000))
  const [orderDate] = useState(new Date().toLocaleString())

  // Clear cart when order is complete (optional - you might want to do this after payment confirmation)
  useEffect(() => {
    // Uncomment the line below if you want to clear cart on order complete page
    // clearCart()
  }, [])

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">Home / Order complete</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-gray-600 mb-1">Order no. {orderNumber}</p>
              <p className="text-gray-600 text-sm">{orderDate}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-gray-600 mb-1">Order total</p>
              <p className="text-2xl font-bold text-gray-900">
                ₦{orderTotal.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Thank you for order
            </h1>
            <p className="text-gray-600 mb-6">
              Your order will ship within few hours
            </p>
            <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 font-medium">
              TRACKING DETAILS
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Delivery address
              </h3>
              <div className="text-gray-700 space-y-1 text-sm">
                <p>Lorem ipsum</p>
                <p>7003 fairway street</p>
                <p>New york</p>
                <p>NY 10033</p>
                <p>USA</p>
                <p>Mobile No.: +11-123456789</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Payment summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Transaction No.:</span>
                  <span>{Math.floor(Math.random() * 1000000000)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Price</span>
                  <span>₦{orderTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping charge</span>
                  <span>₦0.00</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t">
                  <span>Order Total</span>
                  <span>₦{orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
