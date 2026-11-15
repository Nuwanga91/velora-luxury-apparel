/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velora: {
          50: '#FAF8F5',
          100: '#F3EFEA',
          200: '#E6DFD5',
          300: '#D5C7B5',
          400: '#BFAC95',
          500: '#A48E74',
          600: '#8C755D',
          700: '#715D49',
          800: '#4D3E31',
          900: '#2A221B',
          950: '#14100D',
        },
        gold: {
          light: '#F5E6BE',
          DEFAULT: '#D4AF37',
          dark: '#AA820A',
        },
        noir: {
          900: '#0C0C0E',
          800: '#151518',
          700: '#1F1F24',
          600: '#2E2E36',
          500: '#454550',
          400: '#737380',
          300: '#A3A3B0',
          200: '#D4D4DE',
          100: '#ECECEF',
          50: '#F6F6F8'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
        'luxury-lg': '0 30px 60px -20px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 25px rgba(212, 175, 55, 0.25)',
      },
      letterSpacing: {
        'widest-plus': '0.25em',
        'luxury': '0.18em',
      }
    },
  },
  plugins: [],
}
