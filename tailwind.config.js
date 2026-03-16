/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0D1F33',
        navy: '#1B3A5C',
        champagne: '#1B3A5C',
        ivory: '#F2EDE4',
        slate: '#1B3A5C',
        warmWhite: '#FAF8F3',
        cream: '#F2EDE4',
      },
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
        display: ['Lora', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
