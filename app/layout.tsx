import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import CustomCursor from "@/components/effects/custom-cursor"
import BackgroundElements from "@/components/ui/background-elements";

export const metadata: Metadata = {
  icons: {
    icon: "/saarthi_log.png",
    shortcut: "/saarthi_log.png",
    apple: "/saarthi_log.png",
  },
  title: "SAARTHI'25 - National Level Hackathon",
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
  {children}
      </body>
    </html>
  )
}
