import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Building,
  Users,
  Lock,
  Scale,
  TrendingUp,
  Database,
  Globe,
  Award,
} from 'lucide-react'
import { FuturisticButton } from '@/components/ui/futuristic-button'
import { HologramCard } from '@/components/ui/futuristic-card'
import { cn } from '@/lib/utils'

interface ProtocolProtectionFundProps {
  onBack: () => void
}

const fundFeatures = [
  {
    title: 'Capital Source',
    description: 'Designated allocation from Goldbackbond Inc. Treasury, capitalized by Federal Reserve Gold Certificates',
    icon: Building,
    color: 'cyan',
  },
  {
    title: 'Vested Interest',
    description: 'Not third-party insurance, but direct capital stakeholder protection aligned with user interests',
    icon: Users,
    color: 'green',
  },
  {
    title: 'Multi-Signature Governance',
    description: 'Rigorous consensus process from key USDGB Trust Fund fiduciaries ensures responsible deployment',
    icon: Lock,
    color: 'purple',
  },
  {
    title: 'Legal Framework',
    description: 'Governed by Private Placement Memorandum (PPM) terms with clear deployment criteria',
    icon: Scale,
    color: 'blue',
  },
]

const protectionCoverage = [
  {
    title: 'Smart Contract Exploits',
    description: 'Protection against critical vulnerabilities in core protocol dependencies',
    covered: true,
  },
  {
    title: 'Extreme Market Dislocation',
    description: 'Stabilization during black swan events threatening ecosystem solvency',
    covered: true,
  },
  {
    title: 'Systemic Risk Events',
    description: 'Comprehensive backstop for unforeseen market-wide disruptions',
    covered: true,
  },
  {
    title: 'Individual User Errors',
    description: 'Personal mistakes, incorrect transactions, or user-level issues',
    covered: false,
  },
  {
    title: 'Market Volatility Losses',
    description: 'Normal trading losses due to market fluctuations',
    covered: false,
  },
  {
    title: 'Investment Returns',
    description: 'Guaranteed profits or specific investment performance',
    covered: false,
  },
]

