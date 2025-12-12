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
  title: "quikconvert - Volume, Weight, Temperature & Measurements",
  description:
    "Fast kitchen and cooking converter for recipes, baking, and meal prep. Convert cups to ml, ounces to grams, Fahrenheit to Celsius instantly.",
  keywords: [
    "kitchen converter",
    "cooking converter",
    "recipe converter",
    "baking converter",
    "cooking measurements",
    "ingredient converter",
    "volume converter",
    "weight converter",
    "temperature converter",
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
    title: "quikconvert - Volume, Weight, Temperature & Measurements",
    description:
      "Fast kitchen and cooking converter for recipes, baking, and meal prep. Convert cups to ml, ounces to grams, Fahrenheit to Celsius instantly.",
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
    title: "quikconvert",
    description:
      "Convert cooking measurements instantly - cups to ml, ounces to grams, Fahrenheit to Celsius.",
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
