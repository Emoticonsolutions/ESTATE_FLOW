/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        estate: {
          navy: "#17324D",
          "navy-light": "#244761",
          blue: "#3478C9",
          teal: "#159D91",
          green: "#16A36A",
          amber: "#E9A23B",
          red: "#DC5555",
          purple: "#8965C7",
          grey: "#7B8794",
          bg: "#F5F7FA",
          card: "#FFFFFF",
          text: "#263445",
          muted: "#718096",
          border: "#E3E8EF",
        },
      },
      borderRadius: {
        card: "10px",
        input: "7px",
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

