import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#12121a', 700: '#2a2a38', 500: '#5b5b6e', 300: '#9a9aab' },
        paper: '#ffffff',
        canvas: '#f4f4f7',
        line: '#e4e4ec',
        brand: { DEFAULT: '#6c4cf1', dark: '#5436d6', light: '#ede9ff' },
        mango: '#ff7a59',
      },
      fontFamily: {
        sans: ['var(--font-ui)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        page: '0 1px 2px rgba(18,18,26,.06), 0 12px 32px -8px rgba(18,18,26,.18)',
        panel: '0 1px 2px rgba(18,18,26,.05), 0 8px 24px -12px rgba(18,18,26,.15)',
      },
      borderRadius: { xl2: '14px' },
    },
  },
  plugins: [],
};
export default config;
