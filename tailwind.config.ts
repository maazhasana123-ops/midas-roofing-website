import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C46A',
          bright: '#F0D070',
          dark: '#A8852E',
          muted: '#8B6B20',
        },
        dark: {
          DEFAULT: '#080808',
          card: '#101010',
          elevated: '#181818',
          border: '#252525',
          subtle: '#0C0C0C',
        },
        cream: '#F5F0E8',
      },
      fontFamily: {
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 3.5s linear infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2.5s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
        'border-pulse': 'borderPulse 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.5)' },
          '50%': { boxShadow: '0 0 0 10px rgba(201,168,76,0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top', opacity: '1' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top', opacity: '1' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom', opacity: '1' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom', opacity: '0' },
        },
        borderPulse: {
          '0%, 100%': { borderColor: 'rgba(201,168,76,0.2)' },
          '50%': { borderColor: 'rgba(201,168,76,0.5)' },
        },
      },
      boxShadow: {
        gold: '0 0 30px rgba(201, 168, 76, 0.15)',
        'gold-md': '0 0 48px rgba(201, 168, 76, 0.2)',
        'gold-lg': '0 0 80px rgba(201, 168, 76, 0.3)',
        'gold-inset': 'inset 0 1px 0 rgba(201,168,76,0.15)',
        card: '0 4px 32px rgba(0,0,0,0.5)',
        'card-hover': '0 12px 48px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C46A 50%, #C9A84C 100%)',
        'gold-radial': 'radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, transparent 70%)',
        'dark-gradient': 'linear-gradient(180deg, #080808 0%, #101010 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
export default config
