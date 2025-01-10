import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          default: "#F4530C",
          tints: {
            100: "#feece4",
            200: "#fdd9c9",
            300: "#fbc6ae",
            400: "#fab393",
            500: "#f99f78",
            600: "#f88c5d",
            700: "#f67942",
            800: "#f56627",
          },
          shades: {
            100: "#1b0901",
            200: "#361203",
            300: "#511c04",
            400: "#6c2505",
            500: "#882e07",
            600: "#a33708",
            700: "#be4109",
            800: "#d94a0b",
          },
        },
      },
      fontFamily: {
        ralway: ["Raleway", "serif"],
        mont: ["Montserrat", "sans-serif"],
        libre: ["Libre Baskerville", "serif"],
      },
      keyframes: {
        "opacity-up-down": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "come-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0%)" },
        },
        "out-from-top": {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(-100%)" },
        },
      },
      animation: {
        "opacity-up-down": "opacity-up-down 300ms ease-in-out",
        "come-from-top": "come-from-top 300ms ease-in-out",
        "out-from-top": "out-from-top 300ms ease-in-out",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        ".transition-300": {
          transition: "all 300ms ease-in-out",
        },
        ".transition-600": {
          transition: "all 600ms ease-in-out",
        },
      });
    },
  ],

  darkMode: "class",
};
export default config;
