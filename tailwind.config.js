/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // App Router용
    './pages/**/*.{js,ts,jsx,tsx}',    // Pages Router용 (둘 중 하나만 써도 됨)
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',      // src 디렉토리 사용하는 경우
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
