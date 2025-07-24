/**
 * CAMP Platform Knowledge Base
 * Comprehensive information about CAMP project for Lab Agent training
 */

export interface CampKnowledge {
  project: ProjectInfo
  contract: ContractInfo
  defi: DefiInfo
  lab: LabInfo
  insurance: InsuranceInfo
}

export interface ProjectInfo {
  name: string
  goal: string
  objective: string
  ecosystem: string
  architecture: string
  techStack: TechStack
  governance: GovernanceInfo
}

export interface ContractInfo {
  usdca: USDcaContract
  minting: MintingContract
  supportedAssets: string[]
  securityFeatures: string[]
}

export interface DefiInfo {
  stablecoin: StablecoinInfo
  strategies: DeFiStrategy[]
  riskManagement: RiskFeatures[]
  yield: YieldInfo
}

export interface LabInfo {
  purpose: string
  capabilities: string[]
  collaborativeFeatures: string[]
  solutionDevelopment: SolutionProcess
}

export interface InsuranceInfo {
  fund: InsuranceFund
  mechanics: string[]
  coverage: CoverageDetails
}

export interface TechStack {
  frontend: string
  backend: string
  blockchain: string
  database: string
  cloud: string
}

export interface GovernanceInfo {
  structure: string
  multisig: string
  timelock: boolean
  adminRole: string
}

export interface USDcaContract {
  name: string
  symbol: string
  type: string
  features: string[]
  functions: ContractFunction[]
}

export interface MintingContract {
  name: string
  purpose: string
  roles: string[]
  functions: ContractFunction[]
  limits: LimitInfo
}

export interface ContractFunction {
  name: string
  purpose: string
  access: string
  parameters?: string[]
}

export interface LimitInfo {
  maxMintPerBlock: string
  maxRedeemPerBlock: string
  purpose: string
}

export interface StablecoinInfo {
  name: string
  symbol: string
  backing: string
  collateral: string[]
  mechanism: string
}

export interface DeFiStrategy {
  name: string
  description: string
  riskLevel: string
  expectedAPY: string
  timeframe: string
}

export interface RiskFeatures {
  feature: string
  description: string
  protection: string
}

export interface YieldInfo {
  sources: string[]
  mechanism: string
  distribution: string
}

export interface SolutionProcess {
  phases: string[]
  approach: string
  deliverables: string[]
}

export interface InsuranceFund {
  size: string
  purpose: string
  management: string
  token: string
}

export interface CoverageDetails {
  scope: string[]
  triggers: string[]
  compensation: string
}

