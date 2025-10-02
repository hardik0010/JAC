/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          white: '#FFFFFF',
          black: '#000000',
          dark: '#151616',
        },
        light: {
          gray: '#F8F9FA',
        },
        medium: {
          gray: '#6C757D',
        },
        border: {
          gray: '#E9ECEF',
        },
        text: {
          dark: '#212529',
          light: '#495057',
        },

        accent: {
          gray: '#4A5568',
          light: '#718096',
          dark: '#2D3748',
        }
      },
      fontFamily: {
        sans: ['Cabin', 'system-ui', 'sans-serif'],
        display: ['Libre Baskerville', 'serif'],
        body: ['Cabin', 'system-ui', 'sans-serif'],
        heading: ['Libre Baskerville', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
