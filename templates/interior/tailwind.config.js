/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f7f2ec",
        lavender: "#b499c8",
        lilac: "#cab7d8",
        dusty: "#8f759d",
        blush: "#dfc0ca",
        sage: "#a6b39a",
        charcoal: "#40393f",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["DM Sans", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        soft: "0 14px 40px rgba(58, 44, 58, 0.14)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};
