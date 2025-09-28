export const guides = [
  {
    id: 'token-creation',
    title: 'Token Creation Process',
    description: 'Step-by-step guide to creating your first token',
    icon: '🚀',
    gradient: 'from-green-500 to-emerald-500',
    content: [
      {
        title: '🎯 Choose Your Token Details',
        text: 'You only need 4 simple parameters:\n\n• Name: The full name (e.g., "My Awesome Token")\n• Symbol: 3-4 letters (e.g., "MAT")\n• Decimals: Always use 18 (this is the standard)\n• Total Supply: Usually 1 billion for memecoins (1,000,000,000)\n\nThat\'s it! No complex tokenomics needed.'
      },
      {
        title: '⚡ Deploy Your Token (5 seconds)',
        text: '1. Go to our Create Token page\n2. Fill in your token details\n3. Connect your wallet (you need less than $1 in ETH for gas)\n4. Click "Deploy Token"\n5. Wait 5 seconds for confirmation\n\n✅ Your token is now live on Base blockchain!'
      },
      {
        title: '🎉 Share Your Token',
        text: 'Your token is ready! Share these with your community:\n\n• Contract Address: Copy from BaseScan\n• Token information for wallet imports\n• BaseScan Page: For verification and transparency\n\n💡 Next step: Check out our Liquidity Management guide to make your token tradeable!'
      },
      {
        title: '⚠️ Important Notes',
        text: '• Token details cannot be changed after deployment\n• Keep some tokens for yourself for team/marketing\n• Double-check all parameters before deploying\n• Contract will be immutable once deployed'
      }
    ]
  },
  {
    id: 'liquidity-management',
    title: 'Liquidity Management',
    description: 'Learn how to manage liquidity for your tokens',
    icon: '💰',
    gradient: 'from-purple-500 to-pink-500',
    content: [
      {
        title: '🎯 Understanding Liquidity',
        text: 'Liquidity allows users to trade your token. Higher liquidity means less price slippage and better trading experience. We use Uniswap V2 for maximum flexibility.'
      },
      {
        title: '🚀 Adding Your First Liquidity Pool',
        text: '**Step 1: Select Your Token**\n• Go to our Liquidity page\n• Your recently created tokens should appear automatically in the token selection\n• If not visible, paste your token contract address to add it manually\n• The token info (name, symbol, balance) will load automatically\n\n**Step 2: Choose ETH as Second Token**\n• The second token is usually ETH\n• ETH is already selected by default\n\n**Step 3: Set Your Token Amount**\n• Choose how much of your token to add to liquidity\n• The rest stays safely in your wallet\n• You control how much you want to risk\n\n**Step 4: Set Your ETH Amount**\n• Decide how much ETH to add to the pool\n• Remember: You can get this ETH back if you don\'t burn the LP token\n• The ratio determines your token\'s initial price'
      },
      {
        title: '🔧 Two-Step Process',
        text: 'Adding liquidity requires two wallet approvals:\n\n1. **Approve Token : ** Allow Uniswap to use your tokens\n2. **Add Liquidity : ** Actually create the liquidity pool\n\nBoth transactions happen automatically - just click approve when your wallet prompts you!'
      },
      {
        title: '📊 After Adding Liquidity',
        text: 'Success modal shows:\n• ✅ Confirmation of amounts added\n• 📈 **DEXScreener Chart Link** - View live trading\n• 🔗 Transaction link on BaseScan\n• Your liquidity position in pools list\n\nYou earn 0.3% fees from all trades!'
      },
      {
        title: '💎 Save Your LP Token Address!',
        text: 'When you add liquidity, the success modal shows your LP token address. **Copy and save this address safely** - you\'ll need it to withdraw liquidity later!\n\nExample: 0xbe677266226C7717c974925e676A226817EE2326\n\n✅ Save it in a secure note or document\n🔒 Keep it private but accessible to you'
      },
      {
        title: '🗑️ Withdrawing Liquidity',
        text: 'Our platform has two ways to withdraw liquidity:\n\n**Method 1: From Your Pools List**\n• View pools you created on this device\n• Click "Remove Liquidity"\n• Automatic withdrawal\n\n**Method 2: Direct LP Token Withdrawal**\n• Go to Liquidity page → "Withdraw Liquidity" tab\n• Paste your saved LP token address\n• Enter amount to withdraw (or use "Max" button)\n• Approve and confirm transactions\n\nYou get back your tokens + ETH + earned trading fees!'
      },
      {
        title: '🌐 Network Requirements',
        text: 'Uniswap V2 is only available on:\n• ✅ **Base Mainnet** - Full functionality\n• ❌ **Base Sepolia** - Not supported\n\nSwitch to Base mainnet in your wallet to use liquidity features.'
      }
    ]
  },
  {
    id: 'security-best-practices',
    title: 'Security & Best Practices',
    description: 'Keep your tokens and community safe',
    icon: '🛡️',
    gradient: 'from-orange-500 to-red-500',
    content: [
      {
        title: 'Smart Contract Security',
        text: 'Always verify your contract source code on BaseScan. Use well-tested contract templates and avoid custom modifications unless audited.'
      },
      {
        title: 'Private Key Safety',
        text: 'Never share your private keys or seed phrases. Use hardware wallets for token project management.'
      },
      {
        title: 'Community Protection',
        text: 'Educate your community about common scams. Only use official contract addresses and verify all communications.'
      },
      {
        title: 'Rug Pull Prevention',
        text: 'Lock liquidity for extended periods to build trust. Consider using multisig wallets for project funds.'
      }
    ]
  },
  {
    id: 'token-listing-branding',
    title: 'Token Branding & Listing Guide',
    description: 'Complete guide to add logos, verify contracts, and get listed on exchanges',
    icon: '🎨',
    gradient: 'from-pink-500 to-violet-500',
    content: [
      {
        title: '📋 Step 1: Verify Your Contract on BaseScan',
        text: '1. Go to BaseScan verification page (basescan.org for mainnet, sepolia.basescan.org for testnet)\n2. Enter your token contract address\n3. Select "Solidity (Single file)"\n4. Choose compiler version: 0.8.20\n5. Copy-paste your contract code\n6. Set optimization to "Yes" with 200 runs\n7. Submit for verification'
      },
      {
        title: '🖼️ Step 2: Add Token Logo to BaseScan',
        text: '1. Go to your verified token page on BaseScan\n2. Click "Update Token Information" button\n3. Fill out the form with:\n   • Token Name & Symbol\n   • Token Logo (PNG/JPG, 200x200px recommended)\n   • Official Website & Email\n   • Description & Social Media Links'
      },
      {
        title: '📱 Step 3: Add to MetaMask & Wallets',
        text: '1. Copy your token contract address\n2. In MetaMask: Assets > Import tokens > Custom token\n3. Paste contract address (auto-fills name/symbol/decimals)\n4. Add custom icon URL if desired\n5. Token will appear in wallet for all users'
      },
      {
        title: '🔗 Step 4: Add to Token Lists',
        text: '1. Create PR to Base token list: https://github.com/base-org/token-list\n2. Submit to community token lists\n3. Include metadata JSON with logo IPFS hash\n4. This enables automatic wallet integration'
      },
      {
        title: '💡 Step 5: CoinMarketCap & CoinGecko Listing',
        text: 'Requirements:\n• CoinMarketCap: https://coinmarketcap.com/request/\n• CoinGecko: https://www.coingecko.com/en/coins/new\n• Verified contract on BaseScan\n• Active trading (DEX liquidity required)\n• Complete project information\n• Logo and social media presence'
      },
      {
        title: '📄 Logo Specifications',
        text: 'Requirements:\n• Format: PNG with transparent background\n• Size: 200x200px minimum, 400x400px recommended\n• File size: Under 100KB\n• No text in logo (use symbol for text)\n• High contrast and clear at small sizes\n• Professional design quality'
      },
      {
        title: '🔍 Verification Benefits',
        text: 'Benefits of completing these steps:\n✅ Green checkmark on BaseScan\n✅ Logo display on all explorers\n✅ Trust indicators for users\n✅ Eligible for DEX listings\n✅ Better SEO and discoverability\n✅ Increased trading volume potential'
      }
    ]
  }
]

export type Guide = typeof guides[0]
export type GuideContent = Guide['content'][0]