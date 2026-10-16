import type { Metadata } from "next";
import { basePath } from "@/config/environment";

const siteName = "Портфолио Льва Мещерякова";
const siteTitle = "Лев Мещеряков - Fullstack Developer";

const siteDescription =
  "Портфолио PHP Backend-разработчика. Проекты на PHP, Laravel, REST API, Dart, Flutter и разработка веб-приложений.";

const keywords = [
  "Лев Мещеряков",
  "PHP Developer",
  "PHP Backend Developer",
  "Junior PHP Developer",
  "Middle PHP Developer",
  "Laravel Developer",
  "REST API",
  "Backend-разработка",
  "Frontend-разработка",
  "Портфолио разработчика",
  "Dart",
  "Flutter",
  "Flutter Developer",
  "Dart Developer",
];

const logoUrl = `${basePath}/images/logo-lion.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),

  title: {
    default: siteTitle,
    template: "%s | Лев Мещеряков",
  },

  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "Лев Мещеряков" }],
  creator: "Лев Мещеряков",
  publisher: "Лев Мещеряков",
  keywords,

  icons: {
    icon: logoUrl,
    shortcut: logoUrl,
  },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: logoUrl,
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
