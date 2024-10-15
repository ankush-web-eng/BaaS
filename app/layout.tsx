import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

import { ThemeProvider } from "@/context/ThemeProviderContext";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/SessionProvider";
import { UserContextProvider } from "@/context/UserContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    absolute: "SudoDev",
    template: "%s - SudoDev",
  },
  description: "Get rid of SDK's and just focus on development.",
  keywords: [
    "SudoDev",
    "SDKs",
    "Software Development",
    "API",
    "Developer Tools",
    "Ankush Singh",
    "Ankush's World",
    "Cloud Development",
  ],

  twitter: {
    card: "summary_large_image",
    creator: "@whyankush07",
    title: "SudoDev - Get rid of SDK's and just focus on development.",
    description: "Get rid of SDK's and just focus on development.",
    images: [
      {
        url: "https://sudodev.ankushsingh.tech/og-image.png",
        width: 1200,
        height: 627,
        alt: "SudoDev - Get rid of SDK's and just focus on development.",
      },
    ],
  },

  openGraph: {
    url: "https://sudodev.ankushsingh.tech",
    title: "SudoDev - Get rid of SDK's and just focus on development.",
    description:
      "We build SDK's so you can focus on development. Just make an API call and let us handle the rest.",
    images: [
      {
        url: "https://sudodev.ankushsingh.tech/og-image.png",
        width: 1200,
        height: 627,
        alt: "SudoDev - Official Site",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "SudoDev",
  },

  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://sudodev.ankushsingh.tech"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* General Meta Tags */}
        <meta name="description" content="Get rid of SDK's and just focus on development." />
        <meta name="application-name" content="SudoDev" />
        <meta name="keywords" content="SDKs, APIs, Developer Tools, Software Development, Ankush Singh, SudoDev" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0078D4" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://sudodev.ankushsingh.tech" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="SudoDev - Get rid of SDK's and just focus on development." />
        <meta property="og:site_name" content="SudoDev" />
        <meta property="og:description" content="We build SDK's so you can focus on development. Just make an API call and let us handle the rest." />
        <meta property="og:url" content="https://sudodev.ankushsingh.tech" />
        <meta property="og:image" content="https://sudodev.ankushsingh.tech/og-image.png" />
        <meta property="og:image:alt" content="SudoDev - Official Site" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@whyankush07" />
        <meta name="twitter:title" content="SudoDev - Get rid of SDK's and just focus on development." />
        <meta name="twitter:description" content="Get rid of SDK's and just focus on development." />
        <meta name="twitter:image" content="https://sudodev.ankushsingh.tech/og-image.png" />
        <meta name="twitter:image:alt" content="SudoDev - Get rid of SDK's and just focus on development." />

        {/* LinkedIn Meta Tags */}
        <meta name="linkedin:title" content="SudoDev" />
        <meta name="linkedin:description" content="We build SDK's so you can focus on development." />
        <meta name="linkedin:image" content="https://sudodev.ankushsingh.tech/og-image.png" />

        {/* Mobile-Friendliness */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-title" content="SudoDev" />

        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://sudodev.ankushsingh.tech" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SudoDev",
            "url": "https://sudodev.ankushsingh.tech",
            "description": "Get rid of SDK's and just focus on development.",
            "applicationCategory": "Developer Tools",
            "operatingSystem": "ALL",
            "creator": {
              "@type": "Person",
              "name": "Ankush Singh",
            },
            "keywords": "SudoDev, SDKs, Software Development, API, Developer Tools",
          })}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://sudodev.ankushsingh.tech",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Docs",
                "item": "https://sudodev.ankushsingh.tech/docs",
              },
            ],
          })}
        </script>

        <link rel="icon" type="image/png" href="https://sudodev.ankushsingh.tech/favicon.ico" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <UserContextProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
              <Navbar />
              <Toaster />
              {children}
            </ThemeProvider>
          </UserContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
