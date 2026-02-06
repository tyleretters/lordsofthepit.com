/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,md,liquid}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        red: '#ff0000',
        'dark-red': '#830000',
        faded: '#454545',
      },
      spacing: {
        xs: '5px',
        sm: '10px',
        md: '25px',
        lg: '50px',
        xl: '100px',
        '2xl': '200px',
      },
      fontFamily: {
        serif: ['times new roman', 'serif'],
        mono: ['courier', 'monospace'],
      },
    },
  },
  plugins: [],
}
