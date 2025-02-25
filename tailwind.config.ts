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
          DEFAULT: "#0003",
          dark: "#fff1",
        },
        surface: {
          DEFAULT: "#fefefe",
          dark: "#252525",
        },
      },
    },
  },
  // plugins: [],
};
export default config;
