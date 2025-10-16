'use client'

import { useState, useEffect } from 'react'
import { Grid, List } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { productsAPI } from '../services/api'

export default function ProductPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getAll()
        setProducts(data)

        // Calculate max price
        const maxPrice = Math.max(...data.map((p) => p.price), 1000)
        setPriceRange([0, maxPrice])
      } catch (error) {
        console.error('[v0] Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = [...new Set(products.map((p) => p.category))]

  const filteredProducts = products.filter((product) => {
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1]
    const categoryMatch =
      !selectedCategory || product.category === selectedCategory
    return priceMatch && categoryMatch
  })

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">Home / Collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li
                    className={`flex items-center justify-between text-sm cursor-pointer ${
                      !selectedCategory
                        ? 'text-emerald-600 font-medium'
                        : 'text-gray-700'
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    <span>All Products</span>
                    <span className="text-gray-400">({products.length})</span>
                  </li>
                  {categories.map((category, i) => {
                    const count = products.filter(
                      (p) => p.category === category
                    ).length
                    return (
                      <li
                        key={i}
                        className={`flex items-center justify-between text-sm cursor-pointer ${
                          selectedCategory === category
                            ? 'text-emerald-600 font-medium'
                            : 'text-gray-700'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        <span>{category}</span>
                        <span className="text-gray-400">({count})</span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Price</h3>
                <p className="text-sm text-gray-600 mb-4">
                  The highest price is ₦
                  {Math.max(...products.map((p) => p.price), 0).toFixed(2)}
                </p>
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max={Math.max(...products.map((p) => p.price), 1000)}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        Number.parseInt(e.target.value)
                      ])
                    }
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([
                        Number.parseInt(e.target.value),
                        priceRange[1]
                      ])
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    placeholder="₦"
                  />
                  <span className="py-2">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        Number.parseInt(e.target.value)
                      ])
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    placeholder="₦"
                  />
                </div>
              </div>

              {/* More Filters */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  More filters
                </h3>
                <ul className="space-y-2">
                  {[
                    '0 selected',
                    'Air conditioner',
                    'Inverters',
                    'Panels',
                    'Fans',
                    'Standing Unit',
                    'LED',
                    'Stripe',
                    'Collection light'
                  ].map((filter, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-700">{filter}</span>
                      {i > 0 && <span className="text-gray-400">(12)</span>}
                      {i === 0 && (
                        <button className="text-emerald-500 text-xs">
                          Reset
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Type */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Product type
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">0 selected</span>
                    <button className="text-emerald-500 text-xs">Reset</button>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Electron</span>
                    <span className="text-gray-400">(23)</span>
                  </li>
                </ul>
              </div>

              {/* Availability */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Availability
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-emerald-600 font-medium">
                      In stock
                    </span>
                    <span className="text-gray-400">({products.length})</span>
                  </li>
                </ul>
              </div>

              {/* Brand */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Brand</h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">0 selected</span>
                    <button className="text-emerald-500 text-xs">Reset</button>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Electron</span>
                    <span className="text-gray-400">(23)</span>
                  </li>
                </ul>
              </div>

              {/* Featured Banner */}
              <div className="mt-8 bg-gradient-to-br from-purple-500 to-yellow-400 rounded-lg p-6 text-white text-center">
                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt="Featured"
                  className="mx-auto mb-4"
                />
                <h4 className="font-bold mb-2">NEW ARRIVAL</h4>
                <p className="text-sm mb-4">Breathe Easy. Stay Cool.</p>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Banner */}
            <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-lg p-8 mb-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-sm mb-2">NEW ARRIVAL</p>
                <h2 className="text-4xl font-bold mb-4">
                  Quiet Power.
                  <br />
                  Sleek Design.
                </h2>
                <button className="bg-white text-emerald-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
                  Shop Now
                </button>
              </div>
              <img
                src="/solar-inverter.jpg"
                alt="Featured Product"
                className="absolute right-8 bottom-0 w-48 h-48 object-contain"
              />
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  <Grid className="w-5 h-5" />
                </button>
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  <List className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} products
                </span>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600">
                  No products found matching your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
