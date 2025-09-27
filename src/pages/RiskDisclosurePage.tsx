import { useFirebaseAnalytics } from '../components/FirebaseProvider'
import { trackPageView } from '../utils/analytics'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { layout, typography, colors } from '../styles/designSystem'

export default function RiskDisclosurePage() {
  const analytics = useFirebaseAnalytics()

  useEffect(() => {
    trackPageView(analytics, 'risk_disclosure')
  }, [analytics])

  return (
    <>
      <SEO 
        title="Risk Disclosure - Base Token Creator"
        description="Important risk disclosure for DeFi and cryptocurrency activities on Base Token Creator. Understand the risks before using our platform."
        keywords="risk disclosure, DeFi risks, cryptocurrency risks, trading risks, Base blockchain risks, token creation risks"
        canonical="https://base-token-launcher.web.app/risks"
      />

      <div className={`${layout.pageContainer} py-12`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`${typography.pageTitle} mb-6 text-red-400`}>
              ⚠️ Risk Disclosure
            </h1>
            <p className={`${typography.subtitle} text-xl`}>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Critical Warning */}
          <div className="bg-red-900/30 border-2 border-red-500 rounded-3xl p-8 mb-8">
            <h2 className={`${typography.sectionTitle} text-2xl mb-4 text-red-300 text-center`}>
              🚨 CRITICAL WARNING 🚨
            </h2>
            <p className={`${typography.bodyText} mb-4 text-center font-bold text-lg`}>
              CRYPTOCURRENCY AND DeFi ACTIVITIES INVOLVE EXTREME FINANCIAL RISK
            </p>
            <p className={`${typography.bodyText} text-center`}>
              You could lose 100% of your investment. Never invest more than you can afford to lose completely.
              This platform is experimental technology with no guarantees.
            </p>
          </div>

          {/* Content */}
          <div className={`${colors.glassCard} rounded-3xl p-8 lg:p-12 space-y-8`}>
            
            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>1. Overview</h2>
              <p className={`${typography.bodyText} mb-4`}>
                Base Token Creator enables interaction with decentralized finance (DeFi) protocols, cryptocurrency trading, and blockchain-based token creation. These activities carry significant financial risks that you must understand before proceeding.
              </p>
              <p className={typography.bodyText}>
                <strong className="text-red-400">By using this platform, you acknowledge and accept all risks described below.</strong>
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4 text-red-400`}>2. Financial Risks</h2>
              
              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>2.1 Total Loss of Funds</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-4`}>
                <li>• <strong>100% Loss Possible:</strong> You may lose your entire investment</li>
                <li>• <strong>No Insurance:</strong> Cryptocurrency losses are not covered by deposit insurance</li>
                <li>• <strong>Irreversible Transactions:</strong> Blockchain transactions cannot be undone</li>
                <li>• <strong>No Recovery:</strong> Lost or stolen funds typically cannot be recovered</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>2.2 Extreme Volatility</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-4`}>
                <li>• <strong>Price Swings:</strong> Token prices can change by 90%+ in minutes</li>
                <li>• <strong>Market Manipulation:</strong> Small markets are easily manipulated</li>
                <li>• <strong>Liquidity Shocks:</strong> Markets can become illiquid instantly</li>
                <li>• <strong>Flash Crashes:</strong> Sudden, dramatic price collapses are common</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>2.3 Impermanent Loss</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>Liquidity Provision Risk:</strong> Providing liquidity can result in losses even if both tokens appreciate</li>
                <li>• <strong>Price Divergence:</strong> Greater price differences between paired tokens increase losses</li>
                <li>• <strong>Permanent Nature:</strong> "Impermanent" loss becomes permanent when you withdraw</li>
                <li>• <strong>Complex Calculations:</strong> Losses are difficult to predict and understand</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4 text-red-400`}>3. Technical Risks</h2>
              
              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>3.1 Smart Contract Risks</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-4`}>
                <li>• <strong>Code Bugs:</strong> Smart contracts may contain critical bugs or vulnerabilities</li>
                <li>• <strong>Exploits:</strong> Hackers may exploit contract weaknesses to steal funds</li>
                <li>• <strong>Upgrade Risks:</strong> Contract upgrades may introduce new bugs or malicious code</li>
                <li>• <strong>Audit Limitations:</strong> Even audited contracts can have undiscovered vulnerabilities</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>3.2 Blockchain Risks</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-4`}>
                <li>• <strong>Network Congestion:</strong> High gas fees may make transactions uneconomical</li>
                <li>• <strong>Failed Transactions:</strong> Transactions may fail but still consume gas fees</li>
                <li>• <strong>Fork Risks:</strong> Blockchain forks could affect token validity</li>
                <li>• <strong>Validator Risks:</strong> Network validators could act maliciously or fail</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>3.3 User Error</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>Wrong Addresses:</strong> Sending to incorrect addresses results in permanent loss</li>
                <li>• <strong>Private Key Loss:</strong> Losing private keys means permanent loss of access</li>
                <li>• <strong>Phishing:</strong> Malicious websites can steal your credentials and funds</li>
                <li>• <strong>Transaction Parameters:</strong> Incorrect slippage or gas settings can cause losses</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4 text-red-400`}>4. Regulatory and Legal Risks</h2>
              
              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>4.1 Regulatory Uncertainty</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-4`}>
                <li>• <strong>Changing Laws:</strong> Cryptocurrency regulations are rapidly evolving</li>
                <li>• <strong>Potential Bans:</strong> Jurisdictions may ban or restrict cryptocurrency activities</li>
                <li>• <strong>Tax Implications:</strong> Tax treatment of DeFi activities is unclear and changing</li>
                <li>• <strong>Compliance Costs:</strong> Future compliance requirements may be expensive</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>4.2 Securities Laws</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-4`}>
                <li>• <strong>Unregistered Securities:</strong> Some tokens may be deemed unregistered securities</li>
                <li>• <strong>Legal Action:</strong> Regulatory enforcement actions could affect token value</li>
                <li>• <strong>Delisting Risk:</strong> Exchanges may delist tokens due to regulatory concerns</li>
                <li>• <strong>Personal Liability:</strong> Token creators may face personal legal liability</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>4.3 Geographic Restrictions</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>Jurisdiction Limits:</strong> Services may not be available in your location</li>
                <li>• <strong>Cross-Border Issues:</strong> International transactions may face restrictions</li>
                <li>• <strong>Sanctions Risk:</strong> Interacting with sanctioned addresses could have legal consequences</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4 text-red-400`}>5. Market and Liquidity Risks</h2>
              
              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>5.1 Liquidity Risk</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-4`}>
                <li>• <strong>No Buyers:</strong> You may be unable to sell your tokens at any price</li>
                <li>• <strong>Wide Spreads:</strong> Bid-ask spreads can be extremely large</li>
                <li>• <strong>Slippage:</strong> Large orders may execute at much worse prices</li>
                <li>• <strong>Market Depth:</strong> Limited order book depth increases price impact</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>5.2 Market Manipulation</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-4`}>
                <li>• <strong>Pump and Dump:</strong> Coordinated schemes to artificially inflate prices</li>
                <li>• <strong>Wash Trading:</strong> Fake volume to create appearance of activity</li>
                <li>• <strong>Front-Running:</strong> MEV bots may exploit your transactions</li>
                <li>• <strong>Whale Manipulation:</strong> Large holders can manipulate prices</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>5.3 Information Asymmetry</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>Insider Information:</strong> Developers and early investors may have material non-public information</li>
                <li>• <strong>Research Limitations:</strong> Limited or unreliable information about projects</li>
                <li>• <strong>Misinformation:</strong> Deliberately false or misleading information is common</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4 text-red-400`}>6. Platform-Specific Risks</h2>
              
              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>6.1 Base Token Creator Risks</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-4`}>
                <li>• <strong>Service Interruption:</strong> Our platform may become unavailable</li>
                <li>• <strong>Bug Risk:</strong> Our interface may contain bugs that could cause losses</li>
                <li>• <strong>No Guarantees:</strong> We provide no warranties or guarantees</li>
                <li>• <strong>Limited Support:</strong> Customer support may be limited or unavailable</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-yellow-400`}>6.2 Third-Party Dependencies</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>Uniswap Risk:</strong> Uniswap protocol bugs or exploits could affect your positions</li>
                <li>• <strong>Base Network:</strong> Base blockchain issues could prevent transactions</li>
                <li>• <strong>Wallet Provider:</strong> Wallet software bugs could cause fund loss</li>
                <li>• <strong>Oracle Risk:</strong> Price feed failures could affect automated transactions</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4 text-red-400`}>7. Psychological and Behavioral Risks</h2>
              <ul className={`${typography.bodyText} space-y-3 ml-6`}>
                <li>• <strong>FOMO (Fear of Missing Out):</strong> May lead to irrational investment decisions</li>
                <li>• <strong>Addiction Risk:</strong> High-stakes trading can become addictive</li>
                <li>• <strong>Emotional Trading:</strong> Fear and greed often lead to poor decisions</li>
                <li>• <strong>Overconfidence:</strong> Early gains may lead to excessive risk-taking</li>
                <li>• <strong>Sunk Cost Fallacy:</strong> Continuing to invest in losing positions</li>
                <li>• <strong>Social Media Influence:</strong> Making decisions based on social media hype</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>8. Risk Mitigation Strategies</h2>
              <p className={`${typography.bodyText} mb-4`}>
                While risks cannot be eliminated, consider these strategies:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>Only Risk What You Can Afford to Lose:</strong> Never invest money needed for living expenses</li>
                <li>• <strong>Start Small:</strong> Begin with tiny amounts to learn the technology</li>
                <li>• <strong>Diversify:</strong> Don't put all funds in one token or strategy</li>
                <li>• <strong>Secure Your Wallet:</strong> Use hardware wallets and secure seed phrase storage</li>
                <li>• <strong>Double-Check Addresses:</strong> Always verify recipient addresses</li>
                <li>• <strong>Understand Gas Fees:</strong> Factor in transaction costs before trading</li>
                <li>• <strong>Research Thoroughly:</strong> Investigate projects before investing</li>
                <li>• <strong>Set Limits:</strong> Decide maximum losses in advance</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>9. No Investment Advice</h2>
              <p className={`${typography.bodyText} mb-4`}>
                <strong>IMPORTANT:</strong> Nothing on this platform constitutes investment, financial, legal, or tax advice. We do not recommend any particular investment strategy or token.
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• Consult qualified professionals before making financial decisions</li>
                <li>• Understand tax implications in your jurisdiction</li>
                <li>• Consider your financial situation and risk tolerance</li>
                <li>• Past performance does not guarantee future results</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>10. Acknowledgment and Acceptance</h2>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                <p className={`${typography.bodyText} mb-4 font-semibold`}>
                  By using Base Token Creator, you acknowledge that:
                </p>
                <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                  <li>• You have read and understood all risks described above</li>
                  <li>• You accept full responsibility for any losses</li>
                  <li>• You will not hold us liable for any damages</li>
                  <li>• You are using the platform at your own risk</li>
                  <li>• You understand this is experimental technology</li>
                  <li>• You have consulted appropriate professionals if needed</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>11. Updates to Risk Disclosure</h2>
              <p className={`${typography.bodyText} mb-4`}>
                We may update this Risk Disclosure as new risks emerge or our understanding evolves. Material changes will be prominently displayed.
              </p>
              <p className={typography.bodyText}>
                It is your responsibility to review this disclosure periodically and stay informed about risks.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>12. Emergency Contacts</h2>
              <p className={`${typography.bodyText} mb-4`}>
                If you experience technical issues that could result in financial loss:
              </p>
              <div className={`${typography.bodyText} space-y-2`}>
                <p>Support: <a href="mailto:support@base-token-launcher.com" className="text-blue-400 hover:text-blue-300">support@base-token-launcher.com</a></p>
                <p>Security Issues: <a href="mailto:security@base-token-launcher.com" className="text-blue-400 hover:text-blue-300">security@base-token-launcher.com</a></p>
                <p className="text-yellow-400">⚠️ Response times are not guaranteed and may not prevent losses</p>
              </div>
            </section>

            <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-6 mt-8">
              <p className={`${typography.bodyText} text-center font-bold text-lg mb-2`}>
                FINAL WARNING
              </p>
              <p className={`${typography.bodyText} text-center`}>
                Cryptocurrency and DeFi activities are extremely risky. Most people lose money.
                Only proceed if you fully understand and accept these risks.
              </p>
            </div>

          </div>

        </motion.div>
      </div>
    </>
  )
}