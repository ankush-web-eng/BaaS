import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

import { ThemeProvider } from "@/context/ThemeProviderContext";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/SessionProvider";

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
    absolute: "devX",
    template: "%s - devX",
  },
  description: "Get rid of SDK's and just focus on development.",

  openGraph: {
    images: [
      {
        url: "https://dev.ankushsingh.tech/android-chrome-512x512.png",
        width: 1200,
        height: 627,
        alt: "devX - Get rid of SDK's and just focus on development.",
      },
    ],
  },
  metadataBase: {
    host: "https://dev.ankushsingh.tech",
    href: "/",
    origin: "https://dev.ankushsingh.tech",
    password: "devX",
    hash: "devX",
    pathname: "/",
    search: "",
    username: "devX",
    hostname: "ankushingh.tech",
    port: "",
    protocol: "https:",
    searchParams: new URLSearchParams(""),
    toString: () => "https://dev.ankushsingh.tech",
    toJSON: () => "https://dev.ankushsingh.tech",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://dev.ankushsingh.tech",
    creator: "https://dev.ankushsingh.tech",
    title: "devX - Get rid of SDK's and just focus on development.",
    description:
      "Get rid of using the same code again and again. We have built SDK's for you for you so that you can just focus on developing projects. Just make an API call and let us handle the rest.",
    images: [
      {
        url: "https://dev.ankushsingh.tech/android-chrome-512x512.png",
        width: 1200,
        height: 627,
        alt: "devX - Get rid of SDK's and just focus on development.",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Toaster />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
