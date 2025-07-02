// Temporary in-memory database for deployment

class TempDatabase {
  constructor() {
    this.users = []
    this.categories = []
    this.expenses = []
    this.currentUserId = null
  }

  // User methods
  createUser(userData) {
    const user = {
      id: Date.now().toString(),
      ...userData
    }
    this.users.push(user)
    return user
  }

  findUserByEmail(email) {
    return this.users.find(user => user.email === email)
  }

  setCurrentUser(userId) {
    this.currentUserId = userId
  }

  getCurrentUser() {
    if (!this.currentUserId) return null
    return this.users.find(user => user.id === this.currentUserId) || null
  }

  // Category methods
  createCategory(categoryData) {
    const category = {
      id: Date.now().toString(),
      ...categoryData
    }
    this.categories.push(category)
    return category
  }

  getCategories() {
    return this.categories
  }

  getCategoryById(id) {
    return this.categories.find(category => category.id === id)
  }

  // Expense methods
  createExpense(expenseData) {
    const expense = {
      id: Date.now().toString(),
      ...expenseData
    }
    this.expenses.push(expense)
    return expense
  }

  getExpensesByUserId(userId) {
    return this.expenses.filter(expense => expense.userId === userId)
  }

  // Initialize with some sample data
  initializeSampleData() {
    // Create sample categories
    const sampleCategories = [
      { categoryName: 'Food', userId: 'sample' },
      { categoryName: 'Transportation', userId: 'sample' },
      { categoryName: 'Entertainment', userId: 'sample' },
      { categoryName: 'Utilities', userId: 'sample' },
      { categoryName: 'Healthcare', userId: 'sample' }
    ]

    sampleCategories.forEach(cat => this.createCategory(cat))
  }
}

export const tempDB = new TempDatabase()

// Initialize sample data
tempDB.initializeSampleData()