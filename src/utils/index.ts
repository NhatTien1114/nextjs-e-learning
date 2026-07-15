import { Be_Vietnam_Pro } from "next/font/google";

export const beVNPro = Be_Vietnam_Pro({
    subsets: ["latin"],
    variable: "--font-be-vietnam-pro",
    weight: ["400", "500", "600", "700"],
});

export const createOrderCode = () =>
    `DH-${new Date().getTime().toString().slice(-6)}`;