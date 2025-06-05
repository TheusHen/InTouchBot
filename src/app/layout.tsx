import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: "InTouchBot",
        template: "%s | InTouchBot",
    },
    description: "Meet InTouch AI Assistant, your personal guide to explore TheusHen's portfolio.",
    keywords: "TheusHen, portfolio, AI assistant, web development, React, TypeScript, JavaScript, frontend developer, chatbot, AI, machine learning, tech portfolio",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        shortcut: "https://www.theushen.me/favicon.ico",
    },
    openGraph: {
        title: "InTouchBot - TheusHen's Portfolio",
        description: "Meet InTouch AI Assistant, your personal guide to explore TheusHen's portfolio.",
        url: "https://intouchbot.theushen.me",
        siteName: "TheusHen",
        images: [
            {
                url: "https://intouchbot.theushen.me/banner.jpg",
                width: 780,
                height: 400,
                alt: "Banner - InTouchBot",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "InTouchBot - TheusHen's Portfolio",
        description: "Meet InTouch AI Assistant, your personal guide to explore TheusHen's portfolio.",
        images: ["https://intouchbot.theushen.me/banner.jpg"],
    },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

