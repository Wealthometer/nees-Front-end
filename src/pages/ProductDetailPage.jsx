'use client'

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Star,
  Minus,
  Plus,
  Heart,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { productsAPI, getImageUrl } from '../services/api'
import { useCart } from '../context/CartContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productsAPI.getById(id)
        setProduct(productData)

        const allProducts = await productsAPI.getAll()
        const related = allProducts
          .filter(
            (p) =>
              p.id !== productData.id && p.category === productData.category
          )
          .slice(0, 4)
        setRelatedProducts(related)
      } catch (error) {
        console.error('[v0] Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <Link to="/products">
            <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const productImages =
    product.images && product.images.length > 0
      ? product.images.map((img) => getImageUrl(img))
      : [getImageUrl(product.thumbnail)]

  const handleBuyNowAndWhatsApp = () => {
    // Add the product to the cart
    addToCart(product, quantity)

    const whatsappNumber = '2349113562352' // International format for Nigeria
    const currentProductImageUrl =
      productImages[selectedImage] || '/placeholder.svg'

    // Construct the message for WhatsApp
    const message =
      `Hello, I'm interested in purchasing the following product:\n\n` +
      `Product Name: ${product.name}\n` +
      `Quantity: ${quantity}\n` +
      `Price per item: ₦${Number(product.price).toFixed(2)}\n` +
      `Total Price: ₦${(Number(product.price) * quantity).toFixed(2)}\n\n` +
      `Product Image: ${currentProductImageUrl}\n` +
      `Product Page: ${window.location.href}`

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`
    window.open(whatsappUrl, '_blank') // Open WhatsApp in a new tab

    navigate('/cart')
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs sm:text-sm truncate">
            Home / {product.category} / {product.name}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-10 md:mb-16">
          <div>
            <div className="bg-white rounded-lg p-4 md:p-8 mb-3 md:mb-4">
              <img
                src={productImages[selectedImage] || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-48 sm:h-64 md:h-96 object-contain"
              />
            </div>
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-white rounded-lg p-1.5 sm:p-2 md:p-4 border-2 ${
                      selectedImage === index
                        ? 'border-emerald-500'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img || '/placeholder.svg'}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-12 sm:h-16 md:h-20 object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="flex gap-0.5 sm:gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-600 text-xs sm:text-sm">
                (5 Reviews)
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                ₦{Number(product.price).toFixed(2)}
              </span>
            </div>

            <div className="mb-4 md:mb-6">
              <p className="text-gray-700 mb-1.5 md:mb-2 text-sm md:text-base">
                <span className="font-semibold">Availability:</span>{' '}
                <span className="text-emerald-600 capitalize">
                  {product.availability}
                </span>
              </p>
              <p className="text-gray-700 mb-1.5 md:mb-2 text-sm md:text-base">
                <span className="font-semibold">Category:</span>{' '}
                <span className="text-gray-600">{product.category}</span>
              </p>
            </div>

            {product.description && (
              <div className="mb-4 md:mb-6">
                <p className="font-semibold text-gray-900 mb-1.5 md:mb-2 text-sm md:text-base">
                  Description:
                </p>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {product.description.replace(/<[^>]+>/g, '')}
                </p>
              </div>
            )}

            <div className="mb-4 md:mb-6">
              <p className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">
                Quantity:
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 md:w-12 text-center font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-emerald-500 text-white py-2.5 md:py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors text-sm md:text-base"
              >
                ADD TO CART
              </button>
              <button
                onClick={handleBuyNowAndWhatsApp}
                className="flex-1 bg-purple-600 text-white py-2.5 md:py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm md:text-base"
              >
                BUY NOW
              </button>
            </div>

            <button className="w-full border border-gray-300 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors text-sm md:text-base">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              WISHLIST
            </button>

            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t">
              <div className="flex gap-4 sm:gap-6 mb-4 md:mb-6">
                <button className="text-gray-700 font-medium border-b-2 border-emerald-500 pb-2 text-xs sm:text-sm md:text-base">
                  Delivery & return
                </button>
                <button className="text-gray-500 font-medium pb-2 text-xs sm:text-sm md:text-base">
                  Ask a question
                </button>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">
                🚚 Item will be delivered on or before Mar 3 2025.
              </p>
            </div>

            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t">
              <p className="text-gray-700 mb-2 text-sm md:text-base">
                <span className="font-semibold">SKU:</span> {product.id}
              </p>
              <div className="flex items-center gap-3 md:gap-4">
                <span className="font-semibold text-gray-900 text-sm md:text-base">
                  Share:
                </span>
                <div className="flex gap-3">
                  <button className="text-gray-600 hover:text-emerald-500">
                    <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-emerald-500">
                    <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-emerald-500">
                    <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-6 flex gap-2">
              <img
                src="/visa-application-process.png"
                alt="Visa"
                className="h-5 md:h-6"
              />
              <img
                src="/discovery-path.png"
                alt="Discover"
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
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="py-10 md:py-16">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-emerald-500 text-sm font-medium mb-2">
                Browse collection
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Related products
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
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
        )}
      </div>
    </div>
  )
}
