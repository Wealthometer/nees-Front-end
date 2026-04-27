'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { productsAPI } from '../services/api'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getAll()
        setProducts(data)
      } catch (error) {
        console.error('[v0] Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const trendingProducts = products.slice(0, 4)

  const categories = [...new Set(products.map((p) => p.category))]
    .slice(0, 5)
    .map((cat) => ({
      name: cat,
      image:
        products.find((p) => p.category === cat)?.thumbnail ||
        '/placeholder.svg'
    }))

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-400 to-emerald-500 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="text-white text-center lg:text-left">
              <p className="text-xs sm:text-sm mb-2 uppercase tracking-wide">
                Welcome to Nees Solar
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                SMART
                <br />
                ENERGY.
              </h1>
              <p className="text-base md:text-lg mb-6 md:mb-8 opacity-90">
                Harness the power of the sun with our premium solar solutions
              </p>
              <Link to="/products">
                <button className="bg-yellow-400 text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-sm sm:text-base">
                  SHOP NOW →
                </button>
              </Link>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <img
                src="/a high quality image 1.png"
                alt="Solar Panel"
                className="w-48 sm:w-64 md:w-80 lg:w-full max-w-md transform rotate-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <p className="text-emerald-500 text-sm font-medium mb-1">
              SHOP BY CATEGORY
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Popular category
            </h2>
          </div>
          <Link to="/products">
            <button className="bg-emerald-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-emerald-600 flex items-center gap-2 text-sm sm:text-base">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading categories...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/products"
                className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all text-center group"
              >
                <img
                  src={category.image || '/placeholder.svg'}
                  alt={category.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 object-contain group-hover:scale-110 transition-transform"
                />
                <h3 className="font-medium text-gray-900 text-sm md:text-base">{category.name}</h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden min-h-[200px]">
            <img
              src="/img 1.png"
              alt="Indoor AC Unit"
              className="absolute right-0 bottom-0 w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 object-contain"
            />
            <p className="text-sm mb-2 opacity-90">BEST DEALS</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Indoor
              <br />
              AC Unit
            </h3>
            <button className="bg-white text-pink-500 px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 text-sm sm:text-base">
              Shop now
            </button>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden min-h-[200px]">
            <img
              src="/img 2.png"
              alt="Solar Inverters"
              className="absolute right-0 bottom-0 w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 object-contain"
            />
            <p className="text-sm mb-2 opacity-90">BEST DEALS</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Solar
              <br />
              Inverters
            </h3>
            <button className="bg-white text-purple-500 px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 text-sm sm:text-base">
              Shop now
            </button>
          </div>
          <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden min-h-[200px] sm:col-span-2 md:col-span-1">
            <img
              src="/img 3.png"
              alt="Outdoor AC Unit"
              className="absolute right-0 bottom-0 w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 object-contain"
            />
            <p className="text-sm mb-2 opacity-90">BEST DEALS</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Outdoor
              <br />
              AC Unit
            </h3>
            <button className="bg-white text-red-500 px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 text-sm sm:text-base">
              Shop now
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              icon: <img src="/service-1.png" alt="" />,
              title: 'Nationwide shipping',
              desc: 'We ship all over Nigeria'
            },
            {
              icon: <img src="service-2.png" alt="" />,
              title: 'Secured payment',
              desc: 'Safe & secure checkout'
            },
            {
              icon: <img src="service-3.png" alt="" />,
              title: 'Quality Assurance',
              desc: 'We ensure every product meets the highest standards.'
            },
            {
              icon: <img src="service-4.png" alt="" />,
              title: 'Best gift voucher',
              desc: 'Best offers & promotions'
            }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-xl md:text-2xl">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-emerald-500 text-sm font-medium mb-2">
            Browse collection
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Trending product</h2>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
          </>
        )}
      </section>

      {/* Deal of the Day */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl p-6 sm:p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
            <img
              src="/img_3-removebg-preview.png"
              alt="Deal Product"
              className="mx-auto w-32 sm:w-40 md:w-auto hidden sm:block"
            />
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Deal of the days</h2>
              <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center flex-wrap">
                {[
                  { value: '3', label: 'DAYS' },
                  { value: '14', label: 'HOURS' },
                  { value: '25', label: 'MINS' },
                  { value: '04', label: 'SEC' }
                ].map((time, index) => (
                  <div
                    key={index}
                    className="bg-white text-gray-900 rounded-lg p-2 sm:p-3 md:p-4 min-w-[55px] sm:min-w-[65px] md:min-w-[80px]"
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold">{time.value}</div>
                    <div className="text-[10px] sm:text-xs text-gray-600">{time.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <img
              src="/img_4-removebg-preview.png"
              alt="Deal Product"
              className="mx-auto w-32 sm:w-40 md:w-auto hidden sm:block"
            />
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-emerald-500 text-sm font-medium mb-2">
            100% Customer review
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Our customer love
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {[1, 2].map((review) => (
            <div
              key={review}
              className="bg-white p-5 sm:p-6 md:p-8 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <img
                  src={`/test-2.png?height=60&width=60&query=customer-${review}`}
                  alt="Customer"
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full"
                />
                <div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-green-400 text-green-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">J.D Reviewer</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                If you haven't tried NEES solar, you're missing out. Their
                products are top-notch and the customer service is exceptional.
                I'm a customer for life!
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-2xl text-emerald-500">¨</span>
                <span className="font-semibold text-gray-900 text-sm md:text-base">Recommended</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-6 md:mt-8">
          <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Weekly Bestseller */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Weekly bestseller
          </h2>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
          </>
        )}
      </section>

      {/* Instagram Feed */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Follow on Instagram
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={`/instagram-items (${item}).png`}
                alt={`Instagram ${item}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-6 md:mt-8">
          <button className="bg-emerald-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-emerald-600 font-medium text-sm sm:text-base">
            FOLLOW US NOW
          </button>
        </div>
      </section>
    </div>
  )
}
