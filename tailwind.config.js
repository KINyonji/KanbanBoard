/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // ✅ 이 부분 중요!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
