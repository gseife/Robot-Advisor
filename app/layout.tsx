import type { Metadata } from "next";
import "./globals.css";
import { ToggleProvider } from "@/lib/toggle-context";

export const metadata: Metadata = {
  title: "Lumina Wealth — Demo",
  description: "Classroom demo exposing robo-advisor ethical dilemmas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">
        <ToggleProvider>{children}</ToggleProvider>
      </body>
    </html>
  );
}
