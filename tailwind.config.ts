import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111417",
        graphite: "#252b31",
        slate: "#65717d",
        line: "#dfe4e8",
        mist: "#f3f6f8",
        frost: "#f8fafb",
        copper: "#a55f3f"
      },
      boxShadow: {
        premium: "0 24px 80px rgba(17, 20, 23, 0.12)",
        soft: "0 16px 48px rgba(17, 20, 23, 0.08)"
      },
      fontFamily: {
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
