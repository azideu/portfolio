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
  title: "Addin Zidane | Software Engineer & Full-Stack Developer",
  description: "Software engineer and full-stack developer portfolio of Addin Zidane. Specializing in responsive React/Next.js frontends, backend APIs, Java desktop applications, and relational databases.",
  authors: [{ name: "Addin Zidane" }],
  keywords: ["software engineer", "full-stack developer", "junior developer", "react", "nextjs", "java", "php", "developer portfolio"],
  openGraph: {
    title: "Addin Zidane | Software Engineer & Full-Stack Developer",
    description: "Software engineer and full-stack developer portfolio workspace displaying software projects, skills, and credentials.",
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
