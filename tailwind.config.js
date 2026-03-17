/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#22C55E",
        danger: "#EF4444",
        dark: "#111827",
        card: "#1F2937",
        border: "#374151",
        muted: "#9CA3AF",
      },
    },
  },
};