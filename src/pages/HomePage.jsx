'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle
} from 'lucide-react'
import ProductCard from '../components/ProductCard'
import {
  heroSlidesAPI,
  productsAPI,
  reviewsAPI,
  reviewsStreamUrl
} from '../services/api'

const defaultReviews = [
  {
    id: 'default-1',
    name: 'Chinelo Okafor',
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150&h=150',
    text: 'NEES made our switch to solar seamless. Their team was professional from consultation to installation, and the system has been performing reliably every day.',
    rating: 5
  },
  {
    id: 'default-2',
    name: 'Tunde Adebayo',
    image:
      'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=150&h=150',
    text: 'Excellent products and outstanding after-sales support. NEES delivered exactly what was promised, and our energy costs have reduced significantly.',
    rating: 5
  }
]

const normalizeReview = (review) => ({
  ...review,
  id: review.id ?? String(review._id ?? review.name),
  text: review.comment ?? review.text ?? '',
  image: review.avatarUrl || review.image || '',
  rating: Number(review.rating) || 5
})

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

const getHeroImageUrl = (imagePath) => {
  if (!imagePath) return '/done.png'
  if (imagePath.startsWith('http')) return imagePath
  if (imagePath.startsWith('/')) return imagePath
  return '/done.png'
}

const getHeroBackgroundUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  if (imagePath.startsWith('/')) return imagePath
  return ''
}

