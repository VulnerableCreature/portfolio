import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist_Mono({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Портфолио",
  description: "Портфолио разработчика",
  creator: "Fullstack Developer, Mescheryakov Lev",
  authors: [{ name: "Mescheryakov Lev" }],
  icons: process.env.NEXT_PUBLIC_DEPLOY_TARGET === "prod"
              ? "/portfolio/images/logo-lion.svg"
              : "/images/logo-lion.svg",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geist.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
