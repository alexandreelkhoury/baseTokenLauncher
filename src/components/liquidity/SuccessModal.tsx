import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { colors, typography } from '../../styles/designSystem'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  pool: {
    tokenAddress: string
    tokenName: string
    tokenSymbol: string
    tokenAmount: string
    ethAmount: string
    txHash: string
    lpTokenAddress?: string
  }
  chainId: number
  isWithdrawal?: boolean // New prop to detect withdrawal operations
}

export default function SuccessModal({ isOpen, onClose, pool, chainId, isWithdrawal = false }: SuccessModalProps) {
  const [isCopied, setIsCopied] = useState(false)
  
  if (!isOpen) return null

  const isMainnet = chainId === 8453
  const explorerUrl = isMainnet ? 'https://basescan.org' : 'https://sepolia.basescan.org'
  const dexscreenerUrl = `https://dexscreener.com/base/${pool.tokenAddress}`

  const handleCopyAddress = async () => {
    if (!pool.lpTokenAddress) return
    
    try {
      await navigator.clipboard.writeText(pool.lpTokenAddress)
      setIsCopied(true)
      
      // Reset after 2 seconds
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to copy address:', error)
    }
  }
  
  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`relative ${colors.glassCard} rounded-2xl p-8 w-full max-w-lg`}
      >
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {isWithdrawal ? 'Liquidity Removed Successfully!' : 'Liquidity Added Successfully!'}
          </h2>
          <p className="text-green-200 text-lg">
            {isWithdrawal 
              ? `Your liquidity has been removed from the ${pool.tokenSymbol}/ETH pool on Uniswap V2.`
              : `Your liquidity has been added to the ${pool.tokenSymbol}/ETH pool on Uniswap V2.`
            }
          </p>
        </div>

        {/* Pool Details - Only show for liquidity additions, not withdrawals */}
        {!isWithdrawal && (
          <div className="space-y-6 mb-8">
            {/* Pool Composition */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className={`${typography.cardTitle} text-lg mb-4 text-center`}>Pool Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{pool.tokenAmount}</div>
                  <div className="text-sm text-gray-400">{pool.tokenSymbol}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{pool.ethAmount}</div>
                  <div className="text-sm text-gray-400">ETH</div>
                </div>
              </div>
            </div>

            {/* LP Token Address - only show if valid address */}
            {pool.lpTokenAddress && 
             pool.lpTokenAddress !== '0x0000000000000000000000000000000000000000' && 
             pool.lpTokenAddress.length === 42 && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-blue-300">LP Token Address:</span>
                </div>
                <div className="bg-black/20 rounded-lg p-3 mb-3">
                  <p className="text-xs font-mono break-all text-gray-300">
                    {pool.lpTokenAddress}
                  </p>
                </div>
                <motion.button
                  onClick={handleCopyAddress}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center space-x-2 ${
                    isCopied 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                      : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30'
                  }`}
                  disabled={!pool.lpTokenAddress}
                >
                  <motion.div
                    initial={false}
                    animate={{ 
                      rotate: isCopied ? 360 : 0,
                      scale: isCopied ? [1, 1.2, 1] : 1
                    }}
                    transition={{ 
                      duration: isCopied ? 0.5 : 0,
                      ease: "easeInOut"
                    }}
                  >
                    {isCopied ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </motion.div>
                  <motion.span
                    key={isCopied ? 'copied' : 'copy'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isCopied ? 'Copied!' : 'Copy Address'}
                  </motion.span>
                </motion.button>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Only show DEXScreener button for liquidity additions, not withdrawals */}
          {!isWithdrawal && (
            <motion.a
              href={dexscreenerUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${colors.primaryButton} flex items-center justify-center space-x-2`}
            >
              <span>📊</span>
              <span>View Chart on DEXScreener</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          )}
          
          <motion.a
            href={`${explorerUrl}/tx/${pool.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 text-base font-medium rounded-xl border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>View Transaction</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
          
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 text-base font-medium rounded-xl text-gray-400 hover:text-white transition-colors"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </div>
  )

  return createPortal(modalContent, document.body)
}