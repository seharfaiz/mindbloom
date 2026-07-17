import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        sage: {
          50: "#f4f7f1",
          100: "#e6ede0",
          200: "#cddcc2",
          300: "#aec69b",
          400: "#8da47e",
          500: "#6f8a62",
          600: "#56704c",
          700: "#44593e",
          800: "#374734",
          900: "#2e3a2c",
        },
        navy: {
          50: "#eef1f5",
          100: "#d3dbe6",
          200: "#a8b8cc",
          300: "#7a92ac",
          400: "#4f6a86",
          500: "#354f68",
          600: "#243b52",
          700: "#1b2a3a",
          800: "#141f2c",
          900: "#0d151f",
        },
        beige: {
          50: "#fdfcfa",
          100: "#f7f2e9",
          200: "#efe4d0",
          300: "#e3d3b3",
          400: "#d3bd8e",
          500: "#c1a670",
        },
        canvas: {
          light: "#fcfbf8",
          dark: "#0d1310",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 20px -4px rgba(27, 42, 58, 0.08)",
        lift: "0 12px 40px -8px rgba(27, 42, 58, 0.18)",
        glow: "0 0 60px -10px rgba(141, 164, 126, 0.35)",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(0.85)", opacity: "0.7" },
          "50%": { transform: "scale(1.15)", opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(20px,-15px)" },
        },
      },
      animation: {
        breathe: "breathe 8s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        drift: "drift 12s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
