import "./globals.css";
import type { Metadata } from "next";
import { ChallengeProvider } from "@/context/ChallengeContext";

export const metadata: Metadata = {
  title: "Dare You",
  description: "Un jeu de défis entre amis",
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
      <body>
        <ChallengeProvider>{children}</ChallengeProvider>
      </body>
    </html>
  );
}
