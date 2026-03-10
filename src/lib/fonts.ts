import { Old_Standard_TT, Inter } from "next/font/google";
import localFont from "next/font/local";

export const oldStandardTT = Old_Standard_TT({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-old-standard",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const marion = localFont({
  src: [
    {
      path: "../../public/font/local/Marion-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-marion",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
