import "@/styles/globals.css"
import "@/styles/app.scss"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pokemon",
  description: "Pokemon explorer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-navy`}>
        <Header />
        <div className="container mx-auto px-4">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}
