/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "blue",
        secondary: "green",
        accent: "red",
      },
    },
  },
  plugins: [],
};
