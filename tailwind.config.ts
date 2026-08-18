import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#0F172A",
        brand: {
          50: "#FDF2F4",
          100: "#FCE7EA",
          200: "#F8D0D7",
          300: "#F2A9B6",
          400: "#E15B74",
          500: "#9F1239",
          600: "#881337",
          700: "#701A2E",
          800: "#581122",
          900: "#400B18",
          DEFAULT: "#881337",
        },
        maroon: {
          50: "#FDF2F4",
          100: "#FCE7EA",
          200: "#F8D0D7",
          300: "#F2A9B6",
          400: "#E15B74",
          500: "#9F1239",
          600: "#881337",
          700: "#701A2E",
          800: "#581122",
          900: "#400B18",
          DEFAULT: "#881337",
        },
        surface: {
          50: "#FFFFFF",
          100: "#F8FAFC",
          200: "#F1F5F9",
          300: "#E2E8F0",
          400: "#0F172A",
          border: "#E2E8F0",
          "border-subtle": "#F1F5F9",
          "border-bright": "#CBD5E1",
        },
        muted: {
          DEFAULT: "#475569",
          foreground: "#64748B",
          dark: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        "glow-sm": "0 0 20px -5px rgba(136, 19, 55, 0.15)",
        "glow-md": "0 0 35px -8px rgba(136, 19, 55, 0.22)",
        "glow-lg": "0 0 60px -15px rgba(136, 19, 55, 0.30)",
        "dashboard": "0 20px 50px -10px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.08)",
      },
      maxWidth: {
        global: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
