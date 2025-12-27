import type React from "react";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme";
import { getThemeScript } from "@/components/theme/theme-script";
import { SchemaMarkup } from "@/components/seo";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://quikconvert.app"),
  title: "quikconvert - Convert Cups to Grams | Recipe Volume to Weight Converter",
  description:
    "Convert recipe measurements from cups, tablespoons & teaspoons to grams for food scales. Perfect for baking by weight. Convert 1/3 cup to grams, 2 tbsp to grams & more instantly.",
  keywords: [
    "cups to grams",
    "tablespoons to grams",
    "teaspoons to grams",
    "convert cups to grams",
    "recipe converter",
    "food scale converter",
    "baking by weight",
    "volume to weight converter",
    "1/3 cup to grams",
    "kitchen scale measurements",
    "cooking converter",
    "ingredient converter",
    "measurement converter",
  ],
  authors: [{ name: "Jonathan Hackbarth" }],
  creator: "Jonathan Hackbarth",
  publisher: "Jonathan Hackbarth",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quikconvert.app",
    siteName: "quikconvert",
    title: "quikconvert - Convert Cups to Grams | Recipe Volume to Weight Converter",
    description:
      "Convert recipe measurements from cups, tablespoons & teaspoons to grams for food scales. Perfect for baking by weight with instant conversions.",
    images: [
      {
        url: "/me-image",
        width: 1200,
        height: 630,
        alt: "quikconvert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "quikconvert - Convert Cups to Grams",
    description:
      "Convert recipe measurements from cups & tablespoons to grams for food scales. Perfect for baking by weight with instant conversions.",
    creator: "@jonathonhackbarth",
    images: ["/me-image"],
  },
  alternates: {
    canonical: "https://quikconvert.app",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: getThemeScript() }}
          suppressHydrationWarning
        />
        <SchemaMarkup />
      </head>
      <body className={jetbrainsMono.className}>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
