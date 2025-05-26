import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: "InTouchBot",
        template: "%s | InTouchBot",
    },
    description: "InTouchBot for TheusHen's portfolio",
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
        shortcut: "/favicon.png",
    },
    keywords: ["InTouchBot", "TheusHen", "portfolio", "chatbot"],
    author: "TheusHen",
    viewport: "width=device-width, initial-scale=1.0",
    openGraph: {
        title: "InTouchBot",
        description: "InTouchBot for TheusHen's portfolio",
        url: "https://intouchbot.theushen.me",
        type: "website",
        images: [
            {
                url: "https://theushen.me/banner.jpg",
                width: 780,
                height: 400,
                alt: "Banner - TheusHen Portfolio",
            },
        ],
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
      <head>
        <meta name="keywords" content="InTouchBot, TheusHen, portfolio, chatbot" />
        <meta name="author" content="TheusHen" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="InTouchBot" />
        <meta property="og:description" content="InTouchBot for TheusHen's portfolio" />
        <meta property="og:url" content="https://intouchbot.theushen.me" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://theushen.me/banner.jpg" />
        <meta property="og:image:width" content="780" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:alt" content="Banner - TheusHen Portfolio" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="floating-input-bar">
          {children}
        </div>
      </body>
    </html>
  );
}
