// Contract ABIs (minimal — only functions used by the frontend)
// Auto-generated from CAMP DeFi smart contracts (feature/camp-contracts)

export const CAMP_INSURANCE_FUND_ABI = [
  {
    name: "totalReserve",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "liquidBalance",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "stakedBalance",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "fundingRatioBps",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "bps", type: "uint256" }],
  },
  {
    name: "isFullyFunded",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "TARGET_RESERVE",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "FundTapped",
    type: "event",
    inputs: [
      { name: "recipient", type: "address", indexed: true },
      { name: "amount",    type: "uint256", indexed: false },
      { name: "reason",    type: "string",  indexed: false },
    ],
  },
] as const;

export const SUSDCA_ABI = [
  {
    name: "totalAssets",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "totalShares",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "assetsOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

export const CAMP_CYCLE_MANAGER_ABI = [
  {
    name: "currentCycleId",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "timeUntilCycleEnd",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "isCycleActive",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export const CAMP_DUAL_POOL_VAULT_ABI = [
  {
    name: "totalTVL",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "liquid", type: "uint256" },
      { name: "staked", type: "uint256" },
    ],
  },
  {
    name: "getParticipant",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "p", type: "address" }],
    outputs: [{
      name: "",
      type: "tuple",
      components: [
        { name: "liquidBalance",      type: "uint256" },
        { name: "stakedShares",       type: "uint256" },
        { name: "tier",               type: "uint8"   },
        { name: "lastDepositTime",    type: "uint256" },
        { name: "kycVerified",        type: "bool"    },
        { name: "accreditedInvestor", type: "bool"    },
      ],
    }],
  },
] as const;

// Contract Addresses (Base Testnet — update after deployment)
export const BASE_TESTNET_CHAIN_ID = 84532;
export const BASE_MAINNET_CHAIN_ID = 8453;

export const CONTRACT_ADDRESSES = {
  [BASE_TESTNET_CHAIN_ID]: {
    insuranceFund: "0x0000000000000000000000000000000000000000" as `0x${string}`,
    sUSDca:        "0x0000000000000000000000000000000000000000" as `0x${string}`,
    cycleManager:  "0x0000000000000000000000000000000000000000" as `0x${string}`,
    dualPoolVault: "0x0000000000000000000000000000000000000000" as `0x${string}`,
    usdca:         "0x0000000000000000000000000000000000000000" as `0x${string}`,
  },
} as const;

export function getContractAddress(
  chainId: number,
  contract: keyof typeof CONTRACT_ADDRESSES[typeof BASE_TESTNET_CHAIN_ID]
): `0x${string}` {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
  if (!addresses) throw new Error(`No contract addresses for chainId ${chainId}`);
  return addresses[contract];
}
