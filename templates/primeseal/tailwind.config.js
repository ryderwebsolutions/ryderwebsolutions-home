/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#081a2c",
        seal: "#0c2f4a",
        blue: "#1f74c9",
        mist: "#edf2f7",
        line: "#d7e0ea",
        lime: "#b8f23b",
      },
      boxShadow: {
        soft: "0 24px 60px -32px rgba(8, 26, 44, 0.45)",
      },
      backgroundImage: {
        "navy-radial":
          "radial-gradient(circle at top left, rgba(31, 116, 201, 0.18), transparent 32%), radial-gradient(circle at top right, rgba(184, 242, 59, 0.12), transparent 28%), linear-gradient(180deg, #081a2c 0%, #0b2339 58%, #eef3f7 58%, #eef3f7 100%)",
      },
    },
  },
  plugins: [],
};