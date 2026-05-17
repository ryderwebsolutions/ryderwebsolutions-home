/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1D35",
          light: "#0F2848",
          dark: "#060E1E",
        },
        "arc-orange": "#E8621A",
        "arc-orange-dark": "#C9521A",
        "arc-steel": "#5C6B7A",
        "arc-grey": "#F4F5F7",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(11, 29, 53, 0.10)",
        "card-hover": "0 12px 40px rgba(11, 29, 53, 0.18)",
        orange: "0 4px 20px rgba(232, 98, 26, 0.35)",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        bounce: "bounce 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
