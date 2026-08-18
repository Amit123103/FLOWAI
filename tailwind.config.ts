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
        background: "#08090D",
        foreground: "#F3F4F6",
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          DEFAULT: "#6366F1",
        },
        surface: {
          50: "#1E2230",
          100: "#161924",
          200: "#11131B",
          300: "#0C0E14",
          400: "#07080B",
          border: "#1F2332",
          "border-subtle": "#171A26",
          "border-bright": "#2E344A",
        },
        muted: {
          DEFAULT: "#8E94A8",
          foreground: "#646A7E",
          dark: "#454B5E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        "glow-sm": "0 0 20px -5px rgba(99, 102, 241, 0.25)",
        "glow-md": "0 0 35px -8px rgba(99, 102, 241, 0.35)",
        "glow-lg": "0 0 60px -15px rgba(99, 102, 241, 0.45)",
        "dashboard": "0 24px 60px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)",
      },
      maxWidth: {
        global: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
