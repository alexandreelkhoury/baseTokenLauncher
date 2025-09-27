import { motion, AnimatePresence } from 'framer-motion'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useAccount, useSwitchChain } from 'wagmi'
import { base, baseSepolia } from 'viem/chains'
import { useState, useRef, useEffect } from 'react'
import { colors, typography } from '../styles/designSystem'
import { useGlobalToasts } from '../App'

export default function WalletButton() {
  const { ready, authenticated, user, login, logout } = usePrivy()
  const { wallets } = useWallets()
  const { chain, isConnected, address } = useAccount()
  const { switchChain } = useSwitchChain()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showCopiedFeedback, setShowCopiedFeedback] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const toasts = useGlobalToasts()
  
  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDropdownOpen])

  // Get the active wallet's chain info
  const activeWallet = wallets.find(wallet => 
    wallet.walletClientType === 'privy' || 
    wallet.walletClientType === 'metamask' ||
    wallet.walletClientType === 'coinbase_wallet' ||
    wallet.walletClientType === 'wallet_connect'
  )
  const walletChainId = activeWallet?.chainId
  
  // Helper function to get chain info from chain ID
  const getChainInfo = (chainId: string | number | undefined) => {
    let numChainId: number | undefined
    
    if (typeof chainId === 'string') {
      if (chainId.startsWith('eip155:')) {
        numChainId = parseInt(chainId.split(':')[1])
      } else {
        numChainId = parseInt(chainId)
      }
    } else {
      numChainId = chainId
    }
    
    switch (numChainId) {
      case base.id: // 8453
        return { name: 'Base Mainnet', color: 'text-green-400', isBase: true, icon: '🔵' }
      case baseSepolia.id: // 84532
        return { name: 'Base Sepolia', color: 'text-blue-400', isBase: true, icon: '🧪' }
      case 1:
        return { name: 'Ethereum', color: 'text-gray-400', isBase: false, icon: '⚡' }
      case 11155111:
        return { name: 'Sepolia', color: 'text-yellow-400', isBase: false, icon: '🧪' }
      default:
        return { name: numChainId ? `Chain ${numChainId}` : 'Unknown', color: 'text-red-400', isBase: false, icon: '❓' }
    }
  }
  
  // Get current network info
  const currentChain = chain || (walletChainId ? { name: '', id: walletChainId } : null)
  const chainInfo = currentChain ? getChainInfo(currentChain.id) : null
  
  // Get wallet address
  const walletAddress = user?.wallet?.address || address

  // Handle copy address
  const handleCopyAddress = async () => {
    if (walletAddress) {
      try {
        await navigator.clipboard.writeText(walletAddress)
        setShowCopiedFeedback(true)
        setTimeout(() => setShowCopiedFeedback(false), 2000)
        // No toast notification and keep dropdown open
      } catch (error) {
        console.error('Failed to copy address:', error)
        // Only show error toast if copy fails
        toasts.error('Failed to copy address to clipboard', 'Copy Failed')
      }
    }
  }

  // Handle network switch
  const handleSwitchToBaseSepolia = async () => {
    try {
      await switchChain({ chainId: baseSepolia.id })
      toasts.success('Successfully switched to Base Sepolia!', 'Network Changed')
      setIsDropdownOpen(false)
    } catch (error) {
      console.error('Failed to switch to Base Sepolia:', error)
      toasts.error('Failed to switch network. Please try again.', 'Network Switch Failed')
    }
  }

  const handleSwitchToBaseMainnet = async () => {
    try {
      await switchChain({ chainId: base.id })
      toasts.success('Successfully switched to Base Mainnet!', 'Network Changed')
      setIsDropdownOpen(false)
    } catch (error) {
      console.error('Failed to switch to Base Mainnet:', error)
      toasts.error('Failed to switch network. Please try again.', 'Network Switch Failed')
    }
  }

  const handleDisconnect = () => {
    logout()
    setIsDropdownOpen(false)
    toasts.info('Wallet disconnected successfully', 'Disconnected')
  }

  // Show loading state while Privy is initializing
  if (!ready) {
    return (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 py-2 bg-gray-700/50 text-gray-400 rounded-lg cursor-not-allowed"
        disabled
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
          <span>Loading...</span>
        </div>
      </motion.button>
    )
  }

  // Show wallet dropdown when connected
  if (authenticated && user && walletAddress) {
    return (
      <div className="relative" ref={dropdownRef}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`${colors.glassCard} px-4 py-2 hover:border-white/30 transition-all duration-200 flex items-center space-x-3 min-w-0`}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          {/* Wallet Avatar */}
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {/* Connection Status Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-900 bg-green-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
            </div>
          </div>
          
          {/* Wallet Address */}
          <div className="flex flex-col items-start min-w-0">
            <span className="text-white font-medium text-sm truncate">
              {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
            </span>
            {chainInfo && (
              <span className={`text-xs flex items-center space-x-1 ${chainInfo.color}`}>
                <span>{chainInfo.icon}</span>
                <span>{chainInfo.name}</span>
              </span>
            )}
          </div>
          
          {/* Dropdown Arrow */}
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isDropdownOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
                onClick={() => setIsDropdownOpen(false)}
              />
              
              {/* Dropdown content */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl z-[9999] overflow-hidden"
                style={{
                  background: 'rgba(17, 24, 39, 0.98)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                }}
              >
              {/* User Info Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">Wallet Connected</p>
                    <p className="text-gray-400 text-xs truncate font-mono">{walletAddress}</p>
                  </div>
                </div>
              </div>

              {/* Network Status */}
              {chainInfo && (
                <div className="p-3 bg-black/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{chainInfo.icon}</span>
                      <div>
                        <p className="text-white text-sm font-medium">Current Network</p>
                        <p className={`text-xs ${chainInfo.color}`}>{chainInfo.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {/* Network Switch Button - Only show for Base networks */}
                      {currentChain && (currentChain.id === base.id || currentChain.id === baseSepolia.id) && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={currentChain.id === base.id ? handleSwitchToBaseSepolia : handleSwitchToBaseMainnet}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition-all duration-200 flex items-center space-x-1.5"
                          title={currentChain.id === base.id ? 'Switch to Base Sepolia Testnet' : 'Switch to Base Mainnet'}
                        >
                          <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5H7.5" />
                          </svg>
                          <span className="text-xs font-medium text-blue-300">
                            {currentChain.id === base.id ? 'Testnet' : 'Mainnet'}
                          </span>
                        </motion.button>
                      )}
                      
                      {/* Warning badge for non-Base networks */}
                      {!chainInfo.isBase && (
                        <span className={`px-2 py-1 rounded text-xs ${colors.badgeWarning}`}>
                          Not Base
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="p-2 space-y-1">
                {/* Copy Address */}
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  onClick={handleCopyAddress}
                  className="w-full px-3 py-2 text-left text-white hover:bg-white/5 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{showCopiedFeedback ? 'Copied!' : 'Copy Address'}</span>
                </motion.button>

                {/* Switch to Base Networks (if not on Base network) */}
                {chainInfo && !chainInfo.isBase && (
                  <>
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                      onClick={handleSwitchToBaseMainnet}
                      className="w-full px-3 py-2 text-left text-green-400 hover:bg-green-500/10 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      <span className="text-sm">Switch to Base Mainnet</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      onClick={handleSwitchToBaseSepolia}
                      className="w-full px-3 py-2 text-left text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      <span className="text-sm">Switch to Base Sepolia</span>
                    </motion.button>
                  </>
                )}

                {/* View on Explorer */}
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  onClick={() => {
                    const explorerUrl = chainInfo?.isBase 
                      ? (currentChain?.id === 8453 ? `https://basescan.org/address/${walletAddress}` : `https://sepolia.basescan.org/address/${walletAddress}`)
                      : `https://etherscan.io/address/${walletAddress}`
                    window.open(explorerUrl, '_blank')
                  }}
                  className="w-full px-3 py-2 text-left text-white hover:bg-white/5 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="text-sm">View on Explorer</span>
                </motion.button>

                {/* Disconnect */}
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  onClick={handleDisconnect}
                  className="w-full px-3 py-2 text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-sm">Disconnect Wallet</span>
                </motion.button>
              </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Show connect button when not authenticated
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={login}
      className={`${colors.primaryButton} px-4 py-2`}
    >
      <div className="flex items-center space-x-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>Connect Wallet</span>
      </div>
    </motion.button>
  )
}