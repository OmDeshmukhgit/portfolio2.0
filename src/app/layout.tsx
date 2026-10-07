import type { Metadata, Viewport } from "next";
import { Cinzel, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030305",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "The Om Archive — Space × Photography × Cinema × Music × Engineering | Om Deshmukh",
  description:
    "A cinematic digital archive exploring the intersection of space, observation, cinema, and distributed cloud computing. Curated by Om Deshmukh — DevOps Engineer & Cloud Infrastructure Architect.",
  keywords: [
    "Om Deshmukh",
    "The Om Archive",
    "DevOps Engineer",
    "Cloud Architect",
    "AWS",
    "Terraform",
    "Kubernetes",
    "Docker",
    "CI/CD",
    "Linux Systems",
    "Creative Engineering",
  ],
  authors: [{ name: "Om Deshmukh" }],
  creator: "Om Deshmukh",
  openGraph: {
    title: "The Om Archive — Space × Photography × Cinema × Music × Engineering",
    description:
      "A cinematic digital archive exploring space, photography, cinema, and distributed systems by Om Deshmukh.",
    type: "website",
    locale: "en_US",
    url: "https://omdeshmukh.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Om Archive — Space × Photography × Cinema × Music × Engineering",
    description:
      "A cinematic digital archive exploring space, photography, cinema, and distributed systems by Om Deshmukh.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#030305] text-[#f4f1ea] font-sans selection:bg-[#d4af37] selection:text-[#030305]">
        {children}
      </body>
    </html>
  );
}
