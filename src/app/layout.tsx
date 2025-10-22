import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../app/components/footer";
import Header from "../app/components/header";
// import TopNavbar from "./components/topBar";
import ClientToaster from "./components/ClientToaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haasil",
  description: "The best place to buy and sell products online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <TopNavbar /> */}
        <Header />
        {children}
        <Footer />

        <ClientToaster />

      </body>
    </html>
  );
}
