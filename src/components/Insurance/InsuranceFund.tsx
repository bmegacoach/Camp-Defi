import React from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Database,
  Lock,
  TrendingUp,
  Award,
  FileText,
  ExternalLink,
  Zap,
} from 'lucide-react'
import { FuturisticButton } from '@/components/ui/futuristic-button'
import { HologramCard } from '@/components/ui/futuristic-card'
import { cn } from '@/lib/utils'

interface InsuranceFundProps {
  className?: string
  detailed?: boolean
}

const coverageTypes = [
  {
    id: 'smart-contract',
    title: 'Smart Contract Risk',
    description: 'Protection against smart contract vulnerabilities and exploits',
    coverage: '100%',
    icon: Lock,
    color: 'cyan',
  },
  {
    id: 'oracle-failure',
    title: 'Oracle Failure',
    description: 'Coverage for oracle manipulation and data feed failures',
    coverage: '100%',
    icon: Database,
    color: 'blue',
  },
  {
    id: 'market-volatility',
    title: 'Market Volatility',
    description: 'Protection during extreme market conditions and liquidation events',
    coverage: '85%',
    icon: TrendingUp,
    color: 'purple',
  },
  {
    id: 'governance-attacks',
    title: 'Governance Attacks',
    description: 'Defense against malicious governance proposals and voting attacks',
    coverage: '100%',
    icon: Award,
    color: 'green',
  },
]

const fundMetrics = {
  totalFund: 1000000000, // $1B
  activeCoverage: 847352194, // ~$847M
  availableFund: 152647806, // ~$153M
  claimsProcessed: 23,
  avgClaimTime: '4.2 hours',
  successRate: '99.7%',
}

