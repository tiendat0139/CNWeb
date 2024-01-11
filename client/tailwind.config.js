/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'primary': "#1877F2",
      white: colors.white,
      gray: colors.gray,
      slate: colors.slate
    }
  },
  plugins: [],
}

