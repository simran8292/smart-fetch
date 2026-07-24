import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart Fetch — Integrated Security, Fire Safety & AV Engineering",
  description: "Smart Fetch offers premium integrated security, fire safety, professional concert audio, AV integration, and facility engineering solutions in India.",
  keywords: ["smart fetch", "security", "fire safety", "concert audio", "audio-video integration", "access control", "surveillance"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
