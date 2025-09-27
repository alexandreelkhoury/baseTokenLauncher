import { useEffect, useState } from 'react'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { base, baseSepolia } from 'viem/chains'
import { motion } from 'framer-motion'
import { useGlobalToasts } from '../App'

export default function NetworkManager() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain, isPending } = useSwitchChain()
  const { addToast } = useGlobalToasts()
  const [showModal, setShowModal] = useState(false)
  const [hasShownModal, setHasShownModal] = useState(false)

  const isCorrectChain = chainId === base.id || chainId === baseSepolia.id

  useEffect(() => {
    // Only show modal if user is connected but on wrong network
    if (isConnected && !isCorrectChain && !hasShownModal) {
      setShowModal(true)
      setHasShownModal(true)
    }
    
    // If user switches to correct network, hide modal
    if (isCorrectChain && showModal) {
      setShowModal(false)
    }
  }, [isConnected, isCorrectChain, hasShownModal, showModal])

  const handleSwitchToBase = async () => {
    try {
      await switchChain({ chainId: base.id })
      setShowModal(false)
      addToast({
        title: 'Network Switched',
        message: 'Successfully switched to Base mainnet',
        type: 'success',
        duration: 3000
      })
    } catch (error) {
      console.error('Failed to switch network:', error)
      addToast({
        title: 'Network Switch Failed',
        message: 'Please manually switch to Base network in your wallet',
        type: 'error',
        duration: 5000
      })
    }
  }

  const handleDismiss = () => {
    setShowModal(false)
    addToast({
      title: 'Network Notice',
      message: 'You can switch to Base network anytime from your wallet',
      type: 'info',
      duration: 4000
    })
  }

  // Reset hasShownModal when user disconnects
  useEffect(() => {
    if (!isConnected) {
      setHasShownModal(false)
      setShowModal(false)
    }
  }, [isConnected])

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative max-w-md mx-4 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-blue-500/20 shadow-2xl"
      >
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 111 111" fill="currentColor">
              <path d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.632 85.359 0 54.921 0C26.790 0 3.67 21.471 0.637 48.858H61.711V61.209H0.637C3.67 88.596 26.790 110.034 54.921 110.034Z"/>
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-white mb-3">
            Switch to Base Network
          </h3>
          
          <p className="text-gray-300 mb-6 text-sm leading-relaxed">
            This app works best on <span className="text-blue-400 font-semibold">Base mainnet</span>. 
            Switch now for lower fees, faster transactions, and better token visibility.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <div className="text-green-400 font-semibold">90% Lower Fees</div>
              <div className="text-gray-400">vs Ethereum</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <div className="text-blue-400 font-semibold">2s Confirmation</div>
              <div className="text-gray-400">Fast transactions</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSwitchToBase}
              disabled={isPending}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                  Switching...
                </div>
              ) : (
                'Switch to Base'
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDismiss}
              className="flex-1 py-3 px-4 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/15 transition-all duration-300"
            >
              Later
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}