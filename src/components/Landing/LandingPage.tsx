import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  Globe,
  Zap,
  Database,
  Cpu,
  Lock,
  BarChart3,
  Star,
  CheckCircle,
  ExternalLink,
  Play,
  DollarSign,
  Target,
  Brain,
  Sparkles,
  Award,
  Activity,
  Eye,
} from 'lucide-react'
import { FuturisticButton } from '@/components/ui/futuristic-button'
import { HologramCard } from '@/components/ui/futuristic-card'
import { cn } from '@/lib/utils'

interface LandingPageProps {
  onLaunchApp: () => void
  onConnectWallet: () => void
  onLearnMore: () => void
}

const stats = [
  { value: '$1,000,000,000', label: 'Insurance Fund', icon: Shield, color: 'cyan' },
  { value: '$24.8M', label: 'USDca Supply', icon: DollarSign, color: 'green' },
  { value: '10.42%', label: 'Average APY', icon: TrendingUp, color: 'purple' },
  { value: '19', label: 'Active Strategies', icon: Target, color: 'blue' },
]

const ecosystemPartners = [
  { name: 'Aave', category: 'Lending Protocol' },
  { name: 'Compound', category: 'DeFi Protocol' },
  { name: 'Uniswap', category: 'DEX Protocol' },
  { name: 'Curve', category: 'Stable Swaps' },
  { name: 'Convex', category: 'Yield Farming' },
  { name: 'Yearn', category: 'Vault Strategy' },
]

const useCases = [
  {
    title: 'DeFi Integration',
    description: 'Seamless integration with leading DeFi protocols for yield farming, lending, and liquidity provision.',
    features: ['Automated yield strategies', 'Multi-protocol integration', 'Risk-optimized returns'],
    partners: ['Aave', 'Compound', 'Uniswap', 'Curve'],
    icon: Database,
    color: 'cyan',
  },
  {
    title: 'AI-Powered Collaboration',
    description: 'Intelligent Lab Agent partnership for personalized DeFi strategy development, optimization, and comprehensive support solutions.',
    features: ['Real-time strategy analysis', 'Risk assessment', 'Collaborative planning', '24/7 Support & Solutions'],
    partners: ['Lab Agent AI', 'Strategy Optimizer', 'Risk Manager', 'Support Solutions'],
    icon: Brain,
    color: 'purple',
  },
  {
    title: 'Institutional Solutions',
    description: 'Enterprise-grade infrastructure with comprehensive insurance coverage and compliance tools.',
    features: ['1B insurance protection', 'Regulatory compliance', 'Enterprise APIs'],
    partners: ['GOLDBACKBOND', 'Institutional Custody', 'Compliance Suite'],
    icon: Award,
    color: 'blue',
  },
]

const transparencyMetrics = [
  { label: 'Smart Contract Coverage', value: '100%', icon: Lock },
  { label: 'Oracle Protection', value: '100%', icon: Database },
  { label: 'Market Volatility Coverage', value: '85%', icon: TrendingUp },
  { label: 'Fund Utilization', value: '84.7%', icon: Activity },
]

