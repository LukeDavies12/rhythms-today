import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rhythms.today",
  description: "Intentional daily goal tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="rhythms" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased px-4 lg:w-10/12 mx-auto max-w-7xl`}>
        {children}
      </body>
    </html>
  );
}
