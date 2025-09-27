import { useFirebaseAnalytics } from '../components/FirebaseProvider'
import { trackPageView } from '../utils/analytics'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { layout, typography, colors } from '../styles/designSystem'

export default function PrivacyPolicyPage() {
  const analytics = useFirebaseAnalytics()

  useEffect(() => {
    trackPageView(analytics, 'privacy_policy')
  }, [analytics])

  return (
    <>
      <SEO 
        title="Privacy Policy - Base Token Creator"
        description="Learn how Base Token Creator protects your privacy and handles your data. We're committed to transparency in our Web3 application."
        keywords="privacy policy, data protection, Web3 privacy, Base blockchain privacy, token creator privacy"
        canonical="https://base-token-launcher.web.app/privacy"
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
            <h1 className={`${typography.pageTitle} mb-6`}>
              Privacy Policy
            </h1>
            <p className={`${typography.subtitle} text-xl`}>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className={`${colors.glassCard} rounded-3xl p-8 lg:p-12 space-y-8`}>
            
            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>1. Introduction</h2>
              <p className={`${typography.bodyText} mb-4`}>
                Base Token Creator ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Web3 token creation platform.
              </p>
              <p className={typography.bodyText}>
                By using our service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>2. Information We Collect</h2>
              
              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>2.1 Wallet Information</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>Wallet Address:</strong> Your Ethereum/Base blockchain wallet address</li>
                <li>• <strong>Network Information:</strong> Chain ID and network details (Base Mainnet/Testnet)</li>
                <li>• <strong>Transaction Data:</strong> Token creation and liquidity transactions (publicly available on blockchain)</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 mt-6 text-blue-400`}>2.2 Analytics Data (Firebase)</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>Usage Analytics:</strong> Page views, feature usage, user interactions</li>
                <li>• <strong>Device Information:</strong> Browser type, screen resolution, operating system</li>
                <li>• <strong>Performance Metrics:</strong> App loading times and error reports</li>
                <li>• <strong>Location Data:</strong> General location (country/region) for analytics purposes</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 mt-6 text-blue-400`}>2.3 Token Creation Data</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>Token Metadata:</strong> Token name, symbol, supply, and parameters you specify</li>
                <li>• <strong>Creation Timestamps:</strong> When tokens and liquidity pools are created</li>
                <li>• <strong>User Statistics:</strong> Number of tokens created, liquidity events</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>3. How We Use Your Information</h2>
              <ul className={`${typography.bodyText} space-y-3 ml-6`}>
                <li>• <strong>Service Provision:</strong> To enable token creation and liquidity management</li>
                <li>• <strong>User Experience:</strong> To personalize and improve our platform</li>
                <li>• <strong>Analytics & Insights:</strong> To understand usage patterns and optimize performance</li>
                <li>• <strong>Security:</strong> To detect fraud and ensure platform security</li>
                <li>• <strong>Notifications:</strong> To send important updates about your tokens (if you opt-in)</li>
                <li>• <strong>Support:</strong> To provide customer support and troubleshooting</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>4. Third-Party Services</h2>
              
              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>4.1 Firebase (Google)</h3>
              <p className={`${typography.bodyText} mb-4`}>
                We use Google Firebase for analytics, authentication, database, and cloud messaging. Google may collect and process your data according to their privacy policy.
              </p>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>4.2 Privy</h3>
              <p className={`${typography.bodyText} mb-4`}>
                We use Privy for wallet connection and user authentication. Privy handles wallet interactions securely without storing private keys.
              </p>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>4.3 Base Blockchain</h3>
              <p className={typography.bodyText}>
                All token creation and liquidity transactions occur on the Base blockchain and are publicly visible on the blockchain explorer.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>5. Data Security</h2>
              <p className={`${typography.bodyText} mb-4`}>
                We implement appropriate security measures to protect your information:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>Encryption:</strong> Data transmission is encrypted using HTTPS</li>
                <li>• <strong>No Private Keys:</strong> We never store or access your wallet private keys</li>
                <li>• <strong>Firebase Security:</strong> Data is stored using Firebase security rules and encryption</li>
                <li>• <strong>Access Control:</strong> Limited access to personal data on a need-to-know basis</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>6. Your Rights</h2>
              <p className={`${typography.bodyText} mb-4`}>
                Depending on your location, you may have the following rights:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>Access:</strong> Request access to your personal data</li>
                <li>• <strong>Correction:</strong> Request correction of inaccurate data</li>
                <li>• <strong>Deletion:</strong> Request deletion of your personal data</li>
                <li>• <strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li>• <strong>Opt-out:</strong> Opt-out of certain data collection (may limit functionality)</li>
              </ul>
              <p className={`${typography.bodyText} mt-4`}>
                To exercise these rights, contact us at <a href="mailto:privacy@base-token-launcher.com" className="text-blue-400 hover:text-blue-300">privacy@base-token-launcher.com</a>
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>7. Cookies and Tracking</h2>
              <p className={`${typography.bodyText} mb-4`}>
                We use cookies and similar technologies for:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>Analytics:</strong> Firebase Analytics cookies to understand usage</li>
                <li>• <strong>Preferences:</strong> Remember your wallet connection and settings</li>
                <li>• <strong>Performance:</strong> Improve loading times and user experience</li>
              </ul>
              <p className={`${typography.bodyText} mt-4`}>
                You can control cookies through your browser settings, but this may affect platform functionality.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>8. International Data Transfers</h2>
              <p className={typography.bodyText}>
                Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers, including compliance with GDPR and other applicable privacy laws.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>9. Data Retention</h2>
              <p className={typography.bodyText}>
                We retain your data for as long as necessary to provide our services and comply with legal obligations. Token creation data may be retained longer as it relates to blockchain transactions that are permanent and public.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>10. Children's Privacy</h2>
              <p className={typography.bodyText}>
                Our service is not intended for children under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>11. Changes to This Policy</h2>
              <p className={typography.bodyText}>
                We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the service after changes constitutes acceptance of the new policy.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>12. Contact Us</h2>
              <p className={`${typography.bodyText} mb-4`}>
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <div className={`${typography.bodyText} space-y-2`}>
                <p>Email: <a href="mailto:privacy@base-token-launcher.com" className="text-blue-400 hover:text-blue-300">privacy@base-token-launcher.com</a></p>
                <p>Website: <a href="https://base-token-launcher.web.app" className="text-blue-400 hover:text-blue-300">base-token-launcher.web.app</a></p>
              </div>
            </section>

          </div>

        </motion.div>
      </div>
    </>
  )
}