import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      fontSize: {
        lg: ["1.125rem", "1.75rem"],
        "2xl": ["1.75rem", "1.5rem"],
        "3xl": ["2rem", "3rem"],
      },
    },
  },
  plugins: [],
}
export default config