export const CAMP_KNOWLEDGE: CampKnowledge = {
  project: {
    name: "CAMP (Comprehensive Asset Management Platform)",
    goal: "Rapidly develop and deploy a complete system to support the CampMinting smart contract ecosystem",
    objective: "Build infrastructure allowing users to interact with the CampMinting contract to mint and redeem the USDca stablecoin",
    ecosystem: "Ethena-style minting system with centralized, trusted off-chain server",
    architecture: "Hybrid Microservices Architecture on Google Cloud combining on-chain smart contracts with centralized off-chain services",
    techStack: {
      frontend: "Next.js with TypeScript",
      backend: "NestJS microservices",
      blockchain: "Ethereum with ERC-20 tokens",
      database: "PostgreSQL via Google Cloud SQL",
      cloud: "Google Cloud with GKE deployment"
    },
    governance: {
      structure: "Gnosis Safe Multisig with Timelock",
      multisig: "DEFAULT_ADMIN_ROLE controlled by Gnosis Safe",
      timelock: true,
      adminRole: "Highest security level for admin operations"
    }
  },
  contract: {
    usdca: {
      name: "USDca",
      symbol: "USDca",
      type: "ERC-20 Stablecoin",
      features: [
        "ERC20Permit functionality",
        "Controlled minting (minter-only)",
        "Burnable tokens",
        "Ownership protection (cannot renounce)"
      ],
      functions: [
        {
          name: "setMinter",
          purpose: "Designate address with minting permissions",
          access: "Owner only"
        },
        {
          name: "mint",
          purpose: "Mint USDca tokens",
          access: "Minter role only",
          parameters: ["to address", "amount"]
        },
        {
          name: "burnFrom",
          purpose: "Burn tokens during redemption",
          access: "Anyone with allowance",
          parameters: ["from address", "amount"]
        }
      ]
    },
    minting: {
      name: "CampMinting",
      purpose: "Core logic contract for minting and redemption operations",
      roles: [
        "MINTER_ROLE - Execute mint operations",
        "REDEEMER_ROLE - Execute redeem operations", 
        "DEFAULT_ADMIN_ROLE - Administrative tasks",
        "COLLATERAL_MANAGER_ROLE - Manage collateral",
        "GATEKEEPER_ROLE - Security operations"
      ],
      functions: [
        {
          name: "mint",
          purpose: "Execute minting order with collateral",
          access: "MINTER_ROLE",
          parameters: ["Order", "Route", "Signature"]
        },
        {
          name: "mintWithEth",
          purpose: "Execute minting with native ETH",
          access: "MINTER_ROLE",
          parameters: ["Order", "Route", "Signature"]
        },
        {
          name: "redeem",
          purpose: "Execute redemption order",
          access: "REDEEMER_ROLE",
          parameters: ["Order", "Signature"]
        },
        {
          name: "addSupportedAsset",
          purpose: "Add new collateral asset",
          access: "DEFAULT_ADMIN_ROLE",
          parameters: ["asset address"]
        },
        {
          name: "withdrawInsuranceFund",
          purpose: "Withdraw from insurance fund",
          access: "DEFAULT_ADMIN_ROLE",
          parameters: ["to address", "amount"]
        }
      ],
      limits: {
        maxMintPerBlock: "Maximum USDca that can be minted per block",
        maxRedeemPerBlock: "Maximum USDca that can be redeemed per block",
        purpose: "Prevent large-scale exploits and market manipulation"
      }
    },
    supportedAssets: [
      "WBTC (Wrapped Bitcoin)",
      "USDC (USD Coin)", 
      "USDT (Tether)",
      "ETH (Ethereum)",
      "WSOL (Wrapped Solana)",
      "GOLDBACKBOND (Insurance fund token)"
    ],
    securityFeatures: [
      "Access Control with role-based permissions",
      "Reentrancy Guard protection",
      "Order deduplication via nonces",
      "EIP-712 signature verification",
      "Order expiry timestamps",
      "Asset and custodian whitelisting",
      "Per-block minting/redemption limits",
      "Safe ERC20 operations"
    ]
  },
  defi: {
    stablecoin: {
      name: "USDca",
      symbol: "USDca",
      backing: "Multi-collateral backed stablecoin",
      collateral: ["WBTC", "USDC", "USDT", "ETH", "WSOL", "GOLDBACKBOND"],
      mechanism: "Off-chain order signing with on-chain execution"
    },
    strategies: [
      {
        name: "Conservative Yield",
        description: "Stable yield generation through established DeFi protocols",
        riskLevel: "Low",
        expectedAPY: "4-8%",
        timeframe: "Long-term"
      },
      {
        name: "Balanced Growth",
        description: "Mix of yield farming and liquidity provision",
        riskLevel: "Medium", 
        expectedAPY: "8-15%",
        timeframe: "Medium-term"
      },
      {
        name: "Aggressive Alpha",
        description: "High-yield opportunities with active management",
        riskLevel: "High",
        expectedAPY: "15-25%",
        timeframe: "Short to medium-term"
      }
    ],
    riskManagement: [
      {
        feature: "Collateral Diversification",
        description: "Multiple asset types reduce single-point-of-failure risk",
        protection: "Market volatility mitigation"
      },
      {
        feature: "Per-block Limits",
        description: "Maximum mint/redeem amounts per Ethereum block",
        protection: "Flash loan and exploit prevention"
      },
      {
        feature: "Custodian Whitelisting", 
        description: "Only approved custodians can receive collateral",
        protection: "Counterparty risk management"
      },
      {
        feature: "Insurance Fund",
        description: "Dedicated fund for emergency situations",
        protection: "Protocol and user protection"
      }
    ],
    yield: {
      sources: ["Staking rewards", "Lending interest", "DEX trading fees", "Liquidity provision"],
      mechanism: "Automated yield optimization across multiple protocols",
      distribution: "Performance-based allocation to maximize risk-adjusted returns"
    }
  },
  lab: {
    purpose: "AI-powered idea and solution incubator for community collaboration",
    capabilities: [
      "Project Knowledge Expert - Deep understanding of CAMP ecosystem",
      "Solutions Development Partner - Active collaboration on problem-solving",
      "DeFi Strategy Advisor - Personalized strategy recommendations",
      "Risk Analysis Engine - Comprehensive risk assessment",
      "Implementation Support - Step-by-step execution guidance"
    ],
    collaborativeFeatures: [
      "Interactive problem-solving sessions",
      "Solution proposal development",
      "Community voting and feedback",
      "Implementation roadmaps",
      "Progress tracking and milestones",
      "Peer collaboration facilitation"
    ],
    solutionDevelopment: {
      phases: [
        "Problem Analysis & Understanding",
        "Solution Ideation & Brainstorming", 
        "Technical Feasibility Assessment",
        "Implementation Planning",
        "Proposal Documentation",
        "Community Review & Voting",
        "Development & Deployment"
      ],
      approach: "Collaborative partnership with users to create detailed, actionable solutions",
      deliverables: [
        "Comprehensive problem analysis",
        "Detailed solution proposals",
        "Technical implementation plans",
        "Risk assessment reports",
        "Community-reviewed documentation"
      ]
    }
  },
  insurance: {
    fund: {
      size: "1 Billion USD Insurance Fund",
      purpose: "Comprehensive protection for CAMP ecosystem users and protocol operations",
      management: "Controlled by Gnosis Safe Multisig with DEFAULT_ADMIN_ROLE",
      token: "GOLDBACKBOND - Gold-backed insurance fund token"
    },
    mechanics: [
      "Automatic monitoring of protocol health",
      "Smart contract risk assessment",
      "Market volatility protection",
      "Emergency response procedures",
      "Transparent fund utilization tracking",
      "Community governance for fund decisions"
    ],
    coverage: {
      scope: [
        "Smart contract exploits and bugs",
        "Oracle failures and manipulation",
        "Custodian defaults or security breaches", 
        "Extreme market volatility events",
        "Protocol governance attacks",
        "Technical infrastructure failures"
      ],
      triggers: [
        "Verified smart contract exploits > $1M",
        "Custodian funds compromise > 5% of TVL",
        "Oracle price deviation > 10% for > 1 hour",
        "USDca depeg > 5% for > 24 hours",
        "Governance proposal execution failures"
      ],
      compensation: "Proportional coverage based on affected user funds and verified losses"
    }
  }
}

