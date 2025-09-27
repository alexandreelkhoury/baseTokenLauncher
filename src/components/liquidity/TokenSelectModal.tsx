import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { colors, typography } from '../../styles/designSystem'

interface Token {
  address: string
  name: string
  symbol: string
  decimals: number
  balance?: string
  logoUri?: string
}

interface TokenSelectModalProps {
  isOpen: boolean
  onClose: () => void
  tokens: Token[]
  onSelectToken: (token: Token) => void
  selectedToken?: Token
  title: string
  showTokenInput?: boolean
  tokenAddressInput: string
  onTokenAddressInputChange: (value: string) => void
  onAddTokenFromAddress: () => void
  isLoadingToken: boolean
  userCreatedTokens?: Token[]
  userLPTokens?: Token[]
  mode?: 'add' | 'withdraw' // New prop to determine which tokens to show
}

export default function TokenSelectModal({ 
  isOpen, 
  onClose, 
  tokens, 
  onSelectToken, 
  selectedToken, 
  title, 
  showTokenInput = false,
  tokenAddressInput,
  onTokenAddressInputChange,
  onAddTokenFromAddress,
  isLoadingToken,
  userCreatedTokens = [],
  userLPTokens = [],
  mode = 'add'
}: TokenSelectModalProps) {
  if (!isOpen) return null

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`relative ${colors.glassCard} rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-hidden`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className={`${typography.cardTitle} text-xl`}>{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {showTokenInput && (
          <div className="mb-6 space-y-3">
            <div className="text-sm text-gray-400 mb-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              💡 <strong>Don't see your token?</strong> Paste your token address below to add it!
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter token address (0x...)"
                value={tokenAddressInput}
                onChange={(e) => onTokenAddressInputChange(e.target.value)}
                className={`${colors.input} flex-1 py-3 rounded-xl`}
              />
              <motion.button
                onClick={onAddTokenFromAddress}
                disabled={isLoadingToken || !tokenAddressInput}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-3 rounded-xl font-medium ${
                  isLoadingToken || !tokenAddressInput 
                    ? colors.primaryButtonDisabled 
                    : colors.primaryButton
                }`}
              >
                {isLoadingToken ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  'Add'
                )}
              </motion.button>
            </div>
          </div>
        )}

        <div className="space-y-2 max-h-64 overflow-y-auto overflow-x-hidden">
          {/* Show LP tokens section only in withdraw mode */}
          {mode === 'withdraw' && userLPTokens.length > 0 && (
            <>
              <div className="text-sm text-yellow-400 font-medium mb-2 px-2">
                🔄 Your LP Tokens
              </div>
              {userLPTokens.map((token) => (
                <motion.button
                  key={`lp-${token.address}`}
                  onClick={() => onSelectToken(token)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                    selectedToken?.address === token.address
                      ? 'bg-yellow-500/20 border-2 border-yellow-500/50'
                      : 'hover:bg-white/10 border-2 border-transparent hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">LP</span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{token.symbol}</div>
                        <div className="text-sm text-gray-400 truncate max-w-32">{token.name}</div>
                      </div>
                    </div>
                    {token.balance && (
                      <div className="text-right">
                        <div className="text-sm text-white">{token.balance}</div>
                        <div className="text-xs text-gray-400">Balance</div>
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
              
              {/* Separator */}
              <div className="border-t border-gray-600 my-4"></div>
            </>
          )}
          
          {/* Show regular tokens (hide LP tokens in add mode) */}
          {mode === 'add' && (
            <div className="text-sm text-blue-400 font-medium mb-2 px-2">
              💰 Available Tokens
            </div>
          )}
          
          {tokens.filter(token => {
            // In add mode, hide LP tokens from the regular token list
            if (mode === 'add' && token.symbol.includes('LP')) {
              return false
            }
            return true
          }).map((token) => (
            <motion.button
              key={token.address}
              onClick={() => onSelectToken(token)}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                selectedToken?.address === token.address
                  ? 'bg-blue-500/20 border-2 border-blue-500/50'
                  : 'hover:bg-white/10 border-2 border-transparent hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {token.logoUri ? (
                    <img src={token.logoUri} alt={token.symbol} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-white">{token.symbol}</div>
                    <div className="text-sm text-gray-400 truncate max-w-32">{token.name}</div>
                  </div>
                </div>
                {token.balance && (
                  <div className="text-right">
                    <div className="text-sm text-white">{token.balance}</div>
                    <div className="text-xs text-gray-400">Balance</div>
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )

  return createPortal(modalContent, document.body)
}