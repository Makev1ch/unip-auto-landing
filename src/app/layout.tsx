import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  title: "UNIP AUTO — автосервис в Иркутске",
  description: "Ремонт ходовой и подвески в Иркутске. Телефон, адрес, режим работы.",
  openGraph: {
    title: "UNIP AUTO — автосервис в Иркутске",
    description: "Ремонт ходовой и подвески в Иркутске. Телефон, адрес, режим работы.",
    type: "website",
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
