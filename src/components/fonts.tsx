import { Be_Vietnam_Pro, Manrope } from "next/font/google";
import fontLocal from "next/font/local";
const beVNPro = Be_Vietnam_Pro({
    variable: "--font-be-vietnam-pro",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope"
})

const wolfers = fontLocal({
    src: [
        {
            path: "../app/1FTV-Wolfers.regular.otf",
            weight: "400",
            style: "normal"
        }
    ],
    display: "swap",
})

export {
    beVNPro,
    manrope,
    wolfers
}