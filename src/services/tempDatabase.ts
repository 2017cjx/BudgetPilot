// Temporary in-memory database for deployment
interface User {
  id: string
  username: string
  email: string
  password: string
  token?: string
}

interface Category {
  id: string
  categoryName: string
  userId: string
}

interface Expense {
  id: string
  amount: number
  description: string
  categoryId: string
  date: string
  userId: string
}

class TempDatabase {
  private users: User[] = []
  private categories: Category[] = []
  private expenses: Expense[] = []
  private currentUserId: string | null = null

  // User methods
  createUser(userData: { username: string; email: string; password: string; token: string }): User {
    const user: User = {
      id: Date.now().toString(),
      ...userData
    }
    this.users.push(user)
    return user
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email)
  }

  setCurrentUser(userId: string) {
    this.currentUserId = userId
  }

  getCurrentUser(): User | null {
    if (!this.currentUserId) return null
    return this.users.find(user => user.id === this.currentUserId) || null
  }

  // Category methods
  createCategory(categoryData: { categoryName: string; userId: string }): Category {
    const category: Category = {
      id: Date.now().toString(),
      ...categoryData
    }
    this.categories.push(category)
    return category
  }

  getCategories(): Category[] {
    return this.categories
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find(category => category.id === id)
  }

  // Expense methods
  createExpense(expenseData: { amount: number; description: string; categoryId: string; date: string; userId: string }): Expense {
    const expense: Expense = {
      id: Date.now().toString(),
      ...expenseData
    }
    this.expenses.push(expense)
    return expense
  }

  getExpensesByUserId(userId: string): Expense[] {
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