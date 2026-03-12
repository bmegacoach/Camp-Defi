import { useReadContracts } from "wagmi";
import { useChainId, useAccount } from "wagmi";
import { formatUnits } from "viem";
import {
  CAMP_DUAL_POOL_VAULT_ABI,
  CAMP_CYCLE_MANAGER_ABI,
  getContractAddress,
} from "../lib/contracts";

export interface VaultData {
  liquidTVL:           string;
  stakedTVL:           string;
  totalTVL:            string;
  currentCycleId:      number;
  isCycleActive:       boolean;
  secondsUntilEnd:     number;
  daysUntilGraduation: number;
  isLoading:           boolean;
}

export interface ParticipantPosition {
  liquidBalance: string;
  stakedShares:  string;
  tier:          number;
  tierName:      string;
  kycVerified:   boolean;
  accredited:    boolean;
  isLoading:     boolean;
}

const TIER_NAMES = ["None", "Bronze", "Silver", "Gold", "Platinum"] as const;

function safeGetAddress(chainId: number, key: Parameters<typeof getContractAddress>[1]): `0x${string}` | undefined {
  try {
    const addr = getContractAddress(chainId, key);
    return addr === "0x0000000000000000000000000000000000000000" ? undefined : addr;
  } catch {
    return undefined;
  }
}

export function useCampVault(): VaultData {
  const chainId  = useChainId();
  const vaultAddr = safeGetAddress(chainId, "dualPoolVault");
  const cycleAddr = safeGetAddress(chainId, "cycleManager");

  const contracts = [
    vaultAddr ? { address: vaultAddr, abi: CAMP_DUAL_POOL_VAULT_ABI, functionName: "totalTVL" as const } : undefined,
    cycleAddr ? { address: cycleAddr, abi: CAMP_CYCLE_MANAGER_ABI, functionName: "currentCycleId" as const } : undefined,
    cycleAddr ? { address: cycleAddr, abi: CAMP_CYCLE_MANAGER_ABI, functionName: "isCycleActive" as const } : undefined,
    cycleAddr ? { address: cycleAddr, abi: CAMP_CYCLE_MANAGER_ABI, functionName: "timeUntilCycleEnd" as const } : undefined,
  ].filter((c): c is NonNullable<typeof c> => !!c);

  const { data, isLoading } = useReadContracts({
    contracts,
    query: { enabled: !!(vaultAddr && cycleAddr), refetchInterval: 30_000 },
  });

  const [tvlResult, cycleIdResult, activeResult, timeResult] = data ?? [];
  const [liquid, staked] = (tvlResult?.result as [bigint, bigint] | undefined) ?? [0n, 0n];
  const secondsUntilEnd  = Number((timeResult?.result as bigint | undefined) ?? 0n);

  return {
    liquidTVL:           formatUnits(liquid, 18),
    stakedTVL:           formatUnits(staked, 18),
    totalTVL:            formatUnits(liquid + staked, 18),
    currentCycleId:      Number((cycleIdResult?.result as bigint | undefined) ?? 0n),
    isCycleActive:       (activeResult?.result as boolean | undefined) ?? false,
    secondsUntilEnd,
    daysUntilGraduation: Math.ceil(secondsUntilEnd / 86400),
    isLoading,
  };
}

export function useParticipantPosition(): ParticipantPosition {
  const chainId     = useChainId();
  const { address } = useAccount();
  const vaultAddr   = safeGetAddress(chainId, "dualPoolVault");

  const { data, isLoading } = useReadContracts({
    contracts: vaultAddr && address ? [{
      address:      vaultAddr,
      abi:          CAMP_DUAL_POOL_VAULT_ABI,
      functionName: "getParticipant" as const,
      args:         [address],
    }] : [],
    query: { enabled: !!(vaultAddr && address), refetchInterval: 15_000 },
  });

  const info = data?.[0]?.result as any;
  const tier = Number(info?.tier ?? 0);

  return {
    liquidBalance: formatUnits(info?.liquidBalance ?? 0n, 18),
    stakedShares:  formatUnits(info?.stakedShares  ?? 0n, 18),
    tier,
    tierName:      TIER_NAMES[tier] ?? "None",
    kycVerified:   info?.kycVerified       ?? false,
    accredited:    info?.accreditedInvestor ?? false,
    isLoading,
  };
}
