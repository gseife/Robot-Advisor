import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToggleProvider } from "@/lib/toggle-context";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumina Wealth, Demo",
  description: "Classroom demo exposing robo-advisor ethical dilemmas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <ToggleProvider>{children}</ToggleProvider>
      </body>
    </html>
  );
}
