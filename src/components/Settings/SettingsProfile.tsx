import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Key,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
  Moon,
  Sun,
  Monitor,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Wallet,
  Settings as SettingsIcon,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
} from 'lucide-react'
import { useAccount, useDisconnect } from 'wagmi'
import { supabase, updateUserProfile, getUserProfile } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

interface SettingsProfileProps {
  walletAddress?: string
}

interface UserProfile {
  id: string
  wallet_address: string
  username?: string
  email?: string
  bio?: string
  avatar_url?: string
  theme: 'dark' | 'light' | 'system'
  language: string
  timezone: string
  notifications: {
    email: boolean
    push: boolean
    portfolio: boolean
    market: boolean
    lab: boolean
  }
  privacy: {
    showPortfolio: boolean
    showActivity: boolean
    shareData: boolean
  }
  trading: {
    defaultSlippage: number
    gasPreference: 'slow' | 'standard' | 'fast'
    autoApprove: boolean
    confirmTransactions: boolean
  }
  lab: {
    personalizedAdvice: boolean
    riskTolerance: 'conservative' | 'moderate' | 'aggressive'
    investmentGoals: string[]
    experienceLevel: 'beginner' | 'intermediate' | 'advanced'
  }
}

const defaultProfile: Partial<UserProfile> = {
  theme: 'dark',
  language: 'en',
  timezone: 'UTC',
  notifications: {
    email: true,
    push: true,
    portfolio: true,
    market: false,
    lab: true,
  },
  privacy: {
    showPortfolio: false,
    showActivity: false,
    shareData: false,
  },
  trading: {
    defaultSlippage: 0.5,
    gasPreference: 'standard',
    autoApprove: false,
    confirmTransactions: true,
  },
  lab: {
    personalizedAdvice: true,
    riskTolerance: 'moderate',
    investmentGoals: ['long-term-growth'],
    experienceLevel: 'intermediate',
  },
}

