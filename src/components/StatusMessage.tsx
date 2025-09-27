import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { colors, typography } from '../styles/designSystem'

interface StatusMessageProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  children: ReactNode
  actions?: ReactNode
  icon?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

const statusConfig = {
  success: {
    bg: colors.successBg,
    text: typography.success,
    icon: '✅'
  },
  error: {
    bg: colors.errorBg,
    text: typography.error,
    icon: '❌'
  },
  warning: {
    bg: colors.warningBg,
    text: typography.warning,
    icon: '⚠️'
  },
  info: {
    bg: colors.infoBg,
    text: typography.info,
    icon: '💡'
  }
}

export default function StatusMessage({
  type,
  title,
  children,
  actions,
  icon,
  dismissible = false,
  onDismiss
}: StatusMessageProps) {
  const config = statusConfig[type]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${config.bg} p-4 relative`}
    >
      <div className="flex items-start space-x-3">
        <span className="text-xl flex-shrink-0 mt-0.5">
          {icon || config.icon}
        </span>
        
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`${config.text} font-semibold mb-1`}>
              {title}
            </h3>
          )}
          
          <div className={`${config.text} text-sm`}>
            {children}
          </div>
          
          {actions && (
            <div className="mt-3 flex flex-wrap gap-2">
              {actions}
            </div>
          )}
        </div>
        
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-300 p-1 rounded transition-colors"
            aria-label="Dismiss message"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  )
}