import type { Metadata } from "next";
import { Share_Tech_Mono, Space_Mono } from "next/font/google";
import "./globals.css";

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: ["400"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Addin | Systems Architect & Software Engineer",
  description: "Computer Science console portfolio of Addin. Specializing in high-performance backends, system utilities, and full-stack software development.",
  authors: [{ name: "Addin" }],
  keywords: ["software engineer", "computer science", "systems developer", "backend", "developer portfolio"],
  openGraph: {
    title: "Addin | Systems Architect & Software Engineer",
    description: "Terminal-styled developer workspace displaying computational architecture and systems projects.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${shareTechMono.variable} ${spaceMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full bg-[#05070a] text-[#00d2ff] font-mono overflow-x-hidden selection:bg-[#00d2ff]/20 selection:text-white">
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
