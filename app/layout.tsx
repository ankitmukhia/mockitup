import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RootProvider } from "@/providers/root-provider";
import { LoadingScreen } from "./components/loading-screen";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mockitup",
  description: "Mockitup - The best mockup generator",
  keywords: [
    "mockup",
    "mockitup",
    "mockup generator",
    "mockup generator tool",
    "mockup generator online",
    "mockup generator free",
    "mockup generator app",
    "mockup generator website",
    "mockup generator tool online",
    "mockup generator tool free",
    "mockup generator tool app",
    "mockup generator tool website",
    "mockup generator tool online free",
    "mockup generator tool online app",
    "mockup generator tool online website",
    "mockup generator tool online free website",
  ],
  metadataBase: new URL("https://mockitupp.vercel.app"),
  openGraph: {
    title: "Mockitup",
    description: "Mockitup - The best mockup generator",
    siteName: "Mockitup",
    images: [
      {
        url: "https://mockitupp.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Mockitup - The best mockup generator",
      },
    ],
  },
  twitter: {
    title: "Mockitup",
    description: "Mockitup - The best mockup generator",
    card: "summary_large_image",
    images: [
      {
        url: "https://mockitupp.vercel.app/twitter.png",
        width: 1200,
        height: 630,
        alt: "Mockitup - The best mockup generator",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <RootProvider>
          <LoadingScreen>{children}</LoadingScreen>
        </RootProvider>
      </body>
    </html>
  );
}
