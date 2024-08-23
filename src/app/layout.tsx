import "@/styles/index.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { inter } from "@/fonts";

export const metadata: Metadata = {
  title: "Ítalo Braga",
  description: "Ítalo Braga - Desenvolvedor Front-end",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>

      <Analytics />
    </html>
  );
}
