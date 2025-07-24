import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { wagmiConfig } from './lib/wagmi'
import { LandingPage } from './components/Landing/LandingPage'
import { ProtocolProtectionFund } from './components/ProtocolFund/ProtocolProtectionFund'
import { Sidebar } from './components/Layout/Sidebar'
import { Header } from './components/Layout/Header'
import { Dashboard } from './components/Dashboard/Dashboard'
import { PortfolioAnalytics } from './components/Portfolio/PortfolioAnalytics'
import { MarketIntelligence } from './components/Market/MarketIntelligence'
import { CollaborativeLab } from './components/LabAI/CollaborativeLab'
import { SettingsProfile } from './components/Settings/SettingsProfile'
import { InsuranceFund } from './components/Insurance/InsuranceFund'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Toaster } from './components/ui/toaster'
import '@rainbow-me/rainbowkit/styles.css'
import './index.css'

// Create a client
const queryClient = new QueryClient()

// Main App Content Component
function AppContent() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'app' | 'protocol-fund'>('landing')
  const [currentView, setCurrentView] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const handleConnectWallet = () => {
    const metamaskConnector = connectors.find(connector => connector.name === 'MetaMask')
    if (metamaskConnector) {
      connect({ connector: metamaskConnector })
    } else if (connectors.length > 0) {
      connect({ connector: connectors[0] })
    }
  }

  const handleLaunchApp = () => {
    setCurrentPage('app')
  }

  const handleBackToLanding = () => {
    setCurrentPage('landing')
  }

  const handleLearnMore = () => {
    setCurrentPage('protocol-fund')
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard walletAddress={address} />
      case 'portfolio':
        return <PortfolioAnalytics walletAddress={address} />
      case 'market':
        return <MarketIntelligence walletAddress={address} />
      case 'lab':
        return <CollaborativeLab walletAddress={address} userId={address} />
      case 'insurance':
        return (
          <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <InsuranceFund detailed />
          </motion.div>
        )
      case 'settings':
        return <SettingsProfile walletAddress={address} />
      case 'strategies':
        return (
          <motion.div
            className="p-6 flex items-center justify-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <h2 className="text-2xl font-display font-semibold text-white mb-4">
                DeFi Strategies
              </h2>
              <p className="text-camp-silver-400">
                Strategy optimization and execution tools coming soon...
              </p>
            </div>
          </motion.div>
        )
      case 'security':
        return (
          <motion.div
            className="p-6 flex items-center justify-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <h2 className="text-2xl font-display font-semibold text-white mb-4">
                Security Center
              </h2>
              <p className="text-camp-silver-400">
                Risk management and security analysis tools coming soon...
              </p>
            </div>
          </motion.div>
        )
      default:
        return <Dashboard walletAddress={address} />
    }
  }

  // Show landing page if currentPage is 'landing'
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-camp-dark">
        <ErrorBoundary>
          <LandingPage
            onLaunchApp={handleLaunchApp}
            onConnectWallet={handleConnectWallet}
            onLearnMore={handleLearnMore}
          />
        </ErrorBoundary>
        <Toaster />
      </div>
    )
  }

  // Show protocol protection fund page if currentPage is 'protocol-fund'
  if (currentPage === 'protocol-fund') {
    return (
      <div className="min-h-screen bg-camp-dark">
        <ErrorBoundary>
          <ProtocolProtectionFund
            onBack={handleBackToLanding}
          />
        </ErrorBoundary>
        <Toaster />
      </div>
    )
  }

  // Show main app if currentPage is 'app'
  return (
    <div className="h-screen bg-camp-dark overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar
          activeView={currentView}
          onViewChange={setCurrentView}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onBackToHome={handleBackToLanding}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header
            currentView={currentView}
            walletConnected={isConnected}
            walletAddress={address}
            onConnectWallet={handleConnectWallet}
          />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-camp-dark">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ErrorBoundary>
                  {renderCurrentView()}
                </ErrorBoundary>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

// Main App Component with Providers
function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#1E3A8A',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          <div className="font-body">
            <AppContent />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App