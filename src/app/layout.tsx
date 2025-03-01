import "@/styles/globals.css";
import type React from "react";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { inter } from "@/fonts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />

            {children}

            <Footer />
          </div>
        </ThemeProvider>
      </body>

      <Analytics />
    </html>
  );
}
