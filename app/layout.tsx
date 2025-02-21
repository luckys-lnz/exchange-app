import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NGN ⇄ GHS Exchange | Real-time Binance P2P Rates",
  description: "Get real-time exchange rates for Nigerian Naira (NGN) to Ghanaian Cedi (GHS) using Binance P2P rates.",
  keywords: ["NGN", "GHS", "exchange rate", "Binance P2P", "currency converter"],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'