/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'notoSans': ['Noto Sans', 'sans-serif'],
        'nunitoSans': ['Nunito Sans', 'sans-serif'],

      },
      lineClamp: {
        3: '3',
        4: '4',
        5: '5',
        6: '6',
      }
    },
  },
  variants: {
    lineClamp: ['responsive', 'hover']
  },
  plugins: [
    // ...
    require('@tailwindcss/line-clamp'),
  ],
}