export function ProtocolProtectionFund({ onBack }: ProtocolProtectionFundProps) {
  return (
    <div className="min-h-screen bg-camp-dark overflow-hidden">
      {/* Header */}
      <motion.header
        className="bg-camp-dark-light/80 backdrop-blur-xl border-b border-camp-silver-200/10 px-6 py-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto flex items-center space-x-4">
          <FuturisticButton
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </FuturisticButton>
          
          <div className="h-6 w-px bg-camp-silver-600/20" />
          
          <div className="flex items-center space-x-3">
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
              <Shield className="w-4 h-4 text-white" />
            </motion.div>
            <h1 className="text-xl font-display font-semibold text-white">
              Protocol Protection Fund
            </h1>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8"
            animate={{
              boxShadow: [
                '0 0 30px rgba(6, 182, 212, 0.3)',
                '0 0 60px rgba(6, 182, 212, 0.6)',
                '0 0 30px rgba(6, 182, 212, 0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Shield className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            The{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Goldbackbond
            </span>
            {' '}Protocol Protection Fund
          </h1>
          
          <p className="text-xl text-camp-silver-300 max-w-4xl mx-auto leading-relaxed">
            A Commitment to Ecosystem Integrity
          </p>
          
          <div className="mt-8 p-6 bg-cyan-500/10 border border-cyan-400/30 rounded-xl max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Award className="w-8 h-8 text-cyan-400" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">$1,000,000,000</div>
                <div className="text-cyan-400 font-semibold">Protection Fund Allocation</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HologramCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Nature and Purpose of the Fund</h2>
            <div className="space-y-4 text-camp-silver-300 leading-relaxed">
              <p>
                The CAMP DeFi protocol is supported by a dedicated, on-chain Protocol Protection Fund provided by its strategic partner, 
                Goldbackbond Inc. This fund represents a new model of embedded economic security, designed to safeguard the long-term 
                health and stability of the CAMP ecosystem against unforeseen, systemic market events.
              </p>
              <p>
                The Protocol Protection Fund is a discretionary capital backstop, capitalized by a $1 Billion allocation from the 
                Goldbackbond Inc. corporate treasury. Its sole purpose is to provide a stabilization and recapitalization resource 
                in the event of a "black swan" event, such as a critical smart contract exploit on a core protocol dependency or 
                an extreme market dislocation that threatens the solvency of the CAMP ecosystem.
              </p>
              <p>
                This mechanism is modeled after the successful insurance and stability funds deployed by pioneers in the decentralized 
                finance space. It is a key component of the Goldbackbond risk management framework, designed to protect its own 
                significant financial stake in the success of the CAMP protocol.
              </p>
            </div>
          </HologramCard>
        </motion.section>

        {/* Fund Features */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Funding, Capitalization, and{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Governance
            </span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {fundFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <HologramCard className="p-6 h-full hover-lift">
                    <div className={cn(
                      'p-4 rounded-xl border mb-4 w-fit',
                      feature.color === 'cyan' && 'bg-cyan-500/20 border-cyan-400/30',
                      feature.color === 'green' && 'bg-green-500/20 border-green-400/30',
                      feature.color === 'purple' && 'bg-purple-500/20 border-purple-400/30',
                      feature.color === 'blue' && 'bg-blue-500/20 border-blue-400/30'
                    )}>
                      <Icon className={cn(
                        'w-6 h-6',
                        feature.color === 'cyan' && 'text-cyan-400',
                        feature.color === 'green' && 'text-green-400',
                        feature.color === 'purple' && 'text-purple-400',
                        feature.color === 'blue' && 'text-blue-400'
                      )} />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-camp-silver-400">
                      {feature.description}
                    </p>
                  </HologramCard>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Coverage Details */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Protection{' '}
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Coverage
            </span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Covered Events */}
            <HologramCard className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span>Protected Events</span>
              </h3>
              
              <div className="space-y-4">
                {protectionCoverage.filter(item => item.covered).map((item) => (
                  <div key={item.title} className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-400/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="text-sm text-camp-silver-400">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </HologramCard>

            {/* Non-Covered Events */}
            <HologramCard className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <span>Not Covered</span>
              </h3>
              
              <div className="space-y-4">
                {protectionCoverage.filter(item => !item.covered).map((item) => (
                  <div key={item.title} className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="text-sm text-camp-silver-400">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </HologramCard>
          </div>
        </motion.section>

        {/* Legal Disclaimer */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <HologramCard className="p-8 border-red-500/30 bg-red-500/5">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <span>Legal Disclaimer</span>
            </h2>
            
            <div className="space-y-4 text-camp-silver-300 leading-relaxed">
              <p>
                <strong className="text-red-400">Goldbackbond Inc. is a private corporate entity and is NOT a registered or licensed insurance company, 
                financial institution, or investment advisor.</strong> The Protocol Protection Fund is NOT an insurance policy, a personal guarantee 
                against loss, or a promise of investment returns.
              </p>
              <p>
                It does not cover individual user errors, market volatility losses, or other non-systemic events. The fund is a discretionary 
                allocation of corporate assets, and its deployment is subject to the sole discretion of its governors and the terms outlined 
                in the governing legal documents, including the Private Placement Memorandum (PPM) of Goldbackbond Inc.
              </p>
              <p>
                <strong className="text-red-400">All participation in the CAMP DeFi protocol is subject to the inherent risks of decentralized finance.</strong>
              </p>
            </div>
          </HologramCard>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <HologramCard className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Experience Protected DeFi?
            </h3>
            <p className="text-camp-silver-400 mb-6">
              Join the CAMP ecosystem with confidence, knowing you're protected by institutional-grade security measures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <FuturisticButton
                variant="primary"
                size="lg"
                onClick={onBack}
                glowEffect
                hoverLift
              >
                <Shield className="w-5 h-5 mr-2" />
                Launch Protected DeFi
              </FuturisticButton>
              
              <FuturisticButton
                variant="ghost"
                size="lg"
              >
                <FileText className="w-5 h-5 mr-2" />
                Read Full Documentation
              </FuturisticButton>
            </div>
          </HologramCard>
        </motion.section>
      </main>
    </div>
  )
}
