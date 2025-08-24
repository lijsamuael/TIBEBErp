import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/components/organisms/SideBar";

// Inter for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Poppins for headings
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js app with modern clean fonts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased font-sans">
        <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  );
}
