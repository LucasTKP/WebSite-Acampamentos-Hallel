import type { Metadata } from "next";
import { Poiret_One, Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "react-toastify/ReactToastify.min.css";
import Head from "next/head";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const poiretOne = Poiret_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poiretOne",
});

export const metadata: Metadata = {
  title: "Canaã",
  description: "Grupo de Jovens - Canaã",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href={process.env.NEXT_PUBLIC_PATH_FAVICON} sizes="32x32"/>
      </head>
      <body className={`${poppins.variable} ${poiretOne.variable}`}>
        <ToastContainer autoClose={3000} />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
