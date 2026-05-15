/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0 4px 12px rgba(15, 23, 42, 0.08)",
        soft: "0 2px 8px rgba(15, 23, 42, 0.06)",
        government: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        government: {
          primary: "#1e3a8a", // Official blue
          secondary: "#3b82f6", // Lighter blue
          accent: "#f59e0b", // Gold accent
          light: "#f8fafc",
          dark: "#0f172a",
          gray: "#64748b",
          "gray-light": "#f1f5f9",
        },
        navy: {
          50: "#f0f4f8",
          100: "#d9e2f0",
          500: "#1e3a8a",
          600: "#1e40af",
          700: "#1e3a8a",
          900: "#0f172a",
        },
        brand: {
          50: "#fef2f2",
          100: "#fee2e2",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
        },
      },
      spacing: {
        navbar: "65px",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
