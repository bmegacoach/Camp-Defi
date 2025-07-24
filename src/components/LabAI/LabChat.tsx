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
} from 'lucide-react'
import { chatWithLab } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  type: 'user' | 'lab'
  content: string
  timestamp: Date
  analysis?: {
    riskLevel: string
    confidence: number
    responseType: string
  }
  recommendations?: string[]
  followUp?: string
}

interface LabChatProps {
  walletAddress?: string
  userId?: string
}

const quickQuestions = [
  {
    id: 'portfolio-analysis',
    question: 'Analyze my portfolio performance',
    icon: BarChart3,
    category: 'Portfolio',
  },
  {
    id: 'yield-opportunities',
    question: 'Show me the best yield farming opportunities',
    icon: TrendingUp,
    category: 'Yield',
  },
  {
    id: 'risk-assessment',
    question: 'What are the current market risks?',
    icon: Shield,
    category: 'Risk',
  },
  {
    id: 'market-timing',
    question: 'Is this a good time to enter positions?',
    icon: Target,
    category: 'Timing',
  },
]

const labPersonality = {
  name: 'Lab',
  title: 'Elite DeFi AI Advisor',
  expertise: [
    'Risk Management',
    'Yield Optimization',
    'Market Analysis',
    'Portfolio Strategy',
  ],
}

export function LabChat({ walletAddress, userId }: LabChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'lab',
      content: `👋 **Welcome to Lab AI - Your Elite DeFi Advisor**\n\nI'm here to provide institutional-grade analysis and strategic guidance for your DeFi portfolio. I specialize in:\n\n📊 **Portfolio Optimization** - Risk-adjusted returns\n💰 **Yield Strategies** - Maximum APY with controlled risk\n🛡️ **Risk Management** - Comprehensive security analysis\n📈 **Market Intelligence** - Real-time insights and timing\n\n*How can I assist you today?*`,
      timestamp: new Date(),
      analysis: {
        riskLevel: 'Low',
        confidence: 100,
        responseType: 'welcome',
      },
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
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
    setShowQuickQuestions(false)

    try {
      const response = await chatWithLab(
        messageText,
        {
          sessionId: 'lab-session-1',
          timestamp: new Date().toISOString(),
        },
        userId,
        walletAddress
      )

      if (response.data) {
        const labMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'lab',
          content: response.data.response,
          timestamp: new Date(),
          analysis: response.data.analysis,
          recommendations: response.data.recommendations,
          followUp: response.data.followUp,
        }

        setMessages(prev => [...prev, labMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'lab',
        content: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        timestamp: new Date(),
        analysis: {
          riskLevel: 'Low',
          confidence: 0,
          responseType: 'error',
        },
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
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

  return (
    <motion.div
      className="h-full flex flex-col bg-camp-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Chat Header */}
      <motion.div
        className="flex items-center justify-between p-6 border-b border-camp-silver-200/10 bg-gradient-card-elevated"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-royal-primary rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-camp-dark" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-white">
              {labPersonality.name}
            </h2>
            <p className="text-sm text-camp-silver-400">{labPersonality.title}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-3 py-1.5 bg-camp-royal-500/20 rounded-lg border border-camp-royal-500/30">
            <Sparkles className="w-4 h-4 text-camp-royal-400" />
            <span className="text-sm text-camp-royal-300 font-medium">AI Active</span>
          </div>
        </div>
      </motion.div>

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
                  <div className="w-10 h-10 bg-gradient-royal-primary rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
              
              <div className={cn(
                'max-w-3xl',
                message.type === 'user' ? 'order-first' : 'order-last'
              )}>
                <div className={cn(
                  'p-4 rounded-2xl',
                  message.type === 'user'
                    ? 'bg-gradient-royal-primary text-white ml-12'
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
                        if (line.startsWith('•') || line.startsWith('📊') || line.startsWith('💰')) {
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
                        <span className="text-xs text-camp-silver-500 font-medium">Analysis</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-camp-silver-500">
                            Confidence: {message.analysis.confidence}%
                          </span>
                          <div className={cn(
                            'px-2 py-1 rounded text-xs font-medium',
                            message.analysis.riskLevel === 'Low' ? 'bg-green-500/20 text-green-400' :
                            message.analysis.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          )}>
                            {message.analysis.riskLevel} Risk
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {message.recommendations && message.recommendations.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <span className="text-xs text-camp-silver-500 font-medium">Recommendations:</span>
                      {message.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start space-x-2 text-sm text-camp-silver-300">
                          <Target className="w-3 h-3 text-camp-royal-400 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
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
                      <button className="p-1 rounded hover:bg-camp-dark-light/50 transition-colors">
                        <ThumbsUp className="w-3 h-3 text-camp-silver-500" />
                      </button>
                      <button className="p-1 rounded hover:bg-camp-dark-light/50 transition-colors">
                        <ThumbsDown className="w-3 h-3 text-camp-silver-500" />
                      </button>
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
            <div className="w-10 h-10 bg-gradient-royal-primary rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-gradient-card-elevated border border-camp-silver-200/10 p-4 rounded-2xl max-w-xs">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-camp-royal-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-camp-royal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-camp-royal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span className="text-sm text-camp-silver-400">Lab is analyzing...</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <AnimatePresence>
        {showQuickQuestions && (
          <motion.div
            className="px-6 py-4 border-t border-camp-silver-200/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-3">
              <span className="text-sm text-camp-silver-400 font-medium">Quick Questions:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickQuestions.map((q) => {
                const Icon = q.icon
                return (
                  <motion.button
                    key={q.id}
                    onClick={() => handleQuickQuestion(q.question)}
                    className="flex items-center space-x-3 p-3 bg-camp-dark-light/50 border border-camp-silver-200/10 rounded-xl hover:bg-camp-royal-500/10 hover:border-camp-royal-500/30 transition-all duration-200 text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-2 bg-camp-royal-500/20 rounded-lg">
                      <Icon className="w-4 h-4 text-camp-royal-400" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-camp-silver-300">{q.question}</span>
                      <div className="text-xs text-camp-silver-500 mt-1">{q.category}</div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <motion.div
        className="p-6 border-t border-camp-silver-200/10 bg-gradient-card-elevated"
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
              placeholder="Ask Lab about DeFi strategies, risks, or market insights..."
              className="w-full p-4 bg-camp-dark-light border border-camp-silver-600/20 rounded-xl text-white placeholder-camp-silver-500 focus:outline-none focus:ring-2 focus:ring-camp-royal-500 focus:border-transparent transition-all duration-200 resize-none"
              rows={2}
              disabled={isLoading}
            />
          </div>
          
          <motion.button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            className={cn(
              'p-4 rounded-xl transition-all duration-200',
              input.trim() && !isLoading
                ? 'bg-gradient-royal-primary text-white hover:bg-gradient-royal-secondary shadow-royal'
                : 'bg-camp-silver-600/20 text-camp-silver-500 cursor-not-allowed'
            )}
            whileHover={input.trim() && !isLoading ? { scale: 1.05 } : {}}
            whileTap={input.trim() && !isLoading ? { scale: 0.95 } : {}}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
        
        <div className="flex items-center justify-between mt-3 text-xs text-camp-silver-500">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <div className="flex items-center space-x-4">
            <span>Powered by GPT-4</span>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span>Online</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}