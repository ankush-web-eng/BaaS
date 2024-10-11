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

  keywords: ["SudoDev", "SDKs", "Software Development", "API", "Developer Tools", "Ankush Singh", "Ankush's World"],


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
    description: "We build SDK's so you can focus on development. Just make an API call and let us handle the rest.",
    images: [
      {
        url: "https://sudodev.ankushsingh.tech/og-image.png",
        width: 1200,
        height: 627,
        alt: "SudoDev - Official Site",
      },
    ],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <UserContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
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
