# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with host access for external connections
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## Project Architecture

This is a React TypeScript application built with Vite that creates a token launcher interface for the Base blockchain. Key architectural components:

### Core Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with PostCSS
- **Animations**: Framer Motion for complex UI animations and transitions
- **Routing**: React Router DOM with route-based page structure

### Web3 Integration
- **Wallet Connection**: Privy for authentication and embedded wallets
- **Blockchain Interaction**: Wagmi v2 + Viem for Web3 operations
- **Network**: Configured for Base mainnet and Base Sepolia testnet
- **State Management**: TanStack React Query for async state

### Provider Architecture
The app uses a nested provider pattern:
```
PrivyProvider (auth) 
  → QueryClientProvider (data fetching)
    → WagmiProvider (Web3)
      → Router (navigation)
```

### Configuration
- Web3 configuration is centralized in `src/config/web3.ts`
- Privy app ID can be configured via `VITE_PRIVY_APP_ID` environment variable
- Supports both Base mainnet and testnet chains

### Page Structure
- `/` - HomePage: Landing page with hero section
- `/create` - CreateTokenPage: Token creation form with animated UI
- `/tokens` - TokensPage: Token management interface  
- `/liquidity` - LiquidityPage: Liquidity management
- `/guide` - GuidePage: User documentation

### Component Patterns
- Heavy use of Framer Motion variants for consistent animations
- Glassmorphism design with backdrop blur effects
- Responsive design with mobile-first approach
- Form validation and loading states with visual feedback

## Key Dependencies
- `@privy-io/react-auth` and `@privy-io/wagmi` for wallet integration
- `wagmi` v2 with `viem` for Ethereum interactions
- `framer-motion` for animations (used extensively throughout UI)
- `@tanstack/react-query` for server state management

## Uniswap V3 Integration
The app integrates with Uniswap V3 for liquidity management on Base network:

### Required Dependencies
- `@uniswap/v3-sdk` - Core V3 SDK for position management
- `@uniswap/sdk-core` - Essential utilities and types
- `@uniswap/smart-order-router` - Advanced routing capabilities

### Base Network Contracts
- **Base Mainnet**: Production-ready deployment with full Uniswap Labs support
  - NonfungiblePositionManager: `0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1`
  - SwapRouter02: `0x2626664c2603336E57B271c5C0b26F421741e481`
  - UniswapV3Factory: `0x33128a8fC17869897dcE68Ed026d694621f6FDfD`
  - WETH: `0x4200000000000000000000000000000000000006`

- **Base Sepolia**: Testnet deployment for development
  - NonfungiblePositionManager: `0x27F971cb582BF9E50F397e4d29a5C7A34f11faA2`
  - SwapRouter02: `0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4`
  - UniswapV3Factory: `0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24`

### Implementation Guidelines
- Use environment variables to switch between mainnet/testnet contracts
- Implement proper error handling for slippage, deadline, and insufficient funds
- Provide clear transaction status updates (approving → adding → success)
- Start development on Base Sepolia, deploy to Base Mainnet for production

### Key Resources
- Official V3 SDK Documentation: https://docs.uniswap.org/sdk/v3/overview
- Base Network Deployments: https://docs.uniswap.org/contracts/v3/reference/deployments/base-deployments
- Adding Liquidity Guide: https://docs.uniswap.org/sdk/v3/guides/liquidity/minting

## Development Notes
- Uses strict TypeScript configuration with separate app and node configs
- ESLint configured with React hooks and TypeScript rules
- Vite optimized for Web3 dependencies with specific exclusions for `@base-org/account`
- No test framework currently configured

## UI/UX Design Guidelines
Following established design principles for optimal user experience:

### Design System
- **Consistent Animations**: All components use Framer Motion variants from `src/styles/designSystem.ts`
- **Glass Morphism**: Primary design language with backdrop blur effects and subtle borders
- **Color Palette**: Blue/purple/cyan gradients with dark theme base (gray-900)
- **Typography**: Hierarchical system with gradient text for emphasis
- **Spacing**: 8px base unit with consistent padding/margin patterns

### Navigation
- **Desktop**: Horizontal navigation with icons and hover states
- **Mobile**: Slide-down menu with smooth animations and touch-friendly targets
- **Active State**: Visual indicators for current page with background highlights
- **Accessibility**: Proper ARIA labels and keyboard navigation support

### Component Patterns
- **Glass Cards**: Consistent container pattern with hover effects
- **Loading States**: Unified spinner and skeleton loading patterns
- **Form Controls**: Consistent input styling with focus states and validation
- **Buttons**: Primary (gradient) and secondary (outline) button patterns
- **Status Indicators**: Color-coded feedback for wallet, network, and transaction states

### User Flow Optimization
- **Progressive Disclosure**: Information revealed contextually based on user state
- **Clear CTAs**: Prominent call-to-action buttons with descriptive labels
- **Error Prevention**: Inline validation and clear error messages
- **Success Feedback**: Immediate confirmation of completed actions