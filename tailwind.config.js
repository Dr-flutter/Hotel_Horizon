/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4fa',
          100: '#d9e2f2',
          200: '#b3c6e6',
          300: '#8daad9',
          400: '#668ecc',
          500: '#4072bf',
          600: '#335c99',
          700: '#264673',
          800: '#1A365D', // main primary
          900: '#0d1b2e',
        },
        secondary: {
          50: '#fdf8f0',
          100: '#f9edd9',
          200: '#f2dbb3',
          300: '#ebc98d',
          400: '#e5b768',
          500: '#DEA542',
          600: '#C69963', // main secondary
          700: '#9e7b4f',
          800: '#75583b',
          900: '#3d2e1e',
        },
        accent: {
          50: '#f5f5f5',
          100: '#e9e9e9',
          200: '#d9d9d9',
          300: '#c4c4c4',
          400: '#9e9e9e',
          500: '#7b7b7b',
          600: '#555555',
          700: '#434343',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg')",
        'tour-pattern': "url('https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
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
      },
    },
  },
  plugins: [],
};