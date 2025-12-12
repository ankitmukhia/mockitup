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
  title: "Mockitup | Simple Mockup Generator",
  description: "Mockitup - Present your product in the best way possible",
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
    title: "Mockitup | Simple Mockup Generator",
    description: "Mockitup - Present your product in the best way possible",
    type: "website",
    siteName: "Mockitup",
    url: "https://mockitupp.vercel.app",
    locale: "en_US",
    images: [
      {
        url: "https://mockitupp.vercel.app/og-mockitup.png",
        width: 1200,
        height: 630,
        alt: "Mockitup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mockitup | Simple Mockup Generator",
    description: "Mockitup - Present your product in the best way possible",
    images: [
      {
        url: "https://mockitupp.vercel.app/twitter-mockitup.png",
        width: 1200,
        height: 630,
        alt: "Mockitup",
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
