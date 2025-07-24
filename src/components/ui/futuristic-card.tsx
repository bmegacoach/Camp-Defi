import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FuturisticCardProps {
  children: React.ReactNode
  variant?: 'primary' | 'elevated' | 'glass' | 'neon'
  className?: string
  hoverable?: boolean
  glowEffect?: boolean
  scanlines?: boolean
  borderAnimation?: boolean
}

export function FuturisticCard({
  children,
  variant = 'primary',
  className,
  hoverable = false,
  glowEffect = false,
  scanlines = false,
  borderAnimation = false,
}: FuturisticCardProps) {
  const baseClasses = [
    'relative overflow-hidden transition-all duration-500',
    'before:absolute before:inset-0 before:transition-all before:duration-500',
    'after:absolute after:inset-0 after:transition-all before:duration-500',
  ]

  const variantClasses = {
    primary: [
      'bg-gradient-to-br from-camp-dark-light/80 to-camp-dark/60',
      'border border-camp-silver-200/20',
      'before:bg-gradient-to-br before:from-blue-500/5 before:to-purple-500/5',
      'backdrop-blur-sm',
      hoverable && 'hover:border-camp-royal-400/40',
      hoverable && 'hover:before:from-blue-500/10 hover:before:to-purple-500/10',
      glowEffect && 'shadow-[0_0_15px_rgba(59,130,246,0.1)]',
      glowEffect && hoverable && 'hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]',
    ],
    elevated: [
      'bg-gradient-to-br from-camp-dark-light/90 to-camp-dark-light/70',
      'border border-camp-royal-500/30',
      'before:bg-gradient-to-br before:from-camp-royal-500/10 before:to-purple-500/10',
      'shadow-xl shadow-camp-royal-500/10',
      'backdrop-blur-md',
      hoverable && 'hover:border-camp-royal-400/50',
      hoverable && 'hover:shadow-2xl hover:shadow-camp-royal-500/20',
      hoverable && 'hover:-translate-y-1',
    ],
    glass: [
      'bg-white/5 backdrop-blur-xl',
      'border border-white/10',
      'before:bg-gradient-to-br before:from-white/5 before:to-transparent',
      'shadow-2xl shadow-black/20',
      hoverable && 'hover:bg-white/10',
      hoverable && 'hover:border-white/20',
    ],
    neon: [
      'bg-gradient-to-br from-camp-dark/90 to-camp-dark-light/80',
      'border-2 border-cyan-400/50',
      'before:bg-gradient-to-br before:from-cyan-400/10 before:to-blue-400/10',
      'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
      hoverable && 'hover:border-cyan-300/70',
      hoverable && 'hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]',
    ],
  }

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    className
  )

  return (
    <motion.div
      className={combinedClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverable ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Border animation */}
      {borderAnimation && (
        <motion.div
          className="absolute inset-0 rounded-inherit"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)',
            maskImage: 'linear-gradient(90deg, transparent 0%, black 50%, transparent 100%)',
          }}
          animate={{
            transform: ['translateX(-100%)', 'translateX(100%)'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'linear',
          }}
        />
      )}

      {/* Scanlines effect */}
      {scanlines && (
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(59, 130, 246, 0.1) 2px,
              rgba(59, 130, 246, 0.1) 4px
            )`,
          }}
        />
      )}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-camp-royal-400/50" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-camp-royal-400/50" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-camp-royal-400/50" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-camp-royal-400/50" />

      {/* Floating particles */}
      {glowEffect && variant === 'neon' && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
            />
          ))}
        </>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// Preset card components for common use cases
export function HologramCard({ children, className, ...props }: Omit<FuturisticCardProps, 'variant'>) {
  return (
    <FuturisticCard
      variant="glass"
      hoverable
      glowEffect
      className={cn('rounded-2xl p-6', className)}
      {...props}
    >
      {children}
    </FuturisticCard>
  )
}

export function CyberCard({ children, className, ...props }: Omit<FuturisticCardProps, 'variant'>) {
  return (
    <FuturisticCard
      variant="neon"
      hoverable
      glowEffect
      scanlines
      borderAnimation
      className={cn('rounded-xl p-6', className)}
      {...props}
    >
      {children}
    </FuturisticCard>
  )
}

export function DataCard({ children, className, ...props }: Omit<FuturisticCardProps, 'variant'>) {
  return (
    <FuturisticCard
      variant="elevated"
      hoverable
      className={cn('rounded-2xl p-6', className)}
      {...props}
    >
      {children}
    </FuturisticCard>
  )
}
