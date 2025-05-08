import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Store",
  description: "Best store for your needs",
};

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <AuthProvider>
            <Navbar/>
            <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
            <main className="pt-16">{children}</main>
            <Footer/>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
