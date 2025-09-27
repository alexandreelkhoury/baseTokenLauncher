import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { useFirebaseAnalytics } from '../components/FirebaseProvider'
import { trackPageView } from '../utils/analytics'
import SEO from '../components/SEO'
import { layout, typography, colors } from '../styles/designSystem'
import { guides } from '../data/guidesData'

// Modern animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: { 
    y: -8, 
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

export default function GuidesPage() {
  const analytics = useFirebaseAnalytics()
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null)
  const [openedGuides, setOpenedGuides] = useState<Set<string>>(new Set())
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    trackPageView(analytics, 'guides')
  }, [analytics])

  // Handle direct guide access from URL params (for FAQ redirects)
  useEffect(() => {
    const guideParam = searchParams.get('guide')
    if (guideParam && guides.some(g => g.id === guideParam)) {
      handleGuideClick(guideParam)
      // Clean up URL
      setSearchParams({})
    }
  }, [searchParams, setSearchParams])

  const handleGuideClick = (guideId: string) => {
    setSelectedGuide(guideId)
    setOpenedGuides(prev => new Set(prev).add(guideId))
    // Scroll to top when opening a guide
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  const currentGuide = guides.find(g => g.id === selectedGuide)
  const currentIndex = guides.findIndex(g => g.id === selectedGuide)
  const previousGuide = currentIndex > 0 ? guides[currentIndex - 1] : null
  const nextGuide = currentIndex < guides.length - 1 ? guides[currentIndex + 1] : null

  const guidesPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Base Token Creation Guide",
    "description": "Complete step-by-step guide to creating ERC20 tokens on Base blockchain",
    "url": "https://base-token-creator.com/guides",
    "step": guides.map(guide => ({
      "@type": "HowToStep",
      "name": guide.title,
      "text": guide.description
    }))
  }

  // Guide Selection View
  if (!selectedGuide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <SEO
          title="Base Token Creation Guides | Complete Step-by-Step Tutorials"
          description="Master Base token creation with our comprehensive guides. Learn token deployment, liquidity management, security best practices, and exchange listings on Base blockchain."
          keywords="base token guides, token creation tutorial, base blockchain guide, erc20 token deployment, liquidity management, token security"
          canonical="/guides"
          structuredData={guidesPageStructuredData}
        />
        
        <div className={`relative z-10 ${layout.pageContainer} pb-20`}>
          {/* Modern Header with Hero Section */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8"
            >
              <span className="text-sm font-medium text-blue-400">📚 Step-by-Step Learning</span>
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className={typography.pageTitleGradient}>
                Token Creation
              </span>
              <br />
              <span className={typography.pageTitleWhite}>
                Guides
              </span>
            </motion.h1>
            
            <motion.p 
              className={`${typography.subtitle} max-w-4xl mx-auto text-xl sm:text-2xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Master Base token creation with our comprehensive step-by-step tutorials
            </motion.p>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center items-center space-x-8 mt-12"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{guides.length}</div>
                <div className="text-sm text-gray-400">Comprehensive Guides</div>
              </div>
              <div className="w-px h-8 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{openedGuides.size}</div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
              <div className="w-px h-8 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">100%</div>
                <div className="text-sm text-gray-400">Free Access</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Modern Guides Grid */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={typography.sectionTitle}>
                Choose Your Learning Path
              </h2>
              <p className={`${typography.subtitle} max-w-2xl mx-auto`}>
                From basics to advanced strategies, master every aspect of token creation
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {guides.map((guide, index) => (
                <motion.div
                  key={guide.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: index * 0.15 }}
                  onClick={() => handleGuideClick(guide.id)}
                  className="group cursor-pointer relative"
                >
                  {/* Card background with design system glassmorphism */}
                  <div className={`absolute inset-0 ${colors.glassCard} group-hover:${colors.glassCardHover.replace('bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-xl border border-white/30 rounded-2xl', 'border-white/[0.25]')} transition-all duration-500 rounded-3xl backdrop-blur-2xl`}></div>
                  
                  {/* Gradient border effect on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-sm -z-10"></div>
                  
                  <div className="relative p-8 lg:p-10">
                    {/* Checkmark for opened guides */}
                    {openedGuides.has(guide.id) && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Icon with modern styling */}
                    <motion.div 
                      variants={iconVariants}
                      whileHover="hover"
                      className={`w-20 h-20 rounded-2xl mb-8 flex items-center justify-center bg-gradient-to-r ${guide.gradient} shadow-2xl group-hover:shadow-3xl transition-shadow duration-500`}
                    >
                      <div className="text-4xl">{guide.icon}</div>
                    </motion.div>
                    
                    {/* Content */}
                    <h3 className={`${typography.cardTitle} text-3xl group-hover:text-blue-300 transition-all duration-300`}>
                      {guide.title}
                    </h3>
                    
                    <p className={`${typography.bodyText} text-gray-300 text-lg leading-relaxed mb-8 group-hover:text-gray-200 transition-colors duration-300`}>
                      {guide.description}
                    </p>
                    
                    {/* Action button */}
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center ${typography.info} group-hover:text-blue-300 transition-colors duration-300`}>
                        <span className="font-semibold text-lg">Start Learning</span>
                        <motion.svg 
                          className="w-5 h-5 ml-2"
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </div>
                      
                      {/* Difficulty indicator */}
                      <div className="flex items-center">
                        <div className="flex space-x-1">
                          {[...Array(Math.min(index + 1, 5))].map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                          ))}
                          {[...Array(Math.max(0, 5 - (index + 1)))].map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-gray-600"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ready to Launch CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-20"
          >
            <div className="relative max-w-4xl mx-auto">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
              
              {/* CTA Card */}
              <div className={`relative ${colors.glassCard} rounded-3xl p-8 lg:p-12 text-center border-white/[0.2]`}>
                <div className="mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center p-3">
                    <img 
                      src="/LOGO.png" 
                      alt="Base Token Creator Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <h3 className={`${typography.sectionTitle} text-3xl lg:text-4xl mb-4`}>
                    Ready to <span className={typography.gradientText.replace('bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent')}>Launch</span>?
                  </h3>
                  
                  <p className={`${typography.subtitle} text-xl mb-8 max-w-2xl mx-auto`}>
                    Put your knowledge to work. Create your first ERC20 token on Base blockchain in minutes.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.a
                    href="/create"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center px-8 py-4 ${colors.primaryButton} font-semibold text-lg`}
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Your Token
                  </motion.a>
                  
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/faq"
                      className={`inline-flex items-center px-8 py-4 ${colors.secondaryButton} font-medium text-lg`}
                    >
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Quick Questions?
                    </Link>
                  </motion.div>
                </div>

                {/* Trust indicators */}
                <div className="flex justify-center items-center space-x-8 mt-8 pt-8 border-t border-white/10">
                  <div className={`flex items-center space-x-2 ${typography.bodyText}`}>
                    <svg className={`w-5 h-5 ${typography.success.replace('font-medium', '')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className={typography.label}>No Code Required</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${typography.bodyText}`}>
                    <svg className={`w-5 h-5 ${typography.info.replace('font-medium', '')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className={typography.label}>15s Deploy</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${typography.bodyText}`}>
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className={typography.label}>Low Cost</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Individual Guide View  
  if (currentGuide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className={`relative z-10 ${layout.narrowContainer} pb-20`}>
          {/* Modern Back Button */}
          <motion.button
            onClick={() => setSelectedGuide(null)}
            className={`mb-8 flex items-center px-4 py-2 ${colors.secondaryButton} transition-all duration-300`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className={typography.label}>Back to Guides</span>
          </motion.button>

          {/* Modern Guide Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <motion.div 
              className={`inline-flex w-24 h-24 rounded-3xl mb-8 items-center justify-center bg-gradient-to-r ${currentGuide.gradient} shadow-2xl`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <div className="text-5xl">{currentGuide.icon}</div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className={typography.pageTitleGradient}>
                {currentGuide.title}
              </span>
            </motion.h1>
            
            <motion.p 
              className={`${typography.subtitle} text-xl sm:text-2xl max-w-3xl mx-auto`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {currentGuide.description}
            </motion.p>

          </motion.div>

          {/* Modern Guide Content */}
          <motion.div 
            className="space-y-10 mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {currentGuide.content.map((section, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                {/* Step number indicator */}
                <div className="flex items-start space-x-8">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-2xl">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Content card */}
                  <div className="flex-1">
                    <div className={`relative ${colors.glassCard} group-hover:${colors.glassCardHover.replace('bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-xl border border-white/30 rounded-2xl', 'border-white/[0.25]')} rounded-3xl p-8 lg:p-10 transition-all duration-500`}>
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-sm -z-10"></div>
                      
                      <h3 className={`${typography.cardTitle} text-2xl lg:text-3xl mb-6 group-hover:text-blue-300 transition-all duration-300`}>
                        {section.title}
                      </h3>
                      
                      <div className={`${typography.bodyText} text-gray-300 leading-relaxed text-lg space-y-4`}>
                        {section.text.split('\n').map((paragraph, pIndex) => {
                          if (!paragraph.trim()) return null
                          
                          // Handle bold headers (e.g., **Step 1: Header**)
                          if (paragraph.includes('**') && paragraph.includes(':')) {
                            const boldMatch = paragraph.match(/\*\*(.*?)\*\*(.*)/);
                            if (boldMatch) {
                              return (
                                <div key={pIndex} className="mb-4">
                                  <h4 className="text-xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors duration-300">
                                    {boldMatch[1]}
                                  </h4>
                                  {boldMatch[2] && (
                                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                                      {boldMatch[2].trim()}
                                    </p>
                                  )}
                                </div>
                              )
                            }
                          }
                          
                          // Handle bullet points
                          if (paragraph.startsWith('• ')) {
                            const bulletText = paragraph.substring(2);
                            // Check for bold text within bullets
                            const boldInBullet = bulletText.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
                            
                            return (
                              <div key={pIndex} className="flex items-start space-x-3 py-1">
                                <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2"></div>
                                <p 
                                  className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
                                  dangerouslySetInnerHTML={{ __html: boldInBullet }}
                                />
                              </div>
                            )
                          }
                          
                          // Handle arrows and special formatting
                          const formattedText = paragraph
                            .replace(/→/g, '<span class="text-blue-400 font-bold">→</span>')
                            .replace(/✅/g, '<span class="text-green-400">✅</span>')
                            .replace(/❌/g, '<span class="text-red-400">❌</span>')
                            .replace(/💡/g, '<span class="text-yellow-400">💡</span>')
                            .replace(/🔒/g, '<span class="text-purple-400">🔒</span>')
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                          
                          return (
                            <p 
                              key={pIndex} 
                              className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: formattedText }}
                            />
                          )
                        })}
                      </div>

                    </div>
                  </div>
                </div>
                
                {/* Connecting line (except for last item) */}
                {index < currentGuide.content.length - 1 && (
                  <div className="ml-6 mt-6 w-px h-8 bg-gradient-to-b from-blue-500/50 to-purple-500/50"></div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Modern Navigation */}
          <motion.div 
            className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 lg:space-x-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Previous Guide Button */}
            {previousGuide ? (
              <motion.button
                onClick={() => handleGuideClick(previousGuide.id)}
                className={`group flex items-center px-8 py-4 ${colors.glassCard} hover:${colors.glassCardHover.replace('bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-xl border border-white/30 rounded-2xl', 'border-white/[0.25]')} transition-all duration-300 w-full lg:w-auto`}
                whileHover={{ scale: 1.02, x: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-gray-600 to-gray-500 flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className={`${typography.bodyTextSmall} group-hover:text-gray-300 transition-colors`}>Previous</div>
                    <div className={`${typography.pageTitleWhite} font-semibold group-hover:text-transparent group-hover:${typography.gradientText.replace('bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text')} transition-all duration-300`}>
                      {previousGuide.title}
                    </div>
                  </div>
                </div>
              </motion.button>
            ) : <div className="w-full lg:w-auto" />}

            {/* Completion indicator */}
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">Guide Progress</div>
                <div className="flex space-x-1">
                  {guides.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index <= currentIndex
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Next Guide Button or Final CTA */}
            {nextGuide ? (
              <motion.button
                onClick={() => handleGuideClick(nextGuide.id)}
                className={`group flex items-center px-8 py-4 ${colors.glassCard} hover:${colors.glassCardHover.replace('bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-xl border border-white/30 rounded-2xl', 'border-white/[0.25]')} transition-all duration-300 w-full lg:w-auto`}
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`${typography.bodyTextSmall} group-hover:text-gray-300 transition-colors`}>Next</div>
                    <div className={`${typography.pageTitleWhite} font-semibold group-hover:text-transparent group-hover:${typography.gradientText.replace('bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text')} transition-all duration-300`}>
                      {nextGuide.title}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-gray-600 to-gray-500 flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            ) : (
              <motion.a
                href="/create"
                className={`group flex items-center px-8 py-4 ${colors.primaryButton} w-full lg:w-auto`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`${typography.bodyTextSmall} text-blue-100`}>Ready to start?</div>
                    <div className={`${typography.label} font-semibold text-lg`}>Create Your Token</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    )
  }

  return null
}