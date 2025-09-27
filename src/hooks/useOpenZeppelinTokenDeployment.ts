import { useState, useEffect, useRef } from 'react'
import { useAccount, useChainId, useSwitchChain, useDeployContract, useWaitForTransactionReceipt, usePublicClient } from 'wagmi'
import { base, baseSepolia } from 'viem/chains'
import { parseEther } from 'viem'
import { PAID_ERC20_ABI, PAID_ERC20_BYTECODE, FEE_AMOUNT, FEE_RECIPIENT } from '../contracts/PaidERC20Artifacts'
import { verifyContract, encodeConstructorArguments, getPaidERC20SourceCode } from '../utils/contractVerification'

export interface TokenData {
  name: string
  symbol: string
  totalSupply: string
  decimals: number
}

interface CreatedToken extends TokenData {
  address: string
  creator: string
  createdAt: number
  txHash: string
  chainId: number
  imageUrl?: string
}

// Storage for user tokens
const STORAGE_KEY = 'baseTokens_openZeppelinDeployments'

export function useOpenZeppelinTokenDeployment() {
  const { address: userAddress, isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const publicClient = usePublicClient()
  
  const [createdTokenAddress, setCreatedTokenAddress] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [userTokens, setUserTokens] = useState<CreatedToken[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed' | null>(null)
  const hasInitiallyLoaded = useRef(false)

  // Deploy OpenZeppelin-based contract - THIS TRIGGERS REAL METAMASK POPUP! 🎯
  const { 
    deployContract, 
    data: hash, 
    isPending: isDeployPending,
    error: deployError
  } = useDeployContract()

  // Wait for deployment confirmation  
  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: confirmError,
    data: receipt
  } = useWaitForTransactionReceipt({
    hash,
  })

  // Load user tokens from localStorage on mount
  useEffect(() => {
    console.log('📡 useEffect triggered - userAddress:', userAddress, 'chainId:', chainId, 'hasInitiallyLoaded:', hasInitiallyLoaded.current)
    if (userAddress) {
      loadUserTokens()
    } else {
      // No user address yet, set initial loading to false immediately
      if (!hasInitiallyLoaded.current) {
        console.log('⚡ No userAddress, setting isInitialLoading to false')
        setIsInitialLoading(false)
        hasInitiallyLoaded.current = true
      }
    }
  }, [userAddress, publicClient, chainId])

  // Handle successful deployment
  useEffect(() => {
    if (isConfirmed && receipt && userAddress) {
      const newTokenAddress = receipt.contractAddress
      if (newTokenAddress) {
        setCreatedTokenAddress(newTokenAddress)
        addTokenToStorage(newTokenAddress, hash!)
        
        // Wait a moment for the contract to be available, then fetch real data
        setTimeout(() => {
          updateTokenWithContractData(newTokenAddress, hash!)
        }, 2000)
        
        loadUserTokens()

        // Start contract verification after successful deployment
        verifyDeployedContract(newTokenAddress)
      }
    }
  }, [isConfirmed, receipt, userAddress, hash, publicClient])

  // Handle errors with detailed debugging
  useEffect(() => {
    if (deployError) {
      console.error('🚨 DEPLOYMENT ERROR DETAILS:')
      console.error('Full error object:', deployError)
      console.error('Error message:', deployError.message)
      console.error('Error name:', deployError.name)
      console.error('Error stack:', deployError.stack)
      
      let cleanMessage = 'Deployment failed'
      
      // Handle common error cases with user-friendly messages
      if (deployError.message?.includes('User rejected')) {
        cleanMessage = 'Transaction cancelled - You rejected the wallet signature'
      } else if (deployError.message?.includes('insufficient funds')) {
        cleanMessage = 'Insufficient funds - You need more ETH for gas fees'
      } else if (deployError.message?.includes('gas required exceeds allowance')) {
        cleanMessage = 'Gas limit too low - Try increasing gas limit in wallet'
      } else if (deployError.message?.includes('nonce too low')) {
        cleanMessage = 'Transaction conflict - Try resetting your wallet account'
      } else if (deployError.message?.includes('already known')) {
        cleanMessage = 'Transaction already pending - Please wait or try again'
      } else if (deployError.message?.includes('replacement transaction underpriced')) {
        cleanMessage = 'Transaction underpriced - Increase gas price and try again'
      } else if (deployError.message?.includes('Internal JSON-RPC error')) {
        cleanMessage = `MetaMask RPC Error: ${deployError.message} - Try refreshing page or switching networks`
      } else {
        // Show more of the actual error for debugging
        cleanMessage = `Deployment Error: ${deployError.message}`
      }
      
      setError(new Error(cleanMessage))
    } else if (confirmError) {
      let cleanMessage = 'Transaction confirmation failed'
      
      if (confirmError.message?.includes('timeout')) {
        cleanMessage = 'Transaction timeout - Network is congested, try again'
      } else if (confirmError.message?.includes('reverted')) {
        cleanMessage = 'Transaction failed - Contract deployment was rejected by network'
      } else {
        cleanMessage = confirmError.message?.split('Request Arguments:')[0]?.trim() || cleanMessage
      }
      
      setError(new Error(cleanMessage))
    }
  }, [deployError, confirmError])

  const loadUserTokens = async () => {
    if (!userAddress) return
    
    setIsRefreshing(true)
    console.log('🔄 loadUserTokens called, isInitialLoading:', isInitialLoading)
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        let allTokens: CreatedToken[] = JSON.parse(stored)
        
        // Migration: Add chainId to existing tokens that don't have it
        let needsUpdate = false
        allTokens = allTokens.map(token => {
          if (token.chainId === undefined) {
            needsUpdate = true
            // Assume existing tokens without chainId are from current network
            return { ...token, chainId }
          }
          return token
        })
        
        // Update localStorage if migration was needed
        if (needsUpdate) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(allTokens))
          console.log('🔄 Migrated existing tokens to include chainId')
        }
        
        const userCreatedTokens = allTokens.filter(token => 
          token.creator.toLowerCase() === userAddress.toLowerCase() &&
          token.chainId === chainId
        )
        
        console.log(`🔍 Token filtering results:`)
        console.log(`- Current chainId: ${chainId}`)
        console.log(`- Total tokens in storage: ${allTokens.length}`)
        console.log(`- User tokens on current network: ${userCreatedTokens.length}`)
        console.log(`- Filtered tokens:`, userCreatedTokens.map(t => ({ name: t.name, symbol: t.symbol, chainId: t.chainId, address: t.address })))
        
        setUserTokens(userCreatedTokens)
        
        // Check if any tokens need updating (have "Loading..." data)
        const tokensNeedingUpdate = userCreatedTokens.filter(token => 
          token.name === 'Loading...' || token.symbol === 'LOADING'
        )
        
        // Update tokens with loading data
        tokensNeedingUpdate.forEach(token => {
          setTimeout(() => {
            updateTokenWithContractData(token.address, token.txHash)
          }, 1000)
        })
      }
      
      // Add a small delay only for initial loading to ensure user sees loading state
      if (isInitialLoading) {
        await new Promise(resolve => setTimeout(resolve, 300))
      }
    } catch (error) {
      console.error('Error loading user tokens:', error)
    } finally {
      setIsRefreshing(false)
      if (!hasInitiallyLoaded.current) {
        setIsInitialLoading(false)
        hasInitiallyLoaded.current = true
        console.log('✅ First time loading completed, setting isInitialLoading to false')
      }
    }
  }

  const addTokenToStorage = (tokenAddress: string, txHash: string) => {
    // Store basic info - real details will be fetched from blockchain
    const newToken: CreatedToken = {
      address: tokenAddress,
      name: 'Loading...', // Will be updated when we read from contract
      symbol: 'LOADING',
      totalSupply: '0',
      decimals: 18,
      creator: userAddress!,
      createdAt: Date.now(),
      txHash,
      chainId,
      imageUrl: generateTokenImage(tokenAddress)
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const allTokens: CreatedToken[] = stored ? JSON.parse(stored) : []
      allTokens.push(newToken)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allTokens))
    } catch (error) {
      console.error('Error saving token to storage:', error)
    }
  }

  const generateTokenImage = (tokenAddress: string): string => {
    // Generate a unique avatar for the token
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${tokenAddress}&backgroundColor=3b82f6,8b5cf6,10b981&size=100`
  }

  const updateTokenWithContractData = async (tokenAddress: string, txHash: string) => {
    if (!publicClient || !userAddress) return

    try {
      console.log('🔄 Fetching real token data from contract:', tokenAddress)
      
      // Fetch token details from deployed contract
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        publicClient.readContract({
          address: tokenAddress as `0x${string}`,
          abi: OPENZEPPELIN_ERC20_ABI,
          functionName: 'name'
        }) as Promise<string>,
        publicClient.readContract({
          address: tokenAddress as `0x${string}`,
          abi: OPENZEPPELIN_ERC20_ABI,
          functionName: 'symbol'
        }) as Promise<string>,
        publicClient.readContract({
          address: tokenAddress as `0x${string}`,
          abi: OPENZEPPELIN_ERC20_ABI,
          functionName: 'decimals'
        }) as Promise<number>,
        publicClient.readContract({
          address: tokenAddress as `0x${string}`,
          abi: OPENZEPPELIN_ERC20_ABI,
          functionName: 'totalSupply'
        }) as Promise<bigint>
      ])

      // Update the token in storage with real data
      const updatedToken: CreatedToken = {
        address: tokenAddress,
        name: name as string,
        symbol: symbol as string,
        totalSupply: totalSupply.toString(),
        decimals: Number(decimals),
        creator: userAddress,
        createdAt: Date.now(),
        txHash,
        chainId,
        imageUrl: generateTokenImage(tokenAddress)
      }

      // Update localStorage
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        const allTokens: CreatedToken[] = stored ? JSON.parse(stored) : []
        
        // Find and update the token with matching address
        const tokenIndex = allTokens.findIndex(token => token.address.toLowerCase() === tokenAddress.toLowerCase())
        if (tokenIndex >= 0) {
          allTokens[tokenIndex] = updatedToken
          localStorage.setItem(STORAGE_KEY, JSON.stringify(allTokens))
          console.log('✅ Updated token with real contract data:', updatedToken)
          
          // Refresh user tokens state
          loadUserTokens()
        }
      } catch (error) {
        console.error('❌ Error updating token in storage:', error)
      }
    } catch (error) {
      console.error('❌ Error fetching token contract data:', error)
    }
  }

  // Store token data for verification
  const pendingTokenDataRef = useRef<TokenData | null>(null)

  const verifyDeployedContract = async (contractAddress: string) => {
    if (!pendingTokenDataRef.current) {
      console.warn('⚠️ No token data available for verification')
      return
    }

    const tokenData = pendingTokenDataRef.current
    
    try {
      setIsVerifying(true)
      setVerificationStatus('pending')
      
      console.log('🔍 Starting contract verification...')
      
      // Encode constructor arguments for verification
      const constructorArgs = encodeConstructorArguments(
        tokenData.name,
        tokenData.symbol,
        BigInt(tokenData.totalSupply) * BigInt(10 ** tokenData.decimals),
        FEE_RECIPIENT
      )

      const verificationResult = await verifyContract({
        contractAddress,
        sourceCode: getPaidERC20SourceCode(),
        contractName: 'PaidERC20',
        compilerVersion: 'v0.8.20+commit.a1b79de6', // Solidity 0.8.20
        constructorArguments: constructorArgs,
        chainId
      })

      if (verificationResult.success) {
        console.log('✅ Contract verification submitted successfully!')
        setVerificationStatus('success')
      } else {
        console.error('❌ Contract verification failed:', verificationResult.message)
        setVerificationStatus('failed')
      }

    } catch (error) {
      console.error('❌ Error during contract verification:', error)
      setVerificationStatus('failed')
    } finally {
      setIsVerifying(false)
    }
  }

  const createToken = async (tokenData: TokenData) => {
    if (!isConnected || !userAddress) {
      throw new Error('Please connect your wallet first')
    }

    // Check if on Base mainnet or Base Sepolia testnet
    if (chainId !== base.id && chainId !== baseSepolia.id) {
      try {
        // Try Base mainnet first, fallback to Base Sepolia
        await switchChain({ chainId: base.id })
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (e) {
        try {
          await switchChain({ chainId: baseSepolia.id })
          await new Promise(resolve => setTimeout(resolve, 1000))
        } catch (e2) {
          throw new Error('Please switch to Base mainnet or Base Sepolia testnet to create tokens')
        }
      }
    }

    setError(null)
    setCreatedTokenAddress(null)
    setVerificationStatus(null)

    // Store token data for later verification
    pendingTokenDataRef.current = tokenData

    try {
      console.log('🚀 Attempting token deployment...')
      console.log('User address:', userAddress)
      console.log('Chain ID:', chainId)
      console.log('Token data:', tokenData)
      
      // Check if we have all required data
      if (!tokenData.name || !tokenData.symbol || !tokenData.totalSupply) {
        throw new Error('Missing required token data')
      }
      
      console.log('🚀 Deploying PaidERC20 token with 0.02 ETH fee...')
      console.log('Token data:', tokenData)
      console.log('Fee amount:', FEE_AMOUNT, 'wei (0.02 ETH)')
      console.log('Fee recipient:', FEE_RECIPIENT)
      
      deployContract({
        bytecode: PAID_ERC20_BYTECODE as `0x${string}`,
        abi: PAID_ERC20_ABI,
        args: [
          tokenData.name,                    // string name
          tokenData.symbol,                  // string symbol  
          BigInt(tokenData.totalSupply),     // uint256 initialSupply
          FEE_RECIPIENT as `0x${string}`     // address feeRecipient
        ],
        value: parseEther('0.02'), // 0.02 ETH fee payment
      })

      // What happens after clicking "Confirm" in MetaMask:
      // 1. Transaction is broadcast to Base Sepolia network
      // 2. Miners/validators process the transaction
      // 3. Real ERC20 contract is deployed with your parameters  
      // 4. You get a real contract address that's verifiable on BaseScan
      // 5. The contract is fully functional - you can transfer tokens, check balances, etc!

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred'
      setError(new Error(errorMessage))
      throw e
    }
  }

  return {
    createToken,
    isCreating: isDeployPending || isConfirming,
    isSuccess: !!createdTokenAddress,
    createdTokenAddress,
    userTokens,
    refetchUserTokens: loadUserTokens,
    isRefreshing,
    isInitialLoading,
    error,
    isConnected,
    chainId,
    isCorrectChain: chainId === base.id || chainId === baseSepolia.id,
    transactionHash: hash,
    isVerifying,
    verificationStatus,
    feeAmount: '0.02', // For UI display
    feeRecipient: FEE_RECIPIENT
  }
}