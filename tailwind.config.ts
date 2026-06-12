import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                primary: ["var(--font-be-vietnam-pro)"],
                secondary: ["var(--font-manrope)"]
            }
        },
    },
    plugins: [],
};

export default config;