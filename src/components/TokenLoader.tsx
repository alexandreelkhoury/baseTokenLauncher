import { useEffect, useState } from 'react'
import { useTokenDetails } from '../hooks/useTokenDetails'

interface TokenData {
  address: string
  name: string
  symbol: string
  decimals: number
  balance?: string
  logoUri?: string
}

interface TokenLoaderProps {
  tokenAddress: string
  onTokenLoaded: (token: TokenData) => void
}

export function TokenLoader({ tokenAddress, onTokenLoaded }: TokenLoaderProps) {
  const { tokenInfo, balance } = useTokenDetails(tokenAddress)

  useEffect(() => {
    if (tokenInfo) {
      onTokenLoaded({
        address: tokenAddress,
        name: tokenInfo.name,
        symbol: tokenInfo.symbol,
        decimals: tokenInfo.decimals,
        balance: balance || '0'
      })
    }
  }, [tokenInfo, balance, tokenAddress, onTokenLoaded])

  return null // This is a data-fetching component, no UI
}

interface TokenListLoaderProps {
  tokenAddresses: string[]
  onTokensLoaded: (tokens: TokenData[]) => void
}

export function TokenListLoader({ tokenAddresses, onTokensLoaded }: TokenListLoaderProps) {
  const [loadedTokens, setLoadedTokens] = useState<TokenData[]>([])
  const [loadedCount, setLoadedCount] = useState(0)

  const handleTokenLoaded = (token: TokenData) => {
    setLoadedTokens(prev => {
      const existing = prev.find(t => t.address === token.address)
      if (existing) return prev
      
      const newTokens = [...prev, token]
      setLoadedCount(newTokens.length)
      return newTokens
    })
  }

  useEffect(() => {
    if (loadedCount === tokenAddresses.length && tokenAddresses.length > 0) {
      onTokensLoaded(loadedTokens)
    }
  }, [loadedCount, tokenAddresses.length, loadedTokens, onTokensLoaded])

  useEffect(() => {
    // Reset when token addresses change
    setLoadedTokens([])
    setLoadedCount(0)
  }, [tokenAddresses])

  return (
    <>
      {tokenAddresses.map(address => (
        <TokenLoader 
          key={address} 
          tokenAddress={address} 
          onTokenLoaded={handleTokenLoaded} 
        />
      ))}
    </>
  )
}