import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Bot,
  PieChart,
  TrendingUp,
  Wallet,
  Settings,
  Menu,
  X,
  Activity,
  BarChart3,
  Shield,
  Zap,
  ChevronRight,
  Cpu,
  Database,
  Home,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { FuturisticButton } from '@/components/ui/futuristic-button'
import { HologramCard } from '@/components/ui/futuristic-card'

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
  onBackToHome?: () => void
}

const navigationItems = [
  {
    id: 'dashboard',
    label: 'CAMP Dashboard',
    icon: LayoutDashboard,
    description: 'Ecosystem overview',
  },
  {
    id: 'lab',
    label: 'Lab Agent',
    icon: Bot,
    description: 'Collaborative solutions',
    badge: 'AI',
  },
  {
    id: 'insurance',
    label: 'Insurance Fund',
    icon: Shield,
    description: '1B USD protection',
    badge: 'PROTECTED',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: PieChart,
    description: 'USDca & assets',
  },
  {
    id: 'market',
    label: 'Market Intel',
    icon: TrendingUp,
    description: 'DeFi analytics',
  },
  {
    id: 'strategies',
    label: 'Yield Strategies',
    icon: BarChart3,
    description: 'Optimized yields',
  },
  {
    id: 'security',
    label: 'Security Center',
    icon: Database,
    description: 'Risk management',
  },
]

const quickActions = [
  {
    id: 'home',
    label: 'Back to Home',
    icon: Home,
    color: 'text-cyan-400',
  },
  {
    id: 'connect-wallet',
    label: 'Connect Wallet',
    icon: Wallet,
    color: 'text-camp-royal-400',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    color: 'text-camp-silver-400',
  },
]

export function Sidebar({ activeView, onViewChange, isCollapsed, onToggleCollapse, onBackToHome }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'home' && onBackToHome) {
      onBackToHome()
    }
  }

  return (
    <motion.div
      className={cn(
        'relative h-screen bg-gradient-card-elevated border-r border-camp-silver-200/10',
        'flex flex-col glass-effect-strong transition-all duration-300 ease-out',
        isCollapsed ? 'w-20' : 'w-80'
      )}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-camp-silver-200/10">
        <motion.div
          className="flex items-center space-x-3"
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="w-10 h-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 15px rgba(6, 182, 212, 0.3)',
                '0 0 25px rgba(6, 182, 212, 0.5)',
                '0 0 15px rgba(6, 182, 212, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Cpu className="w-6 h-6 text-white" />
          </motion.div>
          {!isCollapsed && (
            <div>
              <h1 className="font-display font-bold text-xl text-white">CAMP</h1>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-cyan-400" />
                <p className="text-xs text-cyan-300">1B Protected</p>
              </div>
            </div>
          )}
        </motion.div>
        
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg bg-camp-dark-light/50 border border-camp-silver-200/10 hover:bg-camp-royal-500/10 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-2">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  'w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200',
                  'group relative overflow-hidden',
                  isActive
                    ? 'bg-camp-royal-500/20 text-white border border-camp-royal-500/30'
                    : 'text-camp-silver-300 hover:bg-camp-royal-500/10 hover:text-white'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={cn(
                  'flex-shrink-0 p-2 rounded-lg transition-colors',
                  isActive ? 'bg-camp-royal-500/30' : 'group-hover:bg-camp-royal-500/20'
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs bg-camp-royal-500 text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-camp-silver-500">{item.description}</p>
                    </div>
                    
                    {hoveredItem === item.id && (
                      <motion.div
                        className="absolute right-3"
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    )}
                  </>
                )}
                
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-camp-royal-500 rounded-r"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-camp-silver-200/10">
        <div className="space-y-2">
          {quickActions.map((action) => {
            const Icon = action.icon
            
            return (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.id)}
                className={cn(
                  'w-full flex items-center space-x-3 px-4 py-3 rounded-xl',
                  'text-camp-silver-300 hover:bg-camp-dark-light/50 transition-all duration-200',
                  isCollapsed && 'justify-center'
                )}
              >
                <Icon className={cn('w-5 h-5', action.color)} />
                {!isCollapsed && (
                  <span className="font-medium">{action.label}</span>
                )}
              </button>
            )
          })}
        </div>
        
        {!isCollapsed && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <HologramCard className="mt-4 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Activity className="w-5 h-5 text-cyan-400" />
                </motion.div>
                <span className="font-medium text-white">CAMP Status</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-camp-silver-400">
                  <span>Insurance Fund</span>
                  <span className="text-cyan-400">Active</span>
                </div>
                <div className="flex justify-between text-camp-silver-400">
                  <span>USDca Supply</span>
                  <span className="text-green-400">Growing</span>
                </div>
                <div className="flex justify-between text-camp-silver-400">
                  <span>Lab Agent</span>
                  <span className="text-blue-400">Online</span>
                </div>
                <div className="flex justify-between text-camp-silver-400">
                  <span>Coverage</span>
                  <span className="text-purple-400">84.7%</span>
                </div>
              </div>
            </HologramCard>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}