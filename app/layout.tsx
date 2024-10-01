import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

// import { ThemeProvider } from "@/context/ThemeProviderContext";
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

  openGraph: {
    images: [
      {
        url: "https://sudodev.ankushsingh.tech/android-chrome-512x512.png",
        width: 1200,
        height: 627,
        alt: "SudoDev - Get rid of SDK's and just focus on development.",
      },
    ],
  },
  metadataBase: {
    host: "https://sudodev.ankushsingh.tech",
    href: "/",
    origin: "https://sudodev.ankushsingh.tech",
    password: "SudoDev",
    hash: "SudoDev",
    pathname: "/",
    search: "",
    username: "SudoDev",
    hostname: "ankushingh.tech",
    port: "",
    protocol: "https:",
    searchParams: new URLSearchParams(""),
    toString: () => "https://sudodev.ankushsingh.tech",
    toJSON: () => "https://sudodev.ankushsingh.tech",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://sudodev.ankushsingh.tech",
    creator: "https://sudodev.ankushsingh.tech",
    title: "SudoDev - Get rid of SDK's and just focus on development.",
    description:
      "Get rid of using the same code again and again. We have built SDK's for you for you so that you can just focus on developing projects. Just make an API call and let us handle the rest.",
    images: [
      {
        url: "https://sudodev.ankushsingh.tech/landing.png",
        width: 1200,
        height: 627,
        alt: "SudoDev - Get rid of SDK's and just focus on development.",
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
          <UserContextProvider>
            {/* <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            > */}
              <Navbar />
              <Toaster />
              {children}
            {/* </ThemeProvider> */}
          </UserContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