export function LandingPage({ onLaunchApp, onConnectWallet, onLearnMore }: LandingPageProps) {
  const [currentMetric, setCurrentMetric] = useState(0)
  const { scrollY } = useScroll()
  
  const heroY = useTransform(scrollY, [0, 300], [0, -50])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-camp-dark overflow-hidden">
      {/* Alert Banner */}
      <motion.div
        className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-b border-cyan-400/20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-white">
              <strong>NEW:</strong> 1 Billion USD Insurance Fund now active - protecting all CAMP ecosystem participants
            </span>
            <FuturisticButton variant="ghost" size="sm" onClick={onLearnMore}>
              Learn More <ArrowRight className="w-3 h-3 ml-1" />
            </FuturisticButton>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-camp-dark to-purple-900/20" />
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-8">
            {/* Primary Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  CAMP
                </span>
                <br />
                <span className="text-white">Elite DeFi</span>
              </h1>
              <p className="text-xl md:text-2xl text-camp-silver-300 max-w-3xl mx-auto leading-relaxed">
                The Future of Decentralized Finance: Multi-collateral stablecoin protocol with{' '}
                <span className="text-cyan-400 font-semibold">AI-powered collaboration</span> and{' '}
                <span className="text-green-400 font-semibold">1 Billion USD insurance protection</span>
              </p>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 my-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    className={cn(
                      'text-center p-4 rounded-xl border transition-all duration-500',
                      currentMetric === index
                        ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400/50 scale-110'
                        : 'bg-camp-dark-light/30 border-camp-silver-600/20'
                    )}
                    animate={{
                      scale: currentMetric === index ? 1.1 : 1,
                      boxShadow: currentMetric === index 
                        ? '0 0 30px rgba(6, 182, 212, 0.3)' 
                        : '0 0 0px rgba(6, 182, 212, 0)',
                    }}
                  >
                    <Icon className={cn(
                      'w-8 h-8 mx-auto mb-2',
                      stat.color === 'cyan' && 'text-cyan-400',
                      stat.color === 'green' && 'text-green-400',
                      stat.color === 'purple' && 'text-purple-400',
                      stat.color === 'blue' && 'text-blue-400'
                    )} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-camp-silver-400">{stat.label}</div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Primary CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <FuturisticButton
                variant="primary"
                size="xl"
                onClick={onLaunchApp}
                glowEffect
                hoverLift
                className="px-8 py-4"
              >
                <Zap className="w-5 h-5 mr-2" />
                Launch CAMP Elite
              </FuturisticButton>
              
              <FuturisticButton
                variant="wallet"
                size="xl"
                onClick={onConnectWallet}
                glowEffect
                hoverLift
                className="px-8 py-4"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Start Earning USDca
              </FuturisticButton>
            </motion.div>

            {/* Secondary Info */}
            <motion.div
              className="flex items-center justify-center space-x-6 text-sm text-camp-silver-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Audited & Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Insurance Protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Multi-chain Support</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-gradient-to-br from-camp-dark-light to-camp-dark">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              The Evolution of{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Internet Money
              </span>
            </h2>
            <p className="text-xl text-camp-silver-300 max-w-4xl mx-auto">
              CAMP Elite represents the next generation of decentralized finance, combining multi-collateral stability,
              AI-powered optimization, and institutional-grade security in one comprehensive ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <HologramCard className="p-8 h-full flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-white mb-8 text-center">
                  Revolutionary Features
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/20">
                    <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-400/30 flex-shrink-0">
                      <Brain className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">AI Lab Agent Partnership</h4>
                      <p className="text-camp-silver-400 text-sm">Collaborative intelligence for personalized DeFi strategy development</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-green-500/10 border border-green-400/20">
                    <div className="p-3 bg-green-500/20 rounded-xl border border-green-400/30 flex-shrink-0">
                      <Shield className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">1B Insurance Protection</h4>
                      <p className="text-camp-silver-400 text-sm">GOLDBACKBOND-secured comprehensive coverage for all ecosystem risks</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-purple-500/10 border border-purple-400/20">
                    <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400/30 flex-shrink-0">
                      <Database className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Multi-Collateral USDca</h4>
                      <p className="text-camp-silver-400 text-sm">Stable value backed by WBTC, USDC, USDT, ETH, and WSOL</p>
                    </div>
                  </div>
                </div>
              </HologramCard>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl opacity-20 blur-xl" />
                <HologramCard className="relative p-8 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 mx-auto mb-6 relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full p-1">
                      <div className="w-full h-full bg-camp-dark rounded-full flex items-center justify-center">
                        <Cpu className="w-16 h-16 text-cyan-400" />
                      </div>
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ecosystem Growth
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">733K+</div>
                      <div className="text-sm text-camp-silver-400">Active Users</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">24</div>
                      <div className="text-sm text-camp-silver-400">Supported Chains</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">99.7%</div>
                      <div className="text-sm text-camp-silver-400">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">4.2h</div>
                      <div className="text-sm text-camp-silver-400">Avg Processing</div>
                    </div>
                  </div>
                </HologramCard>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-camp-dark">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Built for Every{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                DeFi Need
              </span>
            </h2>
            <p className="text-xl text-camp-silver-300 max-w-3xl mx-auto">
              From individual traders to institutional investors, CAMP Elite provides comprehensive solutions
              for the entire DeFi ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon
              return (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <HologramCard className="p-8 h-full hover-lift">
                    <div className={cn(
                      'p-4 rounded-xl border mb-6 w-fit',
                      useCase.color === 'cyan' && 'bg-cyan-500/20 border-cyan-400/30',
                      useCase.color === 'purple' && 'bg-purple-500/20 border-purple-400/30',
                      useCase.color === 'blue' && 'bg-blue-500/20 border-blue-400/30'
                    )}>
                      <Icon className={cn(
                        'w-8 h-8',
                        useCase.color === 'cyan' && 'text-cyan-400',
                        useCase.color === 'purple' && 'text-purple-400',
                        useCase.color === 'blue' && 'text-blue-400'
                      )} />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {useCase.title}
                    </h3>
                    
                    <p className="text-camp-silver-400 mb-6">
                      {useCase.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {useCase.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-sm text-camp-silver-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-camp-silver-600/20 pt-4">
                      <div className="text-xs text-camp-silver-500 mb-2">Key Partners:</div>
                      <div className="flex flex-wrap gap-2">
                        {useCase.partners.map((partner) => (
                          <span
                            key={partner}
                            className="px-2 py-1 bg-camp-dark-light/50 border border-camp-silver-600/20 rounded text-xs text-camp-silver-400"
                          >
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>
                  </HologramCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Transparency & Trust Section */}
      <section className="py-24 bg-gradient-to-br from-camp-dark-light to-camp-dark">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Transparent &{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Trustworthy
              </span>
            </h2>
            <p className="text-xl text-camp-silver-300 max-w-3xl mx-auto">
              Real-time transparency and verifiable security backed by the largest insurance fund in DeFi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <HologramCard className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Insurance Coverage Metrics
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {transparencyMetrics.map((metric) => {
                    const Icon = metric.icon
                    return (
                      <div key={metric.label} className="text-center p-4 border border-camp-silver-600/20 rounded-xl">
                        <Icon className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                        <div className="text-xs text-camp-silver-400">{metric.label}</div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold">Insurance Fund Status: Active</span>
                  </div>
                  <p className="text-sm text-camp-silver-300">
                    All ecosystem participants are protected by our comprehensive 1 Billion USD insurance fund,
                    backed by GOLDBACKBOND securities.
                  </p>
                </div>
              </HologramCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <HologramCard className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Eye className="w-6 h-6 text-cyan-400" />
                    <h4 className="text-lg font-semibold text-white">Real-time Backing</h4>
                  </div>
                  <p className="text-camp-silver-400 mb-4">
                    View live collateral ratios and backing assets for complete transparency.
                  </p>
                  <FuturisticButton variant="ghost" size="sm">
                    View Backing Data <ExternalLink className="w-4 h-4 ml-2" />
                  </FuturisticButton>
                </HologramCard>

                <HologramCard className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                    <h4 className="text-lg font-semibold text-white">Audit Reports</h4>
                  </div>
                  <p className="text-camp-silver-400 mb-4">
                    Comprehensive security audits from leading blockchain security firms.
                  </p>
                  <FuturisticButton variant="ghost" size="sm">
                    View Audits <ExternalLink className="w-4 h-4 ml-2" />
                  </FuturisticButton>
                </HologramCard>

                <HologramCard className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Activity className="w-6 h-6 text-green-400" />
                    <h4 className="text-lg font-semibold text-white">Performance Metrics</h4>
                  </div>
                  <p className="text-camp-silver-400 mb-4">
                    Historical performance data and risk metrics updated in real-time.
                  </p>
                  <FuturisticButton variant="ghost" size="sm">
                    View Metrics <ExternalLink className="w-4 h-4 ml-2" />
                  </FuturisticButton>
                </HologramCard>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lab AI Demo Section */}
      <section className="py-24 bg-camp-dark">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Experience{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                AI Collaboration
              </span>
            </h2>
            <p className="text-xl text-camp-silver-300 max-w-3xl mx-auto">
              Our Lab Agent doesn't just provide information—it collaborates with you to develop
              personalized DeFi strategies and optimize your portfolio performance.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <HologramCard className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(168, 85, 247, 0.3)',
                      '0 0 40px rgba(168, 85, 247, 0.6)',
                      '0 0 20px rgba(168, 85, 247, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Brain className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-white">CAMP Lab Agent</h3>
                  <p className="text-camp-silver-400">Your AI DeFi Strategy Partner & Support Solutions Agent</p>
                </div>
                <div className="flex-1" />
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm font-medium">Online</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-camp-dark-light/50 p-4 rounded-xl border border-camp-silver-600/20">
                  <p className="text-camp-silver-300">
                    "Hello! I'm your dedicated CAMP Lab Agent and Support Solutions specialist. I can help you optimize your USDca minting strategy, 
                    analyze yield opportunities across multiple protocols, develop personalized risk management approaches, and provide comprehensive 
                    support for all your DeFi needs. What would you like to work on together?"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-cyan-500/10 border border-cyan-400/30 rounded-xl">
                    <h4 className="font-semibold text-cyan-400 mb-2">Strategy Optimization</h4>
                    <p className="text-sm text-camp-silver-400">
                      "Let's analyze your current portfolio and find opportunities to increase yields while managing risk."
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-500/10 border border-purple-400/30 rounded-xl">
                    <h4 className="font-semibold text-purple-400 mb-2">Risk Assessment</h4>
                    <p className="text-sm text-camp-silver-400">
                      "I'll evaluate your exposure across protocols and suggest hedging strategies for protection."
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <FuturisticButton
                  variant="primary"
                  size="lg"
                  onClick={onLaunchApp}
                  glowEffect
                  hoverLift
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try Lab Agent Now
                </FuturisticButton>
              </div>
            </HologramCard>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-cyan-900/20 via-camp-dark to-purple-900/20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Ready to Enter the{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Future of DeFi?
              </span>
            </h2>
            <p className="text-xl text-camp-silver-300 max-w-3xl mx-auto mb-12">
              Join thousands of users already earning with CAMP Elite's revolutionary approach to decentralized finance.
            </p>

            <div className="flex justify-center items-center mb-12">
              <FuturisticButton
                variant="primary"
                size="xl"
                onClick={onLaunchApp}
                glowEffect
                hoverLift
                className="px-12 py-6"
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Launch CAMP Elite
              </FuturisticButton>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-camp-silver-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No minimum deposit</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Insurance protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>24/7 AI support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-camp-dark-light border-t border-camp-silver-600/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <motion.div 
                className="w-8 h-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(6, 182, 212, 0.3)',
                    '0 0 20px rgba(6, 182, 212, 0.5)',
                    '0 0 10px rgba(6, 182, 212, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Cpu className="w-4 h-4 text-white" />
              </motion.div>
              <span className="font-display font-bold text-white">CAMP Elite</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-camp-silver-400">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-camp-silver-600/20 text-center text-sm text-camp-silver-500">
            © 2025 CAMP Elite. All rights reserved. Building the future of decentralized finance.
          </div>
        </div>
      </footer>
    </div>
  )
}
