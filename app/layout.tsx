import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { RouteFrame } from "@/components/common/RouteFrame";
import { SiteBackground } from "@/components/common/SiteBackground";
import "./secondary-pages.css";
import "./hover-glows.css";
import "./scroll-text.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: { default: "Kevin C. Mercado", template: "%s — Kevin Mercado" },
  description: "Web and mobile development by Kevin C. Mercado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-motion="full" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative isolate flex min-h-screen flex-col bg-background text-foreground" data-site-shell>
            <SiteBackground />
            <a href="#main-content" className="skip-link">Skip to content</a>
            <Header />
            <main id="main-content" tabIndex={-1} className="relative isolate flex-1">
              <RouteFrame>{children}</RouteFrame>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
