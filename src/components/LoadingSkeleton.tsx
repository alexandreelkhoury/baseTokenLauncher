import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  lines?: number
  height?: string
  className?: string
  animate?: boolean
}

export function LoadingSkeleton({ 
  lines = 3, 
  height = 'h-4', 
  className = '', 
  animate = true 
}: LoadingSkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className={`bg-gray-700/50 rounded ${height} ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
          animate={animate ? {
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={animate ? {
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.1
          } : {}}
        />
      ))}
    </div>
  )
}

export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center space-x-4 mb-4">
        <motion.div
          className="w-12 h-12 bg-gray-700/50 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="flex-1">
          <LoadingSkeleton lines={2} height="h-3" />
        </div>
      </div>
      <LoadingSkeleton lines={3} height="h-3" />
    </div>
  )
}

export function FormSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-6 ${className}`}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <LoadingSkeleton lines={1} height="h-3" className="w-1/4" />
          <LoadingSkeleton lines={1} height="h-12" />
        </div>
      ))}
      <LoadingSkeleton lines={1} height="h-12" className="w-full" />
    </div>
  )
}