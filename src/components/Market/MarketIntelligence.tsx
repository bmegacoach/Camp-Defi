import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Globe,
  Search,
  Filter,
  Star,
  BarChart3,
  LineChart,
  Download,
  RefreshCw,
  Zap,
  AlertCircle,
  Target,
  Calendar,
  Clock,
  ChevronUp,
  ChevronDown,
  ExternalLink,
} from 'lucide-react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { getMarketData } from '@/lib/supabase'
import { formatNumber, formatPercentage, getPercentageColor } from '@/lib/wagmi'
import { cn } from '@/lib/utils'

interface MarketIntelligenceProps {
  walletAddress?: string
}

interface GlobalMarketData {
  totalMarketCap: number
  totalVolume: number
  marketCapChange: number
  bitcoinDominance: number
  activeCryptocurrencies: number
  fearGreedIndex?: number
}

interface TokenMarketData {
  id: string
  symbol: string
  name: string
  image?: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_24h: number
  price_change_7d: number
  volume_24h: number
  sparkline?: number[]
  ath?: number
  atl?: number
}

interface TrendingToken {
  id: string
  name: string
  symbol: string
  market_cap_rank: number
  thumb?: string
  price_btc: number
}

export function MarketIntelligence({ walletAddress }: MarketIntelligenceProps) {
  const [globalData, setGlobalData] = useState<GlobalMarketData | null>(null)
  const [topTokens, setTopTokens] = useState<TokenMarketData[]>([])
  const [trendingTokens, setTrendingTokens] = useState<TrendingToken[]>([])
  const [defiProtocols, setDefiProtocols] = useState<TokenMarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('market_cap')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [timeframe, setTimeframe] = useState('24h')
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true)
        
        // Fetch multiple market data endpoints
        const [overviewData, trendingData, defiData] = await Promise.all([
          getMarketData('market-overview'),
          getMarketData('trending'),
          getMarketData('defi-protocols'),
        ])
        
        // Set global market data
        if (overviewData.data?.global) {
          setGlobalData({
            totalMarketCap: overviewData.data.global.total_market_cap || 0,
            totalVolume: overviewData.data.global.total_volume || 0,
            marketCapChange: overviewData.data.global.market_cap_change_24h || 0,
            bitcoinDominance: overviewData.data.global.bitcoin_dominance || 0,
            activeCryptocurrencies: overviewData.data.global.active_cryptocurrencies || 0,
            fearGreedIndex: 65, // Mock fear & greed index
          })
        }
        
        // Set tokens data
        if (overviewData.data?.tokens) {
          setTopTokens(overviewData.data.tokens)
        }
        
        // Set trending data
        if (trendingData.data?.trending) {
          setTrendingTokens(trendingData.data.trending)
        }
        
        // Set DeFi protocols
        if (defiData.data?.protocols) {
          setDefiProtocols(defiData.data.protocols)
        }
        
        setLastUpdate(new Date())
      } catch (error) {
        console.error('Error fetching market data:', error)
        // Set fallback data
        setGlobalData({
          totalMarketCap: 3462930000000,
          totalVolume: 101960000000,
          marketCapChange: -2.49,
          bitcoinDominance: 62.9,
          activeCryptocurrencies: 17573,
          fearGreedIndex: 65,
        })
        
        // Mock data for demo
        setTopTokens([
          {
            id: 'bitcoin',
            symbol: 'BTC',
            name: 'Bitcoin',
            current_price: 109569,
            market_cap: 2180000000000,
            market_cap_rank: 1,
            price_change_24h: 0.64,
            price_change_7d: 3.1,
            volume_24h: 28500000000,
            ath: 109800,
            atl: 67.81,
          },
          {
            id: 'ethereum',
            symbol: 'ETH',
            name: 'Ethereum',
            current_price: 2593.21,
            market_cap: 312000000000,
            market_cap_rank: 2,
            price_change_24h: 0.93,
            price_change_7d: 2.4,
            volume_24h: 15200000000,
            ath: 4878.26,
            atl: 0.43,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()
    const interval = setInterval(fetchMarketData, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const filteredTokens = topTokens.filter(token => {
    return token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  }).sort((a, b) => {
    const aValue = a[sortBy as keyof TokenMarketData] as number
    const bValue = b[sortBy as keyof TokenMarketData] as number
    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
  })

  const dominanceData = {
    labels: ['Bitcoin', 'Ethereum', 'Others'],
    datasets: [
      {
        data: [globalData?.bitcoinDominance || 62.9, 18.5, 18.6],
        backgroundColor: ['#F59E0B', '#3B82F6', '#6B7280'],
        borderWidth: 0,
      },
    ],
  }

  const volumeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Volume (24h)',
        data: [95000, 120000, 85000, 102000, 118000, 95000, 101960],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3B82F6',
        borderWidth: 2,
      },
    ],
  }

  const exportMarketData = () => {
    const csvContent = [
      ['Rank', 'Name', 'Symbol', 'Price', 'Market Cap', '24h Change', '7d Change', 'Volume 24h'],
      ...filteredTokens.map(token => [
        token.market_cap_rank,
        token.name,
        token.symbol,
        token.current_price,
        token.market_cap,
        token.price_change_24h + '%',
        token.price_change_7d + '%',
        token.volume_24h,
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `market-data-${new Date().toISOString().split('T')[0]}.csv`
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
      {/* Global Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <motion.div
          className="card-stats hover-lift"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-camp-royal-500/20 rounded-lg">
              <Globe className="w-5 h-5 text-camp-royal-400" />
            </div>
            <span className="text-xs text-camp-silver-500">
              {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
          <h3 className="text-sm font-medium text-camp-silver-400 mb-1">Global Market Cap</h3>
          <p className="text-2xl font-bold text-white">
            {formatNumber(globalData?.totalMarketCap || 0)}
          </p>
          <div className="flex items-center mt-2">
            {(globalData?.marketCapChange || 0) >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
            )}
            <span className={getPercentageColor(globalData?.marketCapChange || 0)}>
              {formatPercentage(globalData?.marketCapChange || 0)}
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
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
          <h3 className="text-sm font-medium text-camp-silver-400 mb-1">24h Volume</h3>
          <p className="text-2xl font-bold text-white">
            {formatNumber(globalData?.totalVolume || 0)}
          </p>
          <div className="flex items-center mt-2">
            <Activity className="w-4 h-4 text-blue-400 mr-1" />
            <span className="text-blue-400 text-sm">High Activity</span>
          </div>
        </motion.div>

        <motion.div
          className="card-stats hover-lift"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Target className="w-5 h-5 text-orange-400" />
            </div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
          </div>
          <h3 className="text-sm font-medium text-camp-silver-400 mb-1">BTC Dominance</h3>
          <p className="text-2xl font-bold text-white">
            {(globalData?.bitcoinDominance || 0).toFixed(1)}%
          </p>
          <div className="flex items-center mt-2">
            <div className="w-full bg-camp-dark-light rounded-full h-2">
              <div
                className="bg-orange-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${globalData?.bitcoinDominance || 0}%` }}
              />
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
            <div className="p-2 bg-green-500/20 rounded-lg">
              <BarChart3 className="w-5 h-5 text-green-400" />
            </div>
            <Clock className="w-4 h-4 text-camp-silver-500" />
          </div>
          <h3 className="text-sm font-medium text-camp-silver-400 mb-1">Active Coins</h3>
          <p className="text-2xl font-bold text-white">
            {(globalData?.activeCryptocurrencies || 0).toLocaleString()}
          </p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-green-400 text-sm">Growing</span>
          </div>
        </motion.div>

        <motion.div
          className="card-stats hover-lift"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-purple-400" />
            </div>
            <div className={cn(
              'w-2 h-2 rounded-full',
              (globalData?.fearGreedIndex || 0) > 75 ? 'bg-red-400' :
              (globalData?.fearGreedIndex || 0) > 50 ? 'bg-green-400' :
              (globalData?.fearGreedIndex || 0) > 25 ? 'bg-yellow-400' : 'bg-red-400'
            )} />
          </div>
          <h3 className="text-sm font-medium text-camp-silver-400 mb-1">Fear & Greed</h3>
          <p className="text-2xl font-bold text-white">
            {globalData?.fearGreedIndex || 65}
          </p>
          <div className="flex items-center mt-2">
            <span className={cn(
              'text-sm',
              (globalData?.fearGreedIndex || 0) > 75 ? 'text-red-400' :
              (globalData?.fearGreedIndex || 0) > 50 ? 'text-green-400' :
              (globalData?.fearGreedIndex || 0) > 25 ? 'text-yellow-400' : 'text-red-400'
            )}>
              {(globalData?.fearGreedIndex || 0) > 75 ? 'Extreme Greed' :
               (globalData?.fearGreedIndex || 0) > 50 ? 'Greed' :
               (globalData?.fearGreedIndex || 0) > 25 ? 'Fear' : 'Extreme Fear'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 p-1 bg-camp-dark-light rounded-xl">
          {[
            { id: 'overview', label: 'Market Overview' },
            { id: 'tokens', label: 'Top Tokens' },
            { id: 'trending', label: 'Trending' },
            { id: 'defi', label: 'DeFi Protocols' },
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
              <option value="1h">1 Hour</option>
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
            </select>
          </div>
          
          <button
            onClick={exportMarketData}
            className="btn-ghost flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <button className="btn-ghost flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Market Dominance */}
          <motion.div
            className="card-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Market Dominance</h3>
              <Target className="w-5 h-5 text-camp-royal-400" />
            </div>
            <div className="h-64">
              <Doughnut
                data={dominanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '60%',
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
            <div className="mt-4 space-y-2">
              {dominanceData.labels.map((label, index) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: dominanceData.datasets[0].backgroundColor[index] }}
                    />
                    <span className="text-sm text-camp-silver-300">{label}</span>
                  </div>
                  <span className="text-sm font-medium text-white">
                    {dominanceData.datasets[0].data[index]}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Volume Chart */}
          <motion.div
            className="card-primary lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Trading Volume (7 Days)</h3>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-medium">{formatNumber(globalData?.totalVolume || 0)}</span>
              </div>
            </div>
            <div className="h-64">
              <Bar
                data={volumeData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: {
                      display: true,
                      grid: { color: 'rgba(229, 231, 235, 0.1)' },
                      ticks: { color: '#9CA3AF' },
                    },
                    y: {
                      display: true,
                      grid: { color: 'rgba(229, 231, 235, 0.1)' },
                      ticks: { color: '#9CA3AF' },
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'tokens' && (
        <motion.div
          className="card-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Search and Filters */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Top Cryptocurrencies</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-camp-silver-500" />
                <input
                  type="text"
                  placeholder="Search tokens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-camp-dark-light border border-camp-silver-600/20 rounded-lg text-white placeholder-camp-silver-500 focus:outline-none focus:ring-2 focus:ring-camp-royal-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-camp-silver-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-camp-dark-light border border-camp-silver-600/20 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="market_cap">Market Cap</option>
                  <option value="current_price">Price</option>
                  <option value="price_change_24h">24h Change</option>
                  <option value="volume_24h">Volume</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                  className="p-2 bg-camp-dark-light border border-camp-silver-600/20 rounded-lg hover:bg-camp-royal-500/10 transition-colors"
                >
                  {sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-camp-silver-200/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-camp-silver-400">#</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-camp-silver-400">Name</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">Price</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">24h</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">7d</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">Market Cap</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">Volume (24h)</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-camp-silver-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.slice(0, 20).map((token, index) => (
                  <motion.tr
                    key={token.id}
                    className="border-b border-camp-silver-200/5 hover:bg-camp-dark-light/30 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-camp-silver-400">{token.market_cap_rank}</span>
                        <Star className="w-3 h-3 text-camp-silver-600 hover:text-yellow-400 cursor-pointer transition-colors" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-royal-primary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {token.symbol.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{token.symbol.toUpperCase()}</p>
                          <p className="text-xs text-camp-silver-500">{token.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-medium text-white">
                        ${token.current_price?.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={getPercentageColor(token.price_change_24h || 0)}>
                        {formatPercentage(token.price_change_24h || 0)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={getPercentageColor(token.price_change_7d || 0)}>
                        {formatPercentage(token.price_change_7d || 0)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-camp-silver-300">
                        {formatNumber(token.market_cap || 0)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-camp-silver-300">
                        {formatNumber(token.volume_24h || 0)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="p-1 rounded hover:bg-camp-royal-500/10 transition-colors">
                          <ExternalLink className="w-4 h-4 text-camp-silver-500" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === 'trending' && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {trendingTokens.length > 0 ? trendingTokens.map((token, index) => (
            <motion.div
              key={token.id}
              className="card-primary hover-lift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-royal-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {token.symbol.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{token.symbol}</h4>
                    <p className="text-sm text-camp-silver-400">{token.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-camp-silver-400">Rank #{token.market_cap_rank}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-green-400">Trending</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-camp-silver-400">Price (BTC)</span>
                <span className="font-medium text-white">
                  {token.price_btc?.toFixed(8)} BTC
                </span>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-semibold text-white mb-2">Trending Tokens</h3>
              <p className="text-camp-silver-400">Loading trending cryptocurrency data...</p>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'defi' && (
        <motion.div
          className="card-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Top DeFi Protocols</h3>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-camp-royal-400" />
              <span className="text-camp-royal-300 text-sm">Live APYs</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Uniswap', symbol: 'UNI', apy: 12.8, tvl: 5200000000, risk: 'Low' },
              { name: 'Aave', symbol: 'AAVE', apy: 8.5, tvl: 14600000000, risk: 'Low' },
              { name: 'Compound', symbol: 'COMP', apy: 7.3, tvl: 3200000000, risk: 'Medium' },
              { name: 'MakerDAO', symbol: 'MKR', apy: 6.8, tvl: 8900000000, risk: 'Low' },
              { name: 'Curve', symbol: 'CRV', apy: 15.2, tvl: 2100000000, risk: 'Medium' },
              { name: 'Yearn', symbol: 'YFI', apy: 9.7, tvl: 890000000, risk: 'High' },
            ].map((protocol, index) => (
              <motion.div
                key={protocol.symbol}
                className="p-4 bg-camp-dark-light/50 rounded-lg border border-camp-silver-200/10 hover:border-camp-royal-500/30 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-royal-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {protocol.symbol.slice(0, 2)}
                      </span>
                    </div>
                    <span className="font-medium text-white">{protocol.name}</span>
                  </div>
                  <div className={cn(
                    'px-2 py-1 rounded text-xs font-medium',
                    protocol.risk === 'Low' ? 'bg-green-500/20 text-green-400' :
                    protocol.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  )}>
                    {protocol.risk}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-camp-silver-400">APY</span>
                    <span className="font-semibold text-green-400">{protocol.apy}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-camp-silver-400">TVL</span>
                    <span className="text-sm text-white">{formatNumber(protocol.tvl)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}