/**
 * Get specific knowledge section
 */
export const getCampKnowledge = (section: keyof CampKnowledge) => {
  return CAMP_KNOWLEDGE[section]
}

/**
 * Search knowledge base
 */
export const searchCampKnowledge = (query: string): any[] => {
  const results: any[] = []
  const searchTerms = query.toLowerCase().split(' ')
  
  const searchInObject = (obj: any, path: string = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key
      
      if (typeof value === 'string') {
        if (searchTerms.some(term => value.toLowerCase().includes(term))) {
          results.push({ path: currentPath, content: value, context: key })
        }
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'string' && searchTerms.some(term => item.toLowerCase().includes(term))) {
            results.push({ path: `${currentPath}[${index}]`, content: item, context: key })
          } else if (typeof item === 'object') {
            searchInObject(item, `${currentPath}[${index}]`)
          }
        })
      } else if (typeof value === 'object' && value !== null) {
        searchInObject(value, currentPath)
      }
    }
  }
  
  searchInObject(CAMP_KNOWLEDGE)
  return results
}

/**
 * Get collaborative context for Lab Agent
 */
export const getCollaborativeContext = (userQuery: string) => {
  const context = {
    projectOverview: CAMP_KNOWLEDGE.project,
    relevantKnowledge: searchCampKnowledge(userQuery),
    labCapabilities: CAMP_KNOWLEDGE.lab.capabilities,
    solutionProcess: CAMP_KNOWLEDGE.lab.solutionDevelopment,
    partnershipMode: true
  }
  
  return context
}
