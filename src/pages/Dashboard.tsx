import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { PlusCircle, Settings, LogOut, DollarSign } from 'lucide-react'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const [expenses, setExpenses] = useState([])

  // Sample data for the chart
  const chartData = {
    labels: ['Food', 'Rent', 'Entertainment', 'Transportation'],
    datasets: [
      {
        data: [300, 1200, 200, 150],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: $${context.parsed}`
          }
        }
      }
    },
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
                <DollarSign className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">This Month</p>
                <p className="text-2xl font-bold text-gray-900">$1,850</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Budget Remaining</p>
                <p className="text-2xl font-bold text-gray-900">$650</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Average Daily</p>
                <p className="text-2xl font-bold text-gray-900">$62</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Expense Breakdown</h2>
          <div className="max-w-md mx-auto">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard