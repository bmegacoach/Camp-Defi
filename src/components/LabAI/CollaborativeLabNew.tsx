import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Bot,
  User,
  Zap,
  TrendingUp,
  Shield,
  Target,
  BarChart3,
  Clock,
  Sparkles,
  MessageSquare,
  ChevronDown,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Users,
  Lightbulb,
  FileText,
  Rocket,
  Brain,
  HandHeart,
  Code,
  GitBranch,
  Play,
  CheckCircle,
  Cpu,
  Database,
  DollarSign,
} from 'lucide-react'
import { chatWithLab } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { CAMP_KNOWLEDGE, getCollaborativeContext, searchCampKnowledge } from '@/lib/camp-knowledge'
import { FuturisticButton } from '@/components/ui/futuristic-button'
import { FuturisticCard, HologramCard } from '@/components/ui/futuristic-card'

interface Message {
  id: string
  type: 'user' | 'lab'
  content: string
  timestamp: Date
  analysis?: {
    riskLevel: string
    confidence: number
    responseType: string
    collaborationType?: string
  }
  recommendations?: string[]
  followUp?: string
  solutionProgress?: {
    phase: string
    progress: number
    artifacts: string[]
  }
}

interface CollaborativeLabProps {
  walletAddress?: string
  userId?: string
}

const collaborativePrompts = [
  {
    id: 'camp-strategy',
    question: "Let's optimize my USDca minting and yield strategy",
    icon: DollarSign,
    category: 'CAMP Strategy',
    type: 'camp_collaboration',
    description: 'Develop personalized CAMP ecosystem strategies'
  },
  {
    id: 'defi-innovation',
    question: "I want to build a new DeFi solution - let's collaborate",
    icon: Brain,
    category: 'DeFi Innovation',
    type: 'collaboration',
    description: 'Co-create breakthrough DeFi products'
  },
  {
    id: 'risk-analysis',
    question: "Help me analyze and mitigate DeFi risks in my portfolio",
    icon: Shield,
    category: 'Risk Management',
    type: 'camp_collaboration',
    description: 'Comprehensive risk assessment and protection'
  },
  {
    id: 'contract-optimization',
    question: "Let's review and optimize smart contract implementations",
    icon: Code,
    category: 'Smart Contracts',
    type: 'collaboration',
    description: 'Technical review and enhancement'
  },
  {
    id: 'yield-maximize',
    question: "Design a yield maximization strategy using CAMP protocols",
    icon: TrendingUp,
    category: 'Yield Optimization',
    type: 'camp_collaboration',
    description: 'Advanced yield farming and optimization'
  },
  {
    id: 'solution-proposal',
    question: "I have an idea for improving the CAMP ecosystem",
    icon: Lightbulb,
    category: 'Ecosystem Development',
    type: 'collaboration',
    description: 'Community-driven platform improvements'
  },
]

const labPartnership = {
  name: 'CAMP Lab',
  title: 'Your DeFi & CAMP Solutions Partner',
  expertise: [
    'CAMP Ecosystem Expert',
    'USDca Strategy Optimization',
    'DeFi Risk Analysis',
    'Smart Contract Security',
    'Yield Maximization',
    'Solution Development',
  ],
  approach: 'Collaborative partnership with deep CAMP & DeFi expertise',
  specializations: [
    '1B Insurance Fund Management',
    'Multi-collateral Strategies',
    'Off-chain Order Optimization',
    'Governance & Risk Management',
  ]
}

