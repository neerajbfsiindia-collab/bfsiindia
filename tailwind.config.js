/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          900: "#312e81",
        },
        surface: {
          light: "#FAFBFF",
          card:  "#FFFFFF",
          dark:  "#0A0B0F",
          "dark-card": "#111318",
          "dark-border": "#1E2028",
        },
        fin: {
          up:   "#10B981",
          down: "#EF4444",
          gold: "#F59E0B",
          blue: "#3B82F6",
        },
      },
      animation: {
        "fade-up":   "fadeUp 0.4s ease-out",
        "pulse-dot": "pulseDot 2s infinite",
        shimmer:     "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: 1 },
          "50%":      { opacity: 0.3 },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "shimmer-gradient":
          "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)",
      },
    },
  },
  plugins: [],
};
