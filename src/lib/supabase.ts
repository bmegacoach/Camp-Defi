import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zeloddbonkurgtqvnqsv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplbG9kZGJvbmt1cmd0cXZucXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MzI2MzYsImV4cCI6MjA2NzEwODYzNn0.9F8VanNhUjI8zJFrTt0nmRwduG523koVjitaDjA1UX0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// API endpoints for edge functions
export const SUPABASE_FUNCTIONS = {
  LAB_AI_COACHING: `${supabaseUrl}/functions/v1/lab-ai-coaching`,
  MARKET_DATA_SERVICE: `${supabaseUrl}/functions/v1/market-data-service`,
  PORTFOLIO_OPTIMIZER: `${supabaseUrl}/functions/v1/portfolio-optimizer`,
}

// Database types
export interface UserProfile {
  id: string
  wallet_address: string
  email?: string
  username?: string
  avatar_url?: string
  preferences: Record<string, any>
  risk_tolerance: number
  created_at: string
  updated_at: string
}

export interface LabConversation {
  id: string
  user_id: string
  session_id: string
  messages: Array<{
    type: 'user' | 'lab'
    message: string
    analysis?: any
    timestamp: string
  }>
  context: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Portfolio {
  id: string
  user_id: string
  wallet_address: string
  total_value_usd: number
  positions: Array<{
    symbol: string
    amount: number
    value: number
    price: number
  }>
  performance_24h: number
  performance_7d: number
  performance_30d: number
  last_updated: string
  created_at: string
}

export interface MarketData {
  id: string
  token_symbol: string
  price_usd: number
  volume_24h?: number
  market_cap?: number
  price_change_24h?: number
  apy_data?: Record<string, any>
  protocol_tvl?: number
  risk_metrics?: Record<string, any>
  lab_analysis?: Record<string, any>
  timestamp: string
}

export interface DefiStrategy {
  id: string
  user_id: string
  strategy_type: string
  protocol_name: string
  token_pair?: string
  apy?: number
  risk_level?: number
  position_size_usd?: number
  entry_price?: number
  current_price?: number
  status: string
  lab_recommendation?: Record<string, any>
  created_at: string
  updated_at: string
}

// Helper functions
export async function callEdgeFunction(functionName: string, payload: any) {
  try {
    const response = await fetch(functionName, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error)
    throw error
  }
}

export async function getMarketData(endpoint = 'market-overview') {
  try {
    const response = await fetch(`${SUPABASE_FUNCTIONS.MARKET_DATA_SERVICE}/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
    })
    
    if (!response.ok) {
      throw new Error(`Market data error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching market data:', error)
    throw error
  }
}

export async function chatWithLab(message: string, context?: any, userId?: string, walletAddress?: string) {
  return callEdgeFunction(SUPABASE_FUNCTIONS.LAB_AI_COACHING, {
    message,
    context,
    userId,
    walletAddress,
  })
}

export async function optimizePortfolio(portfolio: any, options: any) {
  return callEdgeFunction(SUPABASE_FUNCTIONS.PORTFOLIO_OPTIMIZER, {
    portfolio,
    ...options,
  })
}

// User Profile Management
export async function getUserProfile(walletAddress: string) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 is "not found"
    return data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

export async function updateUserProfile(walletAddress: string, profileData: any) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([
        {
          wallet_address: walletAddress,
          ...profileData,
          updated_at: new Date().toISOString(),
        },
      ], {
        onConflict: 'wallet_address'
      })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}

// Lab Conversation Management
export async function saveLabConversation(
  userId: string,
  message: string,
  response: string,
  context?: any
) {
  try {
    const { data, error } = await supabase
      .from('lab_conversations')
      .insert([
        {
          user_id: userId,
          message,
          response,
          context,
          created_at: new Date().toISOString(),
        },
      ])

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving conversation:', error)
    throw error
  }
}

export async function getLabConversations(userId: string, limit = 50) {
  try {
    const { data, error } = await supabase
      .from('lab_conversations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return []
  }
}