export function CollaborativeLab({ walletAddress, userId }: CollaborativeLabProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'lab',
      content: `🚀 **Welcome to CAMP Lab - Your DeFi Solutions Partner**\n\nI'm your dedicated collaborative partner with deep expertise in the CAMP ecosystem, DeFi strategies, and the USDca stablecoin protocol.\n\n⚡ **What Makes Me Unique:**\n• **CAMP Expert** - Complete knowledge of USDca, minting, and governance\n• **1B Insurance Fund** - Guidance on leveraging our comprehensive protection\n• **DeFi Strategist** - Multi-collateral optimization (WBTC, USDC, USDT, ETH, WSOL)\n• **Risk Specialist** - Smart contract security and portfolio protection\n• **Solutions Partner** - We build actionable strategies together\n\n🛡️ **Protected by 1 Billion USD Insurance Fund**\nOur ecosystem provides unprecedented security through GOLDBACKBOND-backed insurance covering smart contract risks, oracle failures, and market volatility.\n\n🤝 **Ready to Collaborate?**\nShare your DeFi goals, CAMP questions, or strategic challenges. I'll work directly with you to develop comprehensive, actionable solutions.\n\n*Let's optimize your DeFi journey together.*`,
      timestamp: new Date(),
      analysis: {
        riskLevel: 'Low',
        confidence: 100,
        responseType: 'camp_partnership_welcome',
        collaborationType: 'expert_onboarding',
      },
      solutionProgress: {
        phase: 'CAMP Expert Ready',
        progress: 0,
        artifacts: ['CAMP Knowledge Base', 'Insurance Fund Protection', 'DeFi Strategy Framework'],
      },
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showCollaborativePrompts, setShowCollaborativePrompts] = useState(true)
  const [currentSession, setCurrentSession] = useState<string | null>(null)
  const [solutionMode, setSolutionMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message?: string) => {
    const messageText = message || input.trim()
    if (!messageText || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setShowCollaborativePrompts(false)

    try {
      // Enhanced context for collaborative partnership with CAMP knowledge
      const campContext = getCollaborativeContext(messageText)
      const collaborativeContext = {
        sessionId: currentSession || `camp-lab-${Date.now()}`,
        timestamp: new Date().toISOString(),
        mode: 'camp_collaborative_partnership',
        solutionMode,
        partnershipGoal: 'camp_solution_development',
        campKnowledge: campContext,
        insuranceFund: CAMP_KNOWLEDGE.insurance,
        previousMessages: messages.slice(-3),
        expertise: labPartnership.expertise,
        specializations: labPartnership.specializations,
      }

      const response = await chatWithLab(
        messageText,
        collaborativeContext,
        userId,
        walletAddress
      )

      if (response.data) {
        const labMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'lab',
          content: response.data.response,
          timestamp: new Date(),
          analysis: {
            ...response.data.analysis,
            collaborationType: 'active_collaboration',
          },
          recommendations: response.data.recommendations,
          followUp: response.data.followUp,
          solutionProgress: {
            phase: determineSolutionPhase(response.data.response),
            progress: calculateProgress(messages.length),
            artifacts: extractArtifacts(response.data.response),
          },
        }

        setMessages(prev => [...prev, labMessage])
        
        // Start solution mode if we're actively collaborating
        if (!solutionMode && isCollaborativeResponse(response.data.response)) {
          setSolutionMode(true)
        }
      }
    } catch (error) {
      console.error('Error in collaborative session:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'lab',
        content: "I'm experiencing technical difficulties, but I'm still committed to working with you. Let me try to reconnect and continue our collaboration.",
        timestamp: new Date(),
        analysis: {
          riskLevel: 'Low',
          confidence: 0,
          responseType: 'error',
          collaborationType: 'technical_issue',
        },
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const determineSolutionPhase = (response: string): string => {
    if (response.includes('analyzing') || response.includes('understanding')) return 'Problem Analysis'
    if (response.includes('solution') || response.includes('approach')) return 'Solution Development'
    if (response.includes('implement') || response.includes('execute')) return 'Implementation Planning'
    if (response.includes('proposal') || response.includes('document')) return 'Solution Documentation'
    return 'Active Collaboration'
  }

  const calculateProgress = (messageCount: number): number => {
    return Math.min(90, (messageCount - 1) * 15) // Progress based on collaboration depth
  }

  const extractArtifacts = (response: string): string[] => {
    const artifacts = []
    if (response.includes('strategy')) artifacts.push('Strategy Framework')
    if (response.includes('analysis')) artifacts.push('Risk Analysis')
    if (response.includes('plan')) artifacts.push('Action Plan')
    if (response.includes('proposal')) artifacts.push('Solution Proposal')
    return artifacts
  }

  const isCollaborativeResponse = (response: string): boolean => {
    const collaborativeKeywords = ['together', 'partnership', 'collaborate', 'develop', 'build', 'solution']
    return collaborativeKeywords.some(keyword => response.toLowerCase().includes(keyword))
  }

  const handleCollaborativePrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const createSolutionProposal = () => {
    // This would open a solution proposal interface
    console.log('Creating solution proposal from collaboration...')
  }

  return (
    <motion.div
      className="h-full flex flex-col bg-camp-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* CAMP Lab Partnership Header */}
      <HologramCard className="p-6 border-b border-cyan-400/20 bg-gradient-to-r from-camp-dark-light/90 to-camp-dark/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <motion.div 
                className="w-14 h-14 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(6, 182, 212, 0.3)',
                    '0 0 40px rgba(6, 182, 212, 0.6)',
                    '0 0 20px rgba(6, 182, 212, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Cpu className="w-7 h-7 text-white" />
              </motion.div>
              <motion.div 
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-camp-dark flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-white flex items-center space-x-2">
                <span>{labPartnership.name}</span>
                <motion.div
                  className="px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg text-xs text-cyan-300 border border-cyan-400/30"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ONLINE
                </motion.div>
              </h2>
              <p className="text-sm text-camp-silver-400">{labPartnership.title}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Shield className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-300 font-medium">1B Insurance Protected</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {solutionMode && (
              <motion.div 
                className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/40"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
              >
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300 font-medium">Active Collaboration</span>
              </motion.div>
            )}
            
            <motion.div 
              className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-camp-royal-500/20 to-purple-500/20 rounded-xl border border-camp-royal-500/40"
              animate={{
                borderColor: ['rgba(59, 130, 246, 0.4)', 'rgba(147, 51, 234, 0.4)', 'rgba(59, 130, 246, 0.4)'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Database className="w-4 h-4 text-camp-royal-400" />
              <span className="text-sm text-camp-royal-300 font-medium">Expert Mode</span>
            </motion.div>
          </div>
        </div>
      </HologramCard>

      {/* Solution Progress Indicator */}
      {solutionMode && (
        <motion.div
          className="px-6 py-3 bg-camp-dark-light/50 border-b border-camp-silver-200/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-camp-silver-300">Solution Development Progress</span>
            <span className="text-xs text-camp-silver-500">
              {messages[messages.length - 1]?.solutionProgress?.phase || 'Active Collaboration'}
            </span>
          </div>
          <div className="w-full bg-camp-silver-600/20 rounded-full h-2">
            <div 
              className="bg-gradient-royal-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${messages[messages.length - 1]?.solutionProgress?.progress || 0}%` }}
            />
          </div>
        </motion.div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={cn(
                'flex space-x-4',
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {message.type === 'lab' && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
              
              <div className={cn(
                'max-w-3xl',
                message.type === 'user' ? 'order-first' : 'order-last'
              )}>
                <HologramCard className={cn(
                  'p-4',
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white ml-12'
                    : 'bg-gradient-card-elevated border border-camp-silver-200/10'
                )}>
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content.split('\n').map((line, i) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return (
                            <div key={i} className="font-semibold text-white mt-2 mb-1">
                              {line.replace(/\*\*/g, '')}
                            </div>
                          )
                        }
                        if (line.startsWith('•') || line.startsWith('🚀') || line.startsWith('🤝') || line.startsWith('⚡') || line.startsWith('🛡️')) {
                          return (
                            <div key={i} className="text-camp-silver-300 ml-2">
                              {line}
                            </div>
                          )
                        }
                        return (
                          <div key={i} className="text-camp-silver-300">
                            {line}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  {message.type === 'lab' && message.analysis && (
                    <div className="mt-4 p-3 bg-camp-dark-light/50 rounded-lg border border-camp-silver-200/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-camp-silver-500 font-medium">
                          Collaboration Status
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-camp-silver-500">
                            Partnership Confidence: {message.analysis.confidence}%
                          </span>
                          <div className={cn(
                            'px-2 py-1 rounded text-xs font-medium',
                            'bg-green-500/20 text-green-400'
                          )}>
                            {message.analysis.collaborationType || 'Active'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {message.solutionProgress && message.solutionProgress.artifacts.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <span className="text-xs text-camp-silver-500 font-medium">Artifacts Created:</span>
                      {message.solutionProgress.artifacts.map((artifact, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm text-camp-silver-300">
                          <FileText className="w-3 h-3 text-camp-royal-400 flex-shrink-0" />
                          <span>{artifact}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {message.recommendations && message.recommendations.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <span className="text-xs text-camp-silver-500 font-medium">Next Steps Together:</span>
                      {message.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start space-x-2 text-sm text-camp-silver-300">
                          <CheckCircle className="w-3 h-3 text-camp-royal-400 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </HologramCard>
                
                <div className="flex items-center justify-between mt-2 px-2">
                  <span className="text-xs text-camp-silver-500">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  
                  {message.type === 'lab' && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="p-1 rounded hover:bg-camp-dark-light/50 transition-colors"
                      >
                        <Copy className="w-3 h-3 text-camp-silver-500" />
                      </button>
                      {solutionMode && (
                        <button 
                          onClick={createSolutionProposal}
                          className="p-1 rounded hover:bg-camp-dark-light/50 transition-colors"
                        >
                          <Rocket className="w-3 h-3 text-camp-royal-400" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {message.type === 'user' && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-camp-silver-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <HologramCard className="p-4 max-w-xs">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span className="text-sm text-camp-silver-400">Working on our solution...</span>
              </div>
            </HologramCard>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Collaborative Prompts */}
      <AnimatePresence>
        {showCollaborativePrompts && (
          <motion.div
            className="px-6 py-4 border-t border-cyan-400/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-4">
              <h3 className="text-lg font-display font-semibold text-white mb-2 flex items-center space-x-2">
                <Rocket className="w-5 h-5 text-cyan-400" />
                <span>Start Our CAMP Collaboration</span>
              </h3>
              <p className="text-sm text-camp-silver-400">Choose a focus area to begin our partnership:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {collaborativePrompts.map((prompt) => {
                const Icon = prompt.icon
                const isCampSpecific = prompt.type === 'camp_collaboration'
                return (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: collaborativePrompts.indexOf(prompt) * 0.1 }}
                  >
                    <FuturisticButton
                      variant={isCampSpecific ? 'primary' : 'ghost'}
                      size="md"
                      onClick={() => handleCollaborativePrompt(prompt.question)}
                      className="w-full h-auto p-4 text-left"
                      glowEffect={isCampSpecific}
                      hoverLift
                    >
                      <div className="flex items-center space-x-3 w-full mb-2">
                        <div className={cn(
                          "p-2 rounded-lg flex-shrink-0",
                          isCampSpecific 
                            ? "bg-cyan-500/20 border border-cyan-400/30" 
                            : "bg-camp-royal-500/20 border border-camp-royal-400/30"
                        )}>
                          <Icon className={cn(
                            "w-5 h-5",
                            isCampSpecific ? "text-cyan-400" : "text-camp-royal-400"
                          )} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-white">
                            {prompt.category}
                          </div>
                          {isCampSpecific && (
                            <div className="text-xs text-cyan-300 font-medium">
                              CAMP Specialized
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-camp-silver-300 text-left w-full">
                        {prompt.description}
                      </div>
                    </FuturisticButton>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collaborative Input Area */}
      <motion.div
        className="p-6 border-t border-cyan-400/20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={solutionMode 
                ? "Continue our collaboration - share ideas, feedback, or next steps..."
                : "Share a challenge, idea, or goal and I'll immediately start working with you..."
              }
              className="w-full p-4 bg-camp-dark-light/80 border border-cyan-400/30 rounded-xl text-white placeholder-camp-silver-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none backdrop-blur-sm"
              rows={2}
              disabled={isLoading}
            />
          </div>
          
          <FuturisticButton
            variant="primary"
            size="lg"
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            loading={isLoading}
            glowEffect
            hoverLift
          >
            <Send className="w-5 h-5" />
          </FuturisticButton>
        </div>
      </motion.div>
    </motion.div>
  )
}
