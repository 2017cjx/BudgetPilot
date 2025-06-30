import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { PlusCircle, Settings, LogOut, DollarSign, TrendingUp, Calendar } from 'lucide-react'
import { expensesAPI, categoriesAPI } from '../services/api'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [expensesResponse, categoriesResponse] = await Promise.all([
        expensesAPI.getAll(),
        categoriesAPI.getAll()
      ])
      setExpenses(expensesResponse.data.data || [])
      setCategories(categoriesResponse.data.data || [])
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate statistics
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date)
    const now = new Date()
    return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear()
  }).reduce((sum, expense) => sum + expense.amount, 0)

  const averageDaily = thisMonthExpenses / new Date().getDate()

  // Prepare chart data
  const categoryExpenses = categories.map(category => {
    const categoryTotal = expenses
      .filter(expense => expense.categoryId === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0)
    return { name: category.categoryName, amount: categoryTotal }
  }).filter(item => item.amount > 0)

  const chartData = {
    labels: categoryExpenses.map(item => item.name),
    datasets: [
      {
        data: categoryExpenses.map(item => item.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: $${context.parsed.toFixed(2)}`
          }
        }
      }
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.username}!
            </h1>
            <p className="text-gray-600 mt-1">Here's your financial overview</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link to="/add-expense" className="card hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors">
                <PlusCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Add Expense</h3>
                <p className="text-gray-600 text-sm">Record a new expense</p>
              </div>
            </div>
          </Link>

          <Link to="/categories" className="card hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Manage Categories</h3>
                <p className="text-gray-600 text-sm">Edit expense categories</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center gap-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">This Month</p>
                <p className="text-2xl font-bold text-gray-900">${thisMonthExpenses.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Average Daily</p>
                <p className="text-2xl font-bold text-gray-900">${averageDaily.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart and Recent Expenses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Expense Breakdown</h2>
            {categoryExpenses.length > 0 ? (
              <div className="max-w-md mx-auto">
                <Pie data={chartData} options={chartOptions} />
              </div>
            ) : (
              <div className="text-center py-8">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No expenses recorded yet</p>
                <Link to="/add-expense" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Add your first expense
                </Link>
              </div>
            )}
          </div>

          {/* Recent Expenses */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Expenses</h2>
            {expenses.length > 0 ? (
              <div className="space-y-3">
                {expenses.slice(0, 5).map((expense) => {
                  const category = categories.find(cat => cat.id === expense.categoryId)
                  return (
                    <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{expense.description}</p>
                        <p className="text-sm text-gray-600">{category?.categoryName || 'Unknown'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${expense.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{new Date(expense.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No expenses recorded yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard