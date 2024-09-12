import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        landingLeftContentWidth: '708px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionTimingFunction: {
        ease: 'ease',
      },
      animation: {
        fade: 'fadeOut 5s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      screens: {
        xl: '1370px',
      },
      keyframes: {
        fadeOut: {
          '0%': { backgroundColor: 'white' },
          '100%': { backgroundColor: 'transparent' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
    fontFamily: {
      ABCRepro: ['ABCRepro', 'sans-serif'],
      ABCReproMono: ['ABCReproMono', 'monospace'],
    },
    colors: (theme) => ({
      ...theme.colors,
      ShadesOfGrayDark: '#6E6E6E',
      shadesOfGrayLight: '#E5E5E5',
      shadesOfGrayMedium: '#A9A9A9',
      blue: '#00F',
      getStartedGray: 'rgba(255, 255, 255, 0.2)',
      green: '#0F0',
      red: '#f0f',
      invalidRed: '#f00',
      purple: '#8900DA',
      effect15White: 'rgba(255, 255, 255, 0.15)',
    }),
  },
  plugins: [],
};
export default config;
