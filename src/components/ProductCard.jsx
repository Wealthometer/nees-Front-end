'use client'

import { Link } from 'react-router-dom'
import { Star, Heart } from 'lucide-react'
import { getImageUrl } from '../services/api'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const imageUrl = getImageUrl(
    product.thumbnail || (product.images && product.images[0])
  )
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const inWishlist = isInWishlist(product.id)

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group relative">
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:bg-gray-50 transition-colors"
        title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={`w-4 h-4 sm:w-5 sm:h-5 ${
            inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
          }`}
        />
      </button>

      <Link to={`/product/${product.id}`} className="block p-3 sm:p-4 md:p-6">
        <div className="aspect-square mb-3 md:mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
          />
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2 text-xs sm:text-sm md:text-base">
          {product.name}
        </h3>
        <p className="text-emerald-600 font-semibold mb-2 sm:mb-3 text-sm md:text-base">
          ₦{Number(product.price).toFixed(2)}
        </p>
        <div className="flex items-center gap-0.5 sm:gap-1 mb-3 md:mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </Link>
      <div className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
        <button
          onClick={handleAddToCart}
          className="w-full bg-emerald-500 text-white py-1.5 sm:py-2 rounded-lg hover:bg-emerald-600 font-medium transition-colors text-xs sm:text-sm md:text-base"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
