import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  PieChart,
  BarChart3,
  Zap,
  Shield,
  Target,
  Clock,
  AlertTriangle,
  ChevronRight,
  Cpu,
  Database,
  Sparkles,
} from 'lucide-react'
import { FuturisticButton } from '@/components/ui/futuristic-button'
import { HologramCard } from '@/components/ui/futuristic-card'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js'
import { getMarketData } from '@/lib/supabase'
import { formatNumber, formatPercentage, getPercentageColor } from '@/lib/wagmi'
import { cn } from '@/lib/utils'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
)

interface DashboardProps {
  walletAddress?: string
}

interface MarketStats {
  totalMarketCap: number
  volume24h: number
  marketCapChange: number
  bitcoinDominance: number
  activeCryptocurrencies: number
}

interface TokenData {
  id: string
  symbol: string
  name: string
  current_price: number
  market_cap: number
  price_change_24h: number
  price_change_7d: number
  volume_24h: number
  sparkline?: number[]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      titleColor: '#fff',
      bodyColor: '#e2e8f0',
      borderColor: 'rgba(59, 130, 246, 0.3)',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      borderWidth: 2,
    },
  },
}

export function Dashboard({ walletAddress }: DashboardProps) {
  const [marketStats, setMarketStats] = useState<MarketStats | null>(null)
  const [topTokens, setTopTokens] = useState<TokenData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true)
        const data = await getMarketData('market-overview')
        
        if (data.data) {
          setMarketStats({
            totalMarketCap: data.data.global?.total_market_cap || 1500000000000,
            volume24h: data.data.global?.total_volume || 45000000000,
            marketCapChange: data.data.global?.market_cap_change_24h || 1.5,
            bitcoinDominance: data.data.global?.bitcoin_dominance || 42.5,
            activeCryptocurrencies: data.data.global?.active_cryptocurrencies || 2500,
          })
          setTopTokens(data.data.tokens || [])
        }
        setLastUpdate(new Date())
      } catch (error) {
        console.error('Error fetching market data:', error)
        // Set fallback data
        setMarketStats({
          totalMarketCap: 1500000000000,
          volume24h: 45000000000,
          marketCapChange: 1.5,
          bitcoinDominance: 42.5,
          activeCryptocurrencies: 2500,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()
    const interval = setInterval(fetchMarketData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const portfolioData = {
    labels: ['ETH', 'BTC', 'USDC', 'LINK', 'UNI'],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
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
        data: [2.3, 8.7, 15.2, 32.1, 89.4],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
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
      {/* CAMP Ecosystem Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <HologramCard className="hover-lift">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-400/30">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs text-cyan-300 font-medium"
              >
                PROTECTED
              </motion.div>
            </div>
            <h3 className="text-sm font-medium text-camp-silver-400 mb-1">Insurance Fund</h3>
            <p className="text-2xl font-bold text-cyan-300">
              $1,000,000,000
            </p>
            <div className="flex items-center mt-2">
              <Database className="w-4 h-4 text-cyan-400 mr-1" />
              <span className="text-cyan-300 text-sm">GOLDBACKBOND Secured</span>
            </div>
          </HologramCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <HologramCard className="hover-lift">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-camp-royal-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-camp-royal-400" />
              </div>
              <Sparkles className="w-4 h-4 text-camp-royal-400 animate-pulse" />
            </div>
            <h3 className="text-sm font-medium text-camp-silver-400 mb-1">USDca Supply</h3>
            <p className="text-2xl font-bold text-white">
              $24,847,392
            </p>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm">+12.3% Growth</span>
            </div>
          </HologramCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <HologramCard className="hover-lift">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Activity className="w-5 h-5 text-green-400" />
              </div>
              <Cpu className="w-4 h-4 text-green-400" />
            </div>
            <h3 className="text-sm font-medium text-camp-silver-400 mb-1">Active Strategies</h3>
            <p className="text-2xl font-bold text-white">147</p>
            <div className="flex items-center mt-2">
              <Target className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm">AI Optimized</span>
            </div>
          </HologramCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <HologramCard className="hover-lift">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-xs text-camp-silver-500">
                {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
            <h3 className="text-sm font-medium text-camp-silver-400 mb-1">Avg APY</h3>
            <p className="text-2xl font-bold text-white">18.42%</p>
            <div className="flex items-center mt-2">
              <div className="w-full bg-camp-dark-light rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '74%' }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
            </div>
          </HologramCard>
        </motion.div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Allocation */}
        <motion.div
          className="card-primary"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Portfolio Allocation</h3>
            <PieChart className="w-5 h-5 text-camp-royal-400" />
          </div>
          <div className="h-64">
            <Doughnut data={portfolioData} options={{ ...chartOptions, cutout: '60%' }} />
          </div>
          <div className="mt-4 space-y-2">
            {portfolioData.labels.map((label, index) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: portfolioData.datasets[0].backgroundColor[index] }}
                  />
                  <span className="text-sm text-camp-silver-300">{label}</span>
                </div>
                <span className="text-sm font-medium text-white">
                  {portfolioData.datasets[0].data[index]}%
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
            <h3 className="text-lg font-semibold text-white">Performance Overview</h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">+15.2%</span>
            </div>
          </div>
          <div className="h-64">
            <Line data={performanceData} options={chartOptions} />
          </div>
          <div className="mt-4 grid grid-cols-5 gap-4">
            {performanceData.labels.map((period, index) => (
              <div key={period} className="text-center">
                <p className="text-xs text-camp-silver-500">{period}</p>
                <p className="text-lg font-semibold text-white">
                  +{performanceData.datasets[0].data[index]}%
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Tokens Table */}
      <motion.div
        className="card-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Top Performing Assets</h3>
          <FuturisticButton
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2"
          >
            <span className="text-sm">View All</span>
            <ChevronRight className="w-4 h-4" />
          </FuturisticButton>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-camp-silver-200/10">
                <th className="text-left py-3 px-4 text-sm font-medium text-camp-silver-400">#</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-camp-silver-400">Asset</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">Price</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">24h</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">7d</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">Market Cap</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-camp-silver-400">Chart</th>
              </tr>
            </thead>
            <tbody>
              {topTokens.slice(0, 8).map((token, index) => (
                <motion.tr
                  key={token.id}
                  className="border-b border-camp-silver-200/5 hover:bg-camp-dark-light/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <td className="py-4 px-4">
                    <span className="text-camp-silver-400">{index + 1}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-royal-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {token.symbol?.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{token.symbol?.toUpperCase()}</p>
                        <p className="text-xs text-camp-silver-500">{token.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium text-white">
                      ${token.current_price?.toFixed(2)}
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
                  <td className="py-4 px-4">
                    <div className="w-20 h-8">
                      {token.sparkline && (
                        <Line
                          data={{
                            labels: token.sparkline.map((_, i) => i),
                            datasets: [
                              {
                                data: token.sparkline,
                                borderColor: token.price_change_24h >= 0 ? '#10B981' : '#EF4444',
                                borderWidth: 1.5,
                                fill: false,
                              },
                            ],
                          }}
                          options={{
                            ...chartOptions,
                            elements: {
                              point: { radius: 0 },
                              line: { borderWidth: 1.5 },
                            },
                          }}
                        />
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* CAMP Ecosystem Overview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="card-primary hover-lift">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white">1B Insurance Fund</h4>
              <p className="text-sm text-cyan-300">GOLDBACKBOND Protected</p>
            </div>
          </div>
          <p className="text-camp-silver-300 text-sm mb-4">
            Your assets are protected by our comprehensive 1 Billion USD insurance fund covering smart contract risks, oracle failures, and market volatility.
          </p>
          <FuturisticButton
            variant="ghost"
            size="sm"
            className="w-full"
            glowEffect
          >
            View Coverage Details
          </FuturisticButton>
        </div>

        <div className="card-primary hover-lift">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-camp-royal-500/20 rounded-xl">
              <Zap className="w-6 h-6 text-camp-royal-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white">CAMP Lab Solutions</h4>
              <p className="text-sm text-camp-silver-400">AI-powered insights</p>
            </div>
          </div>
          <p className="text-camp-silver-300 text-sm mb-4">
            "Your USDca minting strategy can be optimized with multi-collateral balancing. Let's explore yield opportunities together."
          </p>
          <FuturisticButton
            variant="primary"
            size="sm"
            className="w-full"
            glowEffect
          >
            Start Collaboration
          </FuturisticButton>
        </div>

        <div className="card-primary hover-lift">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white">USDca Minting</h4>
              <p className="text-sm text-camp-silver-400">Multi-collateral stablecoin</p>
            </div>
          </div>
          <p className="text-camp-silver-300 text-sm mb-4">
            Mint USDca using WBTC, USDC, USDT, ETH, or WSOL. Secure off-chain order signing with on-chain execution.
          </p>
          <FuturisticButton
            variant="primary"
            size="sm"
            className="w-full"
            glowEffect
          >
            Mint USDca
          </FuturisticButton>
        </div>

        <div className="card-primary hover-lift">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Yield Strategies</h4>
              <p className="text-sm text-camp-silver-400">Optimized returns</p>
            </div>
          </div>
          <p className="text-camp-silver-300 text-sm mb-4">
            Access institutional-grade yield strategies with automated risk management and insurance fund protection.
          </p>
          <FuturisticButton
            variant="ghost"
            size="sm"
            className="w-full"
            glowEffect
          >
            Explore Yields
          </FuturisticButton>
        </div>
      </motion.div>
    </motion.div>
  )
}