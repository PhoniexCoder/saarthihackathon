import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import CustomCursor from "@/components/effects/custom-cursor"
import BackgroundElements from "@/components/ui/background-elements";

export const metadata: Metadata = {
  title: "SARTHI 2025 - Inter-University Hackathon",
  description: "Technology as an Enabler: Innovating Inclusive Solutions for Persons with Disabilities",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="font-sans tech-particles">
        <BackgroundElements />
        <CustomCursor />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
