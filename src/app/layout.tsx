import type { Metadata } from "next";
import { oldStandardTT, inter, marion } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Caymanian Journal — Launching Soon",
  description:
    "The Caymanian Journal. Fearless. Fair. Independent. Launching soon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <body
        className={`${oldStandardTT.variable} ${inter.variable} ${marion.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
