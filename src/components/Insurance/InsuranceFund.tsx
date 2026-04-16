import React from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, AlertTriangle, Database, Lock, TrendingUp, Award, FileText, ExternalLink, Zap } from 'lucide-react'
import { FuturisticButton } from '@/components/ui/futuristic-button'
import { HologramCard } from '@/components/ui/futuristic-card'
import { cn } from '@/lib/utils'
import { useCampInsuranceFund } from '@/hooks/useCampInsuranceFund'

interface InsuranceFundProps {
  className?: string
  detailed?: boolean
}

const coverageTypes = [
  { id: 'smart-contract', title: 'Smart Contract Risk', description: 'Protection against smart contract vulnerabilities and exploits', coverage: '100%', icon: Lock, color: 'cyan' },
  { id: 'oracle-failure', title: 'Oracle Failure', description: 'Coverage for oracle manipulation and data feed failures', coverage: '100%', icon: Database, color: 'blue' },
  { id: 'market-volatility', title: 'Market Volatility', description: 'Protection during extreme market conditions and liquidation events', coverage: '85%', icon: TrendingUp, color: 'purple' },
  { id: 'governance-attacks', title: 'Governance Attacks', description: 'Defense against malicious governance proposals and voting attacks', coverage: '100%', icon: Award, color: 'green' },
]

// Protocol Protection Reserve — provided by Goldbackbond for investor protection, not a yield source for CAMP
const staticMetrics = { fundStatus: 'Active', provider: 'Goldbackbond', purpose: 'Protocol Protection' }

