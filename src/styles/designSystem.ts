// Design System - Consistent styling across all pages

// Animation variants that should be used consistently
export const animations = {
  // Page entrance animation
  pageEnter: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  },
  
  // Fade in from top
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  
  // Slide in from left
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.2 }
  },
  
  // Scale in animation
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, delay: 0.4 }
  },
  
  // Stagger container for multiple items
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  // Hover effects
  hoverScale: {
    whileHover: { scale: 1.05, y: -5 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  
  // Button hover
  buttonHover: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
}

// Consistent spacing and layout
export const layout = {
  // Page container classes
  pageContainer: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
  narrowContainer: "mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8",
  
  // Section spacing
  sectionSpacing: "py-24",
  sectionSpacingSmall: "py-16",
  
  // Content spacing
  contentSpacing: "mb-12",
  contentSpacingSmall: "mb-8"
}

// Typography system
export const typography = {
  // Page titles - consistent across all pages
  pageTitle: "text-4xl sm:text-5xl font-bold tracking-tight mb-6",
  pageTitleGradient: "bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent",
  pageTitleWhite: "text-white",
  
  // Section titles  
  sectionTitle: "text-3xl sm:text-4xl font-bold text-white mb-6",
  
  // Card titles
  cardTitle: "text-2xl font-bold text-white mb-4",
  cardTitleSmall: "text-xl font-bold text-white mb-3",
  
  // Subtitles
  subtitle: "text-xl text-gray-300 mb-8 leading-relaxed",
  subtitleSmall: "text-lg text-gray-300 mb-6 leading-relaxed",
  
  // Body text
  bodyText: "text-gray-400 leading-relaxed text-base",
  bodyTextSmall: "text-gray-400 leading-relaxed text-sm",
  
  // Labels and metadata
  label: "text-sm font-medium text-gray-300",
  metadata: "text-xs text-gray-500 uppercase tracking-wide font-semibold",
  
  // Status text
  success: "text-green-400 font-medium",
  error: "text-red-400 font-medium",
  warning: "text-yellow-400 font-medium",
  info: "text-blue-400 font-medium",
  
  // Gradient text (for highlights) - same as page title gradient
  gradientText: "bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
}

// Color system
export const colors = {
  // Glass morphism cards
  glassCard: "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl",
  glassCardHover: "bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-xl border border-white/30 rounded-2xl",
  
  // Primary buttons
  primaryButton: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl",
  primaryButtonDisabled: "bg-gray-600 text-gray-400 rounded-xl cursor-not-allowed opacity-50",
  
  // Secondary buttons
  secondaryButton: "border-2 border-white/20 hover:border-white/40 text-white rounded-xl transition-all duration-300",
  tertiaryButton: "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg transition-all duration-200",
  
  // Form inputs
  input: "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20",
  inputError: "w-full px-4 py-3 bg-red-900/10 border border-red-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20",
  
  // Status backgrounds
  successBg: "bg-green-900/20 border border-green-500/30 rounded-lg",
  errorBg: "bg-red-900/20 border border-red-500/30 rounded-lg",
  warningBg: "bg-yellow-900/20 border border-yellow-500/30 rounded-lg",
  infoBg: "bg-blue-900/20 border border-blue-500/30 rounded-lg",
  
  // Badge colors
  badgeSuccess: "bg-green-600/20 text-green-400 border border-green-600/30",
  badgeError: "bg-red-600/20 text-red-400 border border-red-600/30",
  badgeWarning: "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30",
  badgeInfo: "bg-blue-600/20 text-blue-400 border border-blue-600/30",
  badgeNeutral: "bg-gray-600/20 text-gray-400 border border-gray-600/30",
  
  // Loading state
  loadingText: "text-gray-400 animate-pulse"
}

// Consistent floating background elements
export const floatingElements = {
  element1: {
    animate: { 
      y: [-15, 15, -15],
      rotate: [0, 180, 360],
    },
    transition: { 
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    },
    className: "absolute top-20 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"
  },
  
  element2: {
    animate: { 
      y: [15, -15, 15],
      x: [-5, 5, -5],
    },
    transition: { 
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    },
    className: "absolute bottom-40 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
  }
}

// Page header component structure
export const pageHeader = {
  container: "text-center mb-12",
  titleWithGradient: (text: string) => ({
    text,
    className: `text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6`
  }),
  subtitle: (text: string) => ({
    text,
    className: "text-xl text-gray-300 max-w-3xl mx-auto"
  })
}

// Consistent form styling
export const forms = {
  container: `${colors.glassCard} p-8`,
  gridTwoColumns: "grid grid-cols-1 md:grid-cols-2 gap-6",
  gridThreeColumns: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  fieldGroup: "space-y-2",
  label: "block text-sm font-medium text-gray-300 mb-2",
  labelRequired: "block text-sm font-medium text-gray-300 mb-2 after:content-['*'] after:text-red-400 after:ml-1",
  helpText: "text-xs text-gray-500 mt-1",
  errorText: "text-xs text-red-400 mt-1 flex items-center space-x-1",
  submitButton: `w-full py-4 text-lg font-semibold ${colors.primaryButton}`,
  submitButtonDisabled: `w-full py-4 text-lg font-semibold ${colors.primaryButtonDisabled}`,
  inputGroup: "relative",
  inputIcon: "absolute left-3 top-3 text-gray-400 w-5 h-5"
}

// Loading states
export const loadingStates = {
  pageLoading: "text-center text-gray-400 animate-pulse text-lg",
  spinner: "inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"
}