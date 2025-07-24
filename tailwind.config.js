/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				// CAMP Elite Brand Colors
				'camp-royal': {
					50: '#EFF6FF',
					100: '#DBEAFE',
					200: '#BFDBFE',
					300: '#93C5FD',
					400: '#60A5FA',
					500: '#3B82F6',
					600: '#2563EB',
					700: '#1D4ED8',
					800: '#1E40AF',
					900: '#1E3A8A', // Primary brand color
					950: '#172554',
				},
				'camp-silver': {
					50: '#F9FAFB',
					100: '#F3F4F6',
					200: '#E5E7EB', // Primary silver
					300: '#D1D5DB',
					400: '#9CA3AF',
					500: '#6B7280',
					600: '#4B5563',
					700: '#374151',
					800: '#1F2937',
					900: '#111827',
				},
				'camp-dark': {
					DEFAULT: '#0F172A', // Primary dark background
					light: '#1E293B',
					medium: '#334155',
					heavy: '#0A0F1C',
				},
				// Shadcn/ui compatible colors
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			fontFamily: {
				'display': ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
				'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
				'mono': ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'monospace'],
			},
			fontSize: {
				'display-2xl': ['4.5rem', { lineHeight: '1.1', fontWeight: '700' }],
				'display-xl': ['3.75rem', { lineHeight: '1.1', fontWeight: '700' }],
				'display-lg': ['3rem', { lineHeight: '1.1', fontWeight: '600' }],
			},
			backgroundImage: {
				'gradient-royal-primary': 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
				'gradient-royal-secondary': 'linear-gradient(135deg, #1D4ED8 0%, #60A5FA 100%)',
				'gradient-silver-accent': 'linear-gradient(135deg, #E5E7EB 0%, #F3F4F6 100%)',
				'gradient-dark-royal': 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
				'gradient-button-primary': 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
				'gradient-button-hover': 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
				'gradient-card-elevated': 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
			},
			boxShadow: {
				'soft': '0 4px 20px rgba(0, 0, 0, 0.1)',
				'medium': '0 8px 30px rgba(0, 0, 0, 0.15)',
				'strong': '0 20px 60px rgba(0, 0, 0, 0.3)',
				'royal': '0 10px 40px rgba(30, 58, 138, 0.3)',
				'glow': '0 0 30px rgba(59, 130, 246, 0.4)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
			},
			backdropBlur: {
				'glass': '20px',
				'glass-strong': '30px',
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'fadeInUp': 'fadeInUp 0.8s ease-out',
				'pulseGlow': 'pulseGlow 2s ease-in-out infinite',
				'slideInRight': 'slideInRight 0.3s ease-out',
				'scaleIn': 'scaleIn 0.2s ease-out',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				fadeInUp: {
					from: {
						opacity: '0',
						transform: 'translate3d(0, 40px, 0)',
					},
					to: {
						opacity: '1',
						transform: 'translate3d(0, 0, 0)',
					},
				},
				pulseGlow: {
					'0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
				},
				slideInRight: {
					from: {
						opacity: '0',
						transform: 'translateX(100%)',
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				scaleIn: {
					from: {
						opacity: '0',
						transform: 'scale(0.9)',
					},
					to: {
						opacity: '1',
						transform: 'scale(1)',
					},
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		function({ addUtilities }) {
			const newUtilities = {
				'.glass-effect': {
					background: 'rgba(30, 41, 59, 0.7)',
					backdropFilter: 'blur(20px)',
					border: '1px solid rgba(255, 255, 255, 0.1)',
				},
				'.glass-effect-strong': {
					background: 'rgba(15, 23, 42, 0.8)',
					backdropFilter: 'blur(30px) saturate(150%)',
					border: '1px solid rgba(59, 130, 246, 0.2)',
				},
				'.hover-lift': {
					transition: 'transform 0.3s ease',
					'&:hover': {
						transform: 'translateY(-8px)',
					},
				},
				'.hover-scale': {
					transition: 'transform 0.3s ease',
					'&:hover': {
						transform: 'scale(1.05)',
					},
				},
				'.hover-glow': {
					transition: 'box-shadow 0.3s ease',
					'&:hover': {
						boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
					},
				},
			}
			addUtilities(newUtilities)
		}
	],
}