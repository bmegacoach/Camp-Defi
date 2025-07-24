import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  AlertTriangle,
  Download,
  RefreshCw,
  Settings,
  BarChart3,
  Zap,
  DollarSign,
  Percent,
  Calendar,
  Filter,
  Search,
} from 'lucide-react'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import { optimizePortfolio, getMarketData } from '@/lib/supabase'
import { formatNumber, formatPercentage, getPercentageColor } from '@/lib/wagmi'
import { cn } from '@/lib/utils'

interface PortfolioAnalyticsProps {
  walletAddress?: string
  userId?: string
}

interface Position {
  symbol: string
  name: string
  amount: number
  value: number
  price: number
  allocation: number
  change24h: number
  change7d: number
}

interface OptimizationData {
  currentPortfolio: {
    allocation: Position[]
    metrics: any
  }
  optimizedPortfolio: {
    allocation: Position[]
    metrics: any
  }
  recommendations: Array<{
    type: string
    priority: string
    title: string
    description: string
    action: string
  }>
  riskAnalysis: any
  yieldOpportunities: any[]
  rebalanceActions: any[]
}

export function PortfolioAnalytics({ walletAddress, userId }: PortfolioAnalyticsProps) {
  const [portfolioData, setPortfolioData] = useState<Position[]>([])
  const [optimizationData, setOptimizationData] = useState<OptimizationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [timeframe, setTimeframe] = useState('7d')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Mock portfolio data
  const mockPortfolio: Position[] = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 15.5,
      value: 40180,
      price: 2592,
      allocation: 35,
      change24h: 1.8,
      change7d: 5.2,
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.26,
      value: 28489,
      price: 109572,
      allocation: 25,
      change24h: 0.6,
      change7d: 3.1,
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      amount: 22890,
      value: 22890,
      price: 1.0,
      allocation: 20,
      change24h: 0.1,
      change7d: 0.0,
    },
    {
      symbol: 'LINK',
      name: 'Chainlink',
      amount: 520,
      value: 13728,
      price: 26.4,
      allocation: 12,
      change24h: 2.1,
      change7d: 4.8,
    },
    {
      symbol: 'UNI',
      name: 'Uniswap',
      amount: 680,
      value: 9180,
      price: 13.5,
      allocation: 8,
      change24h: 1.5,
      change7d: 2.9,
    },
  ]

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true)
        
        // Use mock data for demo
        setPortfolioData(mockPortfolio)
        
        // Get optimization recommendations
        const optimization = await optimizePortfolio(
          mockPortfolio.map(p => ({
            symbol: p.symbol,
            value: p.value,
          })),
          {
            riskTolerance: 5,
            optimizationGoal: 'balanced',
            userId,
          }
        )
        
        if (optimization.data) {
          setOptimizationData(optimization.data)
        }
      } catch (error) {
        console.error('Error fetching portfolio data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioData()
  }, [userId, walletAddress])

  const totalValue = portfolioData.reduce((sum, position) => sum + position.value, 0)
  const totalChange24h = portfolioData.reduce((sum, position) => 
    sum + (position.change24h * position.allocation / 100), 0
  )

  const filteredPositions = portfolioData.filter(position => {
    const matchesSearch = position.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         position.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'gainers' && position.change24h > 0) ||
                         (filterType === 'losers' && position.change24h < 0) ||
                         (filterType === 'stables' && Math.abs(position.change24h) < 1)
    
    return matchesSearch && matchesFilter
  })

  const chartData = {
    labels: portfolioData.map(p => p.symbol),
    datasets: [
      {
        data: portfolioData.map(p => p.allocation),
        backgroundColor: [
          '#3B82F6',
          '#F59E0B',
          '#10B981',
          '#8B5CF6',
          '#EF4444',
        ],
        borderWidth: 0,
      },
    ],
  }

  const performanceData = {
    labels: ['1D', '7D', '30D', '90D', '1Y'],
    datasets: [
      {
        label: 'Portfolio Performance',
        data: [1.8, 5.2, 12.4, 28.7, 67.3],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
  }

  const exportPortfolioData = () => {
    const csvContent = [
      ['Symbol', 'Name', 'Amount', 'Value', 'Price', 'Allocation', '24h Change', '7d Change'],
      ...portfolioData.map(p => [
        p.symbol,
        p.name,
        p.amount,
        p.value,
        p.price,
        p.allocation + '%',
        p.change24h + '%',
        p.change7d + '%',
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `portfolio-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card-stats">
              <div className="skeleton h-4 w-20 mb-2" />
              <div className="skeleton h-8 w-32 mb-1" />
              <div className="skeleton h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Portfolio Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="card-stats hover-lift"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-camp-royal-500/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-camp-royal-400" />
            </div>
            <RefreshCw className="w-4 h-4 text-camp-silver-500 animate-spin" />
          </div>
          <h3 className="text-sm font-medium text-camp-silver-400 mb-1">Total Portfolio Value</h3>
          <p className="text-2xl font-bold text-white">
            {formatNumber(totalValue)}
          </p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className={getPercentageColor(totalChange24h)}>
              {formatPercentage(totalChange24h)} (24h)
            </span>
          </div>
        </motion.div>

        <motion.div
          className="card-stats hover-lift"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Target className="w-5 h-5 text-green-400" />
            </div>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <h3 className="text-sm font-medium text-camp-silver-400 mb-1">Best Performer</h3>
          <p className="text-2xl font-bold text-white">ETH</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-green-400">+5.2% (7d)</span>
          </div>
        </motion.div>

        <motion.div
          className="card-stats hover-lift"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full" />
          </div>
          <h3 className="text-sm font-medium text-camp-silver-400 mb-1">Risk Score</h3>
          <p className="text-2xl font-bold text-white">Medium</p>
          <div className="flex items-center mt-2">
            <div className="w-full bg-camp-dark-light rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full transition-all duration-500" style={{ width: '60%' }} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="card-stats hover-lift"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Percent className="w-5 h-5 text-blue-400" />
            </div>
            <Settings className="w-4 h-4 text-camp-silver-500" />
          </div>
          <h3 className="text-sm font-medium text-camp-silver-400 mb-1">Diversification</h3>
          <p className="text-2xl font-bold text-white">Good</p>
          <div className="flex items-center mt-2">
            <span className="text-blue-400 text-sm">5 Assets</span>
          </div>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 p-1 bg-camp-dark-light rounded-xl">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'positions', label: 'Positions' },
            { id: 'optimization', label: 'Optimization' },
            { id: 'analytics', label: 'Analytics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-camp-royal-500 text-white'
                  : 'text-camp-silver-400 hover:text-white hover:bg-camp-royal-500/10'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-camp-silver-500" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-camp-dark-light border border-camp-silver-600/20 rounded-lg px-3 py-1.5 text-sm text-white"
            >
              <option value="1d">1 Day</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
              <option value="1y">1 Year</option>
            </select>
          </div>
          
          <button
            onClick={exportPortfolioData}
            className="btn-ghost flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Allocation Chart */}
          <motion.div
            className="card-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Allocation</h3>
              <PieChart className="w-5 h-5 text-camp-royal-400" />
            </div>
            <div className="h-64">
              <Doughnut
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '60%',
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
            </div>
            <div className="mt-4 space-y-2">
              {portfolioData.map((position, index) => (
                <div key={position.symbol} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                    />
                    <span className="text-sm text-camp-silver-300">{position.symbol}</span>
                  </div>
                  <span className="text-sm font-medium text-white">
                    {position.allocation}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            className="card-primary lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Performance</h3>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">+12.4%</span>
              </div>
            </div>
            <div className="h-64">
              <Line
                data={performanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { display: true, grid: { color: 'rgba(229, 231, 235, 0.1)' } },
                    y: { display: true, grid: { color: 'rgba(229, 231, 235, 0.1)' } },
                  },
                }}
              />
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'positions' && (
        <motion.div
          className="card-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Search and Filters */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Portfolio Positions</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-camp-silver-500" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-camp-dark-light border border-camp-silver-600/20 rounded-lg text-white placeholder-camp-silver-500 focus:outline-none focus:ring-2 focus:ring-camp-royal-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-camp-silver-500" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-camp-dark-light border border-camp-silver-600/20 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="all">All Assets</option>
                  <option value="gainers">Gainers</option>
                  <option value="losers">Losers</option>
                  <option value="stables">Stable</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-camp-silver-200/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-camp-silver-400">Asset</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">Amount</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">Value</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">Price</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">24h</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">7d</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {filteredPositions.map((position, index) => (
                  <motion.tr
                    key={position.symbol}
                    className="border-b border-camp-silver-200/5 hover:bg-camp-dark-light/30 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-royal-primary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {position.symbol.slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{position.symbol}</p>
                          <p className="text-xs text-camp-silver-500">{position.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-medium text-white">
                        {position.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-medium text-white">
                        {formatNumber(position.value)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-camp-silver-300">
                        ${position.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={getPercentageColor(position.change24h)}>
                        {formatPercentage(position.change24h)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={getPercentageColor(position.change7d)}>
                        {formatPercentage(position.change7d)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <div className="w-16 bg-camp-dark-light rounded-full h-2">
                          <div
                            className="bg-camp-royal-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${position.allocation}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-white">
                          {position.allocation}%
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === 'optimization' && optimizationData && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Optimization Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-primary">
              <h3 className="text-lg font-semibold text-white mb-4">Rebalancing Recommendations</h3>
              <div className="space-y-4">
                {optimizationData.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-camp-dark-light/50 rounded-lg border border-camp-silver-200/10">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-white">{rec.title}</h4>
                      <span className={cn(
                        'px-2 py-1 rounded text-xs font-medium',
                        rec.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                        rec.priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      )}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-sm text-camp-silver-400 mb-2">{rec.description}</p>
                    <p className="text-sm text-camp-royal-300">{rec.action}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card-primary">
              <h3 className="text-lg font-semibold text-white mb-4">Yield Opportunities</h3>
              <div className="space-y-4">
                {optimizationData.yieldOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-4 bg-camp-dark-light/50 rounded-lg border border-camp-silver-200/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{opportunity.protocol}</h4>
                      <span className="text-green-400 font-semibold">{opportunity.apy}% APY</span>
                    </div>
                    <p className="text-sm text-camp-silver-400 mb-2">{opportunity.strategy}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-camp-silver-500">Risk Level: {opportunity.riskLevel}/10</span>
                      <span className="text-camp-silver-500">TVL: {formatNumber(opportunity.tvl)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'analytics' && (
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card-primary">
            <h3 className="text-lg font-semibold text-white mb-4">Risk Analysis</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-camp-dark-light/50 rounded-lg">
                <span className="text-camp-silver-400">Concentration Risk</span>
                <span className="text-yellow-400">Medium</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-camp-dark-light/50 rounded-lg">
                <span className="text-camp-silver-400">Volatility Risk</span>
                <span className="text-green-400">Low</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-camp-dark-light/50 rounded-lg">
                <span className="text-camp-silver-400">Liquidity Risk</span>
                <span className="text-green-400">Low</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-camp-dark-light/50 rounded-lg">
                <span className="text-camp-silver-400">Correlation Risk</span>
                <span className="text-yellow-400">Medium</span>
              </div>
            </div>
          </div>
          
          <div className="card-primary">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-camp-dark-light/50 rounded-lg">
                <span className="text-camp-silver-400">Sharpe Ratio</span>
                <span className="text-white font-medium">1.42</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-camp-dark-light/50 rounded-lg">
                <span className="text-camp-silver-400">Max Drawdown</span>
                <span className="text-red-400">-8.3%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-camp-dark-light/50 rounded-lg">
                <span className="text-camp-silver-400">Alpha</span>
                <span className="text-green-400">+2.8%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-camp-dark-light/50 rounded-lg">
                <span className="text-camp-silver-400">Beta</span>
                <span className="text-white font-medium">0.87</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}