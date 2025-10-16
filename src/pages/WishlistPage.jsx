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
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <Heart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">
            Save your favorite items to your wishlist
          </p>
          <Link
            to="/products"
            className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          My Wishlist ({wishlist.length})
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={handleMoveAllToCart}
            className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Move All to Cart
          </button>
          <button
            onClick={clearWishlist}
            className="flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            Clear Wishlist
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                    In Stock
                  </span>
                )}
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-lg mb-2 hover:text-emerald-500 line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-emerald-500 font-bold text-xl">
                  ₦{product.price?.toLocaleString()}
                </span>
                {product.category && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                    {product.category}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
