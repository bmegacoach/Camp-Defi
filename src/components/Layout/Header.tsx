import React from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  Search,
  Settings,
  User,
  Wallet,
  ChevronDown,
  Globe,
  Shield,
  Zap,
  Cpu,
  Database,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatAddress } from '@/lib/wagmi'
import { FuturisticButton } from '@/components/ui/futuristic-button'
import { HologramCard } from '@/components/ui/futuristic-card'

interface HeaderProps {
  currentView: string
  walletConnected?: boolean
  walletAddress?: string
  onConnectWallet?: () => void
}

const viewTitles = {
  dashboard: 'CAMP Dashboard',
  lab: 'Collaborative Lab',
  portfolio: 'Portfolio Analytics',
  market: 'Market Intelligence',
  strategies: 'DeFi Strategies',
  security: 'Security Center',
}

export function Header({ currentView, walletConnected, walletAddress, onConnectWallet }: HeaderProps) {
  return (
    <motion.header
      className="bg-camp-dark-light/80 backdrop-blur-xl border-b border-camp-silver-200/10 px-6 py-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        {/* Left Section - Title & Breadcrumb */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 15px rgba(6, 182, 212, 0.3)',
                  '0 0 25px rgba(6, 182, 212, 0.5)',
                  '0 0 15px rgba(6, 182, 212, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Cpu className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-display font-semibold text-white">
                {viewTitles[currentView as keyof typeof viewTitles] || 'CAMP Elite'}
              </h1>
              <div className="flex items-center space-x-2">
                <Shield className="w-3 h-3 text-cyan-400" />
                <p className="text-camp-silver-400 text-sm">
                  Multi-collateral Stablecoin Protocol
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-camp-silver-500" />
            <input
              type="text"
              placeholder="Search protocols, tokens, strategies..."
              className="w-full pl-10 pr-4 py-2 bg-camp-dark-light border border-camp-silver-600/20 rounded-xl text-white placeholder-camp-silver-500 focus:outline-none focus:ring-2 focus:ring-camp-royal-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center space-x-4">
          {/* Network Status */}
          <div className="flex items-center space-x-2 px-3 py-2 bg-camp-dark-light/50 rounded-lg border border-camp-silver-600/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <Globe className="w-4 h-4 text-camp-silver-400" />
            <span className="text-sm text-camp-silver-300">Ethereum</span>
          </div>

          {/* Notifications */}
          <motion.button
            className="relative p-2 bg-camp-dark-light/50 rounded-lg border border-camp-silver-600/20 hover:bg-camp-royal-500/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-camp-silver-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-camp-royal-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">3</span>
            </div>
          </motion.button>

          {/* Wallet Connection */}
          {walletConnected ? (
            <div className="flex items-center space-x-3">
              <HologramCard className="flex items-center space-x-2 px-4 py-2">
                <Wallet className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-medium">
                  {formatAddress(walletAddress || '')}
                </span>
                <motion.div 
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </HologramCard>
              
              <HologramCard className="flex items-center space-x-2 px-3 py-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">$24,580.50</p>
                  <p className="text-xs text-green-400">+2.3%</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-camp-silver-400" />
              </HologramCard>
            </div>
          ) : (
            <FuturisticButton
              variant="wallet"
              size="lg"
              onClick={onConnectWallet}
              glowEffect
              hoverLift
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </FuturisticButton>
          )}

          {/* Settings */}
          <motion.button
            className="p-2 bg-camp-dark-light/50 rounded-lg border border-camp-silver-600/20 hover:bg-camp-royal-500/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5 text-camp-silver-400" />
          </motion.button>
        </div>
      </div>

      {/* Sub-navigation for current view */}
      {currentView === 'dashboard' && (
        <motion.div
          className="flex items-center space-x-6 mt-4 pt-4 border-t border-camp-silver-200/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-camp-royal-500/20 text-camp-royal-300 rounded-lg border border-camp-royal-500/30">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Live View</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1.5 text-camp-silver-400 hover:text-white transition-colors">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Risk Analysis</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1.5 text-camp-silver-400 hover:text-white transition-colors">
            <span className="text-sm">Performance</span>
          </button>
        </motion.div>
      )}
    </motion.header>
  )
}