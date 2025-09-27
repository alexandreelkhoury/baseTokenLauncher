import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-10 w-10 flex items-center justify-center">
                <img 
                  src="/LOGO.png" 
                  alt="Base Token Creator Logo" 
                  className="h-8 w-8 object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white">Base Token Creator</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              The most advanced platform for creating and managing ERC20 tokens on Base blockchain. Launch your project with 90% lower fees and lightning-fast transactions.
            </p>
            <p className="text-gray-500 text-xs">
              No code required • 5-minute deployment • Enterprise security
            </p>
          </div>
          
          <div>
            <h4 className="text-base font-semibold text-white mb-3">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/create" className="text-gray-400 hover:text-white text-sm transition-colors">Create Token</Link></li>
              <li><Link to="/liquidity" className="text-gray-400 hover:text-white text-sm transition-colors">Liquidity</Link></li>
              <li><Link to="/tokens" className="text-gray-400 hover:text-white text-sm transition-colors">My Tokens</Link></li>
              <li><Link to="/guides" className="text-gray-400 hover:text-white text-sm transition-colors">Guides</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-semibold text-white mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/guides" className="text-gray-400 hover:text-white text-sm transition-colors">Documentation</Link></li>
              <li><a href="https://docs.base.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">Base Docs</a></li>
              <li><a href="https://basescan.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">BaseScan</a></li>
              <li><a href="https://uniswap.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">Uniswap</a></li>
              <li><a href="https://coinbase.com/wallet" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">Coinbase Wallet</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link></li>
              <li><Link to="/risks" className="text-gray-400 hover:text-white text-sm transition-colors text-red-300">Risk Disclosure</Link></li>
              <li><Link to="/disclaimers" className="text-gray-400 hover:text-white text-sm transition-colors">Disclaimers</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Base Token Creator. Built with ❤️ for the DeFi community.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">Support</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link>
              <Link to="/risks" className="text-gray-400 hover:text-white text-sm transition-colors text-red-300">Risks</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}