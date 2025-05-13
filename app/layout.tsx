import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

import { SocketProvider } from "@/context/SocketProvider";
import { auth } from "@clerk/nextjs/server";
import Header from "@/components/header";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";

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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" className="dark">
        <SocketProvider>
          <body className={`${monaSans.className} antialiased pattern`}>
            <Header />
            <main className="overflow-y-hidden">{children}</main>
            <Toaster richColors />
            <Toaster />
          </body>
        </SocketProvider>
      </html>
    </ClerkProvider>
  );
}
