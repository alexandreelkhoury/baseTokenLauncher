import { useAccount, useChainId, useReadContract } from 'wagmi'
import { base, baseSepolia } from 'viem/chains'
import { formatUnits } from 'viem'
import { OPENZEPPELIN_ERC20_ABI } from '../contracts/OpenZeppelinERC20Artifacts'

export function useTokenDetails(tokenAddress: string) {
  const { address: userAddress } = useAccount()
  const chainId = useChainId()

  // Check if we're on a supported Base network
  const isBaseNetwork = chainId === base.id || chainId === baseSepolia.id

  // Read token name
  const { data: tokenName } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: OPENZEPPELIN_ERC20_ABI,
    functionName: 'name',
    query: {
      enabled: !!tokenAddress && isBaseNetwork,
    },
  })

  // Read token symbol
  const { data: tokenSymbol } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: OPENZEPPELIN_ERC20_ABI,
    functionName: 'symbol',
    query: {
      enabled: !!tokenAddress && isBaseNetwork,
    },
  })

  // Read token decimals
  const { data: tokenDecimals } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: OPENZEPPELIN_ERC20_ABI,
    functionName: 'decimals',
    query: {
      enabled: !!tokenAddress && isBaseNetwork,
    },
  })

  // Read total supply
  const { data: totalSupply } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: OPENZEPPELIN_ERC20_ABI,
    functionName: 'totalSupply',
    query: {
      enabled: !!tokenAddress && isBaseNetwork,
    },
  })

  // Read user balance
  const { data: balance } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: OPENZEPPELIN_ERC20_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!tokenAddress && !!userAddress && isBaseNetwork,
    },
  })

  // Generate token image based on address
  const generateTokenImage = (address: string): string => {
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${address}&backgroundColor=3b82f6,8b5cf6,10b981&size=100`
  }

  const tokenInfo = tokenName && tokenSymbol && tokenDecimals !== undefined && totalSupply !== undefined ? {
    name: tokenName as string,
    symbol: tokenSymbol as string,
    decimals: tokenDecimals as number,
    totalSupply: formatUnits(totalSupply as bigint, tokenDecimals as number),
    creator: userAddress,
    imageUrl: generateTokenImage(tokenAddress)
  } : null

  const userBalance = balance && tokenDecimals !== undefined ? 
    formatUnits(balance as bigint, tokenDecimals as number) : '0'

  // Debug logging
  console.log(`🔍 useTokenDetails for ${tokenAddress}:`, {
    chainId,
    isBaseNetwork,
    tokenName,
    tokenSymbol,
    tokenDecimals,
    totalSupply: totalSupply?.toString(),
    hasTokenInfo: !!tokenInfo
  })

  return {
    tokenInfo,
    balance: userBalance
  }
}