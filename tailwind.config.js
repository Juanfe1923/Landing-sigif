/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#0a0c10',
          900: '#0f131a',
          800: '#161b25',
          700: '#1f2632',
          600: '#2a3340',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'blur-in': {
          '0%': { opacity: '0', filter: 'blur(12px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'drift': {
          '0%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(30px, -40px)' },
          '66%': { transform: 'translate(-20px, 20px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'drift-slow': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-40px, 30px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(2000%)', opacity: '0' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(40px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        'slide-out-left': {
          '0%': { opacity: '1', transform: 'translateX(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateX(-40px) scale(0.97)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-40px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        'slide-out-right': {
          '0%': { opacity: '1', transform: 'translateX(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateX(40px) scale(0.97)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)' },
        },
        'confetti-drop': {
          '0%': { opacity: '0', transform: 'translateY(-20px) scale(0.5)' },
          '50%': { opacity: '1', transform: 'translateY(5px) scale(1.1)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'fade-left': 'fade-left 0.7s ease-out forwards',
        'fade-right': 'fade-right 0.7s ease-out forwards',
        'scale-in': 'scale-in 0.6s ease-out forwards',
        'blur-in': 'blur-in 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.5s ease-out infinite',
        'drift': 'drift 20s ease-in-out infinite',
        'drift-slow': 'drift-slow 28s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scan-line': 'scan-line 4s ease-in-out infinite',
        'slide-down': 'slide-down 0.3s ease-out forwards',
        'bounce-in': 'bounce-in 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-out-left': 'slide-out-left 0.4s cubic-bezier(0.7, 0, 0.84, 0) forwards',
        'slide-in-left': 'slide-in-left 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-out-right': 'slide-out-right 0.4s cubic-bezier(0.7, 0, 0.84, 0) forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'confetti-drop': 'confetti-drop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
    },
  },
  plugins: [],
};
