import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          "sky-blue": "#5bc4f1",
          gray: "#575756",
          "clean-gray": "#F2F2F2",
          "dark-blue": "#071924",
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-metropolis)", "sans-serif"],
        heading: ["var(--font-metropolis)", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "heading-1": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-2": ["2rem", { lineHeight: "1.25" }],
        "heading-3": ["1.5rem", { lineHeight: "1.3" }],
        "heading-4": ["1.25rem", { lineHeight: "1.4" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
      },
      boxShadow: {
        "card": "0 1px 3px rgba(7, 25, 36, 0.08), 0 4px 12px rgba(7, 25, 36, 0.04)",
        "card-hover": "0 4px 12px rgba(7, 25, 36, 0.12), 0 8px 24px rgba(7, 25, 36, 0.08)",
        "nav": "0 2px 8px rgba(7, 25, 36, 0.06)",
        "flat": "0 1px 2px rgba(7, 25, 36, 0.05)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #071924 0%, #0d2c3e 100%)",
        "cta-gradient": "linear-gradient(135deg, #5bc4f1 0%, #3a9dbf 100%)",
        "section-light": "linear-gradient(180deg, #F2F2F2 0%, #FFFFFF 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.4s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0', 
        'md': '0',
        'lg': '0',
        'xl': '0',
        '2xl': '0',
        '3xl': '0',
        'full': '9999px',
      }
    },
  },
  plugins: [],
};
export default config;
