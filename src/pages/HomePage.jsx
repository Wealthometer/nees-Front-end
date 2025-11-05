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
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <p className="text-sm mb-2 uppercase tracking-wide">
                Welcome to Nees Solar
              </p>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                SMART
                <br />
                ENERGY.
              </h1>
              <p className="text-lg mb-8 opacity-90">
                Harness the power of the sun with our premium solar solutions
              </p>
              <Link to="/products">
                <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                  SHOP NOW →
                </button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="/a high quality image 1.png"
                alt="Solar Panel"
                className="w-full max-w-md ml-auto transform rotate-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-emerald-500 text-sm font-medium mb-1">
              SHOP BY CATEGORY
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Popular category
            </h2>
          </div>
          <Link to="/products">
            <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading categories...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/products"
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all text-center group"
              >
                <img
                  src={category.image || '/placeholder.svg'}
                  alt={category.name}
                  className="w-20 h-20 mx-auto mb-4 object-contain group-hover:scale-110 transition-transform"
                />
                <h3 className="font-medium text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden">
            <img
              src="/img 1.png"
              alt="Indoor AC Unit"
              className="absolute right-0 bottom-0 w-48 h-48 object-contain"
            />
            <p className="text-sm mb-2 opacity-90">BEST DEALS</p>
            <h3 className="text-3xl font-bold mb-4">
              Indoor
              <br />
              AC Unit
            </h3>
            <button className="bg-white text-pink-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Shop now
            </button>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <img
              src="/img 2.png"
              alt="Solar Inverters"
              className="absolute right-0 bottom-0 w-48 h-48 object-contain"
            />
            <p className="text-sm mb-2 opacity-90">BEST DEALS</p>
            <h3 className="text-3xl font-bold mb-4">
              Solar
              <br />
              Inverters
            </h3>
            <button className="bg-white text-purple-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Shop now
            </button>
          </div>
          <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-2xl p-8 text-white relative overflow-hidden">
            <img
              src="/img 3.png"
              alt="Outdoor AC Unit"
              className="absolute right-0 bottom-0 w-48 h-48 object-contain"
            />
            <p className="text-sm mb-2 opacity-90">BEST DEALS</p>
            <h3 className="text-3xl font-bold mb-4">
              Outdoor
              <br />
              AC Unit
            </h3>
            <button className="bg-white text-red-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Shop now
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-emerald-500 text-sm font-medium mb-2">
            Browse collection
          </p>
          <h2 className="text-4xl font-bold text-gray-900">Trending product</h2>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/products">
                <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 font-medium">
                  VIEW ALL ITEM
                </button>
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Deal of the Day */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <img
              src="/img_3-removebg-preview.png"
              alt="Deal Product"
              className="mx-auto"
            />
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Deal of the days</h2>
              <div className="flex gap-4 justify-center">
                {[
                  { value: '3', label: 'DAYS' },
                  { value: '14', label: 'HOURS' },
                  { value: '25', label: 'MINS' },
                  { value: '04', label: 'SEC' }
                ].map((time, index) => (
                  <div
                    key={index}
                    className="bg-white text-gray-900 rounded-lg p-4 min-w-[80px]"
                  >
                    <div className="text-3xl font-bold">{time.value}</div>
                    <div className="text-xs text-gray-600">{time.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <img
              src="/img_4-removebg-preview.png"
              alt="Deal Product"
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-emerald-500 text-sm font-medium mb-2">
            100% Customer review
          </p>
          <h2 className="text-4xl font-bold text-gray-900">
            Our customer love
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((review) => (
            <div
              key={review}
              className="bg-white p-8 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`/test-2.png?height=60&width=60&query=customer-${review}`}
                  alt="Customer"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-green-400 text-green-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">J.D Reviewer</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                If you haven‘t tried NEES solar, you‘re missing out. Their
                products are top-notch and the customer service is exceptional.
                I‘m a customer for life!
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-2xl text-emerald-500">¨</span>
                <span className="font-semibold text-gray-900">Recommended</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Weekly Bestseller */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Weekly bestseller
          </h2>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/products">
                <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 font-medium">
                  VIEW ALL ITEM
                </button>
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Instagram Feed */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Follow on Instagram
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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
        <div className="text-center mt-8">
          <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 font-medium">
            FOLLOW US NOW
          </button>
        </div>
      </section>
    </div>
  )
}
