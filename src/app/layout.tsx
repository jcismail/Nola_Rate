import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ComplianceFooter from "@/components/compliance/ComplianceFooter";
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
  title: "Nola Rate Mortgage Advisory | Louisiana & Mississippi Mortgage Guide",
  description:
    "Nola Rate Mortgage Advisory helps Louisiana and Mississippi buyers explore mortgage options with clear, personal guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ComplianceFooter />
      </body>
    </html>
  );
}
