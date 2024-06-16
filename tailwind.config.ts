import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
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
        blue: "#D9EEF3",
        lime: "#82EDCC",
        mint: "#2FE4AB",
        seafoam: "#9CC2C9",
        slate: "#475e64",
        steel: "#182D32",
        midnight: "#243D42",
        charcoal: "#111F22",
        navy: "#091011",
      },
    },
  },
  plugins: [],
}
export default config
