import { useFirebaseAnalytics } from '../components/FirebaseProvider'
import { trackPageView } from '../utils/analytics'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { layout, typography, colors } from '../styles/designSystem'

export default function CookiePolicyPage() {
  const analytics = useFirebaseAnalytics()

  useEffect(() => {
    trackPageView(analytics, 'cookie_policy')
  }, [analytics])

  return (
    <>
      <SEO 
        title="Cookie Policy - Base Token Creator"
        description="Learn about how Base Token Creator uses cookies and tracking technologies to improve your experience on our Web3 platform."
        keywords="cookie policy, tracking, Web3 cookies, analytics cookies, Base blockchain"
        canonical="https://base-token-launcher.web.app/cookies"
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
              Cookie Policy
            </h1>
            <p className={`${typography.subtitle} text-xl`}>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className={`${colors.glassCard} rounded-3xl p-8 lg:p-12 space-y-8`}>
            
            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>1. What Are Cookies</h2>
              <p className={`${typography.bodyText} mb-4`}>
                Cookies are small text files stored on your device when you visit our website. They help us provide you with a better user experience by remembering your preferences and enabling analytics.
              </p>
              <p className={typography.bodyText}>
                Base Token Creator uses cookies and similar technologies to enhance functionality, analyze usage, and improve our Web3 token creation platform.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>2. Types of Cookies We Use</h2>
              
              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>2.1 Essential Cookies</h3>
              <p className={`${typography.bodyText} mb-3`}>
                These cookies are necessary for the website to function properly:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-6`}>
                <li>• <strong>Wallet Connection:</strong> Remember your connected wallet and preferences</li>
                <li>• <strong>Security:</strong> Protect against cross-site request forgery (CSRF)</li>
                <li>• <strong>Navigation:</strong> Maintain your session state across pages</li>
                <li>• <strong>UI Preferences:</strong> Remember theme and layout settings</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>2.2 Analytics Cookies (Firebase)</h3>
              <p className={`${typography.bodyText} mb-3`}>
                We use Google Firebase Analytics to understand how users interact with our platform:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-6`}>
                <li>• <strong>_ga:</strong> Distinguishes unique users (expires in 2 years)</li>
                <li>• <strong>_ga_[CONTAINER-ID]:</strong> Persists session state (expires in 2 years)</li>
                <li>• <strong>_gat:</strong> Throttles request rate (expires in 1 minute)</li>
                <li>• <strong>_gid:</strong> Distinguishes users (expires in 24 hours)</li>
                <li>• <strong>_gtag:</strong> Enables advanced analytics features</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>2.3 Performance Cookies</h3>
              <p className={`${typography.bodyText} mb-3`}>
                These cookies help us optimize the website performance:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-6`}>
                <li>• <strong>Load Time Tracking:</strong> Measure page load speeds and optimization</li>
                <li>• <strong>Error Reporting:</strong> Track JavaScript errors and bugs</li>
                <li>• <strong>API Performance:</strong> Monitor blockchain interaction speeds</li>
                <li>• <strong>Resource Usage:</strong> Track bandwidth and storage usage</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>2.4 Functional Cookies</h3>
              <p className={`${typography.bodyText} mb-3`}>
                These cookies enhance your user experience:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>Language Preferences:</strong> Remember your language selection</li>
                <li>• <strong>Network Settings:</strong> Remember your preferred blockchain network</li>
                <li>• <strong>Token History:</strong> Store your recent token creation history</li>
                <li>• <strong>Notification Settings:</strong> Remember your notification preferences</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>3. Third-Party Cookies</h2>
              
              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>3.1 Firebase/Google Analytics</h3>
              <p className={`${typography.bodyText} mb-4`}>
                Google Firebase sets cookies to provide analytics services. These cookies help us understand:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-6`}>
                <li>• How users navigate through our platform</li>
                <li>• Which features are most popular</li>
                <li>• Geographic distribution of users</li>
                <li>• Device and browser usage patterns</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>3.2 Privy Authentication</h3>
              <p className={`${typography.bodyText} mb-4`}>
                Privy may set cookies for wallet authentication and user session management. These are essential for the Web3 functionality of our platform.
              </p>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>3.3 Content Delivery Network (CDN)</h3>
              <p className={typography.bodyText}>
                Our CDN providers may set cookies to optimize content delivery and website performance.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>4. Cookie Consent and Control</h2>
              
              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>4.1 Your Choices</h3>
              <p className={`${typography.bodyText} mb-4`}>
                You have several options for managing cookies:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6 mb-6`}>
                <li>• <strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies</li>
                <li>• <strong>Google Analytics Opt-out:</strong> Use the <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                <li>• <strong>Private Browsing:</strong> Use incognito/private mode to prevent cookie storage</li>
                <li>• <strong>Do Not Track:</strong> Enable Do Not Track in your browser settings</li>
              </ul>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>4.2 Impact of Disabling Cookies</h3>
              <p className={`${typography.bodyText} mb-3`}>
                Disabling cookies may affect your experience:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• You may need to reconnect your wallet on each visit</li>
                <li>• Preferences and settings will not be saved</li>
                <li>• Some features may not work properly</li>
                <li>• We cannot provide personalized analytics insights</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>5. How to Manage Cookies</h2>
              
              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>5.1 Browser Instructions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className={`${typography.sectionTitle} text-lg mb-2 text-blue-300`}>Chrome</h4>
                  <p className={`${typography.bodyText} text-sm`}>
                    Settings → Privacy and Security → Site Settings → Cookies
                  </p>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className={`${typography.sectionTitle} text-lg mb-2 text-blue-300`}>Firefox</h4>
                  <p className={`${typography.bodyText} text-sm`}>
                    Settings → Privacy & Security → Cookies and Site Data
                  </p>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className={`${typography.sectionTitle} text-lg mb-2 text-blue-300`}>Safari</h4>
                  <p className={`${typography.bodyText} text-sm`}>
                    Preferences → Privacy → Manage Website Data
                  </p>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className={`${typography.sectionTitle} text-lg mb-2 text-blue-300`}>Edge</h4>
                  <p className={`${typography.bodyText} text-sm`}>
                    Settings → Cookies and Site Permissions → Cookies
                  </p>
                </div>
              </div>

              <h3 className={`${typography.sectionTitle} text-xl mb-3 text-blue-400`}>5.2 Mobile Browsers</h3>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• <strong>iOS Safari:</strong> Settings → Safari → Privacy & Security</li>
                <li>• <strong>Android Chrome:</strong> Chrome Menu → Settings → Site Settings → Cookies</li>
                <li>• <strong>Mobile Firefox:</strong> Menu → Settings → Privacy & Security</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>6. Data Retention</h2>
              <p className={`${typography.bodyText} mb-4`}>
                Different cookies have different retention periods:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-600">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-left`}>Cookie Type</th>
                      <th className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-left`}>Retention Period</th>
                      <th className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-left`}>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-sm`}>Session Cookies</td>
                      <td className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-sm`}>Until browser closes</td>
                      <td className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-sm`}>Essential functionality</td>
                    </tr>
                    <tr>
                      <td className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-sm`}>Analytics Cookies</td>
                      <td className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-sm`}>Up to 2 years</td>
                      <td className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-sm`}>Usage tracking</td>
                    </tr>
                    <tr>
                      <td className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-sm`}>Preference Cookies</td>
                      <td className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-sm`}>1 year</td>
                      <td className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-sm`}>User settings</td>
                    </tr>
                    <tr>
                      <td className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-sm`}>Security Cookies</td>
                      <td className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-sm`}>30 minutes</td>
                      <td className={`${typography.bodyText} border border-gray-600 px-4 py-2 text-sm`}>CSRF protection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>7. International Transfers</h2>
              <p className={typography.bodyText}>
                Some of our service providers (like Google Firebase) may transfer and process your data in countries outside your region. We ensure appropriate safeguards are in place for such transfers, complying with applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>8. Children's Privacy</h2>
              <p className={typography.bodyText}>
                Our service is not directed to children under 18. We do not knowingly collect information from children. If you believe a child has provided us with information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>9. Updates to This Policy</h2>
              <p className={`${typography.bodyText} mb-4`}>
                We may update this Cookie Policy periodically to reflect changes in our practices or applicable laws. We will notify you of material changes by:
              </p>
              <ul className={`${typography.bodyText} space-y-2 ml-6`}>
                <li>• Updating the "Last updated" date at the top of this policy</li>
                <li>• Providing notice through our website or app</li>
                <li>• Sending email notifications for significant changes</li>
              </ul>
            </section>

            <section>
              <h2 className={`${typography.sectionTitle} text-2xl mb-4`}>10. Contact Us</h2>
              <p className={`${typography.bodyText} mb-4`}>
                If you have questions about our use of cookies or this Cookie Policy:
              </p>
              <div className={`${typography.bodyText} space-y-2`}>
                <p>Email: <a href="mailto:privacy@base-token-launcher.com" className="text-blue-400 hover:text-blue-300">privacy@base-token-launcher.com</a></p>
                <p>Privacy Policy: <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline">View our Privacy Policy</a></p>
                <p>Website: <a href="https://base-token-launcher.web.app" className="text-blue-400 hover:text-blue-300">base-token-launcher.web.app</a></p>
              </div>
            </section>

            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 mt-8">
              <p className={`${typography.bodyText} text-center font-medium`}>
                By continuing to use Base Token Creator, you consent to our use of cookies as described in this Cookie Policy.
              </p>
            </div>

          </div>

        </motion.div>
      </div>
    </>
  )
}