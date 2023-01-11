/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors :{
          'primary': "#579BB1",
          'secondary': "#E1D7C6",
          'tertiary': '#ECE8DD',
          'quan': '#F8F4EA'
        }
      },
    },
    plugins: [],
  }