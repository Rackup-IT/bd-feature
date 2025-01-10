import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import ReduxProvider from "../../store/store_provider";

import Footer from "@/components/footer/footer";
import TopNavBar from "@/components/top-nav-bar/top_nav_bar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Welcome to BD-Feature! Where you can find the top news in the world",
  description:
    "Welcome to BD-Feature! Where you can find the top news in the world",
  icons: {
    icon: "/icons/bd-feature-two.svg",
    apple: "/icons/bd-feature-two.svg",
  },
  openGraph: {
    title:
      "Welcome to BD-Feature! Where you can find the top news in the world",
    images: [
      {
        url: "/icons/bd-feature.svg",
        alt: "Welcome to BD-Feature! Where you can find the top news in the world",
        type: "website",
      },
    ],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "gl" | "bd")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang="gl"
      suppressHydrationWarning={true}
      suppressContentEditableWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              const theme = localStorage.getItem("theme-mode") || "light";
              document.documentElement.className = theme;
            })();`,
          }}
        />
      </head>
      <NextIntlClientProvider messages={messages}>
        <ReduxProvider>
          <body>
            <div id="backdrop"></div>
            <div id="overlay"></div>
            <header>
              <TopNavBar edition={locale} />
            </header>
            <main>{children}</main>
            <footer>
              <Footer />
            </footer>
          </body>
        </ReduxProvider>
      </NextIntlClientProvider>
    </html>
  );
}
