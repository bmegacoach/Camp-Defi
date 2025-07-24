import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface FuturisticButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'wallet'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  glowEffect?: boolean
  hoverLift?: boolean
  children: React.ReactNode
}

export function FuturisticButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  glowEffect = false,
  hoverLift = false,
  className,
  children,
  disabled,
  ...props
}: FuturisticButtonProps) {
  const baseClasses = [
    // Base styling
    'relative inline-flex items-center justify-center font-medium transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-camp-dark',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    // Futuristic design elements
    'before:absolute before:inset-0 before:rounded-inherit before:border before:transition-all before:duration-300',
    'after:absolute after:inset-0 after:rounded-inherit after:transition-all after:duration-300',
    // Hover effects
    'hover:shadow-lg transform transition-transform duration-200',
    hoverLift && 'hover:-translate-y-0.5',
  ]

  const variantClasses = {
    primary: [
      // Background and text
      'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white',
      'before:bg-gradient-to-r before:from-blue-500/20 before:to-purple-500/20',
      'before:border-blue-400/50',
      // Hover states
      'hover:from-blue-500 hover:via-purple-500 hover:to-blue-700',
      'hover:before:border-blue-300/70',
      // Focus
      'focus:ring-blue-500/50',
      // Glow effect
      glowEffect && 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
      glowEffect && 'hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]',
    ],
    wallet: [
      // Unique wallet connect styling
      'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white',
      'before:bg-gradient-to-r before:from-indigo-400/30 before:via-blue-400/30 before:to-cyan-400/30',
      'before:border-cyan-400/60',
      'after:bg-gradient-to-r after:from-white/10 after:to-transparent after:opacity-0',
      // Hover states
      'hover:from-indigo-500 hover:via-blue-500 hover:to-cyan-500',
      'hover:before:border-cyan-300/80',
      'hover:after:opacity-100',
      // Wallet-specific glow
      'shadow-[0_0_25px_rgba(6,182,212,0.3)]',
      'hover:shadow-[0_0_35px_rgba(6,182,212,0.5)]',
      // Pulse animation for wallet
      'animate-pulse-slow',
    ],
    secondary: [
      'bg-gradient-to-r from-camp-silver-600 to-camp-silver-500 text-white',
      'before:border-camp-silver-400/50',
      'hover:from-camp-silver-500 hover:to-camp-silver-400',
      'hover:before:border-camp-silver-300/70',
      'focus:ring-camp-silver-500/50',
      glowEffect && 'shadow-[0_0_15px_rgba(156,163,175,0.3)]',
    ],
    ghost: [
      'bg-transparent text-camp-silver-300 border border-camp-silver-500/30',
      'before:bg-gradient-to-r before:from-camp-royal-500/10 before:to-purple-500/10 before:opacity-0',
      'before:border-camp-royal-400/30',
      'hover:text-white hover:before:opacity-100',
      'hover:border-camp-royal-400/50',
      'focus:ring-camp-royal-500/50',
    ],
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
    xl: 'px-8 py-4 text-lg rounded-2xl',
  }

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  return (
    <motion.button
      className={combinedClasses}
      disabled={disabled || loading}
      whileHover={{ scale: hoverLift ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit overflow-hidden opacity-50"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'linear',
        }}
      >
        <div className="h-full w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      </motion.div>

      {/* Content */}
      <span className="relative z-10 flex items-center space-x-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>{children}</span>
      </span>

      {/* Particle effects for primary buttons */}
      {variant === 'primary' && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-60"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </>
      )}

      {/* Special effects for wallet button */}
      {variant === 'wallet' && (
        <motion.div
          className="absolute inset-0 rounded-inherit bg-gradient-to-r from-cyan-400/20 to-blue-400/20"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.button>
  )
}

// Custom CSS for additional animations
export const futuristicButtonStyles = `
  @keyframes pulse-slow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
    }
    50% {
      box-shadow: 0 0 40px rgba(6, 182, 212, 0.5);
    }
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }
`