export function InsuranceFund({ className, detailed = false }: InsuranceFundProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`
    }
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    }
    return `$${amount.toLocaleString()}`
  }

  if (!detailed) {
    // Compact version for headers/cards
    return (
      <HologramCard className={cn('p-4', className)}>
        <div className="flex items-center space-x-3">
          <motion.div
            className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-400/30"
            animate={{
              boxShadow: [
                '0 0 10px rgba(6, 182, 212, 0.2)',
                '0 0 20px rgba(6, 182, 212, 0.4)',
                '0 0 10px rgba(6, 182, 212, 0.2)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-5 h-5 text-cyan-400" />
          </motion.div>
          <div>
            <h3 className="text-sm font-semibold text-white">1B Insurance Protected</h3>
            <p className="text-xs text-cyan-300">GOLDBACKBOND Secured</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-cyan-300">
              {formatCurrency(fundMetrics.totalFund)}
            </p>
            <p className="text-xs text-green-400">Active Coverage</p>
          </div>
        </div>
      </HologramCard>
    )
  }

  // Detailed version for dedicated insurance page
  return (
    <motion.div
      className={cn('space-y-6', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Insurance Fund Overview */}
      <HologramCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                  '0 0 40px rgba(6, 182, 212, 0.6)',
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-display font-bold text-white">
                CAMP Insurance Fund
              </h2>
              <p className="text-camp-silver-400">
                GOLDBACKBOND-backed comprehensive protection for the CAMP ecosystem
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-cyan-300">
              {formatCurrency(fundMetrics.totalFund)}
            </p>
            <p className="text-sm text-green-400">Total Fund Size</p>
          </div>
        </div>

        {/* Fund Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-camp-dark-light/50 rounded-xl border border-cyan-400/20">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-camp-silver-400">Active Coverage</span>
            </div>
            <p className="text-xl font-bold text-white">
              {formatCurrency(fundMetrics.activeCoverage)}
            </p>
          </div>
          
          <div className="p-4 bg-camp-dark-light/50 rounded-xl border border-blue-400/20">
            <div className="flex items-center space-x-2 mb-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-camp-silver-400">Available Fund</span>
            </div>
            <p className="text-xl font-bold text-white">
              {formatCurrency(fundMetrics.availableFund)}
            </p>
          </div>
          
          <div className="p-4 bg-camp-dark-light/50 rounded-xl border border-purple-400/20">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-camp-silver-400">Success Rate</span>
            </div>
            <p className="text-xl font-bold text-white">{fundMetrics.successRate}</p>
          </div>
        </div>

        {/* Fund Utilization Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-camp-silver-400">Fund Utilization</span>
            <span className="text-sm text-white">
              {((fundMetrics.activeCoverage / fundMetrics.totalFund) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-camp-dark-light rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(fundMetrics.activeCoverage / fundMetrics.totalFund) * 100}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <FuturisticButton variant="primary" size="md" glowEffect>
            <FileText className="w-4 h-4 mr-2" />
            Insurance Documentation
          </FuturisticButton>
          <FuturisticButton variant="ghost" size="md">
            <ExternalLink className="w-4 h-4 mr-2" />
            Coverage Calculator
          </FuturisticButton>
          <FuturisticButton variant="ghost" size="md">
            <AlertTriangle className="w-4 h-4 mr-2" />
            File Claim
          </FuturisticButton>
        </div>
      </HologramCard>

      {/* Coverage Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coverageTypes.map((coverage, index) => {
          const Icon = coverage.icon
          return (
            <motion.div
              key={coverage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <HologramCard className="p-6 hover-lift">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={cn(
                    'p-3 rounded-xl border',
                    coverage.color === 'cyan' && 'bg-cyan-500/20 border-cyan-400/30',
                    coverage.color === 'blue' && 'bg-blue-500/20 border-blue-400/30',
                    coverage.color === 'purple' && 'bg-purple-500/20 border-purple-400/30',
                    coverage.color === 'green' && 'bg-green-500/20 border-green-400/30'
                  )}>
                    <Icon className={cn(
                      'w-6 h-6',
                      coverage.color === 'cyan' && 'text-cyan-400',
                      coverage.color === 'blue' && 'text-blue-400',
                      coverage.color === 'purple' && 'text-purple-400',
                      coverage.color === 'green' && 'text-green-400'
                    )} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{coverage.title}</h3>
                    <p className="text-sm text-camp-silver-400">{coverage.description}</p>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      'text-lg font-bold',
                      coverage.color === 'cyan' && 'text-cyan-300',
                      coverage.color === 'blue' && 'text-blue-300',
                      coverage.color === 'purple' && 'text-purple-300',
                      coverage.color === 'green' && 'text-green-300'
                    )}>
                      {coverage.coverage}
                    </p>
                    <p className="text-xs text-camp-silver-500">Coverage</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">Active Protection</span>
                  </div>
                  <FuturisticButton variant="ghost" size="sm">
                    Learn More
                  </FuturisticButton>
                </div>
              </HologramCard>
            </motion.div>
          )
        })}
      </div>

      {/* Claims History & Performance */}
      <HologramCard className="p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Claims Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-cyan-300">{fundMetrics.claimsProcessed}</p>
            <p className="text-sm text-camp-silver-400">Claims Processed</p>
            <p className="text-xs text-green-400 mt-1">All Time</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-300">{fundMetrics.avgClaimTime}</p>
            <p className="text-sm text-camp-silver-400">Average Processing Time</p>
            <p className="text-xs text-green-400 mt-1">Industry Leading</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-green-300">{fundMetrics.successRate}</p>
            <p className="text-sm text-camp-silver-400">Success Rate</p>
            <p className="text-xs text-green-400 mt-1">Proven Reliability</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">Insurance Fund Health: Excellent</span>
          </div>
          <p className="text-sm text-camp-silver-300 mt-1">
            The CAMP Insurance Fund maintains optimal liquidity and coverage ratios, 
            ensuring comprehensive protection for all ecosystem participants.
          </p>
        </div>
      </HologramCard>
    </motion.div>
  )
}
