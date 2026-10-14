import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Environment } from "@/config/environment";

const geist = Geist_Mono({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Лев Мещеряков - PHP Backend Developer",
    template: "%s | Лев Мещеряков",
  },
  description:
    "Портфолио Льва Мещерякова - PHP Backend-разработчика. Проекты на PHP, Laravel, REST API, Dart, Flutter интеграции и разработка веб-приложений.",
  applicationName: "Портфолио Льва Мещерякова",
  authors: [
    {
      name: "Лев Мещеряков",
    },
  ],
  creator: "Лев Мещеряков",
  publisher: "Лев Мещеряков",
  keywords: [
    "Лев Мещеряков",
    "PHP Developer",
    "PHP Backend Developer",
    "Лев Мещеряков PHP Backend Developer",
    "Лев Мещеряков PHP Developer",
    "Junior PHP Developer",
    "Middle PHP Developer",
    "Laravel Developer",
    "PHP",
    "Laravel",
    "REST API",
    "Backend-разработка",
    "Frontend-разработка",
    "Портфолио разработчика",
    "Dart",
    "FLutter",
    "Flutter Developer",
    "Лев Мещеряков Flutter Developer",
    "Dart Developer",
    "Лев Мещеряков Dart Developer"
  ],
  icons: {
    icon: `${Environment.basePath}/images/logo-lion.svg`,
    shortcut: `${Environment.basePath}/images/logo-lion.svg`,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Портфолио Льва Мещерякова",
    title: "Лев Мещеряков - PHP Backend Developer",
    description:
      "Портфолио PHP Backend-разработчика: проекты, технический стек.",
    images: [
      {
        url: `${Environment.basePath}/images/logo-lion.svg`,
        alt: "Логотип портфолио Льва Мещерякова",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  category: "technology",
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
