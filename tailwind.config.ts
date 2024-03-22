import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      // => @media (max-width: 1119px) { ... }
      md: { max: '1199px' }, // tablet

      // => @media (max-width: 743px) { ... }
      sm: { max: '743px' }, // mobile
    },
    fontSize: {
      // <p class="text-12-400 ...">The quick brown fox ...</p> 처럼 사용
      '0.8-400': [
        '0.875rem',
        {
          fontWeight: '400',
        },
      ],
      '10-400': [
        '1rem',
        {
          fontWeight: '400',
        },
      ],
      '10-700': [
        '1rem',
        {
          fontWeight: '700',
        },
      ],
      '11.1-400': [
        '1.125rem',
        {
          fontWeight: '400',
        },
      ],
      //fontsize: 12px
      '12-400': [
        '1.2rem',
        {
          fontWeight: '400',
        },
      ],
      '12-500': [
        '1.2rem',
        {
          fontWeight: '500',
        },
      ],
      '12-600': [
        '1.2rem',
        {
          fontWeight: '600',
        },
      ],
      '12-700': [
        '1.2rem',
        {
          fontWeight: '700',
        },
      ],
      '12.5-500': [
        '1.25rem',
        {
          fontWeight: '500',
        },
      ],

      //fontsize: 14px
      '14-400': [
        '1.4rem',
        {
          fontWeight: '400',
        },
      ],
      '14-500': [
        '1.4rem',
        {
          fontWeight: '500',
        },
      ],
      //fontsize : 15px
      '15-400': [
        '1.5rem',
        {
          fontWeight: '400',
        },
      ],
      //fontsize: 16px
      '16-400': [
        '1.6rem',
        {
          fontWeight: '400',
        },
      ],
      '16-500': [
        '1.6rem',
        {
          fontWeight: '500',
        },
      ],
      '16-600': [
        '1.6rem',
        {
          fontWeight: '600',
        },
      ],
      '16-700': [
        '1.6rem',
        {
          fontWeight: '700',
        },
      ],
      '16-900': [
        '1.6rem',
        {
          fontWeight: '900',
        },
      ],

      //fontsize: 18px
      '18-400': [
        '1.8rem',
        {
          fontWeight: '400',
        },
      ],
      '18-500': [
        '1.8rem',
        {
          fontWeight: '500',
        },
      ],
      '18-700': [
        '1.8rem',
        {
          fontWeight: '700',
        },
      ],

      //fontsize: 20px
      '20-500': [
        '2rem',
        {
          fontWeight: '500',
        },
      ],
      '20-600': [
        '2rem',
        {
          fontWeight: '600',
        },
      ],
      '20-700': [
        '2rem',
        {
          fontWeight: '700',
        },
      ],
      '20-900': [
        '2rem',
        {
          fontWeight: '900',
        },
      ],

      //fontsize: 22px
      '22-500': [
        '2.2rem',
        {
          fontWeight: '500',
        },
      ],
      '22-700': [
        '2.2rem',
        {
          fontWeight: '700',
        },
      ],
      '22.5-500': [
        '2.25rem',
        {
          fontWeight: '500',
        },
      ],
      //fontsize: 24px
      '24-700': [
        '2.4rem',
        {
          fontWeight: '700',
        },
      ],

      //fontsize: 28px
      '28-700': [
        '2.8rem',
        {
          fontWeight: '700',
        },
      ],

      //fontsize: 36px
      '36-400': [
        '3.6rem',
        {
          fontWeight: '400',
        },
      ],
      '36-700': [
        '3.6rem',
        {
          fontWeight: '700',
        },
      ],

      //fontsize: 40px
      '40-700': [
        '4rem',
        {
          fontWeight: '700',
        },
      ],

      //fontsize: 42px
      '42-700': [
        '4.2rem',
        {
          fontWeight: '700',
        },
      ],

      //fontsize: 48px
      '48-700': [
        '4.8rem',
        {
          fontWeight: '700',
        },
      ],

      //fontsize: 56px
      '56-700': [
        '5.6rem',
        {
          fontWeight: '700',
        },
      ],

      //fontsize: 70px
      '70-700': [
        '7rem',
        {
          fontWeight: '700',
        },
      ],

      //fontsize: 76px
      '76-700': [
        '7.6rem',
        {
          fontWeight: '700',
        },
      ],

      //fontsize: 90px
      '90-700': [
        '9rem',
        {
          fontWeight: '700',
        },
      ],
    },
    extend: {
      fontFamily: {
        // 예시) <p className="font-['TheJamsil']">
        TheJamsil: ['TheJamsil'],
        notoKR: ['Noto Sans KR'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        black: {
          0: '#000000',
          1: '#171717',
          2: '#222222',
          3: '#333236',
          4: '#4B4B4B',
        },
        gray: {
          7: '#787486',
          9: '#9E9E9E',
          D: '#D9D9D9',
          E: '#E0E0E0',
          F: '#FAFAFA',
          B: '#BDBDBD',
          99: '#999',
        },
        white: {
          DEFAULT: '#FFFFFF',
        },
        violet: {
          5: '#5534DA',
          F: '#F1EFFD',
        },
        red: {
          DEFAULT: '#D6173A',
          F: '#FF7752',
        },
        green: {
          DEFAULT: '#7AC555',
        },
        purple: {
          DEFAULT: '#760DDE',
        },
        orange: {
          DEFAULT: '#FFA500',
          F: '#F9BB00',
        },
        blue: {
          DEFAULT: '#76A5EA',
        },
        pink: {
          DEFAULT: '#E876EA',
          F: '#F4D7DA',
          D: '#D25B68',
        },
        yellow: {
          DEFAULT: '#FEE500',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      aspectRatio: {
        'card-image': '4 / 3',
      },
    },
  },
} satisfies Config;

export default config;
