import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"], // default body
        heading: ["var(--font-poppins)", "sans-serif"], // headings
      },
      fontSize: {
        xs: "0.8rem", // ~12.8px
        sm: "0.9rem", // ~14.4px
        base: "1.05rem", // ~16.8px (slightly larger body text)
        lg: "1.25rem", // 20px
        xl: "1.5rem", // 24px
        "2xl": "1.875rem", // 30px
        "3xl": "2.25rem", // 36px
        "4xl": "3rem", // 48px
        "5xl": "3.75rem", // 60px
      },
      colors: {},
    },
  },
  plugins: [],
};

export default config;
