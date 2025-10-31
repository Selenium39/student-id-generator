import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Great_Vibes } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/Header"

const inter = Inter({ subsets: ["latin"] })
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-handwriting",
})

export const metadata: Metadata = {
  title: "VSID",
  description: "fast generate virtual student id",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${greatVibes.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