export function SettingsProfile({ walletAddress }: SettingsProfileProps) {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProfile = async () => {
      if (!address) return
      
      try {
        setLoading(true)
        const profileData = await getUserProfile(address)
        
        if (profileData) {
          setProfile(profileData as UserProfile)
        } else {
          // Create default profile
          const newProfile = {
            ...defaultProfile,
            id: crypto.randomUUID(),
            wallet_address: address,
          } as UserProfile
          
          setProfile(newProfile)
          await updateUserProfile(address, newProfile)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        toast({
          title: 'Error',
          description: 'Failed to load user profile',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [address, toast])

  const handleProfileUpdate = (updates: Partial<UserProfile>) => {
    if (!profile) return
    
    setProfile({ ...profile, ...updates })
    setUnsavedChanges(true)
  }

  const saveProfile = async () => {
    if (!profile || !address) return
    
    try {
      setSaving(true)
      await updateUserProfile(address, profile)
      setUnsavedChanges(false)
      
      toast({
        title: 'Success',
        description: 'Profile settings saved successfully',
      })
    } catch (error) {
      console.error('Error saving profile:', error)
      toast({
        title: 'Error',
        description: 'Failed to save profile settings',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const exportData = () => {
    if (!profile) return
    
    const dataToExport = {
      profile,
      exportDate: new Date().toISOString(),
      version: '1.0',
    }
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json',
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `camp-profile-${address?.slice(0, 8)}-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    
    toast({
      title: 'Export Complete',
      description: 'Your profile data has been downloaded',
    })
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: 'Wallet Disconnected',
      description: 'Your wallet has been safely disconnected',
    })
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-12 w-full" />
            ))}
          </div>
          <div className="lg:col-span-3">
            <div className="skeleton h-96 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!isConnected || !profile) {
    return (
      <div className="p-6">
        <div className="card-primary text-center py-12">
          <Wallet className="w-16 h-16 text-camp-royal-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
          <p className="text-camp-silver-400 mb-6">
            Please connect your wallet to access profile settings and preferences.
          </p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'trading', label: 'Trading', icon: TrendingUp },
    { id: 'lab', label: 'Lab Preferences', icon: Target },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data Management', icon: Database },
  ]

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Settings & Profile</h1>
          <p className="text-camp-silver-400">
            Manage your account preferences and customize your CAMP experience
          </p>
        </div>
        
        {unsavedChanges && (
          <motion.button
            onClick={saveProfile}
            disabled={saving}
            className="btn-primary flex items-center space-x-2"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </motion.button>
        )}
      </div>

      {/* Wallet Info */}
      <div className="card-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-royal-primary rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Connected Wallet</h3>
              <p className="text-sm text-camp-silver-400 font-mono">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            className="btn-ghost text-red-400 hover:bg-red-500/10"
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-camp-royal-500 text-white'
                    : 'text-camp-silver-400 hover:text-white hover:bg-camp-dark-light'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card-primary">
                <h3 className="text-lg font-semibold text-white mb-6">Profile Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-camp-silver-400 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={profile.username || ''}
                      onChange={(e) => handleProfileUpdate({ username: e.target.value })}
                      placeholder="Enter your username"
                      className="w-full px-4 py-3 bg-camp-dark-light border border-camp-silver-600/20 rounded-lg text-white placeholder-camp-silver-500 focus:outline-none focus:ring-2 focus:ring-camp-royal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-camp-silver-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email || ''}
                      onChange={(e) => handleProfileUpdate({ email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-camp-dark-light border border-camp-silver-600/20 rounded-lg text-white placeholder-camp-silver-500 focus:outline-none focus:ring-2 focus:ring-camp-royal-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-camp-silver-400 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profile.bio || ''}
                      onChange={(e) => handleProfileUpdate({ bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="w-full px-4 py-3 bg-camp-dark-light border border-camp-silver-600/20 rounded-lg text-white placeholder-camp-silver-500 focus:outline-none focus:ring-2 focus:ring-camp-royal-500 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-camp-silver-400 mb-2">
                      Language
                    </label>
                    <select
                      value={profile.language}
                      onChange={(e) => handleProfileUpdate({ language: e.target.value })}
                      className="w-full px-4 py-3 bg-camp-dark-light border border-camp-silver-600/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-camp-royal-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ja">日本語</option>
                      <option value="ko">한국어</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-camp-silver-400 mb-2">
                      Timezone
                    </label>
                    <select
                      value={profile.timezone}
                      onChange={(e) => handleProfileUpdate({ timezone: e.target.value })}
                      className="w-full px-4 py-3 bg-camp-dark-light border border-camp-silver-600/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-camp-royal-500"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="Europe/London">London</option>
                      <option value="Europe/Paris">Paris</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                      <option value="Asia/Shanghai">Shanghai</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card-primary">
                <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
                
                <div className="space-y-6">
                  {Object.entries(profile.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {key === 'email' && <Mail className="w-5 h-5 text-camp-royal-400" />}
                        {key === 'push' && <Bell className="w-5 h-5 text-camp-royal-400" />}
                        {key === 'portfolio' && <BarChart3 className="w-5 h-5 text-camp-royal-400" />}
                        {key === 'market' && <TrendingUp className="w-5 h-5 text-camp-royal-400" />}
                        {key === 'lab' && <Target className="w-5 h-5 text-camp-royal-400" />}
                        <div>
                          <p className="font-medium text-white capitalize">
                            {key.replace(/([A-Z])/g, ' $1')} Notifications
                          </p>
                          <p className="text-sm text-camp-silver-400">
                            {key === 'email' && 'Receive updates via email'}
                            {key === 'push' && 'Browser push notifications'}
                            {key === 'portfolio' && 'Portfolio performance alerts'}
                            {key === 'market' && 'Market movement notifications'}
                            {key === 'lab' && 'Lab AI coaching updates'}
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleProfileUpdate({
                            notifications: {
                              ...profile.notifications,
                              [key]: e.target.checked,
                            },
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-camp-dark-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-camp-royal-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-camp-royal-500" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card-primary">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-6 h-6 text-camp-royal-400" />
                  <h3 className="text-lg font-semibold text-white">Privacy & Security</h3>
                </div>
                
                <div className="space-y-6">
                  {Object.entries(profile.privacy).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-camp-dark-light/50 rounded-lg">
                      <div>
                        <p className="font-medium text-white">
                          {key === 'showPortfolio' && 'Show Portfolio Publicly'}
                          {key === 'showActivity' && 'Show Trading Activity'}
                          {key === 'shareData' && 'Share Analytics Data'}
                        </p>
                        <p className="text-sm text-camp-silver-400">
                          {key === 'showPortfolio' && 'Allow others to view your portfolio'}
                          {key === 'showActivity' && 'Display your trading history'}
                          {key === 'shareData' && 'Help improve CAMP with anonymous data'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleProfileUpdate({
                            privacy: {
                              ...profile.privacy,
                              [key]: e.target.checked,
                            },
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-camp-dark-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-camp-royal-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-camp-royal-500" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Trading Tab */}
          {activeTab === 'trading' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card-primary">
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-camp-royal-400" />
                  <h3 className="text-lg font-semibold text-white">Trading Preferences</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-camp-silver-400 mb-2">
                      Default Slippage (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="5"
                      value={profile.trading.defaultSlippage}
                      onChange={(e) => handleProfileUpdate({
                        trading: {
                          ...profile.trading,
                          defaultSlippage: parseFloat(e.target.value),
                        },
                      })}
                      className="w-full px-4 py-3 bg-camp-dark-light border border-camp-silver-600/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-camp-royal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-camp-silver-400 mb-2">
                      Gas Preference
                    </label>
                    <select
                      value={profile.trading.gasPreference}
                      onChange={(e) => handleProfileUpdate({
                        trading: {
                          ...profile.trading,
                          gasPreference: e.target.value as 'slow' | 'standard' | 'fast',
                        },
                      })}
                      className="w-full px-4 py-3 bg-camp-dark-light border border-camp-silver-600/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-camp-royal-500"
                    >
                      <option value="slow">Slow (Low Cost)</option>
                      <option value="standard">Standard</option>
                      <option value="fast">Fast (Priority)</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    {[
                      { key: 'autoApprove', label: 'Auto-approve familiar contracts', desc: 'Skip approval step for known protocols' },
                      { key: 'confirmTransactions', label: 'Confirm all transactions', desc: 'Always show transaction confirmation dialog' },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-camp-dark-light/50 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{label}</p>
                          <p className="text-sm text-camp-silver-400">{desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profile.trading[key as keyof typeof profile.trading] as boolean}
                            onChange={(e) => handleProfileUpdate({
                              trading: {
                                ...profile.trading,
                                [key]: e.target.checked,
                              },
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-camp-dark-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-camp-royal-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-camp-royal-500" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Lab Preferences Tab */}
          {activeTab === 'lab' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card-primary">
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="w-6 h-6 text-camp-royal-400" />
                  <h3 className="text-lg font-semibold text-white">Lab AI Preferences</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-camp-silver-400 mb-2">
                        Risk Tolerance
                      </label>
                      <select
                        value={profile.lab.riskTolerance}
                        onChange={(e) => handleProfileUpdate({
                          lab: {
                            ...profile.lab,
                            riskTolerance: e.target.value as 'conservative' | 'moderate' | 'aggressive',
                          },
                        })}
                        className="w-full px-4 py-3 bg-camp-dark-light border border-camp-silver-600/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-camp-royal-500"
                      >
                        <option value="conservative">Conservative</option>
                        <option value="moderate">Moderate</option>
                        <option value="aggressive">Aggressive</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-camp-silver-400 mb-2">
                        Experience Level
                      </label>
                      <select
                        value={profile.lab.experienceLevel}
                        onChange={(e) => handleProfileUpdate({
                          lab: {
                            ...profile.lab,
                            experienceLevel: e.target.value as 'beginner' | 'intermediate' | 'advanced',
                          },
                        })}
                        className="w-full px-4 py-3 bg-camp-dark-light border border-camp-silver-600/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-camp-royal-500"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-camp-silver-400 mb-3">
                      Investment Goals
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'long-term-growth',
                        'passive-income',
                        'capital-preservation',
                        'high-yield',
                        'diversification',
                        'speculation',
                      ].map((goal) => (
                        <label key={goal} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profile.lab.investmentGoals.includes(goal)}
                            onChange={(e) => {
                              const goals = e.target.checked
                                ? [...profile.lab.investmentGoals, goal]
                                : profile.lab.investmentGoals.filter((g) => g !== goal)
                              
                              handleProfileUpdate({
                                lab: {
                                  ...profile.lab,
                                  investmentGoals: goals,
                                },
                              })
                            }}
                            className="w-4 h-4 text-camp-royal-500 bg-camp-dark-light border-camp-silver-600 rounded focus:ring-camp-royal-500"
                          />
                          <span className="text-sm text-white capitalize">
                            {goal.replace(/-/g, ' ')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-camp-dark-light/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Personalized Advice</p>
                        <p className="text-sm text-camp-silver-400">
                          Enable AI to provide tailored recommendations based on your profile
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profile.lab.personalizedAdvice}
                          onChange={(e) => handleProfileUpdate({
                            lab: {
                              ...profile.lab,
                              personalizedAdvice: e.target.checked,
                            },
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-camp-dark-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-camp-royal-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-camp-royal-500" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card-primary">
                <div className="flex items-center space-x-3 mb-6">
                  <Palette className="w-6 h-6 text-camp-royal-400" />
                  <h3 className="text-lg font-semibold text-white">Appearance</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-camp-silver-400 mb-3">
                      Theme
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'dark', label: 'Dark', icon: Moon },
                        { value: 'light', label: 'Light', icon: Sun },
                        { value: 'system', label: 'System', icon: Monitor },
                      ].map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          onClick={() => handleProfileUpdate({ theme: value as 'dark' | 'light' | 'system' })}
                          className={cn(
                            'p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2',
                            profile.theme === value
                              ? 'border-camp-royal-500 bg-camp-royal-500/10'
                              : 'border-camp-silver-600/20 hover:border-camp-royal-500/50'
                          )}
                        >
                          <Icon className="w-6 h-6 text-camp-royal-400" />
                          <span className="text-sm font-medium text-white">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Data Management Tab */}
          {activeTab === 'data' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card-primary">
                <div className="flex items-center space-x-3 mb-6">
                  <Database className="w-6 h-6 text-camp-royal-400" />
                  <h3 className="text-lg font-semibold text-white">Data Management</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-camp-dark-light/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">Export Your Data</h4>
                        <p className="text-sm text-camp-silver-400">Download all your profile and activity data</p>
                      </div>
                      <button
                        onClick={exportData}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">Delete Account</h4>
                        <p className="text-sm text-red-400">
                          Permanently delete your account and all associated data
                        </p>
                      </div>
                      <button className="btn-ghost text-red-400 hover:bg-red-500/10 flex items-center space-x-2">
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}