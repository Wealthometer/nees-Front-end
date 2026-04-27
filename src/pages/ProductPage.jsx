'use client'

import { useState, useEffect } from 'react'
import { Grid, List, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { productsAPI } from '../services/api'

export default function ProductPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

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

  const categories = [...new Set(products.map((p) => p.category))].filter(Boolean)
  const brands = [...new Set(products.map((p) => p.brand))].filter(Boolean)
  const availabilities = [...new Set(products.map((p) => p.availability))].filter(Boolean)

  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedAvailabilities, setSelectedAvailabilities] = useState([])

  const filteredProducts = products.filter((product) => {
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1]
    const categoryMatch =
      !selectedCategory || product.category === selectedCategory
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand)
    const availabilityMatch =
      selectedAvailabilities.length === 0 || selectedAvailabilities.includes(product.availability)
    
    return priceMatch && categoryMatch && brandMatch && availabilityMatch
  })

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const toggleAvailability = (availability) => {
    setSelectedAvailabilities(prev => 
      prev.includes(availability) ? prev.filter(a => a !== availability) : [...prev, availability]
    )
  }

  const FilterSidebar = () => (
    <>
      {/* Categories */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="font-semibold text-gray-900">Categories</h3>
          {selectedCategory && (
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-emerald-500 text-xs hover:underline"
            >
              Reset
            </button>
          )}
        </div>
        <ul className="space-y-2">
          <li
            className={`flex items-center justify-between text-sm cursor-pointer ${
              !selectedCategory
                ? 'text-emerald-600 font-medium'
                : 'text-gray-700'
            }`}
            onClick={() => { setSelectedCategory(null); setMobileFiltersOpen(false) }}
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
                onClick={() => { setSelectedCategory(category); setMobileFiltersOpen(false) }}
              >
                <span>{category}</span>
                <span className="text-gray-400">({count})</span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Price Filter */}
      <div className="mb-6 md:mb-8">
        <h3 className="font-semibold text-gray-900 mb-3 md:mb-4">Price</h3>
        <p className="text-sm text-gray-600 mb-4">
          The highest price is ₦
          {Math.max(...products.map((p) => p.price), 0).toLocaleString()}
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
            className="w-full accent-emerald-500"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2 top-1.5 text-gray-400 text-sm">₦</span>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([
                  Number.parseInt(e.target.value) || 0,
                  priceRange[1]
                ])
              }
              className="w-full pl-6 pr-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Min"
            />
          </div>
          <span className="py-1 text-gray-400">-</span>
          <div className="relative flex-1">
            <span className="absolute left-2 top-1.5 text-gray-400 text-sm">₦</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Number.parseInt(e.target.value) || 0
                ])
              }
              className="w-full pl-6 pr-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Availability */}
      {availabilities.length > 0 && (
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="font-semibold text-gray-900">Availability</h3>
            {selectedAvailabilities.length > 0 && (
              <button 
                onClick={() => setSelectedAvailabilities([])}
                className="text-emerald-500 text-xs hover:underline"
              >
                Reset
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {availabilities.map((availability, i) => {
              const count = products.filter(p => p.availability === availability).length
              return (
                <li key={i} className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    id={`availability-${i}`}
                    checked={selectedAvailabilities.includes(availability)}
                    onChange={() => toggleAvailability(availability)}
                    className="w-4 h-4 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <label 
                    htmlFor={`availability-${i}`}
                    className="flex justify-between items-center w-full text-sm text-gray-700 cursor-pointer"
                  >
                    <span className="capitalize">{availability}</span>
                    <span className="text-gray-400">({count})</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Brand */}
      {brands.length > 0 && (
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="font-semibold text-gray-900">Brand</h3>
            {selectedBrands.length > 0 && (
              <button 
                onClick={() => setSelectedBrands([])}
                className="text-emerald-500 text-xs hover:underline"
              >
                Reset
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {brands.map((brand, i) => {
              const count = products.filter(p => p.brand === brand).length
              return (
                <li key={i} className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    id={`brand-${i}`}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <label 
                    htmlFor={`brand-${i}`}
                    className="flex justify-between items-center w-full text-sm text-gray-700 cursor-pointer"
                  >
                    <span>{brand}</span>
                    <span className="text-gray-400">({count})</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Featured Banner */}
      <div className="mt-6 md:mt-8 bg-gradient-to-br from-purple-500 to-yellow-400 rounded-lg p-6 text-white text-center">
        <img
          src="/productb.png"
          alt="Featured"
          className="mx-auto mb-4 max-w-full"
        />
        <h4 className="font-bold mb-2">NEW ARRIVAL</h4>
        <p className="text-sm mb-4">Breathe Easy. Stay Cool.</p>
      </div>
    </>
  )

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">Home / Collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-emerald-500 text-white px-4 py-2.5 rounded-lg font-medium"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>

          {/* Mobile Filter Overlay */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
              <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <FilterSidebar />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Banner */}
            <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-lg p-5 sm:p-6 md:p-8 mb-6 md:mb-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs sm:text-sm mb-2">NEW ARRIVAL</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                  Quiet Power.
                  <br />
                  Sleek Design.
                </h2>
                <button className="bg-white text-emerald-500 px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 text-sm sm:text-base">
                  Shop Now
                </button>
              </div>
              <img
                src="/solar-inverter.jpg"
                alt="Featured Product"
                className="absolute right-4 sm:right-8 bottom-0 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 object-contain hidden sm:block"
              />
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2">
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  <Grid className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  <List className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-gray-600">
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
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
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
