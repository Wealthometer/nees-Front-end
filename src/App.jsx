import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderCompletePage from './pages/OrderCompletePage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import WishlistPage from './pages/WishlistPage'
import Blocked from './pages/Blocked'

import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

const IS_BLOCKED = false

function App() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    document.body.classList.add('reveal-ready')

    if (!('IntersectionObserver' in window)) {
      return undefined
    }

    const observedElements = new WeakSet()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -5% 0px'
      }
    )

    const observeElements = (root = document) => {
      root.querySelectorAll('[data-reveal]').forEach((element) => {
        if (!observedElements.has(element)) {
          observedElements.add(element)
          observer.observe(element)
        }
      })
    }

    observeElements()

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return

          const element = node
          if (element.matches?.('[data-reveal]')) {
            observeElements(element.parentElement || document)
          }

          if (element.querySelectorAll) {
            observeElements(element)
          }
        })
      })
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
      document.body.classList.remove('reveal-ready')
    }
  }, [location.pathname])

  if (IS_BLOCKED) {
    return <Blocked />
  }

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-complete" element={<OrderCompletePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App
