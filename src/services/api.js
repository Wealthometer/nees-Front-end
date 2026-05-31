const isLocalHost =
  typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname)

const API_BASE_URL = isLocalHost
  ? 'http://localhost:5000/api'
  : import.meta.env.VITE_API_URL || 'https://nees-1.onrender.com/api'

const RENDER_BASE_URL = isLocalHost
  ? 'http://localhost:5000'
  : import.meta.env.VITE_BASE_URL || 'https://nees-1.onrender.com'

// Helper function to handle API responses
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    const text = await response.text().catch(() => '')
    throw new Error(text || 'Unexpected response format')
  }

  if (!response.ok) {
    const error = await response
      .clone()
      .json()
      .catch(async () => {
        const text = await response.clone().text().catch(() => '')
        return { error: text || `Request failed with status ${response.status}` }
      })
    throw new Error(error.error || error.message || 'An error occurred')
  }
  return response.json()
}

// Products API
export const productsAPI = {
  // Get all products
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/products`)
    return handleResponse(response)
  },

  // Get single product by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products`)
    const products = await handleResponse(response)
    const parsedId = Number.parseInt(id)
    return products.find(
      (p) => p.id === parsedId || String(p.id) === String(id)
    )
  },

  // Add new product (protected)
  create: async (productData, token) => {
    const formData = new FormData()

    // Append text fields
    Object.keys(productData).forEach((key) => {
      if (key !== 'images' && key !== 'thumbnail') {
        formData.append(key, productData[key])
      }
    })

    // Append images
    if (productData.images) {
      productData.images.forEach((image) => {
        formData.append('images', image)
      })
    }

    // Append thumbnail
    if (productData.thumbnail) {
      formData.append('thumbnail', productData.thumbnail)
    }

    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
    return handleResponse(response)
  },

  // Update product (protected)
  update: async (id, productData, token) => {
    const formData = new FormData()

    Object.keys(productData).forEach((key) => {
      if (key !== 'images' && key !== 'thumbnail') {
        formData.append(key, productData[key])
      }
    })

    if (productData.images) {
      productData.images.forEach((image) => {
        formData.append('images', image)
      })
    }

    if (productData.thumbnail) {
      formData.append('thumbnail', productData.thumbnail)
    }

    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
    return handleResponse(response)
  },

  // Delete product (protected)
  delete: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return handleResponse(response)
  }
}

// Admin API
export const adminAPI = {
  // Register admin
  register: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/admin/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    return handleResponse(response)
  },

  // Login admin
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    return handleResponse(response)
  }
}

export const reviewsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/reviews`)
    return handleResponse(response)
  },

  create: async (reviewData) => {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    })
    return handleResponse(response)
  }
}

export const reviewsStreamUrl = `${API_BASE_URL}/reviews/stream`

export const heroSlidesAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hero-slides`)
      return await handleResponse(response)
    } catch (error) {
      console.error('[v0] Error fetching hero slides:', error)
      return []
    }
  }
}

// Helper to get image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.svg?height=400&width=400'
  if (imagePath.startsWith('http')) return imagePath // FIX: Use the secure Render domain instead of localhost
  // Example: https://nees-1.onrender.com + /uploads/image.jpg
  return `${RENDER_BASE_URL}${imagePath}`
}
