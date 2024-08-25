import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/games/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "dodgerblue",
          dark: "#5ae",
        },
        secondary: {
          DEFAULT: "#a15",
          dark: "salmon",
        },
        body: {
          DEFAULT: "#000e",
          dark: "#fffe",
        },
        muted: {
          DEFAULT: "#0005",
          dark: "#fff5",
        },
        surface: {
          DEFAULT: "#fefefe",
          dark: "#252525",
        },
      },
    },
  },
  plugins: [],
};
export default config;
