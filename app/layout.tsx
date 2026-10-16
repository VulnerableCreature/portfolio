import "./globals.css";
import { Header } from "@/components/layouts/Header";
import { metadata } from "@/lib/seo/metadata";
import { viewport } from "@/lib/seo/viewport";
import { geistSans } from "@/styles/font";

export { metadata, viewport };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
