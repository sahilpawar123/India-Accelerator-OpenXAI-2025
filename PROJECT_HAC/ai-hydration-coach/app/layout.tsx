import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // Corrected import
import "./globals.css";
import ParticlesBackground from "./components/ParticlesBackground";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "AI Hydration Coach",
  description: "Your personal AI-powered water intake reminder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} antialiased bg-slate-900 text-white`}>
        <Toaster position="top-center" />
        <ParticlesBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}