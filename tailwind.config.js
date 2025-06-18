import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.jsx',
    './resources/**/*.vue',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        osunblue: {
          DEFAULT: '#130447',
          50: '#E7E6EC',
          100: '#CFCEDA',
          200: '#9F9DB5',
          300: '#6F6C90',
          400: '#3F3B6B',
          500: '#130447',
          600: '#0F033A',
          700: '#0B022D',
          800: '#070120',
          900: '#030013',
        },
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
    },
  },

  plugins: [forms],
};
