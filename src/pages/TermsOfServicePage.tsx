import { useFirebaseAnalytics } from '../components/FirebaseProvider'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { layout, typography, colors } from '../styles/designSystem'

export default function TermsOfServicePage() {

  useEffect(() => {
    trackPageView('terms_of_service')
  }, [trackPageView])

  return (
    <>
      <SEO 
        title="Terms of Service - Base Token Creator"
        description="Terms of Service for Base Token Creator. Understand your rights and responsibilities when using our Web3 token creation platform."
        keywords="terms of service, user agreement, Web3 terms, Base blockchain terms, token creator terms"
        canonical="https://base-token-launcher.web.app/terms"
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
              Terms of Service
            </h1>
            <p className={`${typography.subtitle} text-xl`}>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className={`${colors.glassCard} rounded-3xl p-8 lg:p-12 space-y-8`}>
            
            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>1. Agreement to Terms</h2>
              <p className={`${typography.bodyText} mb-4`}>
                By accessing or using Base Token Creator ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
              </p>
              <p className={typography.bodyText}>
                <strong className="text-red-400">WARNING:</strong> This Service involves blockchain technology, cryptocurrency transactions, and DeFi protocols. Use at your own risk and only with funds you can afford to lose.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>2. Description of Service</h2>
              <p className={`${typography.bodyText} mb-4`}>
                Base Token Creator is a Web3 application that allows users to:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• Create ERC-20 tokens on the Base blockchain</li>
                <li>• Add liquidity to Uniswap V3 pools</li>
                <li>• Manage token liquidity and trading pairs</li>
                <li>• Access blockchain analytics and token management tools</li>
              </ul>
              <p className={`${typography.bodyText} mt-4`}>
                The Service is provided "as-is" without warranties of any kind.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>3. Eligibility</h2>
              <p className={`${typography.bodyText} mb-4`}>
                To use this Service, you must:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• Be at least 18 years old</li>
                <li>• Have the legal capacity to enter into contracts</li>
                <li>• Not be prohibited from using cryptocurrency services in your jurisdiction</li>
                <li>• Comply with all applicable laws and regulations</li>
                <li>• Not be located in a jurisdiction where the Service is prohibited</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>4. User Responsibilities</h2>
              
              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>4.1 Account Security</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-4`}>
                <li>• You are solely responsible for your wallet security and private keys</li>
                <li>• We do not store, have access to, or can recover your private keys</li>
                <li>• Loss of private keys may result in permanent loss of access to funds</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>4.2 Compliance</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-4`}>
                <li>• Comply with all applicable laws and regulations</li>
                <li>• Not use the Service for illegal activities</li>
                <li>• Not create tokens that violate intellectual property rights</li>
                <li>• Not engage in market manipulation or fraudulent activities</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>4.3 Token Creation</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• Ensure you have rights to create tokens with chosen names/symbols</li>
                <li>• Understand that token creation involves irreversible blockchain transactions</li>
                <li>• Accept responsibility for token economics and functionality</li>
                <li>• Comply with securities laws if your token qualifies as a security</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>5. Prohibited Uses</h2>
              <p className={`${typography.bodyText} mb-4`}>
                You may not use the Service to:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• Create tokens for fraudulent or deceptive purposes</li>
                <li>• Violate any laws, regulations, or third-party rights</li>
                <li>• Engage in money laundering or terrorist financing</li>
                <li>• Create tokens that infringe on trademarks or copyrights</li>
                <li>• Manipulate markets or engage in wash trading</li>
                <li>• Create securities without proper registration</li>
                <li>• Spam, harass, or harm other users</li>
                <li>• Interfere with the Service's operation or security</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>6. Financial Risks and Disclaimers</h2>
              
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-6">
                <h3 className={`${typography.sectionTitle} text-xl mb-3 text-red-400`}>⚠️ HIGH RISK WARNING</h3>
                <p className={`${typography.bodyText} mb-3`}>
                  Cryptocurrency and DeFi activities involve significant financial risk:
                </p>
                <ul className={`${typography.bodyText} space-y-1 ml-6 text-sm`}>
                  <li>• Total loss of funds is possible</li>
                  <li>• High volatility and unpredictable market conditions</li>
                  <li>• Smart contract risks and potential bugs</li>
                  <li>• Regulatory risks and changing legal landscape</li>
                  <li>• Liquidity risks and impermanent loss</li>
                  <li>• Gas fees and transaction costs</li>
                </ul>
              </div>

              <p className={typography.bodyText}>
                <strong>YOU ACKNOWLEDGE AND ACCEPT ALL RISKS.</strong> Never invest more than you can afford to lose completely.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>7. Fees and Costs</h2>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• The Service itself is currently free to use</li>
                <li>• You are responsible for all blockchain gas fees</li>
                <li>• Uniswap protocol fees apply to liquidity operations</li>
                <li>• Network fees and transaction costs are your responsibility</li>
                <li>• We reserve the right to introduce service fees with notice</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>8. Intellectual Property</h2>
              <p className={`${typography.bodyText} mb-4`}>
                The Service and its original content, features, and functionality are owned by Base Token Creator and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className={typography.bodyText}>
                You retain ownership of tokens you create, subject to compliance with these Terms.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>9. Limitation of Liability</h2>
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
                <p className={`${typography.bodyText} mb-4 font-semibold`}>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                </p>
                <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                  <li>• WE ARE NOT LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES</li>
                  <li>• OUR TOTAL LIABILITY SHALL NOT EXCEED $100 USD</li>
                  <li>• WE ARE NOT RESPONSIBLE FOR BLOCKCHAIN NETWORK ISSUES</li>
                  <li>• WE ARE NOT LIABLE FOR SMART CONTRACT BUGS OR FAILURES</li>
                  <li>• WE ARE NOT RESPONSIBLE FOR THIRD-PARTY ACTIONS</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>10. Indemnification</h2>
              <p className={typography.bodyText}>
                You agree to indemnify and hold harmless Base Token Creator from any claims, damages, losses, or expenses arising from your use of the Service, violation of these Terms, or violation of any rights of a third party.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>11. Service Availability</h2>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• We do not guarantee uninterrupted service availability</li>
                <li>• Maintenance and updates may cause temporary downtime</li>
                <li>• Blockchain network congestion may affect functionality</li>
                <li>• We may suspend service for legal or security reasons</li>
                <li>• We reserve the right to discontinue the Service with notice</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>12. Privacy and Data</h2>
              <p className={typography.bodyText}>
                Your privacy is important to us. Please review our <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</a> to understand how we collect, use, and protect your information.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>13. Termination</h2>
              <p className={`${typography.bodyText} mb-4`}>
                We may terminate or suspend your access immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
              <p className={typography.bodyText}>
                You may discontinue use at any time. Upon termination, your right to use the Service ceases immediately.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>14. Governing Law</h2>
              <p className={typography.bodyText}>
                These Terms shall be governed by and construed in accordance with the laws of [JURISDICTION], without regard to conflict of law provisions. Any disputes shall be resolved in the courts of [JURISDICTION].
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>15. Changes to Terms</h2>
              <p className={`${typography.bodyText} mb-4`}>
                We reserve the right to modify these Terms at any time. Material changes will be notified through the Service or by email. Your continued use after changes constitutes acceptance.
              </p>
              <p className={typography.bodyText}>
                We recommend reviewing these Terms periodically.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>16. Severability</h2>
              <p className={typography.bodyText}>
                If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>17. Contact Information</h2>
              <p className={`${typography.bodyText} mb-4`}>
                For questions about these Terms of Service, please contact us:
              </p>
              <div className={`${typography.bodyText} space-y-2`}>
                <p>Email: <a href="mailto:legal@base-token-launcher.com" className="text-blue-400 hover:text-blue-300">legal@base-token-launcher.com</a></p>
                <p>Website: <a href="https://base-token-launcher.web.app" className="text-blue-400 hover:text-blue-300">base-token-launcher.web.app</a></p>
              </div>
            </section>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mt-8">
              <p className={`${typography.bodyText} text-center font-medium`}>
                By using Base Token Creator, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>

          </div>

        </motion.div>
      </div>
    </>
  )
}