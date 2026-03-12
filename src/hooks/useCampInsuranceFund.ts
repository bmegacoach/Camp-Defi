import { useReadContracts, useWatchContractEvent } from "wagmi";
import { useChainId } from "wagmi";
import { formatUnits } from "viem";
import { useCallback, useState } from "react";
import {
  CAMP_INSURANCE_FUND_ABI,
  getContractAddress,
} from "../lib/contracts";

export interface InsuranceFundData {
  totalReserve:    string;
  liquidBalance:   string;
  stakedBalance:   string;
  fundingRatioBps: number;
  fundingPercent:  number;
  isFullyFunded:   boolean;
  targetReserve:   string;
  isLoading:       boolean;
  error:           Error | null;
}

export interface TapEvent {
  recipient:   string;
  amount:      string;
  reason:      string;
  txHash:      string;
  blockNumber: bigint;
}

export function useCampInsuranceFund(): InsuranceFundData & {
  tapHistory: TapEvent[];
  refetch: () => void;
} {
  const chainId = useChainId();
  const [tapHistory, setTapHistory] = useState<TapEvent[]>([]);

  let contractAddress: `0x${string}` | undefined;
  try {
    contractAddress = getContractAddress(chainId, "insuranceFund");
    if (contractAddress === "0x0000000000000000000000000000000000000000") {
      contractAddress = undefined;
    }
  } catch {
    contractAddress = undefined;
  }

  const contractConfig = contractAddress
    ? { address: contractAddress, abi: CAMP_INSURANCE_FUND_ABI }
    : undefined;

  const { data, isLoading, error, refetch } = useReadContracts({
    contracts: contractConfig
      ? [
          { ...contractConfig, functionName: "totalReserve"    },
          { ...contractConfig, functionName: "liquidBalance"   },
          { ...contractConfig, functionName: "fundingRatioBps" },
          { ...contractConfig, functionName: "isFullyFunded"   },
          { ...contractConfig, functionName: "TARGET_RESERVE"  },
        ]
      : [],
    query: {
      enabled: !!contractAddress,
      refetchInterval: 12_000,
    },
  });

  useWatchContractEvent({
    address: contractAddress,
    abi: CAMP_INSURANCE_FUND_ABI,
    eventName: "FundTapped",
    onLogs: useCallback((logs: any[]) => {
      const newEvents = logs.map((log) => ({
        recipient:   log.args?.recipient ?? "",
        amount:      formatUnits(log.args?.amount ?? 0n, 18),
        reason:      log.args?.reason ?? "",
        txHash:      log.transactionHash ?? "",
        blockNumber: log.blockNumber ?? 0n,
      }));
      setTapHistory((prev) => [...newEvents, ...prev].slice(0, 50));
    }, []),
    enabled: !!contractAddress,
  });

  const [total, liquid, ratioBps, fullFunded, target] = data ?? [];

  const totalReserveRaw  = (total?.result   as bigint | undefined) ?? 0n;
  const liquidBalanceRaw = (liquid?.result  as bigint | undefined) ?? 0n;
  const fundingRatioRaw  = (ratioBps?.result as bigint | undefined) ?? 0n;
  const isFullyFundedRaw = (fullFunded?.result as boolean | undefined) ?? false;
  const targetReserveRaw = (target?.result  as bigint | undefined) ?? 0n;
  const stakedBalanceRaw = totalReserveRaw > liquidBalanceRaw
    ? totalReserveRaw - liquidBalanceRaw
    : 0n;

  return {
    totalReserve:    formatUnits(totalReserveRaw,  18),
    liquidBalance:   formatUnits(liquidBalanceRaw, 18),
    stakedBalance:   formatUnits(stakedBalanceRaw, 18),
    fundingRatioBps: Number(fundingRatioRaw),
    fundingPercent:  Number(fundingRatioRaw) / 100,
    isFullyFunded:   isFullyFundedRaw,
    targetReserve:   formatUnits(targetReserveRaw, 18),
    isLoading,
    error:           error ?? null,
    tapHistory,
    refetch,
  };
}
