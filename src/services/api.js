const API_BASE_URL = 'https://nees-1.onrender.com/api'

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: 'An error occurred' }))
    throw new Error(error.error || 'An error occurred')
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
    return products.find((p) => p.id === Number.parseInt(id))
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

// Helper to get image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.svg?height=400&width=400'
  if (imagePath.startsWith('http')) return imagePath
  return `http://localhost:5000${imagePath}`
}