const defaultHeroSlides = [
  { id: 'default-1', backgroundImage: '/done.png', backgroundOnly: true },
  { id: 'default-2', backgroundImage: '/inverter.png', backgroundOnly: true },
  {
    id: 'default-3',
    backgroundImage: '/Productb.png',
    backgroundOnly: true
  }
]

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState(defaultReviews)
  const [activeReviewIndex, setActiveReviewIndex] = useState(0)
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)
  const [heroSlides, setHeroSlides] = useState(defaultHeroSlides)

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

  useEffect(() => {
    let isMounted = true

    const fetchHeroSlides = async () => {
      try {
        const data = await heroSlidesAPI.getAll()
        if (isMounted && data?.length) {
          const normalizedSlides = data.map((slide) => ({
            id: slide.id,
            eyebrow: slide.eyebrow || '',
            title: slide.title || '',
            description: slide.description || '',
            buttonText: slide.buttonText || '',
            buttonLink: slide.buttonLink || '/products',
            image: slide.image || '',
            backgroundImage: slide.backgroundImage || slide.image || '',
            backgroundOnly: Boolean(slide.backgroundOnly)
          }))
          setHeroSlides(normalizedSlides)
          setActiveHeroIndex(0)
        }
      } catch (error) {
        console.error('[v0] Error fetching hero slides:', error)
      }
    }

    fetchHeroSlides()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const fetchReviews = async () => {
      try {
        const data = await reviewsAPI.getAll()
        if (isMounted && data?.length) {
          setReviews(data.map(normalizeReview))
        }
      } catch (error) {
        console.error('[v0] Error fetching reviews:', error)
      }
    }

    fetchReviews()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const stream = new EventSource(reviewsStreamUrl)

    const handleReviewCreated = (event) => {
      const incomingReview = normalizeReview(JSON.parse(event.data))

      setReviews((currentReviews) => {
        if (currentReviews.some((review) => review.id === incomingReview.id)) {
          return currentReviews
        }

        return [incomingReview, ...currentReviews]
      })

      setActiveReviewIndex(0)
    }

    stream.addEventListener('review-created', handleReviewCreated)

    return () => {
      stream.removeEventListener('review-created', handleReviewCreated)
      stream.close()
    }
  }, [])

  useEffect(() => {
    if (reviews.length < 2) return undefined

    const intervalId = window.setInterval(() => {
      setActiveReviewIndex(
        (currentIndex) => (currentIndex + 1) % reviews.length
      )
    }, 5000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [reviews.length])

  useEffect(() => {
    if (heroSlides.length < 2) return undefined

    const intervalId = window.setInterval(() => {
      setActiveHeroIndex(
        (currentIndex) => (currentIndex + 1) % heroSlides.length
      )
    }, 5000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [heroSlides.length])

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
      <section
        className="relative overflow-hidden min-h-[55svh] md:min-h-[520px] bg-black"
        data-reveal
      >
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeHeroIndex * 100}%)` }}
        >
          {heroSlides.map((slide) => (
            <div
              key={slide.id || slide.backgroundImage}
              className="relative min-w-full h-[55svh] md:h-[520px]"
            >
              <Link
                to="/products"
                className="absolute inset-0 z-10"
                aria-label="Shop products"
              />
              {slide.backgroundOnly ? (
                <div
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat md:bg-cover"
                  style={{
                    backgroundImage: slide.backgroundImage
                      ? `url(${getHeroBackgroundUrl(slide.backgroundImage)})`
                      : 'linear-gradient(90deg, #34d399, #10b981)'
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: slide.backgroundImage
                      ? `url(${getHeroBackgroundUrl(slide.backgroundImage)})`
                      : 'linear-gradient(90deg, #34d399, #10b981)'
                  }}
                >
                  <div className="absolute inset-0 bg-black/45" />
                  <div className="relative z-20 h-full w-full px-4 sm:px-6 md:px-10">
                    {' '}
                    <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
                      <div className="text-white text-center lg:text-left">
                        {slide.eyebrow ? (
                          <p className="text-xs sm:text-sm mb-2 uppercase tracking-wide">
                            {slide.eyebrow}
                          </p>
                        ) : null}
                        {slide.title ? (
                          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                            {slide.title}
                          </h1>
                        ) : null}
                        {slide.description ? (
                          <p className="text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0">
                            {slide.description}
                          </p>
                        ) : null}
                        {slide.buttonText ? (
                          <Link to={slide.buttonLink || '/products'}>
                            <button className="bg-yellow-400 text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-sm sm:text-base">
                              {slide.buttonText}
                            </button>
                          </Link>
                        ) : null}
                      </div>
                      <div className="relative flex items-center justify-center lg:justify-end w-full h-full">
                        <img
                          src={getHeroImageUrl(
                            slide.image || slide.backgroundImage
                          )}
                          alt={slide.title || 'Hero slide'}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-4 md:px-6 pointer-events-none">
          <button
            type="button"
            onClick={() =>
              setActiveHeroIndex(
                (currentIndex) =>
                  (currentIndex - 1 + heroSlides.length) % heroSlides.length
              )
            }
            className="pointer-events-auto hidden sm:flex w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-white text-emerald-700 hover:bg-gray-100 transition-colors"
            aria-label="Previous hero slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveHeroIndex(
                (currentIndex) => (currentIndex + 1) % heroSlides.length
              )
            }
            className="pointer-events-auto hidden sm:flex w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-white text-emerald-700 hover:bg-gray-100 transition-colors ml-auto"
            aria-label="Next hero slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-4 sm:bottom-5 left-0 right-0 flex items-center justify-center gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id || slide.backgroundImage || index}
              type="button"
              onClick={() => setActiveHeroIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeHeroIndex ? 'w-8 bg-white' : 'w-2.5 bg-gray-300'
              }`}
              aria-label={`Go to hero slide ${index + 1}`}
            />
          ))}
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
                <h3 className="font-medium text-gray-900 text-sm md:text-base">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-6 md:py-8" data-reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden min-h-[200px]">
            <img
              src="/ac.png"
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
              src="/inverter.png"
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
              src="/inac.png"
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Trending product
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

      {/* Deal of the Day */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-16" data-reveal>
        <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl p-6 sm:p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
            <img
              src="/img_3-removebg-preview.png"
              alt="Deal Product"
              className="mx-auto w-32 sm:w-40 md:w-auto hidden sm:block"
            />
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Deal of the days
              </h2>
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
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                      {time.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-600">
                      {time.label}
                    </div>
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
            Our Customers Love Us
          </h2>
        </div>
        <div className="min-w-0 max-w-full bg-white rounded-3xl border border-gray-200 shadow-sm p-5 sm:p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              {/* <p className="text-emerald-500 text-sm font-medium mb-1">
                  Live carousel
                </p> */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                Customer stories
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              {reviews.length} reviews
            </div>
          </div>

          <div className="overflow-hidden min-w-0">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${activeReviewIndex * 100}%)`
              }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="min-w-full">
                  <div className="min-w-0 rounded-2xl bg-emerald-50 border border-emerald-100 p-5 sm:p-6 md:p-8 h-full">
                    <div className="flex items-center gap-3 sm:gap-4 mb-5">
                      {review.image ? (
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                      ) : (
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                          {getInitials(review.name)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex gap-1 mb-1">
                          {[...Array(review.rating || 5)].map((_, index) => (
                            <Star
                              key={index}
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-green-400 text-green-400"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 break-words">
                          {review.name}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-sm md:text-base break-words">
                      {review.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={() =>
                setActiveReviewIndex(
                  (currentIndex) =>
                    (currentIndex - 1 + reviews.length) % reviews.length
                )
              }
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={reviews.length < 2}
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex max-w-full flex-wrap items-center justify-center gap-2">
              {reviews.map((review, index) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => setActiveReviewIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeReviewIndex
                      ? 'w-8 bg-emerald-500'
                      : 'w-2.5 bg-gray-300'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveReviewIndex(
                  (currentIndex) => (currentIndex + 1) % reviews.length
                )
              }
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={reviews.length < 2}
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
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
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-16" data-reveal>
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
