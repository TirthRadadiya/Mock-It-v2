import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import { SocketProvider } from "@/context/SocketProvider";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mock It",
  description: "Mock your next interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <SocketProvider>
        <body className={`${monaSans.className} antialiased pattern`}>
          {children}
          <Toaster />
        </body>
      </SocketProvider>
    </html>
  );
}
