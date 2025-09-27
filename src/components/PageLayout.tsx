import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { animations, layout, floatingElements } from '../styles/designSystem'

interface PageLayoutProps {
  children: ReactNode
  showFloatingElements?: boolean
  containerSize?: 'full' | 'narrow'
  className?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  showGradientTitle?: boolean
  className?: string
}

export function PageLayout({ 
  children, 
  showFloatingElements = false, 
  containerSize = 'full',
  className = ''
}: PageLayoutProps) {
  const containerClass = containerSize === 'narrow' ? layout.narrowContainer : layout.pageContainer
  
  return (
    <motion.div 
      className={`${containerClass} ${className} relative`}
      {...animations.pageEnter}
    >
      {/* Floating Background Elements */}
      {showFloatingElements && (
        <>
          <motion.div
            {...floatingElements.element1}
          />
          <motion.div
            {...floatingElements.element2}
          />
        </>
      )}
      
      {children}
    </motion.div>
  )
}

export function PageHeader({ 
  title, 
  subtitle, 
  showGradientTitle = true,
  className = ''
}: PageHeaderProps) {
  return (
    <motion.div 
      className={`text-center mb-12 ${className}`}
      variants={animations.staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.h1 
        variants={animations.fadeInUp}
        className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          {title}
        </motion.span>
      </motion.h1>
      
      {subtitle && (
        <motion.p 
          variants={animations.fadeInUp}
          className="text-xl text-gray-300 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}