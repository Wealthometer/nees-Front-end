import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { getImageUrl } from '../services/api'

export default function ProductCard({ product }) {
  const imageUrl = getImageUrl(
    product.thumbnail || (product.images && product.images[0])
  )

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
      <Link to={`/product/${product.id}`} className="block p-6">
        <div className="aspect-square mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
          />
        </div>
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-emerald-600 font-semibold mb-3">
          ₦{Number(product.price).toFixed(2)}
        </p>
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </Link>
      <div className="px-6 pb-6">
        <button className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 font-medium transition-colors">
          Add to cart
        </button>
      </div>
    </div>
  )
}
