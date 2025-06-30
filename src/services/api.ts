import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api/v1'

// Create axios instance
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

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/users/login', { email, password }),
  
  register: (username: string, email: string, password: string) =>
    api.post('/users/register', { username, email, password }),
}

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id: string) => api.get(`/categories/${id}`),
  create: (categoryName: string) => api.post('/categories/create', { categoryName }),
}

// Expenses API
export const expensesAPI = {
  create: (expenseData: {
    amount: number
    description: string
    categoryId: string
    date: string
  }) => api.post('/expenses/create', expenseData),
  
  getAll: () => api.get('/expenses'),
}

export default api