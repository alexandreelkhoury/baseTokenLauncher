export const faqs = [
  {
    question: "How much does it cost to create an ERC20 token on Base blockchain?",
    answer: "Creating an ERC20 token on Base blockchain costs 0.02 ETH creation fee plus less than $1 in gas fees, significantly cheaper than Ethereum mainnet ($50-200). Base Layer 2 network offers up to 90% lower transaction costs while maintaining full Ethereum compatibility for token creation and deployment.",
    relatedGuide: "getting-started"
  },
  {
    question: "What is Base blockchain and why should I create tokens there?",
    answer: "Base is Coinbase's Layer 2 blockchain built on Ethereum, offering fast transactions (2-second confirmation), low fees (under $0.01), and seamless integration with Coinbase ecosystem. It's the best choice for token creators seeking affordability, speed, and access to millions of Coinbase users.",
    relatedGuide: "getting-started"
  },
  {
    question: "Can I create a token on Base without coding experience?",
    answer: "Yes! Our no-code Base token launcher allows anyone to create ERC20 tokens without programming knowledge. Simply fill in your token details (name, symbol, supply), pay the gas fee, and your token is deployed automatically to Base blockchain within 5 seconds.",
    relatedGuide: "token-creation"
  },
  {
    question: "How long does Base token deployment take?",
    answer: "Token deployment on Base network takes 5 seconds on average. The process includes smart contract compilation, blockchain deployment, and automatic verification on BaseScan explorer. Your token becomes tradeable immediately after successful deployment.",
    relatedGuide: "token-creation"
  },
  {
    question: "How to add liquidity to Base tokens on Uniswap V3?",
    answer: "Add liquidity to your Base token by connecting to Uniswap V3, selecting your token pair (TOKEN/ETH), choosing price ranges for concentrated liquidity, and depositing equal USD values of both tokens. This creates trading opportunities and generates fees from swaps.",
    relatedGuide: "liquidity-management"
  },
  {
    question: "What ERC20 token standards work on Base blockchain?",
    answer: "Base supports all ERC20 token standards including standard tokens, deflationary tokens, reflection tokens, governance tokens, and upgradeable proxies. All tokens are compatible with MetaMask, Coinbase Wallet, and major DeFi protocols.",
    relatedGuide: "getting-started"
  },
  {
    question: "Will my Base token be automatically listed on exchanges?",
    answer: "No, token creation doesn't include exchange listings. For DEX trading, add liquidity on Uniswap V3 or SushiSwap. For CEX listings (Coinbase, Binance, OKX), submit applications separately. Most Base tokens start trading on DEXs first.",
    relatedGuide: "token-listing-branding"
  },
  {
    question: "Can I create deflationary or burn tokens on Base?",
    answer: "Yes! Create deflationary tokens with automatic burn mechanisms, reflection tokens that reward holders, or tokens with custom taxation. Our advanced token templates support burn functions, fee redistribution, and tokenomics customization."
  },
  {
    question: "What happens if I lose my Base wallet private key?",
    answer: "Losing your private key means permanent loss of token admin access. Always backup seed phrases securely, use hardware wallets for valuable projects, and consider multi-signature wallets for team projects to prevent single points of failure.",
    relatedGuide: "security-best-practices"
  },
  {
    question: "How to verify Base token contract on BaseScan explorer?",
    answer: "Verify your Base token contract on BaseScan by visiting the contract address, clicking 'Contract' tab, selecting 'Verify and Publish', uploading your Solidity source code, and matching compilation settings. Verified contracts show green checkmarks and build user trust.",
    relatedGuide: "token-listing-branding"
  },
  {
    question: "What's the maximum token supply limit on Base blockchain?",
    answer: "Base ERC20 tokens support up to 2^256-1 total supply (approximately 115 quattuordecillion tokens with 18 decimals). Most projects use 1 million to 1 trillion total supply for practical tokenomics and market psychology reasons.",
    relatedGuide: "token-creation"
  },
  {
    question: "Can I burn Base tokens to reduce supply?",
    answer: "Yes! Implement token burning by sending tokens to the zero address (0x000...000) or create burn functions in your contract. Token burning permanently reduces circulating supply, potentially increasing token value through scarcity mechanics."
  },
  {
    question: "How to setup Base token presale or IDO launch?",
    answer: "Launch Base token presales using platforms like Pinksale, DxSale, or custom presale contracts. Set presale price, duration, hard/soft caps, and vesting schedules. Ensure proper liquidity lock and tokenomics for successful launches."
  },
  {
    question: "What are Base blockchain gas fees for token operations?",
    answer: "Base gas fees are 90% cheaper than Ethereum: token transfers cost $0.001-0.01, token creation costs 0.02 ETH fee plus less than $1 gas, and complex operations cost $0.05-1.00. Gas fees fluctuate based on network congestion and transaction complexity.",
    relatedGuide: "getting-started"
  },
  {
    question: "How to create pausable tokens on Base blockchain?",
    answer: "Create pausable Base tokens using OpenZeppelin's Pausable contract. Add pause/unpause functions to halt all token transfers during emergencies, maintenance, or regulatory compliance. Only contract owners can trigger pause functionality."
  },
  {
    question: "Best multi-signature wallets for Base token management?",
    answer: "Use Gnosis Safe (most popular), Coinbase Prime, or BitGo for Base token multi-sig management. Multi-sig wallets require 2-of-3 or 3-of-5 signatures for token operations, preventing single points of failure and enhancing security.",
    relatedGuide: "security-best-practices"
  },
  {
    question: "How to implement token vesting for Base projects?",
    answer: "Implement Base token vesting using time-locked contracts that release tokens gradually (cliff vesting, linear vesting, or milestone-based). Popular solutions include TokenVest, Sablier streaming, or custom vesting smart contracts."
  },
  {
    question: "How to add Base tokens to MetaMask and Coinbase Wallet?",
    answer: "Add Base tokens to MetaMask by switching to Base network, clicking 'Import tokens', entering contract address, symbol, and decimals. For Coinbase Wallet, enable Base network and the token appears automatically after receiving transactions.",
    relatedGuide: "token-listing-branding"
  },
  {
    question: "Can I create NFTs on Base network like Ethereum?",
    answer: "Yes! Base supports ERC721 and ERC1155 NFT standards with 90% lower minting costs. Create NFT collections using OpenSea, Foundation, or custom contracts. Store metadata on IPFS for decentralized NFT data."
  },
  {
    question: "Base vs Ethereum: Which is better for token creation?",
    answer: "Base offers faster transactions (2-second finality vs 5 seconds), 90% lower fees (less than $1 vs $50), and Coinbase integration. Ethereum has larger ecosystem and liquidity. Choose Base for cost-efficiency, Ethereum for maximum DeFi access.",
    relatedGuide: "getting-started"
  },
  {
    question: "How do I migrate from Ethereum to Base?",
    answer: "You can bridge tokens from Ethereum to Base using the official Base bridge or third-party bridges. The process involves locking tokens on Ethereum and minting equivalent tokens on Base."
  },
  {
    question: "Can I create governance tokens?",
    answer: "Yes! Governance tokens allow holders to vote on protocol decisions. You can create ERC20 tokens with additional governance functionality using standards like OpenZeppelin's Governor contracts."
  },
  {
    question: "What are the tax implications of creating tokens?",
    answer: "Tax implications vary by jurisdiction. Creating tokens might be considered taxable events in some regions. Consult with a tax professional familiar with cryptocurrency regulations in your area."
  },
  {
    question: "How do I market my newly created token?",
    answer: "Token marketing involves building community, creating social media presence, listing on tracking websites like CoinGecko, engaging with crypto influencers, and providing utility for your token.",
    relatedGuide: "token-listing-branding"
  },
  {
    question: "Can I create staking functionality for my token?",
    answer: "Yes! Staking contracts can be created separately from your token contract. Users can stake your tokens to earn rewards, providing utility and encouraging long-term holding."
  },
  {
    question: "What is a token audit and do I need one?",
    answer: "A token audit is a security review of your smart contract code. While not required for basic tokens, audits are recommended for complex projects or those handling significant value to identify vulnerabilities.",
    relatedGuide: "security-best-practices"
  },
  {
    question: "How do I handle token distribution?",
    answer: "Token distribution can be handled through airdrops, presales, initial DEX offerings (IDOs), or direct transfers. Plan your distribution strategy based on your project's goals and community building needs."
  },
  {
    question: "Can I create deflationary tokens?",
    answer: "Yes! Deflationary tokens automatically burn a percentage of tokens on each transaction, reducing total supply over time. This mechanism can create scarcity and potentially increase token value."
  },
  {
    question: "What wallets support Base network?",
    answer: "Major wallets supporting Base include MetaMask, Coinbase Wallet, Rainbow, Frame, and most Ethereum-compatible wallets. Users need to add Base network details to access their tokens."
  },
  {
    question: "How do I add a custom logo to my Base token?",
    answer: "Add logos by: 1) Verifying your contract on BaseScan, 2) Updating token information with logo upload (200x200px PNG recommended), 3) Submitting to token lists with IPFS logo hash, 4) Adding to CoinMarketCap/CoinGecko after getting trading activity. Logos appear on explorers, wallets, and trading platforms.",
    relatedGuide: "token-listing-branding"
  },
  {
    question: "How long does BaseScan contract verification take?",
    answer: "BaseScan contract verification typically takes 5-30 minutes after submission. Ensure you use the correct compiler version (0.8.20), optimization settings (200 runs), and exact source code. Verified contracts get green checkmarks and enable logo uploads.",
    relatedGuide: "token-listing-branding"
  },
  {
    question: "What are the requirements for CoinMarketCap listing?",
    answer: "CoinMarketCap listing requires: verified smart contract on BaseScan, active trading with sufficient volume ($10,000+ daily), complete project information, professional logo, active social media, and legitimate use case. Process takes 1-4 weeks after application.",
    relatedGuide: "token-listing-branding"
  },
  {
    question: "How do I get my token logo on MetaMask automatically?",
    answer: "Token logos appear on MetaMask through token lists. Submit your token to Base official token list, community lists, and ensure your contract is verified on BaseScan with logo uploaded. This enables automatic logo display for all users.",
    relatedGuide: "token-listing-branding"
  },
  {
    question: "What's the difference between DEX and CEX listings?",
    answer: "DEX listings (Uniswap V3, SushiSwap) require adding liquidity pools - instant and permissionless. CEX listings (Coinbase, Binance) require applications, compliance checks, and fees ranging from $50,000-500,000. Most tokens start on DEXs first.",
    relatedGuide: "liquidity-management"
  }
]

export type FAQ = typeof faqs[0]