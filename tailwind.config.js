/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        cream:   '#f9f1da',
        'blue-p': '#29abe2',
        'blue-t': '#45a3c5',
        'yellow-p': '#f0c85d',
        'orange-p': '#f6a32b',
        'green-p': '#77bc52',
        'green-l': '#93d9b5',
        purple:  '#cdb8fe',
        'text-d': '#434962',
      },
    },
  },
  plugins: [],
}
