import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Lilita_One, Pacifico } from "next/font/google";
import { ChallengeProvider } from "@/context/ChallengeContext";

const inter = Inter({ subsets: ["latin"] });
const lilitaOne = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "Dare You",
  description: "Lance des défis à tes amis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Pacifico&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} ${lilitaOne.variable} ${pacifico.variable}`}>
        <ChallengeProvider>{children}</ChallengeProvider>
      </body>
    </html>
  );
}
