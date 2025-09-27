import { base, baseSepolia } from 'viem/chains'
import { createConfig, http } from 'wagmi'

// Wagmi config for Base network with Infura RPC endpoints from environment variables
export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(import.meta.env.VITE_BASE_MAINNET_RPC),
    [baseSepolia.id]: http(import.meta.env.VITE_BASE_SEPOLIA_RPC),
  },
})

// Privy configuration
export const privyConfig = {
  appId: import.meta.env.VITE_PRIVY_APP_ID || 'cmeigbb8q00u5ky0bv70pell5',
  config: {
    appearance: {
      theme: 'dark',
      accentColor: '#3B82F6',
    },
    embeddedWallets: {
      createOnLogin: 'all-users',
    },
    loginMethods: ['email', 'wallet', 'google'],
    defaultChain: base,
    supportedChains: [base, baseSepolia],
  },
}