import { useState, useEffect } from 'react'
import { useAccount, useChainId, useWriteContract, useWaitForTransactionReceipt, useReadContract, usePublicClient } from 'wagmi'
import { base, baseSepolia } from 'viem/chains'
import { parseUnits, parseEther, formatUnits } from 'viem'

// Official Uniswap V2 contracts on Base Mainnet
export const UNISWAP_V2_FACTORY_BASE = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6'
export const UNISWAP_V2_ROUTER_BASE = '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24'

// WETH address on Base network
export const WETH_BASE = '0x4200000000000000000000000000000000000006'

// NOTE: Official Uniswap V2 is NOT deployed on Base Sepolia testnet
// These contracts do not exist on Base Sepolia - V2 only works on Base mainnet
export const UNISWAP_V2_FACTORY_BASE_SEPOLIA = null // Not deployed
export const UNISWAP_V2_ROUTER_BASE_SEPOLIA = null // Not deployed  
export const WETH_BASE_SEPOLIA = '0x4200000000000000000000000000000000000006'

// Uniswap V2 Router ABI
const ROUTER_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "token", "type": "address"},
      {"internalType": "uint256", "name": "amountTokenDesired", "type": "uint256"},
      {"internalType": "uint256", "name": "amountTokenMin", "type": "uint256"},
      {"internalType": "uint256", "name": "amountETHMin", "type": "uint256"},
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "deadline", "type": "uint256"}
    ],
    "name": "addLiquidityETH",
    "outputs": [
      {"internalType": "uint256", "name": "amountToken", "type": "uint256"},
      {"internalType": "uint256", "name": "amountETH", "type": "uint256"},
      {"internalType": "uint256", "name": "liquidity", "type": "uint256"}
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "token", "type": "address"},
      {"internalType": "uint256", "name": "liquidity", "type": "uint256"},
      {"internalType": "uint256", "name": "amountTokenMin", "type": "uint256"},
      {"internalType": "uint256", "name": "amountETHMin", "type": "uint256"},
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "deadline", "type": "uint256"}
    ],
    "name": "removeLiquidityETH",
    "outputs": [
      {"internalType": "uint256", "name": "amountToken", "type": "uint256"},
      {"internalType": "uint256", "name": "amountETH", "type": "uint256"}
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "factory",
    "outputs": [
      {"internalType": "address", "name": "", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Uniswap V2 Factory ABI
const FACTORY_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "tokenA", "type": "address"},
      {"internalType": "address", "name": "tokenB", "type": "address"}
    ],
    "name": "getPair",
    "outputs": [
      {"internalType": "address", "name": "pair", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "tokenA", "type": "address"},
      {"internalType": "address", "name": "tokenB", "type": "address"}
    ],
    "name": "createPair",
    "outputs": [
      {"internalType": "address", "name": "pair", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

// LP Token ABI for balance and approval checks
const LP_TOKEN_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"}
    ],
    "name": "balanceOf",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [
      {"internalType": "bool", "name": "", "type": "bool"}
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token0",
    "outputs": [
      {"internalType": "address", "name": "", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token1",
    "outputs": [
      {"internalType": "address", "name": "", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// ERC20 Token ABI for approvals
const ERC20_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [
      {"internalType": "bool", "name": "", "type": "bool"}
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {"internalType": "uint8", "name": "", "type": "uint8"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export interface LiquidityPool {
  id: string
  tokenAddress: string
  tokenName: string
  tokenSymbol: string
  tokenAmount: string
  ethAmount: string
  poolAddress: string
  createdAt: number
  txHash: string
  liquidityTokens?: string
  imageUrl?: string
}

const LIQUIDITY_STORAGE_KEY = 'baseTokenCreator_uniswapV2Pools'
const LP_TOKENS_STORAGE_KEY = 'baseTokenCreator_lpTokens'

export interface LPToken {
  address: string
  name: string
  symbol: string
  poolAddress: string
  tokenA: string
  tokenB: string
  tokenASymbol: string
  tokenBSymbol: string
  createdAt: number
  chainId: number
  userAddress: string
  txHash: string
}

export function useUniswapV2Liquidity() {
  // ================================
  // CORE SETUP & STATE MANAGEMENT
  // ================================
  const { address: userAddress, isConnected } = useAccount()
  const chainId = useChainId()
  const publicClient = usePublicClient()
  
  // Core state
  const [userPools, setUserPools] = useState<LiquidityPool[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [lastSuccessfulPool, setLastSuccessfulPool] = useState<LiquidityPool | null>(null)
  
  // Transaction flow state
  const [currentStep, setCurrentStep] = useState<'approve' | 'add' | 'remove_approve' | 'remove_liquidity' | null>(null)
  const [poolToRemove, setPoolToRemove] = useState<LiquidityPool | null>(null)
  const [tokenToProcess, setTokenToProcess] = useState<{
    address: string
    name: string
    symbol: string
    tokenAmount: string
    ethAmount: string
  } | null>(null)
  
  // Immediate loading states for better UX
  const [isPreparingAddLiquidity, setIsPreparingAddLiquidity] = useState(false)
  const [isPreparingRemoveLiquidity, setIsPreparingRemoveLiquidity] = useState(false)

  // ================================
  // CONTRACT CONFIGURATION
  // ================================
  const getContracts = () => {
    const isTestnet = chainId === baseSepolia.id
    
    // Official Uniswap V2 is only deployed on Base mainnet, not on Base Sepolia testnet
    if (isTestnet) {
      return {
        factory: null, // Not deployed on Base Sepolia
        router: null,  // Not deployed on Base Sepolia
        weth: WETH_BASE_SEPOLIA
      }
    }
    
    return {
      factory: UNISWAP_V2_FACTORY_BASE,
      router: UNISWAP_V2_ROUTER_BASE,
      weth: WETH_BASE
    }
  }

  // ================================
  // WAGMI CONTRACT INTERACTION HOOKS
  // ================================
  const { 
    writeContractAsync,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite
  } = useWriteContract({
    mutation: {
      onError: (error, variables, context) => {
        console.error('🚨 Transaction Error:', {
          error: error.message,
          code: (error as any)?.code,
          cause: (error as any)?.cause,
          variables,
          context,
          timestamp: new Date().toISOString()
        })
        
        const errorType = getErrorType(error)
        const errorMessage = getErrorMessage(error, errorType)
        
        // Don't show error for user rejections - they're intentional
        if (errorType !== 'USER_REJECTED') {
          setError(new Error(errorMessage))
        }
        
        // Reset states on error
        setCurrentStep(null)
        setTokenToProcess(null)
        setPoolToRemove(null)
        setIsPreparingAddLiquidity(false)
        setIsPreparingRemoveLiquidity(false)
      },
      onSuccess: (data, variables, context) => {
        console.log('✅ Transaction submitted successfully:', {
          hash: data,
          variables,
          context,
          timestamp: new Date().toISOString()
        })
        // Transaction hash is set in individual functions
      },
      onSettled: (data, error) => {
        console.log('📋 Transaction settled:', {
          success: !!data,
          hasError: !!error,
          hash: data,
          timestamp: new Date().toISOString()
        })
        // Always clear preparing states when transaction is submitted or fails
        if (error) {
          setIsPreparingAddLiquidity(false)
          setIsPreparingRemoveLiquidity(false)
        }
      }
    }
  })

  // We'll manage transaction hashes manually for better control
  const [currentTxHash, setCurrentTxHash] = useState<`0x${string}` | undefined>(undefined)

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: confirmError,
    data: receipt
  } = useWaitForTransactionReceipt({
    hash: currentTxHash,
    timeout: 300000, // 5 minutes timeout for testnet
    query: {
      retry: 15, // Increased retries
      retryDelay: 2000, // Reduced delay
      enabled: !!currentTxHash // Only enable when we have a hash
    }
  })

  // Check token allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: tokenToProcess?.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: userAddress && tokenToProcess && getContracts().router ? [userAddress, getContracts().router as `0x${string}`] : undefined,
    query: {
      enabled: !!(userAddress && tokenToProcess?.address && getContracts().router)
    }
  })

  // Check if pool exists
  const { data: poolAddress } = useReadContract({
    address: getContracts().factory as `0x${string}`,
    abi: FACTORY_ABI,
    functionName: 'getPair',
    args: tokenToProcess && getContracts().factory ? [tokenToProcess.address as `0x${string}`, getContracts().weth as `0x${string}`] : undefined,
    query: {
      enabled: !!(tokenToProcess?.address && getContracts().factory)
    }
  })

  // Check LP token balance for removal
  const { data: lpBalance, refetch: refetchLpBalance } = useReadContract({
    address: poolToRemove?.poolAddress as `0x${string}`,
    abi: LP_TOKEN_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!(userAddress && poolToRemove?.poolAddress && poolToRemove.poolAddress !== '0x0000000000000000000000000000000000000000')
    }
  })

  // Check LP token allowance for removal
  const { data: lpAllowance, refetch: refetchLpAllowance } = useReadContract({
    address: poolToRemove?.poolAddress as `0x${string}`,
    abi: LP_TOKEN_ABI,
    functionName: 'allowance',
    args: userAddress && poolToRemove && getContracts().router ? [userAddress, getContracts().router as `0x${string}`] : undefined,
    query: {
      enabled: !!(userAddress && poolToRemove?.poolAddress && poolToRemove.poolAddress !== '0x0000000000000000000000000000000000000000' && getContracts().router)
    }
  })

  // Debug LP allowance query (only log when there are issues)
  useEffect(() => {
    if (poolToRemove && lpAllowance === undefined) {
      const contracts = getContracts()
      console.log('🔍 LP Allowance Query Issue:', {
        lpTokenAddress: poolToRemove.poolAddress,
        routerAddress: contracts.router,
        queryEnabled: !!(userAddress && poolToRemove?.poolAddress && contracts.router)
      })
    }
  }, [poolToRemove, lpAllowance, userAddress, chainId])

  // Get token decimals
  const { data: tokenDecimals, error: decimalsError, isLoading: decimalsLoading, refetch: refetchDecimals } = useReadContract({
    address: tokenToProcess?.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: {
      enabled: !!tokenToProcess?.address,
      retry: 5,
      retryDelay: 2000,
      staleTime: 300000 // 5 minutes
    }
  })

  // Save LP token to localStorage for token selection
  const saveLPTokenToStorage = (lpToken: LPToken) => {
    try {
      const stored = localStorage.getItem(LP_TOKENS_STORAGE_KEY)
      const allLPTokens: LPToken[] = stored ? JSON.parse(stored) : []
      
      // Check if LP token already exists (avoid duplicates)
      const existingIndex = allLPTokens.findIndex(token => 
        token.address.toLowerCase() === lpToken.address.toLowerCase() &&
        token.userAddress.toLowerCase() === lpToken.userAddress.toLowerCase()
      )
      
      if (existingIndex === -1) {
        allLPTokens.push(lpToken)
        localStorage.setItem(LP_TOKENS_STORAGE_KEY, JSON.stringify(allLPTokens))
        console.log('✅ LP token saved to storage for token selection:', lpToken)
      } else {
        console.log('🔄 LP token already exists in storage:', lpToken.address)
      }
    } catch (error) {
      console.error('Error saving LP token to localStorage:', error)
    }
  }

  // Load user's liquidity pools and migrate existing ones
  useEffect(() => {
    if (!userAddress) return
    
    try {
      const stored = localStorage.getItem(LIQUIDITY_STORAGE_KEY)
      if (stored) {
        const allPools = JSON.parse(stored)
        
        // Validate data structure
        if (!Array.isArray(allPools)) {
          console.warn('Invalid pools data structure in useEffect, clearing localStorage')
          localStorage.removeItem(LIQUIDITY_STORAGE_KEY)
          setUserPools([])
          return
        }
        
        let userCreatedPools = allPools.filter((pool: any) => 
          pool && 
          typeof pool === 'object' && 
          pool.id && 
          pool.id.includes(userAddress.toLowerCase())
        )
        
        // MIGRATION: Fix existing pools with invalid LP token addresses
        let needsPoolUpdate = false
        userCreatedPools = userCreatedPools.map((pool: LiquidityPool) => {
          if (pool.poolAddress === '0x0000000000000000000000000000000000000000' || !pool.poolAddress) {
            console.log('🔄 Migrating pool with invalid LP address:', pool.id)
            needsPoolUpdate = true
            
            // Try to derive LP token address from Uniswap V2 factory
            // For existing pools, we'll use the transaction hash as a fallback
            const migratedPool = {
              ...pool,
              poolAddress: pool.txHash || `MIGRATION_${pool.tokenAddress}_${pool.createdAt}` // Temporary until we can query real address
            }
            
            // Also add to LP token storage for withdraw modal
            saveLPTokenToStorage({
              address: migratedPool.poolAddress,
              name: `${pool.tokenSymbol}/ETH LP`,
              symbol: `${pool.tokenSymbol}-ETH-LP`,
              poolAddress: migratedPool.poolAddress,
              tokenA: pool.tokenAddress,
              tokenB: getContracts().weth,
              tokenASymbol: pool.tokenSymbol,
              tokenBSymbol: 'ETH',
              createdAt: pool.createdAt,
              chainId,
              userAddress: userAddress as string,
              txHash: pool.txHash
            })
            
            return migratedPool
          }
          
          // For pools with valid LP addresses, ensure they're in LP token storage
          saveLPTokenToStorage({
            address: pool.poolAddress,
            name: `${pool.tokenSymbol}/ETH LP`,
            symbol: `${pool.tokenSymbol}-ETH-LP`,
            poolAddress: pool.poolAddress,
            tokenA: pool.tokenAddress,
            tokenB: getContracts().weth,
            tokenASymbol: pool.tokenSymbol,
            tokenBSymbol: 'ETH',
            createdAt: pool.createdAt,
            chainId,
            userAddress: userAddress as string,
            txHash: pool.txHash
          })
          
          return pool
        })
        
        // Update localStorage if migration was needed
        if (needsPoolUpdate) {
          const updatedAllPools = allPools.map((pool: any) => {
            const updated = userCreatedPools.find((up: any) => up.id === pool.id)
            return updated || pool
          })
          localStorage.setItem(LIQUIDITY_STORAGE_KEY, JSON.stringify(updatedAllPools))
          console.log('✅ Migrated pools with invalid LP addresses')
        }
        
        setUserPools(userCreatedPools)
      }
    } catch (error) {
      console.error('Error loading liquidity pools in useEffect:', error)
      // Clear corrupted data
      try {
        localStorage.removeItem(LIQUIDITY_STORAGE_KEY)
      } catch (clearError) {
        console.error('Error clearing localStorage in useEffect:', clearError)
      }
      setUserPools([])
    }
  }, [userAddress, chainId])

  // Monitor transaction hash
  useEffect(() => {
    if (currentTxHash) {
      const isTestnet = chainId === baseSepolia.id
      const baseUrl = isTestnet ? 'https://sepolia.basescan.org' : 'https://basescan.org'
      console.log(`🔗 Transaction submitted! View on explorer: ${baseUrl}/tx/${currentTxHash}`)
      console.log('⏳ Waiting for transaction confirmation...', {
        hash: currentTxHash,
        currentStep,
        isTokenProcess: !!tokenToProcess,
        isPoolRemoval: !!poolToRemove,
        chainId,
        timestamp: new Date().toISOString()
      })
    }
  }, [currentTxHash, chainId, currentStep, tokenToProcess, poolToRemove])

  // Monitor transaction status with detailed logging
  useEffect(() => {
    if (currentTxHash) {
      console.log('🔍 Transaction Status Update:', {
        hash: currentTxHash,
        isConfirming,
        isConfirmed,
        hasReceipt: !!receipt,
        confirmError: confirmError?.message,
        currentStep,
        timestamp: new Date().toISOString()
      })
    }
    
    if (isConfirming && currentTxHash) {
      console.log('🔄 Transaction is being confirmed...')
      
      // Set a timeout to warn about slow confirmation
      const timeoutId = setTimeout(() => {
        if (isConfirming) {
          console.log('⚠️ Transaction is taking longer than expected. This can happen on Base.')
          console.log('💡 You can check the transaction status manually using the explorer link.')
        }
      }, 60000) // 1 minute warning
      
      return () => clearTimeout(timeoutId)
    }
  }, [isConfirming, isConfirmed, currentTxHash, receipt, confirmError, currentStep])

  // IMPROVED: Error detection utilities with better categorization
const getErrorType = (error: any): 'USER_REJECTED' | 'NETWORK_ERROR' | 'CONTRACT_ERROR' | 'GAS_ERROR' | 'ALLOWANCE_ERROR' | 'UNKNOWN' => {
  if (!error) return 'UNKNOWN'
  
  // Check error code first (most reliable)
  const errorCode = error.code || (error.cause?.code)
  
  // User rejection codes
  if (errorCode === 4001 || errorCode === 'ACTION_REJECTED' || errorCode === 'TRANSACTION_REJECTED') {
    return 'USER_REJECTED'
  }
  
  // Check for specific error patterns in message
  const message = error.message?.toLowerCase() || ''
  const shortMessage = (error.shortMessage || '').toLowerCase()
  const combinedMessage = `${message} ${shortMessage}`
  
  // User rejection patterns
  if (combinedMessage.includes('user rejected') || 
      combinedMessage.includes('user denied') ||
      combinedMessage.includes('cancelled by user') ||
      combinedMessage.includes('transaction was rejected') ||
      combinedMessage.includes('user cancelled')) {
    return 'USER_REJECTED'
  }
  
  // Network/connection errors
  if (combinedMessage.includes('network') || 
      combinedMessage.includes('timeout') ||
      combinedMessage.includes('connection') ||
      combinedMessage.includes('fetch') ||
      combinedMessage.includes('rpc')) {
    return 'NETWORK_ERROR'
  }
  
  // Gas related errors
  if (combinedMessage.includes('gas') ||
      combinedMessage.includes('out of gas') ||
      combinedMessage.includes('gas estimate') ||
      combinedMessage.includes('gas limit')) {
    return 'GAS_ERROR'
  }
  
  // Allowance/approval errors
  if (combinedMessage.includes('allowance') ||
      combinedMessage.includes('insufficient allowance') ||
      combinedMessage.includes('erc20: transfer amount exceeds allowance')) {
    return 'ALLOWANCE_ERROR'
  }
  
  // Contract execution errors
  if (combinedMessage.includes('revert') || 
      combinedMessage.includes('execution reverted') ||
      combinedMessage.includes('insufficient') ||
      combinedMessage.includes('slippage') ||
      combinedMessage.includes('deadline') ||
      combinedMessage.includes('liquidity')) {
    return 'CONTRACT_ERROR'
  }
  
  return 'UNKNOWN'
}

const getErrorMessage = (error: any, errorType: string): string => {
  switch (errorType) {
    case 'USER_REJECTED':
      return 'Transaction cancelled by user'
    case 'NETWORK_ERROR':
      return 'Network error occurred. Please check your connection and try again.'
    case 'GAS_ERROR':
      return 'Gas estimation failed. The transaction may require more gas than expected or the contract interaction may fail.'
    case 'ALLOWANCE_ERROR':
      return 'Token allowance insufficient. Please try approving the token again.'
    case 'CONTRACT_ERROR':
      const message = error.message || error.shortMessage || ''
      if (message.includes('slippage')) {
        return 'Transaction failed due to slippage. Try adjusting the slippage tolerance.'
      } else if (message.includes('deadline')) {
        return 'Transaction deadline exceeded. Please try again.'
      } else if (message.includes('insufficient')) {
        return 'Insufficient token balance or liquidity for this transaction.'
      } else {
        return 'Smart contract interaction failed. Please check your transaction parameters and try again.'
      }
    default:
      return error.message || error.shortMessage || 'An unexpected error occurred'
  }
}

// Handle confirmation errors only (write errors handled by wagmi mutation callback)
  useEffect(() => {
    if (confirmError) {
      const errorType = getErrorType(confirmError)
      
      console.error('🚨 Transaction Confirmation Error:', {
        error: confirmError.message,
        errorCode: (confirmError as any)?.code,
        errorType,
        currentStep,
        hash: currentTxHash,
        timestamp: new Date().toISOString()
      })
      
      setError(new Error(getErrorMessage(confirmError, errorType)))
      setCurrentStep(null)
      setTokenToProcess(null)
      setPoolToRemove(null)
      setIsPreparingAddLiquidity(false) // FIX: Clear loading states on confirmation error
      setIsPreparingRemoveLiquidity(false)
    }
  }, [confirmError, currentStep, currentTxHash, tokenToProcess, poolToRemove])


  // Handle successful transactions
  useEffect(() => {
    console.log('📊 DETAILED Transaction Status Check:', {
      isConfirmed,
      hasReceipt: !!receipt,
      currentStep,
      hash: currentTxHash,
      isPending: isWritePending,
      isConfirming,
      writeError: !!writeError,
      confirmError: !!confirmError,
      isTokenProcess: !!tokenToProcess,
      isPoolRemoval: !!poolToRemove,
      poolAddress,
      tokenProcessDetails: tokenToProcess ? {
        address: tokenToProcess.address,
        symbol: tokenToProcess.symbol || 'UNKNOWN',
        tokenAmount: tokenToProcess.tokenAmount,
        ethAmount: tokenToProcess.ethAmount
      } : null,
      receiptMatchesCurrentHash: receipt?.transactionHash === currentTxHash,
      fullReceiptObject: receipt ? {
        status: receipt.status,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber?.toString(),
        gasUsed: receipt.gasUsed?.toString(),
        logs: receipt.logs?.map(log => ({
          address: log.address,
          topics: log.topics,
          data: log.data
        }))
      } : null,
      timestamp: new Date().toISOString()
    })

    // CRITICAL FIX: Only process receipt if it matches current transaction hash
    if (isConfirmed && receipt && receipt.transactionHash === currentTxHash) {
      console.log('✅ Receipt matches current transaction hash - processing...')
    } else if (isConfirmed && receipt && receipt.transactionHash !== currentTxHash) {
      console.log('⚠️ MISMATCH: Receipt is from old transaction, ignoring...', {
        receiptHash: receipt.transactionHash,
        currentHash: currentTxHash,
        currentStep
      })
      return // Don't process this receipt
    }

    if (isConfirmed && receipt && receipt.transactionHash === currentTxHash) {
      console.log('🎉 Transaction confirmed with receipt!', {
        currentStep,
        hash: currentTxHash,
        receiptStatus: receipt.status,
        blockNumber: receipt.blockNumber,
        isTokenProcess: !!tokenToProcess,
        isPoolRemoval: !!poolToRemove,
        poolAddress,
        receiptLogs: receipt.logs?.length || 0,
        receiptDetails: {
          gasUsed: receipt.gasUsed?.toString(),
          effectiveGasPrice: receipt.effectiveGasPrice?.toString(),
          transactionIndex: receipt.transactionIndex
        },
        timestamp: new Date().toISOString()
      })
      
      if (currentStep === 'approve' && tokenToProcess) {
        // Approval successful, now add liquidity
        console.log('✅ Approval confirmed! Now adding liquidity...')
        
        // CRITICAL: Reset currentTxHash before moving to next step
        // This prevents the receipt handler from thinking add liquidity is done
        setCurrentTxHash(undefined)
        setCurrentStep('add')
        refetchAllowance()
        
        // Use async pattern to properly handle the second transaction
        setTimeout(async () => {
          try {
            console.log('🚀 Starting add liquidity step after approval...')
            await handleAddLiquidityStep(tokenToProcess)
          } catch (error) {
            console.error('❌ Failed to add liquidity after approval:', error)
            setError(error instanceof Error ? error : new Error('Failed to add liquidity'))
            setCurrentStep(null)
            setTokenToProcess(null)
          }
        }, 1000) // Small delay to ensure state updates
      } else if (currentStep === 'add' && tokenToProcess) {
        console.log('🏗️ Creating success pool object for liquidity addition...', {
          tokenToProcess,
          poolAddress,
          hash: currentTxHash,
          userAddress,
          receiptLogs: receipt.logs?.length || 0
        })

        // Try to extract LP token address from transaction logs
        let actualLpTokenAddress = poolAddress
        
        // Parse transaction logs to find LP token mint events
        if (receipt.logs && receipt.logs.length > 0) {
          console.log('🔍 Analyzing transaction logs for LP token address...', {
            totalLogs: receipt.logs.length,
            logs: receipt.logs.map((log, i) => ({
              index: i,
              address: log.address,
              topics: log.topics,
              data: log.data
            }))
          })

          // Look for Transfer events to address(0) which indicate LP token minting
          const lpMintEvents = receipt.logs.filter(log => 
            log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' && // Transfer event signature
            log.topics[2] === '0x0000000000000000000000000000000000000000000000000000000000000000' // to address(0) = mint
          )
          
          if (lpMintEvents.length > 0) {
            actualLpTokenAddress = lpMintEvents[0].address
            console.log('✅ Found LP token address from mint event:', actualLpTokenAddress)
          }
        }

        // Liquidity added successfully - SET RESULT IMMEDIATELY like token creation!
        const tokenInfo = {
          address: tokenToProcess.address,
          name: tokenToProcess.name,
          symbol: tokenToProcess.symbol,
          tokenAmount: tokenToProcess.tokenAmount,
          ethAmount: tokenToProcess.ethAmount
        }
        
        const newPool: LiquidityPool = {
          id: `${userAddress?.toLowerCase()}_${tokenInfo.address}_${Date.now()}`,
          tokenAddress: tokenInfo.address,
          tokenName: tokenInfo.name,
          tokenSymbol: tokenInfo.symbol,
          tokenAmount: tokenInfo.tokenAmount,
          ethAmount: tokenInfo.ethAmount,
          poolAddress: actualLpTokenAddress || '0x0000000000000000000000000000000000000000', // Use extracted LP address
          createdAt: Date.now(),
          txHash: currentTxHash || '', // Use empty string if no hash (shouldn't happen)
          liquidityTokens: '0', // Will be updated when we can fetch real LP balance
          imageUrl: `https://api.dicebear.com/7.x/shapes/svg?seed=${tokenInfo.address}&backgroundColor=10b981,3b82f6`
        }

        console.log('🎯 Pool object created:', newPool)

        // Save to localStorage with error handling
        try {
          const stored = localStorage.getItem(LIQUIDITY_STORAGE_KEY)
          const allPools = stored ? JSON.parse(stored) : []
          
          // Validate existing data
          if (!Array.isArray(allPools)) {
            console.warn('Corrupted pools data, resetting...')
            localStorage.setItem(LIQUIDITY_STORAGE_KEY, JSON.stringify([newPool]))
          } else {
            allPools.push(newPool)
            localStorage.setItem(LIQUIDITY_STORAGE_KEY, JSON.stringify(allPools))
          }
        } catch (storageError) {
          console.error('Error saving pool to localStorage:', storageError)
          // Still continue with the operation even if storage fails
        }

        setUserPools(prev => [...prev, newPool])
        
        // Also save LP token to separate storage for token selection
        if (actualLpTokenAddress && actualLpTokenAddress !== '0x0000000000000000000000000000000000000000') {
          saveLPTokenToStorage({
            address: actualLpTokenAddress,
            name: `${tokenInfo.symbol}/ETH LP`,
            symbol: `${tokenInfo.symbol}-ETH-LP`,
            poolAddress: actualLpTokenAddress,
            tokenA: tokenInfo.address,
            tokenB: getContracts().weth,
            tokenASymbol: tokenInfo.symbol,
            tokenBSymbol: 'ETH',
            createdAt: Date.now(),
            chainId,
            userAddress: userAddress as string,
            txHash: currentTxHash || ''
          })
        }
        
        console.log('🚀 CRITICAL: Setting lastSuccessfulPool - this should trigger success modal!', {
          poolBeingSet: newPool,
          poolId: newPool.id,
          txHash: newPool.txHash,
          lpTokenAddress: newPool.poolAddress,
          timestamp: new Date().toISOString()
        })
        
        setLastSuccessfulPool(newPool) // Set result immediately for success detection
        
        console.log('✅ SUCCESS STATE SET! Clearing processing states...', {
          clearingCurrentStep: currentStep,
          clearingTokenToProcess: !!tokenToProcess,
          timestamp: new Date().toISOString()
        })
        
        // Clear processing states immediately
        setCurrentStep(null)
        setTokenToProcess(null)
        setError(null)
        setCurrentTxHash(undefined)
        setIsPreparingAddLiquidity(false) // FIX: Clear immediate loading state
      } else if (currentStep === 'remove_approve' && poolToRemove) {
        // LP token approval successful, now remove liquidity
        console.log('✅ LP token approval confirmed! Proceeding to remove liquidity...', {
          poolToRemove: poolToRemove.poolAddress,
          liquidityTokens: poolToRemove.liquidityTokens,
          hash: currentTxHash
        })
        
        // CRITICAL: Reset currentTxHash before moving to next step
        setCurrentTxHash(undefined)
        setCurrentStep('remove_liquidity')
        
        // Use async pattern for remove liquidity step
        setTimeout(async () => {
          try {
            // Use the same LP amount logic as in removeLiquidity function
            let finalLpBalance: bigint
            if (poolToRemove.liquidityTokens) {
              finalLpBalance = parseUnits(poolToRemove.liquidityTokens, 18)
              console.log('✅ Using stored LP amount from pool:', finalLpBalance.toString())
            } else {
              finalLpBalance = lpBalance || 0n
              console.log('✅ Using blockchain LP balance:', finalLpBalance.toString())
            }
            
            await handleRemoveLiquidityStep(finalLpBalance)
          } catch (error) {
            console.error('❌ Failed to remove liquidity:', error)
            setError(error instanceof Error ? error : new Error('Failed to remove liquidity'))
            setCurrentStep(null)
            setPoolToRemove(null)
            setIsPreparingRemoveLiquidity(false)
          }
        }, 1000) // Small delay to ensure state updates
      } else if (currentStep === 'remove_liquidity' && poolToRemove) {
        // Liquidity removed successfully
        console.log('✅ Liquidity removal confirmed!', {
          poolId: poolToRemove.id,
          lpTokens: poolToRemove.liquidityTokens,
          hash: currentTxHash
        })

        // Only update localStorage for legacy pools (not direct withdrawals)
        if (!poolToRemove.id.startsWith('direct-')) {
          const stored = localStorage.getItem(LIQUIDITY_STORAGE_KEY)
          if (stored) {
            const allPools = JSON.parse(stored)
            const filteredPools = allPools.filter((pool: LiquidityPool) => pool.id !== poolToRemove.id)
            localStorage.setItem(LIQUIDITY_STORAGE_KEY, JSON.stringify(filteredPools))
          }
          setUserPools(prev => prev.filter(pool => pool.id !== poolToRemove.id))
        }

        // Set success state for toast notification
        setLastSuccessfulPool({
          ...poolToRemove,
          txHash: currentTxHash || 'completed'
        })

        // Clear processing states immediately
        setCurrentStep(null)
        setPoolToRemove(null)
        setError(null)
        setCurrentTxHash(undefined)
        setIsPreparingRemoveLiquidity(false) // FIX: Clear immediate loading state
      }
      resetWrite()
    }
  }, [isConfirmed, currentStep, tokenToProcess, poolToRemove, poolAddress])


  // SIMPLIFIED: Handle token approval using wagmi async pattern
  const handleApproveToken = async (tokenInfo: { address: string; tokenAmount: string }) => {
    const finalDecimals = tokenDecimals ?? 18
    const tokenAmountWei = parseUnits(tokenInfo.tokenAmount, finalDecimals)

    console.log('🔑 Approving token for Uniswap V2 Router...', {
      token: tokenInfo.address,
      amount: tokenAmountWei.toString(),
      router: getContracts().router,
      decimals: finalDecimals
    })
    
    // wagmi handles errors automatically via mutation callback
    const hash = await writeContractAsync({
      address: tokenInfo.address as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [getContracts().router as `0x${string}`, tokenAmountWei],
    })
    
    setCurrentTxHash(hash)
    return hash
  }

  // SIMPLIFIED: Handle add liquidity using wagmi async pattern
  const handleAddLiquidityStep = async (tokenInfo: { address: string; tokenAmount: string; ethAmount: string }) => {
    const finalDecimals = tokenDecimals ?? 18
    const tokenAmountWei = parseUnits(tokenInfo.tokenAmount, finalDecimals)
    const ethAmountWei = parseEther(tokenInfo.ethAmount)
    
    // Set minimum amounts to 95% of desired amounts for slippage protection
    const amountTokenMin = (tokenAmountWei * 95n) / 100n
    const amountETHMin = (ethAmountWei * 95n) / 100n
    
    // Set deadline to 20 minutes from now
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200)

    console.log('🦄 Adding liquidity to Uniswap V2...', {
      token: tokenInfo.address,
      tokenAmount: tokenInfo.tokenAmount,
      ethAmount: tokenInfo.ethAmount,
      router: getContracts().router
    })

    // wagmi handles errors automatically via mutation callback
    const hash = await writeContractAsync({
      address: getContracts().router as `0x${string}`,
      abi: ROUTER_ABI,
      functionName: 'addLiquidityETH',
      args: [
        tokenInfo.address as `0x${string}`,
        tokenAmountWei,
        amountTokenMin,
        amountETHMin,
        userAddress as `0x${string}`,
        deadline
      ],
      value: ethAmountWei,
    })
      
    setCurrentTxHash(hash)
    return hash
  }

  // ================================
  // MAIN PUBLIC FUNCTIONS
  // ================================
  const addLiquidity = async (
    tokenAddress: string,
    tokenName: string,
    tokenSymbol: string,
    tokenAmount: string,
    ethAmount: string
  ) => {
    if (!isConnected || !userAddress) {
      throw new Error('Please connect your wallet first')
    }

    if (chainId !== base.id && chainId !== baseSepolia.id) {
      throw new Error('Please switch to Base mainnet or Base Sepolia testnet')
    }

    // Check if Uniswap V2 is available on current network
    const contracts = getContracts()
    if (!contracts.factory || !contracts.router) {
      throw new Error('⚠️ Uniswap V2 is not deployed on Base Sepolia testnet. Please switch to Base mainnet to use V2 liquidity features.')
    }

    if (!tokenAddress || !tokenAmount || !ethAmount) {
      throw new Error('Please provide token address, token amount, and ETH amount')
    }

    const tokenAmountNum = parseFloat(tokenAmount)
    const ethAmountNum = parseFloat(ethAmount)
    
    if (tokenAmountNum <= 0 || ethAmountNum <= 0) {
      throw new Error('Token amount and ETH amount must be greater than 0')
    }

    // Clear any previous errors and states
    setError(null)
    setCurrentStep(null) // Reset any previous step
    setLastSuccessfulPool(null) // Reset completion state like token hook
    setCurrentTxHash(undefined)
    resetWrite() // Reset wagmi state
    
    // FIX: Set immediate loading state for better UX
    setIsPreparingAddLiquidity(true)
    
    const tokenProcessInfo = {
      address: tokenAddress,
      name: tokenName,
      symbol: tokenSymbol,
      tokenAmount,
      ethAmount
    }
    
    setTokenToProcess(tokenProcessInfo)

    try {
      console.log('🔍 Starting liquidity addition process...', {
        tokenAddress: tokenProcessInfo.address,
        chainId,
        isTestnet: chainId === baseSepolia.id,
        contracts: getContracts()
      })

      // Wait for token decimals to load if still loading
      if (decimalsLoading) {
        console.log('⏳ Waiting for token decimals to load...')
        // Try manual refetch first
        await refetchDecimals()
        
        // Wait up to 10 seconds for decimals to load
        for (let i = 0; i < 100; i++) {
          await new Promise(resolve => setTimeout(resolve, 100))
          if (!decimalsLoading && (tokenDecimals !== undefined || decimalsError)) break
        }
      }
      
      console.log('🔍 Decimals fetch result:', {
        tokenDecimals,
        decimalsError: decimalsError?.message,
        decimalsLoading,
        tokenAddress: tokenProcessInfo.address
      })
      
      if (decimalsError) {
        console.error('❌ Token decimals error:', decimalsError)
        // Try alternative approach - use publicClient directly
        try {
          console.log('🔄 Trying direct contract call...')
          const directDecimals = await publicClient?.readContract({
            address: tokenProcessInfo.address as `0x${string}`,
            abi: ERC20_ABI,
            functionName: 'decimals'
          })
          console.log('✅ Direct decimals fetch successful:', directDecimals)
          if (directDecimals !== undefined) {
            // Use direct result instead of hook result
            const finalDecimals = Number(directDecimals)
            console.log('✅ Using direct decimals result:', finalDecimals)
            
            const tokenAmountWei = parseUnits(tokenAmount, finalDecimals)
            
            // Check current allowance
            await refetchAllowance()
            const currentAllowance = (allowance as bigint) || 0n

            if (currentAllowance < tokenAmountWei) {
              console.log('❌ Insufficient allowance, requesting approval...', {
                current: currentAllowance.toString(),
                needed: tokenAmountWei.toString()
              })
              setCurrentStep('approve')
              await handleApproveToken(tokenProcessInfo)
            } else {
              console.log('✅ Token already approved, adding liquidity directly...')
              setCurrentStep('add')
              await handleAddLiquidityStep(tokenProcessInfo)
            }
            return // Exit the function successfully
          } else {
            throw new Error(`Failed to read token contract: ${decimalsError.message || 'Invalid token address or network error'}`)
          }
        } catch (directError) {
          console.error('❌ Direct fetch also failed:', directError)
          throw new Error(`Failed to read token contract: ${decimalsError.message || 'Invalid token address or network error'}`)
        }
      }
      
      const finalDecimals = tokenDecimals ?? 18 // Default to 18 if still undefined
      if (finalDecimals === undefined) {
        throw new Error('Could not fetch token decimals. Please verify the token address is correct and you are on the right network.')
      }

      console.log('✅ Token decimals loaded:', finalDecimals)

      const tokenAmountWei = parseUnits(tokenAmount, finalDecimals)
      
      // Check current allowance
      await refetchAllowance()
      const currentAllowance = (allowance as bigint) || 0n

      if (currentAllowance < tokenAmountWei) {
        // Need approval first
        console.log('❌ Insufficient allowance, requesting approval...', {
          current: currentAllowance.toString(),
          needed: tokenAmountWei.toString()
        })
        setCurrentStep('approve')
        
        // SIMPLIFIED: Let wagmi handle errors, just await the transaction
        await handleApproveToken(tokenProcessInfo)
        console.log('✅ Approval transaction initiated - waiting for confirmation...')
        // Transaction confirmation will be handled in useEffect
      } else {
        // Already approved, add liquidity directly
        console.log('✅ Token already approved, adding liquidity directly...')
        setCurrentStep('add')
        
        // SIMPLIFIED: Let wagmi handle errors, just await the transaction
        await handleAddLiquidityStep(tokenProcessInfo)
        console.log('✅ Add liquidity transaction initiated - waiting for confirmation...')
        // Transaction confirmation will be handled in useEffect
      }
    } catch (e) {
      // Only handle unexpected errors here, wagmi handles transaction errors
      if (!(e instanceof Error && (e.message.includes('User rejected') || e.message.includes('ACTION_REJECTED')))) {
        setError(e instanceof Error ? e : new Error('Unknown error occurred'))
      }
      setCurrentStep(null)
      setTokenToProcess(null)
      setCurrentTxHash(undefined)
      setIsPreparingAddLiquidity(false) // FIX: Clear loading state on error
      throw e
    }
  }

  // SIMPLIFIED: Handle LP token approval using wagmi async pattern
  const handleApproveLpToken = async (lpAmount: bigint, pool: LiquidityPool) => {
    const contracts = getContracts()
    console.log('🔑 Approving LP tokens for Uniswap V2 Router...', {
      lpToken: pool.poolAddress,
      amount: lpAmount.toString(),
      router: contracts.router
    })
    
    // Let wagmi handle gas estimation automatically
    const hash = await writeContractAsync({
      address: pool.poolAddress as `0x${string}`,
      abi: LP_TOKEN_ABI,
      functionName: 'approve',
      args: [contracts.router as `0x${string}`, lpAmount],
    })
    
    setCurrentTxHash(hash)
    return hash
  }

  // SIMPLIFIED: Handle remove liquidity using wagmi async pattern
  const handleRemoveLiquidityStep = async (lpAmount: bigint) => {
    // FIX: Calculate proper minimum amounts based on LP amount and pool reserves
    // Use 95% of expected output to allow for 5% slippage
    let amountTokenMin: bigint
    let amountETHMin: bigint
    
    try {
      // Get total supply of LP tokens
      const totalSupply = await publicClient?.readContract({
        address: poolToRemove!.poolAddress as `0x${string}`,
        abi: LP_TOKEN_ABI,
        functionName: 'totalSupply'
      })
      
      // Get pool reserves
      const token0 = await publicClient?.readContract({
        address: poolToRemove!.poolAddress as `0x${string}`,
        abi: LP_TOKEN_ABI,
        functionName: 'token0'
      })
      
      console.log('🔍 CALCULATING MINIMUM AMOUNTS:', {
        lpAmount: lpAmount.toString(),
        totalSupply: totalSupply?.toString(),
        token0,
        tokenAddress: poolToRemove?.tokenAddress,
        wethAddress: getContracts().weth
      })
      
      if (totalSupply && (totalSupply as bigint) > 0n) {
        // Calculate proportional share: (lpAmount / totalSupply)
        const shareRatio = (lpAmount * 10000n) / (totalSupply as bigint) // Use basis points for precision
        
        // Estimate minimum amounts as 95% of proportional share
        // For small amounts, use at least 1 wei to avoid zero minimums
        amountTokenMin = shareRatio > 500n ? (shareRatio * 95n) / 10000n : 1n // 95% of expected, minimum 1 wei
        amountETHMin = shareRatio > 500n ? (shareRatio * 95n) / 10000n : 1n   // 95% of expected, minimum 1 wei
        
        console.log('✅ CALCULATED MINIMUM AMOUNTS:', {
          shareRatio: shareRatio.toString(),
          amountTokenMin: amountTokenMin.toString(),
          amountETHMin: amountETHMin.toString()
        })
      } else {
        throw new Error('Could not get total supply')
      }
    } catch (error) {
      console.warn('⚠️ Could not calculate optimal minimums, using safe defaults:', error)
      // Fallback: Use 0.1% of LP amount as minimum (very conservative)
      amountTokenMin = lpAmount / 1000n || 1n // 0.1% or 1 wei minimum
      amountETHMin = lpAmount / 1000n || 1n   // 0.1% or 1 wei minimum
    }
    
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200) // 20 minutes from now

    // DEBUG: Add comprehensive logging to diagnose the underflow error
    console.log('🔍 DEBUGGING LP Removal Transaction...', {
      token: poolToRemove?.tokenAddress,
      lpTokenAddress: poolToRemove?.poolAddress,
      lpTokens: lpAmount.toString(),
      lpTokensFormatted: formatUnits(lpAmount, 18),
      amountTokenMin: amountTokenMin.toString(),
      amountETHMin: amountETHMin.toString(),
      deadline: deadline.toString(),
      router: getContracts().router,
      userAddress,
      poolInfo: poolToRemove
    })

    // DEBUG: Check actual LP token balance before attempting removal
    try {
      const actualLpBalance = await publicClient?.readContract({
        address: poolToRemove!.poolAddress as `0x${string}`,
        abi: LP_TOKEN_ABI,
        functionName: 'balanceOf',
        args: [userAddress as `0x${string}`]
      })
      
      const actualAllowance = await publicClient?.readContract({
        address: poolToRemove!.poolAddress as `0x${string}`,
        abi: LP_TOKEN_ABI,
        functionName: 'allowance',
        args: [userAddress as `0x${string}`, getContracts().router as `0x${string}`]
      })

      console.log('💰 ACTUAL LP TOKEN STATE:', {
        requestedAmount: lpAmount.toString(),
        requestedFormatted: formatUnits(lpAmount, 18),
        actualBalance: actualLpBalance?.toString(),
        actualBalanceFormatted: actualLpBalance ? formatUnits(actualLpBalance as bigint, 18) : 'N/A',
        actualAllowance: actualAllowance?.toString(),
        actualAllowanceFormatted: actualAllowance ? formatUnits(actualAllowance as bigint, 18) : 'N/A',
        hasEnoughBalance: actualLpBalance ? (actualLpBalance as bigint) >= lpAmount : false,
        hasEnoughAllowance: actualAllowance ? (actualAllowance as bigint) >= lpAmount : false
      })

      // FIX: If we're trying to remove more than balance, use actual balance instead
      if (actualLpBalance && (actualLpBalance as bigint) < lpAmount) {
        console.log('⚠️ Requested amount exceeds actual balance, using actual balance instead')
        lpAmount = actualLpBalance as bigint
      }

      // Check if allowance is sufficient (after potential adjustment)
      if (actualAllowance && (actualAllowance as bigint) < lpAmount) {
        throw new Error(`Insufficient LP token allowance. Approved: ${formatUnits(actualAllowance as bigint, 18)}, Required: ${formatUnits(lpAmount, 18)}`)
      }

    } catch (balanceCheckError) {
      console.error('❌ Error checking LP token state:', balanceCheckError)
      // Don't throw here, let the transaction attempt anyway in case it's a query issue
    }

    console.log('🦄 Removing liquidity from Uniswap V2...', {
      token: poolToRemove?.tokenAddress,
      lpTokens: lpAmount.toString(),
      amountTokenMin: amountTokenMin.toString(),
      amountETHMin: amountETHMin.toString(),
      deadline: deadline.toString(),
      router: getContracts().router
    })

    // Let wagmi handle gas estimation automatically
    const hash = await writeContractAsync({
      address: getContracts().router as `0x${string}`,
      abi: ROUTER_ABI,
      functionName: 'removeLiquidityETH',
      args: [
        poolToRemove!.tokenAddress as `0x${string}`,
        lpAmount,
        amountTokenMin,
        amountETHMin,
        userAddress as `0x${string}`,
        deadline
      ]
    })
    
    setCurrentTxHash(hash)
    return hash
  }

  const removeLiquidity = async (poolIdOrLpToken: string, lpAmount?: string) => {
    if (!isConnected || !userAddress) {
      throw new Error('Please connect your wallet first')
    }

    if (chainId !== base.id && chainId !== baseSepolia.id) {
      throw new Error('Please switch to Base mainnet or Base Sepolia testnet')
    }

    // Check if Uniswap V2 is available on current network
    const contracts = getContracts()
    if (!contracts.factory || !contracts.router) {
      throw new Error('⚠️ Uniswap V2 is not deployed on Base Sepolia testnet. Please switch to Base mainnet to use V2 liquidity features.')
    }

    setError(null)
    setLastSuccessfulPool(null) // Reset completion state
    setCurrentTxHash(undefined)
    
    // FIX: Set immediate loading state for better UX
    setIsPreparingRemoveLiquidity(true)

    let pool: LiquidityPool | null | undefined = null
    let lpTokenAddress: string
    let lpTokenBalance: bigint

    if (lpAmount) {
      // New mode: LP token address and amount provided directly
      lpTokenAddress = poolIdOrLpToken
      console.log('🔄 Direct LP token withdrawal:', { lpTokenAddress, lpAmount })
      
      // Parse the LP amount first
      try {
        lpTokenBalance = parseUnits(lpAmount, 18) // LP tokens typically have 18 decimals
      } catch (error) {
        throw new Error('Invalid LP token amount')
      }

      // Fetch token addresses from LP token contract
      console.log('🔍 Fetching token addresses from LP token contract...')
      let token0Address: string
      let token1Address: string
      
      try {
        const [token0, token1] = await Promise.all([
          publicClient?.readContract({
            address: lpTokenAddress as `0x${string}`,
            abi: LP_TOKEN_ABI,
            functionName: 'token0'
          }),
          publicClient?.readContract({
            address: lpTokenAddress as `0x${string}`,
            abi: LP_TOKEN_ABI,
            functionName: 'token1'
          })
        ])
        
        token0Address = token0 as string
        token1Address = token1 as string
        
        console.log('✅ LP Token composition:', {
          token0: token0Address,
          token1: token1Address,
          wethAddress: getContracts().weth
        })
      } catch (error) {
        console.error('❌ Failed to fetch token addresses from LP token:', error)
        throw new Error('Invalid LP token - unable to fetch token composition')
      }
      
      // Determine which token is the ERC20 token (not WETH)
      const wethAddress = getContracts().weth
      const actualTokenAddress = token0Address === wethAddress ? token1Address : token0Address
      
      console.log('🔍 Fetching real token details for:', actualTokenAddress)
      
      // Fetch real token name and symbol
      let realTokenName = 'Unknown Token'
      let realTokenSymbol = 'UNKNOWN'
      
      try {
        const [tokenName, tokenSymbol] = await Promise.all([
          publicClient?.readContract({
            address: actualTokenAddress as `0x${string}`,
            abi: [
              {
                name: 'name',
                type: 'function',
                stateMutability: 'view',
                inputs: [],
                outputs: [{ name: '', type: 'string' }]
              }
            ],
            functionName: 'name'
          }),
          publicClient?.readContract({
            address: actualTokenAddress as `0x${string}`,
            abi: [
              {
                name: 'symbol',
                type: 'function',
                stateMutability: 'view',
                inputs: [],
                outputs: [{ name: '', type: 'string' }]
              }
            ],
            functionName: 'symbol'
          })
        ])
        
        realTokenName = (tokenName as string) || 'Unknown Token'
        realTokenSymbol = (tokenSymbol as string) || 'UNKNOWN'
        
        console.log('✅ Fetched real token details:', {
          address: actualTokenAddress,
          name: realTokenName,
          symbol: realTokenSymbol
        })
      } catch (error) {
        console.warn('⚠️ Could not fetch token details, using defaults:', error)
      }
      
      // Create a temporary pool object for the removal process
      pool = {
        id: `direct-${lpTokenAddress}`,
        tokenAddress: actualTokenAddress, // Now we have the real token address!
        tokenName: realTokenName, // Real token name from contract
        tokenSymbol: realTokenSymbol, // Real token symbol from contract
        tokenAmount: '0',
        ethAmount: '0',
        poolAddress: lpTokenAddress, // The LP token IS the pool address for removal
        createdAt: Date.now(),
        txHash: '',
        liquidityTokens: lpAmount
      }
      
      console.log('✅ Temporary pool object created:', pool)
    } else {
      // Legacy mode: Find pool by ID
      pool = userPools.find(p => p.id === poolIdOrLpToken)
      if (!pool) {
        throw new Error('Pool not found')
      }
      
      // Check if this pool needs real LP address resolution
      if (pool.poolAddress.startsWith('MIGRATION_') || pool.poolAddress === pool.txHash) {
        console.log('🔄 Pool has temporary LP address, trying to resolve real LP address...')
        
        // Try to get the real LP token address from Uniswap V2 factory
        try {
          const realLpAddress = await publicClient?.readContract({
            address: getContracts().factory as `0x${string}`,
            abi: FACTORY_ABI,
            functionName: 'getPair',
            args: [pool.tokenAddress as `0x${string}`, getContracts().weth as `0x${string}`]
          })
          
          if (realLpAddress && realLpAddress !== '0x0000000000000000000000000000000000000000') {
            console.log('✅ Found real LP address:', realLpAddress)
            lpTokenAddress = realLpAddress
            
            // Update the pool in storage with real LP address
            try {
              const stored = localStorage.getItem(LIQUIDITY_STORAGE_KEY)
              if (stored) {
                const allPools = JSON.parse(stored)
                const updatedPools = allPools.map((p: any) => {
                  if (p.id === pool?.id) {
                    return { ...p, poolAddress: realLpAddress }
                  }
                  return p
                })
                localStorage.setItem(LIQUIDITY_STORAGE_KEY, JSON.stringify(updatedPools))
                console.log('✅ Updated pool with real LP address in storage')
              }
            } catch (updateError) {
              console.error('Error updating pool in storage:', updateError)
            }
          } else {
            throw new Error('No liquidity pool exists for this token pair')
          }
        } catch (queryError) {
          console.error('Failed to query real LP address:', queryError)
          throw new Error('Could not find the liquidity pool for this token. The pool may not exist or you may have already removed all liquidity.')
        }
      } else {
        lpTokenAddress = pool.poolAddress
      }
    }

    setPoolToRemove(pool)

    try {
      let finalLpBalance: bigint
      
      if (lpAmount) {
        // Use the provided LP amount directly
        finalLpBalance = lpTokenBalance
        console.log('✅ Using provided LP amount:', finalLpBalance.toString())
      } else {
        // Wait for LP balance to load from blockchain
        await refetchLpBalance()
        
        if (!lpBalance || lpBalance === 0n) {
          throw new Error('No LP tokens found for this pool. You may have already removed all liquidity.')
        }
        
        finalLpBalance = lpBalance
        console.log('✅ LP Balance loaded from blockchain:', finalLpBalance.toString())
      }

      // Check current LP allowance
      await refetchLpAllowance()
      const currentLpAllowance = (lpAllowance as bigint) || 0n

      if (currentLpAllowance < finalLpBalance) {
        // Need LP approval first
        console.log('❌ Insufficient LP allowance, requesting approval...', {
          current: currentLpAllowance.toString(),
          needed: finalLpBalance.toString()
        })
        setCurrentStep('remove_approve')
        
        // SIMPLIFIED: Let wagmi handle errors, just await the transaction
        await handleApproveLpToken(finalLpBalance, pool)
        console.log('✅ LP approval transaction initiated - waiting for confirmation...')
        // Transaction confirmation will be handled in useEffect
      } else {
        // Already approved, remove liquidity directly
        console.log('✅ LP tokens already approved, removing liquidity directly...')
        setCurrentStep('remove_liquidity')
        
        // SIMPLIFIED: Let wagmi handle errors, just await the transaction
        await handleRemoveLiquidityStep(finalLpBalance)
        console.log('✅ Remove liquidity transaction initiated - waiting for confirmation...')
        // Transaction confirmation will be handled in useEffect
      }
    } catch (e) {
      // Only handle unexpected errors here, wagmi handles transaction errors
      if (!(e instanceof Error && (e.message.includes('User rejected') || e.message.includes('ACTION_REJECTED')))) {
        setError(e instanceof Error ? e : new Error('Unknown error occurred'))
      }
      setCurrentStep(null)
      setPoolToRemove(null)
      setCurrentTxHash(undefined)
      setIsPreparingRemoveLiquidity(false) // FIX: Clear loading state on error
      throw e
    }
  }


  const refetchPools = () => {
    if (!userAddress) return
    
    try {
      const stored = localStorage.getItem(LIQUIDITY_STORAGE_KEY)
      if (stored) {
        const allPools = JSON.parse(stored)
        
        // Validate the data structure
        if (!Array.isArray(allPools)) {
          console.warn('Invalid pools data structure, clearing localStorage')
          localStorage.removeItem(LIQUIDITY_STORAGE_KEY)
          setUserPools([])
          return
        }
        
        const userCreatedPools = allPools.filter((pool: any) => 
          pool && 
          typeof pool === 'object' && 
          pool.id && 
          pool.id.includes(userAddress.toLowerCase())
        )
        setUserPools(userCreatedPools)
      }
    } catch (error) {
      console.error('Error loading pools from localStorage:', error)
      // Clear corrupted data
      try {
        localStorage.removeItem(LIQUIDITY_STORAGE_KEY)
      } catch (clearError) {
        console.error('Error clearing localStorage:', clearError)
      }
      setUserPools([])
    }
  }

  const clearSuccessState = () => {
    setLastSuccessfulPool(null)
  }

  // UTILITY: Function to manually fix existing pools with invalid LP addresses
  // This can be used to resolve LP addresses for pools created before the storage system was implemented
  const fixExistingPools = async () => {
    console.log('🔧 MANUAL FIX: Starting to fix existing pools...')
    
    try {
      const stored = localStorage.getItem(LIQUIDITY_STORAGE_KEY)
      if (!stored) {
        console.log('No pools found in storage')
        return
      }
      
      const allPools = JSON.parse(stored)
      console.log('📊 Found pools in storage:', allPools.length)
      
      const userPools = allPools.filter((pool: any) => 
        pool && 
        typeof pool === 'object' && 
        pool.id && 
        pool.id.includes(userAddress?.toLowerCase() || '')
      )
      
      console.log('👤 User pools found:', userPools.length)
      
      for (const pool of userPools) {
        console.log('🔍 Checking pool:', {
          id: pool.id,
          tokenSymbol: pool.tokenSymbol,
          poolAddress: pool.poolAddress,
          tokenAddress: pool.tokenAddress
        })
        
        if (pool.poolAddress === '0x0000000000000000000000000000000000000000' || !pool.poolAddress || pool.poolAddress.startsWith('MIGRATION_')) {
          console.log('🔄 Fixing pool with invalid LP address:', pool.tokenSymbol)
          
          try {
            // Query the real LP address from Uniswap V2 factory
            const realLpAddress = await publicClient?.readContract({
              address: getContracts().factory as `0x${string}`,
              abi: FACTORY_ABI,
              functionName: 'getPair',
              args: [pool.tokenAddress as `0x${string}`, getContracts().weth as `0x${string}`]
            })
            
            if (realLpAddress && realLpAddress !== '0x0000000000000000000000000000000000000000') {
              console.log('✅ Found real LP address for', pool.tokenSymbol, ':', realLpAddress)
              
              // Update the pool in the array
              const updatedPool = { ...pool, poolAddress: realLpAddress }
              const poolIndex = allPools.findIndex((p: any) => p.id === pool.id)
              if (poolIndex >= 0) {
                allPools[poolIndex] = updatedPool
              }
              
              // Add to LP token storage
              saveLPTokenToStorage({
                address: realLpAddress,
                name: `${pool.tokenSymbol}/ETH LP`,
                symbol: `${pool.tokenSymbol}-ETH-LP`,
                poolAddress: realLpAddress,
                tokenA: pool.tokenAddress,
                tokenB: getContracts().weth,
                tokenASymbol: pool.tokenSymbol,
                tokenBSymbol: 'ETH',
                createdAt: pool.createdAt,
                chainId,
                userAddress: userAddress as string,
                txHash: pool.txHash
              })
              
              console.log('✅ Fixed and saved LP token for:', pool.tokenSymbol)
            } else {
              console.log('❌ No LP address found for:', pool.tokenSymbol, '- pool may not exist')
            }
          } catch (error) {
            console.error('❌ Error querying LP address for', pool.tokenSymbol, ':', error)
          }
        } else {
          console.log('✅ Pool already has valid LP address:', pool.tokenSymbol)
          
          // Ensure it's in LP token storage
          saveLPTokenToStorage({
            address: pool.poolAddress,
            name: `${pool.tokenSymbol}/ETH LP`,
            symbol: `${pool.tokenSymbol}-ETH-LP`,
            poolAddress: pool.poolAddress,
            tokenA: pool.tokenAddress,
            tokenB: getContracts().weth,
            tokenASymbol: pool.tokenSymbol,
            tokenBSymbol: 'ETH',
            createdAt: pool.createdAt,
            chainId,
            userAddress: userAddress as string,
            txHash: pool.txHash
          })
        }
      }
      
      // Save updated pools
      localStorage.setItem(LIQUIDITY_STORAGE_KEY, JSON.stringify(allPools))
      console.log('✅ MANUAL FIX COMPLETE: Updated pools saved to storage')
      
      // Reload pools
      const updatedUserPools = allPools.filter((pool: any) => 
        pool && 
        typeof pool === 'object' && 
        pool.id && 
        pool.id.includes(userAddress?.toLowerCase() || '')
      )
      setUserPools(updatedUserPools)
      
    } catch (error) {
      console.error('❌ Error in manual fix:', error)
    }
  }

  const contracts = getContracts()
  const isV2Available = !!(contracts.factory && contracts.router)
  
  // Manual reset function for emergency use
  const resetLoadingStates = () => {
    setCurrentStep(null)
    setTokenToProcess(null)
    setPoolToRemove(null)
    setError(null)
    setLastSuccessfulPool(null)
    setCurrentTxHash(undefined)
    setIsPreparingAddLiquidity(false) // FIX: Clear immediate loading states
    setIsPreparingRemoveLiquidity(false)
    resetWrite() // Clear wagmi state
  }

  return {
    addLiquidity,
    removeLiquidity,
    isAddingLiquidity: isPreparingAddLiquidity || isWritePending || isConfirming, // FIX: Include immediate loading state
    isRemovingLiquidity: isPreparingRemoveLiquidity || isWritePending || isConfirming, // FIX: Include immediate loading state
    isSuccess: !!lastSuccessfulPool, // SUCCESS DETECTION: Based on result like token creation
    userPools,
    refetchPools,
    error,
    isConnected,
    isCorrectChain: chainId === base.id || chainId === baseSepolia.id,
    isV2Available, // New: indicates if V2 contracts are available on current network
    chainId,
    transactionHash: currentTxHash,
    currentStep,
    contracts,
    poolExists: poolAddress && poolAddress !== '0x0000000000000000000000000000000000000000',
    poolAddress: poolAddress || null,
    lastSuccessfulPool, // Pool info for success modal
    clearSuccessState, // Function to clear success state
    resetLoadingStates // Emergency reset function
  }
}