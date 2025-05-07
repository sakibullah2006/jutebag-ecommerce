import * as asRatio from "@tailwindcss/aspect-ratio"
import * as container_quries from "@tailwindcss/container-queries"
import * as forms from "@tailwindcss/forms"
import * as typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './lib/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          background: {
            DEFAULT: 'oklch(1 0 0)',
            dark: 'oklch(0.145 0 0)',
          },
          foreground: {
            DEFAULT: 'oklch(0.145 0 0)',
            dark: 'oklch(0.985 0 0)',
          },
          primary: {
            DEFAULT: 'oklch(0.205 0 0)',
            foreground: 'oklch(0.985 0 0)',
            dark: 'oklch(0.922 0 0)',
            'dark-foreground': 'oklch(0.205 0 0)',
          },
          secondary: {
            DEFAULT: 'oklch(0.97 0 0)',
            foreground: 'oklch(0.205 0 0)',
            dark: 'oklch(0.269 0 0)',
            'dark-foreground': 'oklch(0.985 0 0)',
          },
          muted: {
            DEFAULT: 'oklch(0.97 0 0)',
            foreground: 'oklch(0.556 0 0)',
            dark: 'oklch(0.269 0 0)',
            'dark-foreground': 'oklch(0.708 0 0)',
          },
          accent: {
            DEFAULT: 'oklch(0.97 0 0)',
            foreground: 'oklch(0.205 0 0)',
            dark: 'oklch(0.269 0 0)',
            'dark-foreground': 'oklch(0.985 0 0)',
          },
          destructive: {
            DEFAULT: 'oklch(0.577 0.245 27.325)',
            dark: 'oklch(0.704 0.191 22.216)',
          },
          border: {
            DEFAULT: 'oklch(0.922 0 0)',
            dark: 'oklch(1 0 0 / 10%)',
          },
          input: {
            DEFAULT: 'oklch(0.922 0 0)',
            dark: 'oklch(1 0 0 / 15%)',
          },
          ring: {
            DEFAULT: 'oklch(0.708 0 0)',
            dark: 'oklch(0.556 0 0)',
          },
          chart: {
            1: 'oklch(0.646 0.222 41.116)',
            2: 'oklch(0.6 0.118 184.704)',
            3: 'oklch(0.398 0.07 227.392)',
            4: 'oklch(0.828 0.189 84.429)',
            5: 'oklch(0.769 0.188 70.08)',
            'dark-1': 'oklch(0.488 0.243 264.376)',
            'dark-2': 'oklch(0.696 0.17 162.48)',
            'dark-3': 'oklch(0.769 0.188 70.08)',
            'dark-4': 'oklch(0.627 0.265 303.9)',
            'dark-5': 'oklch(0.645 0.246 16.439)',
          },
          sidebar: {
            DEFAULT: 'oklch(0.985 0 0)',
            foreground: 'oklch(0.145 0 0)',
            primary: 'oklch(0.205 0 0)',
            'primary-foreground': 'oklch(0.985 0 0)',
            accent: 'oklch(0.97 0 0)',
            'accent-foreground': 'oklch(0.205 0 0)',
            border: 'oklch(0.922 0 0)',
            ring: 'oklch(0.708 0 0)',
            dark: 'oklch(0.205 0 0)',
            'dark-foreground': 'oklch(0.985 0 0)',
            'dark-primary': 'oklch(0.488 0.243 264.376)',
            'dark-primary-foreground': 'oklch(0.985 0 0)',
            'dark-accent': 'oklch(0.269 0 0)',
            'dark-accent-foreground': 'oklch(0.985 0 0)',
            'dark-border': 'oklch(1 0 0 / 10%)',
            'dark-ring': 'oklch(0.556 0 0)',
          },
        },
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        },
        fontSize: {
          xs: ['0.75rem', { lineHeight: '1rem' }],
          sm: ['0.875rem', { lineHeight: '1.25rem' }],
          base: ['1rem', { lineHeight: '1.5rem' }],
          lg: ['1.125rem', { lineHeight: '1.75rem' }],
          xl: ['1.25rem', { lineHeight: '1.75rem' }],
          '2xl': ['1.5rem', { lineHeight: '2rem' }],
          '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
          '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        },
        borderRadius: {
          sm: 'calc(0.625rem - 4px)',
          md: 'calc(0.625rem - 2px)',
          lg: '0.625rem',
          xl: 'calc(0.625rem + 4px)',
        },
        boxShadow: {
          'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
          'medium': '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        transitionDuration: {
          DEFAULT: '200ms',
        },
        transitionTimingFunction: {
          DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    plugins: [
        typography,
        forms,
        asRatio,
        container_quries
    ],
    darkMode: 'class',
  }