'use client'

import { Link } from 'react-router-dom'
import { Trash2, ShoppingCart, Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { getImageUrl } from '../services/api'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product, 1)
  }

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, 1)
    })
    clearWishlist()
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="text-center">
          <Heart className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
            Save your favorite items to your wishlist
          </p>
          <Link
            to="/products"
            className="inline-block bg-emerald-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-emerald-600 transition-colors text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          My Wishlist ({wishlist.length})
        </h1>
        <div className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleMoveAllToCart}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 bg-emerald-500 text-white px-3 sm:px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-xs sm:text-sm md:text-base"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">Move All to Cart</span>
          </button>
          <button
            onClick={clearWishlist}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 bg-red-500 text-white px-3 sm:px-6 py-2 rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm md:text-base"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">Clear Wishlist</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link to={`/product/${product.id}`} className="block">
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={getImageUrl(product.thumbnail) || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder.svg?height=300&width=300'
                  }}
                />
                {product.availability === 'in stock' && (
                  <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                    In Stock
                  </span>
                )}
              </div>
            </Link>

            <div className="p-3 sm:p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 hover:text-emerald-500 line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-600 text-xs sm:text-sm mb-1.5 sm:mb-2 line-clamp-2 hidden sm:block">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="text-emerald-500 font-bold text-sm sm:text-base md:text-xl">
                  ₦{product.price?.toLocaleString()}
                </span>
                {product.category && (
                  <span className="text-[10px] sm:text-xs bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-gray-600 hidden sm:inline">
                    {product.category}
                  </span>
                )}
              </div>

              <div className="flex gap-1.5 sm:gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-emerald-500 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-emerald-600 transition-colors text-xs sm:text-sm"
                >
                  <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Add</span>
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="bg-red-500 text-white p-1.5 sm:p-2 rounded-lg hover:bg-red-600 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
