import axios from 'axios'
import { tempDB } from './tempDatabase'

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

// Simple hash function for demo purposes
const simpleHash = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString()
}

// Generate simple JWT-like token
const generateToken = (email, username) => {
  const payload = { email, username, exp: Date.now() + 24 * 60 * 60 * 1000 }
  return btoa(JSON.stringify(payload))
}

// Check if we're in development mode (backend available)
const isDevelopment = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
}

// Create axios instance for backend calls
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Temporary API implementations
const tempAuthAPI = {
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    
    const user = tempDB.findUserByEmail(email)
    if (!user || simpleHash(password) !== user.password) {
      throw new Error('Invalid credentials')
    }

    const token = generateToken(user.email, user.username)
    tempDB.setCurrentUser(user.id)
    
    return {
      data: {
        data: {
          user: { id: user.id, username: user.username, email: user.email },
          token
        }
      }
    }
  },

  register: async (username, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    
    if (tempDB.findUserByEmail(email)) {
      throw new Error('Email already exists')
    }

    const token = generateToken(email, username)
    const hashedPassword = simpleHash(password)
    
    const user = tempDB.createUser({
      username,
      email,
      password: hashedPassword,
      token
    })

    tempDB.setCurrentUser(user.id)

    return {
      data: {
        data: {
          user: { id: user.id, username: user.username, email: user.email },
          token
        }
      }
    }
  }
}

const tempCategoriesAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const categories = tempDB.getCategories()
    return {
      data: {
        data: categories
      }
    }
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const category = tempDB.getCategoryById(id)
    if (!category) {
      throw new Error('Category not found')
    }
    return {
      data: {
        data: category
      }
    }
  },

  create: async (categoryName) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const currentUser = tempDB.getCurrentUser()
    if (!currentUser) {
      throw new Error('User not authenticated')
    }

    const category = tempDB.createCategory({
      categoryName,
      userId: currentUser.id
    })

    return {
      data: {
        data: category
      }
    }
  }
}

const tempExpensesAPI = {
  create: async (expenseData) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const currentUser = tempDB.getCurrentUser()
    if (!currentUser) {
      throw new Error('User not authenticated')
    }

    const expense = tempDB.createExpense({
      ...expenseData,
      userId: currentUser.id
    })

    return {
      data: {
        data: expense
      }
    }
  },

  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const currentUser = tempDB.getCurrentUser()
    if (!currentUser) {
      throw new Error('User not authenticated')
    }

    const expenses = tempDB.getExpensesByUserId(currentUser.id)
    return {
      data: {
        data: expenses
      }
    }
  }
}

// Export APIs - use temp APIs for production, real APIs for development
export const authAPI = isDevelopment() ? {
  login: (email, password) =>
    api.post('/users/login', { email, password }),
  
  register: (username, email, password) =>
    api.post('/users/register', { username, email, password }),
} : tempAuthAPI

export const categoriesAPI = isDevelopment() ? {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (categoryName) => api.post('/categories/create', { categoryName }),
} : tempCategoriesAPI

export const expensesAPI = isDevelopment() ? {
  create: (expenseData) => api.post('/expenses/create', expenseData),
  
  getAll: () => api.get('/expenses'),
} : tempExpensesAPI

export default api