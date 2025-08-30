// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx,scss}',
    './components/**/*.{js,ts,jsx,tsx,mdx,scss}',
    './styles/**/*.{js,ts,jsx,tsx,mdx,scss}',
    './app/**/*.{js,ts,jsx,tsx,mdx,scss}',
  ],
  theme: {
    // 👇 The container object should also be inside extend
    // to avoid overwriting other theme properties like screens.
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      container: { // ✅ Move container inside extend
        padding: {
          DEFAULT: '16px',
        },
      },
      colors: { // ✅ Move your colors object here
        transparent: 'transparent',
        // green: {
        //   DEFAULT: '#D2EF9A',
        //   100: '#f7fdf0',
        //   200: '#eefce1',
        //   300: '#e5fad2',
        //   400: '#dcf8c3',
        //   500: '#D2EF9A',
        //   600: '#c4e885',
        //   700: '#b6e170',
        //   800: '#a8da5b',
        //   900: '#9ad346',
        // },
        black: {
          DEFAULT: '#1F1F1F',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#1F1F1F',
          600: '#1a1a1a',
          700: '#151515',
          800: '#101010',
          900: '#0b0b0b',
        },
        secondary: '#696C70',
        secondary2: '#A0A0A0',
        white: '#ffffff',
        surface: '#F7F7F7',
        red: {
          DEFAULT: '#DB4444',
          100: '#fdeaea',
          200: '#fbd5d5',
          300: '#f9c0c0',
          400: '#f7abab',
          500: '#DB4444',
          600: '#c73d3d',
          700: '#b33636',
          800: '#9f2f2f',
          900: '#8b2828',
        },
        purple: {
          DEFAULT: '#8684D4',
          100: '#f1f1fb',
          200: '#e3e3f7',
          300: '#d5d5f3',
          400: '#c7c7ef',
          500: '#8684D4',
          600: '#7a78c7',
          700: '#6e6cba',
          800: '#6260ad',
          900: '#5654a0',
        },
        success: '#3DAB25',
        yellow: {
          DEFAULT: '#ECB018',
          100: '#fef9ed',
          200: '#fdf3db',
          300: '#fcedc9',
          400: '#fbe7b7',
          500: '#ECB018',
          600: '#d49e16',
          700: '#bc8c14',
          800: '#a47a12',
          900: '#8c6810',
        },
        pink: {
          DEFAULT: '#F4407D',
          100: '#feebf1',
          200: '#fdd7e3',
          300: '#fcc3d5',
          400: '#fbafc7',
          500: '#F4407D',
          600: '#dc3a71',
          700: '#c43465',
          800: '#ac2e59',
          900: '#94284d',
        },
        line: '#E9E9E9',
        outline: 'rgba(0, 0, 0, 0.15)',
        surface2: 'rgba(255, 255, 255, 0.2)',
        surface1: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;