import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "./navbar";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const title = "Hoomgroom App"
  const description = "An app for grooming your pets"

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </head>
      <body className={inter.className}>
          <Navbar />
          {children}
      </body>
    </html>
  );
}
