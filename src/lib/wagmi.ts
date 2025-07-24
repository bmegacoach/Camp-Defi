import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'CAMP - Elite DeFi Platform',
  projectId: 'camp-web3-elite',
  chains: [mainnet, polygon, optimism, arbitrum, sepolia],
  ssr: false,
})

// Web3 utility functions
export const formatAddress = (address: string) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const formatNumber = (num: number, decimals = 2) => {
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(decimals)}B`
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(decimals)}M`
  }
  if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(decimals)}K`
  }
  return `$${num.toFixed(decimals)}`
}

export const formatPercentage = (num: number, decimals = 2) => {
  const sign = num >= 0 ? '+' : ''
  return `${sign}${num.toFixed(decimals)}%`
}

export const getPercentageColor = (num: number) => {
  if (num > 0) return 'text-green-400'
  if (num < 0) return 'text-red-400'
  return 'text-camp-silver-400'
}