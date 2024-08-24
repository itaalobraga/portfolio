import "@/styles/index.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { poppins, sfPro } from "@/fonts";
import { ThemeProvider } from "next-themes";
import { twMerge } from "tailwind-merge";
import { ThemeSwitch } from "./theme-switch";

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={twMerge(`${poppins.variable} ${sfPro.variable}`)}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {children}

          <ThemeSwitch />
        </ThemeProvider>
      </body>

      <Analytics />
    </html>
  );
}
