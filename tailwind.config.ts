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
        plast: {
          yellow: '#ffe500',        // Plast Deutschland primary yellow
          green: '#0e6634',         // Plast Deutschland dark green
          'green-light': '#077a35', // Plast Deutschland forest green
          'green-dark': '#0b542b',  // Plast Deutschland darker green
          blue: '#0057B7',          // Ukrainian blue (keeping for reference)
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
