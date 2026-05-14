import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lotus Çiçekçilik — Özel Tasarım Çiçekler",
  description: "Lotus Çiçekçilik ile sevdiklerinize en güzel çiçekleri gönderin. Buketler, aranjmanlar, kutuda çiçekler ve özel tasarımlar.",
  keywords: "çiçekçi, çiçek siparişi, buket, aranjman, istanbul çiçekçi, online çiçek",